export type Project = {
  slug: string;
  title: string;
  client?: string;
  sector: string;
  location: string;
  services: string[];
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  image: string;
  imageAlt: string;
  statistics?: { value: string; label: string }[];
  approved: boolean;
};
// OWNER TODO: Add permission-cleared case studies. Only approved records are published.
// Do not use the Glasgow context image as evidence that SES assessed a pictured building.
export const projects: Project[] = [];
export const publishedProjects = projects.filter((project) => project.approved);
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  approved: boolean;
};
// OWNER TODO: Add genuine quotations with permission and attributable names.
export const testimonials: Testimonial[] = [];
