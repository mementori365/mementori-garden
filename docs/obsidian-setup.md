# Obsidian Setup — Mementori Garden

Mirror the site's look in Obsidian so author-view matches reader-view.

---

## 1. Theme: Minimal

Install via **Settings → Appearance → Themes → Browse**.
Search for **Minimal** by Kepano. Install and enable it.

Minimal is required for the Style Settings values below to work correctly.

---

## 2. Style Settings plugin

Install via **Settings → Community plugins → Browse**.
Search for **Style Settings** by mgmeyers. Install and enable it.

Then open **Settings → Style Settings** and apply the values below.

### Typography

| Setting | Value |
|---|---|
| Body font | `IBM Plex Serif` |
| Monospace font | `IBM Plex Mono` |

### Colours — Light mode

| Setting | Value |
|---|---|
| Base colour | `#f5ecd7` |
| Accent colour | `#C85A18` |

### Colours — Dark mode

| Setting | Value |
|---|---|
| Base colour | `#1c1a18` |
| Accent colour | `#E07030` |

> **Note:** IBM Plex fonts must be installed on your system for these to take effect in Obsidian (they are loaded from Google Fonts on the web). Download from [fonts.google.com/specimen/IBM+Plex+Serif](https://fonts.google.com/specimen/IBM+Plex+Serif) and install all three families: IBM Plex Serif, IBM Plex Sans, IBM Plex Mono.

---

## 3. CSS Snippet: mementori.css

This snippet hides the Properties panel in reading view, mirrors the site's tag pills and header-details meta line, and sets the tag hover to Hermès orange.

**Path:** `<your-vault>/.obsidian/snippets/mementori.css`

Create the file with the content below. Then enable it in **Settings → Appearance → CSS snippets**.

```css
/* ════════════════════════════════════════════════════════════════
   Mementori Garden · Obsidian parity snippet
   Mirrors: site tag pills, header-details meta line, tag hover
   Hides: Properties panel in reading view
   ════════════════════════════════════════════════════════════════ */

/* ── Hide Properties panel in reading view ──────────────────── */
.metadata-container,
.metadata-properties-heading,
.metadata-content,
.mod-cm6 .cm-embed-block.markdown-rendered.cm-widgetBuffer + .cm-embed-block {
  display: none !important;
}

/* ── Tag pills (mirrors .header-tags .tag on the site) ────────── */
.tag {
  font-family: 'IBM Plex Mono', 'Courier New', monospace !important;
  font-size: 0.72em !important;
  color: rgba(200, 90, 24, 0.45) !important;
  background: rgba(200, 90, 24, 0.06) !important;
  border: 1px solid rgba(200, 90, 24, 0.18) !important;
  border-radius: 99px !important;
  padding: 0.1em 0.65em !important;
  text-decoration: none !important;
}

/* ── Tag hover → Hermès orange 80% solid ─────────────────────── */
.tag:hover {
  color: #ffffff !important;
  background: rgba(200, 90, 24, 0.80) !important;
  border-color: rgba(200, 90, 24, 0.80) !important;
}

/* ── Header-details meta line (mirrors .header-details on site) ─ */
/* Usage: add a Dataview inline field or a callout of type [!meta]
   to auto-render frontmatter as a meta line in reading view.
   The class below is applied automatically if you use the
   Dataview snippet at the bottom of this file. */
.header-details,
.el-p.header-details {
  font-family: 'IBM Plex Mono', 'Courier New', monospace !important;
  font-size: 0.78rem !important;
  color: #6a6058 !important;
  background: #ede0c8 !important;
  padding: 0.35em 0.7em !important;
  border-radius: 3px !important;
  display: inline-block !important;
  margin-top: 0.5em !important;
  letter-spacing: 0.01em !important;
}

/* Dark mode overrides */
.theme-dark .tag {
  color: rgba(224, 112, 48, 0.5) !important;
  background: rgba(224, 112, 48, 0.07) !important;
  border-color: rgba(224, 112, 48, 0.18) !important;
}
.theme-dark .tag:hover {
  color: #ffffff !important;
  background: rgba(224, 112, 48, 0.80) !important;
  border-color: rgba(224, 112, 48, 0.80) !important;
}
.theme-dark .header-details,
.theme-dark .el-p.header-details {
  background: #252220 !important;
  color: #8a837c !important;
}
```

---

## 4. Optional: Dataview meta line

If you have the **Dataview** community plugin installed, you can auto-render the same meta line that the site generates. Paste this inline Dataview block at the top of any note (after the `# Title` heading):

```dataviewjs
const d = dv.current();
const bits = [];
if (d.day) bits.push(d.day);
if (d.location) bits.push(d.location);
if (d.duration) bits.push(d.duration + " min");
if (d.languages) bits.push(Array.isArray(d.languages) ? d.languages.join(" · ") : d.languages);
if (d.published_by) bits.push("Published by " + d.published_by);
if (bits.length) dv.paragraph("<span class='header-details'>" + bits.join("  ·  ") + "</span>");
```

This mirrors exactly what `note.njk` renders on the published site. Once it appears, remove any hand-written italic meta lines (e.g. `*Sunday, 20. April, 2026 · Da Nang · ...*`) to avoid duplication.

---

## 5. Result check

After applying the snippet and (optionally) Dataview:

- Reading view: the Properties panel should be invisible.
- Tags in reading view should render as small orange-tinted pills.
- Hovering a tag should fill it with Hermès orange (solid 80%) with white text.
- Notes with `day`, `location`, `duration`, etc. in frontmatter should show a mono-font meta line below the tags (if Dataview block is present).

The author-view should closely match the published site at `mementori.garden`.
