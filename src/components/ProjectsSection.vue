<script setup>
import { projects, profile } from '../data/resume'
</script>

<template>
  <section id="work">
    <div class="wrap">
      <div class="section-head" v-reveal>
        <h2>Selected <em>work</em></h2>
        <span class="label">02</span>
      </div>

      <ol class="list">
        <li v-for="(p, i) in projects" :key="p.title" class="row" v-reveal="i * 60">
          <div class="row-inner">
            <span class="index label">{{ String(i + 1).padStart(2, '0') }}</span>

            <div class="main">
              <h3 class="title">
                {{ p.title }}
                <span v-if="p.featured" class="flag">Flagship</span>
              </h3>
              <p class="desc">{{ p.description }}</p>
              <ul class="points">
                <li v-for="h in p.highlights" :key="h">{{ h }}</li>
              </ul>
            </div>

            <div class="aside">
              <span class="period label">{{ p.period }}</span>
              <p class="stack">{{ p.tech.join(' · ') }}</p>
            </div>
          </div>
        </li>
      </ol>

      <p class="more" v-reveal>
        Full archive on
        <a class="u-link" :href="profile.github" target="_blank" rel="noopener">GitHub — @sushmidha06</a>
      </p>
    </div>
  </section>
</template>

<style scoped>
.list {
  list-style: none;
}

.row {
  border-top: 1px solid var(--line);
  transition: background 0.3s ease;
}
.row:last-child {
  border-bottom: 1px solid var(--line);
}
.row:hover {
  background: var(--paper-deep);
}

.row-inner {
  display: grid;
  grid-template-columns: 60px 1fr minmax(190px, 250px);
  gap: clamp(1.2rem, 3vw, 2.5rem);
  padding: clamp(1.6rem, 4vw, 2.6rem) 0.4rem;
}

.index {
  padding-top: 0.55rem;
}

.title {
  font-size: clamp(1.5rem, 3.2vw, 2.2rem);
  font-weight: 400;
  margin-bottom: 0.7rem;
  display: flex;
  align-items: center;
  gap: 0.9rem;
  flex-wrap: wrap;
  transition: color 0.25s ease;
}
.row:hover .title {
  color: var(--accent);
}
.flag {
  font-family: var(--mono);
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--paper);
  background: var(--ink);
  padding: 0.3rem 0.7rem;
}

.desc {
  color: var(--ink-soft);
  max-width: 58ch;
  margin-bottom: 0.9rem;
}

.points {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.9rem;
  color: var(--ink-soft);
}
.points li {
  padding-left: 1.2rem;
  position: relative;
}
.points li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.65em;
  width: 7px;
  height: 1px;
  background: var(--accent);
}

.aside {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding-top: 0.45rem;
}
.stack {
  font-family: var(--mono);
  font-size: 0.76rem;
  line-height: 1.9;
  color: var(--ink-soft);
}

.more {
  margin-top: 2.4rem;
  color: var(--ink-soft);
  font-size: 0.95rem;
}

@media (max-width: 760px) {
  .row-inner {
    grid-template-columns: 1fr;
    gap: 0.9rem;
  }
  .index {
    padding-top: 0;
  }
  .aside {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1.5rem;
    padding-top: 0.4rem;
  }
  .stack {
    text-align: right;
  }
}
</style>
