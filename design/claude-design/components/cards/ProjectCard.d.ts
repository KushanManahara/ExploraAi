export interface ProjectCardProps {
  img?: string;
  n: string;
  title: string;
  year: string;
  /** Headline outcome ("38%", "12 ms"). */
  metric: string;
  metricLabel: string;
  onClick?: () => void;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
}
/** @startingPoint section="Cards" subtitle="Image project card with metric" viewport="700x460" */
export declare function ProjectCard(props: ProjectCardProps): JSX.Element;