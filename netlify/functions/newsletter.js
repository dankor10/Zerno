import { sendTelegramMessage, jsonResponse, escapeHtml } from './_shared.js'

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { ok: false, error: 'Method not allowed' })
  }

  try {
    const data = JSON.parse(event.body || '{}')

    if (!data.email) {
      return jsonResponse(400, { ok: false, error: 'Не указан email' })
    }

    const text = `📬 <b>Новая подписка — ЗЕРНО</b>\n\n${escapeHtml(data.email)}`
    await sendTelegramMessage(text)

    return jsonResponse(200, { ok: true })
  } catch (e) {
    return jsonResponse(500, { ok: false, error: e.message })
  }
}
