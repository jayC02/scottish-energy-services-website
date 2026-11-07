import { projectImages, type ProjectImage } from './project-images';

export const serviceVisuals: Record<string, ProjectImage> = {
  'commercial-epcs': projectImages['st-enoch-centre'],
  saps: projectImages['moda-springside'],
  'sbem-calculations': projectImages['uws-ayr'],
  fras: { ...projectImages['theatre-royal-glasgow'], alt: 'Theatre Royal Glasgow, a public venue where fire safety management is essential', position: '50% 40%' },
  'section-63-assessments': projectImages['rusacks-hotel'],
  decs: projectImages['glasgow-life'],
  'overheating-assessments-tm59': projectImages['vita-edinburgh'],
  'dynamic-simulation-modelling-dsm': projectImages['sec-armadillo'],
  'domestic-epcs-and-legionellas': {
    src: '/images/services/domestic-homes.webp', small: '/images/services/domestic-homes-small.webp',
    width: 1200, height: 900, smallWidth: 600, alt: 'Homes on South Trinity Road in Edinburgh', position: '50% 30%',
    credit: { name: 'Graham Robson', source: 'https://commons.wikimedia.org/wiki/File:Terraced_houses,_South_Trinity_Road,_Edinburgh_-_geograph.org.uk_-_4445200.jpg', license: 'CC BY-SA 2.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0' }
  }
};
