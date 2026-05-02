---
{"dg-publish":true,"permalink":"/2-m/garden/index/","title":"Mementori","tags":["gardenEntry"],"dg-note-properties":{"tags":["gardenEntry"],"title":"Mementori"},"templateEngineOverride":"njk,md"}
---


# Mementori

*A garden of conversations, philosophy, and thinking — built in Da Nang.*

---

## Consilium

Conversations between minds across time — philosophers, scientists, builders — on questions that matter.

- [Order vs. Chaos — Gessner, Luhmann, DaVinci, Hemingway, Eco](/notes/2M/_Consilium/2026-04-19-gessner-order-chaos/)

---

## Conversations

Records of real conversations — with listening links, full transcripts, and the right to delete.

{% for note in collections.publishedNotes | sort(true, false, "data.date") %}{% if "/2M/_Garden/" in note.filePathStem and note.data.title != "Mementori" %}
- [{{ note.data.title }}{% if note.data.subtitle %} — {{ note.data.subtitle }}{% endif %}]({{ note.url }})
{% endif %}{% endfor %}

---

*Mementori · Da Nang · [open source](https://github.com/mementori365/mementori-garden)*
