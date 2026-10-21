export interface ToolTileProps {
  /** 1–3 mono letters shown in the tile. */
  abbr: string;
  name: string;
  note?: string;
  /** Brand tint revealed on hover. */
  bg?: string;
  style?: React.CSSProperties;
}
export declare function ToolTile(props: ToolTileProps): JSX.Element;