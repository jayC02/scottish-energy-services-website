# Security and deployment checklist

Reviewed 6 October 2026. The application is an Astro static build plus the independent Vercel `/api/forms` function. No account system, enquiry database or uploads are present. Do not deploy a development or preview server.

## Required Vercel configuration

1. Build: `npm run build`; output directory: `dist`. Use Node 24 (tests also work on Node 22.18+) and a supported npm release; local npm 10.4 emitted an engine warning for sitemap's npm >=10.8.2 requirement. Use `npm ci` with the committed lockfile.
2. Set `PUBLIC_TURNSTILE_SITE_KEY` at build time. Set server-only `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`, `FORM_FROM_EMAIL`. Never prefix server secrets with PUBLIC_. Use scoped Resend sending credentials and a verified sender; apply least-privilege access/MFA to supplier accounts.
3. Optional `TURNSTILE_ALLOWED_HOSTNAMES`: comma-separated exact hostnames. Default is `www.scottishenergyservices.co.uk,scottishenergyservices.co.uk`. Configure Cloudflare's matching hostname restrictions. Widget action is `enquiry`; server verifies it. Preview deployments need their exact preview hostname, separate test keys and a controlled mailbox/provider setup. Do not disable CAPTCHA for previews. Local static preview does not run the API.
4. Vercel Firewall: create a rule matching exact path `/api/forms` and method POST, rate limit by source IP to an initial 10 requests per 10 minutes, with a 429 response. Check plan support/costs and tune for shared networks using logs. This rule is NOT provisioned by the repository. Turnstile/honeypot remain defense in depth; no in-memory rate limiter is claimed. Keep protections off normal pages and crawlers unless warranted. Check email-provider quotas/alerts.
5. Build and commit the generated `vercel.json` CSP hashes together with the code/lockfile. Vercel may read configuration before executing the build, so do not rely on post-build configuration changes alone. Rebuild whenever inline code changes. Validate the actual deployed header values against the built HTML.
6. Baseline CSP (object/base/frame/form restrictions) is enforced. Full script/resource CSP is REPORT-ONLY pending real-provider testing. Preview it with `node scripts/security-preview.mjs`; inspect console violations and legitimate Ads/Turnstile loading. This local-only server is not a production handler. There is deliberately no fake reporting URL.
7. After checking a Vercel preview with real Turnstile and consented Google Ads, move the verified report-only policy into the enforced CSP (retain baseline restrictions), rebuild and verify headers. Keep `style-src 'unsafe-inline'` while GSAP/React inline styles are used. Do not allow arbitrary inline scripts; generated hashes cover Astro bootstrap scripts. Future deployed toolbar scripts may need a preview-specific policy rather than a production allowlist expansion.
8. Verify TLS/canonical-domain redirects, cache behavior and API `Cache-Control: no-store` on the deployed function. A HEAD check of the current live site already showed HSTS; the local config also specifies it without asserting subdomain/preload coverage. Static HTML's wildcard CORS header was observed at hosting level; the API adds no CORS allow headers and does not expose authenticated data.

## Owner verification before deployment

- Supply registered legal entity name, company number, registration jurisdiction and registered office. Existing Bath St address is only a confirmed repository contact address. Add verified disclosures to footer/privacy controller identification; do not infer the registered office. Confirm any VAT or professional disclosure requirements that actually apply.
- Review legal-page owner comments: controller identity, lawful bases/legitimate-interest assessment, accreditation/register recipients, processor contracts, mailbox provider, international transfer mechanisms and processing locations. Assess ICO fee/registration requirements; no invented registration number is shown.
- Confirm when the six-year completed-record period starts and which Scottish EPC accreditation rules require ten years. Apply six months after last contact for unsuccessful enquiries, six years for general completed records, applicable ten-year EPC evidence retention, and opt-out suppression retention as necessary. Configure deletion/review in the actual mailbox, project files, provider records/logs and backups. The website does not itself purge those systems.
- Inspect the actual cookie/storage inventory after acceptance, and the Vercel/Turnstile configuration. Choice is stored as `ses-consent-v1` with a timestamp and six-month (180-day) expiry; cookies on third-party domains require browser/provider management.
- Confirm Resend's verified sender and recipient (`info@scottishenergyservices.co.uk`) and send one explicitly authorised preview enquiry. Automated tests use fictional data and mocked delivery.
- Test keyboard access, mobile form/errors, cookie acceptance/rejection/persistence/withdrawal, video pause/resume, reduced motion, and Ads conversion configuration. The existing Ads ID is retained; custom event hooks are NOT a newly configured Google Ads conversion action or `send_to` conversion label. Map successful-enquiry events in Ads only after confirming the real conversion configuration.
- Review and sign off privacy/terms wording. This code audit cannot establish organisation-wide GDPR compliance or guarantee legal sufficiency of unconfirmed information.

## Recovery and maintenance

Keep code and lockfile in Git. Vercel rollback can restore a prior deployment, but environment/firewall settings and privacy defects need separate review; do not roll back to unconsented tracking. Store configuration inventories securely (not secret values in this repository). Record key rotation and account recovery procedures. The site has no database backup requirement; protect and test recovery of business mail/project evidence separately. Limit provider log retention and access to operational needs. Review advisories regularly and revisit Astro/Sharp exposure before enabling SSR, image optimisation, uploads, server islands or untrusted content.

## Sources

- ICO advertising consent: https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/how-do-the-rules-apply-to-online-advertising/
- Company disclosures: https://www.gov.uk/running-a-limited-company/signs-stationery-and-promotional-material
- Turnstile validation: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
- Vercel rate limiting: https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting
