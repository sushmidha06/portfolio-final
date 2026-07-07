<script setup>
import { achievements, certifications } from '../data/resume'
</script>

<template>
  <section id="recognition">
    <div class="wrap">
      <div class="section-head" v-reveal>
        <h2>Recognition</h2>
        <span class="label">05</span>
      </div>

      <div class="split">
        <div v-reveal="60">
          <h3 class="label group-title">Honours</h3>
          <ol class="entries">
            <li v-for="a in achievements" :key="a.title" class="entry">
              <h4>{{ a.title }}</h4>
              <p>{{ a.detail }}</p>
            </li>
          </ol>
        </div>

        <div v-reveal="140">
          <h3 class="label group-title">Certifications</h3>
          <ol class="entries">
            <li v-for="c in certifications" :key="c.title" class="entry compact">
              <h4>
                {{ c.title }}
                <span v-if="c.badge" class="badge">{{ c.badge }}</span>
              </h4>
              <p>{{ c.issuer }}</p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2.5rem, 6vw, 5rem);
}

.group-title {
  color: var(--accent);
  padding-bottom: 0.9rem;
  border-bottom: 1px solid var(--line);
}

.entries {
  list-style: none;
}
.entry {
  padding-block: 1.4rem;
  border-bottom: 1px solid var(--line);
}
.entry h4 {
  font-family: var(--serif);
  font-size: 1.2rem;
  font-weight: 400;
  margin-bottom: 0.35rem;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  flex-wrap: wrap;
}
.entry p {
  color: var(--ink-soft);
  font-size: 0.92rem;
  max-width: 52ch;
}
.entry.compact {
  padding-block: 1.1rem;
}

.badge {
  font-family: var(--mono);
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  border: 1px solid var(--line-strong);
  padding: 0.22rem 0.6rem;
}

@media (max-width: 760px) {
  .split {
    grid-template-columns: 1fr;
  }
}
</style>
