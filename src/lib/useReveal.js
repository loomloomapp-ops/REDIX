import { useEffect } from 'react'

/**
 * Global IntersectionObserver: any element with class `.reveal*` gets `.in`
 * when it scrolls into view.
 *
 * Pass `enabled=false` to defer observation (e.g. while the preloader is on
 * screen). When `enabled` flips to true, observation begins and any element
 * already in the viewport reveals immediately.
 */
export function useReveal(enabled = true) {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!enabled) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const selector = '.reveal, .reveal-l, .reveal-r, .reveal-up, .reveal-fade, .reveal-stagger'
    if (reduce) {
      document.querySelectorAll(selector).forEach((el) => el.classList.add('in'))
      return
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
    const scan = () => document.querySelectorAll(selector.split(', ').map((s) => `${s}:not(.in)`).join(', ')).forEach((el) => io.observe(el))
    scan()
    // Re-scan when DOM mutates (e.g. case slider re-mount, lang switch)
    const mo = new MutationObserver(() => scan())
    mo.observe(document.body, { childList: true, subtree: true })
    return () => { io.disconnect(); mo.disconnect() }
  }, [enabled])
}
