import { caseStudies } from './project-cases';
import { regionAt, type RegionId } from './coverage-geo';

export type CoverageRegion = { id: RegionId; name: string; nation: 'Scotland' | 'North of England'; towns: string[] };

export const coverageReviewed = { iso: '2026-11-07', label: 'November 2026' };

export const coverageRegions: CoverageRegion[] = [
  { id: 'central-belt', nation: 'Scotland', name: 'Central Belt', towns: ['Glasgow', 'Edinburgh', 'Stirling', 'Falkirk', 'Paisley', 'Livingston', 'Motherwell', 'Hamilton', 'Clydebank', 'Rutherglen'] },
  { id: 'south-scotland', nation: 'Scotland', name: 'Ayrshire and the south of Scotland', towns: ['Ayr', 'Kilmarnock', 'Irvine', 'Dumfries', 'Stranraer', 'Galashiels', 'Hawick'] },
  { id: 'tayside-fife', nation: 'Scotland', name: 'Tayside and Fife', towns: ['Dundee', 'Perth', 'St Andrews', 'Kirkcaldy', 'Dunfermline', 'Arbroath'] },
  { id: 'north-east-scotland', nation: 'Scotland', name: 'Aberdeen and the north east', towns: ['Aberdeen', 'Banchory', 'Inverurie', 'Peterhead', 'Fraserburgh', 'Elgin'] },
  { id: 'highlands-islands', nation: 'Scotland', name: 'Highlands and Islands', towns: ['Inverness', 'Fort William', 'Oban', 'Campbeltown', 'Ullapool', 'Wick', 'Stornoway', 'Kirkwall', 'Lerwick'] },
  { id: 'north-west-england', nation: 'North of England', name: 'North West England', towns: ['Manchester', 'Liverpool', 'Preston', 'Lancaster', 'Carlisle', 'Chester', 'Macclesfield'] },
  { id: 'north-east-england', nation: 'North of England', name: 'North East England', towns: ['Newcastle', 'Sunderland', 'Durham', 'Middlesbrough', 'Hartlepool', 'Wallsend'] },
  { id: 'yorkshire-humber', nation: 'North of England', name: 'Yorkshire and the Humber', towns: ['Leeds', 'Sheffield', 'York', 'Hull', 'Bradford', 'Harrogate', 'Scarborough'] }
];

// Where each project location sits on the map. Adding a project in a new town fails the
// build until it has coordinates here, so the map can't silently fall behind the portfolio.
const locationPoints: Record<string, [number, number]> = {
  Glasgow: [55.86, -4.25], Edinburgh: [55.95, -3.19], 'St Andrews': [56.34, -2.8], Wallsend: [54.99, -1.53], Tytherington: [53.27, -2.12],
  'St Bees': [54.49, -3.59], 'South Lanarkshire': [55.78, -4.1], Scarborough: [54.28, -0.42], Rutherglen: [55.83, -4.21], Paisley: [55.85, -4.42],
  Motherwell: [55.79, -3.99], Clydebank: [55.9, -4.4], Campbeltown: [55.43, -5.61], Banchory: [57.05, -2.49], Ayr: [55.46, -4.62], Ardessie: [57.84, -5.21]
};
const notMapped = new Set(['Across Scotland']);

export type ProjectPin = { location: string; lat: number; lon: number; count: number; region: RegionId };

export const projectPins: ProjectPin[] = [...new Set(caseStudies.map(project => project.location))]
  .filter(location => !notMapped.has(location))
  .map(location => {
    const point = locationPoints[location];
    if (!point) throw new Error(`Add map coordinates for project location: ${location}`);
    const region = regionAt(point[0], point[1]);
    if (!region) throw new Error(`Project location is not inside a coverage region: ${location}`);
    return { location, lat: point[0], lon: point[1], region, count: caseStudies.filter(project => project.location === location).length };
  });

export const projectsInRegion = (id: RegionId) => caseStudies.filter(project => projectPins.some(pin => pin.region === id && pin.location === project.location));

// Plain-language answers shown on the page and repeated in FAQPage structured data.
export const coverageFaqs = [
  { question: 'Do you cover the whole of Scotland?', answer: 'Yes. We work across all of Scotland from our Glasgow office, including the Central Belt, the Borders, Aberdeenshire, the Highlands and the islands. Send us the postcode and we’ll confirm the visit date.' },
  { question: 'Which parts of England do you cover?', answer: 'The north of England: the North West, the North East, and Yorkshire and the Humber. That includes Cumbria, Lancashire, Greater Manchester, Merseyside, Cheshire, Northumberland, Tyne and Wear, County Durham and Yorkshire.' },
  { question: 'Can you help if my building is further south?', answer: 'Scotland and the north of England are where we regularly work. If your building is elsewhere, send us the details and we’ll tell you whether we can help.' },
  { question: 'Does every assessment need a site visit?', answer: 'No. SAP and SBEM calculations are mainly worked from drawings and specifications, so distance rarely affects them. EPC surveys and fire risk assessments need a visit, and we arrange access with you.' }
];
