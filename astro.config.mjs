import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import lit from "@astrojs/lit";

// https://astro.build/config
export default defineConfig({
  output: 'static', // Ensure fully static output for Vercel free tier
  site: 'https://odyssey-theme.sapling.supply/', // Your public domain, e.g.: https://my-site.dev/. Used to generate sitemaps and canonical URLs.
  integrations: [sitemap(), mdx(), lit(), icon()], // Add renderers to the config
});