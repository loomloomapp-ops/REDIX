import { useEffect, useRef, useState } from 'react'

// Parses "7.4×", "€12M+", "+30%", "−47%", "2163", "$2.1M", "×4.2" — animates only the numeric part.
function parse(raw) {
  const str = String(raw)
  const m = str.match(/^(\D*?)([-−+]?\d*\.?\d+)(.*)$/)
  if (!m) return { prefix: str, value: null, suffix: '' }
  let [, prefix, num, suffix] = m
  // normalise minus signs for parseFloat
  const value = parseFloat(num.replace('−', '-'))
  return { prefix, value, suffix, raw: num }
}

function format(value, ref) {
  const hasDecimal = ref.includes('.')
  if (!hasDecimal) return Math.round(value).toLocaleString('en-US').replace(/,/g, ' ')
  const decimals = ref.split('.')[1].length
  return value.toFixed(decimals)
}

export default function CountUp({ value, duration = 1400, className }) {
  const { prefix, value: target, suffix, raw } = parse(value)
  const [display, setDisplay] = useState(target == null ? value : `${prefix}${format(0, raw || '0')}${suffix}`)
  const ref = useRef(null)
  const startedRef = useRef(false)

  useEffect(() => {
    if (target == null || !ref.current) return
    const el = ref.current
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true
            const startTime = performance.now()
            const from = 0
            const to = target
            const tick = (now) => {
              const t = Math.min(1, (now - startTime) / duration)
              const eased = 1 - Math.pow(1 - t, 3)
              const cur = from + (to - from) * eased
              setDisplay(`${prefix}${format(cur, raw)}${suffix}`)
              if (t < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
            io.disconnect()
          }
        })
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [target, prefix, suffix, raw, duration])

  if (target == null) return <span className={className}>{value}</span>
  return <span ref={ref} className={className}>{display}</span>
}
