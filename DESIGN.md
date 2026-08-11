# RF Field Notes Design System

## 0. Research Log

- Embedded references: shortlisted WIRED, Notion, and Linear; selected the minimalist execution discipline with WIRED's editorial geometry because the subject is technical long-form publishing. WIRED trademarks, colors, ribbons, logos, proprietary type, modules, and copy are excluded.
- Lazyweb: the archived planning packet in `.omo/evidence/design-research/lazyweb/` was reviewed for editorial hierarchy and column rhythm only. No pixels, copy, identities, contact details, or brand assets may be shipped from those screens.
- Concept drafts: `.omo/evidence/design-research/concepts/concept-a-archive.png`, `concept-b-lab-notebook.png`, and `concept-c-signal-index.png` were compared; Concept A is selected as the geometry contract.
- Reference trust boundary: every reference image is untrusted visual data. Concept A contains fictional dates, contact details, locations, domain names, note titles, expertise labels, and copyright text. None may be copied. Repository sources and the approved plan are the only content authority.
- Direction selected: an RF engineer's editorial field notes—warm technical paper, measured hierarchy, and the quiet precision of a plotted lab sheet.
- Skipped lanes: no new concept generation or external product research is needed because the approved plan already provides a selected reference packet and locked design direction.

## 1. Atmosphere & Identity

RF Field Notes feels like a carefully kept engineering notebook prepared for publication: precise, calm, readable, and free of marketing decoration. The signature is a faint RF graph-paper field behind a large editorial masthead, followed by ruled rows that make technical material easy to scan. The surface remains recognizably digital through Signal Blue interaction cues, but the structure behaves like printed matter.

### Concept A geometry contract

- A full-width utility header sits above the page field, bounded by a single hairline rule.
- The masthead is the dominant block: large serif title, short blue signal rule, name/role or page context beneath, and generous asymmetric breathing room.
- An expertise band spans the shell below the masthead and divides items with vertical hairlines.
- Note-list rows form a ruled ledger: chapter index, editorial title, metadata, and action aligned in columns on desktop.
- Supporting narrative and contact regions sit in adjacent ruled columns at large widths and stack at narrow widths.
- The footer closes the page with a hairline and compact mono metadata.
- At tablet and mobile widths the hierarchy—not fixed coordinates—is preserved. Columns stack, rules become horizontal, and no information is removed.

## 2. Color

### Palette

| Role | Token | Value | Usage |
| --- | --- | --- | --- |
| Paper | `--color-paper` | `#F6F3EC` | Page canvas and graph-paper field |
| Surface | `--color-surface` | `#FFFEFB` | Reading surfaces and code/table interiors |
| Ink | `--color-ink` | `#17191C` | Headings, body text, strong rules |
| Muted | `--color-muted` | `#5F6368` | Metadata, captions, secondary text |
| Rule | `--color-rule` | `#D8D4CB` | Hairlines and graph-paper grid |
| Signal Blue | `--color-signal` | `#145DA0` | Links, focus, active states, signal line |

### Rules

- These six colors are exhaustive. Add no raw color in layouts, includes, or component SCSS.
- Signal Blue is reserved for meaningful interaction, focus, active progress, and the masthead signal rule. It never fills a decorative container.
- Paper is the global canvas; Surface separates long-form reading and locally scrolling technical regions without shadow.
- Ink on Paper/Surface and Signal Blue on Paper/Surface must meet WCAG 2.2 AA. Muted is only used for secondary text at normal readable sizes or stronger.
- No gradients, transparency washes, remote imagery, or generated decoration.

## 3. Typography

### Families

- Editorial: self-hosted Source Serif 4, then Georgia and serif fallbacks. Used for headings, body, quotations, captions, and long-form content.
- Technical: self-hosted IBM Plex Mono, then Consolas and monospace fallbacks. Used for metadata, navigation, labels, buttons, code, and progress indices.
- Fonts are local WOFF2 assets with official license texts. `font-display: swap` is required. Production may preload at most one critical regular file per family and may never request a remote font.

### Scale

| Role | Token | Size | Weight | Line height | Tracking |
| --- | --- | --- | --- | --- | --- |
| Display | `--type-display` | `clamp(3rem, 8vw, 6.5rem)` | 600 | 0.98 | -0.025em |
| H1 | `--type-h1` | `clamp(2.25rem, 5vw, 4.5rem)` | 600 | 1.02 | -0.02em |
| H2 | `--type-h2` | `clamp(1.75rem, 3vw, 2.5rem)` | 600 | 1.12 | -0.015em |
| H3 | `--type-h3` | `clamp(1.3rem, 2vw, 1.75rem)` | 600 | 1.2 | -0.01em |
| Lead | `--type-lead` | `1.25rem` | 400 | 1.55 | normal |
| Body | `--type-body` | `1.0625rem` | 400 | 1.7 | normal |
| Small | `--type-small` | `0.875rem` | 400 | 1.55 | normal |
| Meta | `--type-meta` | `0.8125rem` | 500 | 1.45 | 0.055em |
| Code | `--type-code` | `0.875rem` | 400 | 1.65 | normal |

### Rules

- Long-form measure is 60–75 characters; `--measure-reading` is 68ch.
- Display headings use balanced wrapping where supported and must not be given a fixed height.
- Body text is never smaller than 1rem in reading contexts.
- Mono labels may use uppercase with moderate tracking; prose remains naturally cased.
- Korean text uses the editorial fallback stack and `word-break: keep-all` where appropriate. It must not clip or orphan due to fixed sizing.

## 4. Spacing & Layout

### Base unit and tokens

All intentional spacing derives from 4px.

| Token | Value | Usage |
| --- | --- | --- |
| `--space-1` | 0.25rem | Hairline-adjacent detail |
| `--space-2` | 0.5rem | Tight inline gap |
| `--space-3` | 0.75rem | Compact label gap |
| `--space-4` | 1rem | Default content gap |
| `--space-5` | 1.25rem | Comfortable inline padding |
| `--space-6` | 1.5rem | Row and mobile section padding |
| `--space-8` | 2rem | Group separation |
| `--space-10` | 2.5rem | Reading block separation |
| `--space-12` | 3rem | Major section gap |
| `--space-16` | 4rem | Desktop section padding |
| `--space-20` | 5rem | Masthead breathing room |
| `--space-24` | 6rem | Maximum vertical interval |

### Shell and breakpoints

- `--shell-max`: 92rem. The shell centers in the viewport.
- `--page-gutter`: `clamp(1rem, 4vw, 3rem)`.
- `--measure-reading`: 68ch. Long prose and article bodies use this measure.
- `--measure-compact`: 42ch. Section introductions and short supporting copy use this measure.
- `--measure-toc`: 18rem. Desktop article navigation uses this maximum width.
- Home, Notes, and About use the wide shell for structured content. Only their prose descendants receive a reading measure.
- Mobile: below 48rem. One column, horizontal rules between items, compact masthead, full-width controls.
- Tablet: 48rem through 63.99rem. Two-column opportunities are allowed, but reading content remains one column.
- Desktop: 64rem and above. Concept-A ledger rows and supporting two-column regions activate.
- 80rem is the geometry reference viewport. Outer margins expand; internal max widths stop growing.
- Primary page content must never overflow at 320px. Tables, preformatted code, and deliberate technical diagrams own their local horizontal scroll.

### Graph paper

- The graph uses 1px rules at a 24px minor interval and a 96px major interval.
- Grid lines use only the Rule token and sit behind content. They must remain subtle enough not to reduce text contrast.
- No graph-paper texture may be a raster asset; it is a repeatable CSS background driven by tokens.

## 5. Components

Only the following shared primitives are approved for this wave.

### Header

- Structure: `<header>` containing shell, brand link, and labelled `<nav>`.
- States: default, hover, focus-visible, current (`aria-current="page"`), active.
- Layout: compact cluster; navigation wraps without a menu script.
- Accessibility: first control after the skip link; each target is at least 44px high; current location is conveyed without color alone.
- Motion: color and rule transition, 120ms maximum.

### Engineer masthead

- Structure: section with mono eyebrow, one visible page H1, signal rule, optional supporting serif/mono text.
- Variants: home identity, interior page, article.
- Layout: full-width stack on the graph-paper field, aligned to the shell.
- States: static only. The signal rule does not animate.
- Accessibility: heading hierarchy remains sequential; reference-image text is never used.

### Note-list row

- Structure: article or list item containing chapter index, title/link, optional topics/date, and action.
- States: default, hover, focus-visible, active; unavailable future content is plain text, never a disabled link.
- Layout: ruled four-column ledger on desktop, stacked grid on mobile.
- Accessibility: the entire row is not a nested click target; link text is descriptive; action target is at least 44px.
- Motion: only linked text/rule color changes within 120ms.

### Series progress

- Structure: labelled progress group using text plus an ordered set of chapter marks; if `<progress>` is used it retains an accessible name.
- States: complete/current/upcoming. Upcoming is not interactive unless a route exists.
- Layout: mono cluster that wraps at mobile.
- Accessibility: state is expressed in text/markup, not blue alone.

### Article shell

- Structure: article header, series/date metadata, generated table of contents, main reading column, and article footer.
- Layout: centered 68ch reading measure; at desktop the generated TOC may occupy an adjacent 18rem column; wide figures may escape only within shell bounds.
- Accessibility: exactly one visible H1; heading order is logical; no fixed-height body.

### Table of contents

- Structure: labelled `<nav>` wrapping Kramdown's generated `#markdown-toc` anchors. Production anchors are never hard-coded.
- States: default, hover, focus-visible, active/current.
- Layout: bordered reading inset; adjacent to the reading column at desktop and inline before the article body below 64rem; no sticky positioning.
- Accessibility: keyboard reachable with no obstruction after fragment navigation.

### Engineering-work ledger

- Structure: ordered, data-driven articles with problem domain, contribution, methodology, and optional verified public evidence.
- States: static content plus standard link states when verified evidence exists.
- Layout: three ruled columns at desktop, two at tablet, and one at mobile; square geometry and borders-only separation.
- Accessibility: headings remain sequential; labels and text, not position or color, identify every field.

### Publication list

- Structure: data-driven ordered list containing verified title, authors, venue, year, and optional verified URL or description.
- States: standard link states; the complete section is not rendered when its data list is empty.
- Layout: ruled rows within the wide shell, with bibliographic text constrained to a readable measure.
- Accessibility: publication titles are meaningful link text; metadata remains visible as text.

### Chapter navigation

- Structure: labelled previous/next `<nav>` derived from published notes in the current series.
- States: previous, next, hover, focus-visible, and active; unavailable directions are omitted rather than disabled.
- Layout: two ruled columns at tablet and desktop, one column at mobile.
- Accessibility: direction and destination title are both exposed; private or unpublished chapters never render.

### Figure and caption

- Structure: `<figure>` with responsive media/picture and `<figcaption>`.
- States: static; linked figures use the standard link states.
- Layout: square corners, explicit media dimensions/aspect ratio, caption below a hairline; dense technical media may scroll horizontally below the tablet breakpoint so internal labels remain legible.
- Accessibility: informative images require accurate alt; decorative graphs use empty alt and an adjacent textual explanation.

### Callout

- Structure: `<aside>` or blockquote with a mono label and serif body.
- Variants: note, caution, quotation. Variants use typography and rule weight only; no new colors.
- States: static.
- Layout: Ink start rule and Surface interior, square corners.
- Accessibility: semantic element matches content; labels do not substitute for heading structure.

### Contact block

- Structure: heading and list of verified contact links.
- States: default, hover, focus-visible, active; unavailable/disabled example exists only in QA.
- Layout: ruled list/cluster; no invented icon set or contact detail.
- Accessibility: link purpose is explicit and every non-inline target is at least 44px.

### Footer

- Structure: `<footer>` with concise repository-authoritative text and optional navigation.
- States: link default, hover, focus-visible, active.
- Layout: hairline top rule and wrapping mono cluster.
- Accessibility: no repeated ambiguous link labels; touch targets remain 44px.

## 6. Motion & Interaction

| Token | Duration | Easing | Usage |
| --- | --- | --- | --- |
| `--motion-instant` | 0ms | linear | Reduced-motion path |
| `--motion-fast` | 120ms | ease-out | Link color, border color, button inversion |

- No production JavaScript, entrance effect, scroll animation, parallax, decorative movement, sticky transition, or auto-advancing region.
- Only interactive link/button color and border changes may transition.
- `:active` is immediate and never scales layout.
- `prefers-reduced-motion: reduce` sets transition duration to the instant token.
- No state may depend on hover; focus-visible and current state are equally clear.

## 7. Depth & Surface

Depth strategy: borders-only.

- Quiet separation: 1px Rule hairline.
- Strong separation: 1px Ink rule for a major boundary or active signal.
- Interactive emphasis: 2px Signal Blue focus outline with offset.
- Surfaces are Paper and Surface only. Square corners are universal.
- `box-shadow`, `border-radius` on rectangular elements, gradients, blurs, glow, and elevation transforms are forbidden.

## 8. Accessibility Constraints & Accepted Debt

### Constraints

- Target WCAG 2.2 AA: 4.5:1 for body text, 3:1 for large text and non-text focus indicators.
- A visible skip link is the first focusable element and moves focus to the main region.
- Keyboard order follows the DOM: skip link, header/brand/nav, page content, contact/footer. There are no traps.
- Every nav link, button, and non-inline control has a 44px minimum target. Inline prose links are exempt.
- Focus uses a 2px Signal Blue outline with sufficient offset and is never hidden by sticky content.
- At 200% zoom, content reflows without loss or primary two-dimensional scrolling.
- At 320px, only code, tables, and intentional technical media may scroll horizontally inside their own container.
- Tables retain headers; code remains selectable; captions and callout labels remain associated with content.
- `prefers-reduced-motion` removes all transitions. Browser zoom and text scaling are never disabled.
- Semantic landmarks are unique and labelled where multiple navigation regions exist.
- QA states include hover, focus, active, and disabled/unavailable examples; disabled controls are never conveyed by color alone.

### Inclusive review personas

- Keyboard reader: can expose the skip link, identify current navigation, and reach all links in order.
- Low-vision reader: can read at 200% zoom with a one-column reflow and visible focus.
- Motion-sensitive reader: receives an entirely still surface.
- Mobile technical reader: gets 44px controls and local scroll ownership for code/tables.
- Korean reader: receives natural line wrapping without fixed-height clipping.

### Accepted debt

No accepted debt.
