import React from 'react';
import { Tag } from '../core/Tag';
import { ArrowOrb } from '../core/ArrowOrb';
export function ProjectRow({ n, title, client, desc, year, kind, featured = true, onClick, style }) {
  const [h, setH] = React.useState(false);
  return (
    <div style={{ borderTop: '1px solid var(--border-rule)', padding: '6px 0', ...style }}>
      <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ border: 'none', cursor: featured ? 'pointer' : 'default', fontFamily: 'inherit', color: 'inherit', textAlign: 'left', width: '100%', display: 'grid', gridTemplateColumns: '48px minmax(0,1.1fr) minmax(0,1.5fr) 124px 64px 44px', gap: '2vw', alignItems: 'center', padding: featured ? '22px 16px' : '20px 16px', borderRadius: 'var(--radius-row)', background: featured && h ? 'var(--km-white)' : 'rgba(255,255,255,0)', transition: 'background-color .3s' }}>
        <span style={{ font: '500 12px/1 var(--font-mono)', opacity: .6 }}>{n}</span>
        <span style={{ fontWeight: 500, fontSize: featured ? 'clamp(24px,2.3vw,38px)' : 'clamp(20px,1.7vw,28px)', letterSpacing: featured ? '-.04em' : '-.03em', lineHeight: featured ? 1 : 1.05 }}>{title}</span>
        <span style={{ fontSize: 15, lineHeight: 1.5 }}><span style={{ fontWeight: 600 }}>{client}</span><span style={{ opacity: .72 }}> — {desc}</span></span>
        <span style={{ justifySelf: 'start' }}>{featured ? <Tag variant="accent">Deep dive</Tag> : kind && <Tag style={{ padding: '7px 11px' }}>{kind}</Tag>}</span>
        <span style={{ font: '500 12px/1 var(--font-mono)', opacity: .6 }}>{year}</span>
        {featured ? <ArrowOrb /> : <span />}
      </button>
    </div>
  );
}