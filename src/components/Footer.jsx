import { useI18n } from '../i18n.jsx'

export default function Footer() {
  const { t } = useI18n()
  const f = t.footer
  return (
    <footer className="reveal-fade" data-screen-label="11 Footer">
      <div className="brand">
        <div className="lg"><img src="/logo/radix-white.svg" alt="Radix" /></div>
        <p>{f.tagline}</p>
        <div className="geo"><b>UA</b> · <b>EU</b> · <b>USA</b> · <b>CANADA</b> · <b>UAE</b></div>
      </div>
      <div className="col">
        <h6>{f.col1Title}</h6>
        {f.col1.map((it) => (<a key={it} href="#niches">{it}</a>))}
      </div>
      <div className="col">
        <h6>{f.col2Title}</h6>
        <a href="#cases">{f.col2[0]}</a>
        <a href="#results">{f.col2[1]}</a>
        <a href="#testi">{f.col2[2]}</a>
        <a href="#faq">{f.col2[3]}</a>
        <a href="#contact">{f.col2[4]}</a>
      </div>
      <div className="col">
        <h6>{f.col3Title}</h6>
        {f.col3.map(([label, href]) => (
          <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>{label}</a>
        ))}
      </div>
    </footer>
  )
}
