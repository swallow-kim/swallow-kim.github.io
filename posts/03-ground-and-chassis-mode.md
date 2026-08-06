---
layout: page
title: "Mobile Antenna Design Notes #3: How to Excite a Ground Mode"
permalink: /posts/03-ground-and-chassis-mode/
---

# Chapter 3. How to Excite a Ground Mode

## 1. The Ground Mode as a Design Target

In the previous chapter, we discussed that the PCB ground is not just an ideal reference plane. It is a finite conducting body, and it can support its own current modes.

This changes the way we think about mobile antenna design.

If the ground has natural current modes, then the role of the antenna element is not only to resonate by itself. Its role is also to excite one or more useful ground or chassis modes.

This leads to the next question:

> How do we excite the desired ground mode efficiently?

The answer depends on two things.

First, we need to understand the field distribution of the target ground mode.

Second, we need to place and shape the antenna element so that it couples well to that field distribution.

A mode is not equally excitable from every location. Some positions are very effective. Some positions are poor. This is why antenna location is often as important as antenna geometry in mobile antenna design.

---

## 2. Reading the Field Distribution

Let us return to the simple rectangular PCB ground example.

Imagine a **150 mm × 80 mm** rectangular ground plane. As discussed in the previous chapter, this ground may support a long-axis half-wave-like current mode around the low-GHz region. In this simplified mode, the surface current is strong near the center of the board and weaker near the two short ends. The voltage-related behavior, or the electric field, is stronger near the two ends.

This gives us a very useful design picture.

Near the ends of the board, the ground mode has strong electric-field behavior.

Near the center of the board, the ground mode has strong current and magnetic-field behavior.

These two regions should not be excited in the same way.

If the available antenna location is near an electric-field maximum, an electric-current-like source can be effective. If the available antenna location is near a current or magnetic-field maximum, a magnetic-current-like source may be more effective.

This is the basic idea behind source-mode coupling.

---

## 3. Source-Mode Coupling

In antenna theory, this idea can be described more formally using the reaction theorem or modal coupling integrals. The coupling strength depends on how well the source distribution overlaps with the field distribution of the mode. An electric current source couples to the modal electric field. An equivalent magnetic current source couples to the modal magnetic field.

But we do not need to start from the equation to use the idea.

The practical intuition is simple:

> To excite a mode efficiently, place the right kind of source where the corresponding field of that mode is strong.

This gives us a useful design rule.

If the target ground mode has a strong electric field at a certain location, use an antenna structure with strong electric coupling there.

If the target ground mode has strong current or magnetic field at a certain location, use an antenna structure with strong magnetic coupling there.

---

## 4. J-Type and M-Type Excitation

For convenience, we can call these two coupling mechanisms **J-type** and **M-type excitation**.

**J-type excitation** refers to electric-current-like excitation. It is associated with structures such as monopoles, dipoles, IFA, and PIFA-like elements. These structures have conduction current flowing along a metal path, and they often create strong electric field near an open end.

**M-type excitation** refers to magnetic-current-like excitation. This does not mean that a real magnetic current physically flows in the metal. It is an equivalent-source concept. In practice, loop, slot, and aperture-like structures can behave as magnetic-current-like sources because they create loop current, magnetic flux, or aperture fields that couple well to magnetic-field-dominant regions of the target mode.

This distinction is not meant to classify every antenna into two perfect categories. Real antennas usually have both electric and magnetic coupling components. Still, the J/M view is very useful because it helps us choose a reasonable antenna structure for a given location.

---

## 5. Electric Coupling Near the Board End

Consider the long-axis half-wave ground mode again.

At the short ends of the rectangular ground, the electric field is strong. If we have antenna clearance near one of these ends, a PIFA or IFA-like structure can be a natural choice. The open end of the antenna element can create strong electric field, and this can couple well to the electric-field region of the ground mode.

In this case, the antenna element acts like an electric-current-dominant excitation structure. It does not need to radiate everything by itself. Instead, it excites the long-axis ground mode, and the finite ground participates in radiation.

This is one of the reasons why many mobile antennas are placed near the edge or corner of the PCB when possible. These locations often provide good access to voltage or electric-field regions of useful chassis modes.

---

## 6. Magnetic Coupling Near the Board Center

Now consider a different situation.

Suppose the product layout does not allow the antenna to be placed near the short end of the board. The edge region near the end may already be occupied by cameras, speakers, connectors, buttons, screws, or mechanical structures. The only available antenna space may be near the center of a long edge.

This is a very common type of real product constraint.

In the simplified half-wave mode, the center region of the board is not the electric-field maximum. It is closer to the current maximum. The magnetic field associated with the ground current is also strong around this region.

If we simply move the same PIFA-like element from the end to the center edge, the result may not be good. We may still be able to tune the return loss by changing the matching network, but the antenna may not efficiently excite the desired radiating mode. The input impedance can be matched, but the radiation efficiency may remain poor.

This is an important point.

> Good matching does not always mean good mode excitation.

If the available location is near the current maximum of the target ground mode, a loop or slot-like structure may be a better starting point. A loop can create a magnetic-dipole-like response through circulating current. A slot can create an equivalent magnetic-current-like aperture. These structures can couple more naturally to the magnetic-field-dominant region of the ground mode.

In other words, the same ground mode may require different antenna structures depending on where the antenna can be placed.

At the end of the board, an electric-coupling-dominant structure may be effective.

Near the center of the board, a magnetic-coupling-dominant structure may be more effective.

This explains why antenna type cannot be chosen independently of antenna location.

It is not enough to say, “Use a PIFA,” or “Use a loop.” The better question is:

> At the available antenna location, which part of the target ground mode can I couple to?

If the available location overlaps with a modal electric-field maximum, electric coupling is a good direction. If it overlaps with a modal current or magnetic-field maximum, magnetic coupling is a good direction. If the location is somewhere between the two, then a hybrid structure may be needed.

---

## 7. A 900 MHz Design Example

Let us make this more concrete.

Assume again that the target band is around **900 MHz** and the board size is **150 mm × 80 mm**. The long dimension of the board is close to a half wavelength in this frequency range. So we decide to use the long-axis ground mode.

If the antenna clearance is available at a short-end corner, the design path may be straightforward. We can start with an IFA or PIFA-like element. The element creates electric-field coupling near the board end. Then we tune the geometry and matching network to align the resonance and improve impedance matching. In this case, the antenna location and the source type are well matched to the target mode.

But if the antenna clearance is only available near the center of the long edge, the design path should be different. A purely open-ended electric-current-like structure may not be the best choice. Instead, we may consider a loop-type element, a slot-type element, or a structure that creates stronger magnetic coupling. The goal is to use the local current maximum of the ground mode rather than trying to force electric coupling where the modal electric field is weak.

This is the design logic behind ground-mode excitation.

1. Choose the target mode.
2. Inspect the field distribution of that mode.
3. Identify what type of field is available at the antenna location.
4. Design the antenna element as an excitation structure for that field.

---

## 8. From Idealized Modes to Real Products

This approach does not remove all difficulties. Real mobile products are more complicated than a rectangular bare board. The current path may be modified by the display, battery, shield cans, metal frame, screws, contact springs, and the user’s hand. The mode may not be a clean half-wave distribution. Several modes may be coupled together. Some modes may be useful for radiation, while others may increase loss, coupling, or desense.

However, the basic principle remains valuable:

> Antenna design starts by matching the source mechanism to the target mode distribution.

This principle also helps explain why trial-and-error tuning often becomes inefficient.

If we only look at return loss, we may spend a lot of time changing matching components without understanding why efficiency does not improve. But if we look at the ground current distribution, we can often see whether the antenna is exciting the desired mode or merely creating local reactive current around the feed.

A useful antenna current spreads over the radiating body in a way that supports radiation.

A poor antenna current may remain localized around the element or flow through lossy structures without effectively exciting a radiating mode.

This is why surface current visualization is so useful in mobile antenna design. It shows whether the antenna is actually using the finite ground or chassis.

---

## 9. Evaluating Mode Excitation in Practice

In practice, we can examine this using EM simulation. We can look at surface current on the PCB ground, current on the metal frame, electric-field concentration near antenna gaps, and magnetic-field concentration around loop or slot structures. If characteristic mode analysis is available, we can also compare the driven current distribution with the natural current modes of the structure.

But even without a full modal analysis, the design question is the same:

> Is my antenna exciting the right current path on the product?

This question is often more meaningful than asking only whether the antenna element itself is resonant.

The J/M coupling view gives us a practical language to answer it.

A J-dominant structure is useful when we want to couple to a strong electric-field region of the target mode.

An M-dominant structure is useful when we want to couple to a strong magnetic-field or current region.

A hybrid structure is useful when the available location contains both field components or when the product constraint does not allow an ideal source placement.

This is why mobile antenna design is not just about choosing a known antenna type. It is about shaping the coupling mechanism for the given product structure.

In an ideal world, the antenna engineer would choose the best location first and then design the best source for that location. In a real product, the location is often given by mechanical and industrial design constraints. The antenna engineer must then ask:

> Given this limited space, what kind of source can best excite the useful ground or chassis mode?

This is the practical meaning of ground-mode excitation.

---

## 10. Key Message

> A useful ground mode must be excited with the right source at the right location. Electric-field regions favor electric-current-like excitation, while current or magnetic-field regions favor magnetic-current-like excitation.

---

## Next Chapter Preview

In the next chapter, we will look more closely at the antenna element itself. We will discuss why PIFA, loop, slot, and hybrid structures should not be treated as fixed categories. Instead, they should be understood as practical ways to control the ratio between electric and magnetic coupling.
