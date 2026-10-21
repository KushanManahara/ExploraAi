Floating top header: brand left, pill nav centred, clock + accent CTA right. It hides when you scroll down, flips between dark and light text to match the section underneath, and sits on a full-width blur that dissolves below the bar.
```jsx
<NavBar position="fixed" active="Projects" onNavigate={setPage} />
<section data-nav-theme="light">…</section>
<section data-nav-theme="dark" style={{ background: 'var(--km-night)' }}>…</section>

// inside a scroll container
<div ref={box} style={{ overflow: 'auto', height: 400 }}>
  <NavBar position="sticky" scrollTarget={box} />
  …
</div>
```
- **Theming contract:** tag any section `data-nav-theme="light"` (ink text) or `"dark"` (paper text). The innermost tagged element under the bar's centre line wins, so a dark card inside a light section works. Untagged areas use `defaultTheme`.
- Detection uses IntersectionObserver (no per-scroll maths), so it works with normal scrolling, anchor jumps and route changes, because new sections are picked up automatically.
- All foreground (links, wordmark, clock, pill border/fill, active chip) derives from `currentColor`, and colour changes cross-fade over .45s.
- `backdrop={false}` removes the blur. `theme="dark"` forces a theme. `hideOnScroll={false}` keeps the bar pinned. `position="static"` (default) = plain row with none of the behavior.
