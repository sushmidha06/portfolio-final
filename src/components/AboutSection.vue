<script setup>
import { profile, stats, softSkills, languages } from '../data/resume'

const photos = import.meta.glob('../assets/profile.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})
const photoUrl = Object.values(photos)[0] ?? null
</script>

<template>
  <section id="about">
    <div class="wrap">
      <div class="section-head" v-reveal>
        <h2>About <em>me</em></h2>
        <span class="label">01</span>
      </div>

      <div class="grid">
        <figure class="portrait" v-reveal="80" v-tilt="6">
          <img v-if="photoUrl" :src="photoUrl" :alt="profile.name" />
          <div v-else class="portrait-empty">
            <span class="portrait-initial">S</span>
          </div>
          <figcaption class="label">{{ profile.name }} — {{ profile.location }}</figcaption>
        </figure>

        <div class="body" v-reveal="160">
          <p class="lede">
            A B.Tech student in Artificial Intelligence &amp; Data Science at
            Sri Manakula Vinayagar Engineering College, maintaining a 9.0 CGPA
            while shipping real products end to end.
          </p>
          <p>
            My work spans the full stack — agentic AI copilots built with LangChain,
            RAG and FastAPI; polished frontends in Vue.js 3; cross-platform mobile
            apps in Flutter. I build things that solve real problems: healthcare
            diagnosis systems, smart-city platforms, and AI assistants that take
            actions rather than just chat.
          </p>
          <p>
            Beyond projects, I sharpen fundamentals on
            <a class="u-link" :href="profile.leetcode" target="_blank" rel="noopener">LeetCode</a>
            — 100+ algorithmic problems — and compete in hackathons, with a podium
            finish at MIT and top rankings in college challenges.
          </p>

          <dl class="facts">
            <div class="fact">
              <dt class="label">Strengths</dt>
              <dd>{{ softSkills.join(', ') }}</dd>
            </div>
            <div class="fact">
              <dt class="label">Languages</dt>
              <dd>{{ languages.join(' · ') }}</dd>
            </div>
          </dl>
        </div>

        <ul class="stats" v-reveal="240">
          <li v-for="s in stats" :key="s.label">
            <span class="stat-num">{{ s.decimals ? s.value.toFixed(1) : s.value }}{{ s.suffix }}</span>
            <span class="label">{{ s.label }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: minmax(220px, 340px) 1fr;
  gap: clamp(2rem, 6vw, 5rem);
}

.portrait img,
.portrait-empty {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border: 1px solid var(--line-strong);
  display: block;
  filter: grayscale(0.15);
}
.portrait-empty {
  display: grid;
  place-items: center;
  background: var(--paper-deep);
}
.portrait-initial {
  font-family: var(--serif);
  font-style: italic;
  font-size: 7rem;
  color: var(--ink-faint);
}
.portrait figcaption {
  margin-top: 0.8rem;
}

.body p {
  color: var(--ink-soft);
  margin-bottom: 1.2rem;
  max-width: 62ch;
}
.lede {
  font-family: var(--serif);
  font-size: clamp(1.25rem, 2.4vw, 1.65rem);
  line-height: 1.4;
  color: var(--ink) !important;
  margin-bottom: 1.6rem !important;
}

.facts {
  margin-top: 2.2rem;
  display: grid;
  gap: 1.1rem;
}
.fact {
  display: grid;
  grid-template-columns: 130px 1fr;
  gap: 1rem;
  padding-top: 1.1rem;
  border-top: 1px solid var(--line);
}
.fact dd {
  color: var(--ink-soft);
  font-size: 0.95rem;
}

.stats {
  grid-column: 1 / -1;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid var(--line-strong);
  margin-top: 1rem;
}
.stats li {
  padding: 1.6rem 1.4rem 0.4rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.stats li + li {
  border-left: 1px solid var(--line);
  padding-left: 1.4rem;
}
.stat-num {
  font-family: var(--serif);
  font-size: clamp(2.2rem, 4.5vw, 3.4rem);
  font-weight: 350;
  line-height: 1;
}

@media (max-width: 820px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .portrait {
    max-width: 300px;
  }
  .stats {
    grid-template-columns: 1fr 1fr;
    gap: 0;
  }
  .stats li {
    border-top: 1px solid var(--line);
    padding-left: 0;
  }
  .stats li:nth-child(2n + 1) {
    border-left: none;
    padding-left: 0;
  }
  .stats li:nth-child(2) {
    padding-left: 1.4rem;
  }
  .stats li:nth-child(4) {
    padding-left: 1.4rem;
  }
  .stats li:nth-child(-n + 2) {
    border-top: none;
  }
}
</style>
