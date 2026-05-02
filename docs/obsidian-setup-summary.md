# Obsidian Setup — Quick Summary

## What's Already Done (In Repo)
✅ Theme design locked (parchment + Hermès orange)  
✅ Typography locked (IBM Plex family)  
✅ Layout locked (golden ratio columns)  
✅ Footer CSS (aligned to content)  
✅ Header meta line (day · location · duration auto-rendered)  
✅ Tag styling (orange pills + solid hover)  
✅ Properties panel hidden (CSS snippet provided)  
✅ Digital Garden plugin config (all settings tuned)  
✅ Design principles documented (never re-decide these)  

## What You Need to Do (Local Vault)

### 1. Install (5 min)
- Minimal theme (Settings → Appearance → Themes → Browse)
- Style Settings plugin (Settings → Community plugins → Browse)
- Dataview plugin (optional, for auto-rendering meta line)

### 2. Configure Style Settings (5 min)
| Setting | Value |
|---------|-------|
| Body font | IBM Plex Serif |
| Monospace | IBM Plex Mono |
| Accent (both modes) | `#C85A18` (light) / `#E07030` (dark) |
| Base colour (light) | `#f5ecd7` |
| Base colour (dark) | `#1c1a18` |

### 3. Add CSS Snippet (2 min)
File: `.obsidian/snippets/mementori.css`  
Content: Copy from `docs/obsidian-setup.md` (§3)  
Then enable in Settings → Appearance → CSS snippets

### 4. Sync to iCloud + GitHub
- Move vault to `0M/roots` in iCloud (already done)
- Ensure Digital Garden plugin is pushing to GitHub (check `notes.json` settings)
- Test: publish a note, verify it appears on mementori.garden

## Result
Obsidian author-view will **exactly mirror** the published site:
- Same fonts, colors, spacing
- Same tag styling
- Same header layout
- Properties panel hidden (clean reading view)

## Files to Read
1. `docs/obsidian-setup.md` — Full instructions
2. `docs/obsidian-icloud-integration-plan.md` — Complete checklist
3. `docs/design-log.md` — Why these decisions were made

---

**Everything is ready. Just run the setup steps above, and you're done.**
