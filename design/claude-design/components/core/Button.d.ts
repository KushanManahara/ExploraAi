export interface ButtonProps {
  /** ink = default primary (dark pill) · accent = the one CTA ("Let's build") · soft = overlay nav · outline = secondary · light = on night panels · link = text + arrow */
  variant?: 'ink' | 'accent' | 'soft' | 'outline' | 'light' | 'link';
  size?: 'sm' | 'md' | 'lg';
  /** true → "→"; or pass a glyph ("↗", "↓"). A glyph starting with "←" renders before the label. */
  arrow?: boolean | string;
  /** Trailing 22px accent ArrowOrb (hero "Selected work"). */
  orb?: boolean | string;
  /** Small mono count after the label ("All projects 11"). */
  count?: string | number;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
/** @startingPoint section="Core" subtitle="Pill buttons in six variants" viewport="700x420" */
export declare function Button(props: ButtonProps): JSX.Element;