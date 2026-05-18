# Radix Agency — landing page

Premium, conversion-focused landing for Radix Agency. React + Vite + Tailwind + Framer Motion.

## Стек

- React 18 (Vite)
- Tailwind CSS 3
- Framer Motion 11
- i18n через простий context (UA / RU)
- Шрифти: Instrument Serif (display) + Inter Tight (UI) + JetBrains Mono (labels) — Google Fonts

## Запуск

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # збірка в dist/
npm run preview  # перегляд збірки
```

## Підготовка статичних ресурсів

Перед першим `npm run dev` створи в корені папку `public/` і поклади туди:

### 1. Логотип (`public/logo/`)

Скопіюй з `assets/logo Radix/Додаткові матеріали/Логотип SVG/`:

- `logo white.svg` → `public/logo/logo-white.svg` (використовується у футері)

Скопіюй з `assets/logo Radix/Додаткові матеріали/Marks (знаки)/mark 1/` (або mark 2):

- `mark 1 graphite@2x.png` → `public/logo/mark.png`
  (або кращий варіант — конвертуй mark у SVG і назви `public/logo/mark.svg`)

Якщо файлів немає — текстовий лого «Radix» все одно відобразиться, фолбек обробляється `onError`.

### 2. Кейс-скріни (`public/cases/`)

Скопіюй з `assets/cases/` і перейменуй на ASCII:

- `кейс 1.png` → `public/cases/case-1.png`
- `кейс 2.png` → `public/cases/case-2.png`
- `кейс 3.png` → `public/cases/case-3.png`
- `кейс 4.png` → `public/cases/case-4.png`

(Якщо файлу немає — слот залишиться як стилізований placeholder.)

### 3. (Опційно) Open Graph image

`public/og.jpg` (1200×630) — для соцмережевих карток. Якщо додаси — також пропиши `og:image` в `index.html`.

## Підключення Telegram

Форма наразі працює у демо-режимі: показує success-state і логує payload у `console`. Реальна доставка — через `src/lib/telegram.js`.

Як підключити (рекомендація — Vercel function):

1. Створи `api/lead.js` у корені проєкту:

   ```js
   export default async function handler(req, res) {
     if (req.method !== 'POST') return res.status(405).end()
     const body = req.body
     const text = [
       '🔥 <b>Нова заявка Radix</b>',
       `Джерело: ${body.source}`,
       `Мова: ${body.lang}`,
       `Імʼя: ${body.name}`,
       `Ніша: ${body.niche}`,
       `Бюджет: ${body.budget}`,
       `Контакт: ${body.contact}`,
       `Час: ${body.timestamp}`,
     ].join('\n')

     const r = await fetch(`https://api.telegram.org/bot${process.env.TG_BOT_TOKEN}/sendMessage`, {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
         chat_id: process.env.TG_CHAT_ID,
         text,
         parse_mode: 'HTML',
       }),
     })
     if (!r.ok) return res.status(500).json({ ok: false })
     return res.status(200).json({ ok: true })
   }
   ```

2. У Vercel dashboard додай env vars: `TG_BOT_TOKEN`, `TG_CHAT_ID`.

3. У `src/lib/telegram.js` встанови `const ENDPOINT = '/api/lead'`.

Інші опції (Cloudflare Worker, Formspree з Telegram webhook) — в коментарі того ж файлу.

## Структура

```
src/
  App.jsx                       # orchestrator
  main.jsx                      # entry
  index.css                     # Tailwind + design tokens
  i18n.jsx                      # UA/RU словник + context
  data.js                       # ніші, кейси, FAQ, marquee items, hero chips
  lib/
    utils.js                    # smoothScrollTo
    telegram.js                 # lead delivery (з інструкцією)
  components/
    Header.jsx                  # sticky header (hide/show), mobile menu, lang switcher
    Hero.jsx                    # H1 + chips композиція
    Marquee.jsx                 # бігунок послуг (CSS animation)
    Directions.jsx              # 19 ніш + post-CTA
    Cases.jsx                   # слайдер кейсів (arrows + drag + keyboard + progress)
    LeadForm.jsx                # форма (валідація + success state)
    LeadFormSection.jsx         # секція з формою (id="audit")
    Benefits.jsx                # editorial bento — AI хіро-блок + 3 cards
    Reviews.jsx                 # горизонтальний scroll-snap слайдер
    FAQ.jsx                     # accordion з анімацією
    Footer.jsx                  # лого, нав, контакти, Google Maps placeholder, CTA
    Popup.jsx                   # focus trap, ESC, body lock, portal
    CTAOverlays.jsx             # floating widget (desktop) + sticky bar (mobile)
```

## Кольори (палітра)

| Token | Hex | Використання |
|---|---|---|
| `--radix-ivory` | `#EAEADE` | головний фон, 70% сторінки |
| `--radix-graphite` | `#222222` | текст, темні секції (кейси, футер) |
| `--radix-green` | `#116040` | primary CTA, акценти, lockup |
| `--radix-sage` | `#CDCDBF` | бордери, muted blocks, фон Reviews |
| `--radix-orange` | `#FF6B43` | punctuation акцент, hover, маркери |

Orange використовується точково (~1% сторінки) — щоб не зруйнувати преміальність.

## Доступність

- Semantic HTML: `header`, `main`, `section`, `footer`, `nav`, `article`.
- Heading hierarchy: одне H1 (hero), H2 на секції, H3 у картках.
- `prefers-reduced-motion`: глобально вимикає анімації.
- Focus-visible на всіх інтерактивних елементах.
- Focus trap у popup і мобільному меню.
- Aria-labels на іконкових кнопках.
- Alt на кейс-зображеннях.
- Body scroll lock при відкритому popup / меню.

## SEO

- `<title>` і `<meta description>` — українською (як основна).
- Open Graph теги.
- `<html lang="uk">`.
- `theme-color` для мобільних браузерів.
- Preconnect до Google Fonts.

## Аналітика (готовність)

Форми мають `data-event="form"` і `data-source` атрибути. Підключи GTM/GA4 — і слухай ці події. Кнопки CTA можна підписати власними `data-event="cta_click"` у місцях, де треба.
