export interface SegmentedLensProps {
  items: Array<string | { value: string; label: React.ReactNode }>;
  value: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}
export declare function SegmentedLens(props: SegmentedLensProps): JSX.Element;