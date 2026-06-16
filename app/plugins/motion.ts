// Motion directives, adapted to Vue/Nuxt. Registered universally so SSR can
// resolve them (each provides a no-op getSSRProps); all DOM work is client-only.
//   v-reveal    : scroll-reveal via IntersectionObserver (no scroll listeners).
//   v-magnetic  : pointer-following CTA via direct DOM transform (no reactive
//                 state per frame). Both collapse under prefers-reduced-motion.

import type { DirectiveBinding } from 'vue'

const prefersReduced = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default defineNuxtPlugin((nuxtApp) => {
  let observer: IntersectionObserver | null = null

  const ensureObserver = () => {
    if (observer) return observer
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            observer!.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    )
    return observer
  }

  // ── v-reveal ──────────────────────────────────────────────────────────
  nuxtApp.vueApp.directive('reveal', {
    getSSRProps: () => ({ class: 'reveal' }),
    mounted(el: HTMLElement, binding: DirectiveBinding<number | undefined>) {
      if (!import.meta.client) return
      el.classList.add('reveal')
      if (typeof binding.value === 'number') {
        el.style.setProperty('--reveal-delay', `${binding.value}ms`)
      }
      if (prefersReduced()) {
        el.classList.add('is-in')
        return
      }
      ensureObserver().observe(el)
    },
  })

  // ── v-magnetic ────────────────────────────────────────────────────────
  nuxtApp.vueApp.directive('magnetic', {
    getSSRProps: () => ({}),
    mounted(el: HTMLElement, binding: DirectiveBinding<number | undefined>) {
      if (!import.meta.client || prefersReduced()) return
      const strength = binding.value ?? 0.35
      let raf = 0

      const onMove = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect()
        const x = e.clientX - (rect.left + rect.width / 2)
        const y = e.clientY - (rect.top + rect.height / 2)
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(() => {
          el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
        })
      }
      const onLeave = () => {
        cancelAnimationFrame(raf)
        el.style.transform = ''
      }

      el.style.transition = 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
      el.addEventListener('pointermove', onMove)
      el.addEventListener('pointerleave', onLeave)
      ;(el as any).__magnetic = { onMove, onLeave }
    },
    unmounted(el: HTMLElement) {
      const m = (el as any).__magnetic
      if (!m) return
      el.removeEventListener('pointermove', m.onMove)
      el.removeEventListener('pointerleave', m.onLeave)
    },
  })
})
