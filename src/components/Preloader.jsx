import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Premium branded preloader for Radix.
 * - Graphite stage with brand mark in the centre
 * - Logo glyphs reveal via mask wipe (top → bottom) with stagger
 * - Hairline trace under the logo (no 0–100% counter, no spinner)
 * - Exits with a split-curtain reveal (top half up, bottom half down)
 *
 * CSS variables for easy theming:
 *   --preloader-bg, --preloader-fg, --preloader-accent,
 *   --preloader-duration, --preloader-min-show, --preloader-logo-size
 */
export default function Preloader({ onReady, minShow = 1200 }) {
  const [exit, setExit] = useState(false)
  const [hidden, setHidden] = useState(false)

  // Resolve ready: wait for window 'load' OR minimum stage duration, whichever is later.
  useEffect(() => {
    let cleared = false
    const start = performance.now()

    const finish = () => {
      if (cleared) return
      const elapsed = performance.now() - start
      const wait = Math.max(0, minShow - elapsed)
      setTimeout(() => {
        if (cleared) return
        setExit(true)
      }, wait)
    }

    if (document.readyState === 'complete') {
      finish()
    } else {
      window.addEventListener('load', finish, { once: true })
    }

    return () => {
      cleared = true
      window.removeEventListener('load', finish)
    }
  }, [minShow])

  // Lock body scroll while preloader is mounted
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  // Notify parent once exit animation begins so Hero can start its in-animation in parallel,
  // then fully unmount the preloader after the curtain animation completes.
  useEffect(() => {
    if (!exit) return
    onReady?.()
    const t = setTimeout(() => setHidden(true), 1100) // > curtain duration (0.85s + 0.15s delay)
    return () => clearTimeout(t)
  }, [exit, onReady])

  return (
    <AnimatePresence onExitComplete={() => setHidden(true)}>
      {!hidden && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] pointer-events-none"
          aria-hidden="true"
          initial={false}
        >
          {/* Split curtain — two halves slide away on exit */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-graphite"
            initial={{ y: 0 }}
            animate={exit ? { y: '-100%' } : { y: 0 }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: exit ? 0.15 : 0 }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-graphite"
            initial={{ y: 0 }}
            animate={exit ? { y: '100%' } : { y: 0 }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: exit ? 0.15 : 0 }}
          />

          {/* Hairline grid baseline — fades out together with the curtains */}
          <motion.div
            className="absolute inset-x-0 top-1/2 -translate-y-px h-px bg-ivory/[0.06]"
            initial={{ opacity: 1 }}
            animate={exit ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3, delay: exit ? 0.05 : 0 }}
          />

          {/* Stage content */}
          <motion.div
            className="absolute inset-0 grid place-items-center"
            initial={{ opacity: 1 }}
            animate={exit ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative flex flex-col items-center text-ivory">
              {/* eyebrow */}
              <motion.div
                className="font-mono text-[10px] uppercase tracking-[0.32em] text-ivory/55 mb-7"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
              >
                <span className="inline-block h-1 w-1 rounded-full bg-orange align-middle mr-2.5" />
                Radix · 2025
              </motion.div>

              {/* Logo — mask-revealed top→bottom */}
              <BrandMark />

              {/* Caption under the logo */}
              <motion.div
                className="mt-8 font-display text-[13px] md:text-[14px] uppercase tracking-[0.22em] text-ivory/80"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.75 }}
              >
                Radix&nbsp;Agency
              </motion.div>

              {/* Hairline trace — symmetric grow from centre */}
              <div className="mt-5 relative h-px w-[180px] md:w-[220px] bg-ivory/10 overflow-hidden">
                <motion.div
                  className="absolute top-0 left-1/2 h-full bg-orange origin-center"
                  initial={{ width: 0, x: '-50%' }}
                  animate={{ width: '100%', x: '-50%' }}
                  transition={{ duration: 1.1, delay: 0.4, ease: [0.65, 0, 0.35, 1] }}
                />
              </div>

              {/* Sub-caption */}
              <motion.div
                className="mt-5 font-mono text-[10px] uppercase tracking-[0.28em] text-ivory/45"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                System over chaos
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/**
 * Brand mark with per-glyph clip-path reveal.
 * Splits the brand SVG into 5 paths and reveals each with a top→bottom wipe + tiny lift.
 */
function BrandMark() {
  // Paths copied from /public/logo/logo-white.svg
  const paths = [
    'M330.91,501.13h0c0,26.51-21.49,48-48,48h-18.7v76.54h-48v-90.08c0-19.04,15.43-34.47,34.47-34.47h80.24Z',
    'M444.22,535.6v90.08h-103.71c-14.36,0-26.01-11.64-26.01-26.01h0c0-14.36,11.64-26.01,26.01-26.01h55.71v-24.53s-65.31,0-65.31,0v-48h78.84c19.04,0,34.47,15.43,34.47,34.47Z',
    'M863.8,577.67v48h-76.92c-4.14,0-7.87-2.52-9.43-6.36l-3.42-8.41c-1.56-3.84-5.29-6.35-9.43-6.35h0c-4.24,0-8.03,2.62-9.53,6.58l-3,7.94c-1.5,3.96-5.29,6.58-9.52,6.58h-75.21s0-48,0-48h67.02c7.88,0,14.27-6.39,14.27-14.27h0c0-7.88-6.39-14.27-14.27-14.27h-67.02s0-48,0-48h75.58c4.26,0,8.08,2.6,9.63,6.57l2.43,6.18c1.56,3.96,5.38,6.57,9.63,6.57h0c4.15,0,7.89-2.47,9.52-6.29l2.88-6.74c1.63-3.81,5.37-6.29,9.52-6.29h77.25v48h-68.78c-7.88,0-14.27,6.38-14.27,14.27h0c0,7.88,6.39,14.27,14.27,14.27h68.81Z',
    'M655.46,526.83v98.85h-48v-76.54h0v-48h22.3c14.19,0,25.7,11.51,25.7,25.7Z',
    'M542.97,454.32v46.81h-54.12c-19.04,0-34.47,15.43-34.47,34.47v55.61c0,19.04,15.43,34.47,34.47,34.47h102.12v-171.35h-48ZM481.59,565.29v-6.65c0-5.41,3.56-9.5,11.03-9.5h142.15v25.36s-141.36-.4-141.36-.4c-6.39.14-11.82-2.88-11.82-8.8Z',
  ]
  // The “dot” over the i, separated so we can colour-pop it
  const dotPath =
    'M620.06,446.09h22.8c2.41,0,4.37,1.96,4.37,4.37v43.63h-31.54v-43.63c0-2.41,1.96-4.37,4.37-4.37Z'
  const dotTransform = 'translate(1101.55 -161.36) rotate(90)'

  const glyph = {
    hidden: { clipPath: 'inset(0 0 100% 0)', opacity: 0, y: 8 },
    show: (i) => ({
      clipPath: 'inset(0 0 0% 0)',
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: 0.08 + i * 0.07, ease: [0.22, 1, 0.36, 1] },
    }),
  }

  return (
    <div
      style={{
        width: 'clamp(200px, 28vw, 320px)',
        height: 'clamp(200px, 28vw, 320px)',
      }}
      className="relative"
    >
      <motion.svg
        viewBox="0 0 1080 1080"
        width="100%"
        height="100%"
        initial="hidden"
        animate="show"
      >
        {paths.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="#EAEADE"
            custom={i}
            variants={glyph}
          />
        ))}
        <motion.path
          d={dotPath}
          transform={dotTransform}
          fill="#FF6B43"
          custom={paths.length}
          variants={glyph}
        />
      </motion.svg>
    </div>
  )
}
