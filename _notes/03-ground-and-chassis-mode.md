---
layout: note
title: "Mobile Antenna Design Notes #3: How to Excite a Chassis Mode"
permalink: /posts/03-ground-and-chassis-mode/
series: mobile-antenna-design
chapter: 3
summary: "How feed position, orientation, and coupling-element geometry determine the excitation of a handset chassis mode."
topics:
  - modal excitation
  - capacitive coupling element
  - inductive coupling element
published: true
date: 2026-08-06 11:46:44 +0900
---
<nav class="article-toc" aria-labelledby="article-toc-title" markdown="1">
<p class="article-toc__title" id="article-toc-title">On this page</p>

* TOC
{:toc}
</nav>

## 1. A Resonant Mode Is Not Enough

The previous chapter separated two questions:

1. Which characteristic modes are available near the target frequency?
2. Which modes are strongly excited by the actual feed?

A mode can have high modal significance and still contribute little to the driven current. Feed position, orientation, phase, and spatial extent determine the modal excitation coefficient.

For a handset antenna, this means that the antenna location can be as important as the local antenna shape.

---

## 2. Reading the Fundamental Chassis Mode

Return to the simplified **150 mm × 80 mm** rectangular ground. For its fundamental long-axis mode:

- surface current is strongest near the center of the long dimension;
- current is small near the two short ends;
- surface charge and fringing electric field are stronger near the ends;
- the longitudinal surface current produces a magnetic field around the current path.

These regions favor different feed geometries. “Favor” is important here: field magnitude alone does not determine the coupling. The feed orientation and its finite area also matter.

---

## 3. Modal Excitation and Feed Coupling

In TCM, the feed-dependent term is the **modal excitation coefficient (MEC)**. For an impressed electric field, it is related to the overlap between the excitation and the characteristic current. Equivalent-source formulations may also include electric-current and magnetic-current source terms through the reaction theorem.

The practical interpretation is:

- place the feed where the target mode has a suitable field or current distribution;
- align the feed with the local field orientation;
- provide enough coupling area or loop area;
- check the resulting modal weighting in the driven solution.

A scalar plot of electric- or magnetic-field magnitude is useful for screening locations, but it is not a calculated coupling coefficient.

---

## 4. Capacitive and Inductive Coupling Elements

Two established terms are useful for chassis-mode excitation:

### Capacitive coupling element (CCE)

A CCE couples mainly to the electric field of the chassis mode. It is usually placed near a charge or electric-field maximum, which is also close to a current minimum for the simplified fundamental mode. The coupling element may be electrically small and non-resonant, although resonant open-ended structures such as IFAs and PIFAs can also provide strong capacitive coupling.

### Inductive coupling element (ICE)

An ICE forms a current loop and couples mainly near a surface-current maximum, where the associated magnetic field is strong. The loop orientation must be consistent with the local magnetic-field direction.

A conducting loop carries ordinary electric current and produces a magnetic dipole moment. A slot or aperture is different: it is often represented by an **equivalent magnetic surface current**. These two descriptions should not be mixed as if a real magnetic current flowed in the metal loop.

<figure class="technical-figure">
  <picture tabindex="0">
    <source srcset="/figures/fig3_1.svg" type="image/svg+xml" />
    <img src="/figures/fig3_1.png" alt="Two panels showing the same simplified long-axis chassis mode. A capacitive coupling element is placed near a short-end electric-field maximum, and an inductive coupling element is placed near the center long-edge current maximum with the loop normal aligned to the local magnetic field." width="2740" height="1075" loading="lazy" />
  </picture>
  <figcaption class="figure-caption">Fig. 3-1. Capacitive and inductive coupling examples for the same fundamental chassis mode. A practical IFA, PIFA, loop, or slot may contain both coupling mechanisms.</figcaption>
</figure>

---

## 5. End Placement and Center-Edge Placement

### Near a short end

The short-end region has strong charge and fringing electric field in the simplified mode. An open-ended IFA or PIFA, or a CCE, can be a reasonable starting point. The feed still needs the correct orientation and sufficient clearance.

### Near the middle of a long edge

This region is close to the surface-current maximum. A suitably oriented loop, ICE, or slot can couple to the local magnetic field or interrupt the chassis current path. Moving the same open-ended antenna from the short end to this location may give a good S11 after retuning but poor radiation efficiency.

This is not a rule that a PIFA belongs only at an end or that a loop belongs only at the center. It is a first-order guide for choosing a feed mechanism from the local modal fields.

---

## 6. A 900 MHz Example

For a **150 mm × 80 mm** ground and a target around **900 MHz**, the long-axis chassis mode is a reasonable first mode to inspect.

If clearance is available at a short-end corner, start with an open-ended structure or CCE and verify that the driven current follows the long-axis chassis mode.

If clearance is available only near the middle of a long edge, evaluate a loop, ICE, or slot-based feed. The loop plane and slot orientation must match the local field. Do not decide from antenna name alone.

A practical sequence is:

1. Run CMA on the relevant chassis structure.
2. Select the target mode and inspect its current and fields.
3. Place a candidate feed where the modal excitation coefficient should be large.
4. Run the driven simulation and inspect modal weighting, surface current, efficiency, and loss.
5. Repeat with the display, frame, battery, and user model included.

---

## 7. Evaluating the Driven Result

Surface-current plots are useful, but they should be read with other quantities:

- modal weighting coefficient (MWC) or modal expansion coefficient, when available;
- accepted power and dissipated power;
- radiation efficiency and total efficiency;
- current on the frame, shield cans, and lossy components;
- sensitivity to hand loading and mechanical tolerance.

A current distribution that resembles the target characteristic current is a good sign. It is not sufficient by itself. Loss and unwanted modes can still limit the result.

---

## Key Message

> First identify the chassis mode. Then choose a feed location and coupling element that provide a large modal excitation coefficient for that mode.

---

## Next Chapter Preview

Chapter 4 shows how geometry and reactive loading can change the antenna current distribution even when the basic antenna outline remains similar.
