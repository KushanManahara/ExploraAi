export interface SectionHeadingProps {
  eyebrow?: React.ReactNode;
  /** Use <Em> for the two-tone emphasis tail: <>What I <Em>build.</Em></> */
  title: React.ReactNode;
  lead?: React.ReactNode;
  size?: 'display' | 'h1' | 'h2' | 'h3';
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
}
export declare function SectionHeading(props: SectionHeadingProps): JSX.Element;
/** Emphasis tail — same face and weight, ink at 40% (muted) or accent. No italics. */
export declare function Em(props: { children: React.ReactNode; tone?: 'muted' | 'accent' }): JSX.Element;