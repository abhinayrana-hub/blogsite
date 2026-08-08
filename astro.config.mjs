import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const githubUser = process.env.GITHUB_REPOSITORY_OWNER || "abhinayana";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] || "Abhinay_Blog";
const customSite = process.env.PUBLIC_SITE_URL || process.env.SITE_URL;
const isGitHubPagesDeploy = !customSite && process.env.NODE_ENV === "production";
const site = customSite || `https://${githubUser}.github.io`;
const base = customSite || !isGitHubPagesDeploy ? undefined : `/${repoName}/`;

export default defineConfig({
  site,
  base,
  output: "static",
  integrations: [react(), mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
    },
  },
});
