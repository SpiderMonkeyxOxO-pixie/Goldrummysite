import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    // Optional shorter <title>-tag override — keeps on-page H1s descriptive
    // while keeping the SERP title within a safe character budget.
    seoTitle: z.string().optional(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string().default('Gold Rummy Editorial Team'),
    excerpt: z.string(),
  }),
});

export const collections = { blog };
