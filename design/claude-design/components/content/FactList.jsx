import React from 'react';
export function FactList({ rows, variant = 'facts', dark, style }) {
  const line = dark ? 'var(--km-paper-a14)' : 'var(--border-rule)';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid ' + line, ...style }}>
      {rows.map((r, i) => variant === 'meta' ? (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '12px 0', borderTop: '1px solid ' + line, fontSize: 14 }}>
          <span style={{ opacity: .6 }}>{r.k}</span><span style={{ fontWeight: 500, textAlign: 'right' }}>{r.v}</span>
        </div>
      ) : (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,2.6fr)', gap: '2vw', padding: '16px 0', borderTop: '1px solid ' + line }}>
          <span style={{ font: '500 12px/1.5 var(--font-mono)', letterSpacing: '.06em', textTransform: 'uppercase', opacity: .55 }}>{r.k}</span>
          <span style={{ fontSize: 16, fontWeight: 500, letterSpacing: '-.01em', lineHeight: 1.45 }}>{r.v}</span>
        </div>
      ))}
    </div>
  );
}