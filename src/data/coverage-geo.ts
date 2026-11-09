// Simplified outlines for the coverage map. Coordinates are [latitude, longitude], traced
// by hand at roughly 10 km detail: enough for a dot map, not for measuring or legal boundaries.
type Point = [number, number];
type Polygon = Point[];

const greatBritainNorth: Polygon = [
  [52.85, -4.12], [52.92, -4.13], [52.92, -4.5], [53.02, -4.42], [53.14, -4.3], [53.22, -4.55], [53.4, -4.6], [53.42, -4.3], [53.3, -4.05],
  [53.32, -3.85], [53.34, -3.4], [53.38, -3.2], [53.44, -3.05], [53.55, -3.1], [53.65, -3.02], [53.73, -2.95], [53.82, -3.06], [53.93, -3.01],
  [54.05, -2.88], [54.18, -2.82], [54.12, -3.2], [54.25, -3.22], [54.22, -3.35], [54.35, -3.42], [54.51, -3.64], [54.64, -3.57], [54.87, -3.4],
  [54.95, -3.2], [54.99, -3.05], [54.97, -3.26], [54.87, -3.6], [54.79, -4.05], [54.68, -4.4], [54.87, -4.4], [54.85, -4.85], [54.63, -4.86],
  [54.84, -5.12], [55.0, -5.16], [55.1, -5.0], [55.24, -4.85], [55.32, -4.84], [55.46, -4.64], [55.54, -4.68], [55.64, -4.82], [55.79, -4.87],
  [55.88, -4.89], [55.96, -4.82], [55.94, -4.57], [56.0, -4.73], [56.15, -4.78], [55.95, -4.92], [55.86, -4.98], [55.9, -5.2], [55.82, -5.2],
  [55.87, -5.32], [56.25, -4.9], [56.23, -5.07], [56.04, -5.43], [55.87, -5.41], [55.77, -5.33], [55.59, -5.47], [55.42, -5.6], [55.3, -5.8],
  [55.42, -5.74], [55.65, -5.66], [55.8, -5.5], [55.88, -5.7], [56.09, -5.56], [56.13, -5.62], [56.41, -5.48], [56.5, -5.42], [56.57, -5.4],
  [56.82, -5.11], [56.72, -5.24], [56.54, -5.78], [56.73, -6.23], [56.76, -5.85], [56.91, -5.85], [57.0, -5.83], [57.12, -5.6], [57.21, -5.63],
  [57.28, -5.71], [57.43, -5.82], [57.6, -5.75], [57.73, -5.72], [57.86, -5.81], [57.8, -5.6], [57.9, -5.16], [58.02, -5.35], [58.15, -5.25],
  [58.26, -5.38], [58.46, -5.05], [58.62, -5.0], [58.57, -4.75], [58.5, -4.67], [58.52, -4.42], [58.6, -4.02], [58.6, -3.52], [58.67, -3.37],
  [58.64, -3.02], [58.44, -3.08], [58.3, -3.29], [58.11, -3.65], [58.01, -3.85], [57.97, -3.97], [57.87, -4.3], [57.86, -3.78], [57.69, -4.17],
  [57.68, -4.03], [57.49, -4.22], [57.59, -3.87], [57.66, -3.61], [57.72, -3.28], [57.68, -2.96], [57.67, -2.52], [57.69, -2.0], [57.5, -1.77],
  [57.41, -1.84], [57.15, -2.07], [56.96, -2.2], [56.7, -2.45], [56.55, -2.58], [56.46, -2.75], [56.44, -3.0], [56.38, -3.4], [56.4, -2.95],
  [56.4, -2.82], [56.34, -2.79], [56.28, -2.59], [56.19, -2.82], [56.11, -3.15], [56.03, -3.4], [56.1, -3.75], [56.03, -3.7], [55.98, -3.18],
  [56.06, -2.72], [56.0, -2.52], [55.91, -2.14], [55.77, -2.0], [55.68, -1.8], [55.61, -1.7], [55.39, -1.6], [55.33, -1.57], [55.13, -1.5],
  [55.02, -1.42], [54.91, -1.37], [54.69, -1.18], [54.64, -1.15], [54.62, -1.05], [54.49, -0.61], [54.28, -0.39], [54.12, -0.08], [54.08, -0.19],
  [53.91, -0.16], [53.58, 0.11], [53.72, -0.33], [53.7, -0.7], [53.57, -0.07], [53.34, 0.26], [53.14, 0.34], [52.95, 0.0], [52.85, 0.35]
];

const scottishIslands: Polygon[] = [
  [[55.72, -5.3], [55.6, -5.08], [55.44, -5.1], [55.43, -5.35], [55.58, -5.42]], // Arran
  [[55.92, -5.1], [55.75, -5.0], [55.73, -5.1], [55.87, -5.2]], // Bute
  [[55.92, -6.12], [55.73, -6.0], [55.58, -6.25], [55.68, -6.5], [55.88, -6.45]], // Islay
  [[56.16, -5.68], [55.85, -5.9], [55.87, -6.1], [56.1, -5.85]], // Jura
  [[56.65, -6.25], [56.55, -5.72], [56.35, -5.62], [56.27, -6.38], [56.45, -6.35]], // Mull
  [[56.55, -6.98], [56.52, -6.7], [56.45, -6.8], [56.48, -6.98]], // Tiree
  [[56.7, -6.65], [56.62, -6.42], [56.58, -6.55]], // Coll
  [[57.05, -6.42], [57.03, -6.22], [56.94, -6.26], [56.94, -6.42]], // Rum
  [[57.7, -6.35], [57.62, -6.1], [57.42, -6.1], [57.28, -5.75], [57.05, -5.95], [57.15, -6.3], [57.3, -6.75], [57.5, -6.78]], // Skye
  [[58.52, -6.25], [58.3, -6.15], [58.15, -6.35], [57.88, -6.6], [57.76, -7.1], [58.0, -7.15], [58.25, -6.85]], // Lewis and Harris
  [[57.68, -7.2], [57.55, -7.1], [57.1, -7.25], [57.1, -7.45], [57.5, -7.5]], // North and South Uist
  [[57.05, -7.32], [56.93, -7.38], [56.95, -7.56], [57.03, -7.52]], // Barra
  [[59.15, -3.38], [59.13, -2.75], [58.92, -2.72], [58.95, -3.3]], // Orkney Mainland
  [[58.93, -3.42], [58.92, -3.15], [58.78, -3.12], [58.75, -3.32]], // Hoy
  [[59.32, -3.05], [59.3, -2.75], [59.18, -2.72], [59.14, -3.08]], // Northern Orkney
  [[60.56, -1.42], [60.3, -1.1], [60.1, -1.15], [59.86, -1.27], [59.88, -1.4], [60.2, -1.5], [60.3, -1.7], [60.5, -1.6]], // Shetland Mainland
  [[60.72, -1.2], [60.62, -0.98], [60.48, -0.98], [60.5, -1.18]], // Yell
  [[60.84, -0.96], [60.8, -0.76], [60.68, -0.76], [60.68, -0.98]] // Unst
];

const outsideCoverage: Polygon[] = [
  [[54.42, -4.4], [54.3, -4.32], [54.06, -4.65], [54.12, -4.82], [54.32, -4.68]], // Isle of Man
  [[55.38, -7.37], [55.2, -6.5], [55.22, -6.15], [55.05, -5.95], [54.72, -5.68], [54.62, -5.45], [54.4, -5.46], [54.25, -5.6], [54.08, -6.05],
    [53.95, -6.3], [53.72, -6.25], [53.3, -6.12], [52.85, -6.1], [52.85, -8.1], [55.2, -8.1], [55.25, -7.7]] // North-east Ireland
];

// Southern and Welsh edge of the English coverage area, west to east.
const englishSouthLimit: Point[] = [
  [53.25, -3.15], [52.95, -2.75], [52.95, -2.4], [53.12, -2.05], [53.5, -1.95], [53.35, -1.7], [53.3, -1.4], [53.4, -1.15], [53.45, -0.9],
  [53.6, -0.78], [53.45, -0.3], [53.45, 0.4]
];
// Scotland-England border, west to east.
const border: Point[] = [[54.97, -3.3], [54.99, -3.05], [55.03, -2.85], [55.2, -2.5], [55.35, -2.3], [55.6, -2.2], [55.8, -2.03], [55.8, -1.5]];

const inPolygon = (lat: number, lon: number, polygon: Polygon) => {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [latA, lonA] = polygon[i];
    const [latB, lonB] = polygon[j];
    if ((lonA > lon) !== (lonB > lon) && lat < ((latB - latA) * (lon - lonA)) / (lonB - lonA) + latA) inside = !inside;
  }
  return inside;
};

// Latitude of a west-to-east line at a given longitude.
const lineLatAt = (lon: number, line: Point[]) => {
  if (lon <= line[0][1]) return line[0][0];
  for (let i = 1; i < line.length; i++) {
    const [latA, lonA] = line[i - 1];
    const [latB, lonB] = line[i];
    if (lon <= lonB) return latA + ((lon - lonA) / (lonB - lonA)) * (latB - latA);
  }
  return line[line.length - 1][0];
};

export type RegionId = 'central-belt' | 'south-scotland' | 'tayside-fife' | 'north-east-scotland' | 'highlands-islands' | 'north-west-england' | 'north-east-england' | 'yorkshire-humber';

// Returns a coverage region, null for land we don't cover, or undefined for sea.
export const regionAt = (lat: number, lon: number): RegionId | null | undefined => {
  if (outsideCoverage.some(polygon => inPolygon(lat, lon, polygon))) return null;
  const island = scottishIslands.some(polygon => inPolygon(lat, lon, polygon));
  if (!island && !inPolygon(lat, lon, greatBritainNorth)) return undefined;

  const scottish = island || lat > lineLatAt(lon, border);
  if (!scottish) {
    if (lat < lineLatAt(lon, englishSouthLimit)) return null;
    if (lon < -3.1 && lat < 53.5) return null; // North Wales
    if (lon < (lat < 53.7 ? -2.03 : lat < 54.3 ? -2.2 : -2.45)) return 'north-west-england';
    return lat >= 54.5 ? 'north-east-england' : 'yorkshire-humber';
  }
  if (island) return lat < 55.8 && lon > -5.5 ? 'south-scotland' : 'highlands-islands';
  if (lon < -5.25 || (lon < -4.95 && lat > 55.7)) return 'highlands-islands';
  if (lat >= 56.8 && lon > -3.75) return 'north-east-scotland';
  if (lat >= 56.03 && lat < 56.9 && lon > -3.75) return 'tayside-fife';
  if (lat >= 56.25 && lat < 56.9 && lon > -4.4) return 'tayside-fife';
  if (lat >= 55.62 && lat < 56.25 && lon > -4.95) return 'central-belt';
  if (lat < 55.62) return 'south-scotland';
  return 'highlands-islands';
};

// Map frame. Latitudes run down the page; longitude is scaled for the map's mid latitude.
const frame = { north: 60.95, south: 52.85, west: -8.1, east: 0.75 };
const pxPerDegree = 111;
const lonScale = Math.cos((56.5 * Math.PI) / 180);
export const mapSize = {
  width: Math.round((frame.east - frame.west) * lonScale * pxPerDegree),
  height: Math.round((frame.north - frame.south) * pxPerDegree)
};
export const project = (lat: number, lon: number) => ({
  x: Math.round((lon - frame.west) * lonScale * pxPerDegree),
  y: Math.round((frame.north - lat) * pxPerDegree)
});

const glasgow: Point = [55.86, -4.25];
const distanceKm = (lat: number, lon: number) => Math.hypot((lat - glasgow[0]) * 111, (lon - glasgow[1]) * 111 * lonScale);
const ringKm = 55;
export const ringOf = (lat: number, lon: number) => Math.floor(distanceKm(lat, lon) / ringKm);

// Lays a hexagonal dot grid over the land. Dots are grouped by region and by distance
// from Glasgow, so they can light up in rings moving outward from the office.
export function buildDotMap(spacing = 8) {
  const rowHeight = Math.round(spacing * 0.875);
  const covered = new Map<string, { region: RegionId; ring: number; d: string }>();
  let outside = '';
  for (let row = 0, y = rowHeight / 2; y < mapSize.height; row++, y += rowHeight) {
    for (let x = row % 2 ? spacing / 2 : 0; x < mapSize.width; x += spacing) {
      const lat = frame.north - y / pxPerDegree;
      const lon = frame.west + x / (lonScale * pxPerDegree);
      const region = regionAt(lat, lon);
      if (region === undefined) continue;
      const dot = `M${x} ${y}h0`;
      if (region === null) { outside += dot; continue; }
      const ring = ringOf(lat, lon);
      const key = `${region}-${ring}`;
      const group = covered.get(key) ?? { region, ring, d: '' };
      group.d += dot;
      covered.set(key, group);
    }
  }
  return { outside, groups: [...covered.values()] };
}
