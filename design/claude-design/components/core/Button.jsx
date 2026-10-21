import React from 'react';
import { ArrowOrb } from './ArrowOrb';
const base = { border: 'none', cursor: 'pointer', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 10, borderRadius: 'var(--radius-pill)', fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap', transition: 'background-color .3s, box-shadow .3s, gap .3s var(--ease-out), transform .3s var(--ease-out)' };
const V = {
  ink:     { background: 'var(--km-ink)', color: 'var(--km-paper)' },
  accent:  { background: 'var(--km-accent)', color: '#fff', boxShadow: '0 0 0 1px rgba(11,21,48,.12)' },
  soft:    { background: 'var(--surface-soft)', color: 'var(--km-ink)' },
  outline: { background: 'transparent', color: 'var(--km-ink)', boxShadow: 'inset 0 0 0 1px var(--border-control)' },
  light:   { background: 'var(--km-paper)', color: 'var(--km-ink)', font: '500 12px/1 var(--font-mono)' },
  link:    { background: 'none', color: 'inherit', gap: 8 },
};
const S = { sm: { padding: '8px 12px', fontSize: 12 }, md: { padding: '11px 16px', fontSize: 14 }, lg: { padding: '14px 22px', fontSize: 15, gap: 12 } };
export function Button({ variant = 'ink', size = 'md', arrow, orb, count, href, onClick, disabled, children, style }) {
  const [h, setH] = React.useState(false);
  const Tag = href ? 'a' : 'button';
  const arrowColor = variant === 'ink' ? 'var(--km-accent-soft)' : variant === 'outline' || variant === 'light' ? 'var(--km-accent)' : 'inherit';
  const sz = variant === 'link' ? { padding: '14px 6px', fontSize: 15 } : variant === 'outline' && size === 'md' ? { padding: '12px 18px', fontSize: 15 } : S[size];
  const hov = h && !disabled ? (variant === 'link' ? { gap: 14 } : variant === 'outline' ? { background: 'var(--km-white)' } : variant === 'soft' ? { background: 'var(--km-ink-a10)' } : { transform: 'translateY(-1px)' }) : {};
  return (
    <Tag href={href} onClick={disabled ? undefined : onClick} disabled={Tag === 'button' ? disabled : undefined} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ ...base, ...V[variant], ...sz, ...hov, opacity: disabled ? .4 : 1, cursor: disabled ? 'not-allowed' : 'pointer', ...style }}>
      {arrow && arrow.startsWith && arrow.startsWith('←') ? <span>{arrow}</span> : null}
      {children}
      {count != null && <span style={{ font: 'var(--type-mono-sm)', opacity: .6 }}>{count}</span>}
      {orb && <ArrowOrb size={22} tone="accent" glyph={orb === true ? '→' : orb} />}
      {arrow && !(arrow.startsWith && arrow.startsWith('←')) && <span aria-hidden="true" style={{ color: arrowColor }}>{arrow === true ? '→' : arrow}</span>}
    </Tag>
  );
}