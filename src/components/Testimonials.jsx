import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n.jsx'

let ytApiPromise = null
function loadYouTubeAPI() {
  if (typeof window === 'undefined') return Promise.reject()
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT)
  if (ytApiPromise) return ytApiPromise
  ytApiPromise = new Promise((resolve) => {
    const prevReady = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      if (prevReady) prevReady()
      resolve(window.YT)
    }
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.body.appendChild(tag)
  })
  return ytApiPromise
}

function Video({ id, label }) {
  const [active, setActive] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [thumbSrc, setThumbSrc] = useState(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`)
  const hostRef = useRef(null)
  const playerRef = useRef(null)
  const handleError = () => setThumbSrc(`https://i.ytimg.com/vi/${id}/sddefault.jpg`)

  useEffect(() => {
    if (!active) return
    let cancelled = false
    loadYouTubeAPI().then((YT) => {
      if (cancelled || !hostRef.current) return
      playerRef.current = new YT.Player(hostRef.current, {
        videoId: id,
        host: 'https://www.youtube-nocookie.com',
        playerVars: {
          autoplay: 1,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          controls: 0,
          iv_load_policy: 3,
          disablekb: 1,
          fs: 0,
        },
        events: {
          onReady: (ev) => {
            try { ev.target.playVideo() } catch {}
          },
          onStateChange: (ev) => {
            if (ev.data === YT.PlayerState.PLAYING) setPlaying(true)
          },
        },
      })
    })
    return () => {
      cancelled = true
      if (playerRef.current && playerRef.current.destroy) {
        try { playerRef.current.destroy() } catch {}
      }
      playerRef.current = null
    }
  }, [active, id])

  return (
    <div className={`vcard${active ? ' vcard-active' : ''}${playing ? ' vcard-playing' : ''}`}>
      <div className="vcard-host" ref={hostRef} />
      {!playing && (
        <button
          type="button"
          className="vcard-trigger"
          onClick={() => !active && setActive(true)}
          aria-label={label}
        >
          <img src={thumbSrc} alt={label} loading="lazy" onError={handleError} />
          <span className="vcard-shade" />
          {!active && <span className="vcard-play" aria-hidden="true" />}
          {active && <span className="vcard-loader" aria-hidden="true" />}
          <span className="vcard-label">{label}</span>
        </button>
      )}
    </div>
  )
}

export default function Testimonials() {
  const { t } = useI18n()
  const r = t.testi
  return (
    <section className="section reveal-fade" id="testi" data-screen-label="08 Testimonials">
      <div className="sec-head">
        <div>
          <div className="eyebrow"><span className="bullet" />{r.eyebrow}</div>
          <h2 className="reveal-l">{r.h2a}{r.h2b}<span className="dot" /></h2>
        </div>
        <p className="right">{r.right}</p>
      </div>
      <div className="testi-videos reveal-stagger">
        {r.videos.map((v) => (
          <Video key={v.id} id={v.id} label={v.label} />
        ))}
      </div>
    </section>
  )
}
