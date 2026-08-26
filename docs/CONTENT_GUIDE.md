# Content Guide

All editable content currently lives in `src/data/` as typed TypeScript files. This is
intentional: it's the seam where a real CMS gets plugged in later (see PRD §9), without touching
any component code.

## Where things live today

| File | Powers | Type |
|---|---|---|
| `src/data/site.ts` | Nav links, hero/brand copy, stats strip, the 3 pillars | `SITE`, `NAV_LINKS`, `STATS`, `PILLARS` |
| `src/data/channels.ts` | All 8 social/community links (header, footer, `/community`) | `CHANNELS: Channel[]` |
| `src/data/events.ts` | Event cards on home + `/events` + `/events/[slug]` | `EVENTS: EventItem[]` — **sample data** |
| `src/data/workshops.ts` | Workshop cards on home + `/workshops` + `/workshops/[slug]` | `WORKSHOPS: WorkshopItem[]` — **sample data** |
| `src/data/projects.ts` | Project cards on home + `/projects` + `/projects/[slug]` | `PROJECTS: ProjectItem[]` — **sample data** |
| `src/data/builders.ts` | Builder directory on home + `/community` + `/community/[username]` | `BUILDERS: BuilderItem[]` — **sample data** |

## Editing content today (no CMS yet)

To update an event, a workshop, a social link, or a stat, edit the relevant array in `src/data/`
directly and redeploy. Every item is typed, so TypeScript will flag a typo'd field immediately.

## Migrating to a real CMS

Per the PRD, the recommended path is Sanity or Payload CMS. The migration is mechanical because
components already consume typed arrays, not inline content:

1. Define matching schemas in the CMS (Event, Workshop, Project, Builder, Channel, SiteSettings).
2. Replace the static `export const EVENTS = [...]` with an async fetch (e.g. a Sanity GROQ query)
   inside the relevant Server Component (`src/app/events/page.tsx`, `src/components/EventsPreview.tsx`).
3. Keep the same `EventItem` / `WorkshopItem` / `ProjectItem` / `BuilderItem` TypeScript types as
   the contract between the CMS response and the UI — components don't need to change at all if
   the shape matches.
4. `/events/[slug]`, `/workshops/[slug]`, `/projects/[slug]`, and `/community/[username]` already
   exist and use `generateStaticParams` against the sample arrays — once data comes from a CMS,
   swap that for a fetch of all slugs/usernames (or switch to `dynamicParams` + on-demand
   rendering if the catalog is large).

## Adding a new community channel

Add one object to the `CHANNELS` array in `src/data/channels.ts` with a `name`, `url`, `icon`
(must be one of the icon keys already handled in `src/components/icons.tsx`), and `blurb`. It will
automatically appear in the header social row, the footer, and the `/community` page — no other
code changes needed.

## GitHub API: what's actually live vs. sample

`src/lib/github.ts` calls GitHub's real public REST API — this isn't sample data. The `/projects`
page fetches `getGitHubOrgStats('devallianceforge')` server-side on every request/revalidation
and shows the org's real public repo count and follower count, or nothing at all if the API call
fails (never a fake fallback number).

**Why individual project cards below that banner still use static `contributors` counts**: at
the time this was built, no specific public repo names could be confirmed under the DAF GitHub
org, so there was nothing honest to point a per-repo API call at — `getGitHubRepoStats(owner, repo)`
exists in `src/lib/github.ts` and is fully ready to use, it's just not wired to anything yet.

Once real repos exist, wire it up per project:

1. Add a `repoName` field (e.g. `'daf-resource-hub'`) to the relevant entries in
   `src/data/projects.ts`.
2. In `src/app/projects/page.tsx` (and the homepage's `ProjectsPreview`), call
   `getGitHubRepoStats('devallianceforge', project.repoName)` for each project and pass the
   result into `ProjectCard` in place of the static `contributors` field.
3. Keep the `null`-on-failure contract — a repo that 404s or a rate-limited request should make
   that one card fall back to static copy, not break the page.

If you hit GitHub's 60-requests/hour unauthenticated rate limit once traffic grows, set
`GITHUB_TOKEN` (see `.env.example`) — no scopes needed for public data, it just raises the limit
to 5,000/hour.

## Blog

The blog works differently from the rest of the content — it uses real MDX files, not a plain
TypeScript array, because blog posts need rich formatting (headings, code blocks, links) that a
typed data object isn't a good fit for.

| Piece | Location | Purpose |
|---|---|---|
| `src/data/blog.ts` | `BLOG_POSTS: BlogPostMeta[]` | Drives the `/blog` index grid and the homepage's `BlogPreview` — title, excerpt, date, tags |
| `src/app/blog/(posts)/<slug>/page.mdx` | one folder per post | The actual article body, written in MDX (Markdown + JSX) |
| `src/mdx-components.tsx` | — | Global styling for every MDX element (headings, code blocks, links, etc.) so posts match the design system automatically |

**Adding a new post:**

1. Add a matching entry to `BLOG_POSTS` in `src/data/blog.ts` (slug, title, excerpt, date, tags,
   readTime, author).
2. Create `src/app/blog/(posts)/<same-slug>/page.mdx`. Start it with `import { BlogPostHeader }
   from '@/components/BlogPostHeader';` and render `<BlogPostHeader title="..." date="..."
   readTime="..." tags={[...]} author="..." />` with the same values as step 1, then write the
   post body below it in plain Markdown.
3. The `(posts)` folder is a route group — it doesn't add a URL segment, it just lets every post
   share one layout (`src/app/blog/(posts)/layout.tsx`) without affecting the `/blog` index page.

**Why the title/date/etc. are duplicated between `blog.ts` and each post's `<BlogPostHeader>`
props**: MDX files aren't easily queryable for "list all posts and their metadata" without
build-time file-globbing, so a small TS registry is the simpler, lower-risk source for the index
page. If this becomes annoying at a larger post count, the fix is to move posts to a headless CMS
(store the body as Markdown, compile it with `next-mdx-remote` at request time) — at that point
the registry and the content merge into one CMS-fetched object and the duplication goes away.
