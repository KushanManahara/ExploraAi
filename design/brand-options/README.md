# ExploraAi logo options (for review)

Three directions, built only from the design system: Familjen Grotesk 500, navy ink `#0B1530`, paper `#EEF1F7`, night `#070B16` and the one accent `#4F6BFF`. Open `preview.html` in a browser to compare them.

| Option | Idea | Files |
|---|---|---|
| A — Tonal wordmark | "Explora" in ink, "Ai" at 40 %, accent dot as a full stop. Icon: "e" + dot. Closest to the design system's wordmark pattern. | `option-a-*.svg` |
| B — Focus lens | A ring with an accent dot off-centre: a lens that found one exact point. Single-tone wordmark. | `option-b-*.svg` |
| C — Citation brackets | Brackets around an accent dot, like an in-text citation. Wordmark with a mono "AI" tag. | `option-c-*.svg` |

Each option has a wordmark for light backgrounds, a `-night` wordmark for dark backgrounds, and a 512 × 512 app icon.

- Text is converted to outlines, so the files look the same without the fonts installed.
- Regenerate with the scripts in `tools/`; the commands are at the top of each script.
- After a choice: tune the kerning by eye, export favicon and app-icon PNGs, and wire the mark into the web app (M8).
- Not MIT-licensed; see `LICENSING.md`.
