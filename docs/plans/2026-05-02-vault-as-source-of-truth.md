# Plan — Vault YAML as Single Source of Truth

**Date:** 2026-05-02
**For:** Sonnet 4.6 to execute (one session, no architecture decisions left)
**Branch:** continue on `claude/plan-github-pages-h7BNj`
**Goal:** Removing `dg-publish: true` (or equivalent) from a note in the Obsidian vault must cause it to disappear from the live site on the next deploy. No manual file deletion. No broken index links.

---

## Why this matters

Today's pipeline:

```
Obsidian vault  →  DG plugin  →  src/site/notes/*.md  →  Eleventy builds ALL  →  Vercel
```

The leak: Eleventy renders every file under `src/site/notes/`. The DG plugin only *adds* files when published; it does not always remove them when unpublished. Result: a note unpublished in Obsidian stays online in production until someone manually deletes it from the repo.

Target pipeline:

```
Obsidian vault (YAML is truth)
   └─ DG plugin syncs files to src/site/notes/
        └─ Eleventy filter: skip files where dg-publish !== true
             └─ Auto-generated Garden index from the surviving collection
                  └─ Vercel
```

Now `dg-publish: false` (or removing the key) in the vault → file may still sit in the repo, but Eleventy ignores it → site rebuilds without it → gone.

---

## What Sonnet should do (in order, one commit each)

### Step 1 — Add the Eleventy publish filter

File: `.eleventy.js`

Find where notes are registered as a collection (likely a block that adds `src/site/notes/**/*.md` to a collection or an `addCollection` call). Add a filter that excludes any note whose frontmatter does not have `dg-publish: true`.

Concretely:

```js
// In .eleventy.js, inside module.exports = function (eleventyConfig) { ... }

eleventyConfig.addCollection("publishedNotes", function (collectionApi) {
  return collectionApi
    .getFilteredByGlob("src/site/notes/**/*.md")
    .filter((note) => note.data["dg-publish"] === true);
});
```

Then, in `src/site/notes/notes.json` (or wherever the directory-level `eleventyExcludeFromCollections` / permalink lives), add a per-file gate so Eleventy does not even *render* notes lacking `dg-publish: true`:

```json
{
  "eleventyComputed": {
    "eleventyExcludeFromCollections": "{% if not (dg-publish) %}all{% endif %}",
    "permalink": "{% if not (dg-publish) %}false{% else %}{{ permalink }}{% endif %}"
  }
}
```

`permalink: false` tells Eleventy to skip writing the file. That is what removes it from the build. Verify after build: `_site/notes/2M/_Garden/2026-04-19-a-call-between-friends/` should not exist when `dg-publish` is missing on that note.

**Acceptance test:**
1. Set `dg-publish: false` on a note in `src/site/notes/`.
2. Run `npx eleventy` locally.
3. Confirm the rendered HTML for that note is **not** in `_site/`.

### Step 2 — Auto-generate the Garden index

File: `src/site/notes/2M/_Garden/index.md`

Today the index has hard-coded markdown links. Replace the `## Conversations` section with a Nunjucks loop over `collections.publishedNotes`, filtered to `_Garden` and sorted by `date` desc:

```njk
## Conversations

Records of real conversations — with listening links, full transcripts, and the right to delete.

{%- set gardenNotes = collections.publishedNotes
      | selectattr("filePathStem", "search", "/2M/_Garden/")
      | rejectattr("data.title", "equalto", "Garden")
      | sort(true, false, "data.date") -%}
{% for note in gardenNotes %}
- [{{ note.data.title }}{% if note.data.subtitle %} — {{ note.data.subtitle }}{% endif %}]({{ note.url }})
{% endfor %}
```

Now unpublishing a note removes both the page **and** its index link in one step.

**Acceptance test:**
1. Toggle `dg-publish` on a Garden note off → rebuild → index shows one fewer entry.
2. Toggle back on → rebuild → entry returns.

### Step 3 — Restore "A call between friends" properly

The earlier commit deleted the file. Restore it from `main` so the vault and repo stay in sync, then unpublish it the right way:

```
git checkout main -- "src/site/notes/2M/_Garden/2026-04-19 — A call between friends.md"
```

Edit the restored file: set `dg-publish: false` (or remove the key). Build locally and confirm the page does not appear in `_site/`. Also restore the index.md change (it will regenerate from Step 2 automatically).

If the file's frontmatter doesn't have a `dg-publish` key today, that's fine — *missing* is treated as unpublished by the filter. Just make sure published notes have `dg-publish: true` explicitly.

### Step 4 — Audit existing notes

Run:

```
grep -L "^dg-publish: true" src/site/notes/2M/_Garden/*.md
grep -L "^dg-publish: true" src/site/notes/2M/_Consilium/*.md
```

For each note that *should* be public but is missing the key, add `dg-publish: true`. For notes that should not be public, leave the key missing (or set false). Commit as `chore: backfill dg-publish flags`.

### Step 5 — Document the rule

Append to `docs/design-log.md` under Principles:

> **Vault YAML is the source of truth.**
> A note is public iff its frontmatter contains `dg-publish: true`. Eleventy filters out everything else at build time (`.eleventy.js` collection + `notes.json` `eleventyExcludeFromCollections`). The Garden index is auto-generated from `collections.publishedNotes`. To unpublish: open the note in Obsidian, remove `dg-publish: true`, save, run Publish All. The next Vercel deploy removes the page and its index link.

### Step 6 — Sanity check on Vercel

Push the branch. Wait for the preview deploy. Visit the preview URL and confirm:
- `/notes/2M/_Garden/2026-04-19-a-call-between-friends/` returns 404.
- `/notes/2M/_Garden/` no longer lists it.
- `/notes/2M/_Garden/2026-04-20-the-machine-that-heard-itself/` still works.

If all three pass, mark PR ready for review and ping Nhan.

---

## What Sonnet should NOT do this session

- Do not touch `custom-style.scss` or `note.njk`. Visual restore is a separate plan (`2026-05-02-recovery-plan.md`).
- Do not change Vercel config, hosting provider, or domains. Vercel is fine; the problem was build-time filtering, not the host.
- Do not refactor `.eleventy.js` beyond what Step 1 requires.
- Do not add a CMS, admin UI, or new plugin.

---

## Frontmatter standard (for future notes)

Every published note's YAML must contain:

```yaml
dg-publish: true            # the gate. Without this, Eleventy skips the file.
title:                      # h1 of the page
date:                       # ISO date, used for sorting
day:                        # human-readable day
location:                   # e.g. Da Nang
duration:                   # mm:ss or "48:11"
languages: [vi, en]
participants: [Nhan, ...]
hero:                       # /img/... or unsplash URL
audio:                      # gdrive_url or similar — rendered as a player
published_by: Nhan
layout_variant: longform    # or dialogue | letter | gallery
```

Anything not in this list is invisible to the reader unless explicitly rendered by `note.njk`. That is intentional: YAML is machine food, the template is the bridge (per design-log Principles → The Bridge).

---

## Phase B — Reading-experience polish (after Phase A is green)

Run only after Phase A (Steps 1–6) is merged and the live site rebuilds correctly. Before starting Phase B, **tag the post-Phase-A state so we can revert any single feature**:

```
git tag phase-a-stable
git push --tags
```

Each step below is one commit. If anything regresses, `git revert <sha>` for that step alone — never rewrite global CSS to "fix" it.

### Step B1 — Right-side floating Table of Contents

We had this in an earlier version and Nhan liked it. The current right sidebar (240px, golden-ratio) is the home for it.

- In `note.njk`, render a `<nav class="toc-floating">` block in the right column. Populate from headings using the existing eleventy-plugin-nesting-toc (or whatever the previous version used — search `git log --all --oneline | grep -i toc` for prior implementations and copy that approach).
- Position: `position: sticky; top: 120px;` inside the right sidebar. Width follows the existing `--sidebar-right` var (240px).
- Type: IBM Plex Mono, `0.74rem`, line-height 1.55, color `#a09890`, active link `#C85A18`.
- Show only h2 + h3. Skip h1 (it's the page title) and h4+ (too deep for a floating outline).
- Hide on viewports below 1024px (`@media (max-width: 1024px) { .toc-floating { display: none; } }`).

**Acceptance:** scroll a long note → TOC stays visible on the right, current section highlighted in Hermès orange. Below 1024px the TOC vanishes (no broken layout on mobile).

### Step B2 — Filetree connection lines (left sidebar)

Today the filetree shows two vertical guide lines — too noisy. Rule:

- **Collapsed folders:** no guide line.
- **Expanded folders:** show one single guide line, only at the file level (deepest nesting where the actual notes sit).

In `custom-style.scss`, find the `.filelist` and nested `.filelist .filelist` rules. Remove `border-left` from all but the deepest expanded level. The simplest implementation: drop all `border-left` rules on `.filelist`, then add it back on `.filelist[data-expanded="true"] > li > .filelist` (or whatever class the DG plugin attaches when a folder is open — inspect the rendered DOM).

If the DG filetree doesn't tag expanded state in the DOM, fall back to: `.filelist .filelist .filelist { border-left: 1px solid var(--border); }` (only the third nesting level gets the line, which is roughly where files live).

**Acceptance:** open the live preview, expand and collapse folders → at most one vertical guide line visible at any time, sitting next to the deepest file list.

### Step B3 — Sidenotes (footnotes-as-margin-notes, jotbird-style)

Reference: `https://share.jotbird.com/essay` — numbered footnote markers in the body. On wide screens (≥ 1280px) the footnote text appears in the right margin next to the marker. On narrow screens (< 1280px) the marker stays inline; clicking it expands the footnote text inline below the paragraph (like a `<details>` accordion).

Implementation:

1. Markdown footnote syntax `[^1]` is already supported by eleventy's markdown-it plugin. Do **not** replace this — augment the rendered HTML.
2. In `note.njk` (or via a small post-render JS file in `src/site/scripts/sidenotes.js`):
   - Find each `<sup class="footnote-ref"><a href="#fn1">1</a></sup>` in the rendered article.
   - On wide screens, clone the matching `<li id="fn1">` content into a `<aside class="sidenote" data-fn="1">` inserted into the right margin at the same vertical offset as the marker.
   - On narrow screens, wrap the marker as a button that toggles a `<div class="sidenote-inline">` after the parent `<p>`.
3. Hide the bottom `<section class="footnotes">` block when sidenotes are visible (wide screens). On narrow screens, keep it as the fallback list.

CSS:

```scss
.sidenote {
  position: absolute;
  width: var(--sidebar-right);   // 240px
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.74rem;
  line-height: 1.55;
  color: #6e6a62;
  margin-left: var(--gap);       // 30px
}

@media (max-width: 1279px) {
  .sidenote { display: none; }
  .sidenote-inline { display: block; padding: 0.6rem 0.9rem; background: #ede0c8; border-left: 2px solid #C85A18; margin: 0.4rem 0; }
}

@media (min-width: 1280px) {
  .sidenote-inline { display: none; }
  .footnotes { display: none; }
}
```

This co-exists with the right-side TOC: TOC sticks at the top of the right sidebar, sidenotes flow inline next to the body text below it. If they collide, the TOC wins (sticky) and sidenotes start below `top: 360px` instead of `top: 120px`.

**Acceptance:**
- ≥ 1280px viewport: footnotes appear in the right margin, no bottom footnotes section, TOC also visible above them.
- < 1280px viewport: footnotes are clickable inline, expanding below the paragraph.
- Existing footnote markdown (`[^1]` … `[^1]: text`) continues to work without rewriting any note.

### Step B4 — Dark mode pass

Reference jotbird's dark mode: warm dark background (not pure black), generous contrast on body type, accents desaturated.

- Light mode stays untouched (it's signed off in the design log).
- Dark mode tokens in `custom-style.scss` `.theme-dark` block:
  - `--bg: #1c1a18` (already locked)
  - `--surface: #252220`
  - `--border: #383028`
  - `--text: #e8e0d2`
  - `--muted: #a09890`
  - `--accent: #E07030`
  - `--sidenote-bg: #2a2520`
  - Yellow H2 highlighter: existing `linear-gradient(...)` at 18% opacity (already locked).
- Toggle: a small sun/moon icon in the top-right corner of the page header. Persists choice in `localStorage`. If no preference saved, follow `prefers-color-scheme`.

**Acceptance:** toggle icon flips palette without page reload; reload preserves choice; sidenotes, TOC, filetree, footnotes all readable in both modes.

---

## Rollback strategy (read this before starting Phase B)

Tags to create up-front:

```
git tag v1-stable          7769888
git tag v1.1-stable        a68d1a0
git tag phase-a-stable     <after Phase A merges>
git push --tags
```

If a Phase B step regresses something:

1. **First try** — `git revert <sha-of-bad-commit>` on the same branch, push, redeploy. Single-step undo, history preserved.
2. **If multiple steps need undoing** — `git reset --hard phase-a-stable` on a fresh branch, cherry-pick the steps that worked, push as a new PR.
3. **Never** rewrite `custom-style.scss` globally to "fix" a broken Phase B feature. The whole point of staging it as B1 → B2 → B3 → B4 is that each is independently revertable.

If a feature is genuinely too risky to land (e.g. sidenotes break on iOS Safari), drop it from this milestone and open a follow-up plan. Do not block the others on it.

---

## Cost tier

**Recommended:** Sonnet 4.6 for both phases. Phase A is mechanical config + Nunjucks. Phase B is bounded CSS + a small JS file for sidenotes; each step has explicit acceptance criteria.

**Skip Opus.** No ambiguity to resolve — all design decisions are settled here.
**Skip Haiku.** Phase B's JS + responsive CSS is above its sweet spot.

**Budget cap:** if Sonnet has not landed Phase A by ~10 commits or Phase B by ~12 commits, stop and ping Nhan. Do not keep iterating.
