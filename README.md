# Scottish Energy Services Website (Astro)

Premium, responsive Astro website for Scottish Energy Services with reusable components, service pages, and SEO-ready foundations.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Production form handling (Vercel)

Both `/contact` and `/quote` submit to the production-safe Vercel serverless function at `/api/forms`.

### Required environment variables (Vercel Project Settings)

- `PUBLIC_TURNSTILE_SITE_KEY` — Cloudflare Turnstile site key (safe for browser use).
- `TURNSTILE_SECRET_KEY` — Cloudflare Turnstile secret key used server-side.
- `RESEND_API_KEY` — API key for Resend email sending.
- `FORM_FROM_EMAIL` — Verified sender (e.g. `Scottish Energy Services <website@yourdomain.com>`).

> Important: `PUBLIC_TURNSTILE_SITE_KEY` is injected at build-time for Astro pages. If it is missing during build, the captcha widget cannot render on `/contact` or `/quote`.

### Form email routing

All validated form submissions currently route to:

- `info@scottishenergyservices.co.uk`

## Notes

- Core pages are in `src/pages/`.
- Reusable UI sections are in `src/components/`.
- Brand/system styling is in `src/styles/global.css`.
- API handlers for deployment are in `api/`.
- Replace placeholder assets in `public/images/` when final brand assets are available.

- Favicon note: after deployment, Google Search may take days or weeks to recrawl and refresh the favicon shown in results.

## Redesign handover

See [REDESIGN.md](REDESIGN.md) for content ownership, architecture, tracking, verification and launch requirements. Run `npm run test:forms` to verify the form backend without sending emails.
