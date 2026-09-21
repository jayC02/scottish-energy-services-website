import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://www.scottishenergyservices.co.uk',
  output: 'static',
  integrations: [react()]
});
