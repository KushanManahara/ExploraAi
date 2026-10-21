export interface StatusDotProps {
  /** success pulses ("Available"), signal has a soft ring (clock), warning is static. */
  tone?: 'success' | 'signal' | 'warning';
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function StatusDot(props: StatusDotProps): JSX.Element;