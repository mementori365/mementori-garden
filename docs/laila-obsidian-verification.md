# Obsidian + Laila System Verification Checklist
## Pre-Webpage Work — Vault Status Assessment

**Status:** Testing 0M (iCloud) + Laila processes  
**Date:** May 2, 2026  
**Branch:** `claude/obsidian-icloud-setup-UmPIp`

---

## Part 1: Obsidian Vault Structure (0M in iCloud)

### Current Structure
```
0M/
├── x/
│   └── incoming/
│       └── Call with Tran Minh Thu.transcript.md
```

### ✅ Requirements Verification

**Folder Architecture — Read-only principle**
- [x] `0M/` exists (moved to iCloud roots)
- [x] `0M/x/incoming/` exists (raw materials entry point)
- [x] First transcript landed: `Call with Tran Minh Thu.transcript.md`
- [ ] **READY FOR TESTING:** Can Obsidian access iCloud `0M/` folder in real-time?
- [ ] **READY FOR TESTING:** Do file changes sync automatically?

**Obsidian Theme & Plugins (Local setup)**
- [ ] Minimal theme installed
- [ ] Style Settings plugin installed
- [ ] mementori.css snippet created and enabled
- [ ] Optional: Dataview plugin installed
- [ ] Optional: Digital Garden plugin configured

---

## Part 2: Laila's Infrastructure & Processes

### What Laila Does
Laila is the **attention-analysis and curation system** for the vault. Her roles:

| Process | Status | Required For |
|---------|--------|--------------|
| **Attention-analysis (monthly)** | ❌ Not yet automated | Monthly reports on what got/didn't get attention |
| **Dark matter sweep** | ❌ Not yet automated | Find files unopened 90+ days (sort by last_access) |
| **Kaizen 3 prep** | ❌ Not yet automated | Summarize situation before each round |
| **File metadata tracking** | ⚠️ Partial | Frontmatter exists, `last_access` field needs implementation |
| **Marination period monitoring** | ❌ Not yet automated | Identify when files are "ready to connect" |

### Current File Metadata Structure

**Example from recent notes:**
```yaml
---
written_at: 2026-04-19T12:00:00+07:00
human_date: "Danang, Sunday 19. April, 2026"
author: dreamteam
significance: 9
dg-publish: true
---
```

**Missing for Laila:**
- `created_at` (ISO 8601)
- `last_accessed` (ISO 8601, auto-updated)
- `marination_days` (days since creation)
- `attention_count` (how many times opened/edited)
- `tags` (ConTags format for cross-referencing)

---

## Part 3: Vault Access Patterns

### Processing Pipeline (Currently Working)
From "The machine that heard itself" note:

✅ Audio recording → Transcription (Groq Whisper) → Landing in `0M/x/incoming/` → Manual processing

**Where this should flow to Laila:**
1. Raw file lands in `0M/x/incoming/`
2. Laila detects new file (via iCloud sync watch)
3. Laila extracts metadata (transcription engine, language, participants, etc.)
4. Laila files to appropriate `0M/` subfolder (by date, type, or significance)
5. File sits in "marination" period (not tagged for cross-connection yet)
6. Monthly: Laila generates attention-analysis (what got touched, what didn't)
7. When ready: Laila suggests connections, or human moves to `1M/` (assimilated layer)

**Current bottleneck:** Steps 2–6 are manual. Laila's automation doesn't exist yet.

---

## Part 4: Obsidian-Laila Compatibility Check

### Required for Laila to run on Obsidian vault:

**File Watching**
- [ ] Can Laila watch `0M/x/incoming/` for new files?
- [ ] Can Laila auto-update `last_accessed` timestamps in frontmatter?
- [ ] Can changes to `0M/` vault files sync back to iCloud?

**Metadata Extraction**
- [ ] Can Laila parse YAML frontmatter reliably?
- [ ] Can Laila generate reports (markdown) into `0M/_laila/` (private, not published)?
- [ ] Can Laila run on macOS/Linux alongside Obsidian without conflicts?

**Sync & Conflict Handling**
- [ ] If Laila updates a file while Obsidian has it open, what happens?
- [ ] Does iCloud sync create conflicts?
- [ ] Can we tolerate a 5–10 second update delay for Laila metadata writes?

---

## Part 5: Testing Checklist

### Obsidian + iCloud Test
**Before Laila automation:**

1. **Sync Test (20 min)**
   - [ ] Add a test file to `0M/x/incoming/` on the Mac via Obsidian
   - [ ] Wait 10 seconds, check iCloud Drive web or another device
   - [ ] File appears on iCloud? (sync working)
   - [ ] Modify file in Obsidian, check iCloud syncs change
   - [ ] Delete test file, verify deletion syncs

2. **Theme & Plugin Verification (5 min)**
   - [ ] Open a note with rich frontmatter in Obsidian
   - [ ] Properties panel should be **invisible** (mementori.css working)
   - [ ] Tags should render as **orange pills** with border
   - [ ] Hover a tag → should fill with **solid Hermès orange** (no subtle tint)
   - [ ] Fonts should be **IBM Plex** family (if installed locally)

3. **Dataview Test (optional, 5 min)**
   - [ ] If Dataview installed: open `2026-04-19 — A call between friends.md`
   - [ ] Check if the dataviewjs block renders a meta line (date · location · duration)
   - [ ] Meta line should appear below tags, styled as mono pill

### Laila Infrastructure Test
**Before automating Laila processes:**

4. **Metadata Readiness (10 min)**
   - [ ] Sample note has `created_at`, `written_at`, or `date` field? (Yes)
   - [ ] Can we reliably extract that date from frontmatter?
   - [ ] Can we add `last_accessed: 2026-05-02` to a test note?
   - [ ] Does Obsidian preserve that field on edit?

5. **Vault Structure for Laila (5 min)**
   - [ ] Does `0M/_laila/` folder need to exist for reports?
   - [ ] Should `0M/_laila/` be included in git but excluded from DG publishing (dg-publish: false)?
   - [ ] Create sample report structure (monthly-2026-04-summary.md)

---

## Part 6: Laila Go/No-Go Decision Tree

**Can Laila run if:**

✅ **YES, proceed to automation if:**
- Obsidian syncs to iCloud reliably (no 10+ second delays)
- CSS snippet works (Properties hidden, tags styled)
- We can add `last_accessed` timestamps to file frontmatter
- We agree to store Laila reports in `0M/_laila/` (private, not published)
- We accept 1–2 second overhead for Laila to update metadata on each file access

❌ **NO, pause if:**
- iCloud sync is unreliable or creates conflicts
- Obsidian crashes when Laila updates open files
- We can't extract file metadata reliably (YAML parsing issues)
- Privacy concerns: `0M/` must remain truly private (never publishable)

---

## Part 7: Obsidian Settings Final Verification

### Minimum Required for Laila Safety

These settings **must be locked** to prevent publishing private 0M files:

**Digital Garden Plugin (`notes.json`):**
```json
{
  "dgShowInlineTitle": false,
  "dgShowFileTree": true,
  "dgShowToc": true,
  "dgShowBacklinks": true,
  "dgShowTags": true,
  "dgLinkPreview": true,
  "dgEnableSearch": true
}
```

**vault.json (Obsidian local config):**
- [ ] `baseUrl` points to correct GitHub repo
- [ ] `.gitignore` excludes `.obsidian/plugins/` and `.obsidian/cache/` (already done)
- [ ] `dg-publish: false` is set on ALL files in `0M/` by default

**Critical:** Create a file at `0M/0M.json` with:
```json
{
  "dg-publish": false
}
```
This sets the directory default so any file in `0M/` is private unless explicitly overridden.

---

## Part 8: Go-Live Readiness

**Before we return to webpage work, verify:**

- [x] Obsidian setup documented (done)
- [x] iCloud integration documented (done)
- [ ] **Obsidian/iCloud sync tested** ← START HERE
- [ ] **CSS snippet working** (Properties hidden, tags visible)
- [ ] **Vault structure ready** (0M private, metadata fields present)
- [ ] **Laila safety settings locked** (no private files can be published)
- [ ] **Laila metadata tracking possible** (frontmatter updates work)

**Once all above pass:** Laila can begin automation phase

---

## Critical Files to Check Right Now

| File | Check | Status |
|------|-------|--------|
| `src/site/notes/notes.json` | DG settings match Obsidian? | See Part 7 |
| `0M/` folder | Syncing to iCloud? | **CRITICAL** |
| `docs/obsidian-setup-summary.md` | User setup complete? | Need confirmation |
| `.eleventy.js` | Handles 0M exclusion correctly? | See `.eleventyignore` |
| `.eleventyignore` | `0M/` marked as private? | Need verification |

---

## What "Laila Can Run" Means

✅ **Laila can run when:**
- Obsidian accesses vault without locking files
- File sync is fast enough (< 5sec) that Laila updates don't cause conflicts
- Metadata (dates, tags, frontmatter) is reliable and consistent
- We have a process to move files from `0M/` → `1M/` → `2M/`
- Monthly attention-analysis can be generated and stored safely

❌ **Laila cannot run if:**
- Obsidian and Laila compete for file access
- iCloud sync creates conflicts
- We can't reliably track file metadata
- Private files risk being published

---

## Immediate Action Items

### You (User)
1. **Run Obsidian Sync Test** (Part 5.1)
   - Add a test file via Obsidian in `0M/x/incoming/`
   - Check if it appears on iCloud Drive or another device within 10 seconds
   - Report result: ✅ sync working / ❌ sync slow / ❌ sync broken

2. **Verify CSS Snippet** (Part 5.2)
   - Open any published note in Obsidian
   - Check: Properties hidden? Tags styled? Hover working?
   - Report: ✅ all working / ⚠️ partial / ❌ broken

3. **Confirm Dataview** (Part 5.3, if installed)
   - Check if meta line renders automatically
   - Or confirm you're hand-writing it (also fine)

### Me (AI Agent)
1. **Analyze Laila Automation Requirements**
   - Based on your test results, design Laila's metadata tracking system
   - Create `audio_watcher.py` or similar to watch `0M/x/incoming/`
   - Define dark matter sweep query (files with `last_accessed` > 90 days ago)

2. **Build Laila Report Generator**
   - Monthly attention-analysis template
   - File access stats dashboard
   - Kaizen 3 preparation script

3. **Lock Vault Security**
   - Add `0M/0M.json` with `dg-publish: false`
   - Update `.eleventyignore` to exclude `0M/` from builds
   - Document publish safety guarantees

---

## Next Step: Run Tests, Report Results

**Once you complete Part 5 tests, reply with:**
- ✅/❌ iCloud sync working?
- ✅/❌ CSS snippet working?
- ✅/❌ Dataview rendering?
- Any issues encountered?

Then we'll know if Laila can safely begin automation. If all green, we move to Phase 2: **Laila automation scripts**. If any red, we fix the blocker first before touching the webpage.

---

**Status:** 🔴 WAITING FOR OBSIDIAN SYNC VERIFICATION  
**Next Review:** After you run Part 5 tests
