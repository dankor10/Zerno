<script setup>
import { onMounted } from 'vue'
import AppNav from './components/AppNav.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import FlavorWheel from './components/FlavorWheel.vue'
import MenuSection from './components/MenuSection.vue'
import ProcessSection from './components/ProcessSection.vue'
import GallerySection from './components/GallerySection.vue'
import TestimonialsSection from './components/TestimonialsSection.vue'
import VisitSection from './components/VisitSection.vue'
import AppFooter from './components/AppFooter.vue'

// Общий scroll-reveal: любой элемент с классом .reveal в любом компоненте
// проявляется при попадании во вьюпорт.
onMounted(() => {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible')
        io.unobserve(e.target)
      }
    })
  }, { threshold: 0.12 })

  // компоненты монтируются синхронно, поэтому DOM уже готов
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
})
</script>

<template>
  <AppNav />
  <HeroSection />
  <div class="tear"></div>
  <AboutSection />
  <div class="tear"></div>
  <FlavorWheel />
  <MenuSection />
  <div class="tear"></div>
  <ProcessSection />
  <div class="tear"></div>
  <GallerySection />
  <div class="tear"></div>
  <TestimonialsSection />
  <div class="tear"></div>
  <VisitSection />
  <AppFooter />
</template>
