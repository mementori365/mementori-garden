# Obsidian + iCloud Integration Plan
## Complete Setup & Adjustment Checklist

**Status:** Vault moved to `0M/roots` in iCloud  
**Date:** May 2, 2026  
**Branch:** `claude/obsidian-icloud-setup-UmPIp`

---

## Summary of Adjustments Already Implemented

### ✅ Code-level Setup (Live in repo)

| Area | Component | Status | File |
|------|-----------|--------|------|
| **Design System** | Parchment palette + IBM Plex fonts | ✅ Complete | `custom-style.scss` |
| **Header Rendering** | Meta line (day, location, duration, languages, published_by) | ✅ Complete | `note.njk` + `custom-style.scss` §18 |
| **Tag Styling** | Tags with Hermès orange hover (80% solid) | ✅ Complete | `custom-style.scss` §18 |
| **Footer** | Aligned to content column | ✅ Complete | `custom-style.scss` §21 |
| **Properties Panel** | Hidden via CSS snippet | ✅ Complete | `docs/obsidian-setup.md` |
| **DG Plugin Config** | Filetree, TOC, backlinks, tags, search enabled | ✅ Complete | `notes.json` |
| **Design Principles** | Locked baseline for future decisions | ✅ Complete | `docs/design-log.md` |
| **Dataview Support** | Optional auto-render meta line in Obsidian | ✅ Complete | `docs/obsidian-setup.md` §4 |

### 📋 Documentation (Live in repo)
- `docs/obsidian-setup.md` — Complete copy-paste instructions
- `docs/design-log.md` — Design principles + Q&A
- `docs/plans/2026-04-21-m1-marginalian-polish.md` — Detailed milestone plan

---

## Checklist: Local Obsidian Vault Setup

This is what you need to do **locally in your Obsidian vault** to sync with the 0M/roots folder in iCloud.

### **Phase 1: Theme & Plugins (5–10 min)**

- [ ] **Theme: Minimal**
  - Open Obsidian → Settings → Appearance → Themes → Browse
  - Search for "Minimal" by Kepano
  - Install and enable
  
- [ ] **Style Settings Plugin**
  - Settings → Community plugins → Browse
  - Search for "Style Settings" by mgmeyers
  - Install and enable
  - Click "Settings → Style Settings" (opens the config panel)

- [ ] **Optional: Dataview Plugin** (for auto-rendering meta line in edit view)
  - Settings → Community plugins → Browse
  - Search for "Dataview" by blacksmithgu
  - Install and enable
  - (You can use this OR hand-write the meta line, or have the site auto-render it; see Phase 4 for details)

### **Phase 2: Fonts (System-level, one-time)**

> **If fonts aren't installed on your system, Obsidian will fall back to default, and the site will use Google Fonts.**

Only do this if you want local Obsidian to match the site **perfectly**:

- [ ] Download IBM Plex family from [fonts.google.com](https://fonts.google.com/specimen/IBM+Plex+Serif)
  - IBM Plex Serif (all weights)
  - IBM Plex Sans (weight 300 for headings)
  - IBM Plex Mono
- [ ] Install on your system
  - macOS: Double-click each `.ttf`, click "Install Font"
  - Linux: Copy `.ttf` files to `~/.local/share/fonts/`, run `fc-cache -fv`
  - Windows: Double-click each `.ttf`, click "Install"

### **Phase 3: Style Settings Configuration (5–10 min)**

Open **Settings → Style Settings** and apply these values:

#### Typography
| Setting | Value |
|---------|-------|
| Body font | `IBM Plex Serif` |
| Monospace font | `IBM Plex Mono` |

#### Colours — Light mode
| Setting | Value |
|---------|-------|
| Base colour | `#f5ecd7` |
| Accent colour | `#C85A18` |

#### Colours — Dark mode
| Setting | Value |
|---------|-------|
| Base colour | `#1c1a18` |
| Accent colour | `#E07030` |

> **Minimal theme may have additional Style Settings** (line height, sidebar width, etc.). Keep defaults unless you have a specific preference.

### **Phase 4: CSS Snippet — mementori.css (5 min)**

**Path:** `<your-vault>/.obsidian/snippets/mementori.css`

Create this file and paste the content below. Then enable it in **Settings → Appearance → CSS snippets** (toggle the switch).

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

### **Phase 5: Digital Garden Plugin (5–10 min)**

> Assumes you already have the Obsidian Digital Garden plugin installed and a GitHub repo linked.

- [ ] Open **Settings → Digital Garden**
- [ ] Verify these settings match `src/site/notes/notes.json`:
  - `dgShowInlineTitle` → **off** (unchecked)
  - `dgShowFileTree` → **on**
  - `dgShowToc` → **on**
  - `dgShowBacklinks` → **on**
  - `dgShowTags` → **on**
  - `dgLinkPreview` → **on**
  - `dgEnableSearch` → **on**
  - `dgShowLocalGraph` → **off**
  - `dgHomeLink` → **on**

- [ ] Add `dg-publish: true` to frontmatter of any note you want public
- [ ] Add `dg-publish: false` to keep vault-only notes (like system plans)

### **Phase 6: Optional Dataview Meta Line (5 min)**

> Only if you installed the Dataview plugin. Allows the meta line (date · location · duration) to auto-render in edit/live-preview view, matching what the site renders.

**For each note** with rich metadata (day, location, duration, languages, published_by):

1. After the `# Title` heading, paste this block:
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

2. Once it renders and looks right, **delete the old hand-written italic meta line** (e.g., `*Sunday, 20. April, 2026 · Da Nang · ...*`) to avoid duplication.

---

## Checklist: Repository-level Setup

This is what's **already done in the codebase** and needs no action from you:

- [x] **Palette locked** — `#f5ecd7` (light), `#1c1a18` (dark), Hermès orange `#C85A18` / `#E07030`
- [x] **Typography locked** — IBM Plex Serif 17px body, Sans weight 300 headers, Mono meta/labels
- [x] **Golden ratio layout** — 370 (sidebar) + 30 (gap) + 600 (content) + 30 (gap) + 240 (sidebar)
- [x] **Footer CSS** — aligned to content column (`custom-style.scss` §21)
- [x] **Header meta rendering** — day, location, duration, languages, published_by auto-rendered (`note.njk` + `custom-style.scss` §18)
- [x] **Tag hover** — Hermès orange 80% solid (`custom-style.scss` §18)
- [x] **Properties panel hidden** — via CSS snippet
- [x] **DG plugin config** — filetree, TOC, tags, search enabled (`notes.json`)
- [x] **Design log** — principles + Q&A locked (`docs/design-log.md`)

**No code changes needed. The site is ready.**

---

## Verification Checklist

Once you've completed all phases, verify the setup works:

### In Obsidian (reading view)
- [ ] Properties panel is invisible
- [ ] Tags render as small orange-tinted pills
- [ ] Hovering a tag fills it with solid Hermès orange + white text
- [ ] Notes with rich metadata show a mono-font meta line below tags (if Dataview is enabled)

### On the Site (mementori.garden)
- [ ] Tags appear as orange pills
- [ ] Tag hover is solid Hermès orange
- [ ] Header meta line appears (date · location · duration)
- [ ] Footer is aligned to the content column
- [ ] Fonts are IBM Plex family
- [ ] Color palette matches Minimal + Style Settings

### Sync
- [ ] Notes in `0M/roots` (iCloud) are appearing in the published site
- [ ] The Digital Garden plugin is pushing changes to GitHub automatically (or you can manually run "Publish All")
- [ ] Check [mementori.garden](https://mementori.garden) — new notes appear within seconds of publishing

---

## Troubleshooting

### "Publish All shows no changes"
**Normal behavior.** The DG plugin only publishes files that have changed since the last run. To force:
1. Open a note in the vault
2. Add then immediately remove a space
3. Save (Cmd/Ctrl+S)
4. Run "Publish All"

Or delete the plugin's cache: `<vault>/.obsidian/plugins/digitalgarden/data.json` (plugin will rebuild it).

### "Fonts still look like default"
Check:
1. Is "IBM Plex Serif" / "IBM Plex Mono" installed **locally**? (Fonts app → search for "IBM Plex")
2. Is the Minimal theme actually **enabled**? (Settings → Appearance → Active theme)
3. Did you refresh Obsidian? (Close and reopen)

If still not working, it's fine — the site uses Google Fonts, so only Obsidian's view will differ. The published site will always use IBM Plex.

### "CSS snippet not applying"
1. Verify file is at `<vault>/.obsidian/snippets/mementori.css` (exact path)
2. Check it's **enabled** in Settings → Appearance → CSS snippets (toggle switch on)
3. Restart Obsidian
4. Check browser console (F12) for CSS errors

### "Meta line not rendering in edit view"
This requires the **Dataview plugin**. If you don't want it:
- Hand-write the meta line as italic prose under the title (current approach)
- OR let the site auto-render it (no Dataview needed)

### "Digital Garden plugin not syncing"
1. Is the plugin **installed** and **enabled**? (Settings → Community plugins)
2. Is your GitHub repo **linked**? (Settings → Digital Garden → GitHub repo)
3. Is the note marked `dg-publish: true`? (Add to frontmatter if not)
4. Try manual "Publish All" button
5. Check GitHub Actions on the repo — is the deploy running?

---

## Design Principles (Do Not Re-decide)

From `docs/design-log.md`:

1. **Palette** — Light: `#f5ecd7` (parchment) → `#d8cbb0` (borders). Dark: `#1c1a18` → `#383028`. No drift.
2. **Fonts** — Body: IBM Plex Serif 17px, line-height 1.84. Headings: IBM Plex Sans weight 300. Meta/code: IBM Plex Mono. Non-negotiable.
3. **Accent** — Hermès orange `#C85A18` (light) / `#E07030` (dark). Used consistently for links, tags, hovers.
4. **Layout** — Golden ratio: 370 + 30 + 600 + 30 + 240. Do not touch without redesigning the entire grid.
5. **Meta-bridge rule** — YAML frontmatter is machine food. The template renders human prose. Every meta field in frontmatter **must** also be visible in the header.

---

## Next Steps

1. **Complete the local Obsidian setup** (Phases 1–6 above)
2. **Create a test note** with rich metadata and publish it
3. **Verify on the site** — check that metadata renders correctly
4. **Remove hand-written meta lines** from existing notes if Dataview is enabled
5. **Commit** the obsidian-setup.md updates to the repo (if any adjustments needed)

---

## Files Reference

| File | Purpose |
|------|---------|
| `docs/obsidian-setup.md` | User-facing setup instructions |
| `docs/obsidian-icloud-integration-plan.md` | This file — complete checklist |
| `docs/design-log.md` | Design principles + Q&A |
| `src/site/styles/custom-style.scss` | All Obsidian-related CSS (palette, footer, meta line, tags) |
| `src/site/_includes/layouts/note.njk` | Header meta line rendering |
| `src/site/notes/notes.json` | Digital Garden plugin config |
| `.obsidian/snippets/mementori.css` | Local Obsidian CSS snippet (create this locally) |

---

**Last updated:** May 2, 2026  
**Status:** Ready for execution  
**Branch:** `claude/obsidian-icloud-setup-UmPIp`
