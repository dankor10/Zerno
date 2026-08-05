<script setup>
import { computed } from 'vue'
import { ref } from 'vue'
import { menuItems } from '../data/menu.js'
import { flavors } from '../data/flavors.js'
import { selectedFlavor, pickFlavor } from '../composables/useFlavor.js'

const categories = ['Всё', 'Кофе', 'Чай', 'Десерты']
const activeCategory = ref('Всё')
const favorites = ref([])

const activeFlavorKeywords = computed(() => {
  if (!selectedFlavor.value) return null
  return flavors.find(f => f.name === selectedFlavor.value)?.keywords ?? []
})

const filteredMenu = computed(() => {
  let items = activeCategory.value === 'Всё'
    ? menuItems
    : menuItems.filter(i => i.category === activeCategory.value)

  if (activeFlavorKeywords.value) {
    const kws = activeFlavorKeywords.value
    items = items.filter(i => {
      const haystack = `${i.notes} ${i.origin}`.toLowerCase()
      return kws.some(k => haystack.includes(k))
    })
  }
  return items
})

function toggleFavorite(name) {
  const i = favorites.value.indexOf(name)
  if (i === -1) favorites.value.push(name)
  else favorites.value.splice(i, 1)
}

// лёгкий "ручной" разброс углов — карточки не должны стоять как в таблице
function tilt(i) {
  const angles = [-2.5, 1.5, -1, 2, -1.8, 1, -2, 1.8]
  return angles[i % angles.length]
}
</script>

<template>
  <section class="section" id="menu">
    <div class="wrap">
      <div class="section-head reveal">
        <div>
          <span class="section-eyebrow">Меню · этикетки как на мешке</span>
          <h2>Что варим сегодня</h2>
        </div>
        <p>Происхождение, высота и обработка — на каждой бирке, как на настоящем мешке с зерном.</p>
      </div>

      <div class="menu-tabs">
        <button
          v-for="cat in categories" :key="cat"
          class="menu-tab" :class="{ active: activeCategory === cat }"
          @click="activeCategory = cat"
        >{{ cat }}</button>

        <button v-if="selectedFlavor" class="menu-tab flavor-chip" @click="pickFlavor(selectedFlavor)">
          вкус: {{ selectedFlavor }} ×
        </button>
      </div>

      <p v-if="filteredMenu.length === 0" class="menu-empty">
        Пока ничего с этой нотой не завариваем — попробуйте другой вкус на колесе выше.
      </p>

      <div class="tag-rack reveal">
        <article
          class="tag-card"
          v-for="(item, i) in filteredMenu" :key="item.name"
          :style="{ '--tilt': tilt(i) + 'deg' }"
        >
          <span class="tag-hole"></span>
          <div class="tag-top">
            <h3>{{ item.name }}</h3>
            <button
              class="fav-btn"
              :class="{ active: favorites.includes(item.name) }"
              @click="toggleFavorite(item.name)"
              :aria-pressed="favorites.includes(item.name)"
              :aria-label="'В избранное: ' + item.name"
            >
              <svg viewBox="0 0 24 24" stroke-width="2"><path d="M12 21s-7.5-4.6-10-9.2C.5 8.4 2 4.5 5.8 4C8 3.7 10 4.8 12 7c2-2.2 4-3.3 6.2-3C22 4.5 23.5 8.4 22 11.8 19.5 16.4 12 21 12 21z"/></svg>
            </button>
          </div>
          <div class="tag-origin mono">
            <span>{{ item.origin }}</span>
            <span v-if="item.altitude">{{ item.altitude }}</span>
            <span>{{ item.process }}</span>
          </div>
          <p class="tag-notes">{{ item.notes }}</p>
          <div class="tag-bottom">
            <span class="tag-price">{{ item.price }} ₽</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.menu-tabs{ display:flex; gap:10px; flex-wrap:wrap; margin-bottom:36px; }
.menu-tab{
  background:none; border:1px solid var(--line-strong); color:var(--text-muted);
  padding:9px 18px; font-size:13px; font-weight:600; border-radius:var(--radius);
  transition:all .2s ease;
}
.menu-tab:hover{ color:var(--text); border-color:var(--crema); }
.menu-tab.active{ background:var(--ember); border-color:var(--ember); color:#1b120d; }
.flavor-chip{
  background:var(--surface-2); border-color:var(--ember-light); color:var(--crema);
  margin-left:auto;
}
.menu-empty{ color:var(--text-muted); font-size:14.5px; padding:24px 0; }

/* -------- scattered hanging tags, deliberately not a grid -------- */
.tag-rack{
  display:flex;
  flex-wrap:wrap;
  gap:34px 28px;
  align-items:flex-start;
}
.tag-card{
  --tilt: 0deg;
  position:relative;
  width:290px;
  background:var(--surface);
  border:1px solid var(--line-strong);
  border-radius:6px 6px 3px 3px;
  padding:30px 22px 22px;
  box-shadow:0 16px 30px -18px rgba(0,0,0,.7);
  transform:rotate(var(--tilt));
  transition:transform .3s ease, box-shadow .3s ease, border-color .3s ease;
}
.tag-card:hover{
  transform:rotate(0deg) translateY(-4px);
  box-shadow:0 22px 36px -16px rgba(0,0,0,.75);
  border-color:var(--ember-light);
  z-index:2;
}
.tag-hole{
  position:absolute; top:12px; left:50%; transform:translateX(-50%);
  width:12px; height:12px; border-radius:50%;
  background:var(--bg-deep);
  border:1px solid var(--line-strong);
}
.tag-hole::after{
  content:"";
  position:absolute; top:-9px; left:50%; transform:translateX(-50%);
  width:1px; height:9px; background:var(--line-strong);
}
.tag-top{ display:flex; justify-content:space-between; align-items:flex-start; gap:10px; margin-top:6px; }
.tag-top h3{ font-size:19px; font-weight:600; }
.tag-origin{
  font-size:10.5px; text-transform:uppercase; letter-spacing:.05em; color:var(--text-dim);
  margin-top:10px; display:flex; gap:12px; flex-wrap:wrap;
}
.tag-notes{ margin-top:14px; color:var(--text-muted); font-size:14px; line-height:1.6; }
.tag-bottom{ margin-top:16px; padding-top:14px; border-top:1px dashed var(--line-strong); display:flex; justify-content:flex-end; }
.tag-price{ font-family:'JetBrains Mono', monospace; font-size:16px; color:var(--crema); }

.fav-btn{
  background:none; border:1px solid var(--line-strong); width:32px; height:32px; border-radius:50%;
  display:flex; align-items:center; justify-content:center; flex-shrink:0;
  transition:border-color .2s ease, transform .15s ease;
}
.fav-btn:hover{ transform:scale(1.08); }
.fav-btn svg{ width:14px; height:14px; stroke:var(--text-muted); fill:none; transition:all .2s ease; }
.fav-btn.active{ border-color:var(--ember-light); }
.fav-btn.active svg{ fill:var(--ember-light); stroke:var(--ember-light); }

@media (max-width:640px){
  .tag-card{ width:100%; }
  .tag-rack{ gap:26px; }
}
</style>
