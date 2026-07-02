import { defineCollection, z } from "astro:content";

const articles = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    permalink: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date(),
    status: z.string(),
    public: z.boolean(),
    pinned: z.boolean().default(false),
    pinned_order: z.number().optional(),
    pinned_until: z.coerce.date().optional(),
    cover: z.boolean().default(false),
    cover_reason: z.string().optional(),
    cover_points: z.array(z.string()).default([]),
    featured_until: z.coerce.date().optional(),
    primary_audience: z.array(z.string()),
    student_stage: z.array(z.string()),
    destination: z.array(z.string()),
    resource_lens: z.array(z.string()).default([]),
    family_location: z.array(z.string()).default([]),
    system: z.array(z.string()).default([]),
    track: z.array(z.string()).default([]),
    content_type: z.string(),
    topics: z.array(z.string()),
    season: z.array(z.string()),
    urgency: z.string(),
    decision_type: z.array(z.string()).default([]),
    cross_destination: z.boolean().default(false),
    source_type: z.string(),
    source_name: z.string().optional(),
    source_url: z.string().optional(),
    source_refs: z.array(z.object({
      source_name: z.string(),
      source_type: z.string(),
      original_title: z.string().optional(),
      original_url: z.string().optional(),
      date_seen: z.string().optional(),
      usage: z.string().optional()
    })).default([]),
    pathways: z.array(z.string()).default([]),
    stages: z.array(z.string()).default([]),
    destinations: z.array(z.string()).default([]),
    audiences: z.array(z.string()).default(["parents"]),
    decision_topics: z.array(z.string()).default([]),
    resource_types: z.array(z.string()).default([]),
    content_role: z.string().default("framework"),
    summary: z.string(),
    parent_takeaway: z.string()
  })
});

export const collections = { articles };
