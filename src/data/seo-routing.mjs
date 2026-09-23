export const productionSite = 'https://www.scottishenergyservices.co.uk';
export const serviceAliases = {
  '/commercial-epc-glasgow-scotland': '/services/commercial-epcs',
  '/section-63-assessments-scotland': '/services/section-63-assessments',
  '/sbem-calculations-scotland': '/services/sbem-calculations',
  '/sap-calculations-scotland': '/services/saps',
  '/fire-risk-assessments-scotland': '/services/fras'
};
export const normalisePath = (path) => path.replace(/\/+$/, '') || '/';
export const canonicalPath = (path) => serviceAliases[normalisePath(path)] || normalisePath(path);
export const isIndexablePath = (path) => !['/404', '/404.html'].includes(normalisePath(path)) && !Object.hasOwn(serviceAliases, normalisePath(path));
