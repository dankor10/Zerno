<script setup>
import { ref } from 'vue'
const menuOpen = ref(false)
</script>

<template>
  <header class="nav">
    <div class="nav-inner">
      <a href="#top" class="brand"><span class="brand-mark">З</span>ЗЕРНО</a>
      <nav>
        <ul class="nav-links">
          <li><a href="#menu">Меню</a></li>
          <li><a href="#about">О нас</a></li>
          <li><a href="#process">Процесс</a></li>
          <li><a href="#reviews">Отзывы</a></li>
          <li><a href="#visit">Контакты</a></li>
        </ul>
      </nav>
      <div class="nav-cta">
        <a href="#visit" class="btn btn-primary">Забронировать</a>
        <button class="burger" @click="menuOpen = !menuOpen" :aria-expanded="menuOpen" aria-label="Меню">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
    <div class="mobile-panel" :class="{ open: menuOpen }">
      <a href="#menu" @click="menuOpen = false">Меню</a>
      <a href="#about" @click="menuOpen = false">О нас</a>
      <a href="#process" @click="menuOpen = false">Процесс</a>
      <a href="#reviews" @click="menuOpen = false">Отзывы</a>
      <a href="#visit" @click="menuOpen = false">Контакты</a>
      <a href="#visit" class="btn btn-primary" @click="menuOpen = false">Забронировать стол</a>
    </div>
  </header>
</template>
