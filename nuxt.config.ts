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
      script: [
        // Mark JS-available before first paint so scroll-reveal only hides
        // content when JS can reveal it (no-JS users see everything). Also pick
        // a random accent palette per load (no flash: runs before body paint).
        {
          innerHTML:
            "document.documentElement.classList.add('js');" +
            "(function(){var a=['emerald','cobalt','raspberry','teal','violet','crimson','amber','indigo'];" +
            "document.documentElement.dataset.accent=a[Math.floor(Math.random()*a.length)]})()",
          tagPosition: 'head',
        },
      ],
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },

  modules: ['@nuxt/content', '@nuxt/fonts'],

  css: ['~/assets/scss/main.scss'],

  fonts: {
    families: [
      { name: 'Bricolage Grotesque', provider: 'google', weights: [400, 600, 700, 800] },
      { name: 'Geist', provider: 'google', weights: [400, 500, 600] },
      { name: 'Geist Mono', provider: 'google', weights: [400, 500] },
    ],
  },
})
