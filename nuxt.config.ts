// Runs in the browser before first paint (serialized via .toString() into an
// inline <head> script). Picks one random hue and derives the whole accent
// palette from it, so a new colour appears every refresh without hand-writing
// per-colour CSS. Self-contained on purpose: no outer references survive
// stringification. Mirrors the --accent-* tokens defined in _tokens.scss.
function generateAccent() {
  const root = document.documentElement
  const hue = Math.floor(Math.random() * 360)
  const sat = 70 // saturation %, fixed for a consistent vividness

  // HSL -> [r, g, b] (0-255). lightness in %.
  const rgb = (light: number): [number, number, number] => {
    const s = sat / 100
    const l = light / 100
    const a = s * Math.min(l, 1 - l)
    const f = (n: number) => {
      const k = (n + hue / 30) % 12
      return 255 * (l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1)))
    }
    return [f(0), f(8), f(4)]
  }

  // WCAG relative luminance of an [r, g, b] triple.
  const lum = (c: number[]) =>
    c
      .map((v) => {
        const x = v / 255
        return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4)
      })
      .reduce((sum, x, i) => sum + x * [0.2126, 0.7152, 0.0722][i], 0)

  const contrastWithWhite = (c: number[]) => 1.05 / (lum(c) + 0.05)

  // Darken the accent (hue-aware) until white text on it clears WCAG AA, so
  // yellows/greens get pushed dark enough instead of washing out.
  let light = 52
  while (light > 22 && contrastWithWhite(rgb(light)) < 4.6) light -= 1

  const css = (c: [number, number, number]) =>
    `rgb(${c.map(Math.round).join(' ')})`
  const rgba = (c: [number, number, number], alpha: number) =>
    `rgb(${c.map(Math.round).join(' ')} / ${alpha})`

  const accent = rgb(light)
  const set = (name: string, value: string) => root.style.setProperty(name, value)
  set('--accent', css(accent))
  set('--accent-hover', css(rgb(light - 8)))
  set('--accent-ink', css(rgb(light - 2)))
  set('--accent-tint', rgba(accent, 0.09))
  set('--accent-line', rgba(accent, 0.3))
  set('--on-accent', css(rgb(97))) // hue-tinted near-white text on fills
}

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
        // content when JS can reveal it (no-JS users see everything). Then
        // generate a fresh accent palette from a single random hue and write
        // every --accent-* token inline on <html> (no flash: runs before body
        // paint; the :root defaults cover SSR / no-JS). See generateAccent().
        {
          innerHTML:
            "document.documentElement.classList.add('js');(" +
            generateAccent.toString() +
            ')()',
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
