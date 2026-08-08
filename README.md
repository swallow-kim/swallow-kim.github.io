# Min-Gi Kim — Engineering Notes

Custom Jekyll personal engineering portfolio and technical notes site for **Min-Gi Kim**, an RF Systems Engineer working across antennas, RF systems, modem receiver algorithms, and wireless device integration.

## Structure

- `_notes/` - series notes managed via Jekyll collection (`layout: note`, `output: true`)
- `_layouts/` - custom layouts (`default`, `home`, `page`, `note`)
- `_includes/` - reusable components (`header`, `footer`, `engineer-masthead`, `note-row`, `toc`, `callout`, `contact-block`)
- `_sass/rf/` - SCSS design system (`_tokens.scss`, `_base.scss`, `_layout.scss`, `_primitives.scss`, `_fonts.scss`)
- `_data/` - metadata sources (`series.yml`, `profile.yml`)
- `assets/` - compiled CSS and self-hosted WOFF2 font binaries
- `figures/` - post figures and WebP responsive variants
- `index.md` - personal engineering homepage, engineering focus, and featured series
- `about.md` - engineering background and focus areas
- `notes.md` - Engineering Notes series listing (`/notes/`)
- `404.html` - custom 404 page (`noindex`, `sitemap: false`)
- `_config.yml` - production Jekyll configuration
- `_config.qa.yml` - QA build configuration (merged for QA showcase)

## How to add a new note

1. Create a new Markdown file in `_notes/` following the naming convention (e.g. `_notes/10-my-new-topic.md`).
2. Add the required front matter:

```yaml
---
layout: note
title: "Mobile Antenna Design Notes #10: Your Title Here"
permalink: /posts/10-your-post-slug/
series: mobile-antenna-design
chapter: 10
summary: "A concise 1-2 sentence summary for discovery and cards."
topics:
  - topic one
  - topic two
published: false
---
```

3. By default, new notes are drafted with `published: false` (omitting the `date` field) and will be excluded from production builds, feed, and sitemap.
4. Write content in Markdown. Body text must not contain an H1 heading (the title is rendered by the layout).

## Local Validation & Preview Commands

- Verify environment: `npm run doctor`
- Site contract tests: `npm run test:contract`
- Design system tests: `npm run test:design`
- Full validation (CI pipeline): `bundle exec rake validate`
- Local preview server: `bundle exec jekyll serve`

## Publishing & Review Workflow

Before promoting a note to `published: true`:
1. Ensure technical accuracy and completeness of prose.
2. Add the `date` timestamp to front matter (e.g. `date: 2026-08-08 12:00:00 +0900`).
3. Update `published_chapters` in `_data/series.yml`.
4. Run `bundle exec rake validate` to confirm production build, HTMLProofer, site contract, and design system tests pass cleanly.
