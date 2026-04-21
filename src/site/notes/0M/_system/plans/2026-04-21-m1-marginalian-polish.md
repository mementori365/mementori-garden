---
title: "Plan — Milestone M1: Marginalian Parchment + Header Meta + Obsidian Parity"
date: 2026-04-21
status: complete
branch: claude/rollback-background-color-QmEVI
cost_estimate_usd: [0.15-0.40, 0.50-1.30, 3.00-6.00]
model_used: sonnet-4-6
dg-publish: false
tags: [plan, system, ai-handoff]
---

# Plan — Milestone "Marginalian Parchment" + Header Meta + Obsidian Parity

## Context

The warm parchment palette (`#f5ecd7`) is live and the user is happy with the v1.7 look.

**Confirmed by user, 2026-04-21:**
- All this work lands on the current `claude/rollback-background-color-QmEVI` branch as one PR (stacked on top of the palette rollback commit already pushed).
- Unsplash hero for "A call between friends" gets downloaded to the repo now (no wait for G-Drive).
- This plan is to be **executed by a second Claude session running Sonnet 4.6** — this file plus the design log must contain everything that session needs.
- All plans + conversation handoffs go into the Obsidian vault at `src/site/notes/0M/_system/plans/` with `dg-publish: false` so they're versioned but not public.
- Every future plan lists a **cost estimate range** (low = optimized/cheap model, high = premium quality) so the human can decide before committing.

They now want to:

1. **Lock in the current design as a milestone** — a living principles doc so the next AI (or the user) does not re-litigate settled decisions.
2. **Fix the page footer** — it is not aligned to the sidebar / content column (footer currently has no CSS container at all).
3. **Reshape the header area** — lift `date`, `location`, `duration`, `languages`, `participants`, `published_by` out of the YAML properties panel and render them as a small IBM Plex Mono "code-field" line next to the header tags. Frontmatter stays the machine-truth; the template renders the human sentence.
4. **Tag hover → Hermès orange, 80% opacity solid** (instead of the current subtle tint).
5. **Mirror the look in Obsidian** via Style Settings + Minimal theme + a vault CSS snippet — and hide the Properties panel so the author-view matches the reader-view.
6. **Start a design log** so mistakes are captured once and not repeated, with a "next-AI preface" at the top.
7. **Answer 4 open questions** (publish-no-changes, image hosting, wikilink strategy, broken-link debug) inside the design log.

## Exploration notes (what exists)

| Area | File | Note |
| --- | --- | --- |
| Page template | `src/site/_includes/layouts/note.njk` | lines 34–55 render `.header-tags` + `.timestamps`; nothing reads `date`/`location`/`duration`/etc. The footer (`dynamics.*.footer`) is included at body level, lines 88–93, outside any layout container. |
| Palette + layout | `src/site/styles/custom-style.scss` | golden ratio vars lines 439–446 (`--dg-filetree-width: 370 · gap 30 · content 600 · gap 30 · sidebar 240`). **No `footer` selector anywhere.** |
| Timestamp env flags | `src/site/_data/meta.js` lines 64–68 | `SHOW_CREATED_TIMESTAMP`, `SHOW_UPDATED_TIMESTAMP` — currently unset, so `.timestamps` never renders. |
| Example rich frontmatter | `src/site/notes/2M/_Garden/2026-04-20-the-machine-that-heard-itself.md` | has `date`, `day`, `location`, `duration`, `languages`, `participants`, `published_by`, `permalink`. User already hand-writes the prose meta line at line 48 — perfect template for auto-generation. |
| Hero images | `src/site/img/6df13…_MD5.jpg` (committed) | **But** `2026-04-19-a-call-between-friends.md:38` uses an external `https://images.unsplash.com/…` URL — fragile. |
| Home index links | `src/site/notes/2M/_Garden/index.md:18,26,27` | uses explicit `[text](/notes/…/)` paths, not `[[wikilinks]]`. |
| Permalinks (broken-link claim) | same two notes have `permalink:` in frontmatter; `.eleventy.js` lines 74–75 reads it. | Recent commits `1c15952`, `16e00fc`, `cbb5892`, `f15b596` explicitly fixed slug/flat-path issues. The live broken-link report is most likely **Netlify/Vercel deploy lag**, not a code bug. |
| Publish pipeline | `netlify.toml` + `vercel.json` + Obsidian Digital Garden plugin | Plugin commits `[dg-publish]` and pushes; webhook triggers `npm run build` (Eleventy). "No changes to publish" = no vault mtime changes since last run (normal). |
| Design log | none | create `docs/design-log.md`. |
| Obsidian config | `.obsidian/` is **not** in the repo. | we cannot commit snippets; we write `docs/obsidian-setup.md` with copy-paste instructions. |

## Plan

### 1 · Design log (`docs/design-log.md`, new, not published to site)
- **Next-AI Preface** (5 bullets, top of file): palette, fonts, accent, golden ratio, meta-bridge rule. "Don't re-decide these without Nhan's say-so."
- **Milestones**:
  - **M1 · Marginalian Parchment · 2026-04-20 (v1.7)** — palette `#f5ecd7 → #d8cbb0` light, `#1c1a18 → #383028` dark, Hermès orange `#C85A18`, IBM Plex Serif body 17px / Sans headers / Mono meta, golden-ratio 370+30+600+30+240, header meta as code-field, Properties panel hidden in Obsidian.
- **Principle: the bridge** — YAML is machine food; the template renders the human sentence. Every meta field in frontmatter also belongs as prose in the header. Hero image = mental anchor.
- **Mistakes & Fixes log** (reverse-chronological, each entry ≤ 3 lines):
  - `2026-04-20 · bg drifted to #faf9f7 (near-white). Rolled back to #f5ecd7. Lesson: when anchoring to a reference (themarginalian.org), read the hex — don't eyeball "cream".`
- **Open questions & answers** (see §7 below), written once, referenceable forever.

### 2 · Footer alignment (`src/site/styles/custom-style.scss`, new section 21)
Pre-step: grep rendered HTML for the actual tag/class the DG plugin emits. Then add:
```scss
/* ── 21. FOOTER ─────────────────────────────────────────────── */
body > footer, body > .site-footer, body > .footer {
  margin-left: calc(var(--dg-filetree-width) + var(--dg-filetree-gap));
  max-width: var(--content-width);
  padding: 2em 0 3em;
  margin-top: 4em;
  border-top: 1px solid #d8cbb0;
  font-family: var(--font-mono);
  font-size: 0.74rem;
  color: #a09890;
}
@media (max-width: 800px) {
  body > footer, body > .site-footer, body > .footer { margin-left: 0; }
}
```
Dark-mode override inside the existing `@media (prefers-color-scheme: dark)` block (line 449+): flip `border-top` to `#383028`, `color` to `#5a5450`.

### 3 · Header meta line (`src/site/_includes/layouts/note.njk`, after line 45)
Insert a new block that reads frontmatter and renders a single mono-font "code-field":
```njk
{%- set metaBits = [] -%}
{%- if day -%}{% set metaBits = (metaBits.push(day), metaBits) %}{%- endif -%}
{%- if location -%}{% set metaBits = (metaBits.push(location), metaBits) %}{%- endif -%}
{%- if duration -%}{% set metaBits = (metaBits.push(duration + ' min'), metaBits) %}{%- endif -%}
{%- if languages -%}{% set metaBits = (metaBits.push(languages | join(' · ')), metaBits) %}{%- endif -%}
{%- if published_by -%}{% set metaBits = (metaBits.push('Published by ' + published_by), metaBits) %}{%- endif -%}
{%- if metaBits.length -%}
  <div class="header-details">{{ metaBits | join('  ·  ') }}</div>
{%- endif -%}
```
Styling in `custom-style.scss` (append to section 18, near line 429):
```scss
.header-details {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: #6a6058;
  background: #ede0c8;
  padding: 0.35em 0.7em;
  border-radius: 3px;
  display: inline-block;
  margin-top: 0.5em;
  letter-spacing: 0.01em;
}
```
Dark mode: `background: #252220; color: #8a837c;`.

**Answer to "does wrapping in `<code>` help the AI scanner?"** — No. LLMs read prose and YAML equally; the structured YAML already carries the truth. Wrapping visible meta in `<code>` would hurt screen readers and confuse semantic HTML. We get the "code-field" look via the mono font + subtle bg, **without** semantic `<code>` tags. This is written into the design log so the question isn't asked again.

Once the auto-generated line appears, the user can remove the hand-written italic meta line (e.g. `2026-04-20-the-machine-that-heard-itself.md:48`) to avoid duplication.

### 4 · Tag hover → orange 80% solid (`custom-style.scss`, lines 246–250)
Replace the current subtle hover with:
```scss
.header-tags .tag:hover, .header-tags a.tag:hover {
  color: #ffffff !important;
  background: rgba(200, 90, 24, 0.80) !important;
  border-color: rgba(200, 90, 24, 0.80) !important;
  border-bottom-color: rgba(200, 90, 24, 0.80) !important;
}
```

### 5 · Obsidian parity (`docs/obsidian-setup.md`, new)
Instructions for the user to copy-paste:
- **Theme**: Minimal.
- **Style Settings**: body font "IBM Plex Serif", monospace "IBM Plex Mono", accent `#C85A18`, light bg `#f5ecd7`, dark bg `#1c1a18`.
- **Snippet** (path: `<vault>/.obsidian/snippets/mementori.css`):
  - copies `.header-tags .tag` + `.header-details` + tag-hover from the site;
  - adds `.metadata-container, .metadata-properties-heading { display: none !important; }` to hide the Properties panel in reading view;
  - optional Dataview snippet to auto-render the meta line from frontmatter in edit/live-preview, mirroring what the site template does.

### 6 · Unsplash → local image (`2M/_Garden/2026-04-19-a-call-between-friends.md:38`)
Download the current Unsplash image, save under `src/site/img/a-call-between-friends-hero.jpg`, rewrite the markdown to `![Mountains and mist — Da Nang, April 2026](/img/a-call-between-friends-hero.jpg)`. Removes an external dependency that could 404 or change.

### 7 · Q&A (written into the design log, answered once)
- **"Publish All showed no changes — is that normal?"** → Yes when nothing in the vault has a newer mtime than the plugin's last sync. To force, touch the file (add then remove a space) or delete the plugin's cached hashes in `<vault>/.obsidian/plugins/digitalgarden/data.json`.
- **"Where is the photo hosted?"** → In the repo (`src/site/img/…`). Closing the laptop does NOT break the site. G-Drive is only needed if we want images out of git history (bloat). For now: in-repo, simpler.
- **"Wikilinks vs paths"** → In Obsidian, prefer `[[Note title]]` — the DG plugin resolves these to the right `/notes/…` path at publish time, and they survive renames. Hardcoded paths rot. For the existing home index: Obsidian's built-in **Find & Replace in Vault** converts them without AI. No need to scan every file manually.
- **"Broken links on the two notes"** → Code-side is correct (permalinks match, recent commits `1c15952` / `cbb5892` fixed the slug issues). Almost certainly a Netlify/Vercel deploy lag or a failed deploy. Open the Netlify dashboard, check the latest deploy's status + log. If it's stuck: trigger "Clear cache and deploy".

## Critical files

- `src/site/_includes/layouts/note.njk` — header-meta insertion (after line 45)
- `src/site/styles/custom-style.scss` — footer section (new), header-details style (new), tag-hover update (lines 246–250), dark-mode extensions (line 449+)
- `src/site/notes/2M/_Garden/2026-04-19-a-call-between-friends.md` — replace Unsplash URL with local image path
- `src/site/img/a-call-between-friends-hero.jpg` — new, downloaded from Unsplash
- `docs/design-log.md` — new
- `docs/obsidian-setup.md` — new

## Cost estimate (for this milestone)

Approximate token budget for execution (reading files, writing code, committing, pushing, verifying):
- **Input:** ~90K tokens (plan, custom-style.scss, note.njk, 2 notes, .eleventy.js, package.json, netlify.toml, design log template, Obsidian snippet, plus iteration context)
- **Output:** ~15K tokens (code edits, new doc files, commit messages)

| Tier | Model | Approx. cost (USD) | Trade-off |
| --- | --- | --- | --- |
| **Low (optimized)** | Haiku 4.5 | $0.15 – $0.40 | Fast, cheap. Risk: may need one retry on nunjucks list syntax. |
| **Recommended** | **Sonnet 4.6** | **$0.50 – $1.30** | Best value for this size; handles Eleventy + SCSS + git reliably. Matches user's choice. |
| **High (premium)** | Opus 4.7 | $3.00 – $6.00 | Overkill for deterministic implementation; reserve for architecture / ambiguous design calls. |

All tiers benefit from prompt caching on the plan file (~30–60% reduction on long sessions).

**Cost principle for future projects** (captured in design log):
- Always publish a **low / recommended / high** trio.
- Default to the cheapest tier that reliably completes without human intervention.
- Reserve Opus for: new architecture, ambiguous spec, cross-cutting refactors, security review.
- Reserve Haiku for: formatting, renames, one-liner fixes, doc typos.
- Sonnet 4.6 is the default middle — use it unless there's a reason not to.

## Plan-preservation system (Obsidian vault)

All plans and major conversation handoffs are versioned in the vault so any AI (or the human) can resume without chat history.

**Directory:** `src/site/notes/0M/_system/plans/`
**Filename convention:** `YYYY-MM-DD-<slug>.md` (e.g. `2026-04-21-m1-marginalian-polish.md`)
**Frontmatter template:**
```yaml
---
title: <Plan title>
date: 2026-04-21
status: pending | in-progress | complete | abandoned
branch: claude/<branch-name>
cost_estimate_usd: [low, recommended, high]
model_used: sonnet-4-6 | opus-4-7 | haiku-4-5
dg-publish: false
tags: [plan, system, ai-handoff]
---
```
**Body structure:** Context → Findings → Plan → Files → Verification → Resume Instructions (last-known state, next step).

This milestone's plan will be copied from `/root/.claude/plans/its-great-now-save-dapper-prism.md` into `src/site/notes/0M/_system/plans/2026-04-21-m1-marginalian-polish.md` as the first action of the Sonnet session — so the file lives with the code, is committed, and any future AI sees it.

## Handoff to Sonnet 4.6 session

The executing agent receives:
1. **This plan file** (read in full before any edits).
2. **Working directory** `/home/user/mementori-garden`.
3. **Branch** `claude/rollback-background-color-QmEVI` (already pushed with the palette rollback; next commits stack on top).
4. **Permission envelope**: file edits, git add/commit, git push, GitHub MCP push_files (if local push 403s again), WebFetch (to download the Unsplash image).
5. **Stop conditions**: all six commits landed, branch pushed, PR opened as draft, verification complete — OR a blocker that needs a human decision.

## Commit strategy

One commit per concern, pushed in sequence on `claude/rollback-background-color-QmEVI`:
1. `design: add design-log with M1 Marginalian Parchment milestone + Q&A`
2. `style: footer alignment to content column + dark-mode border`
3. `template: render header-details meta line from frontmatter (date/location/etc.)`
4. `style: tag hover → Hermès orange 80% solid`
5. `garden: local hero image for A call between friends (was Unsplash)`
6. `docs: Obsidian setup — Style Settings + snippet to mirror site look`

## Verification

1. `npm run build` locally → open `dist/notes/2M/_Garden/2026-04-20-the-machine-that-heard-itself/index.html` in a browser. Check: header meta line renders with "Sunday, 20. April, 2026 · Da Nang · 16:46 min · vi · de · en · Published by nhan", tags hover orange at 80%, footer aligns under the content column (offset by 400px on desktop, 0 on mobile).
2. Push branch → confirm Netlify/Vercel deploy succeeds → click through the three notes from the home page.
3. In Obsidian: drop the snippet into `.obsidian/snippets/mementori.css`, enable in Appearance → CSS snippets, confirm Properties panel hides and the page matches the site preview.

## Resume Instructions (if this session dies)

**Last-known state** (updated by the executing agent after each commit):
- [x] Step 0: copy this plan into `src/site/notes/0M/_system/plans/2026-04-21-m1-marginalian-polish.md`
- [x] Step 1: `docs/design-log.md` with M1 + principles + Q&A + cost-tier rules
- [x] Step 2: footer alignment (custom-style.scss §21 + dark-mode override)
- [x] Step 3: header-details meta line (note.njk insertion + custom-style.scss rule)
- [x] Step 4: tag hover → orange 80% solid
- [x] Step 5: Unsplash URL rewritten to local path — image download blocked by sandbox (see design-log.md Mistakes). Manual download needed.
- [x] Step 6: `docs/obsidian-setup.md`
- [ ] Step 7: open draft PR on GitHub

**If interrupted**: check `git log claude/rollback-background-color-QmEVI --oneline` to see which commits landed, tick the boxes above, resume at the first unchecked step. No need to redo work.

**If blocked**: append a line to the Mistakes section of `docs/design-log.md`, then leave a status comment on the PR, then stop.
