import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import lit from "@astrojs/lit";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: vercel(),
  site: 'https://experienceafrica.co.za',
  integrations: [sitemap(), mdx(), lit(), icon()],
  redirects: {
    '/_paylink/[id]': '/paylink/[id]',
  },
});