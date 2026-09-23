import { services } from './services';
import content from './service-content.json';
import { productionSite } from './seo-routing.mjs';
export type ServiceSlug = keyof typeof content;
export function getServicePage(slug: ServiceSlug) {
  const original = services.find(service => service.slug === slug)!;
  const detail = content[slug];
  const service = { ...original, title: detail.title, intro: detail.intro, highlights: detail.highlights };
  if (slug === 'decs') {
    service.forWho = ['Owners using the Section 63 operational-rating route', 'Property and facilities managers coordinating energy data', 'Estates teams reviewing operational performance'];
    service.whatIncluded = ['Operational energy data review', 'DEC assessment and certificate scope', 'Reporting and improvement advice as agreed'];
  }
  if (slug === 'domestic-epcs-and-legionellas') service.whatIncluded = ['Domestic EPC assessment and lodgement', 'Legionella risk review', 'Risk-control and review advice'];
  const url = `${productionSite}/services/${slug}`;
  const schema = { '@type': 'Service', '@id': `${url}#service`, url, name: detail.title,
    description: detail.description, serviceType: detail.title,
    provider: { '@id': `${productionSite}/#organisation` },
    areaServed: { '@type': 'AdministrativeArea', name: 'Scotland' },
    mainEntityOfPage: { '@id': `${url}#webpage` } };
  return { service, detail, schema };
}
