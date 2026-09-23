# Scottish Energy Services — SEO audit and implementation

Reviewed: 23 September 2026. Scope: technical, on-page, local and answer-engine readiness. Changes are local and not deployed by this task. No ranking or AI-citation outcome is promised.

## 1. Audit findings and boundaries

Audited all 23 static routes, shared layout/SEO, services/FAQ data, navigation/footer, forms, canonical domain, robots, manual sitemap, deployment redirect, image/video inventory, scripts and generated HTML. The existing form endpoint and Google Ads ID were preserved.

Before work: nine service pages had mostly generic service-delivery sections; five standalone Scotland landing pages overlapped those services. Canonicals were self-referencing even for overlapping intent, and depended on the requested path's slash form. Sitemap URLs were manually listed. JSON-LD repeated a business entity with changing page descriptions, without stable IDs or page/service relationships. Twitter declared a large-image card without an image. There were no source-linked review dates. Some SAP/SBEM, DEC, fire and TM59 wording blurred jurisdiction or methodology boundaries.

Preservation: homepage index, Hero, HomeScrollHero, ScrollExpand, ProjectsShowcase, AccordionGallery, Projects page source, shared homepage service data and project assets were hashed before editing and remained unchanged. Generated homepage and Projects visible body text also matches the pre-change build. All layout, media, animations and mobile gallery behaviour remain intact. No hidden SEO text or replacement H1 was inserted.

Known protected exceptions: homepage is client-rendered and has no H1 in initial HTML. Its source was not altered because the explicit body/hero restriction takes priority. Existing homepage service cards still contain some broad Part L/public-sector wording; their underlying data was preserved and Scottish distinctions were corrected in service-detail content. This needs a separately authorised homepage copy change, not a hidden workaround. Header/footer logos lack explicit dimensions and footer headings skip to H4; shared components were not changed because that would alter protected page markup.

## 2. Search Console baseline and priorities

User-supplied latest/previous 28-day windows (exact date ranges not supplied):

| Metric | Latest | Previous |
| --- | ---: | ---: |
| Clicks | 17 | 12 |
| Impressions | 1,347 | 1,547 |
| CTR | 1.26% | 0.78% |
| Average position | 17.6 | 22.9 |

Homepage: 1,144 impressions / 16 clicks. Fire: 167 / 0. SBEM: 18 / 0. SAP: 16 / 1. User confirmed the fire page is `/services/fras`; this remains its primary canonical URL. Exact SBEM/SAP report URLs have not been supplied.

Query signals supplied: energy services company (74 impressions, position 7.1); commercial energy services (68, 39.2); fire risk assessment Glasgow (60, 73.4); BESS consultant Scotland (48, 5.6); energy consultants Glasgow (41, 2.0); energy services (36, 2.6); energy efficiency solutions (27, 1.0); fire risk assessment Scotland (30, 69.7). Reported zero-click examples include energy services company and energy consultants Glasgow.

Prioritisation: clarify homepage consultancy intent in metadata, strengthen existing service destinations and their cross-links, focus Section 63 content and fire-risk Glasgow/Scotland relevance. No BESS offering or content was added. Do not chase unrelated generic terms because their averages appear strong. Low volumes and different query mixes mean aggregate position changes cannot establish causation.

## 3. Intent map and duplicate-content decisions

| Search intent | Primary URL |
| --- | --- |
| Glasgow building energy consultancy / brand | `/` |
| Commercial / non-domestic EPC Scotland, Glasgow, Edinburgh | `/services/commercial-epcs` |
| Section 63 assessment, Action Plan, commercial-property obligations | `/services/section-63-assessments` |
| SBEM Scotland, non-domestic design/completion calculations | `/services/sbem-calculations` |
| SAP Scotland, dwelling design/completion calculations | `/services/saps` |
| Fire risk assessment Glasgow and Scotland | `/services/fras` |
| Dynamic simulation / complex building performance | `/services/dynamic-simulation-modelling-dsm` |
| TM59 overheating assessment Scotland | `/services/overheating-assessments-tm59` |
| Scottish DEC operational-rating / Section 63 route | `/services/decs` |
| Domestic EPC and domestic water-system risk assessment | `/services/domestic-epcs-and-legionellas` |
| Geographic coverage / survey logistics | `/areas` |
| Evidence of real project portfolio | `/projects` |

Retained duplicate URL → canonical destination:

- `/commercial-epc-glasgow-scotland` → `/services/commercial-epcs`
- `/section-63-assessments-scotland` → `/services/section-63-assessments`
- `/sbem-calculations-scotland` → `/services/sbem-calculations`
- `/sap-calculations-scotland` → `/services/saps`
- `/fire-risk-assessments-scotland` → `/services/fras`

These five URLs still return full, useful 200 pages, using the SAME content/template as the primary destination and an explicit canonical. They are excluded from the sitemap. This is deliberate canonical consolidation, not an attempt to position near-identical pages as different local services. It preserves campaign/backlink destinations and avoids speculative deletion without complete per-URL GSC/backlink information. Primary pages are already linked from the homepage and service catalogue. Google can choose a different canonical; verify its selection after deployment. If the old URLs cease to serve a campaign purpose, consider direct permanent redirects after reviewing their exact performance.

No page-to-page redirects were introduced. Existing apex-to-www permanent redirect is preserved. Astro and Vercel now specify no trailing slash (except root); Vercel performs permanent slash normalisation. Verify production redirects after deployment, including apex-plus-slash combinations. No SPA fallback or catch-all rewrite was introduced.

## 4. Technical metadata and structured data

`SEO.astro` now supports canonical, image/imageAlt, page type, OG title/description overrides, noindex and composable structuredData. It emits one canonical on the production www HTTPS domain; query strings/fragments are removed. Brand suffixes are not duplicated. Open Graph includes site name, en_GB locale and a real airport poster image; Twitter metadata includes title, description, image and alt. Default image is existing media, not generated imagery.

Homepage head title: **Building Energy Consultants Glasgow | Scottish Energy Services**. Description explicitly names commercial EPCs, Section 63, SAP, SBEM, fire risk assessment and building modelling, avoiding utility-supply positioning. Homepage/Projects body copy is untouched. Service and supporting-page titles/descriptions are specific and unique among canonical pages. Retained aliases intentionally share metadata with their equivalent primary content.

Schema graph:

- Stable `/#organisation` ProfessionalService entity (a LocalBusiness/Organization subtype), using confirmed name, Glasgow postal address, international-format phone and email. Full entity on home/about/contact; referenced elsewhere.
- Stable `/#website` WebSite with publisher relationship.
- WebPage per canonical URL, with language, description and website/business references.
- BreadcrumbList on relevant non-home, non-404 pages; visible breadcrumbs on service pages.
- Service entities on all nine services, linked to provider and canonical WebPage.

No fabricated hours, ratings, reviews, founding dates, employee counts, accreditations, social profiles or prices. No FAQPage rich-result gambit. No Article schema because no standalone articles were created. JSON-LD is serialised and escapes less-than characters. Syntax was parsed in every built page; eligibility/rich results are not guaranteed by syntactic validity.

`lang="en-GB"`, viewport, favicons and existing analytics remain. 404 has `noindex, follow` and is excluded from sitemap. Non-home/non-Projects pages have a no-JavaScript fallback for reveal content. The protected pages receive no body fallback change.

## 5. Content expanded and factual corrections

All nine service pages now have server-rendered direct answers, appropriate information lists, related assessments, visible review dates and primary-source references. Existing service design language and CTA flow are retained through ServiceDetail/ServiceKnowledge; no extra client-side library was added.

- **Section 63:** greater-than-1,000 m² scope, sale/new-tenant triggers, evidence for exemptions, Action Plans, prospective/transferee information, examples of measures, 42-month implementation period and annual operational-rating deferral, EPC/DEC distinction, information needed and timing. Distinguishes owner duties, general guidance and SES process.
- **Commercial EPC:** Scottish transaction duties, owner preparation, validity and reform caveat, exemptions, survey inputs, rating factors, register, deliverables, local coverage and links to Section 63/SBEM/DEC.
- **SBEM/SAP:** method and jurisdiction, applicable warrant date, design versus as-built evidence, fabric/services inputs, early coordination and certification relationship. April 2026 handbooks linked. Consultation software is not described as current mandatory software.
- **DSM:** time-based modelling, complexity, design versus compliance outputs, limitations and DesignBuilder as a software example. No unsupported claim that SES holds particular software accreditation or licenses.
- **TM59:** methodology versus statutory requirement, glazing/ventilation/shading/occupancy, realistic assumptions and mitigation. Does not import England Part O into Scottish law.
- **DEC:** operational rather than asset rating, Scottish Section 63 annual reporting route, metering/data boundaries and no automatic transfer of England/Wales public-building rules.
- **Fire:** priority Glasgow/Scotland content, relevant premises and residential exclusions, dutyholder responsibilities, scope/limitations, reports, review triggers, shared-premises preparation and quote factors. No legal guarantees or invented fixed prices.
- **Domestic/Legionella:** separate assessment purposes; HSE distinction between assessing risk and obtaining a supposed mandatory test certificate; no invented fixed review interval.

Regulatory source review is editorial against linked primary material, not a named assessor sign-off. TODO for verified SES technical reviewer remains in the component. EPC reform update checked on gov.scot: current system remains until spring 2028; no misleading October 2026 changeover statement was added. Transaction-specific future dates should always be rechecked.

FAQ revisions affect entries AFTER the six displayed on the homepage, preserving its visible text. About/contact/coverage now make the Glasgow address, scope and project evidence clearer. No invented branch offices or local doorway pages.

## 6. Internal links and local signals

Homepage already links directly to all nine services; those paths and visuals are preserved. Each expanded service now links to related assessments, contact, quote and the genuine portfolio. EPC → Section 63/SBEM/DEC; Section 63 → EPC/DEC/SBEM; DSM ↔ TM59/SBEM; SAP → domestic EPC/TM59. Services index clarifies which assessment addresses which need. FAQ, About and Coverage link to canonical service routes. All 17 canonical pages are reachable by crawling from home.

NAP is consistent with owner-provided details: Scottish Energy Services, 272 Bath St, Glasgow, G2 4JR, United Kingdom; 0141 255 1360; info@scottishenergyservices.co.uk. No unsupported opening hours, coordinates, branches or Google Business Profile link. Edinburgh/Central Belt relevance lives within substantive service and coverage content rather than thin town pages.

## 7. Sitemap and robots

Installed `@astrojs/sitemap`. Build-generated `sitemap-index.xml` and `sitemap-0.xml` contain 17 canonical pages including `/projects`. Alias URLs and 404 are excluded through shared `seo-routing.mjs`. Legacy `/sitemap.xml` is now a small compatibility index referencing the generated URL set, so previous submissions still work. No arbitrary daily lastmod/changefreq values.

Robots allows all normal crawlers and explicitly Google-Extended. Sitemap points to the generated index. Google-Extended is not an indexing/ranking switch; no ranking inference is made from allowing it. No blocked Googlebot/Bingbot, fake verification token, hidden text or llms.txt additions.

## 8. AEO / AI-search readiness

Primary answers are in actual rendered HTML under natural-language headings, followed by actionable detail. Terminology distinguishes EPC/Action Plan/DEC and regulatory duties from modelling methods. Reviewed dates, linked official guidance, stable business/page/service entities and descriptive cross-links help interpretation and retrieval. Real portfolio links provide context without inferring services or outcomes for specific projects. No promise is made that Google AI features or Gemini will reference SES.

Google guidance checked: https://developers.google.com/search/docs/appearance/ai-features and https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls . Source lists are embedded with each service in `service-content.json`.

## 9. Validation and performance

- `npm install @astrojs/sitemap` completed and updated package/lock. npm reported an engine advisory: transitive sitemap package recommends npm >=10.8.2; local npm is 10.4.0 with Node 24.16.0. Build works; use a supported npm version in CI.
- `npm run build` includes `astro check`: 59 files, zero errors, zero warnings, four pre-existing hints (external script inline treatment and window tracking types). 23 routes built successfully.
- `python scripts/audit-seo.py`: canonical metadata uniqueness, JSON parsing, required social fields, internal assets/anchors, sitemap equality, reachability and protected content checks pass. Homepage H1 omission is an explicit protected exception, not silently treated as fixed.
- Production preview: home/projects/service/alias/sitemap/robots routes return 200; an unknown URL returns 404.
- Browser: Section 63/EPC/fire/SAP/DEC checked at 1440, 768 and 390px; one H1, no horizontal overflow and no page runtime errors. Service guidance readable without JavaScript. Fire copy/metadata updated further after the initial browser pass and rechecked in final validation.
- Lighthouse mobile lab audit on the priority fire page: Performance 87, Accessibility 98, Best Practices 77, SEO 100. LCP 3.0s, TBT 320ms. This is one localhost lab run, not field Core Web Vitals or a ranking score. JSON report completed, but the CLI exited with a Windows EPERM temporary-browser cleanup error afterward. Scores describe that completed report; no clean CLI exit is claimed.
- Main Lighthouse findings: existing third-party scripts/cookies, shared unsized logos and footer heading order. No intentional hero/gallery/video functionality was removed to improve a score. New content is static HTML and introduces no browser JS. Site uses a system-font fallback without a new font download. Existing below-fold video loading/pausing is preserved.
- Dependency audit still reports 15 vulnerabilities (1 low, 4 moderate, 9 high, 1 critical), including Astro. No unrelated major framework upgrade was applied in this SEO pass; investigate separately with regression testing. This is not a clean security audit.

Artifacts: `output/seo/audit-results.json`, `output/seo/lighthouse-fire.json`, browser screenshots and `output/seo/npm-audit.json`. Repeat built-site checks with `python scripts/audit-seo.py` after building.

## 10. Search Console and business follow-up

1. Deploy through the existing reviewed workflow; no deployment performed here.
2. Verify the domain property by DNS, or insert the real URL-prefix verification tag at the marked location in BaseLayout head. Do not invent an ID.
3. Submit `https://www.scottishenergyservices.co.uk/sitemap-index.xml`; the older sitemap URL remains valid as an index.
4. Inspect `/`, `/services/fras`, EPC, Section 63, SBEM and SAP using live URL testing. Check crawl permission, rendered content and Google's selected canonical. Inspect each retained alias to verify consolidation.
5. Test unknown URLs and apex/www/trailing-slash redirects on the deployed platform. Local preview does not execute Vercel host redirect rules.
6. Review Rich Results/Schema validators for deployed URLs. Service/ProfessionalService markup is not itself a guarantee of a special search appearance.
7. Request indexing for the materially updated primary pages, then compare matched 28-day periods by page and relevant service-query clusters. Monitor impressions, CTR, average position and actual enquiries. Keep BESS and utility-supply queries outside success targets.
8. Confirm Google Business Profile ownership, eligible address/service-area presentation, categories and real contact details. No profile changes were made or unsupported branch details added.

Needed from SES: named technical reviewers and verified qualifications/accreditation details; approved service scope and dates for case studies; exact GSC URLs for SAP/SBEM and fuller query/page exports; confirmed delivery windows; approved profile links and any business hours. Confirm DesignBuilder tooling/accreditation before describing it as SES-specific. Obtain substantive privacy/cookie/legal text separately; no fabricated policies were created. The existing tracking implementation and IDs were preserved.

## 11. Future content

No new indexable guide or location route was created because current priority topics fit the existing service pages. Useful future work, only when substantive evidence exists: a Section 63 decision example, an anonymised SBEM input checklist with drawings, a real EPC improvement case study, and a dated EPC reform explainer when implementation details settle. Avoid duplicating service intent or creating speculative local doorway pages. An Article schema/author workflow can follow once genuine signed-off resources exist.

## 12. Final canonical title and description inventory

- **/** — Building Energy Consultants Glasgow | Scottish Energy Services
  - Glasgow-based building energy consultants providing commercial EPCs, Section 63, SAP, SBEM, fire risk assessments and building modelling across Scotland.
- **/about** — About Our Glasgow Consultancy | Scottish Energy Services
  - Meet Scottish Energy Services: Glasgow-based energy assessment and building-compliance support for property owners, developers and professional teams.
- **/areas** — Glasgow, Edinburgh & UK Service Coverage | Scottish Energy Services
  - Energy assessment coverage from Glasgow across Edinburgh, the Central Belt and wider Scotland. Contact SES to confirm survey availability for your site.
- **/contact** — Contact Our Glasgow Team | Scottish Energy Services
  - Contact Scottish Energy Services at 272 Bath St, Glasgow. Call 0141 255 1360 for EPC, Section 63, modelling and fire risk assessment enquiries.
- **/faq** — Energy & Building Compliance FAQs | Scottish Energy Services
  - Answers on Scottish EPCs, Section 63, SAP, SBEM, overheating and assessment timescales, with links to detailed service guidance.
- **/projects** — Selected Projects | Scottish Buildings & Estates | Scottish Energy Services
  - Explore selected Scottish Energy Services projects, including Glasgow Airport, the University of Edinburgh, St James Quarter, SEC Armadillo and Kelvingrove Art Gallery.
- **/quote** — Request an Assessment Quote | Scottish Energy Services
  - Request a quote for an EPC, Section 63 assessment, SAP, SBEM or building-performance study. Send your property address, service and target date.
- **/services** — Energy & Building Compliance Services Scotland | Scottish Energy Services
  - Commercial EPCs, Section 63, SAP, SBEM, DSM, TM59, DECs and fire risk assessments from Glasgow, with service coverage across Scotland and the UK.
- **/services/commercial-epcs** — Commercial EPC Assessments Glasgow & Scotland | Scottish Energy Services
  - Commercial and non-domestic EPC assessments in Glasgow, Edinburgh and across Scotland. Survey, energy rating, lodgement and recommendations for owners and agents.
- **/services/decs** — Display Energy Certificates Scotland | Scottish Energy Services
  - Display Energy Certificates and operational ratings for Scotland’s Section 63 reporting route. Energy-data review and annual reporting support for property teams.
- **/services/domestic-epcs-and-legionellas** — Domestic EPCs & Legionella Assessments Scotland | Scottish Energy Services
  - Domestic EPC and Legionella risk assessment support for Scottish landlords, letting agents and homeowners. Separate evidence and reporting for each service.
- **/services/dynamic-simulation-modelling-dsm** — Dynamic Simulation Modelling Scotland | Scottish Energy Services
  - Dynamic simulation modelling for complex buildings in Scotland. Energy, HVAC, comfort and overheating studies with clear assumptions and design-stage reporting.
- **/services/fras** — Fire Risk Assessments Glasgow & Scotland | Scottish Energy Services
  - Fire risk assessments in Glasgow and across Scotland for businesses, landlords and dutyholders. Premises inspection, clear findings and prioritised actions.
- **/services/overheating-assessments-tm59** — TM59 Overheating Assessments Scotland | Scottish Energy Services
  - TM59 overheating assessments for Scottish residential designs. Review glazing, shading and ventilation through dynamic modelling before specifications are fixed.
- **/services/saps** — SAP Calculations Scotland | Scottish Energy Services
  - SAP calculations for Scottish housing projects. Design-stage energy assessment, as-built updates and EPC coordination for architects, developers and self-builders.
- **/services/sbem-calculations** — SBEM Calculations Scotland | Scottish Energy Services
  - SBEM calculations for Scottish non-domestic projects. Design and completion-stage modelling for building warrant submissions and commercial EPC coordination.
- **/services/section-63-assessments** — Section 63 Assessments Scotland | Scottish Energy Services
  - Section 63 assessments and Action Plan support for Scottish commercial property sales and new leases. Understand the 1,000 m² threshold, exemptions and DEC route.

## 13. Important files changed

- `astro.config.mjs`
- `docs/SEO-AUDIT.md`
- `package-lock.json`
- `package.json`
- `public/robots.txt`
- `public/sitemap.xml`
- `scripts/audit-seo.py`
- `src/components/SEO.astro`
- `src/components/ServiceDetail.astro`
- `src/components/ServiceKnowledge.astro`
- `src/data/faqs.ts`
- `src/data/seo-routing.mjs`
- `src/data/service-content.json`
- `src/data/service-pages.ts`
- `src/layouts/BaseLayout.astro`
- `src/pages/404.astro`
- `src/pages/about.astro`
- `src/pages/areas.astro`
- `src/pages/commercial-epc-glasgow-scotland.astro`
- `src/pages/contact.astro`
- `src/pages/faq.astro`
- `src/pages/fire-risk-assessments-scotland.astro`
- `src/pages/quote.astro`
- `src/pages/sap-calculations-scotland.astro`
- `src/pages/sbem-calculations-scotland.astro`
- `src/pages/section-63-assessments-scotland.astro`
- `src/pages/services/commercial-epcs.astro`
- `src/pages/services/decs.astro`
- `src/pages/services/domestic-epcs-and-legionellas.astro`
- `src/pages/services/dynamic-simulation-modelling-dsm.astro`
- `src/pages/services/fras.astro`
- `src/pages/services/index.astro`
- `src/pages/services/overheating-assessments-tm59.astro`
- `src/pages/services/saps.astro`
- `src/pages/services/sbem-calculations.astro`
- `src/pages/services/section-63-assessments.astro`
- `vercel.json`
