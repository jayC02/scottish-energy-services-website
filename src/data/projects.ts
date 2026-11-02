import { caseStudies, type CaseStudy } from './project-cases';

export type Project = CaseStudy & {
  slug: string;
  type: 'image' | 'video';
  src: string;
  poster?: string;
  thumbnail: string;
  fallback?: string;
  alt: string;
  link: string;
};

// Keep the five supplied videos in the homepage gallery. The full catalogue lives
// separately so new case studies do not crowd the expanding gallery.
const projectMedia = [
  {
    slug: 'glasgow-airport', type: 'video',
    src: '/videos/projects/glasgow-airport.mp4',
    poster: '/images/projects/glasgow-airport-poster.webp',
    thumbnail: '/images/projects/glasgow-airport-poster-small.webp',
    alt: 'Glasgow Airport in the supplied project footage',
  },
  {
    slug: 'university-of-edinburgh', type: 'video',
    src: '/videos/projects/university-of-edinburgh.mp4',
    poster: '/images/projects/university-of-edinburgh-poster.webp',
    thumbnail: '/images/projects/university-of-edinburgh-poster-small.webp',
    alt: 'University of Edinburgh buildings in the supplied project footage',
  },
  {
    slug: 'st-james-quarter', type: 'video',
    src: '/videos/projects/st-james-centre.mp4',
    poster: '/images/projects/st-james-centre-poster.webp',
    thumbnail: '/images/projects/st-james-centre-poster-small.webp',
    alt: 'Aerial view of St James in Edinburgh from the supplied project footage',
  },
  {
    slug: 'sec-armadillo', type: 'video',
    src: '/videos/projects/sec-armadillo.mp4',
    poster: '/images/projects/sec-armadillo-poster.webp',
    thumbnail: '/images/projects/sec-armadillo-poster-small.webp',
    alt: 'The SEC Armadillo beside the River Clyde',
  },
  {
    slug: 'kelvingrove-art-gallery', type: 'video',
    src: '/videos/projects/kelvingrove-art-gallery.mp4',
    poster: '/images/projects/kelvingrove-art-gallery-poster.webp',
    thumbnail: '/images/projects/kelvingrove-art-gallery-poster-small.webp',
    alt: 'Kelvingrove Art Gallery and its grounds in the supplied project footage',
  }
] as const;

export const projects: Project[] = projectMedia.map(media => {
  const project = caseStudies.find(item => item.slug === media.slug);
  if (!project) throw new Error(`Missing project: ${media.slug}`);
  return { ...project, ...media, link: `/projects/${media.slug}` };
});
