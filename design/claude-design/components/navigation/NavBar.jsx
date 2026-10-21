import React from 'react';
import { BrandMark } from '../core/BrandMark';
import { StatusDot } from '../core/StatusDot';
import { Button } from '../core/Button';

const resolve = t => (t && 'current' in t ? t.current : t) || null;

/* Hide on scroll-down, reveal on scroll-up. Always shown near the top. */
function useAutoHide(enabled, target) {
  const [hidden, setHidden] = React.useState(false);
  React.useEffect(() => {
    if (!enabled) { setHidden(false); return; }
    const el = resolve(target), src = el || window;
    const getY = () => (el ? el.scrollTop : window.scrollY);
    let last = getY(), acc = 0, raf = 0;
    const tick = () => {
      raf = 0;
      const y = getY(), d = y - last; last = y;
      if (y < 80) { acc = 0; setHidden(false); return; }
      acc = Math.sign(d) === Math.sign(acc) ? acc + d : d;
      if (acc > 12) setHidden(true);
      else if (acc < -8) setHidden(false);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    src.addEventListener('scroll', on, { passive: true });
    return () => { src.removeEventListener('scroll', on); if (raf) cancelAnimationFrame(raf); };
  }, [enabled, target]);
  return hidden;
}

/* Section theme: any element with data-nav-theme="light|dark" declares the navbar it needs.
   An IntersectionObserver watches a 1px line at the navbar's vertical centre; the innermost
   intersecting section wins. New sections (route changes) are picked up via MutationObserver. */
function useSectionTheme(enabled, target, headerRef, fallback) {
  const [theme, setTheme] = React.useState(fallback);
  React.useEffect(() => {
    if (!enabled || typeof IntersectionObserver === 'undefined') { setTheme(fallback); return; }
    const root = resolve(target), scope = root || document;
    const live = new Set();
    let io, mo, seen = new WeakSet(), frame = 0;
    const pick = () => {
      let best = null;
      live.forEach(el => { if (!best || best.contains(el) || (best.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING && !el.contains(best))) best = el; });
      setTheme(best ? best.getAttribute('data-nav-theme') : fallback);
    };
    const build = () => {
      if (io) io.disconnect();
      live.clear(); seen = new WeakSet();
      const h = headerRef.current ? headerRef.current.offsetHeight : 72;
      const vh = root ? root.clientHeight : window.innerHeight;
      const line = Math.max(0, Math.round(h / 2));
      io = new IntersectionObserver(entries => {
        entries.forEach(e => e.isIntersecting ? live.add(e.target) : live.delete(e.target));
        pick();
      }, { root, rootMargin: `-${line}px 0px -${Math.max(0, vh - line - 1)}px 0px`, threshold: 0 });
      scan();
    };
    const scan = () => {
      scope.querySelectorAll('[data-nav-theme]').forEach(el => { if (!seen.has(el)) { seen.add(el); io.observe(el); } });
    };
    build();
    mo = new MutationObserver(() => { if (!frame) frame = requestAnimationFrame(() => { frame = 0; live.forEach(el => { if (!el.isConnected) live.delete(el); }); scan(); pick(); }); });
    mo.observe(root || document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-nav-theme'] });
    const onResize = () => build();
    window.addEventListener('resize', onResize);
    return () => { io && io.disconnect(); mo.disconnect(); window.removeEventListener('resize', onResize); if (frame) cancelAnimationFrame(frame); };
  }, [enabled, target, fallback]);
  return theme;
}

/* Full-width backdrop: stacked backdrop-blur layers with staggered masks, so blur strength
   tapers to zero below the bar — no hard bottom edge, no solid fill. Sits behind content (z -1). */
const BLUR_STEPS = [[1, 100], [2, 82], [4, 66], [8, 50]];
function Backdrop({ theme }) {
  const wash = theme === 'dark' ? 'rgba(7,11,22,.28)' : 'rgba(238,241,247,.34)';
  return (
    <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 'calc(100% + 36px)', pointerEvents: 'none', zIndex: -1 }}>
      {BLUR_STEPS.map(([b, end]) => {
        const mask = `linear-gradient(to bottom, #000 0%, #000 ${end * 0.45}%, transparent ${end}%)`;
        return <div key={b} style={{ position: 'absolute', inset: 0, backdropFilter: `blur(${b}px)`, WebkitBackdropFilter: `blur(${b}px)`, maskImage: mask, WebkitMaskImage: mask }} />;
      })}
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, ${wash} 0%, transparent 100%)`, transition: 'background .45s var(--ease-out)' }} />
    </div>
  );
}

export function NavBar({
  name, links = ['Home', 'About', 'Projects', 'Experience', 'Stack', 'Journey', 'Writing'], active, onNavigate,
  clock = 'Oslo 14:02', cta = "Let's build", onCta,
  position = 'static', hideOnScroll = true, backdrop = true, adaptive = true, theme: forced, defaultTheme = 'light', scrollTarget, style,
}) {
  const floating = position !== 'static';
  const ref = React.useRef(null);
  const hidden = useAutoHide(floating && hideOnScroll, scrollTarget);
  const detected = useSectionTheme(floating && adaptive && !forced, scrollTarget, ref, defaultTheme);
  const theme = forced || (floating && adaptive ? detected : null);
  const fg = theme === 'dark' ? 'var(--km-paper)' : theme === 'light' ? 'var(--km-ink)' : undefined;
  const shell = floating ? {
    position, top: 0, left: 0, right: 0, zIndex: 60, padding: '16px 3vw',
    transform: hidden ? 'translateY(calc(-100% - 40px))' : 'translateY(0)',
    transition: 'transform .55s var(--ease-out), color .45s var(--ease-out)', willChange: 'transform',
  } : {};
  return (
    <header ref={ref} data-hidden={hidden || undefined} data-theme={theme || undefined} style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 16, isolation: 'isolate', color: fg, ...shell, ...style }}>
      {floating && backdrop && <Backdrop theme={theme} />}
      <BrandMark name={name} />
      <nav style={{ position: 'relative', display: 'flex', gap: 4, padding: 5, borderRadius: 'var(--radius-pill)', background: 'color-mix(in srgb,currentColor 6%,transparent)', border: '1px solid color-mix(in srgb,currentColor 10%,transparent)', fontSize: 14, fontWeight: 500, transition: 'background-color .45s var(--ease-out), border-color .45s var(--ease-out)' }}>
        {links.map(l => (
          <a key={l} href={'#' + l.toLowerCase()} onClick={e => { if (onNavigate) { e.preventDefault(); onNavigate(l); } }} style={{ padding: '8px 13px', whiteSpace: 'nowrap', borderRadius: 'var(--radius-pill)', color: 'inherit', background: l === active ? 'color-mix(in srgb,currentColor 12%,transparent)' : 'transparent', transition: 'background-color .35s var(--ease-out), color .45s var(--ease-out)' }}>{l}</a>
        ))}
      </nav>
      <div style={{ justifySelf: 'end', display: 'flex', alignItems: 'center', gap: 18 }}>
        {clock && <StatusDot tone="signal" style={{ opacity: .7 }}>{clock}</StatusDot>}
        {cta && <Button variant="accent" onClick={onCta} style={{ padding: '11px 18px' }}>{cta}</Button>}
      </div>
    </header>
  );
}
