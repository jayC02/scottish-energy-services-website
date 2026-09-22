export type Project = {
  slug: string;
  type: 'image' | 'video';
  src: string;
  poster?: string;
  thumbnail: string;
  fallback?: string;
  label: string;
  sector: string;
  summary: string;
  alt: string;
  link: string;
};

// Project selection and media supplied by SES. No service scope or outcomes inferred.
// Add approved assessment scope, dates and results before creating individual case studies.
export const projects: Project[] = [
  {
    slug: 'glasgow-airport', type: 'video',
    src: '/videos/projects/glasgow-airport.mp4',
    poster: '/images/projects/glasgow-airport-poster.webp',
    thumbnail: '/images/projects/glasgow-airport-poster-small.webp',
    label: 'Glasgow Airport', sector: 'Aviation',
    summary: 'A major Scottish aviation estate.',
    alt: 'Glasgow Airport in the supplied project footage',
    link: '/projects#glasgow-airport'
  },
  {
    slug: 'university-of-edinburgh', type: 'video',
    src: '/videos/projects/university-of-edinburgh.mp4',
    poster: '/images/projects/university-of-edinburgh-poster.webp',
    thumbnail: '/images/projects/university-of-edinburgh-poster-small.webp',
    label: 'University of Edinburgh', sector: 'Education',
    summary: 'University buildings and public spaces in Edinburgh.',
    alt: 'University of Edinburgh buildings in the supplied project footage',
    link: '/projects#university-of-edinburgh'
  },
  {
    slug: 'st-james-quarter', type: 'video',
    src: '/videos/projects/st-james-centre.mp4',
    poster: '/images/projects/st-james-centre-poster.webp',
    thumbnail: '/images/projects/st-james-centre-poster-small.webp',
    label: 'St James Quarter', sector: 'Retail & mixed use',
    summary: 'A retail and mixed-use destination in Edinburgh.',
    alt: 'Aerial view of St James in Edinburgh from the supplied project footage',
    link: '/projects#st-james-quarter'
  },
  {
    slug: 'sec-armadillo', type: 'video',
    src: '/videos/projects/sec-armadillo.mp4',
    poster: '/images/projects/sec-armadillo-poster.webp',
    thumbnail: '/images/projects/sec-armadillo-poster-small.webp',
    label: 'SEC Armadillo', sector: 'Events & entertainment',
    summary: 'A distinctive events venue on Glasgow’s River Clyde waterfront.',
    alt: 'The SEC Armadillo beside the River Clyde',
    link: '/projects#sec-armadillo'
  },
  {
    slug: 'kelvingrove-art-gallery', type: 'video',
    src: '/videos/projects/kelvingrove-art-gallery.mp4',
    poster: '/images/projects/kelvingrove-art-gallery-poster.webp',
    thumbnail: '/images/projects/kelvingrove-art-gallery-poster-small.webp',
    label: 'Kelvingrove Art Gallery', sector: 'Arts & culture',
    summary: 'A landmark gallery and museum in Glasgow.',
    alt: 'Kelvingrove Art Gallery and its grounds in the supplied project footage',
    link: '/projects#kelvingrove-art-gallery'
  }
];
