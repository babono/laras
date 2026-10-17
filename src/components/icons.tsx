/** Stand-ins for the SF Symbols the app uses; SF Symbols can't ship on the web. */
type P = { className?: string };
const base = { fill: "none", stroke: "currentColor", strokeWidth: 2.4, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const ChevronLeft = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...base}><path d="M15 5l-7 7 7 7" /></svg>
);
export const ArrowRight = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...base}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const Plus = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...base}><path d="M12 5v14M5 12h14" /></svg>
);
export const Minus = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...base}><path d="M5 12h14" /></svg>
);
export const Play = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor"><path d="M7 4.5v15l12-7.5z" /></svg>
);
export const Gear = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...base} strokeWidth={1.8}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
  </svg>
);
export const Help = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...base} strokeWidth={1.8}>
    <circle cx="12" cy="12" r="9.5" />
    <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17h.01" />
  </svg>
);
export const Radio = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...base} strokeWidth={1.8}>
    <circle cx="12" cy="12" r="2" />
    <path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7M5.6 5.6a9 9 0 0 0 0 12.8M18.4 5.6a9 9 0 0 1 0 12.8" />
  </svg>
);
export const Clock = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...base} strokeWidth={1.8}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
