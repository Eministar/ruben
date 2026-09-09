import { defineConfig } from 'astro/config';

const site = process.env.SITE_URL;
if (site && (!/^https?:\/\//.test(site) || new URL(site).pathname !== '/')) {
  throw new Error('SITE_URL must be an absolute HTTP(S) origin without a path.');
}

export default defineConfig({
  ...(site ? { site } : {}),
  output: 'static',
  trailingSlash: 'always',
});
