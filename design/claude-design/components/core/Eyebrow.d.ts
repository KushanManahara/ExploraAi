export interface EyebrowProps {
  children: React.ReactNode;
  /** 28px hairline before the label (hero meta row). */
  rule?: boolean;
  tone?: 'default' | 'accent';
  style?: React.CSSProperties;
}
export declare function Eyebrow(props: EyebrowProps): JSX.Element;