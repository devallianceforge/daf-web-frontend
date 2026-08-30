# Dev Alliance Forge — Website

The official DAF website. Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind
CSS v4, and Framer Motion, per the project PRD.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## What's included

- `src/app/` — routes: home, `/events` + `/events/[slug]`, `/workshops` + `/workshops/[slug]`,
  `/projects` + `/projects/[slug]`, `/community` + `/community/[username]`, `/blog` + MDX post
  pages, `/about`, `/team`, `/partners`, `/join`, `/faq`, `/legal/privacy`, `/legal/terms`,
  `/contact`, plus `/api/contact`, `/api/events/register`, and `/api/workshops/register` route
  handlers, a generated `/sitemap.xml`, `/robots.txt`, and JSON-LD organization/event schema
- `src/components/` — Hero (animated particle field + boot-sequence typewriter), Header/Footer,
  Stats counters, Pillars, Event/Workshop/Project/Builder/Blog cards, Community channel grid,
  themed SVG cursors (arrow / pointing / grab / grabbing), magnetic buttons, scroll-reveal wrapper
- `src/data/` — site copy (incl. hero and join copy), nav links, social/community channels,
  sample events/workshops/projects/builders/team/partners, the FAQ, and the blog post registry.
  This is the layer to swap for a real CMS (Sanity/Payload — see the PRD) once you're ready to go
  live with real content.
- `src/lib/github.ts` — real GitHub REST API calls (not sample data) powering the live stats
  banner on `/projects`
- `public/logo.png` — your DAF logo, already wired into the header and footer
- `docs/` — project documentation, see below

## Contact form email

The contact form posts to `/api/contact`, which sends real email via
[Resend](https://resend.com) when `RESEND_API_KEY` is set (see `.env.example`). Without it, the
route still validates and accepts submissions — it just logs them to the server console instead
of sending an email — so the form works out of the box in local development.

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

- Event, workshop, project, builder, and team content in `src/data/` is sample data — connect a
  CMS or a database and replace these with real fetches (see `docs/CONTENT_GUIDE.md`).
- The ten blog posts under `src/app/blog/(posts)/` are real, complete sample content — not lorem
  ipsum — but written by this build, not the actual DAF team. Swap them for real posts whenever.
- Set `RESEND_API_KEY` in `.env.local` (see `.env.example`) to make the contact and registration
  forms send real email instead of just logging submissions server-side. Registration has no
  database, confirmation email to the registrant, or capacity/dedup layer yet (see PRD F2).
- Add a real `og-image` in `public/` before launch (`src/app/icon.png` already serves as the
  favicon).
- `/projects` shows **live** GitHub org stats (real API call, see `src/lib/github.ts`), but
  individual project cards still use static contributor counts — no real DAF repo names could be
  confirmed yet to wire per-repo live stats to honestly. See `docs/CONTENT_GUIDE.md` for exactly
  how to flip that on once real repos exist.
- The privacy policy and terms of use are sample text written for this build — have them reviewed
  by someone qualified before launch.

Every core content area in the PRD roadmap is now built in some form (sample-data or live), with
the migration path to real content documented in `docs/CONTENT_GUIDE.md`. Intentional gaps remain
and are tracked as pending in `docs/PRD.md` rather than claimed as done: newsletter signup (F3),
site-wide search (F7), analytics (F9), live chat (F10), and honeypot/rate-limit hardening on the
forms (F4).

## Scripts

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript check with no emit
