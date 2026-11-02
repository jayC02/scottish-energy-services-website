import { quoteFields, validateQuoteDetails } from '../src/data/quote-fields.mjs';

declare const process: { env: Record<string, string | undefined> };

type FormKind = 'contact' | 'quote';

interface SubmissionValues {
  propertyDetails: Record<string, string>;
  formType: FormKind;
  name: string;
  email: string;
  service: string;
  sourcePage: string;
  message: string;
  phone: string;
  website: string;
  turnstileToken: string;
}

type ValidationErrors = Partial<Record<keyof SubmissionValues | 'turnstileToken', string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const SERVICES = new Set(['Commercial EPCs', 'Domestic EPCs', 'Legionella Risk Assessments', 'SAPs', 'SBEM Calculations', 'Fire Risk Assessments (FRAs)', 'Section 63 Assessments', 'DECs', 'Overheating Assessments (TM59)', 'Dynamic Simulation Modelling (DSM)', 'Other']);
const MAX_BODY_BYTES = 32768;
const allowedHosts = () => (process.env.TURNSTILE_ALLOWED_HOSTNAMES || 'www.scottishenergyservices.co.uk,scottishenergyservices.co.uk').split(',').map(host => host.trim()).filter(Boolean);
const header = (value: string | string[] | undefined) => Array.isArray(value) ? value[0] : value;

const PHONE_REGEX = /^[+\d\s().-]{7,20}$/;

const clean = (value: unknown): string => (typeof value === 'string' ? value.trim() : '');

const escapeHtml = (value: string): string =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const parseBody = (body: unknown): Record<string, unknown> => {
  if (!body) return {};
  if (typeof body === 'string') {
    if (body.trim().startsWith('{')) return JSON.parse(body) as Record<string, unknown>;
    const params = new URLSearchParams(body);
    return Object.fromEntries(params.entries());
  }
  return typeof body === 'object' ? (body as Record<string, unknown>) : {};
};

const toSubmissionValues = (payload: Record<string, unknown>): SubmissionValues => ({
  propertyDetails: Object.fromEntries(quoteFields.map(field => [field.name, clean(payload[field.name])])),
  formType: clean(payload.formType) === 'quote' ? 'quote' : 'contact',
  name: clean(payload.name),
  email: clean(payload.email),
  service: clean(payload.service),
  message: clean(payload.message),
  phone: clean(payload.phone),
  sourcePage: clean(payload.sourcePage),
  website: clean(payload.website),
  turnstileToken: clean(payload['cf-turnstile-response'])
});

const validateSubmission = (values: SubmissionValues): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!values.name || values.name.length < 2) errors.name = 'Please enter your full name.';
  if (!values.email || !EMAIL_REGEX.test(values.email)) errors.email = 'Please enter a valid email address.';
  if (!SERVICES.has(values.service)) errors.service = 'Please select a valid service.';
  if (!values.message || values.message.length < 12) errors.message = 'Please provide enough detail so we can help (at least 12 characters).';
  if (values.phone && !PHONE_REGEX.test(values.phone)) errors.phone = 'Please enter a valid phone number.';
  for (const [field, limit] of Object.entries({ name: 120, email: 254, service: 100, message: 10000, phone: 20, sourcePage: 200, website: 200, turnstileToken: 2048 })) {
    if (String(values[field as keyof SubmissionValues]).length > limit) errors[field as keyof SubmissionValues] = `Please use no more than ${limit} characters.`;
  }
  if (/[\x00-\x1f\x7f]/.test(values.email) || /[\x00-\x1f\x7f]/.test(values.name)) errors.email = 'Please enter valid contact details.';
  if (values.sourcePage && !/^\/(?!\/)[a-zA-Z0-9/_-]*$/.test(values.sourcePage)) errors.sourcePage = 'Invalid source page.';
  return { ...errors, ...validateQuoteDetails(values.propertyDetails) };
};

const verifyTurnstileToken = async (token: string, ipAddress: string | undefined): Promise<boolean> => {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return false;

  const params = new URLSearchParams({ secret, response: token });
  if (ipAddress) params.set('remoteip', ipAddress);

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    signal: AbortSignal.timeout(8000),
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params
  });

  if (!response.ok) return false;
  const payload = await response.json() as { success?: boolean; hostname?: string; action?: string };
  return payload.success === true && allowedHosts().includes(payload.hostname || '') && payload.action === 'enquiry';
};

const sendWithResend = async (content: { subject: string; html: string; text: string; replyTo: string }) => {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.FORM_FROM_EMAIL;

  if (!resendApiKey || !fromEmail) {
    throw new Error('Missing RESEND_API_KEY or FORM_FROM_EMAIL environment variables.');
  }

  const response = await fetch('https://api.resend.com/emails', {
    signal: AbortSignal.timeout(10000),
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: fromEmail,
      to: ['info@scottishenergyservices.co.uk'],
      reply_to: content.replyTo,
      subject: content.subject,
      html: content.html,
      text: content.text
    })
  });

  if (!response.ok) {
    throw new Error('Email provider rejected delivery.');
  }
};

export default async function handler(req: { method?: string; body?: unknown; headers: Record<string, string | string[] | undefined> }, res: { setHeader?: (name: string, value: string) => void; status: (code: number) => { json: (value: unknown) => void } }) {
  res.setHeader?.('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader?.('Allow', 'POST');
    return res.status(405).json({ ok: false, message: 'Method not allowed.' });
  }

  try {
    const type = (header(req.headers['content-type']) || '').split(';')[0].trim().toLowerCase();
    if (!['application/json', 'application/x-www-form-urlencoded'].includes(type)) return res.status(415).json({ ok: false, message: 'Unsupported request format.' });
    const origin = header(req.headers.origin);
    let originAllowed = !origin;
    if (origin) {
      try { const url = new URL(origin); originAllowed = url.protocol === 'https:' && allowedHosts().includes(url.hostname); } catch { originAllowed = false; }
    }
    if (header(req.headers['sec-fetch-site']) === 'cross-site' || !originAllowed) return res.status(403).json({ ok: false, message: 'Request not permitted.' });
    const raw = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {});
    if (Number(header(req.headers['content-length']) || 0) > MAX_BODY_BYTES || new TextEncoder().encode(raw).length > MAX_BODY_BYTES) return res.status(413).json({ ok: false, message: 'Please shorten your enquiry.' });
    let payload: Record<string, unknown>;
    try { payload = parseBody(req.body); } catch { return res.status(400).json({ ok: false, message: 'Invalid request.' }); }
    if (!payload || Array.isArray(payload) || !['contact', 'quote'].includes(String(payload.formType))) return res.status(400).json({ ok: false, message: 'Invalid form type.' });
    const values = toSubmissionValues(payload);

    if (values.website) {
      return res.status(200).json({ ok: true });
    }

    const validationErrors = validateSubmission(values);
    if (Object.keys(validationErrors).length > 0) {
      return res.status(400).json({ ok: false, errors: validationErrors });
    }

    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (!turnstileSecret) {
      return res.status(500).json({ ok: false, message: 'The enquiry form is temporarily unavailable. Please call or email us.' });
    }
    if (!values.turnstileToken) {
      return res.status(400).json({ ok: false, errors: { turnstileToken: 'Please complete the captcha check.' } });
    }

    const captchaValid = await verifyTurnstileToken(values.turnstileToken, undefined);
    if (!captchaValid) {
      return res.status(400).json({ ok: false, errors: { turnstileToken: 'Captcha verification failed. Please try again.' } });
    }

    const heading = values.formType === 'quote' ? 'New quote request' : 'New contact enquiry';
    const metadata = [
      ['Name', values.name],
      ['Email', values.email],
      ['Source page', values.sourcePage || 'Not provided'],
      ['Phone', values.phone || 'Not provided'],
      ['Service required', values.service],
      ...quoteFields.filter(field => values.propertyDetails[field.name]).map(field => [field.label, values.propertyDetails[field.name]]),
      ['Message / project details', values.message],
      ['Form type', values.formType],
      ['Submitted at (UTC)', new Date().toISOString()]
    ] as const;

    const html = `
      <h2>${escapeHtml(heading)}</h2>
      <table cellpadding="6" cellspacing="0" border="0">
        ${metadata
          .map(([label, value]) => `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value)}</td></tr>`)
          .join('')}
      </table>
    `;

    const text = metadata.map(([label, value]) => `${label}: ${value}`).join('\n');

    await sendWithResend({
      subject: `[SES Website] ${heading}`,
      html,
      text,
      replyTo: values.email
    });

    return res.status(200).json({ ok: true, message: 'Form submitted successfully.' });
  } catch (error) {
    console.error('Form delivery failed'); // Never log provider bodies, tokens, contact details or stack traces.
    return res.status(500).json({
      ok: false,
      message: 'We could not submit your enquiry right now. Please try again or call us directly.'
    });
  }
}
