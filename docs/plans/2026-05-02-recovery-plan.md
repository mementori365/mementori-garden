# Recovery Plan — Restore V1, Stop the Drift

**Date:** 2026-05-02
**Author:** Nhan + Claude
**Branch:** `claude/plan-github-pages-h7BNj`
**Goal:** Get back to the last design that worked, freeze it, and make every future page individually controllable without touching global CSS.

---

## 1. What broke (one paragraph)

V1 was locked at commit `7769888` and signed off in `docs/design-log.md`. V1.1 (`a68d1a0`) added small polish and was still clean. V1.2 (`5baee1f`) restructured the header in `note.njk` *and* moved heading styles in `custom-style.scss` at the same time — H1/H2 went invisible. Three subsequent commits (`a21b497`, `0a8d45c`, `9b7e398`) each tried to fix it by rewriting the global stylesheet rather than reverting the offending commit. Each pass drifted further from V1.

## 2. Recovery (do this first, ~15 min)

1. **Tag V1 now** so we never lose it again:
   ```
   git tag v1-stable 7769888
   git tag v1.1-stable a68d1a0
   git push --tags
   ```
2. **Hard-reset the design files** (only CSS + the one template) to V1.1:
   ```
   git checkout a68d1a0 -- src/site/styles/custom-style.scss \
                           src/site/_includes/layouts/note.njk
   ```
   This restores the visuals without touching content, plugin, or `.eleventy.js`.
3. Build, eyeball locally, commit as `restore: V1.1 design baseline (from a68d1a0)`.
4. Open a draft PR. Verify on GitHub Pages preview. Merge only after eyes-on.

## 3. Lock the baseline

- Add `docs/design-log.md` entry: "V1.1 restored 2026-05-02. Tag `v1.1-stable`."
- Pin the contract: **`note.njk` and `custom-style.scss` change together or not at all.** Any PR that touches one without the other gets rejected.
- Add a one-line CI check (optional, later): grep that `.header-details`, `.header-tags`, `.header-separator` selectors exist in both files.

## 4. Going forward — per-page styling without global drift

The user requirement: *"every file will be created towards a webpage, individually."*

Adopt a **two-layer model**:

**Layer A — Global theme (frozen).** `custom-style.scss` defines palette, fonts, layout grid, default heading scale. Treat it as locked. Only changes via a numbered milestone with sign-off.

**Layer B — Per-note overrides via frontmatter.** Add a small set of YAML keys the template reads and emits as a scoped `<style>` block or body class:

```yaml
---
title: ...
hero: /img/foo.jpg
audio: https://drive.google.com/...     # standard field for audio
layout_variant: longform | dialogue | letter | gallery
accent_override: "#C85A18"               # optional, rare
---
```

In `note.njk`, render `<body class="note note--{{ layout_variant }}">` and add per-variant rules in a small `_variants.scss` partial. This gives every page its own personality without anyone touching the global file.

**Standard fields locked now** (the "spec" each note follows):
- `hero` → image path
- `audio` → G-Drive link (rendered as a player block in template)
- `day`, `location`, `duration`, `languages`, `published_by` → `.header-details` pill (already in V1)
- `layout_variant` → which Layer-B partial applies
- `participants` → meta row

## 5. Reference standard — themarginalian.com

Use it as the *typographic* reference, not the layout reference:
- Body: serif, ~17px, 1.8 line-height, generous left margin. ✓ already in V1.
- Headings: sans, light weight, plenty of whitespace above. ✓ already in V1.
- One accent colour, used sparingly for links and pull-quotes. ✓ Hermès orange.
- No card-shadows, no rounded boxes, no gradients except the optional yellow highlighter on H2 (keep that — it's signature).

What we should **not** copy from Marginalian: their newsletter chrome, social rail, and ad slots. Our site is private/garden — keep it cleaner than the source.

## 6. Process rules to stop credit waste

1. **Never edit CSS without a screenshot of the current state first.** "What does it look like now?" is question zero.
2. **One change per commit.** If you change CSS and template, that's two commits, reviewed independently.
3. **Bisect before rewriting.** If a visual regresses, `git bisect` to find the bad commit and revert it — don't paint over the global stylesheet.
4. **Default model: Sonnet 4.6.** Reserve Opus for ambiguous architecture work (this plan was one of those moments). Haiku for renames and one-liners.
5. **Cap per-task budget.** If a design task exceeds ~3 commits without converging, stop and ask Nhan before continuing.

## 7. Concrete next session (one task list)

- [ ] Tag `v1-stable` and `v1.1-stable`, push tags.
- [ ] Restore `custom-style.scss` and `note.njk` from `a68d1a0`.
- [ ] Build locally, screenshot the three published notes, paste into PR.
- [ ] Open draft PR, verify on Pages, merge.
- [ ] Add `layout_variant` field to template (Layer B scaffold) — empty default, no visual change yet.
- [ ] Update `docs/design-log.md` with V1.1 restore entry + Layer-A/B rule.

That's it. No new design work this session — the goal is *land the plane*, then build runways for individual pages on top of a frozen baseline.
