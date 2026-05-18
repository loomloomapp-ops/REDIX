import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useI18n } from '../i18n.jsx'
import { cases } from '../data.js'
import { smoothScrollTo } from '../lib/utils.js'

export default function Cases() {
  const { t, lang } = useI18n()
  const list = cases[lang]
  const [idx, setIdx] = useState(0)
  const total = list.length
  const dragStart = useRef(0)
  const containerRef = useRef(null)

  const go = (n) => setIdx(((n % total) + total) % total)
  const next = () => go(idx + 1)
  const prev = () => go(idx - 1)

  useEffect(() => {
    function onKey(e) {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const inView = rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.3
      if (!inView) return
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [idx])

  const current = list[idx]

  return (
    <section
      id="cases"
      ref={containerRef}
      className="relative bg-graphite text-ivory py-24 md:py-36 overflow-hidden"
    >
      {/* Subtle green anchor */}
      <div className="pointer-events-none absolute -top-32 left-[-10%] w-[60%] h-[60%] bg-green/15 blur-[120px] rounded-full" aria-hidden />

      <div className="relative mx-auto max-w-container px-5 md:px-10">
        {/* Header */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-6 items-end">
          <div className="col-span-12 md:col-span-7">
            <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-orange font-bold">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-orange align-middle mr-2.5" aria-hidden />
              {t.cases.eyebrow}
            </div>
            <h2 className="mt-5 font-display font-extrabold uppercase tracking-[-0.03em] text-ivory max-w-[16ch] leading-[0.96]"
                style={{ fontSize: 'clamp(32px, 4.6vw, 58px)' }}>
              {t.cases.h2}
              <span className="text-orange">.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 flex md:justify-end items-center gap-3">
            <button
              onClick={prev}
              aria-label="Previous case"
              className="h-11 w-11 rounded-full border border-ivory/25 hover:bg-ivory hover:text-graphite transition inline-flex items-center justify-center"
            >
              <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5l-5 5 5 5"/></svg>
            </button>
            <button
              onClick={next}
              aria-label="Next case"
              className="h-11 w-11 rounded-full border border-ivory/25 hover:bg-ivory hover:text-graphite transition inline-flex items-center justify-center"
            >
              <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 5l5 5-5 5"/></svg>
            </button>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ivory/55 ml-3 tabular-nums">
              {String(idx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </div>
          </div>
        </div>

        {/* Asymmetric case layout */}
        <div className="mt-12 md:mt-16 relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 36 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -36 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              dragMomentum={false}
              onDragStart={(_, info) => { dragStart.current = info.point.x }}
              onDragEnd={(_, info) => {
                const delta = info.point.x - dragStart.current
                if (delta < -60) next()
                else if (delta > 60) prev()
              }}
              className="grid grid-cols-12 gap-6 md:gap-10 items-start cursor-grab active:cursor-grabbing"
            >
              {/* Phone-frame screenshot — height-capped so the whole case fits one viewport */}
              <div className="col-span-12 lg:col-span-5 flex justify-center lg:justify-start">
                <div
                  className="relative"
                  style={{
                    width: 'min(100%, 320px, calc(68vh * 9 / 16))',
                    aspectRatio: '9 / 16',
                    maxHeight: '68vh',
                  }}
                >
                  {/* device frame */}
                  <div className="absolute inset-0 rounded-[36px] bg-ivory/[0.04] border border-ivory/12 p-3 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)]">
                    <div className="relative h-full w-full overflow-hidden rounded-[26px] bg-graphite">
                      <img
                        src={current.image}
                        alt={`Case ${idx + 1}: ${current.niche}`}
                        className="absolute inset-0 w-full h-full object-cover object-top"
                        loading="lazy"
                        draggable="false"
                      />
                      <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-graphite/40 to-transparent pointer-events-none" />
                      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-graphite/55 to-transparent pointer-events-none" />
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.24em] text-ivory/85">
                        <span>case · {String(idx + 1).padStart(2, '0')}</span>
                        <span>{current.geo}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column — meta */}
              <div className="col-span-12 lg:col-span-7 flex flex-col">
                <div className="font-display font-medium leading-[1.05] tracking-[-0.02em] text-ivory"
                     style={{ fontSize: 'clamp(26px, 2.6vw, 36px)' }}>
                  {current.niche}
                </div>
                <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ivory/55">
                  {current.channel} · {current.geo}
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-10">
                  <Block label={t.cases.labels.task} text={current.task} />
                  <Block label={t.cases.labels.solution} text={current.solution} />
                  <Block label={t.cases.labels.result} text={current.result} accent />
                  <Block label={t.cases.labels.insight} text={current.insight} italic />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="mt-12 h-[2px] bg-ivory/10 relative overflow-hidden">
          <motion.div
            key={idx}
            initial={{ width: 0 }}
            animate={{ width: `${((idx + 1) / total) * 100}%` }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-0 h-full bg-orange"
          />
        </div>

        <button
          onClick={() => smoothScrollTo('audit')}
          className="group mt-10 inline-flex items-start gap-3 text-left max-w-[58ch]"
        >
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange shrink-0" aria-hidden />
          <span className="text-base md:text-lg text-ivory/85 group-hover:text-ivory leading-relaxed">
            {t.cases.ctaPost}
            <span className="ml-2 underline underline-offset-4 decoration-ivory/30">→</span>
          </span>
        </button>
      </div>
    </section>
  )
}

function Block({ label, text, accent, italic }) {
  return (
    <div className="py-4 border-b border-ivory/10 last:border-b-0">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ivory/45">{label}</div>
      <div
        className={`mt-2 leading-relaxed ${
          italic ? 'font-serif italic text-lg md:text-xl text-ivory' : accent ? 'text-orange text-base md:text-lg font-display font-medium' : 'text-ivory/80 text-sm md:text-[15px]'
        }`}
      >
        {text}
      </div>
    </div>
  )
}
