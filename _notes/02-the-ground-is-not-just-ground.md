---
layout: note
title: "Mobile Antenna Design Notes #2: The Ground Is Not Just Ground"
permalink: /posts/02-the-ground-is-not-just-ground/
series: mobile-antenna-design
chapter: 2
summary: "How the phone ground and chassis participate in radiation and why a small antenna cannot be analyzed in isolation."
topics:
  - ground plane
  - chassis current
  - small antennas
published: true
date: 2026-06-08 21:28:53 +0900
---
<nav class="article-toc" aria-labelledby="article-toc-title" markdown="1">
<p class="article-toc__title" id="article-toc-title">On this page</p>

* TOC
{:toc}
</nav>

> **Core idea**  
> In mobile antenna design, the ground is not merely a zero-volt reference.  
> It is a finite conducting body that can support current modes, interact with the antenna element, and participate directly in radiation.

---

## 1. Why “ground” can be misleading

In circuit diagrams, ground looks simple.

It is drawn as a reference node. It is where voltages are measured from. In many low-frequency circuits, we often treat ground as an ideal zero-volt reference. This is a very useful abstraction.

But in RF and antenna design, especially inside a mobile device, this abstraction quickly becomes incomplete.

A PCB ground at RF is not an ideal zero-volt plane. It is a finite conductor with:

- length and width
- shape and cutouts
- vias and screws
- contact points
- nearby metal structures
- discontinuities
- coupling to display, battery, shield cans, and chassis

Current does not spread over it uniformly. Voltage is not perfectly constant everywhere. At high frequencies, the ground itself behaves as a distributed electromagnetic structure.

This is why the word **ground** can be misleading in mobile antenna design.

<div class="table-scroll" tabindex="0" role="region" aria-label="Circuit and antenna viewpoints of ground" markdown="1">

| Viewpoint | What “ground” means |
|---|---|
| Circuit view | A reference node |
| RF / antenna view | A finite conducting structure that can carry RF current and radiate |

</div>

From a circuit point of view, ground is a reference.

From an antenna point of view, ground can be a radiator.

This does not mean that every part of the ground radiates equally. It means that the finite ground can support specific current distributions, and those current distributions can contribute significantly to radiation.

<figure class="technical-figure">
  <picture tabindex="0">
    <source srcset="/figures/fig2_1.svg" type="image/svg+xml" />
    <img src="/figures/fig2_1.png" alt="Two-panel schematic comparing an approximately equipotential circuit reference conductor with a finite RF conductor carrying nonuniform longitudinal surface current and showing restrained end-region charge and fringing-electric-field cues." width="1800" height="1080" loading="lazy" />
  </picture>
  <figcaption class="figure-caption">Fig. 2-1. Circuit-level and RF views of a finite ground plane. At low frequencies, ground can often be treated as an approximately equipotential reference. At RF, a finite conductor supports nonuniform surface current, charge, and electromagnetic fields and can become part of the radiating structure.</figcaption>
</figure>

---

## 2. A finite ground has natural current modes

A simple rectangular PCB ground is enough to understand the idea.

Imagine a rectangular metal plate:

- length: **150 mm**
- width: **80 mm**

At low frequency, we may think of it as one uniform ground plane. But as the frequency increases, the physical size of the ground becomes comparable to a significant fraction of the wavelength. Then the ground can support standing-wave-like current distributions.

For example, along the long axis of the board, a half-wavelength-like current mode may appear.

In this mode:

- current is relatively strong near the center of the board
- current is weaker near the two ends
- surface-charge accumulation and the associated fringing electric field are stronger near the ends

This is similar to the intuition we have from a half-wave resonator.

The board can also support:

- a mode along the short axis
- higher-order modes along the long axis
- modes distorted by nearby components and chassis structures

The exact modes depend on board size, shape, surrounding materials, and boundary conditions. But the basic idea is simple:

> **A finite ground has its own natural current modes.**

This is one of the most important ideas in mobile antenna design.

<figure class="technical-figure">
  <picture tabindex="0">
    <source srcset="/figures/fig2_2.svg" type="image/svg+xml" />
    <img src="/figures/fig2_2.png" alt="Top view of a conceptual 150 by 80 millimeter rectangular ground with longitudinal current strongest near the center and charge and fringing-electric-field cues near the ends, followed by normalized current and charge or electric-field proxy curves." width="1800" height="1080" loading="lazy" />
  </picture>
  <figcaption class="figure-caption">Fig. 2-2. Simplified one-dimensional representation of the fundamental long-axis mode of a finite rectangular ground. The surface-current envelope is strongest near the center, while surface-charge accumulation—and the associated fringing electric field—is stronger toward the two ends. The distributions are conceptual first-order approximations rather than characteristic-mode simulation results.</figcaption>
</figure>

---

## 3. What it means when an antenna “uses the ground”

When we say that a mobile antenna **uses the ground**, we are not simply saying that the ground is a return path.

We are saying that the antenna element excites one or more current modes on the finite ground or chassis, and those modes participate in radiation.

This is also why the same antenna element can behave differently on different boards.

The antenna element may be the same, but the ground modes are not.

A change in any of the following can modify the current path:

- PCB length
- PCB width
- metal frame structure
- display metal
- battery placement
- shield cans
- screw contacts
- FPCB routing
- chassis contact points

Once the current path changes, the available modes also change.

---

## 4. Characteristic Mode Analysis: looking at the body before the feed

A useful way to analyze this more systematically is called **Characteristic Mode Analysis**, often abbreviated as **CMA** or **TCM**.

The basic idea of characteristic modes is to look at the conducting body itself before focusing on a specific feed.

Instead of asking first:

> What is the input impedance of this antenna?

we ask:

> What current modes can this structure naturally support?

This shift is powerful.

If we analyze a finite ground plane using characteristic modes, we can identify several possible current distributions. Each mode has its own:

- resonant behavior
- current pattern
- field distribution
- radiation potential
- excitation difficulty from a given location

Some modes may be useful for radiation at the target frequency. Others may not be useful. Some modes may be easy to excite from a given antenna location. Others may be difficult to excite from that location.

One important distinction is that a mode being resonant does not mean that it will automatically be strongly excited.

Characteristic-mode analysis can tell us which natural modes are available near the target frequency. But the actual contribution of each mode also depends on how strongly the antenna source couples to it.

A useful mode can therefore exist at the right frequency but remain weakly excited if the antenna is placed or oriented poorly.

<!-- TODO: Fig. 2-3 requires author-supplied characteristic-mode evidence.
Asset: /figures/fig2_3.png
Required source: original CMA solver exports or the author's clean thesis-source composite containing characteristic-current distributions for several modes and the modal-significance response of the 30 mm × 150 mm rectangular ground. Do not substitute analytical curves or synthetic heatmaps.
Alt: Composite of actual characteristic-current distributions and modal-significance responses for a 30 millimeter by 150 millimeter rectangular ground.
Caption: Fig. 2-3. Example characteristic-mode analysis of a 30 mm × 150 mm rectangular ground. The characteristic currents illustrate several natural current distributions supported by the conducting body, while the modal-significance response shows that different modes become resonant over different frequency regions. This example uses a different ground geometry from the simplified 150 mm × 80 mm model above.
-->

---

## 5. A more physical design process

Characteristic-mode thinking gives us a more physical design process.

Instead of starting with an antenna type, we start with the product structure.

Ask first:

- What is the size of the PCB ground?
- Where is the antenna clearance?
- Where are the metal frame contacts?
- Where are the display, battery, shield cans, and screws?
- Which current path can be used for radiation?
- Which ground mode is close to the target frequency?
- Can the available antenna location excite that mode efficiently?

These questions are often more important than choosing between a PIFA, loop, slot, or monopole at the beginning.

> **Design mindset**  
> Do not start only from “Which antenna type should I use?”  
> Start from “Which product-level current mode can I excite?”

---

## 6. Why the simple rectangular-ground model is still useful

In a real product, the ground mode is not as clean as a textbook half-wave resonator.

A smartphone is not a perfect rectangular plate. It includes:

- display metal
- battery metal
- camera structures
- shield cans
- connectors
- screws
- FPCB
- external housing
- user hand effects

Because of this, the actual current mode may be shifted, distorted, split, or coupled to other structures.

However, the simplified rectangular-ground model is still useful because it gives a first-order mental model.

For instance, if the long dimension of the PCB is around **150 mm**, then a long-axis half-wave-like mode may appear near the low-GHz region.

This is not an exact calculation. The actual frequency depends on:

- effective permittivity
- nearby metal
- product structure
- boundary conditions
- chassis coupling
- user interaction

But it gives an initial direction.

It tells us that the long dimension of the ground may be useful for low-band or sub-1 GHz radiation. It also tells us that the current maximum and the charge/electric-field maximum are located in different regions.

This becomes important when deciding where and how to place the antenna element.

---

## 7. The antenna element as an excitation structure

This is where mobile antenna design starts to become interesting.

If the ground has a useful mode, the antenna element does not need to behave as a complete standalone radiator. Instead, it can act as an excitation structure.

Its job is to couple energy into the desired ground mode.

This is a very different way of thinking.

### Antenna-only view

In a simplified antenna-only view, we may ask:

- Is the antenna element length appropriate?
- Does the matching network create good return loss?
- Is the local antenna clearance large enough?
- Does the antenna element resonate near the target band?

### Ground-mode view

In a ground-mode view, we ask a deeper question:

> **Is this antenna element exciting a useful current mode on the product ground?**

That distinction explains many practical observations.

---

## 8. Practical observations explained by ground modes

### Observation 1: Good return loss, poor efficiency

An antenna can show good return loss but poor efficiency.

This can happen when the matching network creates an impedance match, but the excited current does not couple well to a radiating ground mode.

### Observation 2: Same antenna, different board, different result

An antenna can perform well on one board but poorly on another board, even with the same geometry.

This can happen because the two boards support different ground modes.

### Observation 3: Metal frame contact changes the result

An antenna can improve when a metal frame is connected at a certain point, but degrade when the contact point changes.

This can happen because the contact modifies the chassis current path.

### Observation 4: Antenna position matters more than expected

An antenna position can be more important than expected.

This can happen because different positions overlap with different parts of the ground-mode field distribution.

---

## 9. Ground is part of the antenna system

This is why ground should not be treated as a passive background in mobile antenna design.

It is part of the antenna system.

For many compact mobile antennas, the ground or chassis is the largest and most important radiating body in the product.

The antenna element is small, but the ground is large.

The antenna element creates local current and field excitation, but the ground determines how that excitation spreads and radiates.

A good mobile antenna design therefore begins with the ground.

Not only with:

- the local antenna clearance
- the matching network
- the antenna type

But with:

> **the finite conducting body that the antenna will excite.**

---

## 10. Key message

> **The ground is not just a reference node.**  
> In mobile antenna design, the finite ground is a resonant conducting body with its own current modes.

Once we accept this, the next question becomes clear:

- If the ground has current modes, how do we choose the right excitation?
- Should we place the antenna where the electric field is strong?
- Should we place it where the current is strong?
- Should we use a PIFA-like element, a loop, a slot, or a hybrid structure?
- How does antenna location determine the best coupling mechanism?

These questions lead us to the next chapter.

---

## Next chapter preview

In **Chapter 3**, we will discuss how to excite a ground mode.

We will look at the relationship between ground-mode field distribution and antenna source type. This will introduce the practical design idea of:

- electric-current-like excitation
- magnetic-current-like excitation
- **J-type coupling**
- **M-type coupling**
