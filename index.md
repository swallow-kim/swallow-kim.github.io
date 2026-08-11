---
layout: home
title: RF Systems Engineer
description: RF systems engineer working across antennas, RF systems, modem receiver algorithms, and wireless device integration.
---

{% assign profile = site.data.profile %}
{% assign selected_work = site.data.selected_work %}
{% assign public_notes = site.notes | where: "published", true | sort: "date" | reverse %}

<section class="home-section selected-work" aria-labelledby="selected-work-title">
  <header class="section-heading">
    <div>
      <p class="eyebrow">Selected engineering work</p>
      <h2 id="selected-work-title">Problems across the wireless signal chain</h2>
    </div>
    <p>Public-safe summaries of engineering domains, contributions, and working methods.</p>
  </header>

  <ol class="work-ledger">
    {% for work in selected_work %}
      <li class="work-card">
        <article>
          <p class="work-card__index">Area 0{{ forloop.index }}</p>
          <h3>{{ work.title }}</h3>
          <dl class="work-card__details">
            <div><dt>Problem domain</dt><dd>{{ work.domain }}</dd></div>
            <div><dt>Contribution</dt><dd>{{ work.contribution }}</dd></div>
            <div><dt>Method</dt><dd>{{ work.approach }}</dd></div>
          </dl>
          {% if work.evidence.url %}
            <p class="work-card__evidence"><a href="{{ work.evidence.url | relative_url }}">{{ work.evidence.label }}</a></p>
          {% else %}
            <p class="work-card__evidence work-card__evidence--unlinked">Public artifact not listed</p>
          {% endif %}
        </article>
      </li>
    {% endfor %}
  </ol>
</section>

<section class="home-section featured-notes" aria-labelledby="featured-notes-title">
  {% assign series = site.data.series | first %}
  <header class="section-heading">
    <div>
      <p class="eyebrow">Featured engineering notes</p>
      <h2 id="featured-notes-title">Recent public field notes</h2>
    </div>
    <p>{{ series.description }}</p>
  </header>
  {% include series-progress.html title=series.title complete=series.published_chapters total=series.total_chapters %}

  <ul class="note-list">
    {% for note in public_notes limit: 4 %}
      {% include note-row.html chapter=note.chapter title=note.title summary=note.summary date=note.date url=note.url %}
    {% endfor %}
  </ul>
  <p class="section-action"><a class="button" href="{{ '/notes/' | relative_url }}">View all Engineering Notes</a></p>
</section>

{% include publications.html items=site.data.publications %}

<section class="home-closing" aria-label="Engineering perspective and contact">
  <div class="home-closing__panel">
    <p class="eyebrow">Engineering perspective</p>
    <h2>Connecting behavior across layers</h2>
    <p>My focus is the connection between electromagnetic and antenna behavior, RF-system effects, receiver algorithms, and implementation verified through simulation and measurement.</p>
    <p><a href="{{ '/about/' | relative_url }}">Read the professional narrative</a></p>
  </div>
  <div class="home-closing__panel">
    <p class="eyebrow">Contact and profiles</p>
    <h2>Evaluate or get in touch</h2>
    {% include contact-block.html %}
  </div>
</section>
