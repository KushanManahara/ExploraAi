export interface ExpertiseCardProps {
  n: string;
  /** Short mono code in the dark chip ("LLM", "MLOPS"). */
  mono?: string;
  title: React.ReactNode;
  desc: React.ReactNode;
  tags?: string[];
  used?: string[];
  active?: boolean;
  minHeight?: number | string;
  style?: React.CSSProperties;
}
/** @startingPoint section="Cards" subtitle="Service card with tags" viewport="700x380" */
export declare function ExpertiseCard(props: ExpertiseCardProps): JSX.Element;