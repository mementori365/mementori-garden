# Mementori Garden — Design Log

> **This file is for AI agents and Nhan.** It records every settled decision, every milestone, every mistake. Read it before touching any CSS, template, or layout. Don't re-litigate the bullets below without Nhan's explicit say-so.

---

## Next-AI Preface

Five things you must not re-decide:

1. **Palette** — Light: `#f5ecd7` (parchment base) → `#d8cbb0` (border/surface). Dark: `#1c1a18` → `#383028`. Source of truth: `themarginalian.org` hex values, not eyeballed "cream". Read the hex. Do not drift.
2. **Fonts** — Body: IBM Plex Serif 17px, line-height 1.84. Headings: IBM Plex Sans weight 300. Meta/code/labels: IBM Plex Mono. All loaded from Google Fonts in `custom-style.scss` line 1.
3. **Accent** — Hermès orange `#C85A18` (light mode), `#E07030` (dark mode). Used for links, tag pills, hover states, blockquote left border. One accent, used consistently.
4. **Layout** — Golden ratio: sidebar 370px + gap 30px + content 600px + gap 30px + right sidebar 240px = 1270px. Vars live in `custom-style.scss` section 20. Do not touch without redesigning the whole grid.
5. **Meta-bridge rule** — YAML frontmatter is machine food. The Nunjucks template (`note.njk`) renders human-readable sentences from it. Every meta field that matters to a reader (`day`, `location`, `duration`, `languages`, `published_by`) must appear **both** in YAML (for the plugin/AI) and as a visible `.header-details` line (for the reader). Do not put machine-only fields in the visible header.

---

## Milestones

### M1 · Marginalian Parchment · 2026-04-20 (v1.7)

**Status:** in-progress (executing 2026-04-21)
**Branch:** `claude/rollback-background-color-QmEVI`
**Plan vault copy:** `src/site/notes/0M/_system/plans/2026-04-21-m1-marginalian-polish.md`

**What was locked in:**
- Palette: parchment `#f5ecd7` base, `#ede0c8` alt surface, `#d8cbb0` borders; dark base `#1c1a18`, dark surface `#252220`, dark borders `#383028`
- Typography: IBM Plex Serif 17px body, Sans weight 300 for heads, Mono for meta/labels
- Accent: Hermès orange `#C85A18` (light) / `#E07030` (dark)
- Layout: golden-ratio columns 370 + 30 + 600 + 30 + 240 (vars in section 20)
- Header meta: `day`, `location`, `duration`, `languages`, `published_by` from frontmatter → rendered as `.header-details` mono pill below tags
- Properties panel: hidden in Obsidian via CSS snippet (`docs/obsidian-setup.md`)
- Footer: aligned to content column via CSS section 21

**Steps in this milestone:**
1. Vault-copy plan to `0M/_system/plans/`
2. This design log
3. Footer alignment (custom-style.scss §21)
4. Header-details meta line (note.njk + custom-style.scss)
5. Tag hover → Hermès orange 80% solid
6. Unsplash hero → local image for "A call between friends"
7. Obsidian setup doc

---

## Principles

### The Bridge

> YAML is machine food. The template renders the human sentence.

Every field in the frontmatter that a reader cares about must appear as visible prose. The author writes once — in YAML — and the template builds the reading experience automatically. This prevents the "invisible metadata" failure mode where a field exists but the reader never sees it.

**Fields and their render targets:**

| YAML key | Rendered as |
|---|---|
| `day` | First element of `.header-details` pill |
| `location` | Second element |
| `duration` | Third element (+ " min") |
| `languages` | Fourth element (items joined by ` · `) |
| `published_by` | Last element ("Published by …") |
| `title` | `<h1>` (via `dgShowInlineTitle`) |
| `tags` | `.header-tags` pill row |

Hero image = mental anchor. Every published note should have a hero that grounds the reader in place, time, or mood. External Unsplash URLs are fragile — commit images to `src/site/img/` instead.

### Code-field aesthetic (no `<code>` semantic tag)

The `.header-details` line looks like a "code field" (mono font, subtle background) but does **not** use a `<code>` HTML element. Reasons:
- `<code>` implies machine-readable code to screen readers and semantic parsers.
- The visual effect (mono + tinted bg) is purely presentational — achieved via CSS.
- LLMs and search engines read YAML frontmatter directly; wrapping the visible meta in `<code>` gives no additional signal.

---

## Cost-tier Rules

Always include a **low / recommended / high** trio in every plan before execution starts, so Nhan can choose the model before cost is incurred.

| Tier | Model | Use when |
|---|---|---|
| **Low** | Haiku 4.5 | Formatting, renames, one-liner fixes, doc typos. Straightforward with clear spec. |
| **Recommended** | **Sonnet 4.6** | Default for everything else. Handles SCSS, Nunjucks, git, and multi-file edits reliably. |
| **High** | Opus 4.7 | New architecture, ambiguous spec, cross-cutting refactors, security review. Overkill for deterministic implementation. |

Rule: **default to the cheapest tier that completes without human intervention.** Upgrade only when the task is genuinely ambiguous or involves non-obvious design decisions. Prompt caching on the plan file gives 30–60% token reduction on long sessions.

---

## Mistakes & Fixes Log

*Reverse-chronological. Each entry ≤ 3 lines.*

---

**2026-04-21 · Unsplash image download blocked in CI/sandbox environment (HTTP 403 host_not_allowed)**
All outbound HTTP requests in the execution sandbox return `403 host_not_allowed`. Cannot download the Unsplash hero at automation time.
Action taken: rewrote the markdown image line to the local path `(/img/a-call-between-friends-hero.jpg)` — the note is correct but the file is missing. Nhan must download the image manually from `https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=80` and place it at `src/site/img/a-call-between-friends-hero.jpg` before the next deploy.

---

**2026-04-20 · Background colour drifted to #faf9f7 (near-white)**
Rolled back to `#f5ecd7` in commit `9e59a2c`.
Lesson: when anchoring to a reference site (themarginalian.org), read the hex — don't eyeball "cream". The eye perceives warmer as equivalent when it isn't.

---

## Open Questions & Answers

*Answered once, referenced forever. Do not open these questions again without new information.*

---

**Q1: "Publish All showed no changes — is that normal?"**

Yes. "No changes to publish" means nothing in the vault has a newer mtime than the Obsidian Digital Garden plugin's last sync timestamp. This is **expected behaviour**, not a bug. To force a re-publish: open the file in Obsidian, add a space anywhere, save, then remove the space and save again — this updates the mtime. Alternatively, delete the plugin's cached hashes: `<vault>/.obsidian/plugins/digitalgarden/data.json` (the plugin will regenerate it on next sync).

---

**Q2: "Where is the photo hosted? Will closing the laptop break the site?"**

Photos committed to `src/site/img/` are served from the git repo via the same CDN as the rest of the site (Netlify/Vercel). Closing the laptop does **not** affect the live site — the deploy is already live on the CDN. Google Drive is only needed if you want to keep large binaries out of git history (to avoid repo bloat). For now: in-repo is simpler, survives renames, and never 404s.

---

**Q3: "Wikilinks (`[[…]]`) or hardcoded paths?"**

Prefer `[[Note title]]` wikilinks in Obsidian. The Digital Garden plugin resolves these to the correct `/notes/…` URL at publish time, and they survive renames (the plugin updates them automatically). Hardcoded paths like `[text](/notes/2M/_Garden/slug/)` are fragile — they break on any rename or permalink change. For the existing home index (`index.md`) which uses hardcoded paths: use Obsidian's built-in **Find & Replace in Vault** (Cmd+Shift+H) to convert them one file at a time. No AI needed for that task.

---

**Q4: "Broken links on the two published notes — is the code wrong?"**

The code is correct. Recent commits `1c15952` and `cbb5892` explicitly fixed the slug/flat-path issues, and the `permalink:` in frontmatter matches what `.eleventy.js` emits. Almost certainly a **Netlify/Vercel deploy lag** or a failed deploy (build error after an earlier commit). Diagnostic steps: (1) Open the Netlify dashboard → Deploys tab → check the latest deploy status and build log. (2) If the deploy is stuck or shows an error: click "Clear cache and deploy site". (3) If the build log shows a template error, check `src/site/_includes/layouts/note.njk` for syntax errors introduced by recent edits.
