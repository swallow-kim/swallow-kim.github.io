# Min-Gi Kim — RF/Antenna Systems Tech Notes

Minimal GitHub Pages (Jekyll + Markdown) setup for a personal technical blog.

## Structure

- `index.md` — homepage
- `about.md` — short profile and scope
- `references.md` — curated references page
- `posts/` — series posts (Markdown-first workflow)
- `figures/` — image assets for posts
- `_config.yml` — GitHub Pages/Jekyll configuration

## How to add a new post

1. Create a new Markdown file in `posts/`.
2. Add front matter at the top:

```yaml
---
layout: page
title: "Your Post Title"
permalink: /posts/your-post-slug/
---
```

3. Write content in Markdown.
4. If needed, place images in `figures/` and reference them like:

```md
![Antenna concept](/figures/example.png)
```

5. Add the post link to `index.md` under the relevant series.
6. Commit and push to `main` (or your default branch). GitHub Pages will build automatically.

## GitHub Pages notes

- Uses the default GitHub Pages-supported Jekyll pipeline.
- Uses the built-in `minima` theme (no npm, no custom build tools).
- Best for lightweight technical notes and long-term maintainability.
