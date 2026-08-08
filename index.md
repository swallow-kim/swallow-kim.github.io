---
layout: home
title: RF Systems Engineer
description: RF systems engineer working across antennas, RF systems, modem receiver algorithms, and wireless device integration.
---

{% assign profile = site.data.profile %}

<section class="profile-section">
  <p class="primitive-label">Overview</p>
  <h2>RF Systems Engineering Across Antennas and Modems</h2>
  <p class="profile-bio">{{ profile.bio_en }}</p>
</section>

<section class="expertise-section">
  <p class="primitive-label">Expertise</p>
  <ul class="expertise-list">
    {% for item in profile.expertise %}
      <li class="primitive-tag">{{ item }}</li>
    {% endfor %}
  </ul>
</section>

<section class="series-section">
  {% assign series = site.data.series | first %}
  <header class="series-header">
    <p class="primitive-label">Featured Series</p>
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

<section class="perspective-section">
  <p class="primitive-label">Engineering Perspective</p>
  <h2>From Electromagnetic Behavior to Algorithms and Implementation</h2>
  <p>
    Modern wireless products rarely fit neatly within a single engineering
    discipline. Antenna and chassis behavior, RF and analog impairments,
    digital receiver processing, modem implementation, and platform
    constraints interact at the system level. My work focuses on connecting
    these layers—using physical understanding, models, simulation,
    measurement, and system-level debugging to turn observed behavior into
    implementable engineering solutions.
  </p>
</section>

<section class="contact-section">
  <p class="primitive-label">Contact & Profiles</p>
  {% include contact-block.html %}
</section>
