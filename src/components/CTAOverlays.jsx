import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useI18n } from '../i18n.jsx'

export default function CTAOverlays({ onOpenPopup, popupOpen }) {
  const { t } = useI18n()
  const [show, setShow] = useState(false)
  const [nearFooter, setNearFooter] = useState(false)
  const [inForm, setInForm] = useState(false)

  useEffect(() => {
    function check() {
      const y = window.scrollY
      setShow(y > 480)

      const footer = document.getElementById('contacts')
      const audit = document.getElementById('audit')
      const vh = window.innerHeight

      if (footer) {
        const r = footer.getBoundingClientRect()
        setNearFooter(r.top < vh - 80)
      }
      if (audit) {
        const r = audit.getBoundingClientRect()
        setInForm(r.top < vh * 0.55 && r.bottom > vh * 0.2)
      }
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [])

  const stickyVisible = show && !popupOpen && !nearFooter && !inForm
  const floatingVisible = show && !popupOpen

  return (
    <>
      <AnimatePresence>
        {floatingVisible && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={onOpenPopup}
            className="hidden md:inline-flex fixed bottom-6 right-6 z-30 items-center gap-3 rounded-full bg-ink text-ivory pl-5 pr-3 py-3 shadow-2xl hover:bg-graphite transition border border-ivory/15"
            aria-label={t.floating}
          >
            <span className="font-display font-medium uppercase tracking-[0.06em] text-[12px]">{t.floating}</span>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-green text-ivory">
              <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M4 10h12M11 5l5 5-5 5"/>
              </svg>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stickyVisible && (
          <motion.div
            initial={{ y: 90 }}
            animate={{ y: 0 }}
            exit={{ y: 90 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-30 px-3 pb-3 pointer-events-none"
            style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}
          >
            <button
              type="button"
              onClick={onOpenPopup}
              className="pointer-events-auto w-full inline-flex items-center justify-center gap-2 rounded-full bg-green text-ivory py-4 font-display font-bold uppercase tracking-[0.06em] text-sm shadow-2xl"
            >
              {t.sticky}
              <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M4 10h12M11 5l5 5-5 5"/>
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
