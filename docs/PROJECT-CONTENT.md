# Project content provenance

Reviewed 3 November 2026. This document is excluded from Vercel uploads and is
not imported into the website's client bundle.

## Portfolio expansion

The existing 20 projects remain in `src/data/project-cases.ts`. Following the
owner’s request to focus on larger projects, `src/data/project-workbook.ts` now
contains ten additional named instructions: one SAP and nine SBEM instructions.
The combined selection has 30 entries, including two SAP and 13 SBEM examples.
Individual houses, private plots, small residential conversions and smaller or
unclear instructions have been removed. Larger developments such as Moda
Springside and Station House remain. Coats Street is withheld until the exact
development, scale and corresponding image can be confirmed.
Service totals overlap; they must not be added together as a unique project count.

Source: the owner-supplied `SES Master Sheet.xlsx`, read without modification.
SHA-256: `64b53f02c5bbf29dbc5791cca4109bec86a623af7122076a410d9163b79de7f4`.
The workbook is a derived CRM and invoice summary, not a complete assessment
register. Its detail coverage and matching limitations are described on its
Methodology and Compliance Rules & Sources tabs.

There are 76 SAP-related rows in Compliance Opportunities, with 74 distinct
reference strings. This is not proof of 74 distinct projects: repeated rows,
variants, revisions and invoice matching need review. The selected additions
below have a High service-match confidence in that tab, and every linked
Invoice History row has status Paid. Draft, Voided, Deleted, Approved-only and
ambiguous references were not used for these additions. Invoice payment supports
the recorded assessment instruction, not physical completion of a building.

The source's "potential missing completion EPC" wording is a follow-up flag.
It is not published as a compliance finding. The SAP additions describe the
recorded design-stage calculations only; they do not claim an as-built EPC,
planning/building-control approval, rating, savings or construction completion.
U-value work is mentioned only for Station House, where it is expressly recorded.

## Privacy and media

No private household names, contact details, house/plot numbers, full private
addresses, fees or invoice identifiers are published. The supporting table below
retains worksheet row references only. Private-home entries are no longer part
of the public catalogue or generated individual project routes.

All 30 retained entries have local imagery. The five existing homepage videos
and homepage ordering are unchanged. Eleven image sets have been added (ten
workbook projects and the previously logo-only CoVault entry), with a maximum
width of 1280px, smaller 640px WebP variants where useful, no upscaling, explicit
dimensions and lazy loading below the first row. No stock or AI images were used.

Context and campus photographs are labelled on cards and detail pages. They do
not establish that SES assessed every building shown. The Old Courthouse image
is an archive exterior published in 2018, not evidence of its current condition.
Station House shows the existing exterior before redevelopment. Love Loan shows
the wider development, while the recorded assessment covers Units 2 and 3 only.
CoVault’s published 2022 image is a development visualisation, explicitly labelled
as such; the owner should replace it with an actual site photograph.

### Photo permissions: owner review required before publication

A source credit is not a reuse licence. No permission has been inferred from an
image being publicly accessible, and no deployment or publication was performed
in this task. The following eight newly sourced image sets are local draft
assets: confirm rights with the relevant photographer/rightsholder before
production publication, or replace them with SES-owned photographs. Publishers
are identified below as sources, not necessarily as the copyright owner.

| Project | Public source | Publication status / context |
| --- | --- | --- |
| Station House | [CCG](https://www.c-c-g.co.uk/plans-to-transform-historic-st-enoch-square-station-building-approved/) | Permission required; pre-redevelopment exterior |
| Banchory Business Park | [Lismore](https://lismore-re.com/banchory-trade-park-banchory/) | Permission required; four-block trade park at Burn O’Bennie Road. Owner to confirm match to assessment blocks |
| Old Courthouse | [Argyll and Bute Council](https://www.argyll-bute.gov.uk/news/2018/aug/brighter-future-campbeltown-old-courthouse) | Permission required; Bolgam Street archive photo, not the current Sheriff Court |
| Love Loan | [Love Loan](https://www.loveloan.co.uk/development/) | Permission required; wider development context |
| Spice Direct | [Spice Direct Wholesale](https://spicedirectwholesale.co.uk/) | Permission required; actual warehouse, not product imagery |
| Tytherington High School | [Pozzoni Architecture](https://www.pozzoni.co.uk/projects/tytherington-high) | Permission required; Macclesfield campus context, not a claim that SES assessed this specific block |
| Adventure Planet | [Adventure Planet Paisley](https://adventureplanet.co.uk/paisley/) | Permission required; venue interior |
| CoVault Polmadie | [The Herald](https://www.heraldscotland.com/news/20119295.first-rate-commercial-facility-polmadie-nears-completion/) | Permission required; published development visualisation, actual photograph still needed |

Three newly sourced photographs have explicit Creative Commons licences.
Attribution, source links and licence links appear on `/photo-credits`; image
resizing and cropping are disclosed there. Retain attribution and applicable
share-alike terms for the adapted images:

| Project | Author | Licence | Context |
| --- | --- | --- | --- |
| St Bees boarding house | Airjevans | CC BY-SA 3.0 | School campus, not identification of the assessed boarding house |
| Scarborough College boarding house | martin dawes | CC BY-SA 2.0 | College campus; do not identify it as the boarding house |
| Rutherglen Glencairn FC | Crowsus | CC BY-SA 4.0 | Club ground |

The existing image sets retain their original credit metadata. Existing
publisher-sourced photos without an explicit licence also remain subject to
SES’s publication permissions; this task does not retrospectively certify them.

## New entries and supporting rows

The row numbers below are Excel row numbers, not zero-based array indices.
The project reference is column G and recorded services are column K of
Compliance Opportunities. Linked invoice identifiers are in column O. Cross-check
those against column B of Invoice History; column H records invoice status.

| Published project slug | Compliance Opportunities row | Invoice History row(s) |
| --- | ---: | --- |
| station-house-glasgow | 6 | 442 |
| banchory-business-park | 8 | 738 |
| old-courthouse-campbeltown | 15 | 828 |
| love-loan-glasgow | 17 | 896 |
| st-bees-boarding-house | 21 | 844 |
| spice-direct-warehouse | 28 | 761 |
| tytherington-high-school | 33 | 455 |
| scarborough-college-boarding-house | 34 | 481 |
| adventure-planet-paisley | 41 | 580 |
| rutherglen-glencairn-fc | 59 | 842 |

## Existing entries and the overall volume claim

The original 20 entries were recovered from the live production source. Their
previous internal provenance document was not included in the deployed source;
this expansion does not claim to recreate its approvals or validate every older
entry. Supporting records and publication permissions should remain with SES.

The statement "over 12,000 assessments" is the owner's current confirmation,
supplied on 3 November 2026. It is distinct from the 30 selected portfolio entries
and from invoice counts in this workbook. Do not describe those assessments as
12,000 unique buildings, clients or projects.
