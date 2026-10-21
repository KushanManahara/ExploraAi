import React from 'react';
import { Tag } from '../core/Tag';
export function ProjectCard({ img, n, title, year, metric, metricLabel, onClick, width = 520, height = 420, style }) {
  return (
    <div onClick={onClick} style={{ position: 'relative', width, height, maxWidth: '100%', borderRadius: 'var(--radius-card)', overflow: 'hidden', background: 'var(--surface-placeholder)', cursor: onClick ? 'pointer' : 'default', boxShadow: 'var(--shadow-project)', ...style }}>
      {img && <img src={img} alt={title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
      <div style={{ position: 'absolute', inset: 0, background: 'var(--scrim-media)' }} />
      <div style={{ position: 'absolute', left: 22, right: 22, top: 20, display: 'flex', justifyContent: 'space-between', font: '500 12px/1 var(--font-mono)', color: 'var(--km-paper)' }}><span>{n} — {title}</span><span>{year}</span></div>
      <div style={{ position: 'absolute', left: 22, right: 22, bottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12, color: 'var(--km-paper)' }}>
        <span style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontWeight: 500, fontSize: 'clamp(24px,2.2vw,36px)', letterSpacing: '-.035em', lineHeight: 1 }}>{metric}</span>
          <span style={{ font: '500 12px/1.4 var(--font-mono)', opacity: .82 }}>{metricLabel}</span>
        </span>
        <Tag variant="glass">Deep dive →</Tag>
      </div>
    </div>
  );
}