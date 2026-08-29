# Upgrade Notes

The first draft of this project pinned **Next.js 14.2.15** and **ESLint 8**. Both are now fully
end-of-life:

- **Next.js 14** stopped receiving security patches on Oct 26, 2025. `next@14.2.15` specifically
  has a disclosed vulnerability (see the `npm install` warning that pointed this out).
- **ESLint 8** is unsupported. It pulls in an old dependency chain — `glob@7`/`glob@10`,
  `rimraf@3`, `inflight`, `@humanwhocodes/config-array`, `@humanwhocodes/object-schema` — which is
  the actual source of most of the `npm warn deprecated` noise on install. These aren't this
  project's direct dependencies; they're transitive dependencies of an EOL ESLint 8, which is why
  upgrading ESLint (not just ignoring the warnings) is the real fix.

## What changed

| Package | Before | Now |
|---|---|---|
| `next` | 14.2.15 | ^16.3.0 (current stable line) |
| `react` / `react-dom` | 18.3.1 | ^19.2.0 (required by Next 16) |
| `eslint` | 8.57.1 | ^9.20.0 (flat config) |
| `eslint-config-next` | 14.2.15 | ^16.3.0 |
| `tailwindcss` | 3.4.x | ^4.3.0 (CSS-first config, no more `autoprefixer` needed separately) |
| `typescript` | 5.6.x | ^5.7.3 |
| `@types/*` | React 18 types | React 19 types |

## Structural changes that came with the upgrade

- **`tailwind.config.ts` removed.** Tailwind v4 is CSS-first — all custom tokens (colors, radius,
  easing, animations, the brand gradient) now live in an `@theme` block inside
  `src/app/globals.css`. See `docs/DESIGN_SYSTEM.md`.
- **`.eslintrc.json` replaced with `eslint.config.mjs`.** Next.js 16 removed the `next lint`
  command entirely and requires ESLint's flat config format. `npm run lint` now runs `eslint .`
  directly instead of `next lint`. The config uses the native flat presets shipped by
  `eslint-config-next` (`core-web-vitals` + `typescript`) rather than a `FlatCompat` bridge —
  the `@eslint/eslintrc` compat shim crashes with the installed ESLint 9.x, so it was dropped.
  `.agents/**` is ignored because that directory is gitignored tooling, not app code.
- **`postcss.config.mjs` updated** to use the `@tailwindcss/postcss` plugin (Tailwind v4's
  PostCSS integration) instead of `tailwindcss` + `autoprefixer` as two separate plugins —
  v4 handles vendor prefixing internally.
- **Font CSS variables renamed** (`--font-display` → `--font-display-sans`, etc.) in
  `src/app/layout.tsx` to avoid colliding with the Tailwind v4 `--font-*` theme namespace, which
  now also defines `--font-display` / `--font-body` / `--font-mono` as aliases.

No component code, page structure, or visual design changed as part of this upgrade — it's a
dependency and config modernization only.

## A note on verification

This upgrade was originally authored in an environment without internet access, so the dependency
bump could not be compiled in that first pass. `npm install`, `npm run typecheck`, and
`npm run build` have since been run and pass cleanly on the current dev branch — but if you ever
hit a resolution or build error after touching `package.json`, report the exact command output;
that's the fastest way to get it fixed.
