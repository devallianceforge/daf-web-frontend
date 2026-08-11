# Dev Alliance Forge — Website

The official DAF website. Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind
CSS v4, and Framer Motion, per the project PRD.

## Getting started

This project's dependencies were **not** installed in the build environment (no network
access there), so the first run on your machine needs to fetch them:

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## What's included

- `src/app/` — routes: home, `/events`, `/workshops`, `/community`, `/about`, `/contact`
- `src/components/` — Hero (animated particle field + boot-sequence typewriter), Header/Footer,
  Stats counters, Pillars, Event/Workshop cards, Community channel grid, custom cursor, magnetic
  buttons, scroll-reveal wrapper
- `src/data/` — site copy, nav links, social/community channels, sample events & workshops.
  This is the layer to swap for a real CMS (Sanity/Payload — see the PRD) once you're ready to
  go live with real content.
- `public/logo.png` — your DAF logo, already wired into the header and footer
- `docs/` — project documentation, see below

## Documentation

| Doc | What it covers |
|---|---|
| [`docs/PRD.md`](./docs/PRD.md) | Full product requirements doc — research, goals, IA, feature specs, tech stack, roadmap |
| [`docs/DESIGN_SYSTEM.md`](./docs/DESIGN_SYSTEM.md) | Color/type/motion tokens as actually implemented in code |
| [`docs/CONTENT_GUIDE.md`](./docs/CONTENT_GUIDE.md) | How content works today and how to migrate to a real CMS |
| [`docs/CONTRIBUTING.md`](./docs/CONTRIBUTING.md) | Setup, conventions, and pre-PR checklist for contributors |
| [`docs/UPGRADES.md`](./docs/UPGRADES.md) | Why the stack was upgraded from the first draft, and what changed |

## Design system

Colors, type, radii, and easing are defined as Tailwind v4 theme tokens directly in
`src/app/globals.css` (an `@theme` block — see `docs/DESIGN_SYSTEM.md`). Keep new UI consistent
by pulling from these tokens rather than hardcoding one-off values.

## Known placeholders / next steps

- Event & workshop content in `src/data/events.ts` / `workshops.ts` is sample data — connect a
  CMS or a database and replace these with real fetches.
- The contact form (`src/components/ContactForm.tsx`) simulates a submit — wire it to a real API
  route (e.g. `/api/contact` using Resend) to actually send email.
- `/events/[slug]`, `/workshops/[slug]`, and `/projects` are referenced in the PRD but not yet
  built — natural next additions once real content exists.
- Add a real `favicon.ico` / `og-image` in `public/` before launch.

## Scripts

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript check with no emit
