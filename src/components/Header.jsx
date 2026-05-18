import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useI18n } from '../i18n.jsx'
import { smoothScrollTo } from '../lib/utils.js'

function useScroll() {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false
    function onScroll() {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        const delta = y - lastY
        setScrolled(y > 40)
        if (y < 80) setHidden(false)
        else if (delta > 6) setHidden(true)
        else if (delta < -6) setHidden(false)
        lastY = y
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return { hidden, scrolled }
}

export default function Header({ onOpenPopup }) {
  const { t, lang, setLang } = useI18n()
  const { hidden, scrolled } = useScroll()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const nav = [
    { id: 'directions', label: t.nav.directions },
    { id: 'cases', label: t.nav.cases },
    { id: 'audit', label: t.nav.audit },
    { id: 'benefits', label: t.nav.benefits },
    { id: 'reviews', label: t.nav.reviews },
    { id: 'faq', label: t.nav.faq },
    { id: 'contacts', label: t.nav.contacts },
  ]

  return (
    <>
      <motion.header
        data-radix-header
        initial={false}
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-40"
      >
        <div
          className={`transition-colors duration-300 ${
            scrolled ? 'bg-ink/85 backdrop-blur-md border-b border-ivory/10' : 'bg-transparent'
          }`}
        >
          <div className="mx-auto max-w-container px-5 md:px-10 h-16 md:h-20 flex items-center justify-between gap-4">
            <button
              onClick={() => smoothScrollTo('top')}
              className="flex items-center gap-2.5 shrink-0"
              aria-label="Radix Agency"
            >
              <img
                src="/logo/mark.png"
                alt=""
                className="h-7 w-7 object-contain"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
              <span className="font-display font-semibold text-[15px] md:text-base text-ivory tracking-[0.02em] uppercase">
                Radix
              </span>
            </button>

            <nav className="hidden xl:flex items-center gap-7">
              {nav.map((n) => (
                <button
                  key={n.id}
                  onClick={() => smoothScrollTo(n.id)}
                  className="font-display text-[13px] uppercase tracking-[0.08em] text-ivory/70 hover:text-green-glow transition"
                >
                  {n.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3 md:gap-4">
              <div className="hidden sm:flex items-center font-mono text-[11px] uppercase tracking-[0.18em] text-ivory/55">
                <button
                  onClick={() => setLang('uk')}
                  aria-pressed={lang === 'uk'}
                  className={`px-1.5 py-0.5 transition ${lang === 'uk' ? 'text-ivory' : 'hover:text-ivory'}`}
                >
                  UA
                </button>
                <span aria-hidden className="opacity-40">/</span>
                <button
                  onClick={() => setLang('ru')}
                  aria-pressed={lang === 'ru'}
                  className={`px-1.5 py-0.5 transition ${lang === 'ru' ? 'text-ivory' : 'hover:text-ivory'}`}
                >
                  RU
                </button>
              </div>

              <button
                onClick={() => smoothScrollTo('audit')}
                className="hidden md:inline-flex items-center rounded-full bg-green text-ivory px-5 py-2.5 font-display font-bold text-[12px] uppercase tracking-[0.08em] hover:bg-green-glow transition"
              >
                {t.cta.book}
              </button>

              <button
                aria-label="Open menu"
                onClick={() => setOpen(true)}
                className="xl:hidden inline-flex items-center justify-center h-10 w-10 rounded-full border border-ivory/25 text-ivory hover:bg-ivory hover:text-ink transition"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 bg-ink text-ivory overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            <div className="min-h-full flex flex-col px-5 pt-5 pb-10">
              <div className="flex items-center justify-between">
                <span className="font-display font-semibold uppercase tracking-[0.02em]">Radix</span>
                <button
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="h-10 w-10 rounded-full border border-ivory/30 inline-flex items-center justify-center hover:bg-ivory hover:text-ink transition"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M6 18L18 6"/></svg>
                </button>
              </div>

              <div className="mt-12 flex flex-col gap-1">
                {nav.map((n, i) => (
                  <button
                    key={n.id}
                    onClick={() => { setOpen(false); setTimeout(() => smoothScrollTo(n.id), 160) }}
                    className="text-left font-display font-medium text-[28px] uppercase tracking-[-0.01em] py-3 border-b border-ivory/10 hover:text-green-glow transition flex items-center gap-3"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ivory/40 tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {n.label}
                  </button>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-5">
                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider">
                  <button onClick={() => setLang('uk')} className={lang === 'uk' ? 'text-green-glow' : 'text-ivory/60'}>UA</button>
                  <span className="opacity-30">/</span>
                  <button onClick={() => setLang('ru')} className={lang === 'ru' ? 'text-green-glow' : 'text-ivory/60'}>RU</button>
                </div>
                <div className="flex gap-4 text-sm">
                  <a href="https://t.me/radixagency" className="underline underline-offset-4" target="_blank" rel="noreferrer">Telegram</a>
                  <a href="https://instagram.com/radixagency" className="underline underline-offset-4" target="_blank" rel="noreferrer">Instagram</a>
                </div>
                <button
                  onClick={() => { setOpen(false); setTimeout(() => onOpenPopup?.(), 200) }}
                  className="mt-2 rounded-full bg-green text-ivory px-5 py-3.5 font-display font-bold uppercase tracking-[0.06em] text-sm hover:bg-green-glow transition"
                >
                  {t.cta.book}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
