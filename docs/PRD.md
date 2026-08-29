# Product Requirements Document (PRD)
## Dev Alliance Forge (DAF) — Official Website Redesign

**Document owner:** Product/Design Team
**Prepared for:** Dev Alliance Forge (DAF)
**Version:** 1.0
**Date:** August 10, 2026

---

## 1. Background & Research Summary

Dev Alliance Forge (DAF) is an existing, active volunteer-driven developer community, currently live across the following channels:

| Channel | Handle / URL |
|---|---|
| Website (current) | devallianceforge.site |
| Facebook | facebook.com/devallianceforge |
| LinkedIn | linkedin.com/company/dev-alliance-forge |
| Instagram | instagram.com/devallianceforge |
| X (Twitter) | x.com/devallianceforg |
| GitHub | github.com/devallianceforge |
| WhatsApp Community | chat.whatsapp.com/Ez8UW8h7vVw8j0OH1g2OQp |
| Telegram | t.me/devallianceforge__ |
| Discord | discord.gg/uje6kkBkkg |
| Contact email | devallianceforge@gmail.com |
| Base | Bangladesh |

**Positioning (from existing brand copy):** DAF describes itself as *"a volunteer-driven community where passionate students, developers, and IT professionals and beyond come together to learn, build, and elevate."* Core brand pillars, in DAF's own words: **Forge new skills** (tutorials, projects, best practices), **Mentor each other** (peer-to-peer sessions, open-source sprints), and **Bridge global standards and local needs** (turning ideas into working solutions). Current site tagline (as implemented in `src/data/site.ts`): *"Your alliance for innovation, your forge for impact."*

**Current site structure (baseline to improve on):** Home, Events, Workshops, Community, Contact, Developer — plus a live-chat widget, a stats strip (Total Events / Workshops / Builders / 24×7 Support), and social follow links in the header and footer. The current build is a simple, mostly static/light template with no distinctive visual identity, no motion design, and a generic layout — this is the primary gap this redesign addresses.

**Logo & brand mark:** The DAF mark is a geometric wordmark built from `< A F >` — literally code-bracket syntax wrapping the "AF" letterform — rendered in a purple → cyan/mint gradient, with a white wordmark. This confirms two things as non-negotiable brand facts: (1) the logo is **designed for a dark background** (the white text is invisible on light backgrounds, which is likely already a bug on the current light site), and (2) the "code bracket" motif (`< >`) should inform iconography, dividers, and motion design across the site.

---

## 2. Problem Statement & Opportunity

The current website functions as a basic directory of events/workshops but does not reflect DAF's identity as a *forward-leaning, code-native, builder-first* tech community. For an organization whose entire value proposition is "we are developers who build the future," the website itself is the single highest-leverage credibility signal — and today it under-delivers relative to the brand promise. There is a clear opportunity to rebuild the site as a **dark, cinematic, animation-rich, developer-grade** experience that itself functions as a portfolio piece for the community.

---

## 3. Goals & Success Metrics

### 3.1 Product Goals
1. Establish DAF as a visually distinctive, premium tech-community brand online — on par with or exceeding sites like Vercel, Linear, Raycast, or major hackathon/DevRel orgs.
2. Convert visitors into members across the community's real channels (Discord, WhatsApp, Telegram) and event registrants.
3. Give the community a living showcase: events, workshops, builder profiles, projects, and open-source contributions in one authoritative hub.
4. Make the site itself a technical flex — its performance, code quality, and craft should double as recruiting material for contributors.

### 3.2 Success Metrics (first 90 days post-launch)
- ≥ 30% increase in Discord/WhatsApp/Telegram join clicks from the website vs. baseline.
- ≥ 25% increase in event/workshop registration conversions.
- Core Web Vitals: LCP < 2.0s, INP < 200ms, CLS < 0.1 on 4G mobile.
- Lighthouse Performance ≥ 90, Accessibility ≥ 95.
- Bounce rate reduced by ≥ 15% relative to current site.
- At least 3 unsolicited social/media mentions of the site's design within the first month (qualitative brand-lift signal).

---

## 4. Target Audience & Personas

| Persona | Description | Primary need from the site |
|---|---|---|
| **The Aspiring Builder** | University student / early-career dev in Bangladesh, new to the community | Clear "how do I join," workshop calendar, beginner-friendly framing |
| **The Active Contributor** | Existing member, attends events, contributes to open-source sprints | Event/workshop details, project showcase, community directory |
| **The Mentor/Senior Dev** | Experienced engineer considering giving a talk or mentoring | Credibility signals, past event quality, clear "get involved" path for speakers |
| **The Partner/Sponsor** | Company, edtech platform, or local tech org considering sponsorship or collaboration | Impact stats, media kit, partnership contact |
| **The Recruiter/Observer** | Company scouting talent, press, or another community leader | Builder showcase, GitHub activity, professionalism as social proof |

---

## 5. Design Direction

### 5.1 Visual Identity
- **Theme:** Dark-mode-first (dark is the *only* mode at launch — no light-mode toggle needed for v1, since the logo itself is dark-native).
- **Base palette:**
  - Background: near-black `#05050A` / `#0A0A12` with subtle noise/grain texture, not flat black.
  - Elevated surfaces: `#0F0F1A`, `#14141F` with soft inner glow borders (1px, low-opacity gradient stroke).
  - Primary gradient (from logo): Violet `#7C3AED` → Blue `#3B82F6` → Cyan/Mint `#2DD4BF`/`#34E5B0`. Used for CTAs, hover states, section dividers, glow effects, and the animated "signal line" motif.
  - Text: off-white `#F5F5FA` primary, `#9797AA` secondary/muted.
  - Accent/success/status colors kept desaturated so the gradient stays the hero color.
- **Typography:** A geometric/technical sans for display (e.g., Space Grotesk, General Sans, or Clash Display) paired with a clean neutral sans for body (Inter or Geist). Monospace (JetBrains Mono / Geist Mono) used deliberately for code snippets, stats, timestamps, and small tags — reinforcing "developer-native" feel.
- **Iconography & motif:** Lean into the `< / >` bracket motif from the logo — section dividers, cursor blinkers, corner brackets on cards, terminal-style prompts (`$ daf --join`) as microcopy accents.
- **Imagery:** Avoid generic stock photography. Favor abstract circuit/network node illustrations, isometric 3D code-block renders, generative gradient meshes, and real event/community photography (dark-graded) over polished corporate stock.

> **As-implemented palette:** the shipped codebase finalizes a few of the above values — page
> background `#06060b`, alt background `#0a0a12`, mint `#2fe6b0`, with a `95deg` gradient.
> `docs/DESIGN_SYSTEM.md` (and the `@theme` block in `src/app/globals.css`) is the source of truth
> for what actually ships.

### 5.2 Motion & Interaction Design ("smooth and techy")
- **Principle:** Motion should feel like a well-engineered system, not decoration — physics-based easing (spring, not linear), consistent timing tokens, and restraint (nothing distracting from content).
- **Hero:** Animated gradient mesh / particle network background (WebGL or Canvas) reacting subtly to cursor movement and scroll; animated headline using a text-reveal/typewriter or scramble-decode effect referencing "compiling," "initializing," or terminal boot sequences.
- **Scroll storytelling:** Scroll-linked reveals (fade + slide + slight 3D tilt) for section entries, using `IntersectionObserver`/scroll-driven animation, not just opacity fades.
- **Cards (events, workshops, builders):** Subtle 3D tilt-on-hover (perspective transform tied to pointer position), animated gradient border glow on hover, magnetic buttons (CTA follows cursor slightly within a radius).
- **Stats counters:** Animated count-up on scroll-into-view for the "Total Events / Workshops / Builders" strip.
- **Page transitions:** Smooth cross-fade/slide transitions between routes (view-transitions API or Framer Motion `AnimatePresence`) so navigation feels like a single continuous app, not full page reloads.
- **Micro-interactions:** Custom SVG cursors on desktop (arrow default, pointing hand on links/buttons, open/closed hand on `[data-cursor-grab]` — brand-gradient fill, white outline); button ripple/gradient-sweep on click; form field focus states with animated glowing outline; loading states styled as terminal/progress-bar animations, not generic spinners.
- **Performance guardrail:** All animation must respect `prefers-reduced-motion`; heavy WebGL/3D elements must lazy-load, degrade gracefully on low-end devices, and never block LCP.

---

## 6. Information Architecture / Sitemap

```
/                       Home
/events                 Events (list + filters)
/events/[slug]          Event detail (agenda, speakers, register CTA)
/workshops              Workshops (list + filters, skill level tags)
/workshops/[slug]       Workshop detail (curriculum, prerequisites, register)
/community              Community hub (builder directory, leaderboard, spotlight)
/community/[username]   Builder profile
/projects               Open-source / community project showcase
/projects/[slug]        Project detail (repo link, contributors, tech stack)
/about                  Mission, story, values, timeline
/team                   Organizers / core team / mentors
/partners               Sponsors & partnership info + "Become a Partner"
/blog                   Articles, tutorials, recaps
/blog/[slug]            Article detail
/contact                Contact form + social/channel directory
/join                   Primary conversion page — all community channels (Discord/WhatsApp/Telegram/GitHub)
/faq                    FAQ
/legal/privacy, /legal/terms
```

> **Build status (Aug 2026).** All routes above now exist as pages. Built earlier: `/` and all
> content hubs (`/events`, `/workshops`, `/projects`, `/community`, `/about`, `/blog`,
> `/contact`). Added in this round: `/team`, `/partners`, `/join`, `/faq`, `/legal/privacy`,
> `/legal/terms`, plus PRD F12's `/sitemap.xml`, `/robots.txt`, and JSON-LD. Live-data gaps that
> keep some routes partial (`/projects` per-repo stats, `/community` real builder directory &
> leaderboard) are called out in §8/§13 and `docs/CONTENT_GUIDE.md`. Section-specific features not
> yet wired are noted inline below.

---

## 7. Page-Level Requirements

### 7.1 Home
- Full-viewport animated hero: logo mark animates in (bracket-open → letters assemble → bracket-close), gradient particle background, headline + subhead, dual CTA ("Join the Community" primary gradient button, "Explore Events" secondary ghost button).
- Live/animated stats strip (Events, Workshops, Builders, 24/7 Support) with count-up.
- "Upcoming Events" horizontally scrollable/carousel section pulling from CMS, max 3–4 featured.
- "Latest Workshops" grid section, same data pattern.
- "What We Do" — three pillars (Forge Skills / Mentor / Bridge) as animated interactive cards.
- Builder/community spotlight strip (avatars, marquee/infinite scroll of recent contributors).
- Partner/sponsor logo strip (marquee, grayscale → color on hover), shown only once real partners exist.
- Footer: full sitemap, social icons (all 8 channels), newsletter signup, email contact, "Developed by [credit]" line retained per current practice.

### 7.2 Events & Workshops
- Filterable/sortable grid (upcoming/past, category, skill level, format: online/in-person/hybrid).
- Card: animated gradient border, date badge, title, short description, tags, speaker avatars, CTA.
- Detail page: hero banner, agenda/timeline component, speaker bios, location/map or online-link block, calendar-add button (Google/Apple/ICS), social share, register CTA (external form or embedded RSVP), "similar events" recommendations.
- Past events: recap gallery (photos), highlights, optional recording embed.

### 7.3 Community
- Builder directory with search/filter by skill, role (student/professional/mentor), and search.
- Builder profile cards link out to GitHub/LinkedIn; optional "contribution stats" pulled via GitHub API (public repos, streak, top languages) rendered as a stylized dev dashboard widget.
- Leaderboard/recognition section (e.g., "Top Contributors This Month") to gamify participation.
- Clear, prominent multi-channel join block (Discord, WhatsApp, Telegram cards with live-style member counts if available via API, else static copy).

### 7.4 Projects (Open-Source Showcase)
- Grid of community/open-source projects with tech-stack tag chips, GitHub stars/forks (pulled live via GitHub API), contributor avatars, and "Contribute" CTA linking to repo issues labeled `good-first-issue`.

### 7.5 About / Team
- Animated timeline/origin story component.
- Mission/vision/values as interactive scroll sections tied to the three pillars.
- Team grid: organizer photos, roles, social links, subtle hover-reveal bios.

### 7.6 Partners
- Value proposition for sponsors, tiered partnership benefits, logo wall, "Become a Partner" contact form.

### 7.7 Contact / Join
- Contact form (name, email, subject, message) with animated validation and success state (confetti/gradient-pulse, not a jarring alert).
- Full social/community channel directory as interactive cards (icon, name, member count if available, "Join" button) — this becomes the canonical multi-channel hub, replacing the current footer-only link list.
- Retain and upgrade the existing live chat widget (see §9).

### 7.8 Blog (Phase 2)
- MDX-based long-form content for tutorials/recaps; syntax-highlighted code blocks (monospace, gradient-accented, copy-button); reading-time and tag filtering.

---

## 8. Functional Requirements

| # | Requirement |
|---|---|
| F1 | CMS-driven content for Events, Workshops, Projects, Team, Blog — non-technical organizers must be able to publish without a developer. |
| F2 | Event/workshop registration — **decision made during build: native forms**, posting to `/api/events/register` and `/api/workshops/register`. Submissions email the DAF team via Resend when `RESEND_API_KEY` is set, otherwise they are logged server-side. **Not yet built:** database-backed storage, confirmation email to the registrant, capacity/dedup. |
| F3 | Newsletter signup (email capture) integrated with an ESP (e.g., Resend/Mailchimp/Beehiiv) — **not yet implemented.** |
| F4 | Contact/registration forms: server-side validation and length guards are built. **Honeypot field + rate limiting not yet implemented** (avoid intrusive CAPTCHAs where possible). |
| F5 | GitHub API integration for live org/repo stats (stars, contributors, recent commits) on Projects and Community pages. |
| F6 | Social proof widgets: optionally pull recent posts/highlights from Instagram/X via their APIs or a manual "featured posts" CMS block if API access is restricted. |
| F7 | Search (site-wide, at least for Events/Workshops/Projects/Blog) — **not yet implemented.** |
| F8 | Admin/CMS role-based access for organizers to manage content. |
| F9 | Analytics integration (privacy-respecting: Plausible/PostHog) plus existing GTM container migration — **not yet implemented.** |
| F10 | Live chat widget retained/upgraded (Discord widget embed, Crisp/Tawk, or a lightweight custom component) — **not yet implemented.** |
| F11 | Full social directory (Facebook, LinkedIn, Instagram, X, GitHub, WhatsApp, Telegram, Discord) present in header/footer and a dedicated `/join` hub. |
| F12 | Sitemap.xml, robots.txt, structured data (JSON-LD for Organization + Event schema) for SEO. |

---

## 9. Technology Stack (modern, futuristic, current-generation)

| Layer | Recommendation | Rationale |
|---|---|---|
| **Framework** | Next.js (App Router, React Server Components) | Best-in-class DX, hybrid SSR/SSG/ISR, edge rendering, industry standard for high-craft marketing + app hybrid sites |
| **Language** | TypeScript (strict mode) | Type safety across a content-heavy, multi-collection site |
| **Styling** | Tailwind CSS v4 + CSS variables for the design-token system | Speed + consistency; pairs naturally with shadcn/ui |
| **UI primitives** | shadcn/ui (Radix-based) customized to the DAF dark theme | Accessible unstyled primitives, fully brandable |
| **Animation** | Framer Motion (Motion for React) for component/page transitions; GSAP + ScrollTrigger for complex scroll-choreographed sequences | Industry-standard for the "smooth, techy" motion language described |
| **3D / WebGL** | Three.js via React Three Fiber (+ drei) for the hero particle/gradient-mesh background and optional 3D logo interaction | Enables the futuristic hero without hand-rolled WebGL |
| **CMS** | Headless CMS — Sanity.io (preferred for real-time collaborative editing + image pipeline) or Payload CMS (if fully self-hosted/open-source is preferred) | Lets non-devs manage Events/Workshops/Projects/Blog |
| **Database** (if native registrations/auth needed) | Supabase (Postgres) or Neon + Drizzle ORM | Modern, generous free tier, integrates cleanly with Next.js |
| **Auth** (for builder profiles / admin) | Clerk or Auth.js (NextAuth) | Fast to implement, supports GitHub OAuth — thematically fitting |
| **Forms** | React Hook Form + Zod validation | Type-safe, robust validation for contact/registration |
| **Email** | Resend (+ React Email templates) | Modern transactional email with component-based templates |
| **Search** | Algolia or a self-hosted alternative (Meilisearch) | Fast, typo-tolerant search across content collections |
| **Hosting/Infra** | Vercel (Edge Network, ISR, image optimization) | Native Next.js hosting, global edge performance |
| **Analytics** | Plausible or PostHog (privacy-first) + GTM retained | Lightweight, GDPR-friendly, and current GTM container preserved |
| **Media/Images** | Next/Image + Cloudinary or Vercel Image Optimization; Lottie for lightweight vector animations where full WebGL is overkill | Performance-conscious motion for smaller devices |
| **CI/CD** | GitHub Actions → Vercel preview deployments per PR | Matches DAF's own dev-community ethos; dogfooding GitHub |
| **Testing** | Playwright (E2E), Vitest (unit) | Confidence for a production community-facing product |
| **Code quality** | ESLint, Prettier, Husky pre-commit hooks | Reflects DAF's "best practices" brand pillar |

---

## 10. Non-Functional Requirements

- **Performance:** Sub-2s LCP on 4G; code-split and lazy-load all heavy motion/3D assets; use `next/dynamic` for below-fold WebGL.
- **Accessibility:** WCAG 2.2 AA — full keyboard navigation, visible focus states (styled, not removed), sufficient contrast even within the dark gradient system, `prefers-reduced-motion` support for every animation, alt text for all imagery.
- **Responsiveness:** Mobile-first; motion complexity gracefully reduced on small/low-power devices (e.g., swap WebGL hero for a lighter CSS-gradient/Lottie version below a device-capability threshold).
- **SEO:** Server-rendered content for all public pages (no client-only rendering of critical content), Open Graph + Twitter Card metadata per page, sitemap + structured data.
- **Internationalization readiness:** Content structured to allow future Bangla-language support even if English-only at launch.
- **Security:** Standard headers (CSP, HSTS), rate-limited forms, dependency scanning (Dependabot/GitHub Advanced Security — fitting given DAF's audience).
- **Scalability:** CMS + ISR architecture should comfortably support hundreds of events/workshops and thousands of builder profiles without redesign.

---

## 11. Content & Data Migration

- Migrate existing copy (mission statement, tagline, pillars) as the seed content for `/about` and `/`.
- Recreate current nav items (Home, Events, Workshops, Community, Contact, Developer) inside the new IA — "Developer" likely maps to `/projects` or a dedicated "Build with Us" section; confirm with stakeholders.
- Preserve `devallianceforge@gmail.com` as primary contact and all 8 existing social links.
- Retain the "Developed by [credit]" footer convention, updated for the new build credit.
- Existing GTM container (`GTM-P6G7CKGB`) should be re-audited and migrated, not silently dropped.

---

## 12. Phased Roadmap

| Phase | Scope | Est. Duration | Status (Aug 2026) |
|---|---|---|---|
| **Phase 0 — Discovery & UX** | Stakeholder interviews, content audit finalization, sitemap sign-off, wireframes (low-fi), motion mood-board/animatics | 1–2 weeks | Partial — sitemap & positioning signed off in this doc; wireframes/mood-board weren&apos;t produced as separate artifacts |
| **Phase 1 — Design System** | Full dark theme design tokens, component library in Figma, hero concept prototypes (2–3 directions), motion spec doc | 2 weeks | Partial — tokens, motion spec, and hero prototype are implemented in code (`docs/DESIGN_SYSTEM.md`); no Figma library |
| **Phase 2 — Core Build** | Next.js scaffold, CMS schema, Home/Events/Workshops/Community/Contact pages, design-system implementation in code | 3–4 weeks | Done for code (all content hubs + `/about`, `/projects`, `/blog` built); CMS schema deferred to post-launch |
| **Phase 3 — Motion & Polish** | Hero WebGL/particle system, scroll choreography, micro-interactions, page transitions, performance tuning | 2 weeks | Done — Canvas particle hero (WebGL intentionally swapped), scroll reveals, custom SVG cursors, magnetic buttons, boot-sequence typewriter |
| **Phase 4 — Integrations** | GitHub API stats, newsletter/ESP, forms + email, analytics, live chat | 1–2 weeks | Partial — GitHub org stats + contact/registration email via Resend done; newsletter (F3), analytics (F9), live chat (F10) pending |
| **Phase 5 — QA & Launch** | Cross-browser/device QA, accessibility audit, performance audit, SEO checklist, staged rollout | 1 week | Not started |
| **Phase 6 — Post-launch** | Blog/MDX system, Bangla localization, builder-profile gamification, advanced search | Ongoing | Blog/MDX shipped early with sample content; CMS, localization, gamification, search pending |

---

## 13. Risks & Open Questions

- **Content ownership:** Who on the DAF team will own ongoing CMS content updates (events/workshops) post-launch? Needs a named content owner to avoid the "stale events page" problem common to community sites.
- **Registration flow:** Native RSVP/registration system vs. continuing to rely on external forms — affects Phase 2/4 scope and whether a database + auth layer is required at all for v1.
- **API access:** Instagram/X embedding of live posts is subject to each platform's API policy/rate limits — may require a manual "featured posts" fallback in the CMS.
- **3D/WebGL performance risk:** Must be validated early on mid/low-tier Android devices common in the target region (Bangladesh) to avoid the hero becoming a performance liability — budget real device testing, not just simulators.
- **Brand asset gaps:** Only a horizontal logo lockup was provided; a square/icon-only mark (favicon, social avatar, app icon) and a light-background-safe variant should be requested from the design source of the current logo.
- **Bangla localization:** Not required for launch per current scope assumption — confirm with stakeholders whether v1 needs bilingual support given the primary Bangladesh audience.

---

## 14. Appendix — Reference Brand Copy (as found)

> "Dev Alliance Forge is a volunteer-driven community where passionate students, developers, and IT professionals and beyond come together to learn, build, and elevate. Forge new skills by sharing tutorials, build projects, and real-world best practices. Mentor each other through peer-to-peer sessions and open-source sprints. Bridge global standards and local needs, turning ideas into working solutions. Whether you're just starting out or looking to level up, Dev Alliance Forge is your alliance for innovation and your forge for turning ambition into impact. Join us and let's craft the future of tech."

**Meta description (current SEO copy):** "Join Dev Alliance Forge – the leading tech community. Attend workshops, networking events, and connect with developers. Free registration."
