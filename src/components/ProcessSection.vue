<template>
  <section class="section" id="process">
    <div class="wrap">
      <div class="section-head reveal">
        <div>
          <span class="section-eyebrow">От зерна до чашки</span>
          <h2>Кривая обжарки, не три коробки</h2>
        </div>
        <p>Так реально выглядит журнал обжарщика — температура зерна во времени, от загрузки до съёма.</p>
      </div>

      <div class="roast-panel reveal">
        <svg class="roast-graph" viewBox="0 0 700 240" preserveAspectRatio="none" aria-hidden="true">
          <line v-for="y in [40,90,140,190]" :key="y" x1="0" :y1="y" x2="700" :y2="y" class="grid-line" />
          <path
            class="roast-curve"
            d="M40,190 C 70,205 90,215 110,210 C 180,190 250,140 300,110 C 360,80 430,60 480,55 C 540,50 580,35 620,30"
          />
          <g v-for="p in points" :key="p.label">
            <circle :cx="p.x" :cy="p.y" r="5" class="roast-point" />
            <line :x1="p.x" :y1="p.y" :x2="p.x" y2="228" class="roast-drop" />
          </g>
        </svg>

        <div class="roast-labels">
          <div v-for="p in points" :key="p.label" class="roast-label" :style="{ left: (p.x / 700) * 100 + '%' }">
            <span class="roast-time mono">{{ p.time }}</span>
            <strong>{{ p.label }}</strong>
            <span class="roast-temp mono">{{ p.temp }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const points = [
  { x: 40,  y: 190, time: '0:00',  label: 'Загрузка',      temp: '180°C' },
  { x: 300, y: 110, time: '6:00',  label: 'Майяр',          temp: '150°C' },
  { x: 480, y: 55,  time: '10:30', label: 'Первый крэк',    temp: '205°C' },
  { x: 620, y: 30,  time: '13:00', label: 'Съём',           temp: '218°C' },
]
</script>

<style scoped>
.roast-panel{
  border:1px solid var(--line);
  background:var(--bg-deep);
  padding:36px 36px 88px;
  position:relative;
}
.roast-graph{ width:100%; height:auto; display:block; overflow:visible; }
.grid-line{ stroke:var(--line); stroke-width:1; }
.roast-curve{
  fill:none;
  stroke:var(--ember);
  stroke-width:3;
  stroke-linecap:round;
  filter:drop-shadow(0 0 6px rgba(201,122,61,.35));
}
.roast-point{ fill:var(--crema); stroke:var(--bg-deep); stroke-width:2; }
.roast-drop{ stroke:var(--line-strong); stroke-width:1; stroke-dasharray:2 3; }

.roast-labels{ position:relative; height:0; }
.roast-label{
  position:absolute; top:20px; transform:translateX(-50%);
  display:flex; flex-direction:column; align-items:center; text-align:center;
  gap:4px; width:120px;
}
.roast-label strong{ font-family:'Fraunces', serif; font-size:16px; color:var(--text); }
.roast-time{ font-size:10px; color:var(--ember-light); }
.roast-temp{ font-size:10px; color:var(--text-dim); }

@media (max-width:640px){
  .roast-panel{ padding:24px 16px 120px; }
  .roast-label{ width:88px; font-size:12px; }
  .roast-label strong{ font-size:13px; }
}
</style>
