# Project content provenance

Reviewed 3 November 2026. This document is excluded from Vercel uploads and is
not imported into the website's client bundle.

## Portfolio expansion

The existing 20 projects remain in `src/data/project-cases.ts`. A further 40
curated examples are in `src/data/project-workbook.ts`: 24 SAP instructions and
16 SBEM instructions. The Dunblane SAP instruction also records SBEM work.
The combined selection has 60 entries, including 25 SAP and 21 SBEM examples.
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

Private residential instructions use a generalised project name and location.
Do not add client/contact names, emails, phone numbers, house or plot numbers,
full private addresses, billing amounts or invoice identifiers to public data.
The table below deliberately retains only worksheet row references.

The 40 additions have no approved project photographs in the supplied workbook.
Their cards use the existing typography and borders without a fabricated image
or a repeated SES logo. Add verified photographs to `project-images.ts` when the
owner supplies them; the existing card and detail-page media rendering will then
apply automatically. Existing photographs and the five homepage videos remain.

## New entries and supporting rows

The row numbers below are Excel row numbers, not zero-based array indices.
The project reference is column G and recorded services are column K of
Compliance Opportunities. Linked invoice identifiers are in column O. Cross-check
those against column B of Invoice History; column H records invoice status.

| Published project slug | Compliance Opportunities row | Invoice History row(s) |
| --- | ---: | --- |
| station-house-glasgow | 6 | 442 |
| coats-street-housing | 11 | 735 |
| pine-place-sap | 12 | 561 |
| dunblane-energy-calculations | 23 | 485 |
| campbeltown-residential-plot | 32 | 563, 791 |
| scaliscro-cottages | 40 | 683 |
| killearn-farm-conversion | 52 | 709 |
| wick-river-campsite | 58 | 769 |
| plean-farm-steadings | 60 | 636 |
| elsrickle-residential-sap | 63 | 718 |
| achnasheen-residential-sap | 64 | 496 |
| kilmarnock-residential-sap | 66 | 434 |
| dornoch-residential-sap | 76 | 486 |
| plains-residential-sap | 78 | 567 |
| muir-of-ord-new-house | 81 | 760 |
| auchinleck-residential-sap | 82 | 795 |
| islay-residential-sap | 84 | 576 |
| dores-residential-sap | 86 | 533 |
| black-isle-residential-sap | 87 | 564 |
| newtonmore-house-assessment | 89 | 703 |
| upper-lybster-residential-sap | 93 | 468 |
| longniddry-cottage-assessment | 94 | 519 |
| dirleton-residential-sap | 96 | 619 |
| beauly-conversion | 104 | 647 |
| banchory-business-park | 8 | 738 |
| mfg-leven-filling-station | 14 | 810 |
| old-courthouse-campbeltown | 15 | 828 |
| love-loan-glasgow | 17 | 896 |
| woodhall-equestrian | 18 | 705 |
| st-bees-boarding-house | 21 | 844 |
| kelso-farmshop | 26 | 867, 905 |
| spice-direct-warehouse | 28 | 761 |
| tytherington-high-school | 33 | 455 |
| scarborough-college-boarding-house | 34 | 481 |
| adventure-planet-paisley | 41 | 580 |
| barvas-gateway-facility | 45 | 664 |
| leadhills-golf-club | 48 | 675 |
| bolts-car-hire-lerwick | 53 | 786 |
| balfron-golf-course | 56 | 521 |
| rutherglen-glencairn-fc | 59 | 842 |

## Existing entries and the overall volume claim

The original 20 entries were recovered from the live production source. Their
previous internal provenance document was not included in the deployed source;
this expansion does not claim to recreate its approvals or validate every older
entry. Supporting records and publication permissions should remain with SES.

The statement "over 12,000 assessments" is the owner's current confirmation,
supplied on 3 November 2026. It is distinct from the 60 selected portfolio entries
and from invoice counts in this workbook. Do not describe those assessments as
12,000 unique buildings, clients or projects.
