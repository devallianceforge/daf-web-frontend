# Content Guide

All editable content currently lives in `src/data/` as typed TypeScript files. This is
intentional: it's the seam where a real CMS gets plugged in later (see PRD §9), without touching
any component code.

## Where things live today

| File | Powers | Type |
|---|---|---|
| `src/data/site.ts` | Nav links, hero/brand copy, stats strip, the 3 pillars | `SITE`, `NAV_LINKS`, `STATS`, `PILLARS` |
| `src/data/channels.ts` | All 8 social/community links (header, footer, `/community`) | `CHANNELS: Channel[]` |
| `src/data/events.ts` | Event cards on home + `/events` | `EVENTS: EventItem[]` — **sample data** |
| `src/data/workshops.ts` | Workshop cards on home + `/workshops` | `WORKSHOPS: WorkshopItem[]` — **sample data** |

## Editing content today (no CMS yet)

To update an event, a workshop, a social link, or a stat, edit the relevant array in `src/data/`
directly and redeploy. Every item is typed, so TypeScript will flag a typo'd field immediately.

## Migrating to a real CMS

Per the PRD, the recommended path is Sanity or Payload CMS. The migration is mechanical because
components already consume typed arrays, not inline content:

1. Define matching schemas in the CMS (Event, Workshop, Channel, SiteSettings).
2. Replace the static `export const EVENTS = [...]` with an async fetch (e.g. a Sanity GROQ query)
   inside the relevant Server Component (`src/app/events/page.tsx`, `src/components/EventsPreview.tsx`).
3. Keep the same `EventItem` / `WorkshopItem` TypeScript types as the contract between the CMS
   response and the UI — components don't need to change at all if the shape matches.
4. Add `/events/[slug]` and `/workshops/[slug]` detail routes once real per-item content (agenda,
   speakers, curriculum) exists to show.

## Adding a new community channel

Add one object to the `CHANNELS` array in `src/data/channels.ts` with a `name`, `url`, `icon`
(must be one of the icon keys already handled in `src/components/icons.tsx`), and `blurb`. It will
automatically appear in the header social row, the footer, and the `/community` page — no other
code changes needed.
