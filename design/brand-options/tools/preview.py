# design/brand-options/tools/preview.py
# RUN AFTER generate.py: python3 design/brand-options/tools/preview.py
import pathlib, sys, re
D = pathlib.Path("/home/user/ExploraAi/design/brand-options")
def inline(name, h=None):
    s = (D / name).read_text()
    s = re.sub(r'<title>.*?</title>', '', s)
    if h: s = re.sub(r'width="[\d.]+" height="[\d.]+"', f'height="{h}"', s, count=1)
    return s
opts = [
 ("A", "Tonal wordmark", "“Explora” in ink, “Ai” at 40%, and the accent dot as a full stop. It follows the design system’s wordmark pattern most closely, and the icon is a lowercase “e” plus the dot, like the existing km● icon.", "Safest fit with the design system; quiet and readable. Least distinctive."),
 ("B", "Focus lens", "A ring with an accent dot off-centre: a lens that has found one exact point, the way an answer points to one page. The wordmark is a single tone.", "Most ownable symbol; the icon works without text. The ring may read as a plain “o” at very small sizes."),
 ("C", "Citation brackets", "Brackets around an accent dot, like an in-text citation [●]. The wordmark pairs the grotesk “Explora” with a mono “AI” tag, reusing the design system’s tag style.", "Speaks directly to the product’s core idea (answers with sources). The tag adds one more element to keep crisp at small sizes."),
]
cards = []
for k, name, idea, trade in opts:
    l = k.lower()
    cards.append(f'''
<section class="opt">
  <header><span class="tag">Option {k}</span><h2>{name}</h2></header>
  <p>{idea}</p>
  <div class="row light">{inline(f"option-{l}-wordmark.svg", 56)}</div>
  <div class="row dark">{inline(f"option-{l}-wordmark-night.svg", 56)}</div>
  <div class="row icons">
    <span>{inline(f"option-{l}-icon.svg", 112)}</span>
    <span>{inline(f"option-{l}-icon.svg", 64)}</span>
    <span>{inline(f"option-{l}-icon.svg", 32)}</span>
    <span>{inline(f"option-{l}-icon.svg", 16)}</span>
    <span class="tiny">{inline(f"option-{l}-wordmark.svg", 22)}</span>
  </div>
  <p class="trade"><b>Trade-off:</b> {trade}</p>
</section>''')
html = f'''<!doctype html>
<!-- design/brand-options/preview.html — REVIEW SHEET FOR THE EXPLORAAI LOGO OPTIONS (GENERATED; SVGS ARE OUTLINED). -->
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>ExploraAi logo options</title>
<style>
:root{{--paper:#EEF1F7;--ink:#0B1530;--night:#070B16;--accent:#4F6BFF}}
body{{margin:0;background:var(--paper);color:var(--ink);font:16px/1.5 ui-sans-serif,system-ui,sans-serif;padding:32px 16px}}
main{{max-width:1100px;margin:0 auto}}
h1{{font-weight:500;letter-spacing:-.03em;margin:0 0 6px}} .lede{{opacity:.65;margin:0 0 28px}}
.grid{{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:20px}}
.opt{{background:#fff;border-radius:20px;padding:22px}}
.opt header{{display:flex;gap:10px;align-items:baseline}} h2{{margin:0;font-weight:500;letter-spacing:-.02em}}
.tag{{font:500 11px ui-monospace,monospace;text-transform:uppercase;letter-spacing:.06em;background:rgba(11,21,48,.07);padding:3px 9px;border-radius:99px}}
.opt p{{font-size:14px;opacity:.8}} .trade{{border-top:1px solid rgba(11,21,48,.12);padding-top:10px}}
.row{{border-radius:14px;padding:18px;margin:10px 0;display:flex;align-items:center;gap:14px;flex-wrap:wrap}}
.light{{background:var(--paper)}} .dark{{background:var(--night)}} .icons{{background:var(--paper)}}
.row svg{{display:block;max-width:100%}}
</style></head><body><main>
<h1>ExploraAi logo options</h1>
<p class="lede">Three directions built from the design system: Familjen Grotesk 500, navy ink, paper, and the single electric-blue accent. Each shows the wordmark on paper and night, the app icon at 112, 64, 32 and 16 px, and a small wordmark.</p>
<div class="grid">{"".join(cards)}</div>
</main></body></html>
'''
(D / "preview.html").write_text(html)
print("ok")
