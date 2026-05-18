import { useEffect } from 'react'

/**
 * Global IntersectionObserver: any element with class `.reveal*` gets `.in`
 * when it scrolls into view.
 *
 * Pass `enabled=false` to defer reveals (e.g. while the preloader is up).
 * When `enabled` flips to true, every already-in-viewport element receives
 * `.in` synchronously on the next frame so above-the-fold content (Hero)
 * never gets stuck in its initial hidden state.
 */
const SELECTORS = ['.reveal', '.reveal-l', '.reveal-r', '.reveal-up', '.reveal-fade', '.reveal-stagger']

export function useReveal(enabled = true) {
  useEffect(() => {
    if (typeof window === 'undefined' || !enabled) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const allSel = SELECTORS.join(', ')
    if (reduce) {
      document.querySelectorAll(allSel).forEach((el) => el.classList.add('in'))
      return
    }

    const pendingSel = SELECTORS.map((s) => `${s}:not(.in)`).join(', ')
    const inViewport = (el) => {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      return r.top < vh * 0.92 && r.bottom > 0
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    const scan = () => {
      document.querySelectorAll(pendingSel).forEach((el) => {
        if (inViewport(el)) el.classList.add('in')
        else io.observe(el)
      })
    }

    // Run once on the next frame so layout is settled after preloader unmount
    const raf = requestAnimationFrame(scan)

    const mo = new MutationObserver(() => scan())
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      mo.disconnect()
    }
  }, [enabled])
}
