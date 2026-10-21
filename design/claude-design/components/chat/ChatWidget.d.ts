export interface ChatMessage { role: 'user' | 'bot'; text: string }
export interface ChatWidgetProps {
  title?: string;
  /** Optional extra after "Online ·" in the header status line. Omitted by default to keep it short. */
  subtitle?: string;
  /** First bot message. */
  greeting?: string;
  /** Quick-reply pills shown until the first question. */
  suggestions?: string[];
  placeholder?: string;
  /** Collapsed launcher pill text. */
  launcherLabel?: string;
  defaultOpen?: boolean;
  /** Controlled open state. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Fired by the × button, which collapses and resets the conversation. The – button only hides it. */
  onClose?: () => void;
  /** Supply replies (any async source). Defaults to window.claude.complete when present, else built-in canned answers. The reply is streamed word by word. */
  getResponse?: (question: string, history: ChatMessage[]) => Promise<string>;
  /** 'fixed' pins to the viewport bottom-right; 'absolute' pins inside a positioned parent (demos). */
  position?: 'fixed' | 'absolute';
  /** Base ms per streamed word (jittered). Default 18. */
  streamSpeed?: number;
  style?: React.CSSProperties;
}
/** @startingPoint section="Chat" subtitle="Floating chat — bubble morphs open, thinking → typing → streaming" viewport="700x620" */
export declare function ChatWidget(props: ChatWidgetProps): JSX.Element;
