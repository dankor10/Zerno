<script setup>
import { flavors } from '../data/flavors.js'
import { selectedFlavor, pickFlavor } from '../composables/useFlavor.js'

const RADIUS = 150

function positionFor(i, total) {
  const angle = (i / total) * 2 * Math.PI - Math.PI / 2
  return {
    left: `calc(50% + ${Math.cos(angle) * RADIUS}px)`,
    top: `calc(50% + ${Math.sin(angle) * RADIUS}px)`,
  }
}

function choose(name) {
  pickFlavor(name)
  document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <section class="section wheel-section">
    <div class="wrap">
      <div class="section-head reveal">
        <div>
          <span class="section-eyebrow">Колесо вкуса</span>
          <h2>Выберите ноту, а не название</h2>
        </div>
        <p>Так дегустаторы описывают кофе. Нажмите на вкус — меню ниже покажет, где он встречается.</p>
      </div>

      <div class="wheel reveal">
        <div class="wheel-guide"></div>
        <div class="wheel-guide inner"></div>

        <button
          v-for="(f, i) in flavors"
          :key="f.name"
          class="wheel-node"
          :class="{ active: selectedFlavor === f.name }"
          :style="positionFor(i, flavors.length)"
          @click="choose(f.name)"
        >
          {{ f.name }}
        </button>

        <div class="wheel-center">
          <template v-if="selectedFlavor">
            <span class="mono wheel-center-label">Вкус</span>
            <strong>{{ selectedFlavor }}</strong>
            <button class="wheel-reset" @click="pickFlavor(selectedFlavor)">сбросить ×</button>
          </template>
          <template v-else>
            <span class="mono wheel-center-label">Аромат</span>
            <strong>какой сегодня?</strong>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.wheel-section{ padding-bottom:40px; }
.wheel{
  position:relative;
  width:380px; height:380px;
  margin:0 auto;
}
.wheel-guide{
  position:absolute; inset:0;
  border:1px dashed var(--line-strong);
  border-radius:50%;
}
.wheel-guide.inner{
  inset:100px;
  border-style:solid;
  border-color:var(--line);
}
.wheel-node{
  position:absolute;
  transform:translate(-50%, -50%);
  background:var(--surface);
  border:1px solid var(--line-strong);
  color:var(--text-muted);
  font-family:'JetBrains Mono', monospace;
  font-size:11px;
  text-transform:uppercase;
  letter-spacing:.05em;
  padding:10px 14px;
  border-radius:999px;
  white-space:nowrap;
  transition:all .25s ease;
}
.wheel-node:hover{
  color:var(--text);
  border-color:var(--crema);
  transform:translate(-50%, -50%) scale(1.08);
}
.wheel-node.active{
  background:var(--ember);
  border-color:var(--ember);
  color:#1b120d;
  font-weight:700;
  transform:translate(-50%, -50%) scale(1.12);
}
.wheel-center{
  position:absolute; inset:0;
  margin:100px;
  border-radius:50%;
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px;
  text-align:center;
  padding:12px;
}
.wheel-center-label{ font-size:10px; color:var(--text-dim); }
.wheel-center strong{
  font-family:'Fraunces', serif;
  font-size:19px;
  font-weight:600;
  color:var(--crema);
  max-width:150px;
}
.wheel-reset{
  margin-top:6px;
  background:none; border:none;
  color:var(--text-dim);
  font-family:'JetBrains Mono', monospace;
  font-size:10.5px;
  text-transform:uppercase;
  letter-spacing:.06em;
  transition:color .2s ease;
}
.wheel-reset:hover{ color:var(--crema); }

@media (max-width:640px){
  .wheel{ width:300px; height:300px; transform:scale(.92); }
  .wheel-guide.inner{ inset:70px; }
  .wheel-center{ margin:70px; }
  .wheel-node{ padding:8px 10px; font-size:9.5px; }
}
</style>
