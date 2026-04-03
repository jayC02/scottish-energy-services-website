export type Service = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  forWho: string[];
  whatIncluded: string[];
  turnaround: string;
};

export const services: Service[] = [
  {
    slug: 'saps',
    title: 'SAP Calculations',
    short: 'SAP reports and calculations for new builds and conversions.',
    intro: 'We provide SAP calculations that support compliance with Scottish Building Standards and help projects progress smoothly from design through completion.',
    forWho: ['Developers and housebuilders', 'Architects and design consultants', 'Homeowners planning conversions'],
    whatIncluded: ['Initial design-stage SAP assessment', 'As-built SAP calculations', 'Guidance on efficiency improvements'],
    turnaround: 'Typical delivery in 3–5 working days depending on project complexity.'
  },
  {
    slug: 'epcs',
    title: 'Domestic EPCs',
    short: 'Energy Performance Certificates for homes, rentals, and sales.',
    intro: 'Our domestic EPC service gives homeowners and landlords a clear, compliant certificate with practical recommendations to improve energy performance.',
    forWho: ['Homeowners selling property', 'Landlords and letting agents', 'Portfolio landlords'],
    whatIncluded: ['On-site property assessment', 'Accredited EPC lodgement', 'Easy-to-understand recommendations'],
    turnaround: 'Most domestic EPCs delivered within 24–48 hours after survey.'
  },
  {
    slug: 'fras',
    title: 'Fire Risk Assessments (FRAs)',
    short: 'Clear, practical fire risk assessments for residential properties.',
    intro: 'Our FRAs are written to be practical and proportionate, helping duty holders manage risk and demonstrate responsible fire safety management.',
    forWho: ['Letting agents and landlords', 'Property managers', 'Residential block factors'],
    whatIncluded: ['Site inspection and risk review', 'Prioritised action plan', 'Practical compliance guidance'],
    turnaround: 'Reports usually issued in 3–7 working days based on property size.'
  },
  {
    slug: 'legionella',
    title: 'Legionella Risk Assessments',
    short: 'Legionella risk assessments for domestic and small rental portfolios.',
    intro: 'We help landlords and responsible persons identify legionella risks in water systems and take proportionate, documented control measures.',
    forWho: ['Private landlords', 'Letting agencies', 'Short-term let operators'],
    whatIncluded: ['Water system inspection', 'Risk grading and recommendations', 'Written report with control actions'],
    turnaround: 'Typical turnaround is 2–5 working days after inspection.'
  },
  {
    slug: 'commercial-epcs',
    title: 'Commercial EPCs',
    short: 'EPCs for offices, retail units, industrial spaces, and mixed-use sites.',
    intro: 'Our commercial EPC service supports transactions, lease activity, and compliance obligations across a broad range of non-domestic buildings.',
    forWho: ['Commercial landlords', 'Property agents and surveyors', 'Business owners and occupiers'],
    whatIncluded: ['Detailed non-domestic site survey', 'Accredited certificate lodgement', 'Improvement guidance where appropriate'],
    turnaround: 'Delivery windows vary by property scale; quick scheduling available.'
  },
  {
    slug: 'commercial-legionella',
    title: 'Commercial Legionella Assessments',
    short: 'Legionella compliance assessments for higher-risk commercial water systems.',
    intro: 'We provide structured commercial legionella assessments that support legal duties and ongoing risk management within occupied buildings.',
    forWho: ['Facilities managers', 'Employers and duty holders', 'Commercial property management teams'],
    whatIncluded: ['Water asset review and system profiling', 'Risk categorisation and action priorities', 'Clear reporting for records and audits'],
    turnaround: 'Programmed around site access, occupancy, and system complexity.'
  }
];
