# Production source and branch consolidation

Recovered on 2 November 2026 for `jayC02/scottish-energy-services-website`.

## Source of truth

The live custom domains were serving Vercel deployment
`dpl_35Drq1KGZzSRazPPyMLjA8REm9Fy` (created 29 October 2026).
Its metadata named commit `421f407ac42367b24ff5f2abd0e639418cb555e8`
and branch `codex/update-google-ads-tag`, but also marked `gitDirty: 1`.
The deployed files therefore contained work that was absent from that commit
and from the other Git branches, including the 20-project catalogue and
individual project pages.

All 180 deployable source files were recovered through Vercel's authenticated
deployment-source API. Each file was verified against its SHA-1 identifier.
The recovery includes original Astro/React source, media, package manifests,
form endpoint and configuration; it is not a reconstruction from rendered HTML.
No environment-variable values were downloaded or committed.

`master` retains its original history plus the Google Ads and FAQ branch
histories. The recovered production files take precedence over divergent older
source. Existing documentation and tests were retained from Git. No portfolio
design or tracking-policy changes were made during this recovery.

## Deployment workflow

GitHub's default branch and Vercel's production branch are both `master`.
Commit and push reviewed changes to `origin/master`; the Git integration builds
production using `npm run build` and output directory `dist`. Check the deployed
commit and custom-domain assignment after each release. Avoid deploying an
uncommitted local working tree, which breaks traceability between Git and live
pages.

## Recovery backup

A verified full-history Git bundle, original branch manifest, production file
manifest and verified production source copy are stored locally at:

`C:\Users\Jayveer\.codex\visualizations\2026\09\21\01a0c391-ffd3-76f2-ad09-795e9a89253c\ses-recovery-2026-11-02`

The bundle is `before-consolidation.bundle`. Verify it with `git bundle verify`
and inspect its branch names with `git bundle list-heads` before recovering a
particular branch. Keep this backup outside the website's published directories.
The unmerged historical redesign prototype is also preserved under the Git tag
`archive/pre-consolidation-revamp-7a987ee` rather than kept as an active branch.

## Verification and inherited issues

- `npm ci` completed using the recovered lockfile.
- `npm run build` passed: 47 pages, no Astro errors, warnings or hints.
- All eight form-security test results passed using mocked providers.
- Three inherited consent tests fail because their old browser mock lacks
  `window.addEventListener`; those tests target an older consent implementation.
  They were not deleted or weakened to make consolidation appear green.
- The recovered live script defaults analytics and advertising to enabled until
  rejection. This differs from the earlier opt-in design documented in
  `SECURITY.md`; production behaviour was preserved, not approved as compliant.
  The consent behaviour, notices, documentation and tests need a separate review.
- Installation reports seven dependency advisories. The recovered versions were
  preserved; this consolidation does not classify their runtime exposure or
  apply dependency upgrades.

Local previews do not run Vercel's form function and do not contain production
CAPTCHA keys. Form delivery tests use mocks and send no real enquiries.
