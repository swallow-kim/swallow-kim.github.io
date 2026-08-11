---
layout: page
title: About
permalink: /about/
eyebrow: Profile
description: Engineering background and focus of Min-Gi Kim, an RF systems engineer working across antennas, RF systems, and modem receiver algorithms.
wide: true
---

{% assign profile = site.data.profile %}

<section class="about-intro prose">
  <p class="lead">My work began with compact and multiband mobile antennas, expanded into adaptive impedance tuning and transmitter-algorithm validation, and now includes UWB receiver digital-front-end development and link-level simulation.</p>
  <p>Across these areas, the common thread is turning physical RF behavior into models, algorithms, measurement methods, and robust implementations. I am most interested in the boundaries between disciplines: how electromagnetic behavior becomes a system effect, how that effect appears in receiver performance, and how algorithms survive hardware constraints.</p>
</section>

<section class="career-path" aria-labelledby="career-path-title">
  <header class="section-heading">
    <div>
      <p class="eyebrow">Professional narrative</p>
      <h2 id="career-path-title">From antennas to receivers</h2>
    </div>
    <p>A progression toward problems that connect physics, algorithms, measurement, and implementation.</p>
  </header>
  <ol class="career-path__list">
    <li>
      <p class="career-path__index">01 · Antennas</p>
      <h3>Electromagnetic behavior in products</h3>
      <p>My foundation is a Ph.D. in Electronics & Computer Engineering from Hanyang University, focused on compact and multiband mobile antennas under Prof. Hyeongdong Kim. I later applied that work to commercial mobile, wearable, wireless-module, and IoT antenna development.</p>
      <p>The broader compact-mobile-antenna research project was selected among Korea's Top 100 R&D Achievements in 2015.</p>
    </li>
    <li>
      <p class="career-path__index">02 · RF systems</p>
      <h3>Algorithms connected to hardware</h3>
      <p>The work expanded into adaptive impedance tuning and wideband memory-DPD validation, connecting impedance models, tuner calibration and control, board-level RF benches, automated measurement, and system-level hardware-algorithm correlation.</p>
    </li>
    <li>
      <p class="career-path__index">03 · Modem receiver</p>
      <h3>Receiver behavior and implementation trade-offs</h3>
      <p>Current work includes UWB receiver algorithms and Rx digital front-end development, supported by C++ link-level simulation, configurable channel and CIR modeling, lab measurement, and Python/MATLAB engineering analysis.</p>
    </li>
  </ol>
</section>

<section class="about-details">
  <div class="about-details__panel">
    <p class="eyebrow">Engineering interests</p>
    <h2>Questions that cross boundaries</h2>
    <ul>
      <li>How antenna and RF behavior propagate into receiver performance</li>
      <li>How algorithms interact with hardware and product constraints</li>
      <li>How simulation and measurement can converge on an implementable model</li>
    </ul>
    <p class="profile-bio-ko" lang="ko">전자기적·RF 동작과 수신 알고리즘, 하드웨어 구현 사이의 연결을 이해하고 실제 무선 시스템에서 검증하는 문제에 관심을 두고 있습니다.</p>
  </div>
  <div class="about-details__panel">
    <p class="eyebrow">Verified public activity</p>
    <h2>Published technical work</h2>
    <p>The public <a href="{{ '/notes/' | relative_url }}">Engineering Notes</a> document practical antenna and RF-system reasoning. Source and supporting public work are available through <a href="{{ profile.github }}">GitHub</a>.</p>
  </div>
</section>

<section class="about-contact" aria-labelledby="about-contact-title">
  <p class="eyebrow">Contact</p>
  <h2 id="about-contact-title">Professional profiles and email</h2>
  {% include contact-block.html %}
</section>
