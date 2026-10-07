import { faqs } from './faqs';
import { pricingNote, vatNote } from './pricing';

type Link = { label: string; href: string };
export type FaqEntry = { question: string; answer: string; links?: Link[] };
export type FaqGroup = { id: string; title: string; items: FaqEntry[] };

// Reuse useful existing answers without changing the homepage FAQ selection.
function existing(question: string, links?: Link[]): FaqEntry {
  const item = faqs.find(faq => faq.question === question);
  if (!item) throw new Error(`Missing FAQ source: ${question}`);
  return { question: item.question, answer: item.answer, links };
}

const general: FaqGroup = {
  id: 'general', title: 'General', items: [
    existing('Do you cover the whole UK?'),
    {
      question: 'Who do you work with?',
      answer: 'We work with landlords, agents, developers, architects, commercial property owners, public-sector organisations and housing providers. Our services cover both commercial and residential properties, including commercial and domestic EPCs.'
    },
    {
      question: 'How do I get a quote?',
      answer: 'Use our quote form, call or email us with your property or project details. We will provide a clear, no-obligation quote and confirm the assessment scope, fee and next steps before work begins.',
      links: [{ label: 'Request a quote', href: '/quote' }, { label: 'Contact the team', href: '/contact' }]
    },
    {
      question: 'What information should I send?',
      answer: 'Send the address or postcode, building use, approximate floor area, service required and target date. If available, tell us about drawings, existing certificates or reports, and whether the building is new or existing. Send what you have; we will advise on any gaps.'
    }
  ]
};

const pricing: FaqGroup = {
  id: 'pricing-turnaround', title: 'Pricing & turnaround', items: [
    {
      question: 'How much does an assessment cost?',
      answer: pricingNote,
      links: [{ label: 'View service starting prices', href: '/#pricing' }]
    },
    { question: 'Do your advertised prices include VAT?', answer: `No. ${vatNote}` },
    {
      question: 'How quickly can you complete an assessment?',
      answer: 'Turnaround depends on the service, building, access and available information. Many standard assessments take a few working days. Tell us your deadline when enquiring; urgent work is subject to availability, and we confirm the programme with your quote.'
    },
    {
      question: 'Can you quote for larger buildings or portfolios?',
      answer: 'Yes. We support individual properties, developments and ongoing multi-site instructions. Large or complex buildings, unusual construction, complex services and portfolios receive bespoke pricing based on the agreed scope.'
    }
  ]
};

const compliance: FaqGroup = {
  id: 'epcs-compliance', title: 'Commercial EPCs & compliance', items: [
    {
      question: 'When do I need a commercial EPC?',
      answer: 'An EPC is normally needed when an applicable non-domestic building is constructed, sold or let. Requirements and exceptions depend on the building and jurisdiction; the service guidance explains the Scottish requirements.',
      links: [{ label: 'Commercial EPC guidance', href: '/services/commercial-epcs' }]
    },
    existing('How long is an EPC valid for?', [{ label: 'EPC validity and requirements', href: '/services/commercial-epcs' }]),
    existing('Can you help improve an EPC rating?'),
    {
      question: 'What is Section 63, and do you help with Action Plans?',
      answer: 'Section 63 is a Scottish energy-compliance requirement affecting certain non-domestic buildings. We assess the requirements, explain the Action Plan and guide you through improvement options and next steps.',
      links: [{ label: 'Section 63 assessments', href: '/services/section-63-assessments' }]
    },
    {
      question: 'How is a DEC different from an EPC?',
      answer: 'A Display Energy Certificate reports measured operational energy use; an EPC assesses the building using standardised assumptions. In Scotland, DECs can support the Section 63 annual-reporting route. Requirements differ by jurisdiction, so public-building DEC rules elsewhere in the UK should not be assumed to apply in Scotland.',
      links: [{ label: 'DEC assessment guidance', href: '/services/decs' }]
    },
    {
      question: 'Do I need a Fire Risk Assessment?',
      answer: 'The duty depends on the building, its use and occupancy, and the jurisdiction. Tell us about your premises so we can confirm the assessment scope. Our service guidance explains the Scottish requirements.',
      links: [{ label: 'Fire Risk Assessment guidance', href: '/services/fras' }]
    },
    {
      question: 'What does a Fire Risk Assessment include?',
      answer: 'A review of fire hazards and risk, with a report setting out prioritised actions and practical guidance to improve life safety and support compliance.'
    }
  ]
};

const calculations: FaqGroup = {
  id: 'sap-sbem', title: 'SAP & SBEM', items: [
    existing('What is the difference between SAP and SBEM?', [{ label: 'SAP calculations', href: '/services/saps' }, { label: 'SBEM calculations', href: '/services/sbem-calculations' }]),
    existing('Do I need SAP calculations for a new build?', [{ label: 'SAP requirements and project stages', href: '/services/saps' }]),
    existing('Can you work directly with architects, developers, and design teams?'),
    existing('Can SBEM calculations be used alongside EPC work?', [{ label: 'SBEM assessment scope', href: '/services/sbem-calculations' }])
  ]
};

const performance: FaqGroup = {
  id: 'performance-water-safety', title: 'Building performance & water safety', items: [
    {
      question: 'What is TM59, and when is it needed?',
      answer: 'TM59 is a method for assessing overheating risk in residential buildings. It is not a blanket statutory requirement for every Scottish home; its use depends on the applicable standards, planning conditions and project brief.',
      links: [{ label: 'TM59 overheating assessments', href: '/services/overheating-assessments-tm59' }]
    },
    {
      question: 'When is Dynamic Simulation Modelling useful?',
      answer: 'DSM analyses building performance over time, including energy use, comfort and overheating. It is useful for complex buildings or where a project needs more detailed technical analysis than a simpler assessment provides.',
      links: [{ label: 'Dynamic Simulation Modelling', href: '/services/dynamic-simulation-modelling-dsm' }]
    },
    existing('Do landlords need a Legionella risk assessment?', [{ label: 'Legionella guidance and HSE references', href: '/services/domestic-epcs-and-legionellas' }]),
    existing('How often should Legionella risk be reviewed?'),
    existing('Can EPC and Legionella services be arranged together?')
  ]
};

// Independent stacks avoid blank rows when an accordion in the other column opens.
export const faqColumns: FaqGroup[][] = [[general, pricing, calculations], [compliance, performance]];
