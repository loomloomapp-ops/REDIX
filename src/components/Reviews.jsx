import { motion } from 'framer-motion'
import { useI18n } from '../i18n.jsx'
import { smoothScrollTo } from '../lib/utils.js'

const intros = {
  uk: [
    'Дякую за тиждень роботи!',
    'Подивились звіти за місяць.',
    'Старт пройшов краще, ніж очікували.',
    'Команда зібрала аналітику.',
    'Перевірили, куди йшов бюджет.',
    'Подивились новий дашборд.',
  ],
  ru: [
    'Спасибо за неделю работы!',
    'Посмотрели отчёты за месяц.',
    'Старт прошёл лучше, чем ожидали.',
    'Команда собрала аналитику.',
    'Проверили, куда уходил бюджет.',
    'Посмотрели новый дашборд.',
  ],
}

const times = ['09:42', '14:08', '11:21', '18:55', '10:14', '20:37']

export default function Reviews() {
  const { t, lang } = useI18n()
  const quotes = t.reviews.quotes
  const intro = intros[lang] || intros.uk

  // Staggered offsets per index for a wall-of-screenshots feel
  const offsets = ['lg:mt-0', 'lg:mt-16', 'lg:mt-8', 'lg:mt-24', 'lg:mt-4', 'lg:mt-20']

  return (
    <section id="reviews" className="relative bg-sage/30 py-24 md:py-36 border-y border-sage">
      <div className="mx-auto max-w-container px-5 md:px-10">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10 items-end">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-green font-bold">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-orange align-middle mr-2.5" aria-hidden />
              {t.reviews.eyebrow}
            </div>
            <h2 className="mt-5 font-display font-extrabold uppercase tracking-[-0.03em] text-graphite max-w-[14ch] leading-[0.96]"
                style={{ fontSize: 'clamp(34px, 4.8vw, 60px)' }}>
              {t.reviews.h2}
              <span className="text-green">.</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite/55">
              {String(quotes.length).padStart(2, '0')} · screenshots
            </p>
          </div>
        </div>

        <div className="mt-14 md:mt-20 grid grid-cols-12 gap-x-6 gap-y-10">
          {quotes.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
              className={`col-span-12 sm:col-span-6 lg:col-span-4 ${offsets[i % offsets.length]} flex justify-center`}
            >
              <ChatScreenshot
                index={i}
                intro={intro[i % intro.length]}
                quote={q}
                time={times[i % times.length]}
              />
            </motion.div>
          ))}
        </div>

        <button
          onClick={() => smoothScrollTo('audit')}
          className="group mt-14 inline-flex items-start gap-3 text-left max-w-[58ch]"
        >
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange shrink-0" aria-hidden />
          <span className="text-base md:text-lg text-graphite/85 group-hover:text-graphite leading-relaxed">
            {t.reviews.cta}
            <span className="ml-2 underline underline-offset-4 decoration-orange/70 text-graphite">→</span>
          </span>
        </button>
      </div>
    </section>
  )
}

/* Telegram-style chat screenshot mockup */
function ChatScreenshot({ index, intro, quote, time }) {
  return (
    <figure className="w-full max-w-[320px]">
      <div className="relative rounded-[34px] bg-graphite p-2.5 shadow-[0_30px_60px_-30px_rgba(34,34,34,0.45)]">
        <div className="relative rounded-[26px] overflow-hidden bg-[#0e1f1a]" style={{ aspectRatio: '9 / 16' }}>
          {/* status bar */}
          <div className="flex items-center justify-between px-5 pt-3 pb-1 font-mono text-[10px] text-ivory/80 tabular-nums">
            <span>{time}</span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-ivory/80" />
              <span className="inline-block h-1.5 w-2.5 rounded-[2px] border border-ivory/80" />
            </span>
          </div>
          {/* chat header */}
          <div className="flex items-center gap-3 px-4 pt-2 pb-3 border-b border-ivory/8">
            <div className="h-8 w-8 rounded-full bg-orange/85 grid place-items-center font-display font-bold text-ink text-[12px]">
              R
            </div>
            <div className="leading-tight">
              <div className="font-display text-[13px] text-ivory">Radix · client {String(index + 1).padStart(2, '0')}</div>
              <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-ivory/45">online</div>
            </div>
          </div>
          {/* chat body */}
          <div className="px-4 pt-4 space-y-2.5">
            {/* incoming context bubble */}
            <div className="flex">
              <div className="max-w-[80%] rounded-[14px] rounded-bl-[4px] bg-ivory/10 text-ivory/90 px-3 py-2 text-[12px] leading-snug">
                {intro}
              </div>
            </div>
            {/* outgoing quote bubble — Radix green */}
            <div className="flex justify-end">
              <div className="max-w-[88%] rounded-[14px] rounded-br-[4px] bg-green text-ivory px-3.5 py-2.5 text-[13px] leading-snug font-medium">
                {quote}
                <div className="mt-1.5 flex items-center justify-end gap-1 font-mono text-[9px] text-ivory/70 tabular-nums">
                  <span>{time}</span>
                  <svg viewBox="0 0 14 10" width="12" height="9" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M1 5l3 3 6-6M6 8l6-6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          {/* corner badge */}
          <div className="absolute bottom-3 left-4 font-mono text-[9px] uppercase tracking-[0.24em] text-ivory/40">
            telegram · screenshot
          </div>
        </div>
        {/* notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 h-1 w-16 rounded-full bg-ivory/15" />
      </div>
      <figcaption className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-graphite/55">
        <span>client · {String(index + 1).padStart(2, '0')}</span>
        <span className="h-1.5 w-1.5 rounded-full bg-orange" aria-hidden />
      </figcaption>
    </figure>
  )
}
