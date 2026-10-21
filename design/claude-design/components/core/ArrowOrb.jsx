import React from 'react';
export function ArrowOrb({ glyph = '→', size = 44, tone = 'ink', style }) {
  const bg = tone === 'accent' ? 'var(--km-accent)' : tone === 'paper' ? 'var(--km-paper)' : 'var(--km-ink)';
  const fg = tone === 'accent' ? '#fff' : tone === 'paper' ? 'var(--km-ink)' : 'var(--km-paper)';
  return (
    <span aria-hidden="true" style={{ width: size, height: size, flex: 'none', borderRadius: '50%', background: bg, color: fg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size <= 24 ? 12 : size >= 64 ? 28 : 16, ...style }}>{glyph}</span>
  );
}