export interface BrandMarkProps {
  name?: string;
  href?: string;
  /** wordmark = "Kushan Manahara●" two-tone with accent dot (inherits color) · monogram = "km●" navy tile (app icon) */
  variant?: 'wordmark' | 'monogram';
  /** Wordmark font size in px; monogram tile = size × 1.6. Default 17. */
  size?: number;
  style?: React.CSSProperties;
}
export declare function BrandMark(props: BrandMarkProps): JSX.Element;
