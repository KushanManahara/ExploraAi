# design/brand-options/tools/generate.py
# RUN: uv run --no-project --with fonttools==4.60.1 --with brotli --with uharfbuzz python -I design/brand-options/tools/generate.py design/brand-options
# GENERATES THE EXPLORAAI LOGO OPTIONS AS OUTLINED SVGS (NO FONT NEEDED TO VIEW THEM).
import io, sys, pathlib
import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

FONTS = pathlib.Path("/home/user/ExploraAi/design/claude-design/fonts")
OUT = pathlib.Path(sys.argv[1]); OUT.mkdir(parents=True, exist_ok=True)
INK, PAPER, ACCENT, NIGHT = "#0B1530", "#EEF1F7", "#4F6BFF", "#070B16"

class Face:
    def __init__(self, file, wght):
        tt = TTFont(FONTS / file)
        inst = instantiateVariableFont(tt, {"wght": wght})
        buf = io.BytesIO(); inst.flavor = None; inst.save(buf)
        self.tt = TTFont(io.BytesIO(buf.getvalue()))
        self.gs = self.tt.getGlyphSet(); self.order = self.tt.getGlyphOrder()
        self.upm = self.tt["head"].unitsPerEm
        self.hbfont = hb.Font(hb.Face(buf.getvalue()))
        self.cap = self.tt["OS/2"].sCapHeight
        self.xh = self.tt["OS/2"].sxHeight

    def runs(self, segments, size, tracking_em):
        """SEGMENTS: [(text, fill, opacity)]. RETURNS (svg_paths, width) WITH KERNING FROM GPOS + TRACKING."""
        text = "".join(t for t, *_ in segments)
        buf = hb.Buffer(); buf.add_str(text); buf.guess_segment_properties()
        hb.shape(self.hbfont, buf, {"kern": True, "liga": False})
        s = size / self.upm; x = 0.0; paths = {i: [] for i in range(len(segments))}
        bounds = []; starts = []; acc = 0
        for t, *_ in segments: starts.append(acc); acc += len(t)
        for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
            seg = max(i for i, st in enumerate(starts) if info.cluster >= st)
            name = self.order[info.codepoint]
            pen = SVGPathPen(self.gs, lambda v: f"{v:.2f}".rstrip("0").rstrip("."))
            ox = x + pos.x_offset * s
            self.gs[name].draw(TransformPen(pen, (s, 0, 0, -s, ox, 0)))
            paths[seg].append(pen.getCommands())
            x += pos.x_advance * s + tracking_em * size
        width = x - tracking_em * size
        out = []
        for i, (t, fill, op) in enumerate(segments):
            o = f' fill-opacity="{op}"' if op < 1 else ""
            out.append(f'<path fill="{fill}"{o} d="{" ".join(paths[i])}"/>')
        return "\n  ".join(out), width

grot = Face("FamiljenGrotesk-500.woff2", 500)
mono = Face("SplineSansMono-500.woff2", 500)

def svg(w, h, body, title):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.1f} {h:.1f}" width="{w:.0f}" height="{h:.0f}" role="img" aria-label="{title}">\n'
            f'  <title>{title}</title>\n  {body}\n</svg>\n')

def write(name, content):
    (OUT / name).write_text(content)

def tile(body, bg=INK):
    return svg(512, 512, f'<rect width="512" height="512" rx="112" fill="{bg}"/>\n  {body}', "ExploraAi app icon")

SIZE = 100; PAD = 8
cap = grot.cap * SIZE / grot.upm
asc = 0.98 * SIZE  # ROOM FOR ASCENDERS (l) AND DESCENDERS (p)
H = SIZE * 1.32

# ---------- OPTION A: TONAL WORDMARK + ACCENT FULL STOP (MATCHES THE DESIGN SYSTEM'S BrandMark PATTERN) ----------
def option_a(ink, muted_fill):
    paths, w = grot.runs([("Explora", ink, 1), ("Ai", muted_fill, 0.4)], SIZE, -0.04)
    r = SIZE * 0.085
    dot_x = w + r + SIZE * 0.03
    body = f'<g transform="translate({PAD},{asc})">\n  {paths}\n  <circle cx="{dot_x:.2f}" cy="{-r:.2f}" r="{r:.2f}" fill="{ACCENT}"/>\n</g>'
    return svg(dot_x + r + PAD * 2, H, body, "ExploraAi")
write("option-a-wordmark.svg", option_a(INK, INK))
write("option-a-wordmark-night.svg", option_a(PAPER, PAPER))
e_paths, e_w = grot.runs([("e", PAPER, 1)], 330, 0)
e_body = f'<g transform="translate({(512 - e_w) / 2 - 34:.1f},{256 + grot.xh * 330 / grot.upm / 2:.1f})">\n  {e_paths}\n  <circle cx="{e_w + 42:.1f}" cy="-27" r="27" fill="{ACCENT}"/>\n</g>'
write("option-a-icon.svg", tile(e_body))

# ---------- OPTION B: "FOCUS" LENS MARK + ONE-TONE WORDMARK ----------
def lens(cx, cy, r, stroke, ring, dot_r):
    return (f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{ring}" stroke-width="{stroke}"/>\n'
            f'  <circle cx="{cx + r * 0.42:.1f}" cy="{cy + r * 0.42:.1f}" r="{dot_r}" fill="{ACCENT}"/>')
def option_b(ink):
    paths, w = grot.runs([("ExploraAi", ink, 1)], SIZE, -0.035)
    mark_r = cap * 0.42; stroke = cap * 0.14; gap = SIZE * 0.26
    mx = PAD + mark_r + stroke / 2; my = asc - cap / 2
    body = (f'{lens(round(mx, 2), round(my, 2), round(mark_r, 2), round(stroke, 2), ink, round(cap * 0.13, 2))}\n'
            f'  <g transform="translate({mx + mark_r + stroke / 2 + gap:.2f},{asc})">\n  {paths}\n</g>')
    return svg(mx + mark_r + stroke / 2 + gap + w + PAD, H, body, "ExploraAi")
write("option-b-wordmark.svg", option_b(INK))
write("option-b-wordmark-night.svg", option_b(PAPER))
write("option-b-icon.svg", tile(lens(256, 256, 128, 46, PAPER, 40)))

# ---------- OPTION C: CITATION BRACKETS [●] + WORDMARK WITH A MONO "AI" TAG ----------
def brackets(cx, cy, h, w, stroke, color, dot_r):
    x0, x1 = cx - w / 2, cx + w / 2; y0, y1 = cy - h / 2, cy + h / 2; arm = w * 0.2
    d = (f"M{x0 + arm:.1f} {y0:.1f}H{x0:.1f}V{y1:.1f}H{x0 + arm:.1f} "
         f"M{x1 - arm:.1f} {y0:.1f}H{x1:.1f}V{y1:.1f}H{x1 - arm:.1f}")
    return (f'<path d="{d}" fill="none" stroke="{color}" stroke-width="{stroke}" stroke-linecap="square"/>\n'
            f'  <circle cx="{cx}" cy="{cy}" r="{dot_r}" fill="{ACCENT}"/>')
def option_c(ink, tag_bg_opacity):
    word, w = grot.runs([("Explora", ink, 1)], SIZE, -0.04)
    tag_size = SIZE * 0.42
    tag, tw = mono.runs([("AI", ink, 1)], tag_size, 0.06)
    tag_cap = mono.cap * tag_size / mono.upm
    pad_x, pad_y = tag_size * 0.42, tag_size * 0.34
    tag_w, tag_h = tw + pad_x * 2, tag_cap + pad_y * 2
    tx = w + SIZE * 0.14
    body = (f'<g transform="translate({PAD},{asc})">\n  {word}\n'
            f'  <rect x="{tx:.2f}" y="{-cap:.2f}" width="{tag_w:.2f}" height="{tag_h:.2f}" rx="{tag_h / 2:.2f}" fill="{ink}" fill-opacity="{tag_bg_opacity}"/>\n'
            f'  <g transform="translate({tx + pad_x:.2f},{-cap + pad_y + tag_cap:.2f})">\n  {tag}\n  </g>\n</g>')
    return svg(PAD * 2 + tx + tag_w, H, body, "ExploraAi")
write("option-c-wordmark.svg", option_c(INK, 0.07))
write("option-c-wordmark-night.svg", option_c(PAPER, 0.14))
write("option-c-icon.svg", tile(brackets(256, 256, 236, 250, 44, PAPER, 42)))
print("ok", sorted(p.name for p in OUT.iterdir()))
