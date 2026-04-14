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
    slug: 'commercial-epcs',
    title: 'Commercial EPCs',
    short: 'Accredited non-domestic EPCs for transactions, leasing, and compliance programmes.',
    intro: 'We deliver commercial EPCs with dependable scheduling, audit-ready reporting, and practical guidance suited to multi-site portfolios and single-asset instructions alike.',
    forWho: ['Commercial landlords and asset managers', 'Corporate occupiers and estate teams', 'Surveyors handling sales and lease events'],
    whatIncluded: ['Compliant on-site assessment and data capture', 'Accredited lodgement and final certificate', 'Prioritised recommendations to improve performance'],
    turnaround: 'Fast mobilisation available, with delivery scaled to building size and complexity.'
  },
  {
    slug: 'saps',
    title: 'SAPs',
    short: 'Design-stage and as-built SAP calculations aligned with Scottish Building Standards.',
    intro: 'Our SAP service supports smoother approvals and predictable project delivery, providing clear technical outputs for design teams, developers, and certifiers.',
    forWho: ['Developers delivering new-build housing', 'Architects and energy consultants', 'Homeowners progressing major conversions'],
    whatIncluded: ['Design-stage SAP calculations and advice', 'As-built SAP and evidence review', 'Targeted guidance to close compliance gaps'],
    turnaround: 'Typical reporting is completed within 3–5 working days.'
  },
  {
    slug: 'sbem-calculations',
    title: 'SBEM Calculations',
    short: 'SBEM modelling and compliance reports for non-domestic new-build and refurbishment projects.',
    intro: 'We provide robust SBEM calculations that help project teams evidence compliance efficiently while maintaining design intent and programme confidence.',
    forWho: ['Commercial development teams', 'M&E consultants and design managers', 'Contractors delivering regulated upgrades'],
    whatIncluded: ['Model set-up and building fabric review', 'Regulatory output reports and compliance metrics', 'Clear recommendations for performance optimisation'],
    turnaround: 'Delivery timelines are agreed around design milestones and submission dates.'
  },
  {
    slug: 'fras',
    title: 'Fire Risk Assessments (FRAs)',
    short: 'Structured, proportionate FRAs that support safer occupation and defensible compliance.',
    intro: 'Our FRA reports focus on practical actions and clear prioritisation, helping duty holders maintain safety standards with confidence and traceability.',
    forWho: ['Landlords, factors, and block managers', 'Letting agencies and housing providers', 'Duty holders responsible for occupied premises'],
    whatIncluded: ['On-site inspection and hazard identification', 'Risk rating with prioritised action schedule', 'Clear recommendations for ongoing management'],
    turnaround: 'Reports are usually issued within 3–7 working days following inspection.'
  },
  {
    slug: 'section-63-assessments',
    title: 'Section 63 Assessments',
    short: 'Section 63 advisory and compliance assessments for existing non-domestic buildings.',
    intro: 'We help building owners and occupiers navigate Section 63 obligations with focused technical advice, clear documentation, and practical implementation pathways.',
    forWho: ['Owners of existing non-domestic property', 'Asset and portfolio managers', 'Teams preparing for lease or sale activity'],
    whatIncluded: ['Building review against Section 63 requirements', 'Action options and compliance route guidance', 'Structured reporting for records and planning'],
    turnaround: 'Programmed to align with asset deadlines and transaction timescales.'
  },
  {
    slug: 'decs',
    title: 'DECs',
    short: 'Display Energy Certificates and advisory support for qualifying public and commercial buildings.',
    intro: 'Our DEC service provides dependable operational energy certification with clear interpretation for facilities, governance, and reporting requirements.',
    forWho: ['Public-sector estates and duty holders', 'Facilities and energy managers', 'Organisations with DEC renewal obligations'],
    whatIncluded: ['Operational energy data review', 'DEC production and lodgement', 'Advisory report support where required'],
    turnaround: 'Planned around data readiness and statutory deadlines.'
  },
  {
    slug: 'overheating-assessments-tm59',
    title: 'Overheating Assessments (TM59)',
    short: 'TM59 overheating assessments to inform resilient, occupant-focused residential design.',
    intro: 'We provide TM59 analysis that helps teams evidence comfort performance, reduce redesign risk, and demonstrate compliance confidence at submission stage.',
    forWho: ['Residential developers and architects', 'Design teams for urban and mixed-use schemes', 'Consultants supporting planning and compliance'],
    whatIncluded: ['Thermal comfort risk modelling', 'Scenario testing and mitigation advice', 'Concise compliance summary and technical outputs'],
    turnaround: 'Delivered to suit planning, design freeze, and submission milestones.'
  },
  {
    slug: 'dynamic-simulation-modelling-dsm',
    title: 'Dynamic Simulation Modelling (DSM)',
    short: 'Detailed DSM analysis for thermal comfort, operational performance, and design optimisation.',
    intro: 'Our DSM service gives project teams deeper evidence for complex buildings, supporting robust decisions on comfort, energy performance, and risk management.',
    forWho: ['Architect-led multidisciplinary teams', 'Developers delivering higher-complexity projects', 'Consultants requiring advanced performance analysis'],
    whatIncluded: ['Project-specific simulation model development', 'Performance testing across critical scenarios', 'Decision-ready reporting with strategic recommendations'],
    turnaround: 'Timescales are scoped to model complexity, design stage, and reporting outputs.'
  },
  {
    slug: 'domestic-epcs-and-legionellas',
    title: 'Domestic EPCs and Legionellas',
    short: 'Coordinated domestic EPC and legionella assessments for rental and residential portfolios.',
    intro: 'We streamline two core compliance requirements into one coordinated instruction, reducing administration while maintaining high-quality reporting and turnaround.',
    forWho: ['Private landlords and portfolio owners', 'Letting agencies coordinating compliance', 'Short-term and long-term rental operators'],
    whatIncluded: ['Domestic EPC assessment and certificate lodgement', 'Legionella risk assessment with action guidance', 'Combined scheduling and coordinated reporting'],
    turnaround: 'Most instructions are completed within 2–5 working days depending on access.'
  }
];
