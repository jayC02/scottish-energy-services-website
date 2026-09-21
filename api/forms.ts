declare const process: { env: Record<string, string | undefined> };

type FormKind = "contact" | "quote";

interface SubmissionValues {
  formType: FormKind;
  name: string;
  email: string;
  service: string;
  sourcePage: string;
  message: string;
  phone: string;
  website: string;
  postcode: string;
  propertyType: string;
  floorArea: string;
  timeframe: string;
  turnstileToken: string;
}

type ValidationErrors = Partial<
  Record<keyof SubmissionValues | "turnstileToken", string>
>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const PHONE_REGEX = /^[+\d\s().-]{7,20}$/;

const clean = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const parseBody = (body: unknown): Record<string, unknown> => {
  if (!body) return {};
  if (typeof body === "string") {
    const params = new URLSearchParams(body);
    return Object.fromEntries(params.entries());
  }
  return typeof body === "object" ? (body as Record<string, unknown>) : {};
};

const toSubmissionValues = (
  payload: Record<string, unknown>,
): SubmissionValues => ({
  formType: clean(payload.formType) === "quote" ? "quote" : "contact",
  name: clean(payload.name),
  email: clean(payload.email),
  service: clean(payload.service),
  message: clean(payload.message),
  phone: clean(payload.phone),
  sourcePage: clean(payload.sourcePage),
  website: clean(payload.website),
  postcode: clean(payload.postcode),
  propertyType: clean(payload.propertyType),
  floorArea: clean(payload.floorArea),
  timeframe: clean(payload.timeframe),
  turnstileToken: clean(payload["cf-turnstile-response"]),
});

const validateSubmission = (values: SubmissionValues): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!values.name || values.name.length < 2)
    errors.name = "Please enter your full name.";
  if (!values.email || !EMAIL_REGEX.test(values.email))
    errors.email = "Please enter a valid email address.";
  if (!values.service) errors.service = "Please select the service you need.";
  if (!values.message || values.message.length < 12)
    errors.message =
      "Please provide enough detail so we can help (at least 12 characters).";
  if (values.phone && !PHONE_REGEX.test(values.phone))
    errors.phone = "Please enter a valid phone number.";
  if (
    values.postcode &&
    !/^[A-Z]{1,2}[0-9][A-Z0-9]?\s*[0-9][A-Z]{2}$/i.test(values.postcode) &&
    values.postcode.toUpperCase().replace(/\s/g, "") !== "GIR0AA"
  )
    errors.postcode = "Please enter a valid UK postcode.";
  if (
    values.floorArea &&
    (!Number.isFinite(Number(values.floorArea)) ||
      Number(values.floorArea) <= 0)
  )
    errors.floorArea = "Enter a floor area greater than zero.";
  if (values.message.length > 8000)
    errors.message = "Please keep your message under 8,000 characters.";
  for (const field of [
    "name",
    "email",
    "service",
    "phone",
    "postcode",
    "propertyType",
    "floorArea",
    "timeframe",
    "sourcePage",
  ] as const) {
    if (values[field].length > 250)
      errors[field] = "Please shorten this field.";
  }
  return errors;
};

const verifyTurnstileToken = async (
  token: string,
  ipAddress: string | undefined,
): Promise<boolean> => {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return false;

  const params = new URLSearchParams({ secret, response: token });
  if (ipAddress) params.set("remoteip", ipAddress);

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    },
  );

  if (!response.ok) return false;
  const payload = (await response.json()) as { success?: boolean };
  return Boolean(payload.success);
};

const sendWithResend = async (content: {
  subject: string;
  html: string;
  text: string;
  replyTo: string;
}) => {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.FORM_FROM_EMAIL;

  if (!resendApiKey || !fromEmail) {
    throw new Error(
      "Missing RESEND_API_KEY or FORM_FROM_EMAIL environment variables.",
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: ["info@scottishenergyservices.co.uk"],
      reply_to: content.replyTo,
      subject: content.subject,
      html: content.html,
      text: content.text,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Resend error: ${response.status} ${await response.text()}`,
    );
  }
};

export default async function handler(
  req: {
    method?: string;
    body?: unknown;
    headers: Record<string, string | string[] | undefined>;
  },
  res: { status: (code: number) => { json: (value: unknown) => void } },
) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Method not allowed." });
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
      return res
        .status(500)
        .json({
          ok: false,
          message:
            "Captcha is not configured on the server. Please contact support.",
        });
    }
    if (!values.turnstileToken) {
      return res
        .status(400)
        .json({
          ok: false,
          errors: { turnstileToken: "Please complete the captcha check." },
        });
    }

    const captchaValid = await verifyTurnstileToken(
      values.turnstileToken,
      req.headers["x-forwarded-for"] as string | undefined,
    );
    if (!captchaValid) {
      return res
        .status(400)
        .json({
          ok: false,
          errors: {
            turnstileToken: "Captcha verification failed. Please try again.",
          },
        });
    }

    const heading =
      values.formType === "quote" ? "New quote request" : "New contact enquiry";
    const metadata = [
      ["Name", values.name],
      ["Email", values.email],
      ["Source page", values.sourcePage || "Not provided"],
      ["Phone", values.phone || "Not provided"],
      ["Service required", values.service],
      ["Property postcode", values.postcode || "Not provided"],
      ["Property type", values.propertyType || "Not provided"],
      ["Floor area (m²)", values.floorArea || "Not provided"],
      ["Required timeframe", values.timeframe || "Not provided"],
      ["Message / project details", values.message],
      ["Form type", values.formType],
      ["Submitted at (UTC)", new Date().toISOString()],
    ] as const;

    const html = `
      <h2>${escapeHtml(heading)}</h2>
      <table cellpadding="6" cellspacing="0" border="0">
        ${metadata
          .map(
            ([label, value]) =>
              `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value)}</td></tr>`,
          )
          .join("")}
      </table>
    `;

    const text = metadata
      .map(([label, value]) => `${label}: ${value}`)
      .join("\n");

    await sendWithResend({
      subject: `[SES Website] ${heading}`,
      html,
      text,
      replyTo: values.email,
    });

    return res
      .status(200)
      .json({ ok: true, message: "Form submitted successfully." });
  } catch (error) {
    console.error("Failed form submission", error);
    return res.status(500).json({
      ok: false,
      message:
        "We could not submit your enquiry right now. Please try again or call us directly.",
    });
  }
}
