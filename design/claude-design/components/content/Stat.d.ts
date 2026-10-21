export interface StatProps {
  value: React.ReactNode;
  label: React.ReactNode;
  /** sans = big outcome numbers (night panel) · compact = smaller figures in experience rows */
  variant?: 'sans' | 'compact';
  style?: React.CSSProperties;
}
export declare function Stat(props: StatProps): JSX.Element;