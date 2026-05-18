export default function Marquee() {
  const items = ['TikTok Ads', 'Meta Ads', 'Google Ads', 'Google Maps', 'YouTube Ads', 'AI-аналітика']
  const block = (
    <span>
      {items.map((it, i) => (
        <span key={i}>
          {it}
          <span className="o">●</span>
        </span>
      ))}
    </span>
  )
  return (
    <div className="marquee" aria-hidden="true">
      <div className="mq-track">
        {block}
        {block}
      </div>
    </div>
  )
}
