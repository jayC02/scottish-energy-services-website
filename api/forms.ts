declare const process: { env: Record<string, string | undefined> };

type FormKind = 'contact' | 'quote';

interface SubmissionValues {
  formType: FormKind;
  name: string;
  email: string;
  service: string;
  message: string;
  phone: string;
  postcode: string;
  website: string;
  turnstileToken: string;
}

type ValidationErrors = Partial<Record<keyof SubmissionValues | 'turnstileToken', string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
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
    const params = new URLSearchParams(body);
    return Object.fromEntries(params.entries());
  }
  return typeof body === 'object' ? (body as Record<string, unknown>) : {};
};

const toSubmissionValues = (payload: Record<string, unknown>): SubmissionValues => ({
  formType: clean(payload.formType) === 'quote' ? 'quote' : 'contact',
  name: clean(payload.name),
  email: clean(payload.email),
  service: clean(payload.service),
  message: clean(payload.message),
  phone: clean(payload.phone),
  postcode: clean(payload.postcode),
  website: clean(payload.website),
  turnstileToken: clean(payload['cf-turnstile-response'])
});

const validateSubmission = (values: SubmissionValues): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!values.name || values.name.length < 2) errors.name = 'Please enter your full name.';
  if (!values.email || !EMAIL_REGEX.test(values.email)) errors.email = 'Please enter a valid email address.';
  if (!values.service) errors.service = 'Please select the service you need.';
  if (!values.message || values.message.length < 12) errors.message = 'Please provide enough detail so we can help (at least 12 characters).';
  if (values.phone && !PHONE_REGEX.test(values.phone)) errors.phone = 'Please enter a valid phone number.';
  if (values.formType === 'quote' && !values.postcode) errors.postcode = 'Please enter the property postcode.';
  return errors;
};

const verifyTurnstileToken = async (token: string, ipAddress: string | undefined): Promise<boolean> => {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return false;

  const params = new URLSearchParams({ secret, response: token });
  if (ipAddress) params.set('remoteip', ipAddress);

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params
  });

  if (!response.ok) return false;
  const payload = await response.json() as { success?: boolean };
  return Boolean(payload.success);
};

const sendWithResend = async (content: { subject: string; html: string; text: string; replyTo: string }) => {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.FORM_FROM_EMAIL;

  if (!resendApiKey || !fromEmail) {
    throw new Error('Missing RESEND_API_KEY or FORM_FROM_EMAIL environment variables.');
  }

  const response = await fetch('https://api.resend.com/emails', {
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
    throw new Error(`Resend error: ${response.status} ${await response.text()}`);
  }
};

export default async function handler(req: { method?: string; body?: unknown; headers: Record<string, string | string[] | undefined> }, res: { status: (code: number) => { json: (value: unknown) => void } }) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method not allowed.' });
  }

  try {
    const values = toSubmissionValues(parseBody(req.body));

    if (values.website) {
      return res.status(200).json({ ok: true });
    }

    const validationErrors = validateSubmission(values);
    if (Object.keys(validationErrors).length > 0) {
      return res.status(400).json({ ok: false, errors: validationErrors });
    }

    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (!turnstileSecret) {
      return res.status(500).json({ ok: false, message: 'Captcha is not configured on the server. Please contact support.' });
    }

    if (!values.turnstileToken) {
      return res.status(400).json({ ok: false, errors: { turnstileToken: 'Please complete the captcha check.' } });
    }

    const captchaValid = await verifyTurnstileToken(values.turnstileToken, req.headers['x-forwarded-for'] as string | undefined);
    if (!captchaValid) {
      return res.status(400).json({ ok: false, errors: { turnstileToken: 'Captcha verification failed. Please try again.' } });
    }

    const heading = values.formType === 'quote' ? 'New quote request' : 'New contact enquiry';
    const metadata = [
      ['Name', values.name],
      ['Email', values.email],
      ['Phone', values.phone || 'Not provided'],
      ['Service', values.service],
      ['Postcode', values.postcode || 'Not provided'],
      ['Message', values.message],
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
    console.error('Failed form submission', error);
    return res.status(500).json({
      ok: false,
      message: 'We could not submit your enquiry right now. Please try again or call us directly.'
    });
  }
}
