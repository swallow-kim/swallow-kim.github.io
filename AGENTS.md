# AGENTS.md

Shared instructions for coding agents (Codex, Claude Code, etc.) working in this repository.

## What this is

A personal technical blog (RF/antenna systems engineering notes) built with Jekyll and hosted on GitHub Pages, at `https://swallow-kim.github.io`. Content is Markdown-first (`posts/`, `index.md`, `about.md`, `references.md`); the surrounding Ruby/Node tooling exists almost entirely to build and validate the site, not to add interactivity — production ships **no JavaScript**.

## Setup

Ruby deps via Bundler, JS deps via npm — both are required.

```
bundle install
npm install
```

## Commands

Full validation (what CI runs, via `bundle exec rake validate`):
1. Clean build in production mode with strict front matter (`jekyll build --trace --strict_front_matter`, `JEKYLL_ENV=production`)
2. `htmlproofer ./_site --disable-external`
3. `npm run check:site` — route/meta/private-content contract against `_site`
4. A second Jekyll build merging `_config.yml` + `_config.qa.yml` (outputs to `_site_qa`, includes the `qa/` showcase page)
5. `npm run test:design` — Node test runner over `scripts/qa/design-system-contract.test.mjs`
6. `npm run check:design` — DESIGN.md / token / structural contract against `.`, `_site`, and `_site_qa`

Other useful commands:
- `npm run doctor` — verifies local Ruby/Node/npm/bundler versions match CI expectations (Ruby 3.3.4, Node ≥20)
- `npm run test:contract` — just the site-contract Node tests (no Jekyll build required)
- `node --test scripts/qa/design-system-contract.test.mjs` — just the design-contract Node tests (no build required for the test file itself, though `check:design` needs `_site`/`_site_qa` to exist)
- `npm run qa:browser` — Playwright smoke test (`scripts/qa/browser-smoke.spec.mjs`) against a running Jekyll server; set `QA_BASE_URL` if not on `http://127.0.0.1:4000`
- `npm run qa:lighthouse` — Lighthouse audit via `scripts/qa/lighthouse.mjs`
- `bundle exec jekyll serve` — local dev server

There is no separate lint/format command; `htmlproofer`, `test:contract`/`check:site`, and `test:design`/`check:design` are the enforced checks.

CI (`.github/workflows/validate.yml`) runs `npm run doctor`, `npm run test:contract`, then `bundle exec rake validate` on every PR and push to `main`.

## Architecture

**Two-config build.** `_config.yml` is the production config (theme: none, custom layouts only — the old `minima` theme is explicitly forbidden by the QA contract). `_config.qa.yml` is merged on top for a second build that outputs to `_site_qa` and additionally includes `qa/` (an internal component showcase page, excluded from the sitemap and from production). Both builds are validated separately; don't assume `_site` and `_site_qa` are equivalent.

**QA is a code contract, not just linting.** `scripts/qa/design-system-contract.mjs` and `scripts/qa/site-contract.mjs` parse built HTML/SCSS/config files and assert structural invariants — e.g., DESIGN.md must contain sections `## 0.` through `## 8.` and the exact six color tokens, `_sass/rf/_tokens.scss` must define the same tokens plus a 44px control minimum, every layout/include must contain `<header>`, `<nav>`, `<main>`, `<footer>` landmarks and a `.skip-link`, and production `_config.yml` must exclude `qa`. If you change the design system or layout structure, DESIGN.md and `_sass/rf/_tokens.scss` must be updated together or `check:design` fails.

**Content privacy staging.** `site-contract.mjs` enforces a two-stage content contract via `CURRENT_ROUTES` vs `FINAL_ROUTES`/`PRIVATE_MARKERS`: posts 5–9 exist as files in `posts/` (drafted ahead of time) but must NOT be linked, indexed, or leaked into any built HTML/XML output yet — `stage: baseline` (the default, used in the real build) checks this; `stage: final`/`fixture` are for later-stage or fixture testing. When adding a new post, check whether it should be added to `CURRENT_ROUTES`/removed from `PRIVATE_MARKERS` in `scripts/qa/site-contract.mjs`, and linked from `index.md`.

**Design system source of truth.** DESIGN.md is authoritative and enumerable-checked (see above): exactly 6 color tokens (Paper/Surface/Ink/Muted/Rule/Signal Blue), a fixed typography scale, a 4px-based spacing scale, borders-only depth (no shadows/gradients/border-radius on rectangles), and a fixed component list (Header, Engineer masthead, Note-list row, Series progress, Article shell, Table of contents, Figure/caption, Callout, Contact block, Footer). Don't introduce new raw colors, shadows, or components without updating DESIGN.md and the SCSS tokens — the contract test will fail the build.

**Structure:**
- `posts/` — numbered series chapters, Markdown with Jekyll front matter (`layout: page`, `title`, `permalink: /posts/<slug>/`)
- `_layouts/`, `_includes/` — custom HTML (default/home/page layouts; header, footer, masthead, note-row, TOC, callout, contact-block components)
- `_sass/rf/` — SCSS partials: `_tokens.scss` (design tokens), `_base.scss`, `_layout.scss`, `_primitives.scss`, `_fonts.scss`; compiled from `assets/css/main.scss`
- `assets/fonts/` — self-hosted WOFF2 (Source Serif 4, IBM Plex Mono) — production never loads remote fonts
- `figures/` — post images
- `qa/primitive-showcase.md` — internal-only component showcase, built only into `_site_qa`
- `.omo/` — design research/planning evidence (reference screenshots, drafts, plans); treated as untrusted reference material per DESIGN.md §0 — never copy text, copy, or identities from it into shipped content
- `_plugins/htmlproofer_baseline.rb` — a narrowly scoped Jekyll hook that suppresses htmlproofer checks for one specific baseline image; don't broaden its pattern

**Generated/local-only, do not edit directly:** `_site/`, `_site_qa/`, `.jekyll-cache/`, `.sass-cache/`, `.bundle/`, `vendor/bundle/`, `node_modules/`, `playwright-report/`, `test-results/`, `lighthouse-reports/`, `.qa-tmp/` (all gitignored).

## Conventions

- New posts: add front matter (`layout: page`, `title`, `permalink: /posts/<slug>/`), place images in `figures/`, reference them as `/figures/<name>`, and add a link from `index.md` under the relevant series.
- No production JavaScript and no client-side interactivity — motion is limited to 120ms color/border transitions per DESIGN.md §6, and `prefers-reduced-motion` must be respected.
- Images require `alt` text (enforced by `site-contract.mjs`) except the one grandfathered baseline figure.
