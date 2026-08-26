# Contributing

## Setup

```bash
npm install
npm run dev
```

Requires Node 20.9+ (Next.js 16 requirement).

## Before opening a PR

```bash
npm run typecheck
npm run lint
npm run build
```

All three should pass cleanly — this project was authored without network access to actually run
these locally (see root `README.md`), so treat your first local `npm run build` as the real
verification pass and report/fix anything that surfaces.

## Code conventions

- **Styling**: Tailwind utility classes only, pulling from the tokens in the `@theme` block in
  `src/app/globals.css`
  (see `docs/DESIGN_SYSTEM.md`). Avoid introducing new one-off colors or easing curves.
- **Content**: never hardcode copy that belongs in `src/data/` (see `docs/CONTENT_GUIDE.md`) into
  a component. Components should stay presentation-only.
- **Client vs. Server Components**: default to Server Components; only add `'use client'` when a
  file actually needs state, effects, or browser APIs (see `Hero.tsx`, `CustomCursor.tsx`,
  `ParticleField.tsx` for examples of components that legitimately need it).
- **Animation**: reuse `<Reveal>` for scroll-in effects and the `ease-daf` timing function for
  hover/transition states rather than inventing new motion patterns per component.
- **Accessibility**: every interactive element needs a visible focus state and a real `aria-label`
  where it isn't self-describing (icon-only links, the mobile menu button, etc). Respect
  `prefers-reduced-motion` for any new animation — see `globals.css` for the global rule and
  `ParticleField.tsx` for a per-component example.
- **Blog posts**: written as MDX under `src/app/blog/(posts)/<slug>/page.mdx`, styled globally via
  `src/mdx-components.tsx` — don't add one-off inline styles inside a post, fix the shared
  component mapping instead so every post benefits. See `docs/CONTENT_GUIDE.md` for the full
  add-a-post steps.
- **Live external data** (e.g. `src/lib/github.ts`): must fail to `null`/undefined on any error,
  never throw and never fall back to a fabricated number. Callers decide what to render (or not
  render) when data isn't available.

## Folder map

```
src/
  app/            routes (App Router) — one folder per URL segment
  components/     shared UI, one component per file
  data/           typed content — see docs/CONTENT_GUIDE.md
  lib/            small framework-agnostic helpers (e.g. cn())
```
