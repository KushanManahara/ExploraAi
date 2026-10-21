Mono segmented control with a dark glass "lens" that slides to the active item (project picker 01–05).
```jsx
const [v, setV] = React.useState('01');
<SegmentedLens items={['01','02','03','04','05']} value={v} onChange={setV} />
```