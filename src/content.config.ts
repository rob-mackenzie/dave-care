import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Pages: home, morning, evening, problems, contacts, plus any you add.
// `menu` is the label in the top menu (leave it out to hide the page from
// the menu); `order` sets the position in the menu and on the home page.
const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    menu: z.string().optional(),
    order: z.number().default(99),
  }),
});

// One file per problem, listed on the "Common problems" page.
const problems = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/problems' }),
  schema: z.object({
    title: z.string(),
    order: z.number().default(99),
  }),
});

export const collections = { pages, problems };
