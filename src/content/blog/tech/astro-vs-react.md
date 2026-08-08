---
title: "Astro, React and the Case for Static Publishing"
description: "A lighter way to think about interactivity when the content is mostly editorial."
publishedDate: 2026-07-29
updatedDate: 2026-08-01
category: "tech"
tags: ["Astro", "React", "Frontend", "Architecture"]
coverImage: "./cover.svg"
featured: true
draft: false
githubUrl: ""
demoUrl: ""
technologies: ["Astro", "React", "TypeScript"]
---

Static sites are not just for landing pages anymore. For personal websites, technical writing and editorial publishing, the combination of Astro and React can feel surprisingly ergonomic.

## The tradeoff

Astro keeps the base experience extremely fast by default. It renders HTML at build time and only hydrates the islands that truly need interactivity.

React still matters when a component needs state, theme controls, or client-side filtering. The important part is choosing where that hydration actually belongs.

```tsx
export function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme}
    </button>
  );
}
```

This is a sweet spot for a personal blog: the content is static, the UI is calm, and the interactive elements remain intentional.

## Why this matters

A lot of modern web development optimization focuses on JavaScript budgets. That is useful, but there is also a simpler principle: avoid making the site feel like an app when the actual purpose is to read.

The best publishing systems are the ones that quietly disappear.
