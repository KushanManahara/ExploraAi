import React from 'react';
const V = {
  mono:   { padding: '6px 10px', background: 'var(--surface-tag)', color: 'inherit', font: 'var(--type-mono-sm)' },
  accent: { padding: '7px 11px', background: 'var(--km-accent)', color: '#fff', font: 'var(--type-mono-sm)' },
  glass:  { padding: '8px 12px', background: 'var(--surface-glass)', color: 'var(--km-ink)', font: '500 12px/1 var(--font-mono)', backdropFilter: 'blur(6px)' },
  outline:{ padding: '7px 11px', background: 'transparent', color: 'var(--km-ink)', font: '500 12px/1 var(--font-mono)', boxShadow: 'inset 0 0 0 1px var(--km-ink-a16)' },
  chip:   { height: 34, padding: '0 13px', background: 'var(--km-ink)', color: 'var(--km-paper)', font: '600 11px/1 var(--font-mono)', letterSpacing: '.06em' },
};
export function Tag({ variant = 'mono', lamp, children, style }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 'var(--radius-pill)', whiteSpace: 'nowrap', ...V[variant], ...style }}>
      {(lamp || variant === 'chip') && <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--km-accent)', display: 'block', opacity: lamp === 'on' ? 1 : .45 }} />}
      {children}
    </span>
  );
}