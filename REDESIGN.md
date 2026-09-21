# Scottish Energy Services redesign

## Existing application and decisions

Retained Astro static generation, all existing public routes, business contact information, client assets, the existing Google Ads ID and Vercel form endpoint. No runtime dependencies added. The original site had nine service records, five high-intent landing pages, a shared layout and a Turnstile/Resend backend. No approved case studies, named team profiles or testimonials were found.

Replaced the blue gradients, pill buttons, repeated cards, video background, marquee, reveal dependencies and decorative JavaScript with a restrained green/charcoal editorial system. The existing Glasgow video supplied the responsive WebP stills; it is location imagery, not evidence of work on the pictured buildings. System fonts avoid remote font requests. The 12,573-project and four-nation values were taken from the original Hero.astro data-count attributes and now appear directly in HTML. Removed the unsupported 24-hour turnaround statement; service-specific timescales remain conditional and are confirmed at quotation.

## Architecture

- `src/styles/global.css`: shared colour, spacing, typography, layout and control tokens.
- `src/data/services.ts` and `service-content.ts`: catalogue and unique service detail content.
- `ServiceDetail.astro`: service overview, assessment context, deliverables, required information, FAQs, related services and enquiry form.
- `LandingPage.astro`: focused header, keyword-specific heading, area information and embedded conversion form; the five existing campaign URLs use it. No thin location-page expansion.
- `src/data/projects.ts`: typed case studies and testimonials. Only `approved: true` records publish. Project list filters and dynamic case-study routes are ready; no fake project routes are generated.
- `src/data/insights.ts`: two practical preparation guides, with generated Article pages. Regulatory commentary should have an expert reviewer, current primary sources and review dates before publication.
- `src/pages/sitemap.xml.ts`: generated from routes plus approved projects and insights. Replaces the stale manual sitemap.
- Domestic EPC and Legionella now have distinct service pages; the old combined URL remains functional.

## Forms and tracking

The endpoint retains Turnstile verification, honeypot and Resend delivery. Postcode, property type, area and timeframe are included in the delivered email. New fields remain backwards compatible with earlier submissions; new UI validates postcode. Phone is optional. File uploads are not supported by this backend, so the UI provides an email route for drawings. No fake upload control was added.

`src/scripts/tracking.js` uses one gtag event transport, only after optional measurement consent. Existing ID: AW-18158926466. No invented conversion labels. Map events to the intended Google Ads conversions in the account before campaign launch:

- `quote_form_started`
- `quote_form_submitted` (only after endpoint success)
- `phone_number_clicked`
- `email_clicked`
- `primary_cta_clicked`
- `service_cta_clicked`

No contact details or free-text messages enter event payloads. Rejection prevents tag loading; preference changes update consent. Personalised advertising consent stays denied. Production measurement still needs account-side configuration and verification.

## Owner content needed before launch

1. Permission-cleared case studies: client/sector, location, services (catalogue slugs), brief, challenge, approach, outcome, approved images/alt text and evidenced statistics. Set `approved: true` only after review. The visible empty state is deliberate.
2. Team names, roles, biographies and photographs; company history and dated experience milestones.
3. Current accreditation details and evidence for any Level 5 claim. No Level 5 claim was added.
4. Verified testimonials, attribution and permission. Empty testimonial data renders nothing.
5. Confirm that the inherited 12,573 project count remains appropriate and that existing client-logo permissions are current.
6. Complete business privacy particulars: legal controller identity, lawful bases, retention periods, rights and international transfer arrangements. Review the factual website privacy/cookie notices before launch. No company registration number, terms or legal identity was invented.
7. Confirm the production environment contains PUBLIC_TURNSTILE_SITE_KEY, TURNSTILE_SECRET_KEY, RESEND_API_KEY and FORM_FROM_EMAIL. Actual email delivery requires a controlled production smoke test. Local testing uses mocked providers and does not send enquiries.

## Content sources

Existing source content and client assets were preserved where appropriate. Specific Scottish assessment wording was checked against:

- https://www.mygov.scot/energy-performance-certificates/when-you-need-epc
- https://www.gov.scot/publications/energy-performance-of-existing-non-domestic-buildings-information/
- https://www.firescotland.gov.uk/businesses-and-landlords/fire-risk-assessment/

No FAQ rich-result promise, rating schema, review schema or invented qualifications were added. ProfessionalService, Service, BreadcrumbList and Article schema use actual content.

## Validation

Run `npm run build` and `npm run test:forms`. Browser screenshots and local reports are under ignored `output/playwright/`. Validation includes generated HTML/JSON-LD parsing, internal links and anchors, unique titles/descriptions, one H1 per page, all public routes at 320/390/768/1440px, keyboard menu operation, no-JavaScript rendering, and representative automated WCAG checks. Automated checks are not a substitute for a full human accessibility audit or field Core Web Vitals data.

The redesign is local; it has not been deployed.

## Final measured results

- Production build: 31 pages including 404; zero Astro errors, warnings or hints.
- 30 public sitemap routes checked at 320, 390, 768 and 1440 pixels: 120 checks, no overflow, missing images or unexpected status codes.
- 31 generated HTML documents and 67 JSON-LD blocks parsed; no duplicate titles/descriptions or broken internal destinations.
- Automated WCAG A/AA checks on homepage and representative mobile Quote, Service, About, Projects and Ads pages: no violations detected.
- No-JavaScript browser check: real project/nation values, H1 and desktop navigation visible. Mobile navigation uses native details; keyboard opening and Escape closure verified with JavaScript.
- Consent test: no tag before consent; one event per call after acceptance; no extra event after rejection; reacceptance restores measurement. Google script intercepted during this test.
- Backend tests use mocked Turnstile/Resend; browser validation and success use a mocked form response. Live delivery was not exercised.
- Final local mobile Lighthouse: Performance 100, Accessibility 100, Best Practices 100, SEO 100; LCP 1.7 s, CLS 0, TBT 0 ms. This is a lab result before optional measurement, not field data. Report: output/playwright/lighthouse-final.json. Lighthouse completed the report successfully, then Windows refused cleanup of its temporary browser directory; no audit runtime error was recorded.
- Shared browser script: 8.40 KB, 2.96 KB gzipped. Existing raster client logos now have appropriately sized WebP alternatives.
- Local production preview: http://127.0.0.1:4322/
