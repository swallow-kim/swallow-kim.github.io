---
layout: note
title: "Mobile Antenna Design Notes #4: Controlling Current Distribution and Chassis-Mode Coupling"
permalink: /posts/04-j-and-m-controlling-the-coupling-mechanism/
series: mobile-antenna-design
chapter: 4
summary: "How antenna geometry and reactive loading reshape surface current and change coupling to a handset chassis mode."
topics:
  - surface current
  - reactive loading
  - chassis-mode coupling
published: true
date: 2026-08-06 11:46:44 +0900
---
<nav class="article-toc" aria-labelledby="article-toc-title" markdown="1">
<p class="article-toc__title" id="article-toc-title">On this page</p>

* TOC
{:toc}
</nav>

## 1. Antenna Names Do Not Define the Current Distribution

PIFA, loop, slot, and monopole are useful topology names. They do not uniquely define the driven current distribution or the coupling to the chassis.

Two PIFAs can behave differently because of feed-to-short spacing, open-end capacitance, branch geometry, clearance, and frame coupling. Two loops can also have different current distributions because of loop area, gap position, loading components, and the surrounding ground.

For chassis-mode design, the more useful questions are:

- Where are the current maximum and minimum on the antenna element?
- How much current reaches the far end of the structure?
- Which chassis mode is excited by that current distribution?
- How much conductor and component loss is added?

---

## 2. Geometry and Reactive Loading

Increasing the current-path length, narrowing a trace, or adding a lumped inductor often increases the electrical length and inductive reactance in a given layout. The result is geometry-dependent. A narrow trace and a high-value inductor can also increase loss because of current crowding and finite component Q.

Capacitive coupling can be changed with an open plate, a parallel edge, a small gap, or a lumped capacitor. These changes redistribute current and stored electric energy. In some geometries, strong capacitive loading also lowers radiation resistance or increases tolerance sensitivity, but this is not a universal monotonic rule.

The practical point is that a reactive component does more than move the input resonance. It can change the current distribution and therefore the coupling to the chassis mode.

---

## 3. Loaded-Antenna Example

The example below is taken from the author’s dissertation. The ground plane is **50 mm × 115 mm**, and the antenna occupies a **5 mm × 25 mm** clearance at the top edge. A series inductor is placed near the feed, and a series capacitor is placed near the opposite end. The feed spacing \(D_f\) is adjusted for matching.

<figure class="technical-figure">
  <picture tabindex="0">
    <source srcset="/figures/fig4_1.svg" type="image/svg+xml" />
    <img src="/figures/fig4_1.png" alt="Reproduced line drawing of a 50 millimeter by 115 millimeter ground plane with a 5 millimeter by 25 millimeter top-edge antenna clearance, showing a series inductor near the feed, a series capacitor near the end, and feed spacing D sub f." width="2456" height="1585" loading="lazy" />
  </picture>
  <figcaption class="figure-caption">Fig. 4-1. Loaded-antenna geometry reproduced from the author’s dissertation, Fig. 2.12. The inductor and capacitor values are varied while the resonance is retuned near 800 MHz.</figcaption>
</figure>

All five cases were tuned near **800 MHz**. A small end capacitance allows little current to pass through the end point, giving a more monopole-like distribution. A larger end capacitance closes the current path more strongly and gives a more loop-like distribution.

This terminology describes the current distribution. It does not mean that one case is a pure monopole and the other is a pure loop.

---

## 4. Same Outline, Different Surface Current

Case #5 used a large series inductance and small end capacitance:

- \(L = 48.4\ \text{nH}\)
- \(C = 0.10\ \text{pF}\)
- more monopole-like current distribution

Case #1 used a small series inductance and large end capacitance:

- \(L = 0.10\ \text{nH}\)
- \(C = 1.07\ \text{pF}\)
- more loop-like current distribution

<figure class="technical-figure">
  <picture tabindex="0">
    <img src="/figures/fig4_2.png" alt="Original simulated surface-current magnitude at 800 megahertz for two loading cases of the same antenna outline. Case 5 has current decreasing toward the end and is more monopole-like; Case 1 has stronger current around the complete path and is more loop-like." width="2400" height="1080" loading="lazy" />
  </picture>
  <figcaption class="figure-caption">Fig. 4-2. Computed surface-current distributions at 800 MHz. The panels use the original thesis simulation output. Source: M.-G. Kim, Ph.D. dissertation, Hanyang University, 2020, Fig. 2.13.</figcaption>
</figure>

The antenna outline is nearly unchanged, but the surface current is not. This is the main result of the example: reactive loading changes the current path, and the new current path changes the coupling to the ground-plane characteristic mode.

---

## 5. Bandwidth Result and Its Limitation

The simulation, with no loss other than radiation, gave the following **−6 dB impedance bandwidths**:

- Case #1: 9.1 MHz
- Case #2: 9.2 MHz
- Case #3: 10.0 MHz
- Case #4: 11.9 MHz
- Case #5: 16.6 MHz

The measured −6 dB bandwidths were 10, 15, 25, 30, and 41 MHz, respectively.

<figure class="technical-figure">
  <picture tabindex="0">
    <source srcset="/figures/fig4_3.svg" type="image/svg+xml" />
    <img src="/figures/fig4_3.png" alt="Plot of minus 6 dB impedance bandwidth for five tuned loading cases near 800 megahertz. The lossless simulated bandwidth rises from 9.1 to 16.6 megahertz, and measured bandwidth rises from 10 to 41 megahertz as the distribution changes from more loop-like to more monopole-like." width="2290" height="1435" loading="lazy" />
  </picture>
  <figcaption class="figure-caption">Fig. 4-3. −6 dB impedance bandwidth for five loading cases tuned near 800 MHz. Data are replotted from Tables 2.5 and 2.6 of the author’s dissertation. The measured bandwidth includes conductor, dielectric, and component loss and must not be interpreted as radiation efficiency.</figcaption>
</figure>

The absolute measured bandwidth is much larger than the simulated bandwidth because the measurement includes additional losses. Loss can broaden the input match while reducing radiation efficiency. Therefore, the measured bandwidth alone is not proof of improved radiation performance.

The cleaner comparison is the simulation trend without conductor, dielectric, or component loss. In this geometry, the antenna is near an electric-field maximum of the dominant ground-plane mode. The more monopole-like current distribution gives stronger electric coupling, higher radiation resistance in the lossless model, and a wider simulated impedance bandwidth.

This conclusion is specific to the antenna location and target mode. Near a magnetic-field or current maximum, a loop-like distribution may provide stronger coupling.

---

## 6. Design Interpretation

The example gives a practical workflow:

1. Determine the target chassis mode and its local fields.
2. Choose an antenna outline that fits the clearance.
3. Use geometry and reactive loading to control the element current distribution.
4. Retune the resonance and input match.
5. Compare radiation resistance in the material- and component-loss-free model, not only S11 bandwidth.
6. Add realistic losses and compare radiation efficiency, total efficiency, component Q, tolerance, and user loading.

A matching network cannot fully compensate for a poor radiating current path. It can only transform the impedance presented at the feed.

---

## Key Message

> The antenna topology is only the starting point. Geometry and reactive loading set the surface-current distribution, and that distribution determines the coupling to the chassis mode.

---

## Next Chapter Preview

Chapter 5 moves from feed control to mode control: how the product structure can be modified when the useful chassis mode is at the wrong frequency.
