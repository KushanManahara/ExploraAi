Pill button — every action on the site is a 99px pill; ink is the default, accent is reserved for the single primary CTA.
```jsx
<Button arrow>More about me</Button>
<Button variant="accent">Let's build</Button>
<Button variant="outline" arrow>See it in the projects</Button>
<Button size="lg" orb="↓">Selected work</Button>
<Button variant="soft" arrow="← ">All work</Button>
<Button variant="link" arrow>Get in touch</Button>
```
- Arrow on ink buttons is tinted `--km-accent-soft`; on outline/light it is full accent.
- Copy is sentence case, 2–4 words, no trailing period.