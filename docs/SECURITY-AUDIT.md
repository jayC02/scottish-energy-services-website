# SES security, privacy and production-readiness findings

Reviewed 6 October 2026. Findings describe the checked architecture, not hypothetical functionality. No production changes have been deployed. Existing uncommitted `HomeScrollHero.jsx` changes were preserved.

## Coverage and existing protections

Inspected frontend/layout/components, all route names, shared forms and API, scripts, metadata/schema serialization, robots/sitemap, deployment/TypeScript config, manifests/lockfile and provider integrations. Searched resource domains, injection sinks, browser storage, environment references, source maps and public deployment contents. Performed a limited known-credential-format scan of tracked source and available Git patch history without exposing values: no matches; no tracked .env/.aws/.vercel credential files. This is not a guarantee against every secret format. Actual provider-dashboard settings remain outside the code audit.

Existing protections: POST-only form endpoint, server-side minimum validation, HTML escaping for email, fixed recipients/subject, honeypot, verified Turnstile success, generic public errors, static media, canonical URLs and safely escaped JSON-LD. No database, authentication, session cookie, remote file fetch controlled by users, uploads or shell execution endpoint exists. SQL injection, account IDOR, authenticated CSRF, upload traversal and account access controls are not applicable to the current architecture. Public enquiries still need anti-abuse controls.

The live homepage HEAD response showed HSTS. It did not show the new header configuration; these changes require deployment. No production form submissions or attack traffic were sent.

## Findings and classifications

| Severity | Finding | Exposure classification | Treatment / remaining work |
|---|---|---|---|
| High | Google Ads loaded before consent; no consent withdrawal | Actually occurring in production-facing code: privacy/tracking gap | Explicit consent gates script and events; equal accept/reject buttons; 180-day stored choice; withdrawal clears accessible first-party cookies and reloads. Provider-domain cookies cannot be deleted by this site. |
| High | No privacy notice or controller/company identification | Actual website disclosure gap | Added notices with verified contact facts and owner-supplied retention. Registered company/controller facts, supplier/transfer details and legal review remain publication blockers. |
| Medium | Unbounded form fields/body | Actually reachable public endpoint; CAPTCHA already reduces email abuse but validation work is still reachable | 32 KiB body limit, per-field limits, format/type/service validation, no email control characters, fixed source-path validation. Infrastructure may parse the body before handler; WAF limits remain necessary. |
| Medium | No endpoint rate limit | Actual public resource/abuse exposure, partially mitigated by verified CAPTCHA and honeypot | Existing controls strengthened; Vercel WAF rule still must be configured. No unreliable per-instance counter added. |
| Medium | CAPTCHA success lacked action/hostname checks | Theoretical/low-risk token misuse, subject to Cloudflare widget settings | Verify exact allowed hostnames and enquiry action; expired/duplicate tokens rejected by provider. |
| Medium | Provider errors logged response bodies/stack details | Actual failure-path logging exposure, dependent on response content | Static error code/message only; provider bodies/tokens/enquiry fields not logged by handler. Hosting/provider log retention still needs review. |
| Medium | Missing security headers | Theoretical/low-risk defense-in-depth gap; no browser injection exploit demonstrated | Enforced no objects/framing/base/form abuse, nosniff, referrer/permissions policies; full hashed CSP staged report-only. Complete real-provider testing before enforcement. |
| Low | Cross-site public submissions | Theoretical/low-risk; no authenticated session to hijack | Reject cross-site browser metadata and unexpected/invalid Origins; CAPTCHA remains necessary for clients that can forge headers. No arbitrary CORS permission added. |
| Low | Submission click tracking did not represent delivery and duplicated event paths | Actual measurement defect | Central allowlisted consent-aware events; one successful submission event after ok:true; no form-field payloads. Provider Ads conversion action mapping is separate. |
| Low | Phone marked required in HTML but optional on server; errors not linked; no skip link | Actual accessibility/data-minimisation inconsistency | Optional phone, bounded inputs, aria-describedby, focus/error/status behavior, skip link and focus states; the homepage logo now has an H1 before its supporting H2 without changing its appearance. Full WCAG certification is not claimed. |
| Low | Autoplay/reduced-motion and pause access | Actual motion accessibility gap | Footer video pause/resume; respect reduced-motion and page visibility; retain existing accordion interaction. |
| Low | README recipient differed from actual handler | Actual operational documentation defect | Documentation now matches unchanged info@ mailbox routing. |
| None | Email HTML injection, SQL/command injection, open redirects, SSRF from form fields | Already mitigated or not applicable | Escaping retained; user values are not executed, fetched or used as redirect targets. Fixed external provider URLs. |
| None | Secrets/public implementation exposure | No exposure found in checked scope | Private env variables only server-side, no known credential-format history matches, no deployed source maps/server source/config files found. No claim of comprehensive enterprise secret scanning. |

## Dependency review

`npm audit fix --ignore-scripts` applied compatible updates, including Astro 5.18.2, Vite 6.4.4 and React integration 4.4.2. Registry findings fell from 17 packages to 3: one critical, one high, one low. No forced major migration or incompatible dependency override was applied.

The standalone form function imports no npm runtime packages: it uses platform fetch and built-ins. Astro is not the deployed application server. Client bundles contain React, GSAP and Astro island bootstrap code; the affected server/image/development implementations are not those client bootstrap functions.

| Remaining package | Installed | Reported severity | Ships/used? | Exposure conclusion |
|---|---|---|---|---|
| astro | 5.18.2 | Critical aggregate | Build tooling; generated island code in client, but no Astro server, image optimisation, server islands or auth middleware deployed | RCE advisory concerns attacker-controlled AVIF decoded by Sharp, not public static MP4/WebP/PNG serving. No astro:assets imports or user image processing found. Server replay/Host SSRF/base-auth paths absent. define:vars and view-transition features absent; spread props/slots are controlled local data. Remaining issues are build/development-only or theoretical/low-risk for this architecture, not a demonstrated production exploit. |
| sharp | 0.34.5 | High | Transitive build image service; not browser or form runtime | No user-supplied AVIF/HEIF/SVG decoding or runtime optimisation endpoint. Build-only risk if untrusted media/image processing is introduced. Public SVG logos are controlled assets, not sanitised user uploads. |
| esbuild | 0.27.7 under Astro (Vite also has patched-out-of-range 0.25.12) | Low | Build/development executable, not client/form runtime | Windows development serve-path file-read advisory; esbuild's standalone serve API is not invoked by project commands. Keep development servers local and revisit if serve mode is introduced. |

Patched packages originally flagged: devalue (Astro serialization), fast-uri (tooling URI parser), http-cache-semantics (tooling fetch/cache), js-yaml and smol-toml (build content parsers), nanoid (tooling IDs), postcss/source-map-js (CSS build/source maps), svgo (build SVG transforms), vite (development server), yaml/yaml-language-server/volar-service-yaml/@astrojs/language-server (editor/typecheck). No request-controlled inputs to those parser/cache/generator paths were found; they are build/development dependencies in this project even when npm labels them production dependencies. Their compatible fixes were still applied. No private cross-user response cache or untrusted dynamic schema parser exists in the form endpoint.

Astro 7.3.6 is npm's proposed major fix; it is not recommended as an emergency production migration solely from this aggregate count. Plan a separate tested framework migration; reassess immediately before introducing image optimisation/untrusted content/SSR. This leaves vulnerable tools installed and does not claim zero risk.

Primary advisory sources:
- https://github.com/advisories/GHSA-26w7-cxv4-gfx2 (untrusted AVIF prerequisite)
- https://github.com/advisories/GHSA-j687-52p2-xcff (define:vars)
- https://github.com/advisories/GHSA-g7r4-m6w7-qqqr (Windows esbuild serve)

## Browser storage and external-service inventory

- `ses-consent-v1`: essential preference localStorage; advertising boolean/timestamp, expires 180 days. No sessionStorage or other custom storage found.
- Google Ads AW-18158926466: only after explicit advertising consent. No separate Google Analytics property found. Google may set _gcl_ and third-party advertising cookies; final inventory/lifetimes need real-provider review.
- Cloudflare Turnstile: loads only on form pages with configured site key. Browser/security data and server token verification; no extra IP transmission from the handler. Provider data-processing settings require owner review.
- Resend: server-only email delivery; message contains form details and metadata. No browser Resend key/API requests.
- Vercel: static hosting, serverless form and infrastructure/security logs; firewall configuration can affect its cookie inventory.
- Project videos/images are local; no embedded remote videos/maps/social widgets or remote fonts were found. Links to external guidance are ordinary links.

## Validation and readiness

Endpoint and consent tests use mocked providers and fictional information; no real mail was sent. The static security preview applies both staged and enforced headers. Verified no pre-consent Google requests, rejection/acceptance UI, allowlisted single event emission without personal payloads, withdrawal persistence, form error focus/description links, optional phone, privacy links, correct quote_form_submitted emission, duplicate-submit suppression, video pause control, one homepage H1 and no horizontal overflow at 390px mobile. Google script injection was intercepted during acceptance to avoid generating real Ads traffic. Real-provider CAPTCHA and Ads behavior still needs deployment-preview verification with configured credentials.

Readiness: code hardening is reviewable and buildable; production release remains conditional on controller/company disclosure, supplier/retention review, WAF activation, real-provider testing and full CSP sign-off. No database, marketing checkbox, account/CSRF subsystem, upload service, generic cookie tracker or major dependency migration was added because the inspected site does not require them.


## Verification results

- `npm test`: 10 tests pass (mocked endpoint and consent lifecycle).
- `npm run check`: zero errors, warnings or hints.
- `npx tsc --noEmit`: passes, including the server endpoint.
- `npm run build`: passes; 26 static pages and 23 generated inline-script hashes.
- `git diff --check`: passes.
- No pre-existing lint command exists; no superficial lint configuration was introduced.
- Local browser checks used security headers, 390px mobile emulation and mocked delivery. Real Ads script loading was intercepted to avoid altering production advertising measurement. No credential-configured Turnstile or real provider delivery test is claimed.

## Complete file inventory for this implementation

- `.gitignore`
- `README.md`
- `api/forms.ts`
- `docs/SECURITY-AUDIT.md`
- `docs/SECURITY.md`
- `docs/dependency-audit.json`
- `package-lock.json`
- `package.json`
- `scripts/security-preview.mjs`
- `scripts/update-csp.mjs`
- `src/components/CookieConsent.astro`
- `src/components/Footer.astro`
- `src/components/QuoteRequestForm.astro`
- `src/components/ScrollExpand/ScrollExpand.css`
- `src/components/ScrollExpand/ScrollExpand.jsx`
- `src/layouts/BaseLayout.astro`
- `src/pages/cookies.astro`
- `src/pages/privacy.astro`
- `src/pages/terms.astro`
- `src/scripts/consent.js`
- `src/scripts/main.js`
- `src/scripts/motion.js`
- `src/scripts/project-playback.js`
- `src/styles/global.css`
- `src/types/browser.d.ts`
- `tests/consent.test.mjs`
- `tests/forms.test.mjs`
- `vercel.json`

`src/components/HomeScrollHero.jsx` was already modified when this task started and was not edited in this implementation.
