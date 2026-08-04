import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  site: 'https://jengacalc.co.ke',
  trailingSlash: 'ignore',
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
  ],
  output: 'static',
  build: {
    format: 'directory',
  },
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    optimizeDeps: {
      exclude: ['@electric-sql/pglite'],
    },
  },
});
