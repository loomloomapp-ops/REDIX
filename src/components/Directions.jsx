import { motion } from 'framer-motion'
import { useI18n } from '../i18n.jsx'
import { directions } from '../data.js'
import { smoothScrollTo } from '../lib/utils.js'

export default function Directions() {
  const { t, lang } = useI18n()
  const list = directions[lang]

  return (
    <section id="directions" className="relative py-24 md:py-36 bg-ivory text-graphite">
      <div className="mx-auto max-w-container px-5 md:px-10">
        <div className="grid grid-cols-12 gap-x-6 gap-y-14">
          {/* Left: header */}
          <div className="col-span-12 lg:col-span-5 lg:sticky lg:top-28 self-start lg:pr-6 xl:pr-10">
            <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-green font-bold">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-orange align-middle mr-2.5" aria-hidden />
              {t.directions.eyebrow}
            </div>
            <h2 className="mt-6 font-display font-extrabold uppercase tracking-[-0.03em] text-graphite leading-[0.96] break-words max-w-full"
                style={{ fontSize: 'clamp(30px, 3.4vw, 48px)' }}>
              {t.directions.h2}
              <span className="text-green">.</span>
            </h2>
            <p className="mt-6 text-graphite/70 leading-relaxed max-w-[40ch]">{t.directions.sub}</p>

            <button
              onClick={() => smoothScrollTo('audit')}
              className="group mt-10 inline-flex items-start gap-3 text-left max-w-[40ch]"
            >
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange shrink-0" aria-hidden />
              <span className="text-sm md:text-[15px] text-graphite/85 group-hover:text-graphite leading-relaxed">
                {t.directions.cta}
                <span className="ml-2 underline underline-offset-4 decoration-orange/70 text-graphite">→</span>
              </span>
            </button>
          </div>

          {/* Right: editorial numbered list */}
          <div className="col-span-12 lg:col-span-7">
            <ul className="border-t border-graphite/15">
              {list.map((d, i) => (
                <motion.li
                  key={d}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.35, delay: Math.min(i * 0.025, 0.4) }}
                  className="group border-b border-graphite/15"
                >
                  <button
                    type="button"
                    onClick={() => smoothScrollTo('audit')}
                    className="w-full flex items-baseline gap-5 md:gap-8 py-5 md:py-6 text-left transition hover:bg-graphite hover:text-ivory px-1 md:px-3 -mx-1 md:-mx-3 rounded-sm"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] tabular-nums text-graphite/45 group-hover:text-ivory/60 shrink-0 w-10">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display font-medium text-xl md:text-2xl lg:text-[28px] leading-[1.1] tracking-[-0.02em] flex-1">
                      {d}
                    </span>
                    <span aria-hidden className="font-mono text-xs opacity-0 group-hover:opacity-100 transition">→</span>
                  </button>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
