<script setup>
import { onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import TechSection from './components/TechSection.vue'
import EducationSection from './components/EducationSection.vue'
import RecognitionSection from './components/RecognitionSection.vue'
import FooterSection from './components/FooterSection.vue'
import CursorFollow from './components/CursorFollow.vue'

let lenis = null

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  lenis = new Lenis({
    autoRaf: true,
    duration: 1.1,
    anchors: { offset: -68 },
  })
})

onUnmounted(() => {
  lenis?.destroy()
})
</script>

<template>
  <div class="grain" aria-hidden="true"></div>
  <CursorFollow />
  <NavBar />
  <main>
    <HeroSection />
    <AboutSection />
    <ProjectsSection />
    <TechSection />
    <EducationSection />
    <RecognitionSection />
  </main>
  <FooterSection />
</template>

<style scoped>
/* film-grain overlay — bridges print and digital */
.grain {
  position: fixed;
  inset: -50%;
  z-index: 100;
  pointer-events: none;
  opacity: 0.5;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E");
}
</style>
