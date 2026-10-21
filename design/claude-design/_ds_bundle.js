/* @ds-bundle: {"format":4,"namespace":"KushanManaharaDesignSystem_636c69","components":[{"name":"ExpertiseCard","sourcePath":"components/cards/ExpertiseCard.jsx"},{"name":"ProjectCard","sourcePath":"components/cards/ProjectCard.jsx"},{"name":"ProjectRow","sourcePath":"components/cards/ProjectRow.jsx"},{"name":"QuoteCard","sourcePath":"components/cards/QuoteCard.jsx"},{"name":"ChatWidget","sourcePath":"components/chat/ChatWidget.jsx"},{"name":"FactList","sourcePath":"components/content/FactList.jsx"},{"name":"SectionHeading","sourcePath":"components/content/SectionHeading.jsx"},{"name":"Em","sourcePath":"components/content/SectionHeading.jsx"},{"name":"Stat","sourcePath":"components/content/Stat.jsx"},{"name":"ToolTile","sourcePath":"components/content/ToolTile.jsx"},{"name":"ArrowOrb","sourcePath":"components/core/ArrowOrb.jsx"},{"name":"BrandMark","sourcePath":"components/core/BrandMark.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"StatusDot","sourcePath":"components/core/StatusDot.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"NavBar","sourcePath":"components/navigation/NavBar.jsx"},{"name":"SegmentedLens","sourcePath":"components/navigation/SegmentedLens.jsx"},{"name":"CaseStudy","sourcePath":"ui_kits/portfolio/CaseStudy.jsx"},{"name":"Home","sourcePath":"ui_kits/portfolio/Home.jsx"},{"name":"ProjectsIndex","sourcePath":"ui_kits/portfolio/ProjectsIndex.jsx"},{"name":"PROJECTS","sourcePath":"ui_kits/portfolio/data.jsx"}],"sourceHashes":{"components/cards/ExpertiseCard.jsx":"fc05535b6d3c","components/cards/ProjectCard.jsx":"18c7b4c0cd97","components/cards/ProjectRow.jsx":"6297f722e8be","components/cards/QuoteCard.jsx":"0d2cb6bd8465","components/chat/ChatWidget.jsx":"c76f1be8a848","components/content/FactList.jsx":"c128636e287f","components/content/SectionHeading.jsx":"30dd4af0e2f4","components/content/Stat.jsx":"538328d51f7d","components/content/ToolTile.jsx":"6a843434ffe4","components/core/ArrowOrb.jsx":"efa15b9a6ced","components/core/BrandMark.jsx":"c00554ac40c0","components/core/Button.jsx":"0495a51b0983","components/core/Eyebrow.jsx":"0542345b1e81","components/core/StatusDot.jsx":"82355a8435f3","components/core/Tag.jsx":"a2a5106c4682","components/navigation/NavBar.jsx":"a32536815fda","components/navigation/SegmentedLens.jsx":"c2b80e1b0016","ui_kits/portfolio/CaseStudy.jsx":"74690b278562","ui_kits/portfolio/Home.jsx":"1a0916f8ac3b","ui_kits/portfolio/ProjectsIndex.jsx":"3a051069c3d0","ui_kits/portfolio/data.jsx":"404b89306006"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.KushanManaharaDesignSystem_636c69 = window.KushanManaharaDesignSystem_636c69 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/cards/QuoteCard.jsx
try { (() => {
function QuoteCard({
  company,
  quote,
  who,
  role,
  avatar,
  tone = 'white',
  style
}) {
  const t = {
    white: ['var(--km-white)', 'var(--km-ink)'],
    ink: ['var(--km-ink)', 'var(--km-paper)'],
    accent: ['var(--km-accent)', '#fff']
  }[tone];
  return /*#__PURE__*/React.createElement("figure", {
    style: {
      width: 410,
      maxWidth: '100%',
      minHeight: 236,
      margin: 0,
      padding: 22,
      borderRadius: 'var(--radius-media)',
      background: t[0],
      color: t[1],
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: 14,
      boxShadow: 'var(--shadow-quote)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 11px/1 var(--font-mono)',
      letterSpacing: '.04em',
      textTransform: 'uppercase',
      opacity: .65
    }
  }, company), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      fontSize: 44,
      lineHeight: .5,
      color: tone === 'accent' ? '#fff' : 'var(--km-accent)'
    }
  }, "\u201C")), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      fontWeight: 500,
      fontSize: 17,
      lineHeight: 1.38,
      letterSpacing: '-.01em',
      textWrap: 'pretty'
    }
  }, quote), /*#__PURE__*/React.createElement("figcaption", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 36,
      height: 36,
      borderRadius: '50%',
      flex: 'none',
      overflow: 'hidden',
      background: 'rgba(128,128,128,.2)'
    }
  }, avatar && /*#__PURE__*/React.createElement("img", {
    src: avatar,
    alt: who,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      fontSize: 14
    }
  }, who), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 11px/1.3 var(--font-mono)',
      opacity: .65
    }
  }, role))));
}
Object.assign(__ds_scope, { QuoteCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/QuoteCard.jsx", error: String((e && e.message) || e) }); }

// components/chat/ChatWidget.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
    const s = document.createElement('style');
    s.id = KF_ID;
    s.textContent = KF;
    document.head.appendChild(s);
  }, []);
}
const DEFAULT_REPLIES = [[/project|work|built|relay/i, 'Five systems in production. Relay is the one I point to first: a support agent at Kestrel AI that now resolves 38% of tickets end to end. The model was the easy part. The evaluation harness took longer.'], [/stack|tech|tool|python|pytorch/i, 'Python and PyTorch for models, TypeScript at the edges, Postgres and Redis underneath. I pick boring infrastructure on purpose so the interesting problems stay in the model.'], [/hire|available|contact|email|build/i, "I'm taking on new work from November. The fastest route is a short note on what you're building and where it breaks today. I reply within a day."], [/where|oslo|location/i, "I'm based in Oslo and work with teams across Europe. Most of my collaboration is async, with a weekly call."]];
const FALLBACK = 'Good question. I design the model, the pipeline around it, and the evaluation that proves it works. Ask about a project, the stack, or availability.';
function cannedReply(q) {
  const hit = DEFAULT_REPLIES.find(([re]) => re.test(q));
  return hit ? hit[1] : FALLBACK;
}
async function getReply(q, history, getResponse) {
  if (getResponse) return getResponse(q, history);
  if (typeof window !== 'undefined' && window.claude && window.claude.complete) {
    try {
      const convo = history.map(m => `${m.role === 'user' ? 'Visitor' : 'Kushan'}: ${m.text}`).join('\n');
      return await window.claude.complete(`You are Kushan Manahara, ML & software engineer in Oslo, answering visitors on your portfolio. First person, plain, quietly confident, concrete numbers, no hype, no exclamation marks, no emoji, 2-3 sentences.\n\n${convo}\nVisitor: ${q}\nKushan:`);
    } catch (e) {/* fall through */}
  }
  await new Promise(r => setTimeout(r, 650));
  return cannedReply(q);
}
const ease = 'cubic-bezier(.2,.8,.1,1)';
/* Lucide "message-circle" (ISC) */
const ChatGlyph = ({
  size = 18
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z"
}));
const iconBtn = {
  width: 32,
  height: 32,
  borderRadius: 99,
  border: 'none',
  cursor: 'pointer',
  background: 'transparent',
  color: 'inherit',
  opacity: .6,
  display: 'grid',
  placeItems: 'center',
  font: '500 15px/1 var(--font-sans)',
  transition: 'opacity .3s cubic-bezier(.2,.8,.1,1)'
};
const hov = {
  onMouseEnter: e => e.currentTarget.style.opacity = 1,
  onMouseLeave: e => e.currentTarget.style.opacity = .6
};
const mono = {
  font: '500 11px/1 var(--font-mono)',
  letterSpacing: '.06em',
  textTransform: 'uppercase'
};
function Dots() {
  return /*#__PURE__*/React.createElement("span", {
    "aria-label": "Typing",
    style: {
      display: 'inline-flex',
      gap: 4,
      padding: '4px 2px'
    }
  }, [0, 1, 2].map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'currentColor',
      animation: `kmChatDot 1.1s ${i * .14}s infinite ${ease}`
    }
  })));
}
function Shimmer({
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono,
      color: 'transparent',
      backgroundImage: 'linear-gradient(90deg,rgba(11,21,48,.35) 0%,rgba(11,21,48,.35) 40%,var(--km-accent) 50%,rgba(11,21,48,.35) 60%,rgba(11,21,48,.35) 100%)',
      backgroundSize: '250% 100%',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      animation: 'kmChatShimmer 1.6s linear infinite'
    }
  }, children);
}

/* Send flight. A fixed-position copy of the bubble flies above the panel (so the scroll list
   can't clip it) from the composer's text start to the bubble's final slot. It follows a quadratic
   curve that lifts first, then swings right; X and Y are eased separately, it banks slightly along
   the tangent and morphs pill/white → ink bubble. The real bubble is hidden underneath and swapped
   in on the last frame, so there's no jump. Duration scales with distance (360–560ms). */
const flyEase = t => 1 - Math.pow(1 - t, 3);
const mixHex = (a, b, t) => {
  const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const A = p(a),
    B = p(b);
  return 'rgb(' + A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(',') + ')';
};
function Bubble({
  role,
  children,
  streaming,
  flyFrom,
  scroller
}) {
  const me = role === 'user';
  const ref = React.useRef(null);
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!flyFrom || !el) return;
    const sc = scroller && scroller.current;
    if (sc) sc.scrollTop = sc.scrollHeight;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !el.animate) {
      el.animate && el.animate([{
        opacity: 0
      }, {
        opacity: 1
      }], {
        duration: 160
      });
      return;
    }
    const r = el.getBoundingClientRect();
    // Path (matches reference): S-curve from the composer. Rise, sweep right across the middle,
    // then come straight up into the bubble from below. Cubic Bézier on bubble centres.
    const w = r.width,
      h = r.height;
    const x0 = flyFrom.left + (flyFrom.width || 300) * .38,
      y0 = flyFrom.top + flyFrom.height / 2;
    const x3 = r.left + w / 2,
      y3 = r.top + h / 2;
    const dx = x3 - x0,
      dy = y0 - y3;
    const x1 = x0 + dx * .12,
      y1 = y0 - dy * .30; // leave going up, slightly right
    const x2 = x3,
      y2 = y0 - dy * .40; // sweep right, then vertical approach
    const dist = Math.hypot(dx, dy) * 1.15;
    const ghost = el.cloneNode(true);
    Object.assign(ghost.style, {
      position: 'fixed',
      left: r.left + 'px',
      top: r.top + 'px',
      width: w + 'px',
      height: h + 'px',
      margin: 0,
      boxSizing: 'border-box',
      zIndex: 2147483000,
      pointerEvents: 'none',
      willChange: 'transform',
      maxWidth: 'none',
      transformOrigin: '50% 50%'
    });
    el.style.opacity = '0';
    document.body.appendChild(ghost);
    const B = (a, b, c, d, t) => {
      const u = 1 - t;
      return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d;
    };
    const dB = (a, b, c, d, t) => {
      const u = 1 - t;
      return 3 * u * u * (b - a) + 6 * u * t * (c - b) + 3 * t * t * (d - c);
    };
    const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; // in-out cubic: gentle launch, soft landing
    const N = 36,
      frames = [];
    for (let i = 0; i <= N; i++) {
      const t = i / N,
        p = ease(t);
      const bx = B(x0, x1, x2, x3, p),
        by = B(y0, y1, y2, y3, p);
      const tx = dB(x0, x1, x2, x3, p),
        ty = dB(y0, y1, y2, y3, p);
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
        boxShadow: `0 ${Math.round(18 * lift)}px ${Math.round(36 * lift)}px -12px rgba(54,81,224,${(.5 * lift).toFixed(2)})`
      });
    }
    const anim = ghost.animate(frames, {
      duration: Math.round(Math.max(420, Math.min(620, 320 + dist * .6))),
      easing: 'linear',
      fill: 'forwards'
    });
    const done = () => {
      el.style.opacity = '';
      ghost.remove();
    };
    anim.onfinish = done;
    anim.oncancel = done;
    return () => {
      anim.cancel();
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: me ? 'flex-end' : 'flex-start',
      animation: flyFrom ? 'none' : `kmChatIn .4s ${ease} both`
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      maxWidth: '82%',
      padding: '11px 14px',
      borderRadius: 18,
      borderBottomRightRadius: me ? 6 : 18,
      borderBottomLeftRadius: me ? 18 : 6,
      background: me ? 'var(--km-ink)' : 'var(--km-white)',
      color: me ? 'var(--km-paper)' : 'var(--km-ink)',
      font: '400 14.5px/1.45 var(--font-sans)',
      letterSpacing: '-.005em',
      textWrap: 'pretty',
      whiteSpace: 'pre-wrap'
    }
  }, children, streaming && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: 2,
      height: '1em',
      marginLeft: 2,
      verticalAlign: '-2px',
      background: 'var(--km-accent)',
      animation: 'kmChatCaret 1s steps(1) infinite'
    }
  })));
}
function ChatWidget({
  title = 'Ask about Kushan',
  subtitle,
  greeting = "Hi, I'm Kushan. Ask me about a project, the stack, or whether I'm free to build something with you.",
  suggestions = ['What have you built?', 'Your stack?', 'Are you available?'],
  placeholder = 'Ask anything…',
  launcherLabel = 'Ask about Kushan',
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  onClose,
  getResponse,
  position = 'fixed',
  streamSpeed = 18,
  style
}) {
  useKeyframes();
  const [openState, setOpenState] = React.useState(defaultOpen);
  const open = openProp ?? openState;
  const setOpen = v => {
    setOpenState(v);
    onOpenChange && onOpenChange(v);
  };
  const [msgs, setMsgs] = React.useState([{
    role: 'bot',
    text: greeting
  }]);
  const [phase, setPhase] = React.useState('idle'); // idle | processing | typing | streaming
  const [draft, setDraft] = React.useState('');
  const [userTyping, setUserTyping] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const scroller = React.useRef(null),
    input = React.useRef(null),
    typingT = React.useRef(0),
    alive = React.useRef(true);
  React.useEffect(() => () => {
    alive.current = false;
  }, []);
  React.useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const last = msgs[msgs.length - 1];
    if (last && last.flyFrom && last.role === 'user' && phase === 'processing') return;
    el.scrollTo({
      top: el.scrollHeight,
      behavior: 'smooth'
    });
  }, [msgs, phase]);
  React.useEffect(() => {
    if (open) {
      const t = setTimeout(() => input.current && input.current.focus(), 380);
      return () => clearTimeout(t);
    }
  }, [open]);
  React.useEffect(() => {
    const k = e => {
      if (e.key === 'Escape' && open) setOpen(false);
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  });
  const busy = phase !== 'idle';
  const close = () => {
    alive.current = false;
    setOpen(false);
    onClose && onClose();
    setTimeout(() => {
      alive.current = true;
      setMsgs([{
        role: 'bot',
        text: greeting
      }]);
      setPhase('idle');
      setDraft('');
    }, 450);
  };
  const send = async text => {
    const q = (text ?? draft).trim();
    if (!q || busy) return;
    setDraft('');
    setUserTyping(false);
    const history = msgs;
    const fr = input.current && input.current.closest('form') ? input.current.closest('form').getBoundingClientRect() : null;
    setMsgs(m => [...m, {
      role: 'user',
      text: q,
      flyFrom: fr && {
        left: fr.left,
        top: fr.top,
        width: fr.width,
        height: fr.height
      }
    }]);
    setPhase('processing');
    const minProcess = new Promise(r => setTimeout(r, 700));
    const typingTimer = setTimeout(() => alive.current && setPhase(p => p === 'processing' ? 'typing' : p), 700);
    let reply;
    try {
      reply = await getReply(q, history, getResponse);
    } catch (e) {
      reply = 'Something went wrong on my side. Try that again in a moment.';
    }
    await minProcess;
    clearTimeout(typingTimer);
    if (!alive.current) return;
    setPhase('typing');
    await new Promise(r => setTimeout(r, 420));
    if (!alive.current) return;
    setPhase('streaming');
    setMsgs(m => [...m, {
      role: 'bot',
      text: '',
      streaming: true
    }]);
    const tokens = String(reply).match(/\S+\s*/g) || [String(reply)];
    let out = '';
    for (const t of tokens) {
      out += t;
      const snap = out;
      setMsgs(m => {
        const c = m.slice();
        c[c.length - 1] = {
          role: 'bot',
          text: snap,
          streaming: true
        };
        return c;
      });
      await new Promise(r => setTimeout(r, streamSpeed + Math.random() * streamSpeed * 2.2 + (/[.,]\s*$/.test(t) ? 90 : 0)));
      if (!alive.current) return;
    }
    setMsgs(m => {
      const c = m.slice();
      c[c.length - 1] = {
        role: 'bot',
        text: out
      };
      return c;
    });
    setPhase('idle');
  };
  const onDraft = e => {
    setDraft(e.target.value);
    setUserTyping(true);
    clearTimeout(typingT.current);
    typingT.current = setTimeout(() => setUserTyping(false), 900);
  };
  const W = 380,
    H = 560;
  const status = phase === 'processing' ? 'Thinking' : phase === 'typing' ? 'Typing' : phase === 'streaming' ? 'Responding' : userTyping ? 'Listening' : 'Online';
  return /*#__PURE__*/React.createElement("div", {
    className: "km-chat",
    style: {
      position,
      right: 24,
      bottom: 24,
      zIndex: 80,
      width: W,
      height: H,
      pointerEvents: 'none',
      fontFamily: 'var(--font-sans)',
      color: 'var(--km-ink)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: '-140px -100px -60px -160px',
      borderRadius: '50%',
      pointerEvents: 'none',
      background: 'radial-gradient(closest-side, rgba(11,21,48,.22), rgba(11,21,48,.10) 55%, transparent 100%)',
      filter: 'blur(8px)',
      opacity: open ? 1 : 0,
      transform: open ? 'scale(1)' : 'scale(.7)',
      transformOrigin: '85% 90%',
      transition: open ? `opacity .6s ${ease} .08s, transform .8s ${ease}` : `opacity .3s ${ease}, transform .4s ${ease}`
    }
  }), /*#__PURE__*/React.createElement("section", {
    role: "dialog",
    "aria-label": title,
    "aria-hidden": !open,
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      borderRadius: 20,
      background: 'color-mix(in srgb,var(--km-paper) 92%,transparent)',
      backdropFilter: 'blur(18px) saturate(1.4)',
      WebkitBackdropFilter: 'blur(18px) saturate(1.4)',
      border: '1px solid rgba(11,21,48,.08)',
      boxShadow: open ? '0 0 0 1px rgba(11,21,48,.04), 0 1px 2px rgba(11,21,48,.08), 0 6px 14px -4px rgba(11,21,48,.12), 0 24px 48px -12px rgba(11,21,48,.22), 0 56px 96px -24px rgba(11,21,48,.32), 0 96px 160px -48px rgba(11,21,48,.36)' : '0 0 0 0 rgba(11,21,48,0)',
      transformOrigin: 'bottom right',
      pointerEvents: open ? 'auto' : 'none',
      clipPath: open ? 'inset(-200px -200px -200px -200px round 20px)' : `inset(calc(100% - 56px) 0 0 calc(100% - 168px) round 28px)`,
      opacity: open ? 1 : 0,
      transform: open ? 'none' : 'translateY(6px) scale(.96)',
      transition: open ? `clip-path .55s ${ease}, transform .55s ${ease}, opacity .2s ${ease}, box-shadow .7s ${ease} .1s` : `clip-path .42s ${ease}, transform .42s ${ease}, opacity .3s ${ease} .1s, box-shadow .25s ${ease}`
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '16px 16px 14px 18px',
      borderBottom: '1px solid rgba(11,21,48,.08)',
      opacity: open ? 1 : 0,
      transform: open ? 'none' : 'translateY(6px)',
      transition: `opacity .35s ${ease} ${open ? '.12s' : '0s'}, transform .45s ${ease} ${open ? '.12s' : '0s'}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: '50%',
      background: 'var(--km-ink)',
      color: 'var(--km-paper)',
      display: 'grid',
      placeItems: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(ChatGlyph, {
    size: 17
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 16px/1.1 var(--font-sans)',
      letterSpacing: '-.02em'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      marginTop: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: busy ? 'var(--km-accent)' : 'var(--km-success)',
      animation: busy ? 'none' : 'kmChatPulse 2.2s infinite',
      transition: `background .3s ${ease}`
    }
  }), /*#__PURE__*/React.createElement("span", {
    key: status,
    style: {
      ...mono,
      opacity: .6,
      animation: `kmChatIn .3s ${ease} both`
    }
  }, status, status === 'Online' && subtitle ? ` · ${subtitle}` : ''))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("button", _extends({
    onClick: () => setOpen(false),
    "aria-label": "Hide chat",
    title: "Hide (keeps conversation)",
    style: iconBtn
  }, hov), "\u2013"), /*#__PURE__*/React.createElement("button", _extends({
    onClick: close,
    "aria-label": "Close chat",
    title: "Close (ends conversation)",
    style: iconBtn
  }, hov), "\xD7"))), /*#__PURE__*/React.createElement("div", {
    ref: scroller,
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '18px 16px 8px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, msgs.map((m, i) => /*#__PURE__*/React.createElement(Bubble, {
    key: i,
    role: m.role,
    streaming: m.streaming,
    flyFrom: m.flyFrom,
    scroller: scroller
  }, m.text)), phase === 'processing' && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '6px 4px',
      animation: `kmChatIn .3s ${ease} both`
    }
  }, /*#__PURE__*/React.createElement(Shimmer, null, "Reading your question")), phase === 'typing' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      animation: `kmChatIn .3s ${ease} both`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 14px',
      borderRadius: 18,
      borderBottomLeftRadius: 6,
      background: 'var(--km-white)',
      color: 'rgba(11,21,48,.55)'
    }
  }, /*#__PURE__*/React.createElement(Dots, null))), msgs.length === 1 && !busy && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6,
      marginTop: 4
    }
  }, suggestions.map((s, i) => /*#__PURE__*/React.createElement("button", {
    key: s,
    onClick: () => send(s),
    style: {
      padding: '8px 12px',
      borderRadius: 99,
      border: '1px solid rgba(11,21,48,.14)',
      background: 'transparent',
      color: 'inherit',
      cursor: 'pointer',
      font: '500 13px/1 var(--font-sans)',
      animation: `kmChatIn .4s ${ease} ${.2 + i * .06}s both`,
      transition: `background .3s ${ease}`
    },
    onMouseEnter: e => e.currentTarget.style.background = 'var(--km-white)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent'
  }, s)))), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      send();
    },
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      margin: 12,
      padding: 6,
      paddingLeft: 16,
      borderRadius: 99,
      background: 'var(--km-white)',
      border: `1px solid ${focused ? 'color-mix(in srgb,var(--km-accent) 18%,transparent)' : 'rgba(11,21,48,.08)'}`,
      boxShadow: focused ? '0 0 24px -6px color-mix(in srgb,var(--km-accent) 40%,transparent)' : '0 0 0 0 transparent',
      transition: `border-color .35s ${ease}, box-shadow .45s ${ease}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: -1,
      borderRadius: 99,
      padding: 1.5,
      pointerEvents: 'none',
      background: 'conic-gradient(from var(--km-beam), transparent 0deg, transparent 250deg, color-mix(in srgb,var(--km-accent) 40%,transparent) 300deg, var(--km-accent) 340deg, #fff 352deg, transparent 360deg)',
      WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
      WebkitMaskComposite: 'xor',
      mask: 'linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)',
      opacity: focused ? 1 : 0,
      animation: 'kmChatBeam 2.6s linear infinite',
      transition: `opacity .45s ${ease}`
    }
  }), /*#__PURE__*/React.createElement("input", {
    ref: input,
    value: draft,
    onChange: onDraft,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    placeholder: placeholder,
    disabled: busy,
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      color: 'inherit',
      font: '400 14.5px/1.4 var(--font-sans)'
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: busy || !draft.trim(),
    "aria-label": "Send",
    style: {
      width: 36,
      height: 36,
      borderRadius: 99,
      border: 'none',
      cursor: busy || !draft.trim() ? 'default' : 'pointer',
      background: draft.trim() && !busy ? 'var(--km-accent)' : 'rgba(11,21,48,.08)',
      color: draft.trim() && !busy ? '#fff' : 'rgba(11,21,48,.4)',
      font: '500 16px/1 var(--font-sans)',
      transform: draft.trim() && !busy ? 'scale(1)' : 'scale(.92)',
      transition: `background .3s ${ease}, color .3s ${ease}, transform .35s ${ease}`
    }
  }, "\u2191"))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(!open),
    "aria-label": open ? 'Collapse chat' : 'Open chat',
    "aria-expanded": open,
    style: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      height: 56,
      padding: '0 22px 0 18px',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      borderRadius: 99,
      border: 'none',
      cursor: 'pointer',
      background: 'var(--km-ink)',
      color: 'var(--km-paper)',
      font: '500 15px/1 var(--font-sans)',
      letterSpacing: '-.01em',
      boxShadow: '0 24px 40px -20px rgba(11,21,48,.55)',
      pointerEvents: open ? 'none' : 'auto',
      opacity: open ? 0 : 1,
      transform: open ? 'scale(.85) translateY(8px)' : 'none',
      transition: open ? `opacity .2s ${ease}, transform .35s ${ease}` : `opacity .3s ${ease} .2s, transform .45s ${ease} .2s`
    },
    onMouseEnter: e => {
      if (!open) e.currentTarget.style.transform = 'translateY(-2px)';
    },
    onMouseLeave: e => {
      if (!open) e.currentTarget.style.transform = 'none';
    }
  }, /*#__PURE__*/React.createElement(ChatGlyph, {
    size: 18
  }), launcherLabel, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--km-accent-soft)'
    }
  }, "\u2197")));
}
Object.assign(__ds_scope, { ChatWidget });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/chat/ChatWidget.jsx", error: String((e && e.message) || e) }); }

// components/content/FactList.jsx
try { (() => {
function FactList({
  rows,
  variant = 'facts',
  dark,
  style
}) {
  const line = dark ? 'var(--km-paper-a14)' : 'var(--border-rule)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      borderBottom: '1px solid ' + line,
      ...style
    }
  }, rows.map((r, i) => variant === 'meta' ? /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 12,
      padding: '12px 0',
      borderTop: '1px solid ' + line,
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .6
    }
  }, r.k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 500,
      textAlign: 'right'
    }
  }, r.v)) : /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) minmax(0,2.6fr)',
      gap: '2vw',
      padding: '16px 0',
      borderTop: '1px solid ' + line
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 12px/1.5 var(--font-mono)',
      letterSpacing: '.06em',
      textTransform: 'uppercase',
      opacity: .55
    }
  }, r.k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      fontWeight: 500,
      letterSpacing: '-.01em',
      lineHeight: 1.45
    }
  }, r.v))));
}
Object.assign(__ds_scope, { FactList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/FactList.jsx", error: String((e && e.message) || e) }); }

// components/content/Stat.jsx
try { (() => {
function Stat({
  value,
  label,
  variant = 'sans',
  style
}) {
  const v = variant === 'compact' ? {
    fontWeight: 500,
    fontSize: 'clamp(32px,2.8vw,48px)',
    letterSpacing: '-.045em',
    lineHeight: 1
  } : {
    fontWeight: 500,
    fontSize: 'var(--type-stat-size)',
    letterSpacing: 'var(--type-stat-ls)',
    lineHeight: 'var(--type-stat-lh)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: variant === 'compact' ? 8 : 12,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: v
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 12px/1.5 var(--font-mono)',
      opacity: .65
    }
  }, label));
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Stat.jsx", error: String((e && e.message) || e) }); }

// components/content/ToolTile.jsx
try { (() => {
function ToolTile({
  abbr,
  name,
  note,
  bg = '#FFFFFF',
  style
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '14px 0',
      borderBottom: '1px solid var(--border-hairline)',
      minWidth: 0,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      width: 36,
      height: 36,
      flex: 'none',
      borderRadius: 'var(--radius-tile)',
      overflow: 'hidden',
      background: bg,
      color: 'var(--km-ink)',
      boxShadow: 'var(--shadow-tile)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      font: '600 10px/1 var(--font-mono)',
      letterSpacing: '-.02em'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      background: '#fff',
      opacity: h ? 0 : 1,
      transition: 'opacity .35s'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative'
    }
  }, abbr)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 500,
      fontSize: 15,
      lineHeight: 1.15,
      letterSpacing: '-.015em'
    }
  }, name), note && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      lineHeight: 1.35,
      opacity: .58
    }
  }, note)));
}
Object.assign(__ds_scope, { ToolTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ToolTile.jsx", error: String((e && e.message) || e) }); }

// components/core/ArrowOrb.jsx
try { (() => {
function ArrowOrb({
  glyph = '→',
  size = 44,
  tone = 'ink',
  style
}) {
  const bg = tone === 'accent' ? 'var(--km-accent)' : tone === 'paper' ? 'var(--km-paper)' : 'var(--km-ink)';
  const fg = tone === 'accent' ? '#fff' : tone === 'paper' ? 'var(--km-ink)' : 'var(--km-paper)';
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: size,
      height: size,
      flex: 'none',
      borderRadius: '50%',
      background: bg,
      color: fg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: size <= 24 ? 12 : size >= 64 ? 28 : 16,
      ...style
    }
  }, glyph);
}
Object.assign(__ds_scope, { ArrowOrb });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ArrowOrb.jsx", error: String((e && e.message) || e) }); }

// components/core/BrandMark.jsx
try { (() => {
function BrandMark({
  name = 'Kushan Manahara',
  href = '#top',
  variant = 'wordmark',
  size = 17,
  style
}) {
  if (variant === 'monogram') {
    const s = size * 1.6;
    return /*#__PURE__*/React.createElement("a", {
      href: href,
      "aria-label": name,
      style: {
        width: s,
        height: s,
        flex: 'none',
        borderRadius: s * 0.225,
        background: 'var(--km-ink)',
        color: 'var(--km-paper)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: s * 0.025,
        fontWeight: 600,
        fontSize: s * 0.5,
        letterSpacing: '-.06em',
        lineHeight: 1,
        ...style
      }
    }, "km", /*#__PURE__*/React.createElement("span", {
      style: {
        width: s * 0.13,
        height: s * 0.13,
        borderRadius: '50%',
        background: 'var(--km-accent)',
        alignSelf: 'flex-end',
        marginBottom: s * 0.25,
        display: 'block'
      }
    }));
  }
  const i = name.lastIndexOf(' '),
    first = i > 0 ? name.slice(0, i) : name,
    last = i > 0 ? name.slice(i) : '';
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    style: {
      fontWeight: 600,
      fontSize: size,
      letterSpacing: '-.03em',
      display: 'inline-flex',
      alignItems: 'baseline',
      color: 'inherit',
      whiteSpace: 'nowrap',
      lineHeight: 1,
      ...style
    }
  }, first, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--em-muted)'
    }
  }, last), /*#__PURE__*/React.createElement("span", {
    style: {
      width: '.26em',
      height: '.26em',
      marginLeft: '.06em',
      borderRadius: '50%',
      background: 'var(--km-accent)',
      display: 'inline-block'
    }
  }));
}
Object.assign(__ds_scope, { BrandMark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/BrandMark.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const base = {
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'inherit',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
  borderRadius: 'var(--radius-pill)',
  fontWeight: 500,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  transition: 'background-color .3s, box-shadow .3s, gap .3s var(--ease-out), transform .3s var(--ease-out)'
};
const V = {
  ink: {
    background: 'var(--km-ink)',
    color: 'var(--km-paper)'
  },
  accent: {
    background: 'var(--km-accent)',
    color: '#fff',
    boxShadow: '0 0 0 1px rgba(11,21,48,.12)'
  },
  soft: {
    background: 'var(--surface-soft)',
    color: 'var(--km-ink)'
  },
  outline: {
    background: 'transparent',
    color: 'var(--km-ink)',
    boxShadow: 'inset 0 0 0 1px var(--border-control)'
  },
  light: {
    background: 'var(--km-paper)',
    color: 'var(--km-ink)',
    font: '500 12px/1 var(--font-mono)'
  },
  link: {
    background: 'none',
    color: 'inherit',
    gap: 8
  }
};
const S = {
  sm: {
    padding: '8px 12px',
    fontSize: 12
  },
  md: {
    padding: '11px 16px',
    fontSize: 14
  },
  lg: {
    padding: '14px 22px',
    fontSize: 15,
    gap: 12
  }
};
function Button({
  variant = 'ink',
  size = 'md',
  arrow,
  orb,
  count,
  href,
  onClick,
  disabled,
  children,
  style
}) {
  const [h, setH] = React.useState(false);
  const Tag = href ? 'a' : 'button';
  const arrowColor = variant === 'ink' ? 'var(--km-accent-soft)' : variant === 'outline' || variant === 'light' ? 'var(--km-accent)' : 'inherit';
  const sz = variant === 'link' ? {
    padding: '14px 6px',
    fontSize: 15
  } : variant === 'outline' && size === 'md' ? {
    padding: '12px 18px',
    fontSize: 15
  } : S[size];
  const hov = h && !disabled ? variant === 'link' ? {
    gap: 14
  } : variant === 'outline' ? {
    background: 'var(--km-white)'
  } : variant === 'soft' ? {
    background: 'var(--km-ink-a10)'
  } : {
    transform: 'translateY(-1px)'
  } : {};
  return /*#__PURE__*/React.createElement(Tag, {
    href: href,
    onClick: disabled ? undefined : onClick,
    disabled: Tag === 'button' ? disabled : undefined,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      ...base,
      ...V[variant],
      ...sz,
      ...hov,
      opacity: disabled ? .4 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
      ...style
    }
  }, arrow && arrow.startsWith && arrow.startsWith('←') ? /*#__PURE__*/React.createElement("span", null, arrow) : null, children, count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-mono-sm)',
      opacity: .6
    }
  }, count), orb && /*#__PURE__*/React.createElement(__ds_scope.ArrowOrb, {
    size: 22,
    tone: "accent",
    glyph: orb === true ? '→' : orb
  }), arrow && !(arrow.startsWith && arrow.startsWith('←')) && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      color: arrowColor
    }
  }, arrow === true ? '→' : arrow));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function Eyebrow({
  children,
  rule = false,
  tone,
  style
}) {
  return /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      font: 'var(--type-eyebrow)',
      letterSpacing: 'var(--type-eyebrow-ls)',
      textTransform: 'uppercase',
      opacity: rule ? 1 : 'var(--type-eyebrow-opacity)',
      color: tone === 'accent' ? 'var(--km-accent)' : 'inherit',
      ...style
    }
  }, rule && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 1,
      background: 'currentColor',
      display: 'block'
    }
  }), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/content/SectionHeading.jsx
try { (() => {
const SZ = {
  display: ['--type-display'],
  h1: ['--type-h1'],
  h2: ['--type-h2'],
  h3: ['--type-h3']
};
function SectionHeading({
  eyebrow,
  title,
  lead,
  size = 'h2',
  as,
  style
}) {
  const t = SZ[size][0],
    H = as || (size === 'display' || size === 'h1' ? 'h1' : size);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
      ...style
    }
  }, eyebrow && /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, null, eyebrow), /*#__PURE__*/React.createElement(H, {
    style: {
      margin: 0,
      fontWeight: 500,
      fontSize: `var(${t}-size)`,
      lineHeight: `var(${t}-lh)`,
      letterSpacing: `var(${t}-ls)`,
      textWrap: 'balance'
    }
  }, title), lead && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '2vh 0 0',
      fontSize: 'var(--type-lead-size)',
      lineHeight: 'var(--type-lead-lh)',
      opacity: 'var(--type-lead-opacity)',
      maxWidth: '38ch',
      textWrap: 'pretty'
    }
  }, lead));
}
function Em({
  children,
  tone = 'muted'
}) {
  const color = tone === 'accent' ? 'var(--km-accent)' : 'var(--em-muted)';
  return /*#__PURE__*/React.createElement("em", {
    style: {
      fontStyle: 'normal',
      fontWeight: 'inherit',
      color
    }
  }, children);
}
Object.assign(__ds_scope, { SectionHeading, Em });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/core/StatusDot.jsx
try { (() => {
function StatusDot({
  tone = 'success',
  children,
  style
}) {
  const c = tone === 'success' ? 'var(--km-success)' : tone === 'warning' ? 'var(--km-warning)' : 'var(--km-signal)';
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      font: '500 12px/1 var(--font-mono)',
      letterSpacing: '.02em',
      opacity: .72,
      whiteSpace: 'nowrap',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      width: 7,
      height: 7,
      flex: 'none',
      display: 'block'
    }
  }, tone === 'success' && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: '50%',
      background: c,
      animation: 'km-pulse 2.2s var(--ease-pulse) infinite'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: '50%',
      background: c,
      boxShadow: tone === 'signal' ? 'var(--ring-signal)' : 'none'
    }
  })), children);
}
Object.assign(__ds_scope, { StatusDot });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatusDot.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
const V = {
  mono: {
    padding: '6px 10px',
    background: 'var(--surface-tag)',
    color: 'inherit',
    font: 'var(--type-mono-sm)'
  },
  accent: {
    padding: '7px 11px',
    background: 'var(--km-accent)',
    color: '#fff',
    font: 'var(--type-mono-sm)'
  },
  glass: {
    padding: '8px 12px',
    background: 'var(--surface-glass)',
    color: 'var(--km-ink)',
    font: '500 12px/1 var(--font-mono)',
    backdropFilter: 'blur(6px)'
  },
  outline: {
    padding: '7px 11px',
    background: 'transparent',
    color: 'var(--km-ink)',
    font: '500 12px/1 var(--font-mono)',
    boxShadow: 'inset 0 0 0 1px var(--km-ink-a16)'
  },
  chip: {
    height: 34,
    padding: '0 13px',
    background: 'var(--km-ink)',
    color: 'var(--km-paper)',
    font: '600 11px/1 var(--font-mono)',
    letterSpacing: '.06em'
  }
};
function Tag({
  variant = 'mono',
  lamp,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      borderRadius: 'var(--radius-pill)',
      whiteSpace: 'nowrap',
      ...V[variant],
      ...style
    }
  }, (lamp || variant === 'chip') && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: 'var(--km-accent)',
      display: 'block',
      opacity: lamp === 'on' ? 1 : .45
    }
  }), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/cards/ExpertiseCard.jsx
try { (() => {
function ExpertiseCard({
  n,
  mono,
  title,
  desc,
  tags = [],
  used = [],
  active,
  minHeight = 300,
  style
}) {
  const [h, setH] = React.useState(false),
    on = active || h;
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      minHeight,
      padding: 26,
      borderRadius: 'var(--radius-card)',
      background: on ? 'var(--surface-card)' : 'var(--surface-card-rest)',
      boxShadow: on ? 'var(--shadow-card-hover)' : 'none',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: 28,
      transition: 'background-color .35s, box-shadow .35s',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 12px/1 var(--font-mono)',
      opacity: .6
    }
  }, n), mono && /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    variant: "chip",
    lamp: on ? 'on' : true
  }, mono)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      maxWidth: '56ch'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 500,
      fontSize: 'var(--type-card-title-size)',
      letterSpacing: 'var(--type-card-title-ls)',
      lineHeight: 'var(--type-card-title-lh)'
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      lineHeight: 1.55,
      opacity: .74
    }
  }, desc), tags.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6,
      marginTop: 6
    }
  }, tags.map(t => /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    key: t
  }, t))), used.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: '10px 14px',
      marginTop: 10,
      paddingTop: 18,
      borderTop: '1px solid var(--km-ink-a10)',
      font: '500 12px/1 var(--font-mono)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .55
    }
  }, "Used in \u2192"), used.map(u => /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    key: u,
    variant: "outline",
    style: {
      margin: '-7px -4px'
    }
  }, u)))));
}
Object.assign(__ds_scope, { ExpertiseCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/ExpertiseCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/ProjectCard.jsx
try { (() => {
function ProjectCard({
  img,
  n,
  title,
  year,
  metric,
  metricLabel,
  onClick,
  width = 520,
  height = 420,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: {
      position: 'relative',
      width,
      height,
      maxWidth: '100%',
      borderRadius: 'var(--radius-card)',
      overflow: 'hidden',
      background: 'var(--surface-placeholder)',
      cursor: onClick ? 'pointer' : 'default',
      boxShadow: 'var(--shadow-project)',
      ...style
    }
  }, img && /*#__PURE__*/React.createElement("img", {
    src: img,
    alt: title,
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--scrim-media)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 22,
      right: 22,
      top: 20,
      display: 'flex',
      justifyContent: 'space-between',
      font: '500 12px/1 var(--font-mono)',
      color: 'var(--km-paper)'
    }
  }, /*#__PURE__*/React.createElement("span", null, n, " \u2014 ", title), /*#__PURE__*/React.createElement("span", null, year)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 22,
      right: 22,
      bottom: 20,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: 12,
      color: 'var(--km-paper)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 500,
      fontSize: 'clamp(24px,2.2vw,36px)',
      letterSpacing: '-.035em',
      lineHeight: 1
    }
  }, metric), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 12px/1.4 var(--font-mono)',
      opacity: .82
    }
  }, metricLabel)), /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    variant: "glass"
  }, "Deep dive \u2192")));
}
Object.assign(__ds_scope, { ProjectCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/ProjectCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/ProjectRow.jsx
try { (() => {
function ProjectRow({
  n,
  title,
  client,
  desc,
  year,
  kind,
  featured = true,
  onClick,
  style
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border-rule)',
      padding: '6px 0',
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      border: 'none',
      cursor: featured ? 'pointer' : 'default',
      fontFamily: 'inherit',
      color: 'inherit',
      textAlign: 'left',
      width: '100%',
      display: 'grid',
      gridTemplateColumns: '48px minmax(0,1.1fr) minmax(0,1.5fr) 124px 64px 44px',
      gap: '2vw',
      alignItems: 'center',
      padding: featured ? '22px 16px' : '20px 16px',
      borderRadius: 'var(--radius-row)',
      background: featured && h ? 'var(--km-white)' : 'rgba(255,255,255,0)',
      transition: 'background-color .3s'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 12px/1 var(--font-mono)',
      opacity: .6
    }
  }, n), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 500,
      fontSize: featured ? 'clamp(24px,2.3vw,38px)' : 'clamp(20px,1.7vw,28px)',
      letterSpacing: featured ? '-.04em' : '-.03em',
      lineHeight: featured ? 1 : 1.05
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      lineHeight: 1.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, client), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .72
    }
  }, " \u2014 ", desc)), /*#__PURE__*/React.createElement("span", {
    style: {
      justifySelf: 'start'
    }
  }, featured ? /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    variant: "accent"
  }, "Deep dive") : kind && /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    style: {
      padding: '7px 11px'
    }
  }, kind)), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 12px/1 var(--font-mono)',
      opacity: .6
    }
  }, year), featured ? /*#__PURE__*/React.createElement(__ds_scope.ArrowOrb, null) : /*#__PURE__*/React.createElement("span", null)));
}
Object.assign(__ds_scope, { ProjectRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/ProjectRow.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavBar.jsx
try { (() => {
const resolve = t => (t && 'current' in t ? t.current : t) || null;

/* Hide on scroll-down, reveal on scroll-up. Always shown near the top. */
function useAutoHide(enabled, target) {
  const [hidden, setHidden] = React.useState(false);
  React.useEffect(() => {
    if (!enabled) {
      setHidden(false);
      return;
    }
    const el = resolve(target),
      src = el || window;
    const getY = () => el ? el.scrollTop : window.scrollY;
    let last = getY(),
      acc = 0,
      raf = 0;
    const tick = () => {
      raf = 0;
      const y = getY(),
        d = y - last;
      last = y;
      if (y < 80) {
        acc = 0;
        setHidden(false);
        return;
      }
      acc = Math.sign(d) === Math.sign(acc) ? acc + d : d;
      if (acc > 12) setHidden(true);else if (acc < -8) setHidden(false);
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    src.addEventListener('scroll', on, {
      passive: true
    });
    return () => {
      src.removeEventListener('scroll', on);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled, target]);
  return hidden;
}

/* Section theme: any element with data-nav-theme="light|dark" declares the navbar it needs.
   An IntersectionObserver watches a 1px line at the navbar's vertical centre; the innermost
   intersecting section wins. New sections (route changes) are picked up via MutationObserver. */
function useSectionTheme(enabled, target, headerRef, fallback) {
  const [theme, setTheme] = React.useState(fallback);
  React.useEffect(() => {
    if (!enabled || typeof IntersectionObserver === 'undefined') {
      setTheme(fallback);
      return;
    }
    const root = resolve(target),
      scope = root || document;
    const live = new Set();
    let io,
      mo,
      seen = new WeakSet(),
      frame = 0;
    const pick = () => {
      let best = null;
      live.forEach(el => {
        if (!best || best.contains(el) || best.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING && !el.contains(best)) best = el;
      });
      setTheme(best ? best.getAttribute('data-nav-theme') : fallback);
    };
    const build = () => {
      if (io) io.disconnect();
      live.clear();
      seen = new WeakSet();
      const h = headerRef.current ? headerRef.current.offsetHeight : 72;
      const vh = root ? root.clientHeight : window.innerHeight;
      const line = Math.max(0, Math.round(h / 2));
      io = new IntersectionObserver(entries => {
        entries.forEach(e => e.isIntersecting ? live.add(e.target) : live.delete(e.target));
        pick();
      }, {
        root,
        rootMargin: `-${line}px 0px -${Math.max(0, vh - line - 1)}px 0px`,
        threshold: 0
      });
      scan();
    };
    const scan = () => {
      scope.querySelectorAll('[data-nav-theme]').forEach(el => {
        if (!seen.has(el)) {
          seen.add(el);
          io.observe(el);
        }
      });
    };
    build();
    mo = new MutationObserver(() => {
      if (!frame) frame = requestAnimationFrame(() => {
        frame = 0;
        live.forEach(el => {
          if (!el.isConnected) live.delete(el);
        });
        scan();
        pick();
      });
    });
    mo.observe(root || document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-nav-theme']
    });
    const onResize = () => build();
    window.addEventListener('resize', onResize);
    return () => {
      io && io.disconnect();
      mo.disconnect();
      window.removeEventListener('resize', onResize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled, target, fallback]);
  return theme;
}

/* Full-width backdrop: stacked backdrop-blur layers with staggered masks, so blur strength
   tapers to zero below the bar — no hard bottom edge, no solid fill. Sits behind content (z -1). */
const BLUR_STEPS = [[1, 100], [2, 82], [4, 66], [8, 50]];
function Backdrop({
  theme
}) {
  const wash = theme === 'dark' ? 'rgba(7,11,22,.28)' : 'rgba(238,241,247,.34)';
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: 'calc(100% + 36px)',
      pointerEvents: 'none',
      zIndex: -1
    }
  }, BLUR_STEPS.map(([b, end]) => {
    const mask = `linear-gradient(to bottom, #000 0%, #000 ${end * 0.45}%, transparent ${end}%)`;
    return /*#__PURE__*/React.createElement("div", {
      key: b,
      style: {
        position: 'absolute',
        inset: 0,
        backdropFilter: `blur(${b}px)`,
        WebkitBackdropFilter: `blur(${b}px)`,
        maskImage: mask,
        WebkitMaskImage: mask
      }
    });
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: `linear-gradient(to bottom, ${wash} 0%, transparent 100%)`,
      transition: 'background .45s var(--ease-out)'
    }
  }));
}
function NavBar({
  name,
  links = ['Home', 'About', 'Projects', 'Experience', 'Stack', 'Journey', 'Writing'],
  active,
  onNavigate,
  clock = 'Oslo 14:02',
  cta = "Let's build",
  onCta,
  position = 'static',
  hideOnScroll = true,
  backdrop = true,
  adaptive = true,
  theme: forced,
  defaultTheme = 'light',
  scrollTarget,
  style
}) {
  const floating = position !== 'static';
  const ref = React.useRef(null);
  const hidden = useAutoHide(floating && hideOnScroll, scrollTarget);
  const detected = useSectionTheme(floating && adaptive && !forced, scrollTarget, ref, defaultTheme);
  const theme = forced || (floating && adaptive ? detected : null);
  const fg = theme === 'dark' ? 'var(--km-paper)' : theme === 'light' ? 'var(--km-ink)' : undefined;
  const shell = floating ? {
    position,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 60,
    padding: '16px 3vw',
    transform: hidden ? 'translateY(calc(-100% - 40px))' : 'translateY(0)',
    transition: 'transform .55s var(--ease-out), color .45s var(--ease-out)',
    willChange: 'transform'
  } : {};
  return /*#__PURE__*/React.createElement("header", {
    ref: ref,
    "data-hidden": hidden || undefined,
    "data-theme": theme || undefined,
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      alignItems: 'center',
      gap: 16,
      isolation: 'isolate',
      color: fg,
      ...shell,
      ...style
    }
  }, floating && backdrop && /*#__PURE__*/React.createElement(Backdrop, {
    theme: theme
  }), /*#__PURE__*/React.createElement(__ds_scope.BrandMark, {
    name: name
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      position: 'relative',
      display: 'flex',
      gap: 4,
      padding: 5,
      borderRadius: 'var(--radius-pill)',
      background: 'color-mix(in srgb,currentColor 6%,transparent)',
      border: '1px solid color-mix(in srgb,currentColor 10%,transparent)',
      fontSize: 14,
      fontWeight: 500,
      transition: 'background-color .45s var(--ease-out), border-color .45s var(--ease-out)'
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: '#' + l.toLowerCase(),
    onClick: e => {
      if (onNavigate) {
        e.preventDefault();
        onNavigate(l);
      }
    },
    style: {
      padding: '8px 13px',
      whiteSpace: 'nowrap',
      borderRadius: 'var(--radius-pill)',
      color: 'inherit',
      background: l === active ? 'color-mix(in srgb,currentColor 12%,transparent)' : 'transparent',
      transition: 'background-color .35s var(--ease-out), color .45s var(--ease-out)'
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      justifySelf: 'end',
      display: 'flex',
      alignItems: 'center',
      gap: 18
    }
  }, clock && /*#__PURE__*/React.createElement(__ds_scope.StatusDot, {
    tone: "signal",
    style: {
      opacity: .7
    }
  }, clock), cta && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "accent",
    onClick: onCta,
    style: {
      padding: '11px 18px'
    }
  }, cta)));
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SegmentedLens.jsx
try { (() => {
function SegmentedLens({
  items,
  value,
  onChange,
  style
}) {
  const refs = React.useRef([]);
  const [box, setBox] = React.useState(null);
  const idx = Math.max(0, items.findIndex(i => (i.value ?? i) === value));
  React.useLayoutEffect(() => {
    const el = refs.current[idx];
    if (el) setBox({
      x: el.offsetLeft,
      y: el.offsetTop,
      w: el.offsetWidth,
      h: el.offsetHeight
    });
  }, [idx, items.length]);
  const ease = 'var(--dur-lens) var(--ease-out)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'inline-flex',
      gap: 4,
      padding: 4,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--surface-soft)',
      font: '500 12px/1 var(--font-mono)',
      ...style
    }
  }, box && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: box.w,
      height: box.h,
      transform: `translate(${box.x}px,${box.y}px)`,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--km-ink)',
      boxShadow: 'var(--shadow-lens)',
      transition: `transform ${ease}, width ${ease}, height ${ease}`,
      pointerEvents: 'none'
    }
  }), items.map((it, i) => {
    const v = it.value ?? it,
      l = it.label ?? it;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      ref: el => refs.current[i] = el,
      onClick: () => onChange && onChange(v),
      style: {
        position: 'relative',
        border: 'none',
        cursor: 'pointer',
        padding: '9px 12px',
        borderRadius: 'var(--radius-pill)',
        background: 'transparent',
        color: i === idx ? 'var(--km-paper)' : 'var(--km-ink)',
        font: 'inherit',
        transition: 'color .35s'
      }
    }, l);
  }));
}
Object.assign(__ds_scope, { SegmentedLens });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SegmentedLens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/CaseStudy.jsx
try { (() => {
const bar = {
  position: 'sticky',
  top: 0,
  zIndex: 2,
  display: 'grid',
  gridTemplateColumns: '1fr auto 1fr',
  alignItems: 'center',
  gap: 16,
  padding: '16px 3vw',
  background: 'var(--surface-glass)',
  backdropFilter: 'var(--blur-bar)',
  borderBottom: '1px solid var(--border-hairline)'
};
const row = {
  padding: '12vh 3vw 0',
  display: 'grid',
  gridTemplateColumns: 'repeat(12,minmax(0,1fr))',
  columnGap: '2vw'
};
function CaseStudy({
  p,
  next,
  onBack,
  onNext
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: bar
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "soft",
    arrow: "\u2190 ",
    onClick: onBack,
    style: {
      justifySelf: 'start'
    }
  }, "All work"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 12px/1 var(--font-mono)',
      opacity: .65
    }
  }, "Project ", p.n, " / 05 \u2014 ", p.client), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    arrow: true,
    onClick: onNext,
    style: {
      justifySelf: 'end'
    }
  }, "Next: ", next.title)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '3vh 3vw 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '70vh',
      borderRadius: 'var(--radius-card)',
      overflow: 'hidden',
      background: 'var(--surface-placeholder)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: p.img,
    alt: p.title,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...row,
      paddingTop: '9vh',
      alignItems: 'end'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / span 8',
      display: 'flex',
      flexDirection: 'column',
      gap: 22
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, null, p.client, " \u2014 ", p.year), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontWeight: 500,
      fontSize: 'var(--type-h1-size)',
      lineHeight: 'var(--type-h1-lh)',
      letterSpacing: 'var(--type-h1-ls)'
    }
  }, p.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: '40ch',
      fontSize: 'clamp(20px,1.7vw,26px)',
      lineHeight: 1.4,
      letterSpacing: '-.015em',
      opacity: .8
    }
  }, p.desc, ".")), /*#__PURE__*/React.createElement(__ds_scope.FactList, {
    variant: "meta",
    style: {
      gridColumn: '10 / span 3'
    },
    rows: [{
      k: 'Role',
      v: p.role
    }, {
      k: 'Team',
      v: p.team
    }, {
      k: 'Timeline',
      v: p.year
    }, {
      k: 'Stack',
      v: 'Python · PyTorch'
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: row
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      gridColumn: '1 / span 3'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, null, "02 \u2014 Approach")), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '4 / span 9',
      display: 'grid',
      gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
      gap: '2vw'
    }
  }, [['Ground it', 'Retrieval over policy docs, not prompt memory.'], ['Give it tools', 'Typed actions with dry-run and audit trail.'], ['Gate it', 'Every release passes an offline eval suite.']].map(([t, d], i) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      paddingTop: 18,
      borderTop: '2px solid var(--km-ink)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 12px/1 var(--font-mono)',
      color: 'var(--km-accent-deep)'
    }
  }, "0", i + 1), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      fontSize: 20,
      letterSpacing: '-.02em'
    }
  }, t), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      lineHeight: 1.6,
      opacity: .74
    }
  }, d))))), /*#__PURE__*/React.createElement("div", {
    "data-nav-theme": "dark",
    style: {
      margin: '12vh 3vw 0',
      padding: '6vh 3vw',
      borderRadius: 'var(--radius-card)',
      background: 'var(--km-night)',
      color: 'var(--km-paper)',
      display: 'flex',
      flexDirection: 'column',
      gap: '6vh'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, null, "04 \u2014 Outcome"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
      gap: '2vw'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Stat, {
    value: p.metric,
    label: p.metricLabel
  }), /*#__PURE__*/React.createElement(__ds_scope.Stat, {
    value: "\u221241%",
    label: "median handle time"
  }), /*#__PURE__*/React.createElement(__ds_scope.Stat, {
    value: "0",
    label: "policy violations after launch"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14vh 3vw 10vh'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onNext,
    style: {
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'inherit',
      width: '100%',
      background: 'none',
      color: 'inherit',
      textAlign: 'left',
      padding: '5vh 0',
      borderTop: '1px solid var(--km-ink-a16)',
      borderBottom: '1px solid var(--km-ink-a16)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, null, "Next project"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 500,
      fontSize: 'var(--type-mega-size)',
      letterSpacing: 'var(--type-mega-ls)',
      lineHeight: 'var(--type-mega-lh)'
    }
  }, next.title)), /*#__PURE__*/React.createElement(__ds_scope.ArrowOrb, {
    size: 72,
    tone: "accent"
  }))));
}
Object.assign(__ds_scope, { CaseStudy });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/CaseStudy.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Home.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const wrap = {
  padding: '0 3vw',
  display: 'grid',
  gridTemplateColumns: 'repeat(12,minmax(0,1fr))',
  columnGap: '2vw'
};
function Home({
  projects,
  onOpen,
  onIndex
}) {
  const [pick, setPick] = React.useState('01');
  const p = projects.find(x => x.n === pick);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      minHeight: '100vh',
      padding: '20vh 3vw 6vh',
      background: 'radial-gradient(55% 45% at 72% 38%,var(--km-accent-wash),transparent 70%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: '6vh'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '4vh'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, {
    rule: true
  }, "Kushan Manahara \u2014 ML & software engineer"), /*#__PURE__*/React.createElement(__ds_scope.StatusDot, {
    style: {
      marginLeft: 'auto'
    }
  }, "Available for new work \xB7 Oslo 14:02")), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      maxWidth: '16ch',
      fontWeight: 500,
      fontSize: 'var(--type-display-size)',
      lineHeight: 'var(--type-display-lh)',
      letterSpacing: 'var(--type-display-ls)',
      textWrap: 'balance'
    }
  }, "Turning ", /*#__PURE__*/React.createElement(__ds_scope.Em, null, "models"), " into systems people can ", /*#__PURE__*/React.createElement(__ds_scope.Em, null, "rely on"), ".")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: '4vw',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "lg",
    orb: "\u2193",
    onClick: () => window.scrollTo({
      top: document.getElementById('work').offsetTop - 40,
      behavior: 'smooth'
    })
  }, "Selected work"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "link",
    arrow: true
  }, "Get in touch")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: '44ch',
      fontSize: 17,
      lineHeight: 1.55,
      opacity: .72
    }
  }, "Ten years across ML research, backend systems and LLM products. I design the model, the pipeline around it, and the evaluation that proves it works."))), /*#__PURE__*/React.createElement("section", {
    style: {
      ...wrap,
      padding: '22vh 3vw 20vh'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / span 5',
      height: '74vh',
      borderRadius: 'var(--radius-media)',
      overflow: 'hidden',
      position: 'relative',
      background: '#E6E5DF'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://i.pravatar.cc/900?img=68",
    alt: "Kushan Manahara",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '7 / span 6',
      display: 'flex',
      flexDirection: 'column',
      gap: '7vh',
      paddingTop: '2vh'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 22
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, null, "About"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontWeight: 500,
      fontSize: 'var(--type-statement-size)',
      lineHeight: 'var(--type-statement-lh)',
      letterSpacing: 'var(--type-statement-ls)'
    }
  }, "I'm Kushan, a machine learning engineer in Oslo. I started in speech research, spent three years on streaming backends at a bank, and now lead the team building LLM agents at Kestrel."), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    arrow: true,
    style: {
      alignSelf: 'flex-start'
    }
  }, "More about me")), /*#__PURE__*/React.createElement(__ds_scope.FactList, {
    rows: [{
      k: 'Now',
      v: 'Lead ML engineer, Kestrel AI'
    }, {
      k: 'Before',
      v: 'Norrbank · NTNU Speech Lab'
    }, {
      k: 'Based',
      v: 'Oslo, Norway'
    }, {
      k: 'Teaching',
      v: 'Evening course on ML systems'
    }]
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      ...wrap,
      padding: '20vh 3vw',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / span 4',
      position: 'sticky',
      top: '14vh',
      display: 'flex',
      flexDirection: 'column',
      gap: '4vh'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.SectionHeading, {
    eyebrow: "Expertise",
    title: /*#__PURE__*/React.createElement(React.Fragment, null, "What I ", /*#__PURE__*/React.createElement(__ds_scope.Em, null, "build.")),
    lead: "Most projects touch three or four of these at once. The model is rarely the hard part."
  }), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "outline",
    arrow: true,
    style: {
      alignSelf: 'flex-start'
    }
  }, "See it in the projects")), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '6 / span 7',
      display: 'grid',
      gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.ExpertiseCard, {
    style: {
      gridColumn: 'span 2'
    },
    n: "01",
    mono: "LLM",
    title: "LLM agents & retrieval",
    desc: "Grounded agents with tools, retrieval and an eval gate that decides what ships.",
    tags: ['LangGraph', 'pgvector', 'vLLM'],
    used: ['Relay']
  }), /*#__PURE__*/React.createElement(__ds_scope.ExpertiseCard, {
    n: "02",
    mono: "EVAL",
    title: "Evaluation",
    desc: "Offline suites and online checks that turn 'seems better' into a number.",
    tags: ['Sounding', 'pytest'],
    used: ['Sounding']
  }), /*#__PURE__*/React.createElement(__ds_scope.ExpertiseCard, {
    n: "03",
    mono: "MLOPS",
    title: "Serving & platform",
    desc: "GPU serving, batching and rollouts with a rollback at every step.",
    tags: ['Ray', 'Kubernetes'],
    used: ['Foundry']
  }))), /*#__PURE__*/React.createElement("section", {
    id: "work",
    style: {
      padding: '14vh 3vw 20vh'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 24,
      marginBottom: '7vh'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.SectionHeading, {
    eyebrow: "Featured projects",
    title: /*#__PURE__*/React.createElement(React.Fragment, null, "Five systems, ", /*#__PURE__*/React.createElement(__ds_scope.Em, null, "in production."))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.SegmentedLens, {
    items: projects.map(x => x.n),
    value: pick,
    onChange: setPick
  }), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    count: projects.length,
    arrow: "\u2197",
    onClick: onIndex
  }, "All projects"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,7fr) minmax(0,5fr)',
      gap: '2vw',
      alignItems: 'end'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.ProjectCard, _extends({}, p, {
    width: "100%",
    height: "60vh",
    onClick: () => onOpen(p)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 500,
      fontSize: 'clamp(28px,2.6vw,44px)',
      letterSpacing: '-.045em',
      lineHeight: 1
    }
  }, p.title), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 12px/1.6 var(--font-mono)',
      opacity: .6
    }
  }, p.role, " \xB7 ", p.team, /*#__PURE__*/React.createElement("br", null), p.client, ", ", p.year), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    arrow: true,
    onClick: () => onOpen(p),
    style: {
      alignSelf: 'flex-start'
    }
  }, "Open deep dive")))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '14vh 3vw 20vh'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.SectionHeading, {
    eyebrow: "References",
    title: /*#__PURE__*/React.createElement(React.Fragment, null, "In their ", /*#__PURE__*/React.createElement(__ds_scope.Em, null, "words.")),
    style: {
      marginBottom: '7vh'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.QuoteCard, {
    company: "Kestrel AI",
    quote: "Turned our agent demo into something we could sell to enterprise customers. The eval gate he built still decides what ships.",
    who: "Maya Lindqvist",
    role: "VP Engineering",
    avatar: "https://i.pravatar.cc/100?img=47"
  }), /*#__PURE__*/React.createElement(__ds_scope.QuoteCard, {
    tone: "ink",
    company: "Norrbank",
    quote: "Tripwire went live inside a 20 ms budget and caught fraud our rules missed.",
    who: "Erik Dahl",
    role: "Head of Payments",
    avatar: "https://i.pravatar.cc/100?img=12"
  }), /*#__PURE__*/React.createElement(__ds_scope.QuoteCard, {
    tone: "accent",
    company: "Stackhouse",
    quote: "We had Sounding running in CI within a week.",
    who: "Priya Nair",
    role: "Staff Engineer",
    avatar: "https://i.pravatar.cc/100?img=32"
  }))));
}
Object.assign(__ds_scope, { Home });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/ProjectsIndex.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const bar = {
  position: 'sticky',
  top: 0,
  zIndex: 2,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 16,
  padding: '16px 3vw',
  background: 'var(--surface-glass)',
  backdropFilter: 'var(--blur-bar)',
  borderBottom: '1px solid var(--border-hairline)'
};
function ProjectsIndex({
  projects,
  onBack,
  onOpen
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: bar
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "soft",
    arrow: "\u2190 ",
    onClick: onBack
  }, "Back to the orbit"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 12px/1 var(--font-mono)',
      opacity: .65
    }
  }, "Projects \u2014 ", projects.length + 2, " entries")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12vh 3vw 7vh',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: '4vw',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.SectionHeading, {
    size: "h1",
    title: /*#__PURE__*/React.createElement(React.Fragment, null, "Every system, ", /*#__PURE__*/React.createElement(__ds_scope.Em, null, "one list."))
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: '40ch',
      fontSize: 17,
      lineHeight: 1.55,
      opacity: .72
    }
  }, "Five projects with full write-ups, plus the smaller models, pipelines and teaching around them.")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 3vw 16vh',
      display: 'flex',
      flexDirection: 'column',
      gap: '9vh'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: '1px solid var(--border-rule)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingBottom: 14,
      font: 'var(--type-eyebrow)',
      letterSpacing: '.06em',
      textTransform: 'uppercase',
      opacity: .6
    }
  }, /*#__PURE__*/React.createElement("span", null, "Featured projects"), /*#__PURE__*/React.createElement("span", null, "05")), projects.map(p => /*#__PURE__*/React.createElement(__ds_scope.ProjectRow, _extends({
    key: p.n
  }, p, {
    onClick: () => onOpen(p)
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: '1px solid var(--border-rule)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingBottom: 14,
      font: 'var(--type-eyebrow)',
      letterSpacing: '.06em',
      textTransform: 'uppercase',
      opacity: .6
    }
  }, /*#__PURE__*/React.createElement("span", null, "More work"), /*#__PURE__*/React.createElement("span", null, "02")), /*#__PURE__*/React.createElement(__ds_scope.ProjectRow, {
    featured: false,
    n: "06",
    title: "Speech VAD",
    client: "Open source",
    desc: "Tiny voice activity detector",
    kind: "Model",
    year: "2023"
  }), /*#__PURE__*/React.createElement(__ds_scope.ProjectRow, {
    featured: false,
    n: "07",
    title: "ML Systems 101",
    client: "Evening course",
    desc: "Twelve weeks, from notebook to service",
    kind: "Teaching",
    year: "2025"
  }))));
}
Object.assign(__ds_scope, { ProjectsIndex });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/ProjectsIndex.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/data.jsx
try { (() => {
const PROJECTS = [{
  n: '01',
  title: 'Relay',
  client: 'Kestrel AI',
  desc: 'Support agent, demo to production',
  year: '2025',
  img: 'https://picsum.photos/seed/okoro-relay/1400/1100',
  metric: '38%',
  metricLabel: 'tickets resolved end-to-end',
  role: 'Tech lead',
  team: '5 engineers'
}, {
  n: '02',
  title: 'Sounding',
  client: 'Open source',
  desc: 'Evaluation toolkit for speech and LLMs',
  year: '2024',
  img: 'https://picsum.photos/seed/okoro-sounding/1400/1100',
  metric: '3.1k stars',
  metricLabel: 'on GitHub',
  role: 'Creator, maintainer',
  team: '52 contributors'
}, {
  n: '03',
  title: 'Foundry',
  client: 'Kestrel AI',
  desc: 'GPU serving platform migration',
  year: '2024',
  img: 'https://picsum.photos/seed/okoro-foundry/1400/1100',
  metric: '−58%',
  metricLabel: 'GPU cost per 1k requests',
  role: 'ML platform engineer',
  team: '4 engineers'
}, {
  n: '04',
  title: 'Tripwire',
  client: 'Norrbank',
  desc: 'Real-time fraud scoring',
  year: '2022',
  img: 'https://picsum.photos/seed/okoro-tripwire/1400/1100',
  metric: '12 ms',
  metricLabel: 'p99 fraud scoring',
  role: 'Software → ML engineer',
  team: '6 engineers'
}, {
  n: '05',
  title: 'Ohùn',
  client: 'NTNU Speech Lab',
  desc: 'Low-resource Yoruba ASR',
  year: '2019',
  img: 'https://picsum.photos/seed/okoro-ohun/1400/1100',
  metric: '18.4% WER',
  metricLabel: 'Yoruba ASR',
  role: 'Research assistant',
  team: 'NTNU Speech Lab'
}];
Object.assign(__ds_scope, { PROJECTS });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/data.jsx", error: String((e && e.message) || e) }); }

__ds_ns.ExpertiseCard = __ds_scope.ExpertiseCard;

__ds_ns.ProjectCard = __ds_scope.ProjectCard;

__ds_ns.ProjectRow = __ds_scope.ProjectRow;

__ds_ns.QuoteCard = __ds_scope.QuoteCard;

__ds_ns.ChatWidget = __ds_scope.ChatWidget;

__ds_ns.FactList = __ds_scope.FactList;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.Em = __ds_scope.Em;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.ToolTile = __ds_scope.ToolTile;

__ds_ns.ArrowOrb = __ds_scope.ArrowOrb;

__ds_ns.BrandMark = __ds_scope.BrandMark;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.StatusDot = __ds_scope.StatusDot;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.NavBar = __ds_scope.NavBar;

__ds_ns.SegmentedLens = __ds_scope.SegmentedLens;

__ds_ns.CaseStudy = __ds_scope.CaseStudy;

__ds_ns.Home = __ds_scope.Home;

__ds_ns.ProjectsIndex = __ds_scope.ProjectsIndex;

__ds_ns.PROJECTS = __ds_scope.PROJECTS;

})();
