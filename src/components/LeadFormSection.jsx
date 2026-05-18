import { useI18n } from '../i18n.jsx'
import LeadForm from './LeadForm.jsx'

export default function LeadFormSection() {
  const { t } = useI18n()
  return (
    <section id="audit" className="relative bg-ink text-ivory py-24 md:py-36 overflow-hidden">
      <div className="pointer-events-none absolute -top-32 left-[-10%] w-[60%] h-[60%] bg-green/25 blur-[140px] rounded-full" aria-hidden />
      <div className="pointer-events-none absolute -bottom-32 right-[-10%] w-[40%] h-[40%] bg-orange/12 blur-[120px] rounded-full" aria-hidden />

      <div className="relative mx-auto max-w-container px-5 md:px-10">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-green-glow font-bold">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-glow align-middle mr-2.5" aria-hidden />
              {t.form.eyebrow}
            </div>
            <h2 className="mt-5 font-display font-extrabold uppercase tracking-[-0.03em] leading-[0.95]"
                style={{ fontSize: 'clamp(34px, 4.6vw, 58px)' }}>
              {t.form.h2}
              <span className="text-green-glow">.</span>
            </h2>
            <p className="mt-6 text-ivory/70 leading-relaxed max-w-[44ch] text-[15px]">{t.form.sub}</p>

            <div className="mt-12 hidden lg:block">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ivory/45">Radix</div>
              <div className="mt-2 font-serif italic text-2xl text-green-glow">{t.form.tag}</div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <LeadForm source="section" dark />
          </div>
        </div>
      </div>
    </section>
  )
}
