---
layout: note
title: "Mobile Antenna Design Notes #1: Why Mobile Antenna Design Is Difficult"
permalink: /posts/01-why-mobile-antenna-design-is-hard/
series: mobile-antenna-design
chapter: 1
summary: "Why a handset antenna must be designed together with the finite PCB ground, chassis, and nearby conductors."
topics:
  - mobile antennas
  - RF constraints
  - device integration
published: true
date: 2026-05-25 17:25:04 +0900
---
<nav class="article-toc" aria-labelledby="article-toc-title" markdown="1">
<p class="article-toc__title" id="article-toc-title">On this page</p>

* TOC
{:toc}
</nav>

> **Core idea**  
> A handset antenna is not an isolated radiator. Its performance depends on the complete conducting structure of the product.

---

## 1. From a Textbook Model to a Handset

<figure class="technical-figure">
  <picture tabindex="0">
    <source srcset="/figures/fig1_1-720w.webp 720w, /figures/fig1_1-1200w.webp 1200w" type="image/webp" />
    <img src="/figures/fig1_1.png" alt="Side-by-side comparison of an idealized antenna model and a mobile device in which the antenna interacts with the finite PCB ground, chassis, and nearby conductors." width="1672" height="941" loading="lazy" />
  </picture>
  <figcaption class="figure-caption">Fig. 1-1. An isolated antenna model and a handset antenna system. In a mobile device, the antenna operates together with the finite PCB ground, frame, display, battery, and nearby conductors.</figcaption>
</figure>

Introductory antenna theory usually starts with clean structures:

- a dipole in free space
- a monopole over an infinite ground plane
- a patch antenna over a sufficiently large ground plane

These models are useful because they isolate the main physics. A real handset is different. The antenna is close to the battery, display, shield cans, frame, flex cables, and other antennas. These structures change the current path, input impedance, loss, and radiation pattern.

The practical design object is therefore not only the small antenna element. It is the combined antenna, PCB ground, chassis, and nearby metal structure.

---

## 2. The First Constraint: Electrical Size

At cellular and sub-6 GHz frequencies, the available antenna volume is small compared with the wavelength.

<div class="table-scroll" tabindex="0" role="region" aria-label="Wavelength and handset-size comparison" markdown="1">

| Frequency | Free-space wavelength | Half wavelength | Practical implication |
|---:|---:|---:|---|
| ~900 MHz | ~33 cm | ~16 cm | Comparable to the length of a handset |

</div>

The antenna clearance in a product may be only a few millimeters or a few centimeters. This is not only a packaging problem. As the electrical size decreases, stored reactive energy becomes large relative to radiated energy. The radiation Q increases, and wide impedance bandwidth becomes harder to obtain.

<figure class="technical-figure">
  <picture tabindex="0">
    <source srcset="/figures/fig1_2.svg" type="image/svg+xml" />
    <img src="/figures/fig1_2.png" alt="Logarithmic plot of the single-mode Chu reference Q equal to one over ka cubed plus one over ka, increasing rapidly as electrical size ka decreases." width="2170" height="1315" loading="lazy" />
  </picture>
  <figcaption class="figure-caption">Fig. 1-2. Canonical single-mode Chu reference for an antenna enclosed by a sphere of radius <em>a</em>. The curve shows the rapid increase of radiation Q as <em>ka</em> becomes small. It is a theoretical reference, not measured handset data.</figcaption>
</figure>

Miniaturization therefore involves a tradeoff among size, impedance bandwidth, radiation efficiency, and loss sensitivity. The exact tradeoff depends on the antenna structure and loss mechanisms; a high Q by itself does not define the radiation efficiency.

Compact handset antennas use many structures, including IFA, PIFA, loop, slot, monopole-like branches, and non-resonant coupling elements. The antenna name alone does not explain how the complete handset radiates.

---

## 3. The PCB Ground Is a Finite Conductor

A handset does not have an infinite ground plane. Its PCB ground has finite length and width, cutouts, vias, screws, shield cans, frame contacts, and nearby metal parts. At RF, the surface current is nonuniform and the conducting body can support resonant current distributions.

For many low-band handset designs, a large fraction of the radiating current flows on the PCB ground, frame, or other large conductors. It is therefore misleading to analyze the small element as if it were independent of the chassis.

This statement is frequency- and structure-dependent. At higher frequencies, local antenna structures and higher-order chassis modes can also become important.

---

## 4. The Antenna Element as a Feed or Coupling Structure

The antenna element has two related roles:

1. it carries current and radiates locally;
2. it feeds or couples to current distributions on the finite chassis.

In the following chapters, these natural current distributions will be discussed using characteristic modes. For now, the useful mental model is simple:

> In many handset designs, the small antenna element drives a larger current distribution on the PCB ground or chassis.

The result depends on the feed location, shorting point, gap, loading components, clearance, and the surrounding conductors.

---

## 5. Why Placement Changes the Result

The same antenna geometry can behave differently when it is moved to another location on the same board. The input impedance, bandwidth, efficiency, and radiation pattern can all change.

The reason is not only the local clearance. The antenna sees a different electromagnetic boundary condition and a different part of the chassis-mode field distribution.

<figure class="technical-figure">
  <picture tabindex="0">
    <source srcset="/figures/fig1_3.svg" type="image/svg+xml" />
    <img src="/figures/fig1_3.png" alt="Two identical finite handset grounds showing the same simplified long-axis chassis mode. The same compact source is placed near a short end in one panel and near the middle of a long edge in the other." width="2710" height="1016" loading="lazy" />
  </picture>
  <figcaption class="figure-caption">Fig. 1-3. The same source placed at two locations relative to the same chassis mode. The modal distribution is unchanged; only the source location changes.</figcaption>
</figure>

A matching network may still produce a good return loss at a poor location. That does not guarantee that accepted power is radiated efficiently.

---

## 6. The Practical Design Object

For many low-band and sub-1 GHz handset antennas, it is useful to think in terms of the combined structure:

<div class="code-scroll" tabindex="0" role="region" aria-label="Components of the handset antenna system">
<pre><code>antenna element
+ PCB ground
+ frame and nearby conductors
+ matching and tuning components
+ user loading
= handset antenna system</code></pre>
</div>

This does not reduce the importance of the antenna element. It changes the design question. Instead of asking only how to resonate a short metal trace, we also ask which chassis current distribution is being driven and how much loss is introduced along that path.

---

## 7. Frequency Dependence

The relative contribution of the element and the chassis changes with electrical size.

At low frequencies, the antenna clearance is electrically small and the finite PCB ground or frame often carries a substantial part of the radiating current. As frequency increases, the element, local metal structures, and higher-order chassis modes can all be electrically significant. At mmWave frequencies, the design emphasis shifts toward individual elements, arrays, beamforming, and blockage.

There is no single frequency where the chassis suddenly stops participating. The better question is:

> Which conductors and current modes are electrically significant in this band?

---

## 8. Matching Is Not Radiation Efficiency

Return loss describes the power reflected at the feed port. Radiation efficiency describes the fraction of accepted power that is radiated rather than dissipated. Total efficiency includes both mismatch and radiation loss.

This distinction explains several common observations:

- the same antenna can have different efficiency on two boards with similar S11;
- a frame contact can improve one band and degrade another;
- a lossy matching network can broaden S11 while reducing radiation efficiency;
- moving the antenna can change efficiency even after the input match is restored.

---

## 9. Questions to Ask During Design

In addition to the usual resonance and matching questions, ask:

- Which conducting parts carry the radiating current?
- Which chassis or ground mode is close to the target band?
- Does the available feed location couple to that mode?
- Is the driven current distributed over a useful radiating path or concentrated in a lossy local region?
- What changes when the display, frame, battery, or hand is included?

These questions provide the basis for the next chapters.

---

## Key Takeaways

- Handset antennas operate under severe electrical-size and packaging constraints.
- The PCB ground, frame, and nearby conductors are part of the radiating system.
- Antenna placement changes the coupling to chassis current distributions.
- A good input match does not guarantee high radiation efficiency.
- For many low-band designs, the correct design object is the combined antenna–chassis structure.

---

## Preview of the Next Chapter

Chapter 2 introduces the natural current modes of a finite conducting body and the basic terminology of characteristic mode analysis.
