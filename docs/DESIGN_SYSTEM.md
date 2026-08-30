# Design System — Dev Alliance Forge

This documents the design tokens as actually implemented in code (`src/app/globals.css`'s
`@theme` block), so design and engineering stay in sync. If you change a token, update it here
too.

> Tailwind v4 is CSS-first — there is no `tailwind.config.ts`. All custom tokens below are
> declared as CSS custom properties inside the `@theme { ... }` block at the top of
> `src/app/globals.css`, and Tailwind generates utility classes from them automatically.

## Colors

| Token | Value | Tailwind class | Usage |
|---|---|---|---|
| `bg` | `#06060b` | `bg-bg` | Page background |
| `bg-alt` | `#0a0a12` | `bg-bg-alt` | Alternate background |
| `surface` | `#0e0e17` | `bg-surface` | Cards, panels |
| `surface-2` | `#14141f` | `bg-surface-2` | Elevated surfaces, icon chips |
| `border` | `rgba(255,255,255,0.08)` | `border-border` | Default hairline borders |
| `border-hi` | `rgba(255,255,255,0.16)` | `border-border-hi` | Hover / emphasized borders |
| `text` | `#f5f5fa` | `text-text` | Primary text |
| `text-muted` | `#9595a9` | `text-text-muted` | Secondary text |
| `text-dim` | `#5c5c6e` | `text-text-dim` | Tertiary / label text |
| `violet` | `#7c3aed` | `text-violet` / `bg-violet` | Brand gradient start |
| `blue` | `#3b82f6` | `text-blue` / `bg-blue` | Brand gradient mid |
| `mint` | `#2fe6b0` | `text-mint` / `bg-mint` | Brand gradient end, primary accent |

**Brand gradient** (from the DAF logo): `bg-daf-gradient` — `linear-gradient(95deg, #7c3aed 0%, #3b82f6 52%, #2fe6b0 100%)`.
Soft/translucent variant for backgrounds: `bg-daf-gradient-soft`.

## Typography

| Role | Font | CSS variable | Tailwind class |
|---|---|---|---|
| Display / headings | Space Grotesk | `--font-display` | `font-display` |
| Body | Inter | `--font-body` | `font-body` (applied on `<body>` by default) |
| Mono / code / labels / stats | JetBrains Mono | `--font-mono` | `font-mono` |

Fonts are loaded via `next/font/google` in `src/app/layout.tsx` — no external font requests at
runtime beyond the initial font file fetch, and no layout shift (self-hosted by Next.js).

## Spacing & Shape

- Section vertical padding: `py-[120px]` desktop, effectively tighter on mobile via Tailwind's
  responsive defaults already used in the codebase.
- Card / panel radius: `rounded-daf` = `16px`.
- Pills / buttons: `rounded-full`.

## Motion

- Standard easing curve: `ease-daf` = `cubic-bezier(.16,.84,.32,1)` — used for all hover/transition
  states. Keep new interactive elements on this curve rather than the Tailwind default `ease`.
- Scroll reveals: use the shared `<Reveal>` component (`src/components/Reveal.tsx`), not one-off
  `whileInView` calls, so timing stays consistent site-wide.
- All animation must degrade gracefully under `prefers-reduced-motion` — already handled globally
  in `globals.css` and individually in `ParticleField.tsx` / `Hero.tsx`.

## Iconography

The DAF logo's `< >` bracket motif should keep showing up in small ways — see the `<AF>` logotype
in `Header.tsx` / `Footer.tsx`, and the `$ daf --init` / `$ daf --join` terminal-style labels used
as section eyebrows. Prefer this over generic icon-only decoration when adding new sections.

## Component reference

| Component | File | Notes |
|---|---|---|
| Hero | `src/components/Hero.tsx` | Canvas particle field + typewriter boot sequence |
| Reveal | `src/components/Reveal.tsx` | Standard scroll-in animation wrapper |
| MagneticButton | `src/components/MagneticButton.tsx` | Primary/ghost CTA with pointer-follow effect |
| Cursors | `src/app/globals.css` | Themed SVG cursors replace the native default: arrow (default), pointing hand (links/buttons), open/closed hand (`[data-cursor-grab]`) — brand-gradient fill with white outline |
| EventCard / WorkshopCard | `src/components/events/EventCard.tsx` / `src/components/workshops/WorkshopCard.tsx` | Shared visual card pattern — keep these two in sync when styling changes |
| CommunitySection | `src/components/CommunitySection.tsx` | Renders all 8 channels from `src/data/channels.ts` |
