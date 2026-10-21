import React from 'react';
export function ToolTile({ abbr, name, note, bg = '#FFFFFF', style }) {
  const [h, setH] = React.useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 0', borderBottom: '1px solid var(--border-hairline)', minWidth: 0, ...style }}>
      <span style={{ position: 'relative', width: 36, height: 36, flex: 'none', borderRadius: 'var(--radius-tile)', overflow: 'hidden', background: bg, color: 'var(--km-ink)', boxShadow: 'var(--shadow-tile)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '600 10px/1 var(--font-mono)', letterSpacing: '-.02em' }}>
        <span aria-hidden="true" style={{ position: 'absolute', inset: 0, background: '#fff', opacity: h ? 0 : 1, transition: 'opacity .35s' }} />
        <span style={{ position: 'relative' }}>{abbr}</span>
      </span>
      <span style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
        <span style={{ fontWeight: 500, fontSize: 15, lineHeight: 1.15, letterSpacing: '-.015em' }}>{name}</span>
        {note && <span style={{ fontSize: 12.5, lineHeight: 1.35, opacity: .58 }}>{note}</span>}
      </span>
    </div>
  );
}