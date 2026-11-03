import type { CaseStudy } from './project-cases';

// Curated from SES Master Sheet.xlsx. Evidence and exclusions: docs/PROJECT-CONTENT.md.
// Private residential instructions use generalised place names, not household details.
// SAP design-stage work does not establish construction completion or an as-built EPC.
export const workbookProjects: CaseStudy[] = [
  {
    slug: 'station-house-glasgow', label: 'Station House', sector: 'Building energy assessment', location: 'Glasgow',
    summary: 'SAP and U-value calculations for Station House at St Enoch Square.', services: ['saps'],
    scope: ['Design-stage SAP calculations for the Station House project.', 'U-value calculation work.']
  },
  {
    slug: 'coats-street-housing', label: 'Coats Street housing development', sector: 'Residential development', location: 'Coatbridge',
    summary: 'Design-stage SAP calculations for a housing development in Coatbridge.', services: ['saps'],
    scope: ['SAP energy assessment at design stage for the Coats Street housing development.']
  },
  {
    slug: 'pine-place-sap', label: 'Pine Place residential assessment', sector: 'Residential assessment', location: 'Glasgow',
    summary: 'SAP energy calculations for a residential instruction at Pine Place.', services: ['saps'],
    scope: ['Design-stage SAP assessment for the Pine Place project in Glasgow.']
  },
  {
    slug: 'dunblane-energy-calculations', label: 'Dunblane energy calculations', sector: 'Building energy assessment', location: 'Dunblane',
    summary: 'SAP and SBEM calculations for a project at Auchinlay Road.', services: ['saps', 'sbem-calculations'],
    scope: ['Design-stage SAP energy calculations.', 'SBEM calculation work for the same project instruction.']
  },
  {
    slug: 'campbeltown-residential-plot', label: 'Campbeltown residential plot', sector: 'Residential assessment', location: 'Campbeltown',
    summary: 'Design-stage SAP work for a residential plot in Campbeltown.', services: ['saps'],
    scope: ['SAP assessment work for the residential plot instruction.']
  },
  {
    slug: 'scaliscro-cottages', label: 'Scaliscro Lodge cottages', sector: 'Cottages', location: 'Scaliscro',
    summary: 'SAP calculations for the cottages project at Scaliscro Lodge.', services: ['saps'],
    scope: ['Design-stage SAP energy assessment for the cottages.']
  },
  {
    slug: 'killearn-farm-conversion', label: 'Killearn farm conversion', sector: 'Residential conversion', location: 'Killearn',
    summary: 'Design-stage SAP calculations for a farm conversion near Killearn.', services: ['saps'],
    scope: ['SAP assessment for the conversion project.']
  },
  {
    slug: 'wick-river-campsite', label: 'Wick River Campsite', sector: 'Leisure', location: 'Wick',
    summary: 'SAP calculation work for Phase 3 of the campsite project.', services: ['saps'],
    scope: ['Design-stage SAP calculations for the Phase 3 instruction.']
  },
  {
    slug: 'plean-farm-steadings', label: 'Plean farm steadings', sector: 'Residential assessment', location: 'Plean',
    summary: 'SAP assessment work for a farm steadings project in Plean.', services: ['saps'],
    scope: ['Design-stage SAP energy calculations for the steadings instruction.']
  },
  {
    slug: 'elsrickle-residential-sap', label: 'Elsrickle residential assessment', sector: 'Residential assessment', location: 'Elsrickle, near Biggar',
    summary: 'SAP energy calculations for a residential project near Biggar.', services: ['saps'],
    scope: ['Design-stage SAP assessment for the Elsrickle instruction.']
  },
  {
    slug: 'achnasheen-residential-sap', label: 'Achnasheen residential assessment', sector: 'Residential assessment', location: 'Achnasheen',
    summary: 'SAP calculation work for a residential project in Achnasheen.', services: ['saps'],
    scope: ['Design-stage residential energy assessment using SAP.']
  },
  {
    slug: 'kilmarnock-residential-sap', label: 'Kilmarnock residential assessment', sector: 'Residential assessment', location: 'Kilmarnock',
    summary: 'Design-stage SAP calculations for a Kilmarnock residential project.', services: ['saps'],
    scope: ['Residential energy calculation work using SAP.']
  },
  {
    slug: 'dornoch-residential-sap', label: 'Dornoch residential assessment', sector: 'Residential assessment', location: 'Dornoch',
    summary: 'SAP assessment work for a residential project in the Dornoch area.', services: ['saps'],
    scope: ['Design-stage SAP energy calculations.']
  },
  {
    slug: 'plains-residential-sap', label: 'Plains residential assessment', sector: 'Residential assessment', location: 'Plains',
    summary: 'SAP calculations for a residential instruction in Plains.', services: ['saps'],
    scope: ['SAP energy assessment at design stage.']
  },
  {
    slug: 'muir-of-ord-new-house', label: 'Muir of Ord new house', sector: 'New-build housing', location: 'Muir of Ord',
    summary: 'SAP design-stage work for a new house in Muir of Ord.', services: ['saps'],
    scope: ['SAP energy calculations for the proposed dwelling.']
  },
  {
    slug: 'auchinleck-residential-sap', label: 'Auchinleck residential assessment', sector: 'Residential assessment', location: 'Auchinleck',
    summary: 'SAP energy assessment for a residential instruction in Auchinleck.', services: ['saps'],
    scope: ['Design-stage SAP calculation work.']
  },
  {
    slug: 'islay-residential-sap', label: 'Islay residential assessment', sector: 'Residential assessment', location: 'Islay',
    summary: 'SAP calculations for a residential project on Islay.', services: ['saps'],
    scope: ['Design-stage SAP assessment for the residential instruction.']
  },
  {
    slug: 'dores-residential-sap', label: 'Dores residential assessment', sector: 'Residential assessment', location: 'Dores, Inverness',
    summary: 'SAP calculation work for a residential project in the Dores area.', services: ['saps'],
    scope: ['Design-stage residential energy calculations using SAP.']
  },
  {
    slug: 'black-isle-residential-sap', label: 'Black Isle residential assessment', sector: 'Residential assessment', location: 'Black Isle',
    summary: 'SAP assessment work for a residential instruction on the Black Isle.', services: ['saps'],
    scope: ['SAP calculations at design stage.']
  },
  {
    slug: 'newtonmore-house-assessment', label: 'Newtonmore house assessment', sector: 'Residential assessment', location: 'Newtonmore',
    summary: 'Design-stage SAP calculations for a house project in Newtonmore.', services: ['saps'],
    scope: ['Residential SAP assessment for the house instruction.']
  },
  {
    slug: 'upper-lybster-residential-sap', label: 'Upper Lybster residential assessment', sector: 'Residential assessment', location: 'Upper Lybster',
    summary: 'SAP calculation work for a residential project in Upper Lybster.', services: ['saps'],
    scope: ['Design-stage SAP energy assessment.']
  },
  {
    slug: 'longniddry-cottage-assessment', label: 'Longniddry cottage assessment', sector: 'Residential assessment', location: 'Longniddry',
    summary: 'SAP assessment work for a cottage instruction in the Longniddry area.', services: ['saps'],
    scope: ['Design-stage energy calculations using SAP.']
  },
  {
    slug: 'dirleton-residential-sap', label: 'Dirleton residential assessment', sector: 'Residential assessment', location: 'Dirleton',
    summary: 'SAP calculations for a residential project in Dirleton.', services: ['saps'],
    scope: ['SAP assessment at design stage for the residential instruction.']
  },
  {
    slug: 'beauly-conversion', label: 'Beauly conversion project', sector: 'Residential conversion', location: 'Beauly',
    summary: 'Design-stage SAP calculation work for a conversion near Beauly.', services: ['saps'],
    scope: ['SAP energy assessment for the conversion instruction.']
  },
  {
    slug: 'banchory-business-park', label: 'Banchory Business Park', sector: 'Commercial property', location: 'Banchory',
    summary: 'SBEM calculations for Blocks 1–4 at Burn O’Bennie Road.', services: ['sbem-calculations'],
    scope: ['SBEM energy calculation work for the business park instruction.'],
    sites: ['Blocks 1–4, Burn O’Bennie Road']
  },
  {
    slug: 'mfg-leven-filling-station', label: 'MFG Leven filling station', sector: 'Retail', location: 'Leven',
    summary: 'SBEM assessment work for the filling station project.', services: ['sbem-calculations'],
    scope: ['SBEM energy calculations for the Leven filling station instruction.']
  },
  {
    slug: 'old-courthouse-campbeltown', label: 'The Old Courthouse', sector: 'Commercial property', location: 'Campbeltown',
    summary: 'SBEM calculation work for the Old Courthouse in Campbeltown.', services: ['sbem-calculations'],
    scope: ['SBEM energy assessment for the Old Courthouse project.']
  },
  {
    slug: 'love-loan-glasgow', label: 'Love Loan commercial units', sector: 'Commercial property', location: 'Glasgow',
    summary: 'SBEM calculations for Units 2 and 3 at Love Loan.', services: ['sbem-calculations'],
    scope: ['SBEM energy calculation work for the commercial unit instruction.'],
    sites: ['Units 2 and 3, Love Loan']
  },
  {
    slug: 'woodhall-equestrian', label: 'Woodhall equestrian facilities', sector: 'Equestrian', location: 'Edinburgh',
    summary: 'SBEM calculations for the equestrian facilities project at Woodhall.', services: ['sbem-calculations'],
    scope: ['SBEM energy assessment for the Woodhall facilities instruction.']
  },
  {
    slug: 'st-bees-boarding-house', label: 'St Bees boarding house', sector: 'Boarding accommodation', location: 'St Bees',
    summary: 'SBEM energy calculation work for a boarding house project.', services: ['sbem-calculations'],
    scope: ['SBEM assessment for the St Bees boarding house instruction.']
  },
  {
    slug: 'kelso-farmshop', label: 'Kelso farmshop', sector: 'Retail', location: 'Kelso',
    summary: 'SBEM calculations for a farmshop project in Kelso.', services: ['sbem-calculations'],
    scope: ['SBEM energy assessment work for the farmshop instruction.']
  },
  {
    slug: 'spice-direct-warehouse', label: 'Spice Direct warehouse', sector: 'Industrial', location: 'Glasgow',
    summary: 'SBEM calculation work for warehouse premises on London Road.', services: ['sbem-calculations'],
    scope: ['SBEM energy assessment for the warehouse project.']
  },
  {
    slug: 'tytherington-high-school', label: 'Tytherington High School', sector: 'Education', location: 'Tytherington',
    summary: 'SBEM energy assessment work for the school project.', services: ['sbem-calculations'],
    scope: ['SBEM calculation work for the Tytherington High School instruction.']
  },
  {
    slug: 'scarborough-college-boarding-house', label: 'Scarborough College boarding house', sector: 'Education', location: 'Scarborough',
    summary: 'SBEM calculations for the college boarding house project.', services: ['sbem-calculations'],
    scope: ['SBEM energy assessment for the boarding house instruction.']
  },
  {
    slug: 'adventure-planet-paisley', label: 'Adventure Planet', sector: 'Leisure', location: 'Paisley',
    summary: 'SBEM calculation work for the New Sneddon Street project.', services: ['sbem-calculations'],
    scope: ['SBEM energy assessment for the Adventure Planet instruction.']
  },
  {
    slug: 'barvas-gateway-facility', label: 'Barvas Gateway Facility', sector: 'Building energy assessment', location: 'Barvas',
    summary: 'SBEM energy calculations for the gateway facility project.', services: ['sbem-calculations'],
    scope: ['SBEM assessment work for the Barvas Gateway Facility instruction.']
  },
  {
    slug: 'leadhills-golf-club', label: 'Leadhills Golf Club', sector: 'Sport and leisure', location: 'Leadhills',
    summary: 'SBEM calculation work for the golf club project.', services: ['sbem-calculations'],
    scope: ['SBEM energy assessment for the Leadhills Golf Club instruction.']
  },
  {
    slug: 'bolts-car-hire-lerwick', label: 'Bolts Car Hire', sector: 'Commercial property', location: 'Lerwick',
    summary: 'SBEM assessment work for premises on North Road, Lerwick.', services: ['sbem-calculations'],
    scope: ['SBEM calculation work for the car-hire premises instruction.']
  },
  {
    slug: 'balfron-golf-course', label: 'Balfron Golf Course', sector: 'Sport and leisure', location: 'Balfron',
    summary: 'SBEM energy calculations for the golf course project.', services: ['sbem-calculations'],
    scope: ['SBEM assessment work for the Balfron Golf Course instruction.']
  },
  {
    slug: 'rutherglen-glencairn-fc', label: 'Rutherglen Glencairn FC', sector: 'Sport and leisure', location: 'Rutherglen',
    summary: 'SBEM calculation work for the football club project.', services: ['sbem-calculations'],
    scope: ['SBEM energy assessment for the Rutherglen Glencairn FC instruction.']
  }
];
