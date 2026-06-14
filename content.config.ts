import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    settings: defineCollection({
      type: 'data',
      source: 'settings.yml',
      schema: z.object({
        ticker: z.array(z.string()),
      }),
    }),
  },
})
