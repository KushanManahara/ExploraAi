export interface QuoteCardProps {
  company: string;
  quote: React.ReactNode;
  who: string;
  role: string;
  avatar?: string;
  tone?: 'white' | 'ink' | 'accent';
  style?: React.CSSProperties;
}
export declare function QuoteCard(props: QuoteCardProps): JSX.Element;