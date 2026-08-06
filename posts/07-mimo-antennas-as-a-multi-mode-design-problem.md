---
layout: page
title: "Mobile Antenna Design Notes #7: MIMO Antennas as a Multi-Mode Design Problem"
permalink: /posts/07-mimo-antennas-as-a-multi-mode-design-problem/
---

# Chapter 7. MIMO Antennas as a Multi-Mode Design Problem

## 1. Multiple Antennas, One Product Structure

Modern mobile products contain multiple antennas.

A smartphone may require several cellular antennas, Wi-Fi and Bluetooth antennas, GNSS antennas, UWB antennas, and other wireless functions. Even within one cellular band, multiple receive and transmit paths may be needed for diversity and MIMO operation.

Placing multiple antennas on the same product creates a difficult problem.

All antennas share a limited volume. They are connected to the same finite PCB ground and are surrounded by the same chassis, display, battery, and user.

As a result, antenna coupling is not determined only by the distance between antenna elements.

Two antennas can be physically separated but still strongly coupled through the shared ground mode. Conversely, two nearby antennas can sometimes achieve acceptable isolation if they excite sufficiently different current distributions.

This leads to a more useful view:

> MIMO antenna design is not only the placement of multiple antenna elements. It is the design of multiple radiating modes within the same product.

---

## 2. Shared-Mode Coupling

Suppose two antenna ports both excite the same long-axis ground mode.

When port 1 is driven, current spreads across the product along that mode. If port 2 is located in a region where the same modal field is strong, energy can couple efficiently into port 2.

The coupling path may not be direct element-to-element coupling. It may be mediated by the shared PCB ground or metal frame.

This is why increasing physical distance alone may not solve the problem.

If the two ports still access the same dominant chassis mode, the isolation can remain poor.

---

## 3. Mode Diversity

A more effective approach is to make the antennas excite different current modes or different combinations of modes.

One antenna may excite a long-axis chassis mode, while another excites a short-axis mode. One may use mainly electric coupling at a voltage maximum, while another uses magnetic coupling at a current maximum. The antennas may also create different polarizations or radiation patterns.

If the modal current distributions are sufficiently distinct, the coupling between the ports can be reduced.

This is sometimes described as exciting orthogonal characteristic modes. In practice, perfect orthogonality is not always achievable in a complex product. However, the design objective remains valuable:

> Reduce the overlap between the current and field distributions excited by different ports.

---

## 4. Isolation and ECC Are Related but Not Identical

Isolation is commonly evaluated using S-parameters, especially **S21** between antenna ports.

Envelope correlation coefficient, or ECC, describes how similar the antenna radiation behaviors are. ECC may be estimated from S-parameters under restrictive assumptions, but a more complete evaluation uses the far-field patterns and radiation efficiencies.

Good isolation often helps ECC, but the two metrics are not identical.

Two antennas may have reasonable isolation but highly similar radiation patterns, resulting in higher correlation. Alternatively, two antennas may have some coupling but still produce distinct patterns and acceptable ECC.

Therefore, a multi-antenna design should evaluate:

- port isolation,
- total and radiation efficiency,
- active reflection behavior,
- far-field pattern diversity,
- polarization diversity,
- ECC,
- performance under user loading.

The modal current distribution provides the physical explanation behind these metrics.

---

## 5. Using Modal Nulls

The field distribution of a mode contains maxima and minima.

If antenna 1 strongly excites a particular mode, antenna 2 may be placed near a current or field null of that mode. In such a position, antenna 2 interacts less strongly with the mode excited by antenna 1.

At the same time, antenna 2 must still have access to another useful mode.

This is an important design trade-off. A location with low coupling to antenna 1 may also provide weak radiation if no alternative mode is available.

The goal is not simply to place antenna 2 at the weakest-current location. The goal is to find a location where antenna 2 couples weakly to antenna 1’s mode but strongly to another useful mode.

---

## 6. Electric and Magnetic Source Diversity

The J/M framework can also support multi-antenna diversity.

An electric-coupling-dominant antenna and a magnetic-coupling-dominant antenna may interact differently with the same product structure. Their near fields, current paths, and modal overlaps can be different.

This does not guarantee high isolation, but it provides an additional degree of freedom.

For example, an end-mounted IFA-like antenna may excite an electric-field region of the chassis, while a center-edge loop or slot may excite a current-dominant region. If designed properly, the resulting current distributions may have lower overlap than two similar IFAs exciting the same chassis mode.

---

## 7. Decoupling Structures

Several common decoupling techniques can also be understood through mode control.

A neutralization line creates a controlled coupling path that cancels part of the original coupling. A parasitic element introduces another current path and modifies the coupled modes. A slot or slit changes the ground-current path. A grounded stub or resonator can suppress a specific coupling mode.

These techniques should not be treated only as circuit tricks.

Each one modifies the electromagnetic modes of the combined multi-port structure.

A decoupling structure can improve isolation at one frequency but reduce efficiency, distort the radiation pattern, or introduce a narrow resonance. Therefore, the objective is not simply to minimize **S21**. The complete modal and radiation behavior must be considered.

---

## 8. Mode Tracking in a Real Product

In a complex mobile product, it may be difficult to assign one clean characteristic mode to each antenna.

The display, frame, battery, and ground may form several coupled modes. The modes can shift with frequency and user loading. The antenna ports may excite mixtures of those modes.

Even so, surface-current analysis remains useful.

For each port, excite that port while terminating the others. Observe where the current flows. Compare the current distributions between ports. Identify shared paths, common hot spots, and possible modal nulls.

This provides practical insight even without a formal characteristic-mode decomposition.

The key question is:

> Do the antenna ports create meaningfully different radiating current distributions, or are they all driving the same product mode?

---

## 9. Key Message

> Good MIMO performance comes from creating multiple efficient and sufficiently distinct radiating modes, not merely from placing several antenna elements far apart.

---

## Next Chapter Preview

In the next chapter, we will consider another structure that can excite the product ground: the internal noise source.

The same ground mode that carries the desired antenna current may also carry unwanted noise current.
