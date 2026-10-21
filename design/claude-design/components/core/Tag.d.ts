export interface TagProps {
  /** mono = tech tag · accent = "Deep dive" · glass = caption on imagery · outline = "Used in →" link chip · chip = dark ID badge on cards */
  variant?: 'mono' | 'accent' | 'glass' | 'outline' | 'chip';
  /** Accent lamp dot; "on" = full opacity. Always shown for chip. */
  lamp?: boolean | 'on';
  children: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Tag(props: TagProps): JSX.Element;