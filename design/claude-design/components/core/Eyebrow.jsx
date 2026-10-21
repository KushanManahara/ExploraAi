import React from 'react';
export function Eyebrow({ children, rule = false, tone, style }) {
  return (
    <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 12, font: 'var(--type-eyebrow)', letterSpacing: 'var(--type-eyebrow-ls)', textTransform: 'uppercase', opacity: rule ? 1 : 'var(--type-eyebrow-opacity)', color: tone === 'accent' ? 'var(--km-accent)' : 'inherit', ...style }}>
      {rule && <span style={{ width: 28, height: 1, background: 'currentColor', display: 'block' }} />}
      {children}
    </p>
  );
}