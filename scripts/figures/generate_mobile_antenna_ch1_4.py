from __future__ import annotations

from pathlib import Path
import csv
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle, FancyArrowPatch, Circle, Arc
from matplotlib.lines import Line2D

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "figures"
SCRIPT_DIR = Path(__file__).resolve().parent
SRC = SCRIPT_DIR / "source" / "thesis_figures"
DATA = SCRIPT_DIR / "data"
OUT.mkdir(parents=True, exist_ok=True)

# Site-aligned, restrained palette.
PAPER = "#FFFEFB"
INK = "#17191C"
MUTED = "#5F6368"
RULE = "#D8D4CB"
BLUE = "#145DA0"
LIGHT_BLUE = "#DCEAF6"
LIGHT_GREY = "#F0EEE8"

plt.rcParams.update({
    "font.family": "Liberation Sans",
    "font.size": 9.5,
    "axes.labelsize": 10,
    "xtick.labelsize": 9,
    "ytick.labelsize": 9,
    "legend.fontsize": 9,
    "axes.edgecolor": INK,
    "axes.labelcolor": INK,
    "xtick.color": MUTED,
    "ytick.color": MUTED,
    "text.color": INK,
    "figure.facecolor": PAPER,
    "axes.facecolor": PAPER,
    "savefig.facecolor": PAPER,
    "svg.fonttype": "none",
})


def save(fig: plt.Figure, stem: str, dpi: int = 300) -> None:
    fig.savefig(OUT / f"{stem}.png", dpi=dpi, bbox_inches="tight", pad_inches=0.06)
    fig.savefig(OUT / f"{stem}.svg", bbox_inches="tight", pad_inches=0.06)
    plt.close(fig)


def clean_axes(ax, grid: bool = False) -> None:
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    ax.spines["left"].set_linewidth(0.8)
    ax.spines["bottom"].set_linewidth(0.8)
    ax.tick_params(width=0.8, length=3)
    if grid:
        ax.grid(axis="y", color=RULE, linewidth=0.6, alpha=0.85)
        ax.set_axisbelow(True)


def draw_dimension(ax, xy1, xy2, label, offset=(0, 0), text_offset=(0, 0)):
    x1, y1 = xy1
    x2, y2 = xy2
    ox, oy = offset
    ax.annotate(
        "", xy=(x2 + ox, y2 + oy), xytext=(x1 + ox, y1 + oy),
        arrowprops=dict(arrowstyle="<->", color=MUTED, linewidth=0.8, shrinkA=0, shrinkB=0),
    )
    ax.text((x1 + x2) / 2 + ox + text_offset[0], (y1 + y2) / 2 + oy + text_offset[1],
            label, ha="center", va="center", color=MUTED, fontsize=8.5)


def draw_mode_board(ax, source_x: float | None = None, source_kind: str = "compact", panel_label: str | None = None,
                    subtitle: str | None = None, show_regions: bool = True):
    """Draw the same first-order long-axis chassis-mode reference."""
    L, W = 10.0, 4.8
    x0, y0 = 0.0, 0.0
    ax.add_patch(Rectangle((x0, y0), L, W, facecolor=LIGHT_GREY, edgecolor=INK, linewidth=1.0))

    # Longitudinal surface-current arrows. Length and line weight follow sin(pi*x/L).
    xs = np.linspace(0.75, 9.25, 9)
    for x in xs:
        amp = math.sin(math.pi * x / L)
        arrow_len = 0.38 + 0.78 * amp
        lw = 0.7 + 1.4 * amp
        y = W / 2
        ax.add_patch(FancyArrowPatch((x - arrow_len / 2, y), (x + arrow_len / 2, y),
                                     arrowstyle="-|>", mutation_scale=8.0, linewidth=lw,
                                     color=BLUE, shrinkA=0, shrinkB=0))

    # Snapshot of end charge / fringing-E regions. Same in every panel.
    if show_regions:
        ax.add_patch(Rectangle((-0.18, 0.2), 0.36, W - 0.4, fill=False, edgecolor=MUTED,
                               linewidth=0.8, linestyle=(0, (3, 2))))
        ax.add_patch(Rectangle((L - 0.18, 0.2), 0.36, W - 0.4, fill=False, edgecolor=MUTED,
                               linewidth=0.8, linestyle=(0, (3, 2))))
        # These bands indicate charge/fringing-field magnitude only. Signed charge is
        # intentionally omitted because current and charge phasors are not in phase.

    # Identical compact source, only moved in x.
    if source_x is not None:
        sy = W + 0.10
        ax.plot([source_x, source_x], [sy, sy + 0.74], color=INK, linewidth=2.0, solid_capstyle="butt")
        ax.plot([source_x, source_x + 0.62], [sy + 0.74, sy + 0.74], color=INK, linewidth=2.0, solid_capstyle="butt")
        ax.plot([source_x - 0.12, source_x + 0.12], [sy, sy], color=INK, linewidth=1.0)
        ax.text(source_x + 0.08, sy + 0.92, "same source", ha="center", va="bottom", fontsize=8.2, color=MUTED)

    if panel_label:
        ax.text(-0.02, 1.03, panel_label, transform=ax.transAxes, ha="left", va="bottom",
                fontweight="bold", fontsize=10)
    if subtitle:
        ax.text(0.5, 1.03, subtitle, transform=ax.transAxes, ha="center", va="bottom", fontsize=9.3)
    ax.set_xlim(-0.7, 10.7)
    ax.set_ylim(-0.5, 6.25)
    ax.set_aspect("equal")
    ax.axis("off")


def fig1_2_small_antenna_q():
    ka = np.linspace(0.10, 1.20, 500)
    q = 1 / ka**3 + 1 / ka
    fig, ax = plt.subplots(figsize=(7.2, 4.35), constrained_layout=True)
    ax.axvspan(0.10, 0.50, color=LIGHT_GREY, zorder=0)
    ax.semilogy(ka, q, color=BLUE, linewidth=2.0,
                label=r"$Q_{\mathrm{Chu}} = (ka)^{-3} + (ka)^{-1}$")
    ax.axvline(0.5, color=MUTED, linewidth=0.8, linestyle=(0, (3, 3)))
    ax.text(0.30, 1.9, "commonly used\nelectrically-small region", ha="center", va="bottom",
            color=MUTED, fontsize=9)
    ax.text(0.515, 170, r"$ka=0.5$", ha="left", va="center", color=MUTED, fontsize=8.5)
    ax.set_xlim(0.1, 1.2)
    ax.set_ylim(1, 2000)
    ax.set_xlabel(r"Electrical size, $ka$")
    ax.set_ylabel("Radiation Q (single-mode reference)")
    clean_axes(ax, grid=True)
    ax.legend(frameon=False, loc="upper right")
    save(fig, "fig1_2")


def fig1_3_source_location():
    fig, axes = plt.subplots(1, 2, figsize=(9.0, 3.65), constrained_layout=True)
    draw_mode_board(axes[0], source_x=0.65, panel_label="(a)", subtitle="Short-end placement")
    draw_mode_board(axes[1], source_x=5.0, panel_label="(b)", subtitle="Long-edge center placement")
    fig.text(0.5, 0.015, "The modal reference is identical in both panels; only the source location changes.",
             ha="center", va="bottom", fontsize=8.8, color=MUTED)
    save(fig, "fig1_3")


def fig2_2_mode_profile():
    fig = plt.figure(figsize=(8.0, 6.1), constrained_layout=True)
    gs = fig.add_gridspec(2, 1, height_ratios=[1.15, 1.0])
    ax0 = fig.add_subplot(gs[0])
    draw_mode_board(ax0, source_x=None, panel_label="(a)", subtitle="Simplified long-axis chassis mode")
    ax0.text(5.0, 2.86, "surface-current maximum", color=BLUE, ha="center", va="bottom", fontsize=8.8)
    ax0.text(0.22, 0.18, "charge / fringing-E\nregion", color=MUTED, ha="left", va="bottom", fontsize=8.2)
    ax0.text(9.78, 0.18, "charge / fringing-E\nregion", color=MUTED, ha="right", va="bottom", fontsize=8.2)
    draw_dimension(ax0, (0, 0), (10, 0), "150 mm", offset=(0, -0.32), text_offset=(0, -0.12))
    draw_dimension(ax0, (10, 0), (10, 4.8), "80 mm", offset=(0.52, 0), text_offset=(0.20, 0))

    ax1 = fig.add_subplot(gs[1])
    x = np.linspace(0, 1, 500)
    j = np.sin(np.pi * x)
    rho = np.abs(np.cos(np.pi * x))
    ax1.plot(x, j, color=BLUE, linewidth=2.0, label=r"Surface-current envelope $|J_s|$")
    ax1.plot(x, rho, color=MUTED, linewidth=1.7, linestyle=(0, (5, 3)),
             label=r"Surface-charge / fringing-$E$ proxy")
    ax1.set_xlim(0, 1)
    ax1.set_ylim(0, 1.08)
    ax1.set_xlabel(r"Normalized position along the chassis, $x/L$")
    ax1.set_ylabel("Normalized amplitude")
    ax1.text(-0.01, 1.04, "(b)", transform=ax1.transAxes, fontweight="bold", fontsize=10)
    clean_axes(ax1, grid=True)
    ax1.legend(frameon=False, loc="upper center", ncol=2)
    save(fig, "fig2_1")


def fig3_1_coupling_elements():
    fig, axes = plt.subplots(1, 2, figsize=(9.1, 4.0), constrained_layout=True)
    # Capacitive coupling element near the short end.
    draw_mode_board(axes[0], source_x=None, panel_label="(a)", subtitle="Capacitive coupling near an E-field maximum")
    ax = axes[0]
    # CCE plate above short end with a visible gap.
    ax.add_patch(Rectangle((0.35, 5.15), 1.35, 0.34, facecolor=PAPER, edgecolor=INK, linewidth=1.5))
    ax.plot([0.72, 0.72], [4.82, 5.15], color=INK, linewidth=1.2)
    ax.plot([0.54, 0.90], [4.82, 4.82], color=INK, linewidth=0.9)
    ax.annotate("gap", xy=(0.35, 5.05), xytext=(1.95, 5.55), fontsize=8.3, color=MUTED,
                arrowprops=dict(arrowstyle="-", color=MUTED, linewidth=0.7))
    ax.text(1.02, 5.77, "CCE", ha="center", va="bottom", fontsize=8.8, fontweight="bold")
    ax.text(0.55, 0.15, "current minimum / charge maximum", ha="left", va="bottom", fontsize=8.2, color=MUTED)

    # Inductive coupling element near the long-edge center.
    draw_mode_board(axes[1], source_x=None, panel_label="(b)", subtitle="Inductive coupling near a current maximum")
    ax = axes[1]
    ax.add_patch(Rectangle((4.25, 4.86), 1.50, 0.72, fill=False, edgecolor=INK, linewidth=1.5))
    ax.plot([4.55, 4.55], [4.58, 4.86], color=INK, linewidth=1.2)
    ax.plot([4.37, 4.73], [4.58, 4.58], color=INK, linewidth=0.9)
    ax.text(5.00, 5.78, "ICE", ha="center", va="bottom", fontsize=8.8, fontweight="bold")
    # H_z symbol at board edge, drawn rather than relying on Unicode.
    ax.add_patch(Circle((5.0, 4.30), 0.16, fill=False, edgecolor=MUTED, linewidth=0.8))
    ax.add_patch(Circle((5.0, 4.30), 0.035, facecolor=MUTED, edgecolor=MUTED))
    ax.text(5.25, 4.30, r"$H_z$", ha="left", va="center", fontsize=8.5, color=MUTED)
    ax.text(5.0, 0.15, "surface-current maximum", ha="center", va="bottom", fontsize=8.2, color=MUTED)
    fig.text(0.5, 0.012,
             "CCE and ICE are established coupling-element examples; a practical IFA, PIFA, loop, or slot may combine both mechanisms.",
             ha="center", va="bottom", fontsize=8.4, color=MUTED)
    save(fig, "fig3_1")


def fig4_1_loaded_geometry():
    fig, axes = plt.subplots(1, 2, figsize=(8.4, 5.25), constrained_layout=True,
                             gridspec_kw={"width_ratios": [0.85, 1.35]})

    # (a) Overall ground and clearance.
    ax = axes[0]
    W, H, clearance = 50.0, 115.0, 5.0
    ax.add_patch(Rectangle((0, 0), W, H, facecolor=LIGHT_GREY, edgecolor=INK, linewidth=1.1))
    ax.add_patch(Rectangle((0, H-clearance), 25.0, clearance, facecolor=PAPER, edgecolor=BLUE,
                           linewidth=1.2, linestyle=(0, (4, 2))))
    ax.text(W/2, H/2, "ground plane", ha="center", va="center", fontsize=9.3, color=MUTED)
    ax.annotate("antenna clearance", xy=(12.5, H-2.5), xytext=(34, H+8),
                ha="center", va="bottom", fontsize=8.5, color=MUTED,
                arrowprops=dict(arrowstyle="-", color=MUTED, linewidth=0.8))
    draw_dimension(ax, (0, 0), (W, 0), "50 mm", offset=(0, -5), text_offset=(0, -1.8))
    draw_dimension(ax, (W, 0), (W, H), "115 mm", offset=(5.5, 0), text_offset=(2.0, 0))
    ax.set_xlim(-8, 64)
    ax.set_ylim(-11, 131)
    ax.set_aspect("equal")
    ax.axis("off")
    ax.text(-0.02, 1.01, "(a)", transform=ax.transAxes, fontweight="bold", fontsize=10)

    # (b) Enlarged view of the 25 mm x 5 mm clearance and loaded path.
    ax = axes[1]
    cw, ch = 25.0, 5.0
    ax.add_patch(Rectangle((0, 0), cw, ch, facecolor=LIGHT_GREY, edgecolor=INK, linewidth=1.0))
    # U-shaped antenna path referenced to the original thesis geometry.
    y_top = 4.05
    x_short, x_feed, x_end = 1.7, 5.0, 23.1
    ax.plot([x_short, x_short, x_end, x_end], [0.85, y_top, y_top, 0.85],
            color=INK, linewidth=2.1, solid_joinstyle="miter")
    ax.plot([x_feed, x_feed], [0.55, y_top], color=INK, linewidth=1.2)
    ax.add_patch(Circle((x_feed, 0.55), 0.28, facecolor=PAPER, edgecolor=INK, linewidth=0.9))
    # Series L at the start branch and C at the end branch.
    ax.add_patch(Rectangle((x_feed-0.55, y_top-0.31), 1.10, 0.62,
                           facecolor=PAPER, edgecolor=INK, linewidth=0.9))
    ax.text(x_feed, y_top, "L", ha="center", va="center", fontsize=8.6, fontweight="bold")
    ax.add_patch(Rectangle((x_end-0.55, 0.95), 1.10, 0.62,
                           facecolor=PAPER, edgecolor=INK, linewidth=0.9))
    ax.text(x_end, 1.26, "C", ha="center", va="center", fontsize=8.6, fontweight="bold")
    ax.text(x_feed, 0.05, "feed / start", ha="center", va="top", fontsize=8.2)
    ax.text(x_end, 0.05, "end", ha="center", va="top", fontsize=8.2)
    draw_dimension(ax, (x_short, y_top), (x_feed, y_top), r"$D_f$", offset=(0, 0.62), text_offset=(0, 0.38))
    draw_dimension(ax, (0, 0), (cw, 0), "25 mm", offset=(0, -1.0), text_offset=(0, -0.35))
    draw_dimension(ax, (cw, 0), (cw, ch), "5 mm", offset=(1.35, 0), text_offset=(0.55, 0))
    ax.text(12.5, 5.95, "Enlarged loaded-antenna geometry", ha="center", va="bottom", fontsize=9.2)
    ax.text(12.5, -1.85, "Series L and end C are varied while the resonance is retuned near 800 MHz.",
            ha="center", va="top", fontsize=8.5, color=MUTED)
    ax.set_xlim(-2.2, 29.0)
    ax.set_ylim(-2.6, 7.2)
    ax.set_aspect("equal")
    ax.axis("off")
    ax.text(-0.02, 1.01, "(b)", transform=ax.transAxes, fontweight="bold", fontsize=10)
    save(fig, "fig4_1")

def fig4_3_bandwidth():
    rows = []
    with (DATA / "fig4_bandwidth.csv").open(newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))
    cases = np.array([int(row["case"]) for row in rows])
    sim = np.array([float(row["sim_minus6dB_bandwidth_MHz"]) for row in rows])
    meas = np.array([float(row["meas_minus6dB_bandwidth_MHz"]) for row in rows])
    fig, ax = plt.subplots(figsize=(7.6, 4.75), constrained_layout=True)
    ax.plot(cases, sim, marker="o", markersize=5.5, linewidth=1.8, color=BLUE,
            label="Simulation: radiation loss only")
    ax.plot(cases, meas, marker="s", markersize=5.2, linewidth=1.5, color=INK,
            linestyle=(0, (4, 2)), label="Measurement")
    ax.set_xticks(cases, [f"#{i}" for i in cases])
    ax.set_xlabel("Tuned loading case")
    ax.set_ylabel("−6 dB impedance bandwidth (MHz)")
    ax.set_xlim(0.75, 5.25)
    ax.set_ylim(0, 45)
    clean_axes(ax, grid=True)
    ax.legend(frameon=False, loc="upper left")
    ax.annotate("more loop-like", xy=(1, 3.0), ha="center", va="bottom", fontsize=8.7, color=MUTED)
    ax.annotate("more monopole-like", xy=(5, 3.0), ha="center", va="bottom", fontsize=8.7, color=MUTED)
    ax.text(0.99, 0.75,
            "Measured bandwidth also includes\ncomponent, conductor, and dielectric loss.",
            transform=ax.transAxes, ha="right", va="top", fontsize=8.4, color=MUTED,
            bbox=dict(facecolor=PAPER, edgecolor=RULE, linewidth=0.7, boxstyle="square,pad=0.35"))
    save(fig, "fig4_3")


def font(size: int, bold: bool = False):
    paths = [
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
        "arialbd.ttf" if bold else "arial.ttf",
    ]
    for p in paths:
        if Path(p).exists():
            try:
                return ImageFont.truetype(p, size=size)
            except Exception:
                pass
    try:
        return ImageFont.truetype("arial.ttf", size=size)
    except Exception:
        return ImageFont.load_default()


def fit_image(im: Image.Image, size: tuple[int, int], background=(255, 254, 251)) -> Image.Image:
    target = Image.new("RGB", size, background)
    copy = im.copy().convert("RGB")
    copy.thumbnail(size, Image.Resampling.LANCZOS)
    target.paste(copy, ((size[0]-copy.width)//2, (size[1]-copy.height)//2))
    return target


def fig2_3_cma_composite():
    ab = Image.open(SRC / "fig2_2_modes_a_b.jpg").convert("RGB")
    bc = Image.open(SRC / "fig2_2_modes_b_c.jpg").convert("RGB")
    ms = Image.open(SRC / "fig2_3_modal_significance.jpg").convert("RGB")
    # Crop the three source mode images without inventing or redrawing simulation data.
    j1 = ab.crop((8, 0, ab.width-8, 312))
    j2 = bc.crop((8, 0, bc.width-8, 155))
    j3 = bc.crop((8, 162, bc.width-8, 485))
    W, H = 2200, 1350
    canvas = Image.new("RGB", (W, H), (255, 254, 251))
    d = ImageDraw.Draw(canvas)
    d.text((70, 45), "Characteristic currents", font=font(32, True), fill=(23, 25, 28))
    d.text((1420, 45), "Modal significance", font=font(32, True), fill=(23, 25, 28))
    y_positions = [145, 505, 865]
    crops = [j1, j2, j3]
    for idx, (crop, y) in enumerate(zip(crops, y_positions), start=1):
        panel = fit_image(crop, (1240, 285))
        canvas.paste(panel, (70, y))
        d.text((90, y + 8), f"Mode {idx}", font=font(25, True), fill=(23, 25, 28))
    ms_panel = fit_image(ms, (710, 650))
    canvas.paste(ms_panel, (1415, 265))
    # Fine rules only; no infographic box styling.
    d.line((1350, 100, 1350, 1240), fill=(216, 212, 203), width=2)
    d.text((70, 1290), "30 mm × 150 mm rectangular conducting plate; original simulation data from the author's dissertation.",
           font=font(22), fill=(95, 99, 104))
    canvas.save(OUT / "fig2_2.png", quality=96, dpi=(300, 300))


def fig4_2_current_composite():
    mono = Image.open(SRC / "fig2_13_case5_monopole.jpg").convert("RGB")
    loop = Image.open(SRC / "fig2_13_case1_loop.jpg").convert("RGB")
    # One shared color scale, and two equally sized data panels.
    colorbar = mono.crop((0, 0, 1010, 78))
    mono_body = mono.crop((0, 78, mono.width, mono.height))
    loop_body = loop.crop((0, 78, loop.width, loop.height))
    W, H = 2400, 1080
    canvas = Image.new("RGB", (W, H), (255, 254, 251))
    d = ImageDraw.Draw(canvas)
    d.text((85, 55), "(a) Case #5: more monopole-like", font=font(30, True), fill=(23, 25, 28))
    d.text((85, 100), "L = 48.4 nH, C = 0.10 pF", font=font(24), fill=(95, 99, 104))
    d.text((1245, 55), "(b) Case #1: more loop-like", font=font(30, True), fill=(23, 25, 28))
    d.text((1245, 100), "L = 0.10 nH, C = 1.07 pF", font=font(24), fill=(95, 99, 104))
    # Shared source color scale.
    cb = fit_image(colorbar, (1050, 105))
    canvas.paste(cb, (675, 145))
    p1 = fit_image(mono_body, (1110, 650))
    p2 = fit_image(loop_body, (1110, 650))
    canvas.paste(p1, (55, 285))
    canvas.paste(p2, (1235, 285))
    d.line((1200, 260, 1200, 950), fill=(216, 212, 203), width=2)
    d.text((85, 1000), "Computed surface-current magnitude at 800 MHz; the two panels use the original thesis simulation output.",
           font=font(22), fill=(95, 99, 104))
    canvas.save(OUT / "fig4_2.png", quality=96, dpi=(300, 300))


if __name__ == "__main__":
    fig1_2_small_antenna_q()
    fig1_3_source_location()
    fig2_2_mode_profile()
    fig3_1_coupling_elements()
    fig4_1_loaded_geometry()
    fig4_3_bandwidth()
    fig2_3_cma_composite()
    fig4_2_current_composite()
    print(f"Generated figures in {OUT}")
