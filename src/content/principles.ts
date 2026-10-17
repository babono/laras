export type Principle = {
  slug: string;
  title: string;
  /** One line, for the overview cards. */
  summary: string;
  intro: string;
  guidelines: { title: string; body: string }[];
  do: string[];
  dont: string[];
};

export const principles: Principle[] = [
  {
    slug: "consistency",
    title: "Consistency",
    summary: "One surface, one set of tokens, one meaning per color.",
    intro:
      "A kotekan only works when both players are tuned to the same scale. The app is the same: every screen draws from the same ground, the same tokens and the same components, so moving between them never feels like moving between apps.",
    guidelines: [
      {
        title: "One surface",
        body: "Everything sits on the same warm brown ground with the carved pattern behind it. The app used to switch between a light \"paper\" world and a dark \"stage\" world, and flashed between them mid-flow. Now the camera screens are simply the ones where the ground happens to be a live image.",
      },
      {
        title: "Tokens, not values",
        body: "Colors live in the asset catalog and are read through Theme by name, so a designer can change a color without a code edit. A view never writes a hex value of its own.",
      },
      {
        title: "Name the job, not the paint",
        body: "Tokens are named for what they do: onButtonFill is only correct on top of buttonFill, and the pair moves together. A name like \"lightBrown\" says nothing about where it is safe to use.",
      },
      {
        title: "Same color, same meaning, everywhere",
        body: "Polos is blue and sangsih is purple on the score, the picker cards and the mixer chips alike. A color that means a voice never also means a state.",
      },
      {
        title: "Shared components can't drift",
        body: "Button weight and tracking are held once in Theme. Buttons are the most repeated element in the app and the place an inconsistency is most obvious, so no call site sets its own.",
      },
    ],
    do: ["Reach for Theme tokens and the shared components first.", "Add a new color to the asset catalog, with a name for its job."],
    dont: ["Write a hex value or a font size into a feature view.", "Reuse a voice color (polos, sangsih) to mean a state."],
  },
  {
    slug: "usability",
    title: "Usability",
    summary: "Built for someone standing at an instrument with a mallet in each hand.",
    intro:
      "Kotek is used at arm's length, in landscape, by someone standing over a gangsa holding a mallet. Every decision starts there: the target has to be easy to hit, the feedback has to be immediate, and the guidance has to be on the instrument rather than on the screen.",
    guidelines: [
      {
        title: "44 points, whatever is drawn",
        body: "Every control has at least a 44 × 44 point target, the Human Interface Guidelines minimum. The compact pill is drawn 38 points tall because the design calls for it, but its target is grown to 44 without changing what is drawn. A gear glyph in a corner is a 19-point target unless it is given the full 44.",
      },
      {
        title: "Every control answers",
        body: "Buttons and switches strike a kajar tick when they act, so a press is confirmed by ear while the eyes are on the bilah. A disabled control never ticks, because nothing happened. Sliders don't tick at all: a tick per step is a machine gun.",
      },
      {
        title: "Labels never wrap",
        body: "Button labels are short, heavy and tracked. A label that would wrap is clipped instead, which reads as \"shorten this\" rather than as a broken control.",
      },
      {
        title: "Guidance lives on the instrument",
        body: "What to play next is shown on the bilah in front of the player. The score is peripheral, so the bottom panel starts down and is one tap away.",
      },
      {
        title: "Use the platform's own affordances",
        body: "Back is the system chevron at the system's weight, so it reads as Back rather than as an arrow someone drew.",
      },
    ],
    do: ["Give every tappable thing a 44-point target.", "Confirm actions with sound as well as with sight."],
    dont: ["Shrink a target to fit a layout.", "Put information the player needs mid-figure anywhere but on the instrument."],
  },
  {
    slug: "accessibility",
    title: "Accessibility",
    summary: "Readable, operable and calm for everyone who picks up a mallet.",
    intro:
      "Accessibility is not a separate mode. The same choices that make Kotek usable over an instrument (big targets, clear type, feedback that isn't only visual) make it usable for people who see, hear or move differently.",
    guidelines: [
      {
        title: "Never below 11 points",
        body: "11 points is Caption 2, the smallest size iOS allows. The body face clamps anything smaller, so a label can't be set at 9 or 10 by accident.",
      },
      {
        title: "Respect Reduce Motion",
        body: "The background pattern and the splash curtains slide forever. With Reduce Motion on they stand still: ambient movement is exactly what that setting asks apps to leave out.",
      },
      {
        title: "Name what has no words",
        body: "Icon-only buttons carry an accessibility label (\"Settings\", \"How Kotek works\"). The loading bar announces itself and its percentage. The decorative gangsa is hidden from VoiceOver.",
      },
      {
        title: "Don't rely on color alone",
        body: "Hit, miss and wrong are clearly green, red and amber, but color should never be the only signal. Pair it with position, text or sound, as the kajar tick pairs with every press.",
      },
      {
        title: "Meet contrast",
        body: "Body text needs 4.5:1 against its background; large text and UI parts need 3:1. The color page checks every text color against the ground and the card.",
      },
    ],
    do: ["Test with Reduce Motion, VoiceOver and the largest text size.", "Check a new color pair on the Colors page before shipping it."],
    dont: ["Set text below 11 points.", "Ship text that fails 4.5:1 for body copy."],
  },
  {
    slug: "aesthetics",
    title: "Aesthetics",
    summary: "Gold on brown, carved ornament, and motion that feels like bronze.",
    intro:
      "Kotek should feel like the instrument it teaches: warm metal on dark carved wood, ornament with a reason, and motion that rings and then settles.",
    guidelines: [
      {
        title: "One family",
        body: "Gold on brown, and nothing else for the chrome. Color beyond it is reserved for meaning: the two voices and the judgement of a strike.",
      },
      {
        title: "Ornament that interlocks",
        body: "The carved motif runs in two rows, one hanging and one standing, half a motif apart, so they fit together like teeth. It's the interlock kotekan is built on, drawn as a pattern.",
      },
      {
        title: "A voice and an interface",
        body: "Katibeh carries the voice in titles and headings; SF Pro carries the interface. Back links and step counters stay in SF because they are interface, not voice.",
      },
      {
        title: "Soft edges, space as structure",
        body: "No hairline under the top bar. On a dark ground with generous space between cards, a rule draws a boundary the layout already made, and puts a hard edge across a screen whose character is soft.",
      },
      {
        title: "Motion that rings",
        body: "The splash gangsa plays a real kotekan, not random notes: a struck key glows and decays like bronze, and the free hand damps it as the next one lands. Ambient motion runs on the render server so it never stutters while the app is busy.",
      },
    ],
    do: ["Keep new chrome inside the gold-on-brown family.", "Give motion a physical reason: a strike, a ring, a damp."],
    dont: ["Add a new accent color for decoration.", "Separate content with lines where space already does it."],
  },
];
