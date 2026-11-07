export type Service = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  highlights: string[];
  forWho: string[];
  whatIncluded: string[];
  turnaround: string;
  category: ServiceCategory;
  /** 'site' services start with a visit; 'desk' services start from drawings and data. */
  delivery: 'site' | 'desk';
};

export type ServiceCategory = 'certificates' | 'compliance' | 'modelling';

export const serviceCategories: { id: ServiceCategory; label: string }[] = [
  { id: 'certificates', label: 'Energy certificates' },
  { id: 'compliance', label: 'Compliance & safety' },
  { id: 'modelling', label: 'Design & modelling' }
];

export const categoryLabel = (id: ServiceCategory) => serviceCategories.find(category => category.id === id)?.label ?? '';

// SES aims to complete every service within 48 hours of the site visit.
const SITE_TURNAROUND = 'Your report is issued within 48 hours of our site visit.';
const DESK_TURNAROUND = 'Your results are issued within 48 hours of receiving complete drawings and project information.';

export const services: Service[] = [
  {
    slug: 'commercial-epcs',
    title: 'Commercial EPCs',
    short: 'Energy Performance Certificates for commercial properties across the UK.',
    intro: 'We assess the energy efficiency of your building and provide a legally compliant EPC, including practical recommendations to improve rating and reduce running costs.',
    highlights: ['Suitable for sales, lettings, and compliance', '48-hour turnaround after the site visit', 'Clear guidance on improving ratings'],
    forWho: ['Commercial landlords and asset managers', 'Property agencies and transaction teams', 'Developers completing new commercial space'],
    whatIncluded: ['On-site non-domestic assessment', 'Accredited EPC lodgement and certificate issue', 'Practical improvement recommendations'],
    turnaround: SITE_TURNAROUND,
    category: 'certificates',
    delivery: 'site'
  },
  {
    slug: 'saps',
    title: 'SAP calculations',
    short: 'SAP calculations for new builds and residential developments.',
    intro: 'We produce accurate SAP assessments to demonstrate compliance with Building Regulations, supporting projects from design stage through to completion.',
    highlights: ['Building Regulations support', 'Design and completion assessments', 'Support for developers and architects'],
    forWho: ['Housebuilders and residential developers', 'Architectural practices', 'Project teams delivering conversions and extensions'],
    whatIncluded: ['Design-stage SAP calculations', 'As-built SAP updates and final outputs', 'Technical coordination with project teams'],
    turnaround: DESK_TURNAROUND,
    category: 'modelling',
    delivery: 'desk'
  },
  {
    slug: 'sbem-calculations',
    title: 'SBEM calculations',
    short: 'SBEM calculations for non-domestic buildings.',
    intro: 'We model the energy performance of commercial properties to support Building Regulations compliance and broader project delivery requirements.',
    highlights: ['New builds and conversions', 'Building Regulations support', 'EPC support where required'],
    forWho: ['Commercial developers', 'M&E consultants and design teams', 'Contractors delivering non-domestic projects'],
    whatIncluded: ['SBEM model setup and compliance calculations', 'Performance scenario testing where required', 'Documentation suitable for submission'],
    turnaround: DESK_TURNAROUND,
    category: 'modelling',
    delivery: 'desk'
  },
  {
    slug: 'fras',
    title: 'Fire risk assessments',
    short: 'Compliant fire risk assessments for residential and commercial properties.',
    intro: 'We identify hazards, assess risk, and provide clear actions to improve life safety, support compliance, and strengthen ongoing property management.',
    highlights: ['Residential and commercial properties', 'Clear, actionable reports', 'Practical compliance support'],
    forWho: ['Landlords and managing agents', 'Facilities and operations teams', 'Duty holders responsible for shared premises'],
    whatIncluded: ['On-site fire risk review', 'Risk rating and prioritised action schedule', 'Clear implementation guidance'],
    turnaround: SITE_TURNAROUND,
    category: 'compliance',
    delivery: 'site'
  },
  {
    slug: 'section-63-assessments',
    title: 'Section 63 assessments',
    short: 'Section 63 compliance support for non-domestic properties in Scotland.',
    intro: 'We assess qualifying buildings and produce the required documentation and Action Plan guidance to help clients meet regulatory obligations efficiently.',
    highlights: ['Full compliance guidance', 'Action plans and improvement options', 'Support with next steps'],
    forWho: ['Owners of qualifying non-domestic properties', 'Commercial agents and legal teams', 'Asset managers preparing for transactions'],
    whatIncluded: ['Section 63 assessment and reporting', 'Action Plan guidance', 'Practical next-step advice for compliance'],
    turnaround: SITE_TURNAROUND,
    category: 'compliance',
    delivery: 'site'
  },
  {
    slug: 'decs',
    title: 'Display Energy Certificates',
    short: 'Operational energy ratings based on actual building energy use.',
    intro: 'We assess actual energy use and confirm the DEC scope for your building and location.',
    highlights: ['Operational energy ratings', 'Energy data review', 'Advice on the relevant requirements'],
    forWho: ['Public sector property teams', 'Education and healthcare estates', 'Operators of frequently visited buildings'],
    whatIncluded: ['Operational energy data review', 'DEC certificate issue', 'Advisory report with improvement priorities'],
    turnaround: SITE_TURNAROUND,
    category: 'certificates',
    delivery: 'site'
  },
  {
    slug: 'overheating-assessments-tm59',
    title: 'Overheating assessments (TM59)',
    short: 'TM59 overheating assessments for residential developments.',
    intro: 'We model internal temperature performance to assess overheating risk and support planning, design, and compliance requirements for modern developments.',
    highlights: ['Residential overheating analysis', 'Dynamic modelling', 'Practical design advice'],
    forWho: ['Residential developers and design teams', 'Architects and sustainability consultants', 'Planning and compliance advisors'],
    whatIncluded: ['TM59 dynamic thermal modelling', 'Mitigation strategy testing', 'Reporting for planning and technical coordination'],
    turnaround: DESK_TURNAROUND,
    category: 'modelling',
    delivery: 'desk'
  },
  {
    slug: 'dynamic-simulation-modelling-dsm',
    title: 'Dynamic simulation modelling',
    short: 'Advanced building performance analysis using dynamic simulation.',
    intro: 'We deliver detailed modelling to assess energy use, overheating risk, and operational performance, supporting better-informed design and compliance decisions.',
    highlights: ['High-level technical modelling', 'Supports complex developments', 'Useful alongside SBEM and TM59'],
    forWho: ['Complex commercial and mixed-use projects', 'Engineering consultancies', 'Teams requiring detailed performance evidence'],
    whatIncluded: ['Dynamic model build from project data', 'Scenario testing and sensitivity analysis', 'Technical outputs for team and stakeholder review'],
    turnaround: DESK_TURNAROUND,
    category: 'modelling',
    delivery: 'desk'
  },
  {
    slug: 'domestic-epcs-and-legionellas',
    title: 'Domestic EPCs and Legionella',
    short: 'Domestic EPCs and Legionella risk assessments for residential properties.',
    intro: 'We support landlords, agents, and homeowners with efficient certification and water safety assessments, helping maintain compliance and reduce risk.',
    highlights: ['48-hour turnaround', 'Ideal for landlords and agents', 'Combined service options where appropriate'],
    forWho: ['Private landlords and portfolio owners', 'Letting agents and property managers', 'Homeowners preparing to sell or let'],
    whatIncluded: ['Domestic EPC assessment and lodgement', 'Legionella risk review', 'Clear follow-up actions and renewal guidance'],
    turnaround: SITE_TURNAROUND,
    category: 'certificates',
    delivery: 'site'
  }
];
