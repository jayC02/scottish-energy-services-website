export type Faq = {
  question: string;
  answer: string;
  category: 'General' | 'EPC' | 'SAP / SBEM' | 'Fire Risk' | 'Section 63' | 'TM59 / DSM' | 'Legionella';
};

export const faqs: Faq[] = [
  {
    category: 'General',
    question: 'Do you cover the whole UK?',
    answer: 'Yes. We are based in Scotland and deliver projects across the UK, depending on the service and project requirements.'
  },
  {
    category: 'General',
    question: 'How quickly can you complete a job?',
    answer: 'Turnaround depends on service type and project scope, but many standard assessments can be completed within a few working days. Urgent instructions can often be prioritised.'
  },
  {
    category: 'General',
    question: 'What types of clients do you work with?',
    answer: 'We support landlords, letting agents, developers, architects, commercial property owners, public sector organisations, and housing providers.'
  },
  {
    category: 'General',
    question: 'How do I get a quote?',
    answer: 'Call or email us with your property or project details and we will return a clear, no-obligation quotation.'
  },
  {
    category: 'General',
    question: 'Do you work on both residential and commercial properties?',
    answer: 'Yes. We deliver both residential and non-domestic instructions across our full compliance and building performance service range.'
  },
  {
    category: 'General',
    question: 'Can you support one-off jobs as well as ongoing portfolios?',
    answer: 'Yes. We work on single properties, individual developments, and ongoing multi-site instructions.'
  },
  {
    category: 'EPC',
    question: 'When do I need an EPC?',
    answer: 'You will usually need an EPC when selling, letting, or constructing a property.'
  },
  {
    category: 'EPC',
    question: 'How long is an EPC valid for?',
    answer: 'An EPC is generally valid for 10 years, unless major changes are made that require a new assessment.'
  },
  {
    category: 'EPC',
    question: 'Can you help improve an EPC rating?',
    answer: 'Yes. We explain the factors affecting your current score and identify practical improvements where appropriate.'
  },
  {
    category: 'EPC',
    question: 'Do you provide EPCs for both domestic and commercial properties?',
    answer: 'Yes. We provide both domestic EPCs and commercial EPCs.'
  },
  {
    category: 'SAP / SBEM',
    question: 'What is the difference between SAP and SBEM?',
    answer: 'SAP is used for residential buildings. SBEM is used for non-domestic buildings.'
  },
  {
    category: 'SAP / SBEM',
    question: 'Do I need SAP calculations for a new build?',
    answer: 'In most residential new-build cases, yes. SAP calculations are typically required to demonstrate Building Regulations compliance.'
  },
  {
    category: 'SAP / SBEM',
    question: 'Can you work directly with architects, developers, and design teams?',
    answer: 'Yes. We regularly coordinate directly with project teams from early design through to completion.'
  },
  {
    category: 'SAP / SBEM',
    question: 'Can SBEM calculations be used alongside EPC work?',
    answer: 'Yes. Depending on project requirements, SBEM outputs can support wider compliance and related certification.'
  },
  {
    category: 'Fire Risk',
    question: 'Is a fire risk assessment a legal requirement?',
    answer: 'For many non-domestic premises and certain residential buildings, yes. The legal duty depends on building type and occupancy.'
  },
  {
    category: 'Fire Risk',
    question: 'What does a fire risk assessment include?',
    answer: 'It includes identification of fire hazards, risk evaluation, and practical recommendations to improve life safety and compliance.'
  },
  {
    category: 'Fire Risk',
    question: 'Do you provide clear actions in your reports?',
    answer: 'Yes. Reports are written to be practical and easy to implement, not just technical summaries.'
  },
  {
    category: 'Section 63',
    question: 'What is a Section 63 assessment?',
    answer: 'It is an energy compliance requirement affecting certain non-domestic buildings in Scotland.'
  },
  {
    category: 'Section 63',
    question: 'Do you help with the Action Plan as well?',
    answer: 'Yes. We explain the Action Plan requirements and guide clients through the practical next steps.'
  },
  {
    category: 'TM59 / DSM',
    question: 'What is a TM59 assessment?',
    answer: 'TM59 is an overheating assessment method used for residential developments.'
  },
  {
    category: 'TM59 / DSM',
    question: 'When is a TM59 assessment required?',
    answer: 'It is often required for residential schemes where overheating risk must be demonstrated for planning, design, or compliance.'
  },
  {
    category: 'TM59 / DSM',
    question: 'What is Dynamic Simulation Modelling?',
    answer: 'Dynamic Simulation Modelling is a detailed method of assessing building performance over time, including energy use, comfort, and overheating behaviour.'
  },
  {
    category: 'TM59 / DSM',
    question: 'When would DSM be needed instead of a simpler method?',
    answer: 'DSM is typically used for more complex buildings or where a deeper technical performance analysis is required.'
  },
  {
    category: 'Legionella',
    question: 'Do landlords need a Legionella risk assessment?',
    answer: 'Landlords have a duty to assess and manage Legionella risk in their rental properties.'
  },
  {
    category: 'Legionella',
    question: 'How often should Legionella risk be reviewed?',
    answer: 'It should be reviewed periodically and whenever there is a change to occupancy, the water system, or the property condition.'
  },
  {
    category: 'Legionella',
    question: 'Can EPC and Legionella services be arranged together?',
    answer: 'Yes. Where suitable, we can coordinate both services together for efficiency and simpler compliance management.'
  }
];
