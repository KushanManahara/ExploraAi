Floating portfolio chat: an ink launcher pill in the bottom-right corner that morphs into a 380×560 glass panel. Each reply goes through a thinking shimmer, then typing dots, then streams in word by word with an accent caret.
```jsx
<ChatWidget />                                   // fixed, bottom-right
<ChatWidget position="absolute" defaultOpen />   // inside a positioned demo box
<ChatWidget getResponse={async (q, history) => (await fetch('/api/chat', {method:'POST', body:q})).text()} />
```
- **Open/close:** the panel opens out of the launcher using `clip-path` + scale from the bottom-right (.55s house curve), and the header follows .12s later. Closing reverses it faster (.42s). **– Hide** collapses to the pill and keeps the conversation. **× Close** collapses and resets to the greeting (`onClose`). Esc hides it.
- **States:** the header status line reads Online (one word, no subtitle) → Listening (visitor typing) → Thinking → Typing → Responding. The lamp turns green when idle and accent while busy.
- **Replies:** `getResponse` if given, else `window.claude.complete` (in Kushan's voice), else built-in canned answers.
- Header mark and launcher use the Lucide `message-circle` glyph (inline, ISC).
- Panel uses a 6-layer depth shadow that deepens as it opens (.7s), plus a soft blurred ink halo cast behind it to pull focus without dimming the page. On focus, an accent border beam (a conic highlight masked to a 1.5px ring, one lap every 2.6s) travels around the composer, over a faint glow. Header actions are bare glyphs (60% → 100% on hover). The avatar is a round ink disc.
- **Send transition:** a fixed-position copy of the message leaves the composer (38% across) along an S-curve: rising, sweeping right through the middle, then straight up into its bubble from below. It is a cubic Bézier (in-out cubic easing) that banks along the tangent and morphs from a white pill to the ink bubble with a soft accent lift shadow. 420–620ms, scaled by distance. The real bubble is swapped in on the last frame. Reduced motion uses a 160ms fade.
- Quick-reply pills show until the first question. Reduced motion collapses all animation.
- Copy follows the brand voice: first person, plain, no exclamation marks, no emoji.
