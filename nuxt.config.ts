// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  ssr: true,

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [{ rel: 'icon', href: '/favicon.ico' }],
    },
  },

  modules: ['@nuxt/content', '@nuxt/fonts'],

  css: ['~/assets/scss/main.scss'],

  fonts: {
    families: [
      { name: 'Space Grotesk', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'Hanken Grotesk', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'JetBrains Mono', provider: 'google', weights: [400, 500, 600] },
    ],
  },
})
