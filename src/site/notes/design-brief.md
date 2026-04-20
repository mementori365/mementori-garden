# Mementori Garden — Design Brief for Claude Design

*Copy this entire document and paste it to Claude Design.*

---

## Who this is for

**Nhan** — builder, thinker, living in Da Nang, Vietnam. He is building Mementori: a personal thinking system where AI and human memory work together. He reads long-form essays. He navigates by feel and spatial memory. He notices typography before he reads a word.

The garden is his public-facing window: a selection of conversations, philosophical roundtables, and reflections — published when he chooses.

---

## What the garden publishes

**1. Conversations** — real voice recordings between Nhan and people he loves. Transcribed, composed into essay form. 48 minutes becomes 2000 words. Has a hero image, bullet key moments, a narrative transcript, and three action callouts (Listen · Read transcript · Delete).

**2. Consilium reports** — multi-voice philosophical roundtables. Characters: Gessner, Luhmann, DaVinci, Hemingway, Eco, Einstein, Steve Jobs, Elon Musk, Buddha. Three rounds: individual positions → cross-dialogue → golden path synthesis. Dense, layered, rich with highlighted quotes. The best content in the vault.

**3. Daily notes** — sparse, personal. Jump navigation (day/week/month), a daily quote, and Laila's entries.

**4. Garden home** — index of published content.

---

## Typography (locked in — do not change the font family choice)

- **Headlines** → IBM Plex Serif (weight 600–700). Warm, humanist, authoritative.
- **Body** → IBM Plex Sans (weight 400). Clean, readable at length.
- **Meta / dates / tags / code / locations / callout labels** → IBM Plex Mono (weight 400–500). All technical and temporal information speaks in mono.

Font source: Google Fonts. All three are in the same family — they harmonise perfectly.

---

## Style reference

**Primary:** [The Marginalian](https://www.themarginalian.org) (Maria Popova)
- Generous whitespace
- Content never wider than ~720px
- Pull quotes with left border
- Long-form essay feel — you settle in, you don't scan
- Images feel editorial, not decorative

**Secondary:** Edward Tufte — information density without clutter. Margin notes. The data speaks.

**Secondary:** Vietnamese calm — the pace of Da Nang, not Saigon. Morning light. Not urgent.

---

## Color palette

**Light mode (primary):**
- Background: `#faf9f7` — warm off-white, like old paper
- Background alt (callouts, sidebar): `#f2ede8`
- Text: `#1a1816` — near-black with warmth, not pure `#000`
- Text muted (subtitles, meta, mono): `#5a5450`
- Accent (links): `#3d5a80` — a calm deep blue, not electric
- Accent warm (blockquote borders, highlights): `#9c6b4e` — terracotta
- Border: `#ddd8d0`

**Dark mode:**
- Background: `#1c1a18`
- Background alt: `#242220`
- Text: `#e6e0d8`
- Accent: `#7da5d0`
- Accent warm: `#c49a7a`

---

## Current technical setup

- **Static site generator:** Eleventy (11ty)
- **Hosting:** Vercel → `mementori-garden.vercel.app`
- **Source repo:** `github.com/mementori365/mementori-garden`
- **Base template:** oleeskild/digitalgarden
- **Custom CSS file:** `src/site/styles/custom-style.scss`
- **Notes path:** `src/site/notes/` (pushed programmatically by `garden_push.py`)
- **Publish trigger:** `dg-publish: true` in frontmatter OR `#WBD publish` in body

---

## Current CSS problems to fix

1. ~~White text on white background~~ (just patched — base theme vars override our colors)
2. **No visual hierarchy between page types** — a conversation and a consilium look the same
3. **Callouts feel flat** — the LISTEN / READ / DELETE trio should feel like gentle buttons, not info boxes
4. **Hero images are not full-bleed** — they should break out of the content width for impact
5. **No drop cap on conversation openers** — the first paragraph of a conversation should have a large drop cap (like The Marginalian)
6. **Navigation is unstyled** — site name "Mementori" should be prominent in IBM Plex Serif, not mono
7. **Speaker names in Consilium** (bold `**Niklas Luhmann**`) should feel like bylines, not just bold text
8. **Highlighted text** (`==like this==`) should render as a warm yellow mark, not be invisible
9. **Tags** look like plain text — they should be small pill-shaped mono labels

---

## Vault principles that inform the design

> *"The cut precedes the connection."* — Gessner/Luhmann
> Good design creates surfaces where content can surprise itself.

> *"Order must remain at the scale of the person."* — Locke
> The garden is not a library. It is a rehearsal of one mind.

> *"The margin is where thought is born."* — DaVinci
> Leave room. Don't fill every pixel.

> *"The iceberg moves because seven-eighths of it is below the surface."* — Hemingway
> Show less. Mean more.

> *"What destroys the labyrinth is the map."* — Eco
> Some structure should be felt, not seen.

---

## What Claude Design should produce

A revised `custom-style.scss` for the Digital Garden template that:

1. Loads IBM Plex fonts from Google Fonts
2. Overrides ALL Digital Garden base theme variables (use `!important` freely — the base theme is aggressive)
3. Implements the full color palette above for light + dark modes
4. Adds **page-type-aware styling** via frontmatter `cssclasses` if possible, or via CSS classes already in the template
5. Makes callouts feel like soft interactive buttons (LISTEN = green tint, READ = blue tint, DELETE = red tint)
6. Full-bleed hero images (negative margin to break the content container)
7. Drop cap on `.e-content > p:first-of-type::first-letter` (conversation pages)
8. Speaker names (`strong` at the start of a section) styled as bylines
9. `==highlighted text==` → warm yellow background mark
10. Tag pills in IBM Plex Mono, small, rounded

The file should be self-contained, well-commented, and ready to be pushed directly to `src/site/styles/custom-style.scss`.

---

## Sample content to test against

**Conversation page:** `mementori-garden.vercel.app/notes/2026-04-19 -- a call between friends`
**Consilium page:** `mementori-garden.vercel.app/notes/2026-04-19_gessner-order-chaos`
**Home:** `mementori-garden.vercel.app`

---

## One sentence

*A garden that reads like a long Sunday morning — warm paper, good light, no hurry.*

---

*Brief written by Claude · Mementori · Da Nang · April 2026*
