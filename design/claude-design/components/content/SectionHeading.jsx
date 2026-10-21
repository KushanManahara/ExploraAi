import React from 'react';
import { Eyebrow } from '../core/Eyebrow';
const SZ = { display: ['--type-display'], h1: ['--type-h1'], h2: ['--type-h2'], h3: ['--type-h3'] };
export function SectionHeading({ eyebrow, title, lead, size = 'h2', as, style }) {
  const t = SZ[size][0], H = as || (size === 'display' || size === 'h1' ? 'h1' : size);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, ...style }}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <H style={{ margin: 0, fontWeight: 500, fontSize: `var(${t}-size)`, lineHeight: `var(${t}-lh)`, letterSpacing: `var(${t}-ls)`, textWrap: 'balance' }}>{title}</H>
      {lead && <p style={{ margin: '2vh 0 0', fontSize: 'var(--type-lead-size)', lineHeight: 'var(--type-lead-lh)', opacity: 'var(--type-lead-opacity)', maxWidth: '38ch', textWrap: 'pretty' }}>{lead}</p>}
    </div>
  );
}
export function Em({ children, tone = 'muted' }) {
  const color = tone === 'accent' ? 'var(--km-accent)' : 'var(--em-muted)';
  return <em style={{ fontStyle: 'normal', fontWeight: 'inherit', color }}>{children}</em>;
}
