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

## Cost tier

**Recommended:** Sonnet 4.6. The work is mechanical: one config edit, one template edit, one frontmatter audit, one doc append. No architecture decisions remain — they are settled in this plan.

**Skip Opus.** No ambiguity to resolve.
**Skip Haiku.** Multi-file edits with light Nunjucks logic are above its sweet spot.
