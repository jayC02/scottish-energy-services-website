/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_TURNSTILE_SITE_KEY: string;
  readonly TURNSTILE_SECRET_KEY: string;
  readonly RESEND_API_KEY: string;
  readonly FORM_FROM_EMAIL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
