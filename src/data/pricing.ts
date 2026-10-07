// Owner-supplied starting fees. Keep all published amounts in this file.
export const servicePricing = [
  { slug: 'commercial-epcs', label: 'Commercial EPC', amount: 170, bespoke: true },
  { slug: 'sbem-calculations', label: 'SBEM Calculations', amount: 250, bespoke: true },
  { slug: 'saps', label: 'SAP Calculations', amount: 200, bespoke: false },
  { slug: 'decs', label: 'Display Energy Certificate (DEC)', amount: 200, bespoke: false },
  { slug: 'fras', label: 'Fire Risk Assessment', amount: 225, bespoke: false },
  { slug: 'section-63-assessments', label: 'Section 63', amount: 200, bespoke: true },
  { slug: 'overheating-assessments-tm59', label: 'TM59 Overheating Assessment', amount: 200, bespoke: false }
] as const;

export type ServicePrice = (typeof servicePricing)[number];
export const getServicePrice = (slug: string) => servicePricing.find(price => price.slug === slug);
// Confirmed by SES: these fees exclude VAT.
export const vatNote = 'Prices exclude VAT. VAT will be shown in your full quotation.';
export const startingPrice = (price: ServicePrice) => `From ${new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(price.amount)} + VAT`;
export const pricingNote = 'Prices shown are starting prices for straightforward assessments. Final pricing depends on property size, complexity, available information and site requirements. We will always confirm the full cost before work begins.';
export const quoteLink = (slug: string) => `/quote?service=${encodeURIComponent(slug)}`;
