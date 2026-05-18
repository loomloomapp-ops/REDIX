import { marqueeItems } from '../data.js'

export default function Marquee() {
  const list = [...marqueeItems, ...marqueeItems]
  return (
    <section
      aria-label="Services marquee"
      className="bg-ink text-ivory"
    >
      <div className="overflow-hidden">
        <div className="marquee-track flex whitespace-nowrap py-7 md:py-9">
          {list.map((it, i) => (
            <span
              key={i}
              className="marquee-display inline-flex items-center px-6 md:px-9 text-2xl md:text-4xl uppercase text-ivory/80"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-green-glow mr-6 md:mr-9" aria-hidden />
              {it}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
