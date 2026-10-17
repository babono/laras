/**
 * The type scale. The app sets sizes directly (`.serif(30)`, `.sans(13)`), so
 * these names are Laras's, given to the sizes the app actually uses. `uses`
 * counts call sites in the app at the time of writing, to show which sizes
 * carry the interface and which are one-offs.
 */

export type TypeStyle = {
  name: string;
  face: "display" | "text";
  size: number;
  weight: number;
  tracking?: number;
  uppercase?: boolean;
  swift: string;
  role: string;
  uses?: number;
  sample: string;
};

export const typeScale: TypeStyle[] = [
  { name: "Display XL", face: "display", size: 64, weight: 400, swift: ".serif(64)", role: "Big numerals: the key-count stepper.", sample: "10" },
  { name: "Display L", face: "display", size: 44, weight: 400, swift: ".serif(44)", role: "Hero titles.", uses: 4, sample: "Kotekan" },
  { name: "Display M", face: "display", size: 34, weight: 400, swift: ".serif(34)", role: "Screen headlines.", uses: 5, sample: "Choose a pattern" },
  { name: "Title", face: "display", size: 30, weight: 400, tracking: 1.5, uppercase: true, swift: ".serif(30) · TopBar", role: "The screen title in the top bar.", sample: "Choose your gangsa" },
  { name: "Heading", face: "display", size: 24, weight: 400, tracking: 1.5, uppercase: true, swift: ".serif(24)", role: "Dialog and card headings.", uses: 7, sample: "Delete this gangsa?" },
  { name: "Subheading", face: "display", size: 22, weight: 400, swift: ".serif(22)", role: "Names and compact titles.", uses: 5, sample: "Pemade at the sanggar" },
  { name: "Button", face: "text", size: 19, weight: 900, tracking: 1.5, uppercase: true, swift: ".sans(19, weight: .black)", role: "Pill button labels.", sample: "Start practice" },
  { name: "Body L", face: "text", size: 16, weight: 400, swift: ".sans(16)", role: "Back links, overlay messages.", uses: 10, sample: "Back" },
  { name: "Body", face: "text", size: 15, weight: 400, swift: ".sans(15)", role: "Body copy; secondary button labels at black weight.", uses: 22, sample: "Play along with the waterfall." },
  { name: "Body S", face: "text", size: 14, weight: 400, swift: ".sans(14)", role: "Descriptions under settings and cards.", uses: 24, sample: "Piezo sensors on the bilah feel exactly which key you hit." },
  { name: "Caption", face: "text", size: 13, weight: 400, swift: ".sans(13)", role: "Metadata and status. The most used size in the app.", uses: 50, sample: "10 keys · 4 hours ago" },
  { name: "Eyebrow", face: "text", size: 12, weight: 600, tracking: 2.5, uppercase: true, swift: "SectionLabel · .eyebrow()", role: "Section labels above a group.", uses: 27, sample: "Strike controller" },
  { name: "Minimum", face: "text", size: 11, weight: 400, swift: ".sans(11)", role: "The floor. Nothing is set smaller.", uses: 14, sample: "Caption 2 is the smallest size iOS allows." },
];

export const faces = [
  {
    name: "Katibeh",
    css: "var(--font-display)",
    swift: "Font.serif(_:)",
    role: "The display face: titles, headings and big numerals. It carries the app's voice.",
    notes: [
      "One weight only. A weight passed to .serif() is honoured only by the system fallback.",
      "Bundled with the app (UIAppFonts) and resolved once by PostScript name, never by family name, which once came back empty and silently fell through to the system font.",
      "Titles in the top bar and dialogs are uppercase with 1.5pt tracking.",
      "Licensed under the SIL Open Font License.",
    ],
  },
  {
    name: "SF Pro",
    css: "var(--font-text)",
    swift: "Font.sans(_:weight:)",
    role: "The interface face: body, labels, buttons, everything that isn't a heading.",
    notes: [
      "The system font, so it ships with the OS and has the full weight range: buttons are Black.",
      "Its Text optical size opens the spacing below 20pt, which is where this app mostly lives: read at arm's length, over a live image, by someone holding a mallet.",
      "Never below 11pt. .sans() clamps anything smaller.",
      "It replaced a condensed single-weight Futura that could not honour a weight at all.",
    ],
  },
];
