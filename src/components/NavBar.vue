<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { profile } from '../data/resume'

const links = [
  { n: '01', label: 'About', href: '#about' },
  { n: '02', label: 'Work', href: '#work' },
  { n: '03', label: 'Capabilities', href: '#capabilities' },
  { n: '04', label: 'Education', href: '#education' },
  { n: '05', label: 'Recognition', href: '#recognition' },
  { n: '06', label: 'Contact', href: '#contact' },
]

const scrolled = ref(false)
const menuOpen = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 10
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="nav" :class="{ scrolled }">
    <div class="wrap nav-inner">
      <a href="#top" class="brand" @click="menuOpen = false">
        Sushmidha<span class="brand-dot">&nbsp;M</span>
      </a>

      <nav class="links" :class="{ open: menuOpen }" aria-label="Main navigation">
        <a v-for="l in links" :key="l.href" :href="l.href" v-magnetic="0.2" @click="menuOpen = false">
          <sup>{{ l.n }}</sup> {{ l.label }}
        </a>
      </nav>

      <button
        class="menu-btn"
        :aria-expanded="menuOpen"
        aria-label="Toggle menu"
        @click="menuOpen = !menuOpen"
      >
        {{ menuOpen ? 'Close' : 'Menu' }}
      </button>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: var(--paper);
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s ease;
}
.nav.scrolled {
  border-bottom-color: var(--line);
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
}

.brand {
  font-family: var(--serif);
  font-size: 1.15rem;
  font-weight: 500;
}
.brand-dot {
  font-style: italic;
  color: var(--accent);
}

.links {
  display: flex;
  gap: 1.9rem;
  font-family: var(--mono);
  font-size: 0.78rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.links a {
  color: var(--ink-soft);
  transition: color 0.2s ease;
}
.links a:hover {
  color: var(--accent);
}
.links sup {
  font-size: 0.6rem;
  color: var(--ink-faint);
  margin-right: 2px;
}

.menu-btn {
  display: none;
  background: none;
  border: none;
  font-family: var(--mono);
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink);
}

@media (max-width: 860px) {
  .menu-btn {
    display: block;
  }
  .links {
    position: fixed;
    top: 68px;
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 0;
    background: var(--paper);
    border-bottom: 1px solid var(--line-strong);
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.35s ease;
  }
  .links.open {
    max-height: 420px;
  }
  .links a {
    padding: 1rem var(--gutter);
    border-top: 1px solid var(--line);
  }
}
</style>
