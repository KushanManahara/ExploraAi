import React from 'react';
import { Tag } from '../core/Tag';
export function ExpertiseCard({ n, mono, title, desc, tags = [], used = [], active, minHeight = 300, style }) {
  const [h, setH] = React.useState(false), on = active || h;
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ minHeight, padding: 26, borderRadius: 'var(--radius-card)', background: on ? 'var(--surface-card)' : 'var(--surface-card-rest)', boxShadow: on ? 'var(--shadow-card-hover)' : 'none', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 28, transition: 'background-color .35s, box-shadow .35s', ...style }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ font: '500 12px/1 var(--font-mono)', opacity: .6 }}>{n}</span>
        {mono && <Tag variant="chip" lamp={on ? 'on' : true}>{mono}</Tag>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: '56ch' }}>
        <span style={{ fontWeight: 500, fontSize: 'var(--type-card-title-size)', letterSpacing: 'var(--type-card-title-ls)', lineHeight: 'var(--type-card-title-lh)' }}>{title}</span>
        <span style={{ fontSize: 15, lineHeight: 1.55, opacity: .74 }}>{desc}</span>
        {tags.length > 0 && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>{tags.map(t => <Tag key={t}>{t}</Tag>)}</div>}
        {used.length > 0 && <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px 14px', marginTop: 10, paddingTop: 18, borderTop: '1px solid var(--km-ink-a10)', font: '500 12px/1 var(--font-mono)' }}>
          <span style={{ opacity: .55 }}>Used in →</span>{used.map(u => <Tag key={u} variant="outline" style={{ margin: '-7px -4px' }}>{u}</Tag>)}
        </div>}
      </div>
    </div>
  );
}