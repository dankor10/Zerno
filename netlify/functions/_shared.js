// Общая логика для всех serverless-функций сайта.
// TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID берутся из переменных окружения Netlify
// (Site settings → Environment variables) — они НЕ хранятся в коде и не видны
// посетителям сайта, в отличие от того, если бы токен лежал в src/.

export async function sendTelegramMessage(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    throw new Error(
      'TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не заданы в переменных окружения Netlify'
    )
  }

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`Telegram API ответил ошибкой: ${errText}`)
  }
}

export function jsonResponse(statusCode, data) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }
}

export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
