import React from 'react';
export function QuoteCard({ company, quote, who, role, avatar, tone = 'white', style }) {
  const t = { white: ['var(--km-white)', 'var(--km-ink)'], ink: ['var(--km-ink)', 'var(--km-paper)'], accent: ['var(--km-accent)', '#fff'] }[tone];
  return (
    <figure style={{ width: 410, maxWidth: '100%', minHeight: 236, margin: 0, padding: 22, borderRadius: 'var(--radius-media)', background: t[0], color: t[1], display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 14, boxShadow: 'var(--shadow-quote)', ...style }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ font: '500 11px/1 var(--font-mono)', letterSpacing: '.04em', textTransform: 'uppercase', opacity: .65 }}>{company}</span>
        <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 44, lineHeight: .5, color: tone === 'accent' ? '#fff' : 'var(--km-accent)' }}>“</span>
      </div>
      <blockquote style={{ margin: 0, fontWeight: 500, fontSize: 17, lineHeight: 1.38, letterSpacing: '-.01em', textWrap: 'pretty' }}>{quote}</blockquote>
      <figcaption style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <span style={{ width: 36, height: 36, borderRadius: '50%', flex: 'none', overflow: 'hidden', background: 'rgba(128,128,128,.2)' }}>{avatar && <img src={avatar} alt={who} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}</span>
        <span style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <span style={{ fontWeight: 600, fontSize: 14 }}>{who}</span>
          <span style={{ font: '500 11px/1.3 var(--font-mono)', opacity: .65 }}>{role}</span>
        </span>
      </figcaption>
    </figure>
  );
}