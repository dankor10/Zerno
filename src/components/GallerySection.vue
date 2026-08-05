<script setup>
const photos = [
  { caption: 'Обжарочный цех', variant: 1, tilt: -4 },
  { caption: 'Барная стойка',  variant: 2, tilt: 3 },
  { caption: 'Дегустация',     variant: 3, tilt: -2 },
  { caption: 'Латте-арт',      variant: 4, tilt: 5 },
  { caption: 'Зал у окна',     variant: 5, tilt: -3 },
]
</script>

<template>
  <section class="section">
    <div class="wrap">
      <div class="section-head reveal">
        <div>
          <span class="section-eyebrow">Внутри</span>
          <h2>Цех и зал</h2>
        </div>
      </div>

      <div class="board reveal">
        <figure
          class="polaroid"
          v-for="p in photos" :key="p.caption"
          :class="'v' + p.variant"
          :style="{ '--tilt': p.tilt + 'deg' }"
        >
          <span class="pin"></span>
          <div class="polaroid-photo"></div>
          <figcaption>{{ p.caption }}</figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.board{
  display:flex;
  flex-wrap:wrap;
  gap:30px 24px;
  padding:10px 0 20px;
}
.polaroid{
  --tilt: 0deg;
  margin:0;
  width:220px;
  background:#eee2d0;
  padding:14px 14px 34px;
  box-shadow:0 18px 30px -16px rgba(0,0,0,.75);
  transform:rotate(var(--tilt));
  transition:transform .3s ease, box-shadow .3s ease;
  position:relative;
}
.polaroid:hover{
  transform:rotate(0deg) translateY(-6px) scale(1.03);
  box-shadow:0 24px 36px -14px rgba(0,0,0,.8);
  z-index:2;
}
.pin{
  position:absolute; top:-8px; left:50%; transform:translateX(-50%);
  width:14px; height:14px; border-radius:50%;
  background:radial-gradient(circle at 35% 35%, var(--crema), var(--ember) 70%);
  box-shadow:0 3px 6px rgba(0,0,0,.5);
}
.polaroid-photo{ aspect-ratio:1/1; }
.v1 .polaroid-photo{ background: radial-gradient(circle at 30% 30%, rgba(232,196,104,.5), transparent 55%), repeating-radial-gradient(circle at 70% 70%, rgba(201,122,61,.55) 0 3px, transparent 3px 9px), #4a3420; }
.v2 .polaroid-photo{ background: repeating-linear-gradient(45deg, rgba(232,196,104,.35) 0 3px, transparent 3px 16px), #3a2a1c; }
.v3 .polaroid-photo{ background: radial-gradient(circle at 60% 40%, rgba(201,122,61,.6), transparent 60%), #2a1d13; }
.v4 .polaroid-photo{ background: repeating-linear-gradient(-45deg, rgba(255,255,255,.15) 0 2px, transparent 2px 20px), linear-gradient(120deg, #4a3420, #241a13); }
.v5 .polaroid-photo{ background: radial-gradient(circle at 40% 60%, rgba(232,196,104,.5), transparent 55%), #3a2a1c; }

.polaroid figcaption{
  font-family:'Caveat', cursive;
  font-size:22px;
  color:#241a13;
  text-align:center;
  margin-top:12px;
}

@media (max-width:640px){
  .board{ justify-content:center; }
  .polaroid{ width:44%; padding:10px 10px 26px; }
  .polaroid figcaption{ font-size:18px; }
}
</style>
