export interface NavBarProps {
  name?: string;
  links?: string[];
  active?: string;
  onNavigate?: (link: string) => void;
  /** Mono clock string next to the signal dot; null hides it. */
  clock?: string | null;
  cta?: string | null;
  onCta?: () => void;
  /** 'static' = inline row (no behavior). 'fixed' (page) or 'sticky' (inside a scroll box) enables the floating header. */
  position?: 'static' | 'fixed' | 'sticky';
  /** Floating only: hide on scroll-down, reveal on scroll-up, always shown within 80px of top. Default true. */
  hideOnScroll?: boolean;
  /** Floating only: full-width progressive blur that dissolves below the bar. Default true. */
  backdrop?: boolean;
  /** Floating only: read the theme from the section under the bar (`data-nav-theme="light|dark"`). Default true. */
  adaptive?: boolean;
  /** Force a theme and skip detection. */
  theme?: 'light' | 'dark';
  /** Theme when no tagged section is under the bar. Default 'light'. */
  defaultTheme?: 'light' | 'dark';
  /** Element or ref to watch instead of window (use with position="sticky"). */
  scrollTarget?: HTMLElement | { current: HTMLElement | null } | null;
  style?: React.CSSProperties;
}
/** @startingPoint section="Navigation" subtitle="Floating adaptive header — light/dark by section, auto-hides, dissolving blur" viewport="1280x120" */
export declare function NavBar(props: NavBarProps): JSX.Element;
