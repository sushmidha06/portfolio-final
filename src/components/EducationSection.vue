<script setup>
import { education } from '../data/resume'
</script>

<template>
  <section id="education">
    <div class="wrap">
      <div class="section-head" v-reveal>
        <h2>Education</h2>
        <span class="label">04</span>
      </div>

      <ol class="rows">
        <li v-for="(e, i) in education" :key="e.degree" class="row" v-reveal="i * 60">
          <span class="period label">{{ e.period }}</span>
          <div>
            <h3 class="degree">{{ e.degree }}</h3>
            <p class="school">{{ e.school }}</p>
          </div>
          <span class="score">{{ e.score }}</span>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.rows {
  list-style: none;
}
.row {
  display: grid;
  grid-template-columns: 150px 1fr auto;
  gap: 1.5rem;
  align-items: baseline;
  padding-block: 1.7rem;
  border-top: 1px solid var(--line);
}
.row:last-child {
  border-bottom: 1px solid var(--line);
}

.degree {
  font-size: clamp(1.25rem, 2.4vw, 1.7rem);
  font-weight: 400;
  margin-bottom: 0.25rem;
}
.school {
  color: var(--ink-soft);
  font-size: 0.95rem;
}
.score {
  font-family: var(--mono);
  font-size: 0.8rem;
  color: var(--accent);
  white-space: nowrap;
}

@media (max-width: 640px) {
  .row {
    grid-template-columns: 1fr auto;
  }
  .period {
    grid-column: 1 / -1;
  }
}
</style>
