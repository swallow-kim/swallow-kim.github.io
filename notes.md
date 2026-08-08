---
layout: page
title: Notes
permalink: /notes/
---
<p class="lead">Technical field notes on mobile antenna systems, ground excitation, coupling mechanisms, and integration trade-offs.</p>

<section class="notes-series">
  {% assign series = site.data.series | first %}
  <header class="series-header">
    <h2>{{ series.title }}</h2>
    <p>{{ series.description }}</p>
  </header>
  
  <div class="series-progress">
    <div class="series-progress__label">
      <span>Series Progress</span>
      <span>{{ series.published_chapters }} of {{ series.total_chapters }} Chapters Published</span>
    </div>
    <ol class="series-progress__track">
      {% for i in (1..series.total_chapters) %}
        {% if i <= series.published_chapters %}
          <li class="series-progress__mark series-progress__mark--complete" title="Chapter {{ i }} Published">Chapter {{ i }}</li>
        {% else %}
          <li class="series-progress__mark" title="Chapter {{ i }} Upcoming">Chapter {{ i }}</li>
        {% endif %}
      {% endfor %}
    </ol>
  </div>

  <ul class="note-list">
    {% assign public_notes = site.notes | where: "published", true | sort: "chapter" %}
    {% for note in public_notes %}
      <li class="note-row">
        <span class="note-row__chapter">Ch. {{ note.chapter }}</span>
        <span class="note-row__title">
          <a href="{{ note.url | relative_url }}">{{ note.title }}</a>
        </span>
        <span class="note-row__meta">{% if note.date %}{{ note.date | date: "%b %d, %Y" }}{% endif %}</span>
        <span class="note-row__action">
          <a class="primitive-button" href="{{ note.url | relative_url }}">Read Note →</a>
        </span>
      </li>
    {% endfor %}
  </ul>
</section>
