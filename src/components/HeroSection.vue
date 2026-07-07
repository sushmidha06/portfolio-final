<script setup>
import { defineAsyncComponent } from 'vue'
import { profile } from '../data/resume'

const HeroCanvas = defineAsyncComponent(() => import('./HeroCanvas.vue'))

const marqueeItems = [...profile.roles, 'Puducherry, India', 'Open to Internships']
</script>

<template>
  <section id="top" class="hero">
    <HeroCanvas />
    <div class="wrap">
      <p class="kicker label" v-reveal>Portfolio — AI &amp; Data Science</p>

      <h1 class="display">
        <span class="line" v-reveal="80">Building</span>
        <span class="line indent" v-reveal="160"><em>intelligent</em> products,</span>
        <span class="line" v-reveal="240">end to end.</span>
      </h1>

      <div class="hero-foot" v-reveal="340">
        <p class="intro">
          I'm <a class="u-link" href="#about">Sushmidha M</a> — an AI &amp; Data Science
          engineer who ships agentic copilots, ML healthcare systems and full-stack
          products. Currently B.Tech AI&nbsp;&amp;&nbsp;DS '27, CGPA 9.0.
        </p>
        <div class="meta">
          <a class="u-link" :href="`mailto:${profile.email}`">{{ profile.email }}</a>
          <span class="meta-sep" aria-hidden="true"></span>
          <a class="u-link" :href="profile.github" target="_blank" rel="noopener">GitHub</a>
          <span class="meta-sep" aria-hidden="true"></span>
          <a class="u-link" :href="profile.linkedin" target="_blank" rel="noopener">LinkedIn</a>
          <span class="meta-sep" aria-hidden="true"></span>
          <a class="u-link" :href="profile.leetcode" target="_blank" rel="noopener">LeetCode</a>
        </div>
      </div>
    </div>

    <div class="marquee" aria-hidden="true">
      <div class="marquee-track">
        <span v-for="n in 2" :key="n" class="marquee-run">
          <span v-for="item in marqueeItems" :key="item + n" class="marquee-item">
            {{ item }}<i class="tick"></i>
          </span>
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-top: 68px;
  padding-bottom: 0;
  position: relative;
}
.hero .wrap,
.hero .marquee {
  position: relative;
  z-index: 1;
}

.kicker {
  margin-bottom: clamp(1.5rem, 4vh, 3rem);
}

.display {
  font-size: clamp(3rem, 10.5vw, 9rem);
  font-weight: 340;
  letter-spacing: -0.025em;
  margin-bottom: clamp(2.5rem, 6vh, 4.5rem);
}
.display .line {
  display: block;
}
.display .indent {
  padding-left: clamp(2rem, 12vw, 11rem);
}
.display em {
  font-style: italic;
  font-weight: 400;
  color: var(--accent);
}

.hero-foot {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 2.5rem;
  padding-bottom: clamp(2.5rem, 6vh, 4rem);
}

.intro {
  max-width: 46ch;
  color: var(--ink-soft);
  font-size: 1.02rem;
}

.meta {
  display: flex;
  align-items: center;
  gap: 1.1rem;
  font-family: var(--mono);
  font-size: 0.8rem;
  white-space: nowrap;
}
.meta-sep {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--line-strong);
}

/* ---- marquee ---- */
.marquee {
  border-top: 1px solid var(--line-strong);
  border-bottom: 1px solid var(--line-strong);
  overflow: hidden;
  padding-block: 0.85rem;
}
.marquee-track {
  display: flex;
  width: max-content;
  animation: scroll 28s linear infinite;
}
.marquee-run {
  display: flex;
}
.marquee-item {
  display: inline-flex;
  align-items: center;
  font-family: var(--mono);
  font-size: 0.78rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ink-soft);
  white-space: nowrap;
}
.tick {
  display: inline-block;
  width: 7px;
  height: 7px;
  margin-inline: 2.2rem;
  background: var(--accent);
}
@keyframes scroll {
  to {
    transform: translateX(-50%);
  }
}

@media (max-width: 760px) {
  .hero-foot {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.6rem;
  }
  .meta {
    flex-wrap: wrap;
    white-space: normal;
  }
}
</style>
