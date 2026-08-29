---
layout: note
title: "Mobile Antenna Design Notes #2: The Ground Is Not Just Ground"
permalink: /posts/02-the-ground-is-not-just-ground/
series: mobile-antenna-design
chapter: 2
summary: "How a finite handset ground supports characteristic currents and participates in radiation."
topics:
  - characteristic modes
  - chassis current
  - finite ground plane
published: true
date: 2026-06-08 21:28:53 +0900
---
<nav class="article-toc" aria-labelledby="article-toc-title" markdown="1">
<p class="article-toc__title" id="article-toc-title">On this page</p>

* TOC
{:toc}
</nav>

> **Core idea**  
> At RF, the handset ground is a finite conducting body with its own current distributions. It can carry a large part of the radiating current.

---

## 1. Why the Word “Ground” Can Be Misleading

In a circuit diagram, ground is a reference node. This is a useful approximation at low frequency. A handset PCB ground at RF is different. It has finite dimensions, cutouts, vias, screws, shield cans, frame contacts, and nearby metal structures.

The complete PCB ground cannot be treated as one lumped equipotential node at RF. Surface current and charge vary with position, and the conducting body participates in the electromagnetic problem.

<div class="table-scroll" tabindex="0" role="region" aria-label="Circuit and antenna viewpoints of ground" markdown="1">

| Viewpoint | Meaning of “ground” |
|---|---|
| Circuit view | Reference node for voltage and current |
| Antenna view | Finite conducting body that supports surface current and radiation |

</div>

Not every part of the ground radiates equally. The relevant point is that the structure supports specific current distributions, and some of them are useful radiating modes in the target band.

---

## 2. A Finite Ground Has Natural Current Distributions

Consider a simple **150 mm × 80 mm** rectangular conducting plate. As its electrical size increases, standing-wave-like surface-current distributions can appear.

For a simplified fundamental long-axis mode:

- the longitudinal surface-current magnitude is largest near the center;
- current decreases toward the short ends;
- surface charge and the associated fringing electric field are stronger near the ends.

<figure class="technical-figure">
  <picture tabindex="0">
    <source srcset="/figures/fig2_1.svg" type="image/svg+xml" />
    <img src="/figures/fig2_1.png" alt="Conceptual rectangular handset ground with longitudinal surface current strongest near the center and surface-charge or fringing-electric-field regions near the ends, followed by normalized one-dimensional current and charge proxy curves." width="2410" height="1840" loading="lazy" />
  </picture>
  <figcaption class="figure-caption">Fig. 2-1. First-order picture of the fundamental long-axis mode of a finite rectangular ground. The curves are conceptual and are not characteristic-mode simulation results.</figcaption>
</figure>

The same plate also supports higher-order and transverse modes. In a product, the battery, display, frame, and contacts perturb these modes. The simplified plate is still useful because it shows that the current maximum and electric-field maximum can occur at different locations.

---

## 3. What It Means to “Use the Ground”

When a handset antenna uses the ground, the ground is more than a return path. The feed structure drives current on the finite PCB ground or chassis, and that current contributes to radiation.

Changing the PCB length, frame contacts, shield cans, screws, or flex routing changes the current path. More precisely, the characteristic currents and their eigenvalue trajectories change. The antenna geometry may remain the same, but the complete antenna response does not.

---

## 4. TCM and CMA

The **theory of characteristic modes (TCM)** represents the surface current on a conducting body as a weighted sum of characteristic currents. Applying the method to a specific structure is commonly called **characteristic mode analysis (CMA)**.

For a perfectly conducting body, each characteristic mode has:

- a characteristic current distribution, \(J_n\);
- an eigenvalue, \(\lambda_n\), or the corresponding characteristic angle;
- a modal far field;
- a source-independent resonance behavior.

The **modal significance**

\[
\mathrm{MS}_n = \left|\frac{1}{1+j\lambda_n}\right|
\]

is a source-independent indicator of how close a mode is to resonance. It does not tell us whether a particular feed excites that mode strongly.

Feed coupling is described by a **modal excitation coefficient**. The driven modal weight also includes the eigenvalue term. Depending on the formulation and software, this result is reported as a modal weighting coefficient or modal expansion coefficient.

Therefore:

> A resonant characteristic mode is available for excitation, but it may still have a small weight in the driven antenna current if the feed position or orientation is poor.

<figure class="technical-figure">
  <picture tabindex="0">
    <img src="/figures/fig2_2.png" alt="Actual simulated characteristic-current distributions for the first three modes of a 30 millimeter by 150 millimeter rectangular conducting plate, shown with their modal-significance curves." width="2200" height="1350" loading="lazy" />
  </picture>
  <figcaption class="figure-caption">Fig. 2-2. Characteristic currents and modal significance of a 30 mm × 150 mm rectangular ground. This is actual simulation data from the author’s dissertation and uses a different geometry from the 150 mm × 80 mm conceptual example above. Source: M.-G. Kim, Ph.D. dissertation, Hanyang University, 2020, Figs. 2.2 and 2.3.</figcaption>
</figure>

---

## 5. A Useful Design Sequence

CMA is useful when it changes the order of the design work. Instead of starting only from an antenna name, first inspect the conducting structure:

1. Define the PCB ground, frame, display metal, and important contacts.
2. Identify characteristic modes near the target band.
3. Check the characteristic current and field distribution of each candidate mode.
4. Select a feed location and geometry with a high modal excitation coefficient.
5. Verify the driven current, radiation efficiency, and user-loading sensitivity with the complete product model.

Modal significance alone is not a feed-design metric. A mode with high modal significance can remain weak in the driven result.

---

## 6. How Far Can the Rectangular-Plate Model Be Used?

A 150 mm conductor is close to a half wavelength around 1 GHz in free space. The actual chassis-mode frequency of a handset is shifted by its width, nearby dielectrics, frame, display, battery, and boundary conditions. The simple length estimate is therefore only a starting point.

It is still useful for two reasons:

- it indicates why a long-axis chassis mode often matters around the upper low band and low-GHz region;
- it separates the current maximum from the charge and fringing-electric-field maxima.

The full-wave product model is required for final frequencies and current paths.

---

## 7. Practical Observations

This viewpoint explains several common results:

- **Good S11, poor efficiency:** the port is matched, but the accepted power is dissipated or does not drive a strong radiating current distribution.
- **Same element, different board:** the characteristic currents and feed coupling are different.
- **Frame contact sensitivity:** a contact changes the current path and modal response.
- **Strong location dependence:** feed position changes the modal excitation coefficient and modal weighting.

---

## 8. Key Message

> The handset ground is a finite resonant conductor. CMA identifies the available characteristic currents, while the feed determines which of those modes appear in the driven antenna current.

---

## Next Chapter Preview

Chapter 3 discusses feed placement and two established coupling-element concepts: **capacitive coupling elements (CCE)** and **inductive coupling elements (ICE)**.
