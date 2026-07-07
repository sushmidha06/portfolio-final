<script setup>
import { techStack } from '../data/resume'
</script>

<template>
  <section id="capabilities">
    <div class="wrap">
      <div class="section-head" v-reveal>
        <h2>Capabilities</h2>
        <span class="label">03</span>
      </div>

      <div class="cols">
        <div v-for="(g, i) in techStack" :key="g.group" class="col" v-reveal="i * 50">
          <h3 class="label col-title">{{ g.group }}</h3>
          <ul>
            <li v-for="item in g.items" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cols {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(2rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3.5rem);
}

.col-title {
  color: var(--accent);
  padding-bottom: 0.9rem;
  border-bottom: 1px solid var(--line);
  margin-bottom: 1rem;
}

.col ul {
  list-style: none;
}
.col li {
  font-family: var(--serif);
  font-size: clamp(1.15rem, 2vw, 1.45rem);
  font-weight: 380;
  line-height: 1.75;
  color: var(--ink-soft);
  transition: color 0.2s ease, padding-left 0.25s ease;
}
.col li:hover {
  color: var(--ink);
  padding-left: 0.5rem;
}

@media (max-width: 820px) {
  .cols {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 520px) {
  .cols {
    grid-template-columns: 1fr;
  }
}
</style>
