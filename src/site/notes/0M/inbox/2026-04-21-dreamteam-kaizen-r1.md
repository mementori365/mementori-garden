---
title: Dream team — Round 1 (kepano × Marginalian × Mementori)
date: 2026-04-21
day: Tuesday, 21. April, 2026
location: Da Nang (Nhan) · asynchronous / imagined
duration: "18:00"
participants:
  - Nhan
  - Claude (facilitator + scribe)
  - kepano (imagined — Steph Ango, CEO, Obsidian)
  - Maria Popova (imagined — editor, The Marginalian)
format: transcript · first-round kaizen convocation
tags:
  - kaizen
  - dreamteam
  - meeting
  - transcript
  - mementori
  - private
dg-publish: false
permalink: false
---

> **Note** — This is a *simulated* dream-team session. Nhan asked Claude to imagine what the people he admires would say about his situation and to transcribe it as a first-round kaizen meeting. The kepano and Maria Popova voices are faithful paraphrases of their public thinking, not real quotes. Use them as mirrors for your own decision-making, not as authority.

## Why we're meeting

Nhan is building **Mementori Garden** — a digital garden that publishes long-form conversations and notes as individual, beautifully presented web pages. The design north star is **themarginalian.org** (editorial, warm parchment, IBM Plex, yellow-marker H2). The publish pipeline is **Obsidian → Eleventy → Vercel**. The question for this round:

> *"If we merge kepano's functionality with our design, what would we receive? What would kepano himself say he'd do in our situation?"*

Tags: #kaizen #dreamteam

---

## Round 1 — Opening statements

### Nhan

I've spent hours chasing a background-colour regression. Every fix felt like it solved one thing and broke another. I want editorial beauty like The Marginalian, but with the **simplicity** and **durability** of the way the Obsidian CEO runs his own blog. I'm turning in circles. I need a team to see what I can't.

### Claude (facilitator)

Before we go round-the-room — two observations from the code audit today:
1. The CSS regression was a **specificity bug**, not a hosting bug. PR #10 fixes it. It lives on the preview URL, not on `mementori-garden.vercel.app` yet.
2. The repo is already set up to run on Netlify — `netlify.toml` is present with the correct build command. "Eliminating Vercel" is a 30-minute host-switch, not a rewrite.

Holding those in view. Over to kepano.

### kepano *(imagined)*

> *"You have too many moving parts. My rule for stephango.com is: every file is plain markdown, every URL is a file on disk, and every tool earns its place by proving it removes ambiguity — not by adding a feature."*

Three things I'd do in your situation:

1. **Keep the vault as the source of truth.** Not the template, not the plugin, not the host. The markdown files in `src/site/notes/` are the artefact. Everything else is replaceable.
2. **Reduce, don't add.** You have a filetree sidebar, a TOC sidebar, a backlinks card, a footer, a navbar, and a dark-mode switch. For long-form reading, most of that is noise. Start by *hiding* on mobile. Then ask whether each one earns its desktop screen-space.
3. **Host is a detail.** Netlify, GitHub Pages, Cloudflare Pages — they all serve static files. Pick whichever your DNS already points at and move on. The host should be invisible to you most weeks. If it isn't, that's the signal.

> *"File over app. The page should feel like it's just… there. Like you opened a book."*

I wouldn't rewrite your Eleventy setup. Jekyll on my site is a coincidence of when I started; the point is static files + markdown + Git. You have that.

### Maria Popova *(imagined)*

> *"Design is the silent ambassador of the idea. When the silence becomes noisy — bars, stripes, shimmering palettes — the idea gets lost."*

What I care about for this kind of content — conversations, transcripts, essays:

1. **Line length and vertical rhythm.** Your 720-pixel content column is close to right. Check that the baseline grid of the body (17 px × 1.84) actually aligns with the heading margins. If H2 margin-top is `2.5em` and H3 is `2em`, the rhythm is already broken on most screens — pick one multiple and stick to it.
2. **The yellow marker on H2 is a slow-reading cue.** Use it for *turns of thought*, not every heading. If every H2 glows, none do.
3. **Metadata as marginalia.** Day, location, duration, participants — these belong in the margin or the footer, not the spotlight. A mono-font pill is a good compromise, but keep it grey. Let the title breathe.
4. **Hero images are promises.** If you can't keep the promise (a local photograph, intentional), use none. An Unsplash URL is a rented promise. It will change on you.
5. **Dark mode is a courtesy, not a feature.** Readers in dark OS want the warmth preserved. Your `#e0dbd3` on `#1c1a18` is already kind. Don't over-engineer a toggle.

> *"What is beautiful is what rewards attention. Design the rewards."*

### Claude (facilitator)

Noted. Common ground emerging:
- **Durability**: plain files, small moving parts (both speakers).
- **Subtraction over addition**: hide before adding (kepano). One H2 highlight, not every (Maria).
- **Metadata is marginalia**: small, grey, mono (Maria), invisible host (kepano).
- **Keep the engine**: Eleventy is fine. Netlify or GH Pages is fine. It's below the fold.

---

## Round 2 — What would the merge look like?

### kepano *(imagined)*

> *"If I were handed this repo and told to make it feel like a single-author reading experience, I'd do five things in five days, one per day:"*

1. **Day 1:** Merge the dark-mode fix. Merge the Netlify pivot. Stop fighting hosts.
2. **Day 2:** On mobile, `display: none` on filetree AND sidebar. Single column. 100vw minus generous gutters. Reading only.
3. **Day 3:** Reading-time estimate in the header pill (beside duration). A conversation transcript with `48:11` and an estimated `14 min read` is a contract with the reader.
4. **Day 4:** Kill dead routes. Delete unused templates, unused callout styles, unused graph widget if you don't use it. Each deletion is a kaizen.
5. **Day 5:** No code. Write. Publish one new note. See what the system actually feels like when you use it.

### Maria Popova *(imagined)*

I would add a sixth day. **Day 6:** Typographic audit. Open the site in Firefox reader view. Compare. If Firefox's stripped-down reader is more enjoyable than your designed page, the design is in the way.

### Nhan

I think I can see it. What I thought was a Vercel problem was actually a *"too many tools for a one-person garden"* problem. The bars in dark mode were a symptom of specificity, which was a symptom of CSS that grew faster than I could audit it. Every iteration of "make it nicer" added without removing.

### Claude (facilitator)

Reframing the brief for Round 3 (next meeting):
- The question is not **"Vercel or Netlify?"**
- The question is not **"Jekyll or Eleventy?"**
- The question is **"What can I remove this week that makes the reading better?"**

That's kaizen in a line.

---

## Agreed kaizen actions (first week)

| # | Action | Owner | When | Reversible? |
| --- | --- | --- | --- | --- |
| 1 | Merge [[PR#10 dark-mode content column fix]] | Nhan | today | yes (revert commit) |
| 2 | Merge [[Netlify pivot PR]] | Nhan | today / tomorrow | yes |
| 3 | Point DNS to Netlify, disconnect Vercel project | Nhan (dashboard) | after #2 merges | yes (flip DNS back) |
| 4 | On mobile: hide filetree + right sidebar; single column | Claude / Sonnet session | this week | yes (one CSS rule) |
| 5 | Add **reading-time** estimate to `.header-details` pill | Claude / Sonnet session | this week | yes |
| 6 | Audit: list every CSS rule + template not used on "A call between friends" or "The machine that heard itself"; remove the clearly-unused | Claude | this weekend | yes (Git) |
| 7 | Firefox Reader-view comparison — write a 1-page verdict | Nhan | this weekend | N/A (journaling) |
| 8 | Write + publish **one new note** in the garden | Nhan | this week | yes |

**Rule of the round:** no new features until actions 1–6 are merged or consciously dropped.

---

## Parked for Round 2

- Should `0M/` and `2M/` vault folders be renamed to readable ones (e.g. `system/`, `garden/`)? kepano's bias: yes. Nhan's bias: the codes are personal time-horizons (0M = now, 2M = 2-month horizon). Keep as-is for now.
- A "reading order" — kepano suggests a simple Previous/Next link at the end of each garden note. Maria: or "If you liked this, read…". Parked for Round 2.
- Jekyll vs Eleventy — fully parked. Not in Round 2 either. The engine is invisible to readers; our time is better spent on the reading.

---

## Reflection (for Nhan — optional 5-minute journaling prompt)

1. What did I add this month that I couldn't defend today?
2. If a reader had 90 seconds on the homepage, what would I want them to take?
3. What's the smallest thing I could remove tomorrow that would make the site kinder to read?

---

## Meeting ends — next round

**Round 2** scheduled after actions 1–6 are merged (or consciously declined). Agenda seed:
- Review: what did removal reveal?
- Review: did the Firefox-reader comparison change my mind?
- Decide: Previous/Next reading order, yes/no.

Related:
- [[2026-04-19-a-call-between-friends]] — the target page that triggered this week's work
- [[docs/design-log]] — the locked design spec
- [[docs/plans/2026-04-21-m1-marginalian-polish]] — the M1 milestone that defined the current look

`#kaizen` `#dreamteam` · Scribed by Claude · Filed to `0M/inbox/` · Private (`dg-publish: false`)
