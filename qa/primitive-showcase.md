---
layout: default
title: RF Field Notes Primitive Showcase
permalink: /qa/primitive-showcase/
sitemap: false
robots: noindex, nofollow
---

{% include engineer-masthead.html title="RF Field Notes Primitive Showcase" eyebrow="QA only" context="Reusable primitives, responsive geometry, interaction states, and content-stress fixtures. This route is excluded from production builds." %}

<div class="showcase shell">
  <section class="showcase__section" aria-labelledby="showcase-header">
    <p class="eyebrow">Header and footer</p>
    <h2 id="showcase-header">Global landmarks</h2>
    <p>The live header and footer surrounding this page demonstrate labelled navigation, current state, 44px targets, and visible keyboard focus.</p>
  </section>

  <section class="showcase__section" aria-labelledby="showcase-notes">
    <p class="eyebrow">Note-list row</p>
    <h2 id="showcase-notes">Ledger rows and long-title stress</h2>
    <ul class="note-list">
      {% include note-row.html chapter="01" title="Why Are Mobile Antennas So Difficult?" url="/posts/01-why-mobile-antenna-design-is-hard/" summary="A concise summary tests the complete production row anatomy." meta="May 25, 2026" %}
      {% include note-row.html chapter="02" title="The Ground Is Not Just Ground" url="/posts/02-the-ground-is-not-just-ground/" summary="Ground plane, chassis current, and small-antenna behavior." meta="Jun 08, 2026" %}
      {% include note-row.html chapter="XX" title="A deliberately long technical heading that tests wrapping without clipping, overlap, fixed heights, or primary horizontal overflow at narrow widths" summary="Content stress verifies long labels and responsive reflow." meta="Unavailable" %}
    </ul>
  </section>

  <section class="showcase__section" aria-labelledby="showcase-progress">
    <p class="eyebrow">Series progress</p>
    <h2 id="showcase-progress">Published, current, and upcoming states</h2>
    {% include series-progress.html title="Mobile Antenna Design" complete=4 total=9 %}
  </section>

  <section class="showcase__section" aria-labelledby="showcase-article">
    <p class="eyebrow">Article shell and TOC</p>
    <h2 id="showcase-article">Long-form reading structure</h2>
    <div class="article-shell">
      <article class="article-shell__body">
        <nav class="article-toc" aria-labelledby="showcase-toc-title">
          <p class="article-toc__title" id="showcase-toc-title">On this page</p>
          <ol id="markdown-toc">
            <li><a href="#stress-heading">Long heading</a></li>
            <li><a href="#technical-data">Technical data</a></li>
            <li><a href="#contact-example">Contact</a></li>
          </ol>
        </nav>
        <h3 id="stress-heading">An intentionally long article heading about measuring coupled mobile-antenna behavior across constrained integration environments</h3>
        <p>This reading sample confirms the 60–75 character measure, Source Serif 4 body role, and natural wrapping under content stress. It also includes <a href="#technical-data">an inline link</a> so inline and control focus treatments can be distinguished.</p>

        {% include callout.html label="Engineering note" content="A callout uses a strong rule and the Surface token rather than a shadow, rounded container, or decorative color." %}

        <blockquote>
          <p>A block quotation remains readable at 200% zoom and preserves its semantic relationship to the surrounding discussion.</p>
        </blockquote>

        <figure class="technical-figure">
          <img src="{{ '/figures/fig1_1.png' | relative_url }}" width="1672" height="941" alt="Comparison of an isolated monopole and ground with a smartphone carrying distributed chassis current.">
          <figcaption class="figure-caption">Figure/caption primitive with explicit dimensions, square corners, and a bordered Surface reading field.</figcaption>
        </figure>

        <div class="table-scroll" id="technical-data" tabindex="0" aria-label="Scrollable technical data table">
          <table>
            <caption>Technical table overflow fixture</caption>
            <thead><tr><th scope="col">Frequency</th><th scope="col">Mode</th><th scope="col">Coupling</th><th scope="col">Observation</th></tr></thead>
            <tbody>
              <tr><td>700 MHz</td><td>Fundamental chassis mode</td><td>Electric-current coupling</td><td>The table scrolls locally when its intrinsic width exceeds the viewport.</td></tr>
              <tr><td>2.4 GHz</td><td>Higher-order mode</td><td>Magnetic-current coupling</td><td>Primary page content remains fixed to the viewport width.</td></tr>
            </tbody>
          </table>
        </div>

        <div class="code-scroll" tabindex="0" role="region" aria-label="Scrollable code sample">
          <pre><code>function sweep(frequencyStart, frequencyStop, samples) {
  return Array.from({ length: samples }, (_, index) =&gt; frequencyStart + index * ((frequencyStop - frequencyStart) / (samples - 1)));
}</code></pre>
        </div>
      </article>
    </div>
  </section>

  <section class="showcase__section" aria-labelledby="showcase-contact">
    <p class="eyebrow">Contact block</p>
    {% include contact-block.html %}
  </section>

  <section class="showcase__section" aria-labelledby="showcase-states">
    <p class="eyebrow">Interactive states</p>
    <h2 id="showcase-states">Default, hover, focus, active, and disabled</h2>
    <div class="showcase__states">
      <a class="button" href="#showcase-states">Default action</a>
      <a class="button" href="#showcase-states" autofocus>Focus target</a>
      <button type="button">Button state</button>
      <button type="button" disabled>Disabled action</button>
    </div>
    <p class="showcase__stress">Hover and active are exercised by browser automation; focus-visible is exercised through keyboard navigation. Disabled text and border use the Muted/Rule tokens and are not indicated by color alone.</p>
  </section>
</div>
