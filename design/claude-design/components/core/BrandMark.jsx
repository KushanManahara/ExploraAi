import React from 'react';
export function BrandMark({ name = 'Kushan Manahara', href = '#top', variant = 'wordmark', size = 17, style }) {
  if (variant === 'monogram') {
    const s = size * 1.6;
    return (
      <a href={href} aria-label={name} style={{ width: s, height: s, flex: 'none', borderRadius: s * 0.225, background: 'var(--km-ink)', color: 'var(--km-paper)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: s * 0.025, fontWeight: 600, fontSize: s * 0.5, letterSpacing: '-.06em', lineHeight: 1, ...style }}>
        km<span style={{ width: s * 0.13, height: s * 0.13, borderRadius: '50%', background: 'var(--km-accent)', alignSelf: 'flex-end', marginBottom: s * 0.25, display: 'block' }} />
      </a>
    );
  }
  const i = name.lastIndexOf(' '), first = i > 0 ? name.slice(0, i) : name, last = i > 0 ? name.slice(i) : '';
  return (
    <a href={href} style={{ fontWeight: 600, fontSize: size, letterSpacing: '-.03em', display: 'inline-flex', alignItems: 'baseline', color: 'inherit', whiteSpace: 'nowrap', lineHeight: 1, ...style }}>
      {first}<span style={{ color: 'var(--em-muted)' }}>{last}</span><span style={{ width: '.26em', height: '.26em', marginLeft: '.06em', borderRadius: '50%', background: 'var(--km-accent)', display: 'inline-block' }} />
    </a>
  );
}
