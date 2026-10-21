export interface FactListProps {
  rows: Array<{ k: React.ReactNode; v: React.ReactNode }>;
  /** facts = mono key column + body value (About) · meta = Role/Team/Timeline key–value rows (case study) */
  variant?: 'facts' | 'meta';
  dark?: boolean;
  style?: React.CSSProperties;
}
export declare function FactList(props: FactListProps): JSX.Element;