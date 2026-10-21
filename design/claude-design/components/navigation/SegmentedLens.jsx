import React from 'react';
export function SegmentedLens({ items, value, onChange, style }) {
  const refs = React.useRef([]);
  const [box, setBox] = React.useState(null);
  const idx = Math.max(0, items.findIndex(i => (i.value ?? i) === value));
  React.useLayoutEffect(() => { const el = refs.current[idx]; if (el) setBox({ x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight }); }, [idx, items.length]);
  const ease = 'var(--dur-lens) var(--ease-out)';
  return (
    <div style={{ position: 'relative', display: 'inline-flex', gap: 4, padding: 4, borderRadius: 'var(--radius-pill)', background: 'var(--surface-soft)', font: '500 12px/1 var(--font-mono)', ...style }}>
      {box && <span aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0, width: box.w, height: box.h, transform: `translate(${box.x}px,${box.y}px)`, borderRadius: 'var(--radius-pill)', background: 'var(--km-ink)', boxShadow: 'var(--shadow-lens)', transition: `transform ${ease}, width ${ease}, height ${ease}`, pointerEvents: 'none' }} />}
      {items.map((it, i) => { const v = it.value ?? it, l = it.label ?? it; return (
        <button key={v} ref={el => (refs.current[i] = el)} onClick={() => onChange && onChange(v)} style={{ position: 'relative', border: 'none', cursor: 'pointer', padding: '9px 12px', borderRadius: 'var(--radius-pill)', background: 'transparent', color: i === idx ? 'var(--km-paper)' : 'var(--km-ink)', font: 'inherit', transition: 'color .35s' }}>{l}</button>
      ); })}
    </div>
  );
}