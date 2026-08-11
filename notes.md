---
layout: page
title: Engineering Notes
permalink: /notes/
description: Engineering notes on antennas, RF systems, modem receiver algorithms, measurement, and practical wireless device engineering.
wide: true
---
<p class="lead prose">The complete public archive of technical notes on antennas, RF systems, modem receiver algorithms, measurement, and practical wireless device engineering.</p>

{% assign public_notes = site.notes | where: "published", true %}
{% for series in site.data.series %}
{% assign series_notes = public_notes | where: "series", series.id | sort: "chapter" %}
{% if series_notes.size > 0 %}
<section class="notes-series" aria-labelledby="series-{{ series.id }}">
<header class="series-header">
<div>
{% if series.domain %}<p class="eyebrow">{{ series.domain }}</p>{% endif %}
<h2 id="series-{{ series.id }}">{{ series.title }}</h2>
</div>
<p>{{ series.description }}</p>
</header>
{% include series-progress.html title=series.title complete=series.published_chapters total=series.total_chapters %}

<ul class="note-list">
{% for note in series_notes %}
{% include note-row.html chapter=note.chapter title=note.title summary=note.summary date=note.date url=note.url %}
{% endfor %}
</ul>
</section>
{% endif %}
{% endfor %}
