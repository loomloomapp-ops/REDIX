import { motion } from 'framer-motion'
import { useI18n } from '../i18n.jsx'

export default function Benefits() {
  const { t } = useI18n()
  const items = t.benefits.items
  const ai = items.find((i) => i.highlight)
  const rest = items.filter((i) => !i.highlight)

  return (
    <section id="benefits" className="bg-ivory text-graphite">
      {/* Top: numbered editorial rows on ivory */}
      <div className="mx-auto max-w-container px-5 md:px-10 pt-24 md:pt-36 pb-20 md:pb-28">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8 items-end">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-green font-bold">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-orange align-middle mr-2.5" aria-hidden />
              {t.benefits.eyebrow}
            </div>
            <h2 className="mt-5 font-display font-extrabold uppercase tracking-[-0.03em] text-graphite max-w-[20ch] leading-[0.96]"
                style={{ fontSize: 'clamp(34px, 4.8vw, 60px)' }}>
              {t.benefits.h2}
              <span className="text-green">.</span>
            </h2>
          </div>
        </div>

        <div className="mt-14 md:mt-20 grid grid-cols-12 gap-x-6 gap-y-0 border-t border-graphite/15">
          {rest.map((it, i) => (
            <motion.div
              key={it.tag}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="col-span-12 md:col-span-12 grid grid-cols-12 gap-x-6 py-8 md:py-10 border-b border-graphite/15"
            >
              <div className="col-span-12 md:col-span-2">
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] tabular-nums text-orange">
                  {it.tag}
                </div>
              </div>
              <div className="col-span-12 md:col-span-5">
                <h3 className="font-display font-medium text-2xl md:text-3xl text-graphite leading-[1.1] tracking-[-0.02em]">
                  {it.title}
                </h3>
              </div>
              <div className="col-span-12 md:col-span-5">
                <p className="text-graphite/70 leading-relaxed text-[15px]">{it.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom: AI highlight band on dark */}
      <div className="bg-ink text-ivory relative overflow-hidden">
        <div className="pointer-events-none absolute -top-32 right-[-10%] w-[50%] h-[60%] bg-green-glow/20 blur-[120px] rounded-full" aria-hidden />
        <div className="pointer-events-none absolute -bottom-40 left-[-5%] w-[40%] h-[60%] bg-orange/15 blur-[120px] rounded-full" aria-hidden />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-container px-5 md:px-10 py-20 md:py-28 grid grid-cols-12 gap-x-6 gap-y-10"
        >
          <div className="col-span-12 lg:col-span-7">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-orange">{ai.tag}</span>
              <span className="h-px w-10 bg-ivory/30" />
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ivory/60">{t.benefits.aiMeta}</span>
            </div>
            <h3 className="mt-7 font-display font-extrabold uppercase tracking-[-0.03em] leading-[0.95]"
                style={{ fontSize: 'clamp(32px, 4.5vw, 54px)' }}>
              {ai.title}
              <span className="text-green-glow">.</span>
            </h3>
            <p className="mt-6 text-ivory/75 leading-relaxed max-w-[50ch] text-[15px]">{ai.text}</p>
          </div>

          <div className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-4 self-end">
            <Metric value="+30%" label={t.benefits.metric1} />
            <Metric value="−70%" label={t.benefits.metric2} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Metric({ value, label }) {
  return (
    <div className="liquid-glass p-5 md:p-6">
      <div className="font-display font-bold text-3xl md:text-5xl text-ivory tabular-nums tracking-[-0.03em]">{value}</div>
      <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ivory/60">{label}</div>
    </div>
  )
}
