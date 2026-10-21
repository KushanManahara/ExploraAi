import React from 'react';

const KF_ID = 'km-chat-kf';
const KF = `
@property --km-beam{syntax:'<angle>';inherits:false;initial-value:0deg}
@keyframes kmChatBeam{to{--km-beam:360deg}}
@keyframes kmChatDot{0%,60%,100%{transform:translateY(0);opacity:.35}30%{transform:translateY(-4px);opacity:1}}
@keyframes kmChatShimmer{0%{background-position:120% 0}100%{background-position:-20% 0}}
@keyframes kmChatCaret{0%,49%{opacity:1}50%,100%{opacity:0}}
@keyframes kmChatIn{from{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:none}}
@keyframes kmChatPulse{0%{box-shadow:0 0 0 0 rgba(47,191,113,.5)}70%{box-shadow:0 0 0 7px rgba(47,191,113,0)}100%{box-shadow:0 0 0 0 rgba(47,191,113,0)}}
@media (prefers-reduced-motion:reduce){.km-chat *{animation-duration:.01ms!important;transition-duration:.01ms!important}}`;
function useKeyframes() {
  React.useEffect(() => {
    if (document.getElementById(KF_ID)) return;
    const s = document.createElement('style'); s.id = KF_ID; s.textContent = KF; document.head.appendChild(s);
  }, []);
}

const DEFAULT_REPLIES = [
  [/project|work|built|relay/i, 'Five systems in production. Relay is the one I point to first: a support agent at Kestrel AI that now resolves 38% of tickets end to end. The model was the easy part. The evaluation harness took longer.'],
  [/stack|tech|tool|python|pytorch/i, 'Python and PyTorch for models, TypeScript at the edges, Postgres and Redis underneath. I pick boring infrastructure on purpose so the interesting problems stay in the model.'],
  [/hire|available|contact|email|build/i, "I'm taking on new work from November. The fastest route is a short note on what you're building and where it breaks today. I reply within a day."],
  [/where|oslo|location/i, "I'm based in Oslo and work with teams across Europe. Most of my collaboration is async, with a weekly call."],
];
const FALLBACK = 'Good question. I design the model, the pipeline around it, and the evaluation that proves it works. Ask about a project, the stack, or availability.';
function cannedReply(q) { const hit = DEFAULT_REPLIES.find(([re]) => re.test(q)); return hit ? hit[1] : FALLBACK; }

async function getReply(q, history, getResponse) {
  if (getResponse) return getResponse(q, history);
  if (typeof window !== 'undefined' && window.claude && window.claude.complete) {
    try {
      const convo = history.map(m => `${m.role === 'user' ? 'Visitor' : 'Kushan'}: ${m.text}`).join('\n');
      return await window.claude.complete(`You are Kushan Manahara, ML & software engineer in Oslo, answering visitors on your portfolio. First person, plain, quietly confident, concrete numbers, no hype, no exclamation marks, no emoji, 2-3 sentences.\n\n${convo}\nVisitor: ${q}\nKushan:`);
    } catch (e) { /* fall through */ }
  }
  await new Promise(r => setTimeout(r, 650));
  return cannedReply(q);
}

const ease = 'cubic-bezier(.2,.8,.1,1)';
/* Lucide "message-circle" (ISC) */
const ChatGlyph = ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>;
const iconBtn = { width: 32, height: 32, borderRadius: 99, border: 'none', cursor: 'pointer', background: 'transparent', color: 'inherit', opacity: .6, display: 'grid', placeItems: 'center', font: '500 15px/1 var(--font-sans)', transition: 'opacity .3s cubic-bezier(.2,.8,.1,1)' };
const hov = { onMouseEnter: e => e.currentTarget.style.opacity = 1, onMouseLeave: e => e.currentTarget.style.opacity = .6 };
const mono = { font: '500 11px/1 var(--font-mono)', letterSpacing: '.06em', textTransform: 'uppercase' };

function Dots() {
  return (
    <span aria-label="Typing" style={{ display: 'inline-flex', gap: 4, padding: '4px 2px' }}>
      {[0, 1, 2].map(i => <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', animation: `kmChatDot 1.1s ${i * .14}s infinite ${ease}` }} />)}
    </span>
  );
}
function Shimmer({ children }) {
  return <span style={{ ...mono, color: 'transparent', backgroundImage: 'linear-gradient(90deg,rgba(11,21,48,.35) 0%,rgba(11,21,48,.35) 40%,var(--km-accent) 50%,rgba(11,21,48,.35) 60%,rgba(11,21,48,.35) 100%)', backgroundSize: '250% 100%', WebkitBackgroundClip: 'text', backgroundClip: 'text', animation: 'kmChatShimmer 1.6s linear infinite' }}>{children}</span>;
}

/* Send flight. A fixed-position copy of the bubble flies above the panel (so the scroll list
   can't clip it) from the composer's text start to the bubble's final slot. It follows a quadratic
   curve that lifts first, then swings right; X and Y are eased separately, it banks slightly along
   the tangent and morphs pill/white → ink bubble. The real bubble is hidden underneath and swapped
   in on the last frame, so there's no jump. Duration scales with distance (360–560ms). */
const flyEase = t => 1 - Math.pow(1 - t, 3);
const mixHex = (a, b, t) => { const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)); const A = p(a), B = p(b); return 'rgb(' + A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(',') + ')'; };
function Bubble({ role, children, streaming, flyFrom, scroller }) {
  const me = role === 'user';
  const ref = React.useRef(null);
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!flyFrom || !el) return;
    const sc = scroller && scroller.current;
    if (sc) sc.scrollTop = sc.scrollHeight;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !el.animate) { el.animate && el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 160 }); return; }
    const r = el.getBoundingClientRect();
    // Path (matches reference): S-curve from the composer. Rise, sweep right across the middle,
    // then come straight up into the bubble from below. Cubic Bézier on bubble centres.
    const w = r.width, h = r.height;
    const x0 = flyFrom.left + (flyFrom.width || 300) * .38, y0 = flyFrom.top + flyFrom.height / 2;
    const x3 = r.left + w / 2, y3 = r.top + h / 2;
    const dx = x3 - x0, dy = y0 - y3;
    const x1 = x0 + dx * .12, y1 = y0 - dy * .30;   // leave going up, slightly right
    const x2 = x3,            y2 = y0 - dy * .40;   // sweep right, then vertical approach
    const dist = Math.hypot(dx, dy) * 1.15;
    const ghost = el.cloneNode(true);
    Object.assign(ghost.style, { position: 'fixed', left: r.left + 'px', top: r.top + 'px', width: w + 'px', height: h + 'px', margin: 0, boxSizing: 'border-box', zIndex: 2147483000, pointerEvents: 'none', willChange: 'transform', maxWidth: 'none', transformOrigin: '50% 50%' });
    el.style.opacity = '0';
    document.body.appendChild(ghost);
    const B = (a, b, c, d, t) => { const u = 1 - t; return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d; };
    const dB = (a, b, c, d, t) => { const u = 1 - t; return 3 * u * u * (b - a) + 6 * u * t * (c - b) + 3 * t * t * (d - c); };
    const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; // in-out cubic: gentle launch, soft landing
    const N = 36, frames = [];
    for (let i = 0; i <= N; i++) {
      const t = i / N, p = ease(t);
      const bx = B(x0, x1, x2, x3, p), by = B(y0, y1, y2, y3, p);
      const tx = dB(x0, x1, x2, x3, p), ty = dB(y0, y1, y2, y3, p);
      const bank = Math.max(-7, Math.min(7, Math.atan2(tx, -ty) * 180 / Math.PI * .18)) * Math.sin(Math.PI * Math.min(1, t * 1.1));
      const sc = .9 + .1 * Math.min(1, t / .6) + .025 * Math.sin(Math.PI * Math.max(0, (t - .6) / .4));
      const c = Math.min(1, t * 1.5);
      const lift = Math.sin(Math.PI * t);
      frames.push({
        offset: t,
        transform: `translate(${(bx - x3).toFixed(2)}px,${(by - y3).toFixed(2)}px) rotate(${bank.toFixed(2)}deg) scale(${sc.toFixed(3)})`,
        opacity: Math.min(1, .4 + t * 3),
        background: mixHex('#FFFFFF', '#0B1530', c),
        color: mixHex('#0B1530', '#EEF1F7', Math.min(1, t * 2)),
        borderRadius: `${Math.round(99 - 81 * c)}px ${Math.round(99 - 81 * c)}px ${Math.round(99 - 93 * c)}px ${Math.round(99 - 81 * c)}px`,
        boxShadow: `0 ${Math.round(18 * lift)}px ${Math.round(36 * lift)}px -12px rgba(54,81,224,${(.5 * lift).toFixed(2)})`,
      });
    }
    const anim = ghost.animate(frames, { duration: Math.round(Math.max(420, Math.min(620, 320 + dist * .6))), easing: 'linear', fill: 'forwards' });
    const done = () => { el.style.opacity = ''; ghost.remove(); };
    anim.onfinish = done; anim.oncancel = done;
    return () => { anim.cancel(); };
  }, []);
  return (
    <div style={{ display: 'flex', justifyContent: me ? 'flex-end' : 'flex-start', animation: flyFrom ? 'none' : `kmChatIn .4s ${ease} both` }}>
      <div ref={ref} style={{ maxWidth: '82%', padding: '11px 14px', borderRadius: 18, borderBottomRightRadius: me ? 6 : 18, borderBottomLeftRadius: me ? 18 : 6, background: me ? 'var(--km-ink)' : 'var(--km-white)', color: me ? 'var(--km-paper)' : 'var(--km-ink)', font: '400 14.5px/1.45 var(--font-sans)', letterSpacing: '-.005em', textWrap: 'pretty', whiteSpace: 'pre-wrap' }}>
        {children}
        {streaming && <span style={{ display: 'inline-block', width: 2, height: '1em', marginLeft: 2, verticalAlign: '-2px', background: 'var(--km-accent)', animation: 'kmChatCaret 1s steps(1) infinite' }} />}
      </div>
    </div>
  );
}

export function ChatWidget({
  title = 'Ask about Kushan', subtitle,
  greeting = "Hi, I'm Kushan. Ask me about a project, the stack, or whether I'm free to build something with you.",
  suggestions = ['What have you built?', 'Your stack?', 'Are you available?'],
  placeholder = 'Ask anything…', launcherLabel = 'Ask about Kushan',
  defaultOpen = false, open: openProp, onOpenChange, onClose, getResponse,
  position = 'fixed', streamSpeed = 18, style,
}) {
  useKeyframes();
  const [openState, setOpenState] = React.useState(defaultOpen);
  const open = openProp ?? openState;
  const setOpen = v => { setOpenState(v); onOpenChange && onOpenChange(v); };
  const [msgs, setMsgs] = React.useState([{ role: 'bot', text: greeting }]);
  const [phase, setPhase] = React.useState('idle'); // idle | processing | typing | streaming
  const [draft, setDraft] = React.useState('');
  const [userTyping, setUserTyping] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const scroller = React.useRef(null), input = React.useRef(null), typingT = React.useRef(0), alive = React.useRef(true);
  React.useEffect(() => () => { alive.current = false; }, []);
  React.useEffect(() => { const el = scroller.current; if (!el) return; const last = msgs[msgs.length - 1]; if (last && last.flyFrom && last.role === 'user' && phase === 'processing') return; el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' }); }, [msgs, phase]);
  React.useEffect(() => { if (open) { const t = setTimeout(() => input.current && input.current.focus(), 380); return () => clearTimeout(t); } }, [open]);
  React.useEffect(() => { const k = e => { if (e.key === 'Escape' && open) setOpen(false); }; window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); });

  const busy = phase !== 'idle';
  const close = () => { alive.current = false; setOpen(false); onClose && onClose(); setTimeout(() => { alive.current = true; setMsgs([{ role: 'bot', text: greeting }]); setPhase('idle'); setDraft(''); }, 450); };
  const send = async text => {
    const q = (text ?? draft).trim(); if (!q || busy) return;
    setDraft(''); setUserTyping(false);
    const history = msgs;
    const fr = input.current && input.current.closest('form') ? input.current.closest('form').getBoundingClientRect() : null;
    setMsgs(m => [...m, { role: 'user', text: q, flyFrom: fr && { left: fr.left, top: fr.top, width: fr.width, height: fr.height } }]);
    setPhase('processing');
    const minProcess = new Promise(r => setTimeout(r, 700));
    const typingTimer = setTimeout(() => alive.current && setPhase(p => p === 'processing' ? 'typing' : p), 700);
    let reply;
    try { reply = await getReply(q, history, getResponse); } catch (e) { reply = 'Something went wrong on my side. Try that again in a moment.'; }
    await minProcess; clearTimeout(typingTimer);
    if (!alive.current) return;
    setPhase('typing');
    await new Promise(r => setTimeout(r, 420));
    if (!alive.current) return;
    setPhase('streaming');
    setMsgs(m => [...m, { role: 'bot', text: '', streaming: true }]);
    const tokens = String(reply).match(/\S+\s*/g) || [String(reply)];
    let out = '';
    for (const t of tokens) {
      out += t;
      const snap = out;
      setMsgs(m => { const c = m.slice(); c[c.length - 1] = { role: 'bot', text: snap, streaming: true }; return c; });
      await new Promise(r => setTimeout(r, streamSpeed + Math.random() * streamSpeed * 2.2 + (/[.,]\s*$/.test(t) ? 90 : 0)));
      if (!alive.current) return;
    }
    setMsgs(m => { const c = m.slice(); c[c.length - 1] = { role: 'bot', text: out }; return c; });
    setPhase('idle');
  };
  const onDraft = e => {
    setDraft(e.target.value); setUserTyping(true);
    clearTimeout(typingT.current); typingT.current = setTimeout(() => setUserTyping(false), 900);
  };

  const W = 380, H = 560;
  const status = phase === 'processing' ? 'Thinking' : phase === 'typing' ? 'Typing' : phase === 'streaming' ? 'Responding' : userTyping ? 'Listening' : 'Online';
  return (
    <div className="km-chat" style={{ position, right: 24, bottom: 24, zIndex: 80, width: W, height: H, pointerEvents: 'none', fontFamily: 'var(--font-sans)', color: 'var(--km-ink)', ...style }}>
      {/* Depth halo: a soft ink pool cast behind the panel that pulls focus while open, with no page-wide scrim */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: '-140px -100px -60px -160px', borderRadius: '50%', pointerEvents: 'none', background: 'radial-gradient(closest-side, rgba(11,21,48,.22), rgba(11,21,48,.10) 55%, transparent 100%)', filter: 'blur(8px)', opacity: open ? 1 : 0, transform: open ? 'scale(1)' : 'scale(.7)', transformOrigin: '85% 90%', transition: open ? `opacity .6s ${ease} .08s, transform .8s ${ease}` : `opacity .3s ${ease}, transform .4s ${ease}` }} />
      {/* Panel — morphs out of the launcher via clip-path + scale from the bottom-right corner */}
      <section role="dialog" aria-label={title} aria-hidden={!open} style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden',
        borderRadius: 20, background: 'color-mix(in srgb,var(--km-paper) 92%,transparent)',
        backdropFilter: 'blur(18px) saturate(1.4)', WebkitBackdropFilter: 'blur(18px) saturate(1.4)',
        border: '1px solid rgba(11,21,48,.08)', boxShadow: open ? '0 0 0 1px rgba(11,21,48,.04), 0 1px 2px rgba(11,21,48,.08), 0 6px 14px -4px rgba(11,21,48,.12), 0 24px 48px -12px rgba(11,21,48,.22), 0 56px 96px -24px rgba(11,21,48,.32), 0 96px 160px -48px rgba(11,21,48,.36)' : '0 0 0 0 rgba(11,21,48,0)',
        transformOrigin: 'bottom right', pointerEvents: open ? 'auto' : 'none',
        clipPath: open ? 'inset(-200px -200px -200px -200px round 20px)' : `inset(calc(100% - 56px) 0 0 calc(100% - 168px) round 28px)`,
        opacity: open ? 1 : 0, transform: open ? 'none' : 'translateY(6px) scale(.96)',
        transition: open
          ? `clip-path .55s ${ease}, transform .55s ${ease}, opacity .2s ${ease}, box-shadow .7s ${ease} .1s`
          : `clip-path .42s ${ease}, transform .42s ${ease}, opacity .3s ${ease} .1s, box-shadow .25s ${ease}`,
      }}>
        <header style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 16px 14px 18px', borderBottom: '1px solid rgba(11,21,48,.08)', opacity: open ? 1 : 0, transform: open ? 'none' : 'translateY(6px)', transition: `opacity .35s ${ease} ${open ? '.12s' : '0s'}, transform .45s ${ease} ${open ? '.12s' : '0s'}` }}>
          <span style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--km-ink)', color: 'var(--km-paper)', display: 'grid', placeItems: 'center', flexShrink: 0 }}><ChatGlyph size={17} /></span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ font: '500 16px/1.1 var(--font-sans)', letterSpacing: '-.02em' }}>{title}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 5 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: busy ? 'var(--km-accent)' : 'var(--km-success)', animation: busy ? 'none' : 'kmChatPulse 2.2s infinite', transition: `background .3s ${ease}` }} />
              <span key={status} style={{ ...mono, opacity: .6, animation: `kmChatIn .3s ${ease} both` }}>{status}{status === 'Online' && subtitle ? ` · ${subtitle}` : ''}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={() => setOpen(false)} aria-label="Hide chat" title="Hide (keeps conversation)" style={iconBtn} {...hov}>–</button>
            <button onClick={close} aria-label="Close chat" title="Close (ends conversation)" style={iconBtn} {...hov}>×</button>
          </div>
        </header>

        <div ref={scroller} style={{ flex: 1, overflowY: 'auto', padding: '18px 16px 8px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {msgs.map((m, i) => <Bubble key={i} role={m.role} streaming={m.streaming} flyFrom={m.flyFrom} scroller={scroller}>{m.text}</Bubble>)}
          {phase === 'processing' && <div style={{ padding: '6px 4px', animation: `kmChatIn .3s ${ease} both` }}><Shimmer>Reading your question</Shimmer></div>}
          {phase === 'typing' && <div style={{ display: 'flex', animation: `kmChatIn .3s ${ease} both` }}><div style={{ padding: '10px 14px', borderRadius: 18, borderBottomLeftRadius: 6, background: 'var(--km-white)', color: 'rgba(11,21,48,.55)' }}><Dots /></div></div>}
          {msgs.length === 1 && !busy && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
              {suggestions.map((s, i) => (
                <button key={s} onClick={() => send(s)} style={{ padding: '8px 12px', borderRadius: 99, border: '1px solid rgba(11,21,48,.14)', background: 'transparent', color: 'inherit', cursor: 'pointer', font: '500 13px/1 var(--font-sans)', animation: `kmChatIn .4s ${ease} ${.2 + i * .06}s both`, transition: `background .3s ${ease}` }} onMouseEnter={e => e.currentTarget.style.background = 'var(--km-white)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>{s}</button>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={e => { e.preventDefault(); send(); }} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 8, margin: 12, padding: 6, paddingLeft: 16, borderRadius: 99, background: 'var(--km-white)', border: `1px solid ${focused ? 'color-mix(in srgb,var(--km-accent) 18%,transparent)' : 'rgba(11,21,48,.08)'}`, boxShadow: focused ? '0 0 24px -6px color-mix(in srgb,var(--km-accent) 40%,transparent)' : '0 0 0 0 transparent', transition: `border-color .35s ${ease}, box-shadow .45s ${ease}` }}>
          {/* Border beam: rotating conic highlight masked to a 1.5px ring */}
          <span aria-hidden="true" style={{ position: 'absolute', inset: -1, borderRadius: 99, padding: 1.5, pointerEvents: 'none', background: 'conic-gradient(from var(--km-beam), transparent 0deg, transparent 250deg, color-mix(in srgb,var(--km-accent) 40%,transparent) 300deg, var(--km-accent) 340deg, #fff 352deg, transparent 360deg)', WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)', WebkitMaskComposite: 'xor', mask: 'linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)', opacity: focused ? 1 : 0, animation: 'kmChatBeam 2.6s linear infinite', transition: `opacity .45s ${ease}` }} />
          <input ref={input} value={draft} onChange={onDraft} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} placeholder={placeholder} disabled={busy} style={{ flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent', color: 'inherit', font: '400 14.5px/1.4 var(--font-sans)' }} />
          <button type="submit" disabled={busy || !draft.trim()} aria-label="Send" style={{ width: 36, height: 36, borderRadius: 99, border: 'none', cursor: busy || !draft.trim() ? 'default' : 'pointer', background: draft.trim() && !busy ? 'var(--km-accent)' : 'rgba(11,21,48,.08)', color: draft.trim() && !busy ? '#fff' : 'rgba(11,21,48,.4)', font: '500 16px/1 var(--font-sans)', transform: draft.trim() && !busy ? 'scale(1)' : 'scale(.92)', transition: `background .3s ${ease}, color .3s ${ease}, transform .35s ${ease}` }}>↑</button>
        </form>
      </section>

      {/* Launcher pill — fades/shrinks into the panel corner when open */}
      <button onClick={() => setOpen(!open)} aria-label={open ? 'Collapse chat' : 'Open chat'} aria-expanded={open} style={{
        position: 'absolute', right: 0, bottom: 0, height: 56, padding: '0 22px 0 18px', display: 'flex', alignItems: 'center', gap: 10,
        borderRadius: 99, border: 'none', cursor: 'pointer', background: 'var(--km-ink)', color: 'var(--km-paper)',
        font: '500 15px/1 var(--font-sans)', letterSpacing: '-.01em', boxShadow: '0 24px 40px -20px rgba(11,21,48,.55)',
        pointerEvents: open ? 'none' : 'auto', opacity: open ? 0 : 1, transform: open ? 'scale(.85) translateY(8px)' : 'none',
        transition: open ? `opacity .2s ${ease}, transform .35s ${ease}` : `opacity .3s ${ease} .2s, transform .45s ${ease} .2s`,
      }} onMouseEnter={e => { if (!open) e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={e => { if (!open) e.currentTarget.style.transform = 'none'; }}>
        <ChatGlyph size={18} />
        {launcherLabel}
        <span style={{ color: 'var(--km-accent-soft)' }}>↗</span>
      </button>
    </div>
  );
}
