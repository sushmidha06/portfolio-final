# Sushmidha M — Portfolio

A modern, animated portfolio built with **Vue 3 + Vite**.

## Run locally

```bash
npm install
npm run dev      # start dev server at http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Adding the profile photo

Drop a square photo named `profile.jpg` (or `.png` / `.jpeg` / `.webp`) into:

```
src/assets/profile.jpg
```

The hero section picks it up automatically and replaces the "SM" monogram.
No code changes needed.

## Editing content

All resume content (projects, education, skills, certifications, contact info)
lives in a single file:

```
src/data/resume.js
```

Edit that file to update anything on the site.

## Structure

- `src/components/` — one component per section (Hero, About, Projects, …)
- `src/directives/reveal.js` — scroll-reveal animation directive (`v-reveal`)
- `src/style.css` — design tokens (colors, fonts, spacing) and shared styles
