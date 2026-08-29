# Figure source provenance

Source document:

M.-G. Kim, *Performance Enhancement of Multiband Ground Radiation Antenna Using Multi-Resonant Loops*, Ph.D. dissertation, Hanyang University, 2020.

## Actual simulation panels

| Local source file | Dissertation source | Printed page | PDF page | Use |
|---|---|---:|---:|---|
| `source/thesis_figures/fig2_2_modes_a_b.jpg` | Fig. 2.2 | 17 | 32 | characteristic currents |
| `source/thesis_figures/fig2_2_modes_b_c.jpg` | Fig. 2.2 | 17 | 32 | characteristic currents |
| `source/thesis_figures/fig2_3_modal_significance.jpg` | Fig. 2.3 | 17 | 32 | modal significance |
| `source/thesis_figures/fig2_13_case5_monopole.jpg` | Fig. 2.13(a) | 34 | 49 | more monopole-like current |
| `source/thesis_figures/fig2_13_case1_loop.jpg` | Fig. 2.13(b) | 34 | 49 | more loop-like current |

These files are extracted from embedded images in the author-supplied dissertation PDF. The generator only crops, resizes, labels, and composes them. It does not synthesize current vectors, current magnitudes, or modal-significance curves.

## Numerical data

`data/fig4_bandwidth.csv` transcribes:

- simulated values from Table 2.5, printed p. 34 / PDF p. 49;
- measured values from Table 2.6, printed p. 36 / PDF p. 51.

All values are -6 dB impedance bandwidths for cases tuned near 800 MHz.

## Reproduced line drawing

`fig4_1` reproduces the geometry and dimensions in dissertation Fig. 2.12, printed p. 33 / PDF p. 48. It is a new vector drawing, not an extracted screenshot.

## Reproduction environment

The generator declares its exact NumPy, Matplotlib, and Pillow versions with PEP 723 metadata. Run:

```bash
uv run scripts/figures/generate_mobile_antenna_ch1_4.py
```

The script uses Matplotlib's bundled DejaVu Sans files, a fixed SVG hash salt, and timestamp-free SVG metadata so repeated runs produce identical assets.
