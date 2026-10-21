import React from 'react';
import { Eyebrow } from '../../components/core/Eyebrow';
import { Button } from '../../components/core/Button';
import { StatusDot } from '../../components/core/StatusDot';
import { SectionHeading } from '../../components/content/SectionHeading';
import { Em } from '../../components/content/SectionHeading';
import { FactList } from '../../components/content/FactList';
import { ExpertiseCard } from '../../components/cards/ExpertiseCard';
import { ProjectCard } from '../../components/cards/ProjectCard';
import { SegmentedLens } from '../../components/navigation/SegmentedLens';
import { QuoteCard } from '../../components/cards/QuoteCard';
const wrap = { padding: '0 3vw', display: 'grid', gridTemplateColumns: 'repeat(12,minmax(0,1fr))', columnGap: '2vw' };
export function Home({ projects, onOpen, onIndex }) {
  const [pick, setPick] = React.useState('01');
  const p = projects.find(x => x.n === pick);
  return (
    <div>
      <section style={{ minHeight: '100vh', padding: '20vh 3vw 6vh', background: 'radial-gradient(55% 45% at 72% 38%,var(--km-accent-wash),transparent 70%)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '6vh' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4vh' }}><Eyebrow rule>Kushan Manahara — ML &amp; software engineer</Eyebrow><StatusDot style={{ marginLeft: 'auto' }}>Available for new work · Oslo 14:02</StatusDot></div>
          <h1 style={{ margin: 0, maxWidth: '16ch', fontWeight: 500, fontSize: 'var(--type-display-size)', lineHeight: 'var(--type-display-lh)', letterSpacing: 'var(--type-display-ls)', textWrap: 'balance' }}>Turning <Em>models</Em> into systems people can <Em>rely on</Em>.</h1>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '4vw', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 10 }}><Button size="lg" orb="↓" onClick={() => window.scrollTo({ top: document.getElementById('work').offsetTop - 40, behavior: 'smooth' })}>Selected work</Button><Button variant="link" arrow>Get in touch</Button></div>
          <p style={{ margin: 0, maxWidth: '44ch', fontSize: 17, lineHeight: 1.55, opacity: .72 }}>Ten years across ML research, backend systems and LLM products. I design the model, the pipeline around it, and the evaluation that proves it works.</p>
        </div>
      </section>
      <section style={{ ...wrap, padding: '22vh 3vw 20vh' }}>
        <div style={{ gridColumn: '1 / span 5', height: '74vh', borderRadius: 'var(--radius-media)', overflow: 'hidden', position: 'relative', background: '#E6E5DF' }}>
          <img src="https://i.pravatar.cc/900?img=68" alt="Kushan Manahara" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
        <div style={{ gridColumn: '7 / span 6', display: 'flex', flexDirection: 'column', gap: '7vh', paddingTop: '2vh' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <Eyebrow>About</Eyebrow>
            <p style={{ margin: 0, fontWeight: 500, fontSize: 'var(--type-statement-size)', lineHeight: 'var(--type-statement-lh)', letterSpacing: 'var(--type-statement-ls)' }}>I'm Kushan, a machine learning engineer in Oslo. I started in speech research, spent three years on streaming backends at a bank, and now lead the team building LLM agents at Kestrel.</p>
            <Button arrow style={{ alignSelf: 'flex-start' }}>More about me</Button>
          </div>
          <FactList rows={[{ k: 'Now', v: 'Lead ML engineer, Kestrel AI' }, { k: 'Before', v: 'Norrbank · NTNU Speech Lab' }, { k: 'Based', v: 'Oslo, Norway' }, { k: 'Teaching', v: 'Evening course on ML systems' }]} />
        </div>
      </section>
      <section style={{ ...wrap, padding: '20vh 3vw', alignItems: 'start' }}>
        <div style={{ gridColumn: '1 / span 4', position: 'sticky', top: '14vh', display: 'flex', flexDirection: 'column', gap: '4vh' }}>
          <SectionHeading eyebrow="Expertise" title={<>What I <Em>build.</Em></>} lead="Most projects touch three or four of these at once. The model is rarely the hard part." />
          <Button variant="outline" arrow style={{ alignSelf: 'flex-start' }}>See it in the projects</Button>
        </div>
        <div style={{ gridColumn: '6 / span 7', display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 14 }}>
          <ExpertiseCard style={{ gridColumn: 'span 2' }} n="01" mono="LLM" title="LLM agents & retrieval" desc="Grounded agents with tools, retrieval and an eval gate that decides what ships." tags={['LangGraph', 'pgvector', 'vLLM']} used={['Relay']} />
          <ExpertiseCard n="02" mono="EVAL" title="Evaluation" desc="Offline suites and online checks that turn 'seems better' into a number." tags={['Sounding', 'pytest']} used={['Sounding']} />
          <ExpertiseCard n="03" mono="MLOPS" title="Serving & platform" desc="GPU serving, batching and rollouts with a rollback at every step." tags={['Ray', 'Kubernetes']} used={['Foundry']} />
        </div>
      </section>
      <section id="work" style={{ padding: '14vh 3vw 20vh' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, marginBottom: '7vh' }}>
          <SectionHeading eyebrow="Featured projects" title={<>Five systems, <Em>in production.</Em></>} />
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}><SegmentedLens items={projects.map(x => x.n)} value={pick} onChange={setPick} /><Button count={projects.length} arrow="↗" onClick={onIndex}>All projects</Button></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,7fr) minmax(0,5fr)', gap: '2vw', alignItems: 'end' }}>
          <ProjectCard {...p} width="100%" height="60vh" onClick={() => onOpen(p)} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span style={{ fontWeight: 500, fontSize: 'clamp(28px,2.6vw,44px)', letterSpacing: '-.045em', lineHeight: 1 }}>{p.title}</span>
            <span style={{ font: '500 12px/1.6 var(--font-mono)', opacity: .6 }}>{p.role} · {p.team}<br />{p.client}, {p.year}</span>
            <Button arrow onClick={() => onOpen(p)} style={{ alignSelf: 'flex-start' }}>Open deep dive</Button>
          </div>
        </div>
      </section>
      <section style={{ padding: '14vh 3vw 20vh' }}>
        <SectionHeading eyebrow="References" title={<>In their <Em>words.</Em></>} style={{ marginBottom: '7vh' }} />
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <QuoteCard company="Kestrel AI" quote="Turned our agent demo into something we could sell to enterprise customers. The eval gate he built still decides what ships." who="Maya Lindqvist" role="VP Engineering" avatar="https://i.pravatar.cc/100?img=47" />
          <QuoteCard tone="ink" company="Norrbank" quote="Tripwire went live inside a 20 ms budget and caught fraud our rules missed." who="Erik Dahl" role="Head of Payments" avatar="https://i.pravatar.cc/100?img=12" />
          <QuoteCard tone="accent" company="Stackhouse" quote="We had Sounding running in CI within a week." who="Priya Nair" role="Staff Engineer" avatar="https://i.pravatar.cc/100?img=32" />
        </div>
      </section>
    </div>
  );
}