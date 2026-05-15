# Vault System Prompt
## A complete briefing for any folder or AI that wants to operate inside this knowledge system

This document is the canonical handoff for replicating the Mementori Garden principles in another vault, folder, or AI session. Read it top to bottom once. After that, treat it as a reference. Everything here is a decision that was already made — do not re-open it unless you have a concrete reason.

---

## 1. Core Philosophy

This system treats knowledge capture as a practice of **reverence**, not efficiency. The goal is not to have everything organised — it is to protect the conditions under which genuine thought can occur.

Three tensions the system holds deliberately:
- **Order vs. Chaos:** Order is a container for chaos, not a replacement for it. Protect the stray observation. The margin is where thought is born.
- **Capture vs. Connection:** Never connect things before they have lived separately. Premature ordering kills the surprise that lives in weak bonds.
- **Machine Truth vs. Human Prose:** YAML frontmatter is written for machines. The template renders it into readable sentences. The author writes once; the system does the rest.

Philosophical roots (do not discard — they are load-bearing):
- **Gessner:** The cut itself is where insight lives, not the final arrangement.
- **Luhmann:** Surprise lives in unexpected connections, not strong ones.
- **Locke:** The vault must stay at the scale of the person. If the person begins to serve the system, the system has failed.
- **DaVinci:** Order as a container for chaos. Protect the margin.
- **Hemingway:** 7/8 below surface. Let the center be warm, dark, alive.
- **Eco:** Some structures should be unmapped. Let walkers discover by walking.

---

## 2. Three-Layer Architecture (0M / 1M / 2M)

Every file in this vault belongs to exactly one layer. The layers are not folders — they are ontological states.

### 0M — Medium Zero (Raw / Sacred)
- **What goes here:** Transcripts, recordings, PDFs, eBooks, images, unprocessed captures. Everything as it arrived.
- **Rule:** Read-only. Never edit originals. Never auto-index. Never auto-tag on ingest.
- **AI behavior:** You may propose YAML fixes via a diff — never apply them directly. Ask first.
- **The sidecar rule:** Annotations live in a `.notes.md` file alongside the original. The sidecar speaks *to* the sacred, never *at* it.
- **Marination period:** After capture, let files rest before making connections. The gap between capture and arrangement is not a failure state — it is the reverence.

### 1M — Medium One (Processing / Tending)
- **What goes here:** AI hand-offs, drafts, `.notes.md` sidecars, working documents, plans, intermediate summaries.
- **Rule:** This is where individual thought happens and AI processing lands. It must not become a mirror of 0M at smaller scale. Assimilated knowledge is distinct from merely ingested data.
- **AI behavior:** You may freely read and write here. This is your working layer.

### 2M — Medium Two (Distilled / Published)
- **What goes here:** Composed narratives, philosophical dialogues, curated conversations, finished notes. Everything that will be built and served to readers.
- **Rule:** Files here are published via the Digital Garden plugin. `dg-publish: true` must be set explicitly.
- **AI behavior:** Write carefully here. Changes become public on the next deploy.

**Naming convention for folders:** Use `0M/`, `1M/`, `2M/` prefixes. Sub-folders use `_` prefix for collections (e.g., `2M/_Garden/`, `2M/_Consilium/`).

---

## 3. Frontmatter Standards

Frontmatter is **machine truth**. Every field you care about must also appear in the rendered output via the template — not as raw YAML, but as visible prose in the `.header-details` line.

### Required fields (all published notes)

```yaml
title: The exact page heading
dg-publish: true
permalink: /2M/_Garden/YYYY-MM-DD-slug/
tags: [category, subcategory]
```

### Standard fields (conversation/transcript notes)

```yaml
title: The machine that heard itself
subtitle: A conversation about building a thinking system   # Rendered as italic h3 below title
version: 2                                                  # Increment on major revisions
date: 2026-04-20                                            # ISO date, machine-readable
day: Sunday, 20. April, 2026                               # Human date → rendered in .header-details
location: Da Nang                                           # Geography → rendered in .header-details
duration: "16:46"                                           # Rendered as "16:46 min"
participants: [Name One, Name Two]                          # Rendered as "Name One + Name Two"
languages: [vi, de, en]                                     # Rendered as "vi · de · en"
published_by: nhan                                          # Rendered as "Published by nhan"
```

### Privacy & consent fields

```yaml
consent_required: [Name One, Name Two]
consent_given: []                    # Move names here once consent is obtained
share_status: private                # private | friends | public
gdrive_url: PENDING                  # Link to source in G-Drive, or PENDING
source_audio: "1M/filename.m4a"      # Path to the original audio
transcript_path: "1M/filename.transcript.md"
```

### AI-indexing fields (metadata only, not rendered)

```yaml
significance: 8                      # 1–10 importance ranking for AI triage
meisterwerk: true                    # Special flag: this is a masterwork
emotional_register: wonder           # Tonal metadata: wonder, grief, joy, tension...
transcription_engines: [iphone-apple-notes, groq/whisper-large-v3-turbo]
```

### Consilium / dialogue-specific fields

```yaml
envelope:
  written_at: 2026-04-19T12:00:00+07:00
  human_date: "Danang, Sunday 19. April, 2026"
  author: dreamteam
  location: 2M/_Consilium/
ConTags: [knowledge-organization, vault-architecture, gessner]   # Secondary content indexing
roster: [gessner, luhmann, locke, davinci, hemingway, eco]       # Voices in the dialogue
```

### Rendering rule ("The Bridge")
All fields listed under "Standard fields" above are rendered by `note.njk` as a single `.header-details` line in monospace font. The order is: `day · location · duration · participants · languages · Published by [published_by]`. Write the field; the template builds the sentence.

---

## 4. Interlinks & Navigation

### Wikilinks are preferred over hardcoded paths

Use `[[Note title]]` always. Never use relative Markdown paths (`../folder/note.md`) unless there is no alternative.

**Why:** Wikilinks survive renames. The Digital Garden plugin resolves them at publish time. Hardcoded paths break silently; wikilinks fail loudly and are easy to audit.

### Tags (`tags` vs. `ConTags`)

| Field | Purpose | Rendered in UI? |
|---|---|---|
| `tags` | Broad categorical labels (conversation, transcript, private, meisterwerk) | Yes — orange pill row in header |
| `ConTags` | Content-level discovery tags for AI and human search (topic, concept, name) | No — metadata only |

Use `tags` for what a human would filter by. Use `ConTags` for what an AI would search by.

### Backlinks, local graph, TOC

These are generated automatically in the right sidebar (240px). You do not need to maintain them manually. The sidebar components read the Eleventy collection and compute backlinks at build time.

### Orphaned notes

An orphaned note (no backlinks, no internal wikilinks) is not necessarily a problem. It may be early in its marination period. Mark it with `tags: [open-path]` if you want to revisit it, but do not force a connection just to remove the orphan status.

---

## 5. AI-Readable Optimization & Token Efficiency

This section describes how to structure notes so that AI tools (Claude, Cursor, any LLM) can process them efficiently without wasting tokens on noise.

### Frontmatter as structured index

Every frontmatter field is parseable as structured data. Before reading the body of a note, an AI should read the frontmatter to determine:
1. Is this worth reading? (`significance`, `tags`, `meisterwerk`)
2. What layer is this? (`permalink` path reveals `0M/`, `1M/`, `2M/`)
3. Who spoke, when, in what languages? (`participants`, `day`, `languages`)
4. Is it published? (`dg-publish`, `share_status`)

A well-written frontmatter lets the AI skip reading the body entirely for triage tasks.

### Prefer explicit fields over implicit prose

Bad (forces AI to parse prose):
```
This conversation happened on a Sunday in April in Da Nang between Nhan and Simone.
```

Good (machine-readable, also rendered for humans):
```yaml
day: Sunday, 20. April, 2026
location: Da Nang
participants: [Nhan, Stiefel Simone]
```

### Use significance scores for prioritization

When asking an AI to review multiple notes, it should read `significance` first and triage accordingly:
- `significance: 9–10` → read fully, respond carefully
- `significance: 6–8` → skim body, respond to substance
- `significance: 1–5` → frontmatter only unless specifically asked

### ConTags for search surface

`ConTags` are written for AI search, not human browsing. Include concept names, person names, topic clusters. This allows a future AI session to run `grep ConTags: order-chaos` across the vault and find all relevant notes without reading them.

### Sidecar `.notes.md` pattern

For any 0M file you want to annotate without touching the original:
1. Create `filename.notes.md` alongside `filename.ext`
2. Open with a YAML block referencing the source
3. Write your observations, questions, AI analysis below

```yaml
---
source: "0M/x/incoming/call-transcript.md"
annotated_by: laila
date: 2026-04-20
---
```

This keeps 0M sacred and makes annotations independently searchable.

### Design-log as Next-AI Preface

The file `docs/design-log.md` begins with a **Next-AI Preface** section — a compact, immutable specification of design decisions. Any AI starting a new session should read this section first. It is written to be parsed in under 500 tokens. Do not expand it; it is intentionally terse.

### Cost-tier routing for AI tasks

| Complexity | Model | Use for |
|---|---|---|
| Low | Haiku 4.5 | Frontmatter fixes, slug generation, formatting, tag suggestions |
| Recommended | Sonnet 4.6 | Drafting, editing, analysis, most vault operations |
| High | Opus 4.7 | Architecture decisions, philosophical dialogue synthesis, design changes |

Always start at Haiku and escalate only if the task genuinely requires it.

---

## 6. Naming Conventions

### File names

- **Conversation/transcript notes:** `YYYY-MM-DD-slug-with-hyphens.md`
- **Dialogue notes with time:** `YYYY-MM-DD — Descriptive Title.md` (em-dash with spaces for human readability)
- **Consilium notes:** `YYYY-MM-DD_slug-topic.md`
- **Plans/working docs:** `YYYY-MM-DD-slug.md` in `docs/plans/`
- **Sidecar files:** `original-filename.notes.md`

### Slugs

- Lowercase, hyphens only, no underscores (underscores reserved for `_Collection` folder names)
- English preferred for URLs even if note is multilingual
- Keep slugs stable — they become permalinks

### Folder names

- `_FolderName` — published collection (appears at `2M/_FolderName/`)
- `0M/`, `1M/`, `2M/` — layer prefixes
- `x/incoming/` — within 0M, for raw incoming captures

---

## 7. Hero Images

Every published note in `2M/` should have a hero image directly below the heading block.

### Standard

```markdown
![Descriptive alt text](URL or /img/path/filename.jpg)
```

### Decision tree

1. **Personal photo (from a call, a place, a moment):** Download from G-Drive → commit to `src/site/img/user/` → use relative path in note.
2. **Generic stock photo:** Use an Unsplash URL directly. Unsplash URLs are permanent and publicly cached.
3. **Placeholder:** Use any Unsplash URL temporarily. Mark the note with `hero_status: placeholder` in frontmatter so it is easy to find and replace later.

### What not to do

- Do not download Unsplash images to the repo when a URL works fine.
- Do not use Getty, Shutterstock, or other paywalled sources.
- Do not leave notes without a hero image in `2M/` — it breaks the visual rhythm of the garden.

---

## 8. The Dream Team / Kaizen 3 Methodology

This is the system for generating philosophical dialogues and multi-perspective analysis.

### Structure

A Dream Team session has three rounds:
1. **Express:** Each voice states its position in complete isolation. No awareness of others. Pure perspective.
2. **Build:** Voices hear each other's express statements and may adjust, add, or challenge. Dialogue begins.
3. **Golden Path:** Synthesis. Actionable moves. The team converges on what to do next — not unanimously, but usably.

### Roster

The default team includes: Einstein, Buddha, DaVinci, Hemingway, Eco, Luhmann, Gessner, Locke (and others as invited). Nhan can expand the team inline at any time:

> "Guys — please add Seneca to hashtag Dream Team. In all Kaizen 3 rounds. Hashtag Kaizen 3."

This gets captured in the transcript, parsed by AI, and applied going forward.

### Frontmatter for Kaizen 3 / Consilium notes

```yaml
roster: [gessner, luhmann, locke, davinci, hemingway, eco]
tags: [kaizen3, consilium, topic]
ConTags: [specific-concept, person-name]
significance: 9
emotional_register: wonder
envelope:
  author: dreamteam
```

---

## 9. Consent & Privacy

Every conversation note must include consent tracking. This is not optional.

```yaml
participants: [Name One, Name Two]
consent_required: [Name One, Name Two]
consent_given: []        # Add names here when consent is confirmed
share_status: private    # Change to public only when all consent_required names are in consent_given
```

A note with `share_status: private` should never be published with `dg-publish: true`. If you find this combination, flag it immediately and do not publish.

The `share_status` states are:
- `private` — visible only to vault owner
- `friends` — shareable via direct link (jotbird or equivalent)
- `public` — published to the garden

---

## 10. Open-Path Marking (Not Failure)

When a file is unprocessed, a URL is inaccessible, a connection has not been made yet, or a transcription is incomplete — do not mark it as failed or broken.

Mark it: `tags: [open-path]`

**Why:** The path not yet walked is a resource, not a problem. The open-path tag makes it findable. A monthly review of `#open-path` items is a gift — a set of invitations waiting to be accepted.

**What not to do:**
- Do not set alarms or reminders on open-path items. Urgency is the enemy of reverence.
- Do not auto-close or auto-archive dormant files. The unexplored is not the unimportant.

---

## 11. Monthly Review Rituals

### Dark Matter Sweep

Run this once a month. Sort all notes by `last_access` ascending. Flag the top 10 as **dark matter** — files that have not been opened in 90+ days.

These are not failures. They are the 7/8 below the surface. Review them as a gift, not a backlog. Ask: *Why hasn't this been opened? What was waiting in it that I wasn't ready for?*

### Open-Path Review

Grep for `open-path` across all layers. For each result, ask: *Is this still an open path I want to walk? If not, close it explicitly. If yes, begin.*

### Scale Check

Ask yourself: *Can I describe this vault in 30 seconds?* If no, the vault has grown beyond the scale of the person. This is Locke's warning. Do not add more structure. Remove complexity until the answer is yes.

---

## 12. Documentation Standards

All non-published documentation lives in `docs/` at the root of the vault. It is never in `src/site/notes/` and never published to the garden.

### Required docs files

| File | Purpose |
|---|---|
| `docs/design-log.md` | Living record of design decisions, milestones, the Next-AI Preface, Q&A |
| `docs/obsidian-setup.md` | CSS snippet, theme settings, Style Settings config for Obsidian authors |
| `docs/plans/YYYY-MM-DD-slug.md` | Task plans for AI sessions (context, steps, cost tiers, commit strategy) |
| `docs/vault-system-prompt.md` | This file. The canonical system briefing. |

### Design-log structure

```
# Design Log
## Next-AI Preface (immutable, < 500 tokens)
## Milestones (append-only)
## V-current Stable State (what is locked)
## V-next In Progress (what is being changed)
## Principles (why decisions were made)
## Mistakes & Fixes (what went wrong and how)
## Open Questions & Answers (resolved Q&A)
```

### Plan file structure

```
# Task Name
## Context (why this task exists)
## Exploration Notes (what was found)
## Plan (numbered steps)
## Critical Files (exact paths)
## Cost Estimate (Haiku / Sonnet / Opus ranges)
## Commit Strategy (one commit per concern)
## Verification Steps (how to confirm success)
## Resume Instructions (checkbox tracking for interrupted sessions)
```

---

## 13. Design & Styling (Locked)

These values are locked. Do not change them without updating `docs/design-log.md` and incrementing the milestone.

### Typography

| Role | Font | Size | Weight | Line height |
|---|---|---|---|---|
| Body | IBM Plex Serif | 17px | 400 | 1.84 |
| Headings | IBM Plex Sans | scaled | 300 | — |
| Meta / labels | IBM Plex Mono | 0.8rem | 400 | — |

### Color Palette

| Token | Light | Dark |
|---|---|---|
| Background | `#f5ecd7` (parchment) | `#1c1a18` |
| Borders | `#d8cbb0` | `#383028` |
| Accent | `#C85A18` (Hermès orange) | `#E07030` |
| Meta text | `#6a6058` | — |
| Meta bg | `#ede0c8` | — |

### Layout (golden ratio)

```
370px sidebar + 30px gap + 600px content + 30px gap + 240px right sidebar = 1270px total
```

### `.header-details` pill

- Font: IBM Plex Mono
- Color: `#6a6058` text on `#ede0c8` background
- Do NOT use `<code>` tags — use CSS class only. This is a deliberate semantic choice. LLMs read YAML equally; the tag would imply machine output when the content is human metadata.

### Tag pills

- Hover state: Hermès orange 80% solid background with white text
- Default state: light tint of parchment palette

---

## 14. Glossary

| Term | Meaning |
|---|---|
| **0M / 1M / 2M** | Three-layer stratification: Raw / Processing / Published |
| **The Bridge** | The principle that YAML is machine truth and templates render human prose |
| **Consilium** | A philosophical dialogue written from the perspective of multiple historical minds |
| **ConTags** | Content-level discovery tags for AI search, not rendered in UI |
| **Dark Matter** | Files untouched for 90+ days — the most important, often unread material |
| **Dream Team** | The assembled council of minds used in Kaizen 3 sessions |
| **dg-publish** | Frontmatter flag that tells the Digital Garden plugin to include this note in the build |
| **Hermès Orange** | The accent color `#C85A18` — constrained, warm, decisive |
| **Kaizen 3** | The three-round Dream Team methodology: Express → Build → Golden Path |
| **Laila** | The AI assistant identity operating within this vault |
| **Marination** | The deliberate waiting period between capture and connection |
| **Meisterwerk** | A masterwork note — highest significance, carefully composed |
| **Next-AI Preface** | The opening section of design-log.md: a < 500 token brief for any new AI session |
| **Open-Path** | A tag for unfinished or unprocessed items — a gift, not a failure |
| **Sidecar** | A `.notes.md` file that annotates a 0M original without modifying it |
| **Significance** | A 1–10 frontmatter field for AI triage prioritization |

---

*This document is maintained in `docs/vault-system-prompt.md`. It is not published to the garden. Update it when principles change — not before, and not after.*
