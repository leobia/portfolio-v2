// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  app: {
    head: {
      title: "Leonardo Bianco",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "robots", content: "index,follow" },
        { name: "description", content: "Personal website Leonardo Bianco sviluppatore firenze" },
        { name: "keywords", content: "Leonardo Bianco software developer programmatore firenze" },
        { name: "author", content: "Leonardo Bianco" },
        { name: "subject", content: "Leonardo Bianco software developer programmatore firenze" },
      ],
      htmlAttrs: {},
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
