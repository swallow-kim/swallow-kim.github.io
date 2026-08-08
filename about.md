---
layout: page
title: About
permalink: /about/
eyebrow: Profile
description: Engineering background and focus of Min-Gi Kim, an RF systems engineer working across antennas, RF systems, and modem receiver algorithms.
---

{% assign profile = site.data.profile %}

<section class="about-profile">
  <h2>Engineering Background</h2>

  <p>
    I am an RF systems engineer whose work spans antennas, RF systems,
    modem receiver algorithms, and product-level wireless integration.
  </p>

  <p>
    My background began in mobile antenna research and antenna development
    for commercial products, then expanded into adaptive impedance tuning,
    model-based RF optimization, digital predistortion validation, and
    algorithm-to-hardware integration.
  </p>

  <p>
    Today, I work on receiver algorithms and Rx digital front-end development
    for UWB modems, using link-level simulation, lab measurements, and
    Python/MATLAB-based analysis to understand receiver behavior and
    implementation trade-offs.
  </p>

  <p>
    Across these areas, I am most interested in problems that sit between
    disciplines: how electromagnetic and RF behavior propagate into receiver
    performance, how algorithms interact with hardware constraints, and how
    models can be turned into robust solutions on real devices.
  </p>

  <p class="profile-bio-ko" lang="ko">
    안테나, RF 시스템, 모뎀 수신 알고리즘, 무선 기기 통합을 아우르는
    RF 시스템 엔지니어입니다. 전자기적·RF 동작과 알고리즘,
    하드웨어 구현 사이의 연결을 이해하고 실제 시스템에서 검증하는
    문제에 관심을 두고 있습니다.
  </p>
</section>

<section class="about-expertise">
  <p class="primitive-label">Engineering Focus</p>
  <ul class="expertise-list">
    {% for item in profile.expertise %}
      <li class="primitive-tag">{{ item }}</li>
    {% endfor %}
  </ul>
</section>

<section class="about-contact">
  <p class="primitive-label">Connect</p>
  {% include contact-block.html %}
</section>
