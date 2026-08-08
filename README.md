# Abhinay Blog

A minimal, static personal blog built with Astro and designed around a quiet editorial aesthetic. The site is optimized for fast browsing, clean Markdown publishing, static hosting, and low-maintenance deployment to GitHub Pages.

## Overview

This project is a personal publishing platform for essays, notes, projects, travel writing, and reflective pieces. Content is organized into category-based collections and published as static HTML for excellent performance and low hosting cost.

### Core goals

- Static site generation with Astro
- Markdown-first content workflow
- Clean category routes: projects, tech, travel, reflections
- Light/dark mode with a minimal Japanese-inspired palette
- SEO-friendly metadata, sitemap, and RSS output
- GitHub Pages deployment with custom domain support
- Fast desktop/mobile performance with lightweight assets

## Project structure

```text
.
├── public/
│   ├── CNAME
│   └── favicon.svg
├── src/
│   ├── components/
│   ├── config/
│   ├── content/
│   │   └── blog/
│   │       ├── projects/
│   │       ├── tech/
│   │       ├── travel/
│   │       └── reflections/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   └── styles/
├── templates/
├── .github/workflows/
├── astro.config.mjs
├── package.json
├── README.md
└── tsconfig.json
```

## Writing new posts

Create a new Markdown file inside the correct category folder:

- `src/content/blog/projects/`
- `src/content/blog/tech/`
- `src/content/blog/travel/`
- `src/content/blog/reflections/`

Each post uses frontmatter such as:

```md
---
title: "Your article title"
description: "Short summary for the index and metadata"
date: 2025-08-09
category: "tech"
tags: ["Astro", "Frontend", "Performance"]
cover: "./cover.svg"
featured: true
---

Your article content here.
```

You can copy the templates in `templates/` as a starting point.

## Development

From the project root:

```bash
npm install
npm run dev
```

The local site runs at `http://localhost:4321`.

## Production build

```bash
npm run build
```

This produces the static output in `dist/`.

## Deployment to GitHub Pages

The project includes a GitHub Actions deploy workflow in `.github/workflows/deploy.yml`.

Typical setup:

1. Push the repo to GitHub.
2. Enable GitHub Pages in the repo settings.
3. Choose the GitHub Actions deployment method.
4. Update `public/CNAME` with your custom domain if needed.
5. Commit and push.

## Notes

- The blog uses Astro content collections and static generation.
- The site is intentionally lightweight and optimized for a minimal editorial feel.
- Styling and theme behavior are centered around a calm, premium, Japanese-inspired design system.
- RSS feed and sitemap are generated automatically.

## Useful commands

```bash
npm run dev
npm run build
npm run preview
```
# blogsite
