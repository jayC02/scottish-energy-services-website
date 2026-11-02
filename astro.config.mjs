import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { productionSite, isIndexablePath } from './src/data/seo-routing.mjs';

export default defineConfig({
  site: productionSite,
  trailingSlash: 'never',
  output: 'static',
  integrations: [react(), sitemap({ filter: (url) => isIndexablePath(new URL(url).pathname) })],
  vite: {
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-dom/client',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        'gsap'
      ]
    }
  }
});
