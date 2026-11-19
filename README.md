# John Wesley — Portfolio

A cinematic, motion-driven developer portfolio for **John Wesley** — Software Engineer · AI/ML Engineer · Full-Stack Developer (Integrated M.Tech IT, ABV-IIITM Gwalior).

Live: https://wesley-portfolio-seven.vercel.app

## Stack

- **Next.js 14 (App Router)** + **TypeScript** + **Tailwind CSS**
- **Framer Motion** — reveals, scroll-linked motion, layout animations, interactions
- **Lenis** — smooth scrolling (disabled automatically for reduced-motion users)
- **Geist Sans / Geist Mono** + **Instrument Serif** — self-hosted via `next/font`
- **Sentry** — error monitoring (configuration unchanged)

## Design system — "Obsidian Signal"

Near-black surfaces (`ink`), quiet greys (`fg`), and a restrained aurora accent (`violet` → `cyan`) warmed by `sand`, a tone taken from the hero photograph. Tokens live in `tailwind.config.ts`; shared component styles (`.surface`, `.chip`, `.eyebrow`, `.spotlight-card`) in `app/globals.css`.

## Structure

```
app/                 layout (SEO metadata, JSON-LD, fonts) and page
components/
  providers/         AppProviders — Lenis, intro state, reduced-motion handling
  layout/            Preloader, Navbar (+ scroll progress), Atmosphere, Footer
  sections/          Hero, TechMarquee, About, Experience, Skills, Projects,
                     Research, Education, Resume, Contact
  ui/                SplitText, ScrollWords, Reveal, Magnetic, Button, SpotlightCard, …
  visuals/           HeroParticles, TrajectoryVisual, BiasVisual (illustrations)
data/index.ts        ALL site content — edit text here
public/images        portrait
public/projects      real project screenshots (HR Orbit, DefektGuard)
```

## Editing content

All content is in `data/index.ts`.

- **Resume PDF** — add `public/resume/John_Wesley_Resume.pdf`, then set `site.resume.pdf` to `"/resume/John_Wesley_Resume.pdf"`. This enables the inline preview and direct download. Until then the buttons open the existing Google Drive link.
- **Portrait** — `site.photo.src`. Set it to `null` to show the designed placeholder.
- **Metrics** — each metric has `verified`. Only verified metrics are shown. Unconfirmed figures are kept with `verified: false`.
- **Examination name** — set `achievements[0].exam` once confirmed.

## Run locally

```bash
npm install
npm run dev
```

Production build: `npm run build && npm start`.
