import React from 'react';
export function Stat({ value, label, variant = 'sans', style }) {
  const v = variant === 'compact'
    ? { fontWeight: 500, fontSize: 'clamp(32px,2.8vw,48px)', letterSpacing: '-.045em', lineHeight: 1 }
    : { fontWeight: 500, fontSize: 'var(--type-stat-size)', letterSpacing: 'var(--type-stat-ls)', lineHeight: 'var(--type-stat-lh)' };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: variant === 'compact' ? 8 : 12, ...style }}>
      <span style={v}>{value}</span>
      <span style={{ font: '500 12px/1.5 var(--font-mono)', opacity: .65 }}>{label}</span>
    </div>
  );
}