import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useI18n } from '../i18n.jsx'
import { faq } from '../data.js'

export default function FAQ() {
  const { t, lang } = useI18n()
  const list = faq[lang]
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="bg-ivory text-graphite py-24 md:py-36">
      <div className="mx-auto max-w-container px-5 md:px-10">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-28 self-start">
            <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-green font-bold">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-orange align-middle mr-2.5" aria-hidden />
              {t.faq.eyebrow}
            </div>
            <h2 className="mt-5 font-display font-extrabold uppercase tracking-[-0.03em] text-graphite leading-[0.96]"
                style={{ fontSize: 'clamp(34px, 4.5vw, 56px)' }}>
              {t.faq.h2}
              <span className="text-green">.</span>
            </h2>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <div className="border-t border-graphite/20">
              {list.map((item, i) => {
                const isOpen = open === i
                return (
                  <div key={i} className="border-b border-graphite/20">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      className="w-full text-left py-7 md:py-8 flex items-start justify-between gap-6 group"
                    >
                      <span className="flex items-baseline gap-5 md:gap-8 flex-1 min-w-0">
                        <span className="font-mono text-[11px] uppercase tracking-[0.18em] tabular-nums text-graphite/40 shrink-0">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="font-display font-medium text-lg md:text-xl lg:text-2xl leading-[1.15] tracking-[-0.02em] text-graphite max-w-[42ch] group-hover:text-green transition">
                          {item.q}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className={`mt-1.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition ${
                          isOpen ? 'bg-green text-ivory border-green' : 'border-graphite/25'
                        }`}
                      >
                        <svg
                          viewBox="0 0 16 16"
                          width="14"
                          height="14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className={`transition ${isOpen ? 'rotate-45' : ''}`}
                        >
                          <path d="M8 2v12M2 8h12" />
                        </svg>
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-7 md:pb-8 pl-10 md:pl-16 pr-0 md:pr-12 text-graphite/75 leading-relaxed max-w-[68ch] text-[15px]">
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
