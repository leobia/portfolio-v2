import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    settings: defineCollection({
      type: 'data',
      source: 'settings.yml',
      schema: z.object({
        ticker: z.array(z.string()),
        nav: z.object({
          logo: z.string(),
          links: z.array(z.object({ label: z.string(), href: z.string() })),
          contact: z.object({ label: z.string(), href: z.string() }),
        }),
      }),
    }),
    hero: defineCollection({
      type: 'data',
      source: 'hero.yml',
      schema: z.object({
        eyebrow: z.string(),
        headline: z.object({ lead: z.string(), accent: z.string() }),
        body: z.string(),
        tags: z.array(z.string()),
        buttons: z.object({
          primary: z.object({ label: z.string(), href: z.string() }),
          secondary: z.object({ label: z.string(), href: z.string() }),
        }),
      }),
    }),
    now: defineCollection({
      type: 'data',
      source: 'now.yml',
      schema: z.object({
        updated: z.string(),
        rows: z.array(z.object({ label: z.string(), value: z.string() })),
        availability: z.string(),
      }),
    }),
    about: defineCollection({
      type: 'page',
      source: 'about.md',
      schema: z.object({
        label: z.string(),
        tagline: z.string(),
      }),
    }),
    journey: defineCollection({
      type: 'data',
      source: 'journey.yml',
      schema: z.object({
        label: z.string(),
        tagline: z.string(),
        entries: z.array(z.object({
          date: z.string(),
          title: z.string(),
          description: z.string(),
        })),
      }),
    }),
    projects: defineCollection({
      type: 'data',
      source: 'projects.yml',
      schema: z.object({
        label: z.string(),
        tagline: z.string(),
        items: z.array(z.object({
          category: z.string(),
          title: z.string(),
          subtitle: z.string(),
          description: z.string(),
          link: z.string().optional(),
          company: z.string().optional(),
          role: z.string(),
          year: z.string(),
          stack: z.array(z.string()),
        })),
      }),
    }),
  },
})
