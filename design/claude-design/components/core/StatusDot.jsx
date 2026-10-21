import React from 'react';
export function StatusDot({ tone = 'success', children, style }) {
  const c = tone === 'success' ? 'var(--km-success)' : tone === 'warning' ? 'var(--km-warning)' : 'var(--km-signal)';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, font: '500 12px/1 var(--font-mono)', letterSpacing: '.02em', opacity: .72, whiteSpace: 'nowrap', ...style }}>
      <span style={{ position: 'relative', width: 7, height: 7, flex: 'none', display: 'block' }}>
        {tone === 'success' && <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: c, animation: 'km-pulse 2.2s var(--ease-pulse) infinite' }} />}
        <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: c, boxShadow: tone === 'signal' ? 'var(--ring-signal)' : 'none' }} />
      </span>
      {children}
    </span>
  );
}