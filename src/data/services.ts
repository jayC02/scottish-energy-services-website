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
    short: 'Accredited EPC production for offices, retail, industrial, and mixed-use assets.',
    intro: 'Our commercial EPC service supports transactions, lettings, and compliance programmes with fast scheduling, technically robust assessment, and clear reporting for decision-makers.',
    forWho: ['Commercial landlords and asset managers', 'Property agencies and surveying teams', 'Developers handling practical completion and handover'],
    whatIncluded: ['Non-domestic site survey and data capture', 'Accredited lodgement and certification', 'Focused recommendations where performance uplift is viable'],
    turnaround: 'Most standard properties delivered within 3–6 working days, with accelerated options when required.'
  },
  {
    slug: 'saps',
    title: 'SAPs',
    short: 'SAP calculations and compliance guidance for residential new build and conversion projects.',
    intro: 'We deliver design-stage and as-built SAPs aligned with Scottish Building Standards, helping project teams maintain momentum from planning through final certification.',
    forWho: ['Housebuilders and developers', 'Architectural practices and design teams', 'Clients delivering residential conversion schemes'],
    whatIncluded: ['Design-stage SAP strategy and target checks', 'As-built SAP calculations and submissions', 'Practical advice to close performance gaps early'],
    turnaround: 'Typical delivery in 3–5 working days depending on drawing quality and build complexity.'
  },
  {
    slug: 'sbem-calculations',
    title: 'SBEM Calculations',
    short: 'SBEM modelling and compliance documentation for non-domestic projects.',
    intro: 'Our SBEM calculations provide project teams with compliant carbon and energy evidence for non-domestic developments, delivered in a format that supports technical review and approvals.',
    forWho: ['Commercial developers', 'M&E consultants and project engineers', 'Design-and-build contractors'],
    whatIncluded: ['SBEM model setup and compliance calculations', 'Scenario testing for design optimisation', 'Documentation suitable for submission and audit'],
    turnaround: 'Programme-based delivery with phased outputs available for live projects.'
  },
  {
    slug: 'fras',
    title: 'Fire Risk Assessments (FRAs)',
    short: 'Practical FRAs for occupied buildings with clear action priorities.',
    intro: 'We produce proportionate, evidence-led FRAs that help responsible persons reduce risk, prioritise interventions, and maintain defensible compliance records.',
    forWho: ['Landlords and managing agents', 'Facilities and operations teams', 'Duty holders responsible for shared premises'],
    whatIncluded: ['On-site inspection and risk profiling', 'Prioritised action schedule with practical guidance', 'Report format designed for implementation tracking'],
    turnaround: 'Reports are commonly issued within 3–7 working days after inspection.'
  },
  {
    slug: 'section-63-assessments',
    title: 'Section 63 Assessments',
    short: 'Section 63 support for qualifying non-domestic buildings in Scotland.',
    intro: 'We deliver Section 63 assessments with clear route mapping, helping owners and agents understand obligations, options, and practical next steps without unnecessary delay.',
    forWho: ['Owners of qualifying non-domestic buildings', 'Commercial agents managing sales or lettings', 'Property teams planning staged improvements'],
    whatIncluded: ['Building assessment against Section 63 requirements', 'Action pathway guidance and reporting', 'Documentation support for compliance records'],
    turnaround: 'Timeframes are set by building scale and occupancy constraints, with planned milestones agreed upfront.'
  },
  {
    slug: 'decs',
    title: 'DECs',
    short: 'Display Energy Certificates for public and frequently visited buildings.',
    intro: 'Our DEC service provides robust operational energy assessment and advisory reporting, supporting regulatory compliance and practical performance management.',
    forWho: ['Public-sector property teams', 'Education and healthcare estate managers', 'Operators of publicly accessible buildings'],
    whatIncluded: ['Operational data review and certificate production', 'Advisory report for improvement opportunities', 'Support with renewals and portfolio planning'],
    turnaround: 'Typical issue in 4–8 working days once data has been confirmed.'
  },
  {
    slug: 'overheating-assessments-tm59',
    title: 'Overheating Assessments (TM59)',
    short: 'TM59 overheating analysis to support compliant and comfortable residential design.',
    intro: 'We run TM59 assessments to test overheating risk in line with current guidance, giving design teams early visibility on mitigation requirements before costly redesign.',
    forWho: ['Residential developers and design teams', 'Architects and sustainability consultants', 'Clients requiring evidence for planning and compliance'],
    whatIncluded: ['Dynamic thermal analysis aligned to TM59 methodology', 'Mitigation testing and option comparison', 'Reporting suitable for design coordination'],
    turnaround: 'Delivered to programme with staged outputs for concept, developed, and technical design phases.'
  },
  {
    slug: 'dynamic-simulation-modelling-dsm',
    title: 'Dynamic Simulation Modelling (DSM)',
    short: 'Advanced thermal and energy modelling for design assurance and performance decisions.',
    intro: 'Our DSM service gives project teams high-confidence building performance insight through detailed dynamic modelling, enabling stronger technical decisions at every stage.',
    forWho: ['Complex commercial and mixed-use developments', 'Engineering consultancies and design coordinators', 'Teams validating performance-critical environments'],
    whatIncluded: ['Model build calibrated to design information', 'Scenario and sensitivity testing', 'Technical outputs for stakeholder review and sign-off'],
    turnaround: 'Scoped to project complexity, with structured milestones and reporting checkpoints.'
  },
  {
    slug: 'domestic-epcs-and-legionellas',
    title: 'Domestic EPCs and Legionellas',
    short: 'Combined domestic EPC and legionella risk assessment scheduling for landlords and homeowners.',
    intro: 'We coordinate domestic EPC and legionella assessments in a single managed workflow, reducing admin overhead while keeping compliance records clear and current.',
    forWho: ['Private landlords and portfolio owners', 'Letting agencies managing compliance deadlines', 'Homeowners preparing for sale or rental'],
    whatIncluded: ['Coordinated site visit for both assessments', 'Accredited EPC lodgement and legionella reporting', 'Clear follow-up actions with renewal visibility'],
    turnaround: 'Most combined domestic packages are completed within 2–5 working days.'
  }
];
