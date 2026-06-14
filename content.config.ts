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
  },
})
