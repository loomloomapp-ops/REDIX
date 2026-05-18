import { useI18n } from '../i18n.jsx'
import { smoothScrollTo } from '../lib/utils.js'

export default function Footer() {
  const { t } = useI18n()
  const year = new Date().getFullYear()

  return (
    <footer id="contacts" className="bg-ink text-ivory pt-24 md:pt-32 pb-10 border-t border-ivory/10">
      <div className="mx-auto max-w-container px-5 md:px-10">
        {/* Top — large display tagline */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-10 items-end">
          <div className="col-span-12 lg:col-span-8">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-green-glow font-bold mb-5">
              Radix · system over chaos
            </div>
            <h2 className="font-display font-extrabold uppercase tracking-[-0.035em] leading-[0.94] max-w-[18ch]"
                style={{ fontSize: 'clamp(38px, 6vw, 84px)' }}>
              {t.cta.book}
              <span className="text-green-glow">.</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <p className="text-ivory/70 leading-relaxed max-w-[44ch] text-[15px]">{t.footer.tagline}</p>
            <button
              onClick={() => smoothScrollTo('audit')}
              className="group mt-6 inline-flex items-center gap-2.5 rounded-full bg-green text-ivory px-6 py-3.5 font-display font-bold uppercase tracking-[0.06em] text-sm hover:bg-green-glow transition"
            >
              {t.cta.book}
              <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" className="transition group-hover:translate-x-0.5">
                <path d="M4 10h12M11 5l5 5-5 5"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Mid — columns */}
        <div className="mt-20 md:mt-28 grid grid-cols-12 gap-x-6 gap-y-12 border-t border-ivory/15 pt-12">
          <div className="col-span-12 md:col-span-3">
            <div className="flex items-center gap-3">
              <img
                src="/logo/logo-white.svg"
                alt="Radix Agency"
                className="h-7"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
              <span className="font-display font-semibold uppercase tracking-[0.02em]">Radix Agency</span>
            </div>
            <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-ivory/50">
              © {year} · {t.footer.rights}
            </div>
          </div>

          <div className="col-span-6 md:col-span-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ivory/45 mb-4">{t.footer.navTitle}</div>
            <ul className="space-y-2.5 font-display text-[13px] uppercase tracking-[0.04em]">
              <li><button onClick={() => smoothScrollTo('directions')} className="hover:text-green-glow transition">{t.nav.directions}</button></li>
              <li><button onClick={() => smoothScrollTo('cases')} className="hover:text-green-glow transition">{t.nav.cases}</button></li>
              <li><button onClick={() => smoothScrollTo('audit')} className="hover:text-green-glow transition">{t.nav.audit}</button></li>
              <li><button onClick={() => smoothScrollTo('benefits')} className="hover:text-green-glow transition">{t.nav.benefits}</button></li>
              <li><button onClick={() => smoothScrollTo('reviews')} className="hover:text-green-glow transition">{t.nav.reviews}</button></li>
              <li><button onClick={() => smoothScrollTo('faq')} className="hover:text-green-glow transition">{t.nav.faq}</button></li>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ivory/45 mb-4">{t.footer.contactsTitle}</div>
            <ul className="space-y-2.5 text-sm">
              <li><a href="mailto:hello@radixagency.com" className="hover:text-green-glow transition">hello@radixagency.com</a></li>
              <li><a href="https://t.me/radixagency" target="_blank" rel="noreferrer" className="hover:text-green-glow transition">Telegram</a></li>
              <li><a href="https://instagram.com/radixagency" target="_blank" rel="noreferrer" className="hover:text-green-glow transition">Instagram</a></li>
            </ul>
            <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-ivory/45 mb-2">{t.footer.docsTitle}</div>
            <ul className="space-y-2.5 text-sm">
              <li><a href="/privacy" className="hover:text-green-glow transition">{t.footer.privacy}</a></li>
              <li><a href="/terms" className="hover:text-green-glow transition">{t.footer.terms}</a></li>
            </ul>
          </div>

          <div className="col-span-12 md:col-span-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ivory/45 mb-4">{t.footer.whereTitle}</div>
            <p className="font-display text-base leading-snug text-ivory/85">{t.footer.where}</p>
            <div className="mt-5 aspect-[16/10] overflow-hidden border border-ivory/15 bg-ivory/[0.03] flex items-center justify-center relative">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ivory/40">{t.footer.mapsPlaceholder}</span>
              <div className="absolute inset-0 border border-dashed border-ivory/10" aria-hidden />
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-ivory/10 flex flex-col md:flex-row gap-3 md:items-center md:justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-ivory/45">
          <span>White traffic · UA · EU · USA · CA · UAE</span>
          <span className="text-green-glow">system over chaos.</span>
        </div>
      </div>
    </footer>
  )
}
