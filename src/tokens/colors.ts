import catalog from "./catalog.json";

/**
 * Every color the app paints with, grouped by job.
 *
 * `asset` colors come from the iOS asset catalog via `npm run sync-tokens`,
 * so they can't drift from the app. `literal` colors are hex values written
 * in Theme.swift itself; they're copied here by hand and say so.
 */

type Catalog = keyof typeof catalog.colors;

export type ColorToken = {
  name: string;
  hex: string;
  /** How Swift code reaches it. */
  swift: string;
  /** Where the value lives in the app. */
  source: "asset" | "literal" | "artwork";
  role: string;
  /** Not referenced by any code yet. */
  unused?: boolean;
  /** In the design (Frame 240) but not built in the app yet. */
  designed?: boolean;
};

const asset = (name: Catalog) => catalog.colors[name];

export const colorGroups: { title: string; intro: string; tokens: ColorToken[] }[] = [
  {
    title: "Surface",
    intro:
      "One surface, not two. Every screen sits on the same warm brown ground with the carved pattern behind it. Cards are a step lighter than the ground, never darker.",
    tokens: [
      { name: "Background", hex: asset("Background"), swift: "Theme.ground", source: "asset", role: "The ground. Every screen sits on this." },
      { name: "PatternBackground", hex: asset("PatternBackground"), swift: "Theme.pattern", source: "asset", role: "The carved motif drawn over the ground, just off it." },
      { name: "Card", hex: asset("Card"), swift: "Theme.deep", source: "asset", role: "Cards, panels, wells, the loading bar's track." },
    ],
  },
  {
    title: "Text",
    intro:
      "Gold on brown is the whole family. There is no light text: what used to be cream is the title gold, and supporting text is the description brown.",
    tokens: [
      { name: "TitleText", hex: asset("TitleText"), swift: "Theme.gold · Theme.cream", source: "asset", role: "Titles, primary text, outlines and accents." },
      { name: "DescriptionText", hex: asset("DescriptionText"), swift: "Theme.description · Theme.stone", source: "asset", role: "Descriptions, metadata, captions. Fails contrast on both surfaces; the design proposes #9D8273." },
      { name: "Description (designed)", hex: "#9D8273", swift: "DescriptionText, proposed", source: "literal", role: "The design's replacement: 4.4:1 on the ground, up from 2.7:1.", designed: true },
    ],
  },
  {
    title: "Action",
    intro:
      "The filled button is the one place in the app where dark type sits on a light slab; the two colors are a pair and move together. The prominent glass button is the same gold, as a 60% tint on the glass; plain glass has no color of its own. The design proposes a warmer gold and a dark inactive slab, not built yet.",
    tokens: [
      { name: "Tertiary", hex: asset("Tertiary"), swift: "Theme.buttonFill", source: "asset", role: "The filled button's slab." },
      { name: "LaunchBackground", hex: asset("LaunchBackground"), swift: "Theme.onButtonFill", source: "asset", role: "Type on the button fill. Only correct on Tertiary." },
      { name: "Button fill (designed)", hex: "#FBD494", swift: "Tertiary, proposed", source: "literal", role: "The design's button gold, a touch warmer.", designed: true },
      { name: "Inactive button (designed)", hex: "#1C1612", swift: "—", source: "literal", role: "The design's dark button slab. No component uses it yet.", designed: true },
      { name: "LoadingBar", hex: asset("LoadingBar"), swift: "Theme.progress", source: "asset", role: "Progress: the splash's loading line." },
    ],
  },
  {
    title: "Instrument",
    intro: "The gangsa on the splash and landing screens. The bilah are bronze; a struck key lights, and the one before it is damped.",
    tokens: [
      { name: "Bronze", hex: "#C9A876", swift: "Theme.bronze", source: "literal", role: "The bilah themselves." },
      { name: "KeyHighlight", hex: asset("KeyHighlight"), swift: "Theme.keyHighlight", source: "asset", role: "A bilah as it is struck." },
      { name: "KeyDampened", hex: asset("KeyDampened"), swift: "Theme.keyDampened", source: "asset", role: "A bilah the free hand has just stopped ringing." },
      { name: "Pelawah", hex: "#7E4127", swift: "gangsa-table.svg · mallet.svg", source: "artwork", role: "The carved frame and the mallet." },
      { name: "Rail", hex: "#8D3021", swift: "gangsa-table.svg", source: "artwork", role: "The red line the bilah rest on." },
    ],
  },
  {
    title: "The two halves",
    intro:
      "Polos and sangsih keep their own color wherever they appear (the score, the picker cards, the mixer chips) so the interlock reads at a glance. The designed note tiles use a deeper pair; see Note tile.",
    tokens: [
      { name: "Polos", hex: "#5FA8D3", swift: "Theme.polosVoice", source: "literal", role: "The steady half, on the beat." },
      { name: "Sangsih", hex: "#A97CD1", swift: "Theme.sangsihVoice", source: "literal", role: "The answering half, between the beats." },
    ],
  },
  {
    title: "Play screen",
    intro:
      "The bilah on the play screen, as designed. Each state is a fill, a lighter ring and an inner strip; these are the fills. There are two verdicts, Great and Miss, shown as an aura of the key's color with the word inside. There is no separate wrong-key state for now.",
    tokens: [
      { name: "Great", hex: "#79EC90", swift: "ring #DEFEE5 · inner #4CC294", source: "literal", role: "A strike on time, on the right bilah.", designed: true },
      { name: "Next", hex: "#EBB164", swift: "ring #FFE2B6 · inner #C2975A", source: "literal", role: "The bilah to strike next.", designed: true },
      { name: "Miss", hex: "#8F303B", swift: "ring #B43D54 · inner #BD5267", source: "literal", role: "A note that was not struck in time.", designed: true },
      { name: "Damped", hex: "#59482E", swift: "ring #2B211C · inner #7B5F39", source: "literal", role: "A bilah at rest, stopped ringing.", designed: true },
    ],
  },
  {
    title: "Judgement (current)",
    intro:
      "What the app colors a strike with today. Warmed towards the palette, but kept clearly green, red and amber to read at a glance mid-stroke. The play-screen states above replace these when they are built, and Wrong goes.",
    tokens: [
      { name: "Hit", hex: "#7FB069", swift: "Theme.hit", source: "literal", role: "A correct strike." },
      { name: "Miss", hex: "#A85A44", swift: "Theme.miss", source: "literal", role: "A missed note. Also destructive actions." },
      { name: "Wrong", hex: "#D9A441", swift: "Theme.wrong", source: "literal", role: "The wrong bilah." },
    ],
  },
  {
    title: "Colotomic",
    intro: "Gong, kempur and kajar frame the cycle rather than carry a part, so they belong to the ground: one quiet warm family underneath the voices.",
    tokens: [
      { name: "Gong", hex: "#F0DDA8", swift: "Theme.gong", source: "literal", role: "The gong at the end of each cycle." },
      { name: "Kempur", hex: "#D9A441", swift: "Theme.kempur", source: "literal", role: "The kempur's mid-cycle stroke." },
      { name: "Kajar", hex: "#A89478", swift: "Theme.kajar", source: "literal", role: "The kajar's steady pulse." },
    ],
  },
  {
    title: "In the catalog, not in use",
    intro: "Defined in the asset catalog but not read by any code yet. Use them or remove them before they become a second, unofficial palette.",
    tokens: [
      { name: "Text", hex: asset("Text"), swift: "—", source: "asset", role: "A light text color.", unused: true },
      { name: "Subtle", hex: asset("Subtle"), swift: "—", source: "asset", role: "A light supporting color.", unused: true },
    ],
  },
];

/** The tokens the site itself is painted with. */
export const palette = {
  ground: asset("Background"),
  pattern: asset("PatternBackground"),
  card: asset("Card"),
  gold: asset("TitleText"),
  description: asset("DescriptionText"),
  fill: asset("Tertiary"),
  onFill: asset("LaunchBackground"),
  progress: asset("LoadingBar"),
};
