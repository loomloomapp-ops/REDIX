/**
 * Send lead payload to Telegram.
 *
 * IMPLEMENTATION NOTES — do NOT call the Telegram Bot API directly from the browser:
 *  - The bot token would leak in the client bundle. Always proxy through a backend.
 *
 * Pick one of the following wirings, then set ENDPOINT below:
 *
 *  1) Vercel/Netlify serverless function — recommended.
 *     Create `api/lead.js` (Vercel) or `netlify/functions/lead.js` and inside call:
 *       fetch(`https://api.telegram.org/bot${process.env.TG_BOT_TOKEN}/sendMessage`, {
 *         method: 'POST',
 *         headers: { 'Content-Type': 'application/json' },
 *         body: JSON.stringify({ chat_id: process.env.TG_CHAT_ID, text, parse_mode: 'HTML' }),
 *       })
 *     Then set ENDPOINT = '/api/lead'.
 *
 *  2) Cloudflare Worker — same pattern, different host.
 *
 *  3) Formspree / Getform with a Telegram webhook on their side.
 *     Set ENDPOINT to the form action URL and adjust the body shape if their schema differs.
 *
 * Until ENDPOINT is wired, this function still resolves successfully so the UI flow
 * (validation, sending state, success state) is fully demonstrable end-to-end.
 */

const ENDPOINT = '' // e.g. '/api/lead'

export async function sendLeadToTelegram(payload) {
  if (!ENDPOINT) {
    await new Promise((r) => setTimeout(r, 650))
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line no-console
      console.info('[radix-lead] demo mode — payload:', payload)
    }
    return { ok: true, demo: true }
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Lead submit failed (${res.status}): ${text}`)
  }
  return res.json().catch(() => ({ ok: true }))
}
