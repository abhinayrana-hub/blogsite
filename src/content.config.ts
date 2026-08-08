import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishedDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      category: z.enum(["projects", "tech", "travel", "reflections", "dsa"]),
      tags: z.array(z.string()).default([]),
      coverImage: image().optional(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
      location: z.string().optional(),
      travelDate: z.string().optional(),
      githubUrl: z.string().url().optional().or(z.literal("")),
      demoUrl: z.string().url().optional().or(z.literal("")),
      technologies: z.array(z.string()).default([]),
    }),
});

export const collections = { blog };
