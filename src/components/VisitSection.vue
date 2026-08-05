<script setup>
import { ref } from 'vue'
import { DEMO_MODE, TIME_SLOTS } from '../config.js'

const booking = ref({ name: '', phone: '', date: '', time: '', guests: 2, note: '' })

// idle → sending → 'confirmed' | 'full' | 'error'
const status = ref('idle')

async function submitBooking() {
  status.value = 'sending'

  if (DEMO_MODE) {
    // Без бэкенда на Netlify — просто показываем, как это будет выглядеть.
    setTimeout(() => { status.value = 'confirmed' }, 400)
    return
  }

  try {
    const res = await fetch('/.netlify/functions/booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking.value),
    })
    const data = await res.json().catch(() => ({ ok: false }))

    if (!res.ok || !data.ok) { status.value = 'error'; return }
    status.value = data.confirmed ? 'confirmed' : 'full'
  } catch (e) {
    status.value = 'error'
  }
}

function tryAnotherTime() {
  booking.value.time = ''
  status.value = 'idle'
}
</script>

<template>
  <section class="section" id="visit">
    <div class="wrap">
      <div class="section-head reveal">
        <div>
          <span class="section-eyebrow">Заглянуть в гости</span>
          <h2>Найти нас</h2>
        </div>
      </div>

      <div class="visit reveal">
        <div class="visit-info">
          <span class="open-stamp">
            <span class="open-stamp-text">открыто<br>сейчас</span>
          </span>
          <h3>Часы работы</h3>
          <div class="hours-row"><span>Понедельник – пятница</span><span>8:00 – 20:00</span></div>
          <div class="hours-row"><span>Суббота – воскресенье</span><span>9:00 – 21:00</span></div>
          <div class="addr-block">
            <div class="label">Адрес</div>
            <p>ул Пушкина дом Калатушкина<br>Беларусь, Минск</p>
            <div class="label">Телефон</div>
            <p>+375 12 345 6789</p>
            <div class="label">Почта</div>
            <p>hello@zerno.coffee</p>
          </div>
        </div>

        <div class="visit-form">
          <h3 style="font-size:22px; margin-bottom:22px;">Забронировать стол</h3>

          <form v-if="status === 'idle' || status === 'sending'" @submit.prevent="submitBooking">
            <div class="form-row">
              <div class="field">
                <label for="b-name">Имя</label>
                <input id="b-name" type="text" v-model="booking.name" required placeholder="Как к вам обращаться" />
              </div>
              <div class="field">
                <label for="b-phone">Телефон</label>
                <input id="b-phone" type="tel" v-model="booking.phone" required placeholder="+375 12 345 6789" />
              </div>
            </div>
            <div class="form-row">
              <div class="field">
                <label for="b-date">Дата</label>
                <input id="b-date" type="date" v-model="booking.date" required />
              </div>
              <div class="field">
                <label for="b-guests">Гостей</label>
                <input id="b-guests" type="number" min="1" max="12" v-model="booking.guests" required />
              </div>
            </div>
            <div class="field">
              <label for="b-time">Время</label>
              <select id="b-time" v-model="booking.time" required>
                <option value="" disabled>Выберите время</option>
                <option v-for="t in TIME_SLOTS" :key="t" :value="t">{{ t }}</option>
              </select>
            </div>
            <div class="field">
              <label for="b-note">Комментарий</label>
              <textarea id="b-note" v-model="booking.note" placeholder="Например: столик у окна"></textarea>
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%; justify-content:center;" :disabled="status === 'sending'">
              {{ status === 'sending' ? 'Проверяем свободные места…' : 'Забронировать' }}
            </button>
            <p v-if="DEMO_MODE" class="form-demo-note">Демо-режим: заявки пока никуда не отправляются, см. src/config.js</p>
          </form>

          <div class="form-result confirmed" v-else-if="status === 'confirmed'">
            <span>✓</span>
            <span>Готово, {{ booking.name.split(' ')[0] }}! Стол на {{ booking.guests }} {{ booking.guests == 1 ? 'гостя' : 'гостей' }} забронирован на {{ booking.date }} в {{ booking.time }}. Мы уже знаем о вашей брони.</span>
          </div>

          <div class="form-result full" v-else-if="status === 'full'">
            <span>⏱</span>
            <span>
              На {{ booking.date }} в {{ booking.time }} свободных столов уже нет. Попробуйте другое время —
              <button type="button" class="inline-link" @click="tryAnotherTime">выбрать заново</button>.
              Мы всё равно получили вашу заявку и можем предложить альтернативу, если освободится место.
            </span>
          </div>

          <div class="form-result error" v-else-if="status === 'error'">
            <span>!</span>
            <span>
              Не получилось отправить заявку. Попробуйте ещё раз или позвоните нам напрямую:
              <button type="button" class="inline-link" @click="status = 'idle'">вернуться к форме</button>.
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* два независимых блока, не сросшаяся таблица: свои границы, тень и лёгкое смещение */
.visit{
  display:grid;
  grid-template-columns:.85fr 1.15fr;
  gap:28px;
  align-items:start;
}
.visit-info, .visit-form{
  background:var(--bg-deep);
  border:1px solid var(--line);
  padding:44px;
  box-shadow:0 20px 40px -26px rgba(0,0,0,.7);
}
.visit-info{ position:relative; transform:translateY(18px); }
.visit-info h3{ font-size:24px; margin-bottom:24px; }

.open-stamp{
  position:absolute; top:-22px; right:26px;
  width:78px; height:78px;
  border:1.5px dashed var(--ember-light);
  border-radius:50%;
  display:flex; align-items:center; justify-content:center;
  background:var(--bg-deep);
  transform:rotate(8deg);
}
.open-stamp-text{
  font-family:'JetBrains Mono', monospace;
  font-size:9px; text-transform:uppercase; letter-spacing:.06em;
  color:var(--crema); text-align:center; line-height:1.4;
}

.hours-row{ display:flex; justify-content:space-between; padding:12px 0; border-bottom:1px solid var(--line); font-size:14px; }
.hours-row span:first-child{ color:var(--text-muted); }
.hours-row span:last-child{ font-family:'JetBrains Mono', monospace; font-size:13px; }
.addr-block{ margin-top:28px; }
.addr-block .label{ font-family:'JetBrains Mono', monospace; font-size:11px; color:var(--text-dim); text-transform:uppercase; letter-spacing:.08em; margin-bottom:6px; }
.addr-block p{ margin:0 0 18px; color:var(--text-muted); line-height:1.7; font-size:14.5px; }

.form-demo-note{ color:var(--text-dim); font-size:11.5px; margin-top:12px; font-family:'JetBrains Mono', monospace; }
button:disabled{ opacity:.6; cursor:not-allowed; }

.form-result{
  display:flex; align-items:flex-start; gap:12px;
  padding:18px 20px; font-size:14px; line-height:1.6;
  border:1px solid var(--line-strong);
}
.form-result span:first-child{ font-size:17px; flex-shrink:0; }
.form-result.confirmed{ border-color:var(--ember-light); color:var(--crema); }
.form-result.full{ border-color:var(--line-strong); color:var(--text-muted); }
.form-result.error{ border-color:#e08a6b; color:#e08a6b; }
.inline-link{
  background:none; border:none; padding:0;
  color:inherit; text-decoration:underline; text-underline-offset:3px;
  font-size:inherit; font-family:inherit; cursor:pointer;
}

@media (max-width:960px){
  .visit{ grid-template-columns:1fr; }
  .visit-info{ transform:none; }
}
@media (max-width:640px){
  .visit-info, .visit-form{ padding:30px 22px; }
}
</style>
