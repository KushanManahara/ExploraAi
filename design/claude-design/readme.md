# Kushan Manahara — Portfolio Design System

Design system extracted from the personal portfolio of **Kushan Manahara**, ML & software engineer based in Oslo. One product surface: a scroll-driven portfolio site — Home, About, Experience(s), Tech Stack, Journey, All Projects, Project case study.

**Sources** (Claude Design project "Portfolio", id `95cc461d-7863-4f93-b7d6-87f413f4a1de`):
- Primary: `Portfolio v2.dc.html` — https://claude.ai/design/p/95cc461d-7863-4f93-b7d6-87f413f4a1de?file=Portfolio+v2.dc.html
- Also: `About`, `Experiences`, `Tech Stack`, `Journey`, `All Projects`, `Project` `.dc.html` + `*-data.js`, `handoff-featured-cards/CHANGES.md` (v1 → v2 diff), `icon-handoff/` (app icon), `logos/` (tech SVGs), and the project's earlier `design-system/` extraction.
- v2 vs v1 is a motion change only: the featured-project orbit now flies cards in from depth with blur, then collapses them into a tilted stacked deck before exit (honours `prefers-reduced-motion`). Visual tokens are unchanged.

## Index
- `styles.css` — entry point (imports only) → `tokens/` fonts, colors, typography, spacing, effects, base
- `fonts/` — self-hosted woff2 (latin) for Familjen Grotesk and Spline Sans Mono
- `components/` — React primitives (`.jsx` + `.d.ts` + `.prompt.md`, one `*.card.html` per folder)
- `guidelines/` — foundation specimen cards (colors, type, spacing, radii, shadows, glass, motion, brand)
- `ui_kits/portfolio/` — click-through recreation: Home → All projects → Case study
- `assets/brand/` — km● app icon PNGs (512, 192, 180 apple, 32 favicon)
- `thumbnail.html`, `SKILL.md`

## Components
- **core/** — `Button`, `ArrowOrb`, `Tag`, `StatusDot`, `BrandMark`, `Eyebrow`
- **navigation/** — `NavBar`, `SegmentedLens`
- **content/** — `SectionHeading` (+ `Em`), `FactList`, `Stat`, `ToolTile`
- **cards/** — `ExpertiseCard`, `QuoteCard`, `ProjectCard`, `ProjectRow`
- **chat/** — `ChatWidget` (floating launcher pill → glass panel; thinking shimmer → typing dots → word-by-word streaming)
- UI kit screens (also exported): `Home`, `ProjectsIndex`, `CaseStudy`, `PROJECTS` data

## Content fundamentals
- **Voice:** first person, plain, quietly confident. "I design the model, the pipeline around it, and the evaluation that proves it works." No hype words, no exclamation marks.
- **Concrete over claims:** outcomes are numbers with units — "38% tickets resolved end-to-end", "−58% GPU cost", "12 ms p99". Real minus sign (−) and middle dot (·) separators.
- **Casing:** sentence case for headings and buttons. Mono eyebrows UPPERCASE, .06em tracking.
- **Headline formula:** short grotesk phrase + a two-tone emphasis tail (same face, ink at 40%) ending in a period: "What I **build.**", "Measured in **systems shipped.**", "Five systems, **in production.**", "Every system, **one list.**" No italics.
- **Numbering:** "01 — Problem", "Project 01 / 05 — Kestrel AI". Spaced em dash is the universal separator.
- **Buttons:** 2–4 words + arrow glyph: "More about me →", "All projects ↗", "← All work", "← Back to the orbit", "Let's build".
- **Humility notes:** "The model is rarely the hard part…", "Everything here has run in production, not only in a notebook."
- **Emoji:** never.

## Visual foundations
- **Color:** cool paper `#EEF1F7` page, navy ink `#0B1530` for text and primary buttons, near-black night `#070B16` for inverse sections/outcome panels/preloader. One electric-blue accent `#4F6BFF` (tweakable `#6D7CFF` / `#1E9BFF`) used sparingly: CTA, arrows, progress bars, lamp dots, quote marks. Signals (green `#2FBF71`, blue `#5B8CFF`, amber `#FFB547`) only for status. Hierarchy comes from ink **opacity** (.55–.8), not extra greys.
- **Type:** Familjen Grotesk 500 for almost everything, tight tracking (−.035 to −.055em), line-heights under 1 at display sizes, fluid `clamp()`. Emphasis is **tonal, not stylistic**: the tail of a headline drops to `--em-muted` (currentColor 40%); `tone="accent"` for a single hero moment. Spline Sans Mono 500 for labels, numbers, tags, captions. No serif, no italics (replaced Newsreader italic from the source on request).
- **Layout:** 12-col grid, 3vw gutters, 2vw column gap. Tall sections (20–24vh padding). Left 4–5 cols often `position:sticky; top:14vh` while the right scrolls. Hairline rules (ink 12%) separate list rows. Fixed elements: top 2px accent progress bar, floating header.
- **Header behavior:** `NavBar position="fixed"` slides up on scroll-down and returns on scroll-up. It adapts to the section underneath: any element tagged `data-nav-theme="light|dark"` sets ink or paper text, detected by IntersectionObserver on the bar's centre line, with a .45s colour cross-fade. Behind it is a full-width, layered backdrop blur (1→8px) with a faint theme wash, masked so it dissolves ~36px below the bar. There is no solid strip, and nav content stays sharp. **Tag dark sections with `data-nav-theme="dark"`.**
- **Backgrounds:** flat paper; hero has one soft radial accent wash; a WebGL canvas sits behind content. Dark diagram panels have no grid: a soft accent glow rests top-right (`--glow-rest`), and on hover a matching accent spotlight follows the cursor (`::before` radial-gradient of `--spotlight-color`, `--spotlight-size` 280px, at `--mx/--my` set from pointermove via rAF, fades in/out over .45s, house curve; off under reduced motion). No other gradients. A section can slide over the previous as a sheet with 44px top radii.
- **Imagery:** full-bleed photos in 18–20px rounded frames with an ink scrim top + bottom for mono overlays; captions in glass pills. Cool, neutral tone; placeholder `#DCE2EE`.
- **Corners:** pill (99px) for buttons, tags, nav; 20px cards; 18px media/quotes; 14px list hover rows; 12px diagram nodes; 9px logo tiles; 6px brand square.
- **Cards:** no border. Rest = white 50%; hover = solid white + long soft negative-spread shadow (`0 30px 60px -30px`). Project cards carry `0 50px 80px -44px`.
- **Transparency & blur:** sticky bars/overlay headers = paper 86% + 14px blur. Nav is a frosted pill (blur 18 + saturate 1.4) using `color-mix(currentColor…)` so it adapts over dark sections, with a masked blur band behind the header.
- **Motion:** one house curve `cubic-bezier(.2,.8,.1,1)`, .3–.55s. Hover = background fill (to white or darker alpha); link arrows widen gap 8→14px; magnetic buttons drift. Scroll choreography (GSAP + Lenis): split-text reveals, sticky progress rails, scaleX line draws, clip-path circle wipe into the index, 3D orbit carousel → stacked deck. Availability dot pulses. No bounces.
- **Press:** no distinct pressed style in source — rely on hover.

## Iconography
- No icon font or icon set. The one exception is `ChatWidget`, which uses the Lucide `message-circle` glyph inline (ISC). **Unicode arrows** (→ ↗ ↓ ←) are the only UI glyphs, often inside an `ArrowOrb` or tinted accent. “ in grotesk 600, accent, as quote mark.
- 7px dots act as status lamps. The accent dot doubles as the brand full stop.
- No tech logos — stack items use mono-letter `ToolTile`s.
- **Brand:** `BrandMark` wordmark = "Kushan" ink + " Manahara" muted + accent dot (inherits color, flips on night). Monogram/app icon = lowercase "km" + accent dot, paper on navy tile (`assets/brand/`). Both replace the source's square-dot mark and stacked-plates icon.

## Intentional additions
- `ChatWidget`: requested addition with no counterpart in the source site. It follows the house curve, ink/paper/accent palette, pill radii and first-person voice.
- `Em` helper (exported from SectionHeading) — the two-tone emphasis tail used in every headline.

## Deviations from source (by request)
- Serif-italic emphasis → two-tone ink. Newsreader removed.
- Tech logos removed.
- New wordmark and app icon (km●).
