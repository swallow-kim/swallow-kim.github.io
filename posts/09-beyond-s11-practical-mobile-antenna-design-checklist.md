---
layout: page
title: "Mobile Antenna Design Notes #9: Beyond S11: A Practical Mobile Antenna Design Checklist"
permalink: /posts/09-beyond-s11-practical-mobile-antenna-design-checklist/
---

# Chapter 9. Beyond S11: A Practical Mobile Antenna Design Checklist

Return loss is useful.

It tells us how much power is reflected at the antenna port under a given condition. It helps identify impedance resonance and supports matching-network design.

But S11 alone cannot tell us whether the antenna radiates efficiently, excites the intended ground mode, produces a useful radiation pattern, remains stable under user loading, supports good MIMO performance, or avoids internal noise.

A mobile antenna can have excellent S11 and still fail as a product antenna.

Therefore, a practical antenna design should be evaluated at several levels.

---

## 1. Input Impedance and Matching

S-parameters remain the first basic check.

We should examine:

- resonance frequency,
- impedance trajectory,
- matching bandwidth,
- sensitivity to matching components,
- tolerance across mechanical variation,
- coupling between antenna ports.

A Smith chart is often more informative than return-loss magnitude alone because it shows whether the antenna is primarily capacitive, inductive, or resistive and how the impedance moves with frequency.

However, matching should not be optimized independently of efficiency.

A large loss can make an antenna look well matched. A lossy antenna absorbs power instead of reflecting it, which can produce a low S11 without useful radiation.

---

## 2. Radiation Efficiency and Total Efficiency

Radiation efficiency separates radiated power from conductive and dielectric loss.

Total efficiency includes both radiation loss and mismatch loss.

Both metrics are important.

If radiation efficiency is poor, improving the matching network alone will not solve the problem. The current may be flowing through lossy lumped elements, narrow conductors, lossy dielectric regions, or non-radiating local paths.

If radiation efficiency is reasonable but total efficiency is poor, impedance matching may still provide a significant improvement.

The distinction helps identify whether the main problem is loss or mismatch.

---

## 3. Surface-Current Distribution

Surface current is one of the most useful diagnostic views in mobile antenna design.

It shows whether the antenna is exciting the intended PCB ground or chassis mode. It reveals whether current remains localized near the feed, spreads over the full device, flows onto the frame, enters a cable, or couples strongly to another antenna.

Current should be inspected at multiple frequencies:

- the target resonance,
- the band edges,
- unwanted resonances,
- frequencies with high coupling,
- frequencies associated with desense.

For multi-port systems, excite each port separately and compare the resulting current distributions.

The current plot should answer a physical question. It should not be included only because it looks visually impressive.

---

## 4. Field Distribution and Coupling Mechanism

Near-field distribution helps determine whether the antenna is using electric or magnetic coupling.

Electric-field concentration near an open end or gap indicates strong capacitive behavior. Magnetic-field concentration around a loop, slot, or strong current path indicates magnetic coupling.

This information can be compared with the modal field distribution of the ground or chassis.

The goal is to confirm that the excitation mechanism matches the intended mode and location.

---

## 5. Characteristic Modes

When available, characteristic mode analysis can provide a feed-independent view of the conducting structure.

Useful quantities may include:

- modal current distribution,
- modal significance,
- characteristic angle,
- modal weighting under a driven excitation,
- correlation between modes.

CMA is particularly useful during early product architecture because it allows the designer to examine the potential radiating modes before committing to a specific feed.

However, CMA should not replace driven simulation or complete product analysis. Real antenna feeds, lumped components, dielectric loss, cables, and active structures affect the final behavior.

CMA is a design lens, not a complete product answer.

---

## 6. Radiation Pattern

An antenna can have good efficiency but an unsuitable pattern.

The radiation pattern should be examined in three dimensions and across the full operating band. Important questions include:

- Does the pattern have a deep null in an important direction?
- Does the dominant polarization match the intended link?
- Does the pattern change dramatically with frequency?
- Does the metal frame redirect radiation?
- Do multiple antennas produce sufficiently diverse patterns?
- How does the hand or head change the pattern?

For MIMO systems, pattern diversity may be as important as port isolation.

---

## 7. Isolation and ECC

For multiple antennas, evaluate both coupling and correlation.

S-parameters provide port isolation, but ECC should preferably be evaluated using full radiation patterns and efficiencies when possible.

The design should also be tested under realistic operating conditions. A free-space design with good ECC may become strongly correlated when the user’s hand suppresses one mode or forces both antennas to radiate through the same remaining path.

---

## 8. User Effect

The user is part of the electromagnetic environment.

A hand can add loss, detune the antenna, short an electric-field region, modify the chassis mode, or block radiation. The impact depends on where the current and field are concentrated.

Several grip conditions should be evaluated, especially for low-band antennas and metal-frame structures.

The goal is not only to minimize resonance shift. The design should maintain useful efficiency and pattern coverage across realistic usage conditions.

---

## 9. OTA Performance

For mobile communication systems, conducted antenna metrics are not the final objective.

The product should be evaluated through OTA metrics such as TRP and TIS, along with band-specific requirements and realistic operating states.

TRP reflects the combined effect of transmitter power, antenna mismatch, efficiency, and radiation pattern.

TIS reflects antenna performance together with receiver sensitivity, pattern, and internal noise.

This is why TIS can reveal problems that are invisible in passive antenna measurements.

---

## 10. Desense and Coexistence

The antenna should be measured while noisy subsystems are active.

Relevant operating modes may include:

- display on and off,
- camera operation,
- processor loading,
- charging,
- USB activity,
- Wi-Fi or Bluetooth transmission,
- high-speed memory operation,
- DC-DC converter states.

A passive chamber result cannot predict all of these interactions.

The antenna-current mode should be compared with the current paths of major noise sources. A strong overlap indicates a possible desense risk.

---

## 11. Tolerance and Manufacturing Variation

Mobile antennas are sensitive to small mechanical changes.

Important variables may include:

- antenna gap,
- frame contact resistance,
- adhesive thickness,
- screw installation,
- spring-contact compression,
- plastic permittivity,
- coating thickness,
- lumped-component tolerance,
- assembly offset.

A robust antenna should not depend on one highly idealized contact or extremely narrow resonance.

Sensitivity analysis is therefore part of antenna design, not only a final verification task.

---

## 12. The Complete Design Question

At the end of the design process, the key question is not:

> Is S11 below a certain threshold?

The better questions are:

- Which ground or chassis mode is being excited?
- Is that mode efficient?
- Is the coupling mechanism appropriate for the antenna location?
- Does the current flow through lossy or noisy structures?
- Does the antenna remain effective under user loading?
- Do multiple antennas create sufficiently different modes?
- Does the active product maintain acceptable OTA performance?

These questions connect antenna geometry to product performance.

The final message of this series is:

> Mobile antenna design is the engineering of current modes, coupling mechanisms, and product-level electromagnetic interactions.

The antenna element matters. The matching network matters. The ground, chassis, frame, display, battery, contacts, other antennas, noise sources, and user also matter.

The purpose of the ground-mode perspective is not to make every design problem theoretical or complicated. It is to provide a physical framework for understanding why a design works, why it fails, and what should be changed.

Instead of tuning blindly, we can ask which mode we are moving.

Instead of choosing an antenna type by habit, we can ask which field component is available.

Instead of improving isolation only through distance, we can create distinct radiating modes.

Instead of treating desense as a separate EMC issue, we can examine how noise and antenna currents share the same product structure.

That is the practical value of viewing mobile antennas as part of a complete RF system.
