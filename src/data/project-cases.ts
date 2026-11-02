export const projectServices = {
  'commercial-epcs': { label: 'Commercial EPCs', href: '/services/commercial-epcs' },
  saps: { label: 'SAP calculations', href: '/services/saps' },
  'sbem-calculations': { label: 'SBEM calculations', href: '/services/sbem-calculations' },
  'section-63-assessments': { label: 'Section 63', href: '/services/section-63-assessments' },
  decs: { label: 'Display Energy Certificates', href: '/services/decs' },
  'residential-epcs': { label: 'Residential EPCs', href: '/services/domestic-epcs-and-legionellas' }
} as const;

export type ProjectService = keyof typeof projectServices;
export type CaseStudy = {
  slug: string;
  label: string;
  sector: string;
  location: string;
  summary: string;
  services: ProjectService[];
  scope: string[];
  sites?: string[];
  logo?: string;
};

// Public project facts only. The supporting workbook rows and owner confirmations
// are recorded in docs/PROJECT-CONTENT.md, not sent to the browser.
export const caseStudies: CaseStudy[] = [
  {
    slug: 'glasgow-airport', label: 'Glasgow Airport', sector: 'Aviation', location: 'Glasgow',
    summary: 'Commercial EPC assessments for airport buildings.', services: ['commercial-epcs'],
    scope: ['Commercial energy assessments and EPC certification for buildings within the airport estate.']
  },
  {
    slug: 'university-of-edinburgh', label: 'University of Edinburgh', sector: 'Education', location: 'Edinburgh',
    summary: 'EPC assessments for university buildings and accommodation.', services: ['commercial-epcs', 'residential-epcs'],
    scope: ['Commercial EPC work for university buildings.', 'Residential EPC assessments for university accommodation.']
  },
  {
    slug: 'st-james-quarter', label: 'St James Quarter', sector: 'Retail', location: 'Edinburgh',
    summary: 'EPC assessments for retail units at St James Quarter.', services: ['commercial-epcs'],
    scope: ['Commercial EPC assessments for retail premises.', 'As built EPC work for a retail fit out.']
  },
  {
    slug: 'sec-armadillo', label: 'SEC Armadillo', sector: 'Venues', location: 'Glasgow',
    summary: 'Commercial EPC assessment for the SEC Armadillo.', services: ['commercial-epcs'],
    scope: ['Commercial energy assessment and EPC certification for the events venue.']
  },
  {
    slug: 'kelvingrove-art-gallery', label: 'Kelvingrove Art Gallery', sector: 'Arts and culture', location: 'Glasgow',
    summary: 'Commercial EPC work at Kelvingrove Art Gallery and Museum.', services: ['commercial-epcs'],
    scope: ['Commercial EPC assessment for the gallery and museum building.']
  },
  {
    slug: 'glasgow-life', label: 'Glasgow Life', sector: 'Public buildings', location: 'Glasgow',
    summary: 'EPC assessments across museums, cultural venues and leisure facilities.', services: ['commercial-epcs'],
    scope: ['Commercial EPC work across Glasgow Life buildings.', 'Assessment instructions for cultural venues, community buildings, sports centres and leisure facilities.'],
    sites: ['Kelvingrove Art Gallery and Museum', 'Kelvin Hall', 'St Mungo Museum of Religious Life and Art', 'Gallery of Modern Art', 'Sports and leisure facilities'],
    logo: '/images/client-logos/glasgow-life.svg'
  },
  {
    slug: 'vita-edinburgh', label: 'Vita Edinburgh', sector: 'Student accommodation', location: 'Edinburgh',
    summary: 'SBEM calculations for a student accommodation block.', services: ['sbem-calculations'],
    scope: ['SBEM energy calculations for the Fountainbridge accommodation project.']
  },
  {
    slug: 'moda-springside', label: 'Moda Springside', sector: 'Residential development', location: 'Edinburgh',
    summary: 'SAP calculations and EPC work for the residential development.', services: ['saps', 'residential-epcs', 'commercial-epcs'],
    scope: ['Design stage SAP calculations.', 'EPC assessment work, including as built assessments for Block E.']
  },
  {
    slug: 'uws-ayr', label: 'UWS Ayr', sector: 'Education', location: 'Ayr',
    summary: 'Commercial EPC work for the University of the West of Scotland.', services: ['commercial-epcs'],
    scope: ['Commercial EPC assessment work for the university campus in Ayr.'],
    logo: '/images/client-logos/university-of-the-west-of-scotland.svg'
  },
  {
    slug: 'theatre-royal-glasgow', label: 'Theatre Royal Glasgow', sector: 'Venues', location: 'Glasgow',
    summary: 'Commercial EPC work for the theatre.', services: ['commercial-epcs'],
    scope: ['Commercial energy assessment and EPC certification for the theatre building.']
  },
  {
    slug: 'clyde-shopping-centre', label: 'Clyde Shopping Centre', sector: 'Retail', location: 'Clydebank',
    summary: 'EPC assessments for retail units across the centre.', services: ['commercial-epcs'],
    scope: ['Commercial EPC assessments for retail units.', 'As built EPC work for premises at Carinthia Way.'],
    sites: ['Sylvania Way', 'Britannia Way', 'Carinthia Way']
  },
  {
    slug: 'st-enoch-centre', label: 'St Enoch Centre', sector: 'Retail', location: 'Glasgow',
    summary: 'Commercial EPC, Section 63 and DEC assessment work.', services: ['commercial-epcs', 'section-63-assessments', 'decs'],
    scope: ['Commercial EPCs for centre units and Argyle Street properties.', 'Section 63 and DEC assessment work for Argyle Street premises.']
  },
  {
    slug: 'covault-polmadie', label: 'CoVault Polmadie', sector: 'Commercial property', location: 'Glasgow',
    summary: 'SBEM calculations and commercial EPC assessment.', services: ['sbem-calculations', 'commercial-epcs'],
    scope: ['SBEM energy calculations for the Polmadie project.', 'Commercial EPC assessment work.'],
    logo: '/images/projects/covault-logo.png'
  },
  {
    slug: 'aldi-stores', label: 'ALDI stores', sector: 'Retail', location: 'Across Scotland',
    summary: 'Commercial and as built EPC work for store projects.', services: ['commercial-epcs'],
    scope: ['Commercial EPC assessments for existing stores.', 'As built EPC assessments for store projects across Scotland.'],
    sites: ['East Kilbride', 'Cumbernauld', 'Alexandria', 'Gilmerton', 'Glenrothes', 'Kirkintilloch'],
    logo: '/images/client-logos/aldi.svg'
  },
  {
    slug: 'crossbasket-hotel', label: 'Crossbasket Hotel', sector: 'Hotels', location: 'South Lanarkshire',
    summary: 'SBEM assessment work for the hotel project.', services: ['sbem-calculations'],
    scope: ['SBEM energy calculations for the hotel project.']
  },
  {
    slug: 'mowi-ardessie', label: 'MOWI Ardessie', sector: 'Industrial', location: 'Ardessie',
    summary: 'SBEM calculations for a broodstock facility.', services: ['sbem-calculations'],
    scope: ['SBEM assessment of the fish plant and broodstock facility.']
  },
  {
    slug: 'rusacks-hotel', label: 'Rusacks Hotel', sector: 'Hotels', location: 'St Andrews',
    summary: 'As built EPC assessment for the hotel.', services: ['commercial-epcs'],
    scope: ['As built energy assessment and EPC work for the hotel project.']
  },
  {
    slug: 'seaton-house-hotel', label: 'Seaton House Hotel', sector: 'Hotels', location: 'St Andrews',
    summary: 'Commercial EPC assessment for the hotel.', services: ['commercial-epcs'],
    scope: ['Commercial energy assessment and EPC certification.']
  },
  {
    slug: 'motherwell-shopping-centre', label: 'Motherwell Shopping Centre', sector: 'Retail', location: 'Motherwell',
    summary: 'Commercial EPC assessment work for shopping centre premises.', services: ['commercial-epcs'],
    scope: ['Commercial EPC assessments for premises within the shopping centre.']
  },
  {
    slug: 'forum-shopping-centre', label: 'The Forum Shopping Centre', sector: 'Retail', location: 'Wallsend',
    summary: 'Commercial EPC assessment for shopping centre premises.', services: ['commercial-epcs'],
    scope: ['Commercial EPC assessment work at the shopping centre.']
  }
];

export function projectsForService(slug: string, limit = 3) {
  const href = `/services/${slug}`;
  return caseStudies.filter(project => project.services.some(key => projectServices[key].href === href)).slice(0, limit);
}
