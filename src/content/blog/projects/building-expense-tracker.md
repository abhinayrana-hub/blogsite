---
title: "Building My Personal Expense Tracker"
description: "What I learned while designing and building a cross-platform personal finance tracker."
publishedDate: 2026-08-09
updatedDate: 2026-08-09
category: "projects"
tags: ["React Native", "TypeScript", "Finance", "Product design"]
coverImage: "./cover.svg"
featured: true
draft: false
githubUrl: "https://github.com"
demoUrl: "https://example.com"
technologies: ["React Native", "TypeScript", "Expo"]
---

I wanted something simpler than a full banking dashboard and more useful than a spreadsheet. The goal was a personal finance tracker that felt calm, readable, and low-friction to update.

## The design constraint

The first revision was too ambitious. It tried to cover budgets, subscriptions, monthly summaries, AI insights, and dashboards all at once. It ended up being overwhelming.

I reduced the scope and focused on the core loop:

- log a transaction quickly
- categorize it without friction
- understand monthly trends over time
- keep the data private and local

## The lessons

A good product is often a good filter.

I realized that the hardest part was not the charting or the database design. It was choosing what to show first and what to hide until the user needed it.

```ts
const monthlySummary = transactions.reduce((sum, item) => {
  if (item.type === "expense") return sum + item.amount;
  return sum;
}, 0);
```

The app became more useful after I removed features that looked impressive but made the daily workflow slower.

## Shipping the habit

The real challenge was creating a routine: I needed to enter expenses reliably enough that the app became valuable.

That meant making the flow nearly frictionless, reducing taps, and avoiding unnecessary settings. A calm interface changed the behavior more than any automation.

The product is not perfect, but it is honest. It captures the essentials and leaves room for better budgeting habits to grow over time.
