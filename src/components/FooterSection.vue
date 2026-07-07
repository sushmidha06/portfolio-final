<script setup>
import { profile } from '../data/resume'

const year = new Date().getFullYear()
</script>

<template>
  <footer id="contact" class="footer">
    <div class="wrap">
      <div class="section-head" v-reveal>
        <h2 class="invert-title">Contact</h2>
        <span class="label">06</span>
      </div>

      <p class="pitch" v-reveal="80">
        Open to internships, freelance projects and collaborations —
      </p>
      <a class="big-mail" :href="`mailto:${profile.email}`" v-reveal="160" v-magnetic="0.06">
        Let's <em>talk.</em>
      </a>

      <div class="cols" v-reveal="240">
        <div class="colblock">
          <span class="label">Email</span>
          <a class="u-link" :href="`mailto:${profile.email}`">{{ profile.email }}</a>
        </div>
        <div class="colblock">
          <span class="label">Phone</span>
          <a class="u-link" :href="`tel:${profile.phone.replace(/\s/g, '')}`">{{ profile.phone }}</a>
        </div>
        <div class="colblock">
          <span class="label">Elsewhere</span>
          <span class="row-links">
            <a class="u-link" :href="profile.github" target="_blank" rel="noopener">GitHub</a>
            <a class="u-link" :href="profile.linkedin" target="_blank" rel="noopener">LinkedIn</a>
            <a class="u-link" :href="profile.leetcode" target="_blank" rel="noopener">LeetCode</a>
          </span>
        </div>
        <div class="colblock">
          <span class="label">Location</span>
          <span>{{ profile.location }}</span>
        </div>
      </div>

      <div class="baseline label" v-reveal>
        <span>© {{ year }} {{ profile.name }}</span>
        <span>Designed &amp; built with Vue.js</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--ink);
  color: var(--paper);
  padding-block: clamp(4rem, 9vw, 7rem) 2rem;
}
.footer .section-head {
  border-top-color: rgba(244, 240, 232, 0.4);
}
.footer .label {
  color: rgba(244, 240, 232, 0.55);
}
.invert-title {
  color: var(--paper);
}
.footer .section-head h2 {
  font-size: clamp(2rem, 5vw, 3.4rem);
}

.pitch {
  color: rgba(244, 240, 232, 0.65);
  margin-bottom: 0.6rem;
}

.big-mail {
  display: inline-block;
  font-family: var(--serif);
  font-size: clamp(3.4rem, 12vw, 9.5rem);
  font-weight: 340;
  letter-spacing: -0.02em;
  line-height: 1.05;
  margin-bottom: clamp(3rem, 8vw, 5.5rem);
  transition: color 0.3s ease;
}
.big-mail em {
  font-style: italic;
  color: #7d90ff;
  transition: color 0.3s ease;
}
.big-mail:hover,
.big-mail:hover em {
  color: #a8b6ff;
}

.cols {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding-top: 1.6rem;
  border-top: 1px solid rgba(244, 240, 232, 0.2);
  margin-bottom: clamp(3.5rem, 8vw, 6rem);
  font-size: 0.95rem;
}
.colblock {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  align-items: flex-start;
}
.row-links {
  display: flex;
  gap: 1.1rem;
}
.footer .u-link:hover {
  color: #a8b6ff;
}

.baseline {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 1.4rem;
  border-top: 1px solid rgba(244, 240, 232, 0.2);
}

@media (max-width: 820px) {
  .cols {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 480px) {
  .cols {
    grid-template-columns: 1fr;
  }
  .baseline {
    flex-direction: column;
    gap: 0.4rem;
  }
}
</style>
