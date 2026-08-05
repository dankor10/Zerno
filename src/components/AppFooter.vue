<script setup>
import { ref } from 'vue'
import { DEMO_MODE } from '../config.js'

const newsEmail = ref('')
const newsSent = ref(false)
const newsError = ref(false)
const sending = ref(false)

async function submitNews() {
  newsError.value = false

  if (DEMO_MODE) {
    newsSent.value = true
    return
  }

  sending.value = true
  try {
    const res = await fetch('/.netlify/functions/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: newsEmail.value }),
    })
    const data = await res.json().catch(() => ({ ok: false }))

    if (res.ok && data.ok) newsSent.value = true
    else newsError.value = true
  } catch (e) {
    newsError.value = true
  } finally {
    sending.value = false
  }
}

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="wrap">
      <div class="footer-top">
        <div class="footer-brand">
          <a href="#top" class="brand"><span class="brand-mark">З</span>ЗЕРНО</a>
          <p>Небольшая обжарочная и кофейня. Зерно от фермеров, огонь, время — и чашка, ради которой стоит проснуться.</p>
        </div>
        <div class="footer-news">
          <div class="label">Рассылка о новых обжарках</div>
          <form class="news-form" v-if="!newsSent" @submit.prevent="submitNews">
            <input type="email" v-model="newsEmail" required placeholder="you@mail.com" aria-label="Email для рассылки" />
            <button type="submit" :disabled="sending">{{ sending ? '…' : 'Подписаться' }}</button>
          </form>
          <p class="news-thanks" v-else>✓ Готово — ждите писем о новых обжарках.</p>
          <p v-if="newsError" class="news-error">Не получилось отправить, попробуйте ещё раз.</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© {{ year }} ЗЕРНО. Обжарено с уважением к зерну.</p>
        <div class="socials">
          <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg></a>
          <a href="#" aria-label="Telegram"><svg viewBox="0 0 24 24" stroke-width="1.6"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/></svg></a>
          <a href="#" aria-label="Почта"><svg viewBox="0 0 24 24" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg></a>
        </div>
      </div>
    </div>
  </footer>
</template>
