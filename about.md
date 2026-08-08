---
layout: page
title: About
permalink: /about/
---

{% assign profile = site.data.profile %}

<section class="about-profile">
  <h2>About Min-Gi Kim</h2>
  <p class="profile-bio-en">{{ profile.bio_en }}</p>
  <p class="profile-bio-ko" lang="ko">{{ profile.bio_ko }}</p>
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
