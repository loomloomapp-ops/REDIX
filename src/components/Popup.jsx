import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useI18n } from '../i18n.jsx'
import LeadForm from './LeadForm.jsx'

export default function Popup({ open, onClose }) {
  const { t } = useI18n()
  const ref = useRef(null)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open) return
    function onKey(e) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (!open || !ref.current) return
    const node = ref.current
    const focusables = node.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )
    if (focusables.length) focusables[0].focus({ preventScroll: true })
    function trap(e) {
      if (e.key !== 'Tab') return
      const f = node.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
      if (!f.length) return
      const first = f[0]
      const last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault() }
      else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault() }
    }
    node.addEventListener('keydown', trap)
    return () => node.removeEventListener('keydown', trap)
  }, [open])

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[60] flex items-end md:items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="popup-title"
        >
          <div className="absolute inset-0 bg-ink/75 backdrop-blur-md" onClick={onClose} />
          <motion.div
            ref={ref}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full md:max-w-[580px] mx-0 md:mx-4 bg-ink text-ivory rounded-t-3xl md:rounded-[22px] border border-ivory/15 shadow-2xl max-h-[92vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-ink/95 backdrop-blur px-6 md:px-8 pt-6 pb-4 flex items-start justify-between gap-4 border-b border-ivory/10 z-10">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-green-glow">Radix</div>
                <h3 id="popup-title" className="mt-2 font-display font-extrabold uppercase tracking-[-0.02em] text-2xl md:text-3xl text-ivory leading-tight">
                  {t.popup.title}
                  <span className="text-green-glow">.</span>
                </h3>
                <p className="mt-2 text-sm text-ivory/70 max-w-[44ch] leading-relaxed">{t.popup.sub}</p>
              </div>
              <button
                type="button"
                aria-label={t.popup.close}
                onClick={onClose}
                className="shrink-0 h-9 w-9 rounded-full border border-ivory/25 inline-flex items-center justify-center hover:bg-ivory hover:text-ink transition"
              >
                <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 5l10 10M5 15L15 5"/></svg>
              </button>
            </div>
            <div className="px-6 md:px-8 py-6">
              <LeadForm source="popup" compact dark />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
