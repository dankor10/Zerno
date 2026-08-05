<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { testimonials } from '../data/testimonials.js'

const index = ref(0)
function next() { index.value = (index.value + 1) % testimonials.length }
function prev() { index.value = (index.value - 1 + testimonials.length) % testimonials.length }

let timer
onMounted(() => { timer = setInterval(next, 7000) })
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <section class="section" id="reviews">
    <div class="wrap testi-wrap reveal">
      <span class="section-eyebrow">Отзывы</span>
      <p class="testi-quote">{{ testimonials[index].text }}</p>
      <div class="testi-person mono">{{ testimonials[index].name }} · {{ testimonials[index].role }}</div>
      <div class="testi-controls">
        <button class="testi-arrow" @click="prev" aria-label="Предыдущий отзыв">
          <svg viewBox="0 0 24 24" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div class="testi-dots">
          <button
            v-for="(t, i) in testimonials" :key="i"
            class="testi-dot" :class="{ active: i === index }"
            @click="index = i" :aria-label="'Отзыв ' + (i + 1)"
          ></button>
        </div>
        <button class="testi-arrow" @click="next" aria-label="Следующий отзыв">
          <svg viewBox="0 0 24 24" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>
        </button>
      </div>
    </div>
  </section>
</template>
