export interface ArrowOrbProps {
  /** Unicode arrow: → ↓ ↗ ← */
  glyph?: string;
  /** 22 (inside buttons), 44 (list rows), 72 (next-project). */
  size?: number;
  tone?: 'ink' | 'accent' | 'paper';
  style?: React.CSSProperties;
}
export declare function ArrowOrb(props: ArrowOrbProps): JSX.Element;