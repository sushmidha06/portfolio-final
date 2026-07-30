<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const dot = ref(null)
const ring = ref(null)

const fine = window.matchMedia('(pointer: fine)').matches
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const enabled = fine && !reduced

let raf = 0
let x = -100, y = -100
let rx = -100, ry = -100
let shown = false

function onMove(e) {
  x = e.clientX
  y = e.clientY
  if (!shown) {
    shown = true
    rx = x
    ry = y
    dot.value?.classList.add('on')
    ring.value?.classList.add('on')
  }
}

function onOver(e) {
  if (e.target.closest('a, button')) ring.value?.classList.add('grow')
}
function onOut(e) {
  if (e.target.closest('a, button')) ring.value?.classList.remove('grow')
}
function onDown() {
  ring.value?.classList.add('press')
}
function onUp() {
  ring.value?.classList.remove('press')
}
function onLeaveDoc() {
  shown = false
  dot.value?.classList.remove('on')
  ring.value?.classList.remove('on')
}

function loop() {
  raf = requestAnimationFrame(loop)
  rx += (x - rx) * 0.16
  ry += (y - ry) * 0.16
  if (dot.value) dot.value.style.transform = `translate(${x}px, ${y}px)`
  if (ring.value) ring.value.style.transform = `translate(${rx}px, ${ry}px)`
}

onMounted(() => {
  if (!enabled) return
  document.documentElement.classList.add('has-cursor')
  window.addEventListener('pointermove', onMove, { passive: true })
  document.addEventListener('mouseover', onOver)
  document.addEventListener('mouseout', onOut)
  window.addEventListener('pointerdown', onDown)
  window.addEventListener('pointerup', onUp)
  document.documentElement.addEventListener('mouseleave', onLeaveDoc)
  loop()
})

onUnmounted(() => {
  if (!enabled) return
  document.documentElement.classList.remove('has-cursor')
  cancelAnimationFrame(raf)
  window.removeEventListener('pointermove', onMove)
  document.removeEventListener('mouseover', onOver)
  document.removeEventListener('mouseout', onOut)
  window.removeEventListener('pointerdown', onDown)
  window.removeEventListener('pointerup', onUp)
  document.documentElement.removeEventListener('mouseleave', onLeaveDoc)
})
</script>

<template>
  <template v-if="enabled">
    <div ref="dot" class="c-dot" aria-hidden="true"></div>
    <div ref="ring" class="c-ring" aria-hidden="true"></div>
  </template>
</template>

<style scoped>
.c-dot,
.c-ring {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  pointer-events: none;
  border-radius: 50%;
  opacity: 0;
  /* exclusion flips it light-on-ink automatically in the footer */
  mix-blend-mode: exclusion;
}
.c-dot.on,
.c-ring.on {
  opacity: 1;
}

.c-dot {
  width: 6px;
  height: 6px;
  margin: -3px 0 0 -3px;
  background: #00d4aa;
}

.c-ring {
  width: 34px;
  height: 34px;
  margin: -17px 0 0 -17px;
  border: 1px solid rgba(0, 212, 170, 0.6);
  transition: opacity 0.25s ease;
}
.c-ring::after {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 50%;
  border: 1px solid transparent;
  transform: scale(1);
}
.c-ring.grow {
  animation: none;
}
.c-ring.grow,
.c-ring.press {
  transition: opacity 0.25s ease;
}

/* scale states via inner element would fight the translate transform,
   so scale the ring with width/height instead */
.c-ring.grow {
  width: 58px;
  height: 58px;
  margin: -29px 0 0 -29px;
  border-color: rgba(0, 212, 170, 1);
}
.c-ring.press {
  width: 26px;
  height: 26px;
  margin: -13px 0 0 -13px;
}
.c-ring {
  transition: opacity 0.25s ease, width 0.3s ease, height 0.3s ease, margin 0.3s ease, border-color 0.3s ease;
}
</style>

<style>
/* native cursor hidden only when the custom one is active */
html.has-cursor,
html.has-cursor a,
html.has-cursor button {
  cursor: none;
}
</style>
