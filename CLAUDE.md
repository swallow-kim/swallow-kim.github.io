@AGENTS.md

The above is the shared instruction file for all coding agents in this repository (Codex and Claude Code). The rest of this file is Claude Code-specific operating guidance.

## Working in this repository

- Before non-trivial changes, read the relevant post/layout/include/SCSS file and, if the change touches design or structure, the matching section(s) of `DESIGN.md` and the assertions in `scripts/qa/design-system-contract.mjs` / `scripts/qa/site-contract.mjs` — these are enforced contracts, not advisory docs.
- Use plan mode for changes that cross multiple modules or carry real risk here: touching `_config.yml`/`_config.qa.yml`, editing shared `_includes/`/`_layouts/`/`_sass/rf/_tokens.scss`, or changing which posts are routed/linked (`CURRENT_ROUTES`/`FINAL_ROUTES`/`PRIVATE_MARKERS` in `site-contract.mjs`). A single new post or a wording edit doesn't need it.
- Prefer the narrowest relevant check first: `node --test scripts/qa/design-system-contract.test.mjs` or `npm run test:contract` for contract-script/logic changes; only run the full `bundle exec rake validate` (build + htmlproofer + both contract suites) when the change plausibly affects the built site — layouts, includes, SCSS, front matter, or routing.
- Never hand-edit `_site/`, `_site_qa/`, `.jekyll-cache/`, `.sass-cache/`, `vendor/bundle/`, or `node_modules/` — they're rebuilt from source and gitignored.
- Preserve existing permalinks, front matter shape, and the six-token/borders-only design system unless the task explicitly asks to change them — `check:design`/`check:site` will fail the build otherwise.
- State clearly which facts come from reading repository files versus what you're inferring or assuming; don't present a guess as a verified constraint.
- Don't touch files outside the task's scope (e.g. don't reformat unrelated posts or reflow `.omo/` evidence while fixing one page).
- At the end of a task, report: files modified, commands actually executed (with pass/fail), and any residual risk (e.g. "didn't run the full Jekyll build to verify").
- This is a small, mostly-solo-content repo — reach for subagents only when a task genuinely needs independent parallel investigation (e.g. auditing many post files at once), not by default. If you do parallelize edits, don't let two agents write to the same file concurrently.
- If a decision can't be resolved from repository evidence (e.g. ambiguous intent for private/unlinked posts 5–9), ask rather than guessing.
