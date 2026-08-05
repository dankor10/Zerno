import { getStore } from '@netlify/blobs'
import { sendTelegramMessage, jsonResponse, escapeHtml } from './_shared.js'

// Сколько столов реально можно посадить на один временной слот.
// Поменяйте под свою кофейню.
const CAPACITY_PER_SLOT = 4

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { ok: false, error: 'Method not allowed' })
  }

  try {
    const data = JSON.parse(event.body || '{}')
    const { name, phone, date, time, guests, note } = data

    if (!name || !phone || !date || !time) {
      return jsonResponse(400, { ok: false, error: 'Заполнены не все поля' })
    }

    // Одна "ячейка" хранилища на каждую пару дата+время, например 2026-08-12_18:00.
    // Netlify Blobs — встроенное key-value хранилище для функций, отдельную
    // базу данных поднимать не нужно.
    const store = getStore('bookings')
    const slotKey = `${date}_${time}`
    const slot = (await store.get(slotKey, { type: 'json' })) || { count: 0 }

    const isFull = slot.count >= CAPACITY_PER_SLOT
    if (!isFull) {
      await store.setJSON(slotKey, { count: slot.count + 1 })
    }

    const statusLine = isFull
      ? '⚠️ Мест на это время уже нет — гостю показан отказ, свяжитесь при возможности'
      : `✅ Подтверждено автоматически (${slot.count + 1}/${CAPACITY_PER_SLOT} на слот)`

    const text =
      `☕ <b>Бронь — ЗЕРНО</b>\n${statusLine}\n\n` +
      `👤 Имя: ${escapeHtml(name)}\n` +
      `📞 Телефон: ${escapeHtml(phone)}\n` +
      `📅 Дата: ${escapeHtml(date)}, ${escapeHtml(time)}\n` +
      `👥 Гостей: ${escapeHtml(guests)}` +
      (note ? `\n📝 Комментарий: ${escapeHtml(note)}` : '')

    await sendTelegramMessage(text)

    return jsonResponse(200, { ok: true, confirmed: !isFull })
  } catch (e) {
    return jsonResponse(500, { ok: false, error: e.message })
  }
}
