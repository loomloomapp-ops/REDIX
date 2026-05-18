import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useI18n } from '../i18n.jsx'
import { smoothScrollTo } from '../lib/utils.js'

/* Background marquee phrases — digital / agency vocabulary in Ukrainian. */
const bandPhrases = [
  'РОЗРОБКА НОВИХ ФОРМАТІВ РЕКЛАМНИХ МАКЕТІВ ДЛЯ ЗАЛУЧЕННЯ МАКСИМАЛЬНОЇ',
  'ПРОРАХУНОК ROI ПО РЕКЛАМНІЙ ПОЗИЦІЇ ДЛЯ ОПТИМІЗАЦІЇ БЮДЖЕТУ',
  'СЕГМЕНТАЦІЯ АУДИТОРІЙ · LOOKALIKE · РЕТАРГЕТИНГ · A/B ТЕСТИ КОНВЕРСІЇ',
  'AI-АНАЛІТИКА · UNIT-ЕКОНОМІКА · CPL · CPA · ROAS · LTV · CAC · ATTRIBUTION',
  'СТРАТЕГІЯ ВПРОВАДЖЕННЯ AI-АГЕНТІВ І АВТОМАТИЗАЦІЇ ВОРОНКИ ЗАЯВОК',
]

export default function Hero({ ready = true }) {
  const { t } = useI18n()
  const sectionRef = useRef(null)
  const show = (target, hidden) => (ready ? target : hidden)

  // Normalised cursor position in viewport (0..1)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)

  // Springs for smooth lag
  const smx = useSpring(mx, { stiffness: 50, damping: 24, mass: 1.2 })
  const smy = useSpring(my, { stiffness: 50, damping: 24, mass: 1.2 })

  // Green glow follows cursor with parallax
  const glowX = useTransform(smx, [0, 1], ['-16%', '16%'])
  const glowY = useTransform(smy, [0, 1], ['-12%', '12%'])

  useEffect(() => {
    const onMove = (e) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      mx.set(x)
      my.set(y)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my])

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative isolate bg-ink text-ivory overflow-hidden"
      style={{ minHeight: '100dvh' }}
    >
      {/* ====== Background layer 1 — solid ink + soft vignette ====== */}
      <div className="absolute inset-0 bg-ink" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/0 via-ink/40 to-ink pointer-events-none" />

      {/* ====== Background layer 2 — cursor-reactive marquee bands ======
          Full-width container with a soft mask so text fades smoothly from the
          centre to the right edge — no hard vertical seam. */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, transparent 32%, rgba(0,0,0,0.85) 60%, #000 80%)',
          maskImage:
            'linear-gradient(to right, transparent 0%, transparent 32%, rgba(0,0,0,0.85) 60%, #000 80%)',
        }}
      >
        {bandPhrases.map((text, i) => (
          <Band
            key={i}
            text={text}
            index={i}
            total={bandPhrases.length}
            mx={smx}
            my={smy}
          />
        ))}
      </div>

      {/* ====== Background layer 3 — green glow that lags behind cursor ====== */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-[-12%] flex justify-center"
        style={{ x: glowX, y: glowY }}
      >
        <svg viewBox="0 0 1200 600" width="1200" height="600" className="max-w-[120vw] green-pulse" aria-hidden>
          <defs>
            <filter id="radix-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="32" />
            </filter>
          </defs>
          <ellipse cx="600" cy="300" rx="520" ry="160" fill="#1a8a5c" opacity="0.42" filter="url(#radix-blur)" />
          <ellipse cx="600" cy="300" rx="320" ry="80" fill="#0d4a31" opacity="0.6" filter="url(#radix-blur)" />
        </svg>
      </motion.div>

      {/* Bottom legibility gradient — keeps headline above marquee */}
      <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-ink via-ink/70 to-transparent pointer-events-none" />

      {/* ====== Content ====== */}
      <div className="relative mx-auto max-w-container px-5 md:px-10 pt-36 md:pt-44 pb-24 md:pb-32 flex flex-col items-center text-center">
        {/* Liquid glass floating card */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={show({ opacity: 1, y: 0, scale: 1 }, { opacity: 0, y: 24, scale: 0.96 })}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="liquid-glass relative w-[220px] h-[220px] md:w-[240px] md:h-[240px] -translate-y-[20px] md:-translate-y-[40px] mb-2 md:mb-4 p-6 flex flex-col justify-between text-left"
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ivory/70">[ 2025 ]</div>
          <div>
            <div className="font-display text-[16px] md:text-[18px] leading-[1.18] text-ivory">
              Системний{' '}
              <span className="font-serif italic text-[20px] md:text-[22px] text-ivory/95">білий</span>{' '}
              трафік для бізнесу
            </div>
            <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ivory/55">
              UA · EU · USA · CA · UAE
            </div>
          </div>
        </motion.div>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={show({ opacity: 1, y: 0 }, { opacity: 0, y: 8 })}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-mono text-[11px] uppercase tracking-[0.24em] text-green-glow font-bold"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-glow align-middle mr-2.5" aria-hidden />
          {t.hero.eyebrow}
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={show({ opacity: 1, y: 0 }, { opacity: 0, y: 16 })}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="mt-7 font-display font-extrabold uppercase tracking-[-0.035em] text-ivory max-w-[18ch]"
          style={{ fontSize: 'clamp(40px, 7.5vw, 88px)', lineHeight: 0.94 }}
        >
          {t.hero.h1}
          <span className="text-orange">.</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={show({ opacity: 1, y: 0 }, { opacity: 0, y: 12 })}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="mt-7 max-w-[58ch] text-sm md:text-[15px] text-ivory/70 leading-[1.65]"
        >
          {t.hero.sub}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={show({ opacity: 1, y: 0 }, { opacity: 0, y: 10 })}
          transition={{ duration: 0.5, delay: 0.36 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <button
            onClick={() => smoothScrollTo('audit')}
            className="group inline-flex items-center gap-2.5 rounded-full bg-green text-ivory px-7 py-4 font-display font-bold uppercase tracking-[0.04em] text-sm hover:bg-green-glow transition"
          >
            {t.cta.book}
            <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" className="transition group-hover:translate-x-0.5">
              <path d="M4 10h12M11 5l5 5-5 5"/>
            </svg>
          </button>
          <button
            onClick={() => smoothScrollTo('directions')}
            className="inline-flex items-center gap-2 rounded-full border border-ivory/25 text-ivory px-7 py-4 font-display text-sm uppercase tracking-[0.04em] hover:border-ivory hover:bg-ivory/5 transition"
          >
            {t.cta.look}
          </button>
        </motion.div>

        {/* Trust strip */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={show({ opacity: 1 }, { opacity: 0 })}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 font-mono text-[11px] uppercase tracking-[0.18em] text-ivory/45"
        >
          {t.hero.trust}
        </motion.p>
      </div>
    </section>
  )
}

/**
 * Background marquee band — large dim text scrolling via CSS,
 * deformed by cursor proximity (string-like magnetic pull).
 */
function Band({ text, index, total, mx, my }) {
  // Each band sits at its own vertical position (top 22% … bottom 78%, tight stack)
  const yPercent = 22 + (index / Math.max(1, total - 1)) * 56
  const yNorm = yPercent / 100

  // Alternate marquee directions and speeds for rhythm
  const reverse = index % 2 === 1
  const speed = 70 + index * 10 // slow, ambient drift

  // Magnetic deformation — vertical pull toward cursor with falloff
  const bandTranslateY = useTransform([mx, my], ([_, y]) => {
    const dist = Math.abs(y - yNorm)
    const pull = Math.max(0, 1 - dist * 3.5)
    return (y - yNorm) * 28 * pull
  })
  // Subtle string-skew on cursor X
  const bandSkew = useTransform([mx, my], ([x, y]) => {
    const dist = Math.abs(y - yNorm)
    const pull = Math.max(0, 1 - dist * 3)
    return (x - 0.5) * 1.6 * pull
  })

  return (
    <motion.div
      className="absolute left-0 right-0 overflow-hidden"
      style={{
        top: `${yPercent}%`,
        y: bandTranslateY,
        skewY: bandSkew,
      }}
    >
      <div
        className="marquee-track flex whitespace-nowrap font-sans font-medium tracking-[0.01em] select-none"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
          color: 'rgba(234, 234, 222, 0.10)',
          fontSize: 'clamp(14px, 1.05vw, 18px)',
          lineHeight: 1.3,
        }}
      >
        <span className="shrink-0 pr-16">{text}</span>
        <span className="shrink-0 pr-16">{text}</span>
        <span className="shrink-0 pr-16">{text}</span>
        <span className="shrink-0 pr-16">{text}</span>
      </div>
    </motion.div>
  )
}
