export interface ProjectRowProps {
  n: string;
  title: string;
  client: string;
  desc: string;
  year: string;
  /** Category tag for non-featured rows ("Model", "Teaching"). */
  kind?: string;
  /** Featured rows get the accent "Deep dive" tag, arrow orb and white hover. */
  featured?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function ProjectRow(props: ProjectRowProps): JSX.Element;