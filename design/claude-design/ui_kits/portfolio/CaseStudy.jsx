import React from 'react';
import { Button } from '../../components/core/Button';
import { Eyebrow } from '../../components/core/Eyebrow';
import { FactList } from '../../components/content/FactList';
import { Stat } from '../../components/content/Stat';
import { Tag } from '../../components/core/Tag';
import { ArrowOrb } from '../../components/core/ArrowOrb';
const bar = { position: 'sticky', top: 0, zIndex: 2, display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 16, padding: '16px 3vw', background: 'var(--surface-glass)', backdropFilter: 'var(--blur-bar)', borderBottom: '1px solid var(--border-hairline)' };
const row = { padding: '12vh 3vw 0', display: 'grid', gridTemplateColumns: 'repeat(12,minmax(0,1fr))', columnGap: '2vw' };
export function CaseStudy({ p, next, onBack, onNext }) {
  return (
    <div>
      <div style={bar}>
        <Button variant="soft" arrow="← " onClick={onBack} style={{ justifySelf: 'start' }}>All work</Button>
        <span style={{ font: '500 12px/1 var(--font-mono)', opacity: .65 }}>Project {p.n} / 05 — {p.client}</span>
        <Button arrow onClick={onNext} style={{ justifySelf: 'end' }}>Next: {next.title}</Button>
      </div>
      <div style={{ padding: '3vh 3vw 0' }}><div style={{ height: '70vh', borderRadius: 'var(--radius-card)', overflow: 'hidden', background: 'var(--surface-placeholder)' }}><img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div></div>
      <div style={{ ...row, paddingTop: '9vh', alignItems: 'end' }}>
        <div style={{ gridColumn: '1 / span 8', display: 'flex', flexDirection: 'column', gap: 22 }}>
          <Eyebrow>{p.client} — {p.year}</Eyebrow>
          <h1 style={{ margin: 0, fontWeight: 500, fontSize: 'var(--type-h1-size)', lineHeight: 'var(--type-h1-lh)', letterSpacing: 'var(--type-h1-ls)' }}>{p.title}</h1>
          <p style={{ margin: 0, maxWidth: '40ch', fontSize: 'clamp(20px,1.7vw,26px)', lineHeight: 1.4, letterSpacing: '-.015em', opacity: .8 }}>{p.desc}.</p>
        </div>
        <FactList variant="meta" style={{ gridColumn: '10 / span 3' }} rows={[{ k: 'Role', v: p.role }, { k: 'Team', v: p.team }, { k: 'Timeline', v: p.year }, { k: 'Stack', v: 'Python · PyTorch' }]} />
      </div>
      <div style={row}>
        <span style={{ gridColumn: '1 / span 3' }}><Eyebrow>02 — Approach</Eyebrow></span>
        <div style={{ gridColumn: '4 / span 9', display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: '2vw' }}>
          {[['Ground it', 'Retrieval over policy docs, not prompt memory.'], ['Give it tools', 'Typed actions with dry-run and audit trail.'], ['Gate it', 'Every release passes an offline eval suite.']].map(([t, d], i) => (
            <div key={t} style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 18, borderTop: '2px solid var(--km-ink)' }}>
              <span style={{ font: '500 12px/1 var(--font-mono)', color: 'var(--km-accent-deep)' }}>0{i + 1}</span>
              <span style={{ fontWeight: 600, fontSize: 20, letterSpacing: '-.02em' }}>{t}</span>
              <span style={{ fontSize: 15, lineHeight: 1.6, opacity: .74 }}>{d}</span>
            </div>))}
        </div>
      </div>
      <div data-nav-theme="dark" style={{ margin: '12vh 3vw 0', padding: '6vh 3vw', borderRadius: 'var(--radius-card)', background: 'var(--km-night)', color: 'var(--km-paper)', display: 'flex', flexDirection: 'column', gap: '6vh' }}>
        <Eyebrow>04 — Outcome</Eyebrow>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: '2vw' }}>
          <Stat value={p.metric} label={p.metricLabel} /><Stat value="−41%" label="median handle time" /><Stat value="0" label="policy violations after launch" />
        </div>
      </div>
      <div style={{ padding: '14vh 3vw 10vh' }}>
        <button onClick={onNext} style={{ border: 'none', cursor: 'pointer', fontFamily: 'inherit', width: '100%', background: 'none', color: 'inherit', textAlign: 'left', padding: '5vh 0', borderTop: '1px solid var(--km-ink-a16)', borderBottom: '1px solid var(--km-ink-a16)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
          <span style={{ display: 'flex', flexDirection: 'column', gap: 14 }}><Eyebrow>Next project</Eyebrow><span style={{ fontWeight: 500, fontSize: 'var(--type-mega-size)', letterSpacing: 'var(--type-mega-ls)', lineHeight: 'var(--type-mega-lh)' }}>{next.title}</span></span>
          <ArrowOrb size={72} tone="accent" />
        </button>
      </div>
    </div>
  );
}