import React from 'react';
import { Button } from '../../components/core/Button';
import { ProjectRow } from '../../components/cards/ProjectRow';
import { SectionHeading } from '../../components/content/SectionHeading';
import { Em } from '../../components/content/SectionHeading';
const bar = { position: 'sticky', top: 0, zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: '16px 3vw', background: 'var(--surface-glass)', backdropFilter: 'var(--blur-bar)', borderBottom: '1px solid var(--border-hairline)' };
export function ProjectsIndex({ projects, onBack, onOpen }) {
  return (
    <div style={{ minHeight: '100vh' }}>
      <div style={bar}><Button variant="soft" arrow="← " onClick={onBack}>Back to the orbit</Button><span style={{ font: '500 12px/1 var(--font-mono)', opacity: .65 }}>Projects — {projects.length + 2} entries</span></div>
      <div style={{ padding: '12vh 3vw 7vh', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '4vw', flexWrap: 'wrap' }}>
        <SectionHeading size="h1" title={<>Every system, <Em>one list.</Em></>} />
        <p style={{ margin: 0, maxWidth: '40ch', fontSize: 17, lineHeight: 1.55, opacity: .72 }}>Five projects with full write-ups, plus the smaller models, pipelines and teaching around them.</p>
      </div>
      <div style={{ padding: '0 3vw 16vh', display: 'flex', flexDirection: 'column', gap: '9vh' }}>
        <div style={{ borderBottom: '1px solid var(--border-rule)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 14, font: 'var(--type-eyebrow)', letterSpacing: '.06em', textTransform: 'uppercase', opacity: .6 }}><span>Featured projects</span><span>05</span></div>
          {projects.map(p => <ProjectRow key={p.n} {...p} onClick={() => onOpen(p)} />)}
        </div>
        <div style={{ borderBottom: '1px solid var(--border-rule)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 14, font: 'var(--type-eyebrow)', letterSpacing: '.06em', textTransform: 'uppercase', opacity: .6 }}><span>More work</span><span>02</span></div>
          <ProjectRow featured={false} n="06" title="Speech VAD" client="Open source" desc="Tiny voice activity detector" kind="Model" year="2023" />
          <ProjectRow featured={false} n="07" title="ML Systems 101" client="Evening course" desc="Twelve weeks, from notebook to service" kind="Teaching" year="2025" />
        </div>
      </div>
    </div>
  );
}