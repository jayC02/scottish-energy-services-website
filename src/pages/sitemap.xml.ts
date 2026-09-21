import type { APIRoute } from "astro";
import { publishedProjects } from "../data/projects";
import { insights } from "../data/insights";
export const GET: APIRoute = ({ site }) => {
  const paths = Object.keys(import.meta.glob("./**/*.astro"))
    .filter((p) => !p.includes("[") && !p.includes("404"))
    .map((p) =>
      p
        .replace(/^\.\//, "/")
        .replace(/index\.astro$/, "")
        .replace(/\.astro$/, ""),
    );
  paths.push(
    ...publishedProjects.map((p) => `/projects/${p.slug}`),
    ...insights.map((a) => `/insights/${a.slug}`),
  );
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[...new Set(paths)].map((p) => `<url><loc>${new URL(p, site).href}</loc></url>`).join("")}</urlset>`,
    { headers: { "Content-Type": "application/xml" } },
  );
};
