import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://rsm.sh",
  integrations: [mdx(), sitemap()],

  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light-high-contrast",
        dark: "github-dark-high-contrast",
      },
      defaultColor: "light-dark()",
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
