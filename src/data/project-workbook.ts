import type { CaseStudy } from './project-cases';

// Larger named instructions from SES Master Sheet.xlsx. Evidence: docs/PROJECT-CONTENT.md.
// Individual homes, private plots and small one-off instructions are excluded.
export const workbookProjects: CaseStudy[] = [
  {
    slug: 'station-house-glasgow', label: 'Station House', sector: 'Building energy assessment', location: 'Glasgow',
    summary: 'SAP and U-value calculations for Station House at St Enoch Square.', services: ['saps'],
    scope: ['Design-stage SAP calculations for the Station House project.', 'U-value calculation work.']
  },
  {
    slug: 'banchory-business-park', label: 'Banchory Business Park', sector: 'Commercial property', location: 'Banchory',
    summary: 'SBEM calculations for Blocks 1–4 at Burn O’Bennie Road.', services: ['sbem-calculations'],
    scope: ['SBEM energy calculation work for the business park instruction.'],
    sites: ['Blocks 1–4, Burn O’Bennie Road']
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
    slug: 'st-bees-boarding-house', label: 'St Bees boarding house', sector: 'Boarding accommodation', location: 'St Bees',
    summary: 'SBEM energy calculation work for a boarding house project.', services: ['sbem-calculations'],
    scope: ['SBEM assessment for the St Bees boarding house instruction.']
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
    slug: 'rutherglen-glencairn-fc', label: 'Rutherglen Glencairn FC', sector: 'Sport and leisure', location: 'Rutherglen',
    summary: 'SBEM calculation work for the football club project.', services: ['sbem-calculations'],
    scope: ['SBEM energy assessment for the Rutherglen Glencairn FC instruction.']
  }
];
