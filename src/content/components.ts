export type ComponentDoc = {
  slug: string;
  name: string;
  /** The SwiftUI type and the file it lives in. */
  swift: string;
  file: string;
  summary: string;
  /** What the preview shows, in order. */
  variants: { id: string; label: string; note?: string }[];
  specs: [string, string][];
  do: string[];
  dont: string[];
  /** "designed": in the design (Frame 240), not built in the app yet. */
  status?: "app" | "designed";
  /** Longer guidance, with the source it comes from. */
  guidance?: { title: string; body: string; source?: { label: string; href: string } }[];
};

const HIG = {
  materials: { label: "HIG · Materials", href: "https://developer.apple.com/design/human-interface-guidelines/materials" },
  color: { label: "HIG · Color", href: "https://developer.apple.com/design/human-interface-guidelines/color" },
  custom: {
    label: "Applying Liquid Glass to custom views",
    href: "https://developer.apple.com/documentation/swiftui/applying-liquid-glass-to-custom-views",
  },
};

export const components: ComponentDoc[] = [
  {
    slug: "button",
    name: "Button",
    swift: "PillButton · PrimaryButton",
    file: "Core/UI/Components.swift",
    summary:
      "The canonical pill: GO, NEXT, START PRACTICE. Primary for the one action that moves you forward, secondary for the rest, and Liquid Glass for controls that float over content.",
    variants: [
      { id: "filled", label: "Primary", note: "The one action that moves the player on." },
      { id: "secondary", label: "Secondary", note: "A dark slab with gold type, for the other actions." },
      { id: "glass", label: "Glass", note: "For controls floating over content: bars, overlays, the camera. A web approximation; on iOS this is the system material." },
      { id: "compact", label: "Compact glass", note: "Drawn 38pt tall, with a 44pt target." },
    ],
    specs: [
      ["Height", "56pt (compact 38pt, target 44pt)"],
      ["Corner radius", "14pt"],
      ["Horizontal padding", "30pt (compact 18pt)"],
      ["Label", "SF Pro 19pt Black, uppercase, 1.5pt tracking (compact 14pt)"],
      ["Icon gap", "8pt"],
      ["Primary", "Tertiary #FBD494 slab, LaunchBackground label"],
      ["Secondary", "ButtonSecondary #1C1612 slab, TitleText label"],
      ["Glass", "glassEffect(.regular.interactive(), in: RoundedRectangle(cornerRadius: 14)); untinted; TitleText label; no border"],
      ["Feedback", "Kajar tick on press; silent for buttons that record or play audio"],
    ],
    do: [
      "Use one or two prominent buttons per view, for the step that moves the player on.",
      "Use glass only for controls that float over content.",
      "Keep labels to one or two short words.",
    ],
    dont: [
      "Put a glass button inside a card or list. That's the content layer; use Secondary.",
      "Tint the glass. Color on glass is for the one primary action, and that is the filled button.",
      "Let a label wrap. It is clipped instead, as a signal to shorten it.",
    ],
    guidance: [
      {
        title: "Glass is for the functional layer",
        body: "Liquid Glass is a layer for controls and navigation that floats above the content. Apple: \u201cDon't use Liquid Glass in the content layer.\u201d In Kotek that means bottom bars, the pause overlay and controls over the camera or the waterfall. A button inside a settings card or a list is content, and stays a solid Secondary.",
        source: HIG.materials,
      },
      {
        title: "Use it sparingly",
        body: "Apple: \u201cLimit these effects to the most important functional elements in your app.\u201d A bar with two glass buttons is fine; a screen of them distracts from the instrument they're meant to frame.",
        source: HIG.materials,
      },
      {
        title: "Regular, not clear",
        body: "Regular glass blurs and adjusts what's behind it to keep labels legible, and it's what most system components use. Clear is for controls over photos and video, and needs a 35% dark dimming layer when the content is bright. Kotek's controls sit on the brown ground or the camera, so they use regular.",
        source: HIG.materials,
      },
      {
        title: "Color only for the primary action",
        body: "Glass has no color of its own; it takes it from what's behind. Apple asks to apply color sparingly, reserve it for primary actions, put it on the background rather than the label, and \u201crefrain from adding color to the background of multiple controls.\u201d Gold labels suit Kotek's monochrome brown, which is the case Apple names for using a brand color as the accent.",
        source: HIG.color,
      },
      {
        title: "Build it with the system",
        body: "Use the system material, not a lookalike: .buttonStyle(.glass) for a standard button, or glassEffect(.regular.interactive(), in:) for a custom one, which gives it the same press response. Put several glass controls in one GlassEffectContainer so they render together and can morph into each other. The system then handles Reduce Transparency and Increase Contrast.",
        source: HIG.custom,
      },
    ],
  },
  {
    slug: "secondary-button",
    name: "Secondary button",
    swift: "SecondaryButton",
    file: "Core/UI/Components.swift",
    summary:
      "The outlined utility button for actions inside cards: Switch gangsa, History, Connect controller. Inside a card it stays solid; glass is only for controls floating over content.",
    variants: [
      { id: "default", label: "With icon" },
      { id: "row", label: "In a row", note: "Wrapped with a 10pt gap." },
    ],
    specs: [
      ["Min height", "44pt"],
      ["Padding", "11pt vertical, 18pt horizontal"],
      ["Corner radius", "14pt"],
      ["Label", "SF Pro 15pt Black, 1.5pt tracking, sentence case"],
      ["Border", "TitleText at 45%, 1pt"],
      ["Fill", "TitleText at 8%"],
    ],
    do: ["Group related secondary actions in a wrapping row.", "Lead with an icon that says what the action is."],
    dont: ["Use it for the step that moves the flow forward; that's the filled button."],
  },
  {
    slug: "top-bar",
    name: "Top bar",
    swift: "TopBar",
    file: "Core/UI/Components.swift",
    summary: "The screen header: an optional back link, the title in Katibeh, and optional status, help and settings at the trailing edge.",
    variants: [{ id: "default", label: "Back, title, status and actions" }],
    specs: [
      ["Title", "Katibeh 30pt, uppercase, 1.5pt tracking (compact 22pt)"],
      ["Back", "System chevron 16pt semibold + SF Pro 16pt"],
      ["Status", "SF Pro 13pt medium, TitleText"],
      ["Icons", "19pt glyphs in 44 × 44 targets, with accessibility labels"],
      ["Padding", "24pt horizontal, 18pt top, 12pt bottom"],
      ["Divider", "None. Space separates the bar from the content."],
    ],
    do: ["Keep the title short; it scales down to 70% before it truncates.", "Label every icon-only button for VoiceOver."],
    dont: ["Add a hairline under the bar.", "Set the back link in Katibeh; it's interface, not voice."],
  },
  {
    slug: "section-label",
    name: "Section label",
    swift: "SectionLabel · .eyebrow()",
    file: "Core/UI/Components.swift",
    summary: "The uppercase, letter-spaced label above a group: STRIKE CONTROLLER, NOTE CLIPS.",
    variants: [{ id: "default", label: "Above a group" }],
    specs: [
      ["Type", "SF Pro 12pt Semibold, uppercase, 2.5pt tracking"],
      ["Color", "TitleText"],
      ["Space below", "10pt to the content it labels"],
    ],
    do: ["Use it to name a group of controls."],
    dont: ["Use it as a heading for a whole screen; that's the top bar's title."],
  },
  {
    slug: "count-stepper",
    name: "Count stepper",
    swift: "CountStepper",
    file: "Core/UI/Components.swift",
    summary: "A big number between minus and plus circles. Used to choose how many keys a gangsa has.",
    variants: [{ id: "default", label: "Interactive", note: "Try it: the minus disables at the lower limit." }],
    specs: [
      ["Number", "Katibeh 64pt"],
      ["Buttons", "64pt circles, 2pt border at 75%, 8% fill"],
      ["Disabled", "Border at 20%, glyph at 30%, no tick"],
      ["Gap", "22pt"],
    ],
    do: ["Use it for small whole-number ranges a player counts by eye."],
    dont: ["Use it for values that change continuously; that's a slider."],
  },
  {
    slug: "toggle",
    name: "Toggle",
    swift: "KajarToggleStyle",
    file: "Core/UI/Components.swift",
    summary: "The system switch, with a kajar tick when its value changes. Set once on the root, so every switch in the app ticks.",
    variants: [{ id: "default", label: "Interactive" }],
    specs: [
      ["Control", "iOS switch"],
      ["Tint", "TitleText"],
      ["Feedback", "Kajar tick on the value change, so a drag sounds the same as a tap"],
      ["Description", "SF Pro 13pt, TitleText at 75%, one line"],
    ],
    do: ["Explain the setting in one short line under the label."],
    dont: ["Hide what a setting does behind its label alone."],
  },
  {
    slug: "loading-bar",
    name: "Loading bar",
    swift: "LoadingBar",
    file: "Features/Onboarding/Splash/LoadingBar.swift",
    summary: "The splash's progress: a thin red line filling a card-colored track. No percentage on screen.",
    variants: [
      { id: "default", label: "Loading", note: "LoadingBar on a Card track." },
      { id: "dark", label: "Dark", note: "ButtonSecondary on a Card track. In the design; where it's used is still to be decided." },
    ],
    specs: [
      ["Height", "5pt, capsule"],
      ["Track", "Card"],
      ["Fill", "LoadingBar"],
      ["Width", "25% of the screen, at most 240pt"],
      ["Accessibility", "Announced as \"Loading\", with the percentage as its value"],
    ],
    do: ["Ease the fill so progress never jumps."],
    dont: ["Print the percentage on screen; VoiceOver reads it instead."],
  },
  {
    slug: "stat-bar",
    name: "Stat bar",
    swift: "StatBar",
    file: "Core/UI/Components.swift",
    summary: "A small capsule showing a fraction, such as accuracy on the results screen, in the color of what it measures.",
    variants: [{ id: "default", label: "Polos, sangsih and hits" }],
    specs: [
      ["Height", "7pt, capsule"],
      ["Track", "Card"],
      ["Minimum fill", "6pt, so zero still shows a nub"],
    ],
    do: ["Color the fill by what it measures: a voice or a judgement."],
    dont: ["Use it as a loading indicator."],
  },
  {
    slug: "confirm-dialog",
    name: "Confirm dialog",
    swift: "ConfirmDialog · .confirm()",
    file: "Core/UI/Components.swift",
    summary: "Asks before anything that can't be undone. A tap on the scrim cancels.",
    variants: [{ id: "default", label: "Destructive" }],
    specs: [
      ["Scrim", "Black at 72%; tapping it cancels"],
      ["Panel", "Card, 22pt radius, 12% TitleText border"],
      ["Title", "Katibeh 24pt, uppercase, 1.5pt tracking"],
      ["Message", "SF Pro 14pt, TitleText at 75%"],
      ["Buttons", "Compact outlined Cancel, then the confirm action outlined in Miss at 60%"],
      ["Padding", "24pt; at most 520pt wide"],
    ],
    do: ["Say exactly what will be lost in the message.", "Name the confirm button for the action: Delete, not OK."],
    dont: ["Ask for confirmation on actions that can be undone."],
  },
  {
    slug: "card",
    name: "Card",
    swift: "—",
    file: "designed",
    status: "designed",
    summary: "A gangsa or a pattern as a tile in a picker: a picture or a preview on top, the name in Katibeh, and a line or two about it.",
    variants: [
      { id: "gangsa", label: "Gangsa", note: "Photo flush with the top edge, sharing the card's corners." },
      { id: "pattern", label: "Pattern", note: "A preview of the figure: polos on top, sangsih below, the cursor where the cycle is." },
    ],
    specs: [
      ["Corner radius", "24pt"],
      ["Padding", "16pt"],
      ["Inner shapes", "24 − 16 = 8pt, concentric with the card (ConcentricRectangle)"],
      ["Photo", "Flush to the top and sides, sharing the card's top corners"],
      ["Title", "Katibeh 34/41, TitleText"],
      ["Title to text", "8pt"],
      ["Metadata", "SF Pro 15/20, DescriptionText; the number in semibold"],
      ["Surface", "Card #3D322C, on the ground"],
    ],
    do: [
      "Keep to the 8-point grid inside the card: 16 padding, 8 between title and text.",
      "Give anything nested in a card the concentric radius, not one of its own.",
    ],
    dont: ["Put a glass button on a card; cards are content.", "Add a hairline border; the step from ground to card already separates it."],
  },
  {
    slug: "note-tile",
    name: "Note tile",
    swift: "—",
    file: "designed",
    status: "designed",
    summary: "One note of a figure: polos or sangsih, lit when it's the half you play and dimmed when it's your partner's. The brown tile is a damp, with the hand that stops the key.",
    variants: [
      { id: "voices", label: "Polos and sangsih", note: "Lit (your half) and dimmed (the other half)." },
      { id: "damp", label: "Damp", note: "The hand glyph needs an asset from the designer; a placeholder is shown." },
    ],
    specs: [
      ["Shape", "Rounded square; radius about 22% of the side, so tiles of every size match"],
      ["Border", "3pt, a lighter tint of the fill"],
      ["Polos, lit", "Gradient #678BC6 → #384B76, border #7BA2E4"],
      ["Sangsih, lit", "Gradient #A281C4 → #704A99, border #B391D8"],
      ["Dimmed", "Polos #313744, sangsih #3F3748, same borders"],
      ["Damp", "Gradient #795E38 → #4F3D2A, border #9E7B49, hand #3A2D22"],
    ],
    do: ["Keep polos blue and sangsih purple wherever a note appears."],
    dont: ["Show a dimmed note as playable; dimmed is the partner's half."],
  },
  {
    slug: "key-state",
    name: "Key state",
    swift: "—",
    file: "designed",
    status: "designed",
    summary: "A bilah on the play screen, and the verdict on a strike. Two verdicts only: Great, in a green aura, and Miss, in a red one.",
    variants: [
      { id: "keys", label: "Great, next, miss, damped" },
      { id: "verdicts", label: "Verdicts", note: "The word inside an aura of its color, above the key." },
    ],
    specs: [
      ["Great", "Fill #79EC90, ring #DEFEE5, inner #4CC294, number #DEFEE5"],
      ["Next", "Fill #EBB164, ring #FFE2B6, inner #C2975A"],
      ["Miss", "Fill #8F303B, ring #B43D54, inner #BD5267"],
      ["Damped", "Fill #59482E, ring #2B211C, inner #7B5F39"],
      ["Holes", "Two #2B211C dots where the bilah is pinned"],
      ["Verdict", "SF Pro Bold: Great #79EC90, Miss #BD5267, each on an aura of its color"],
      ["Wrong key", "No separate state for now"],
    ],
    do: ["Show exactly one key as Next at a time.", "Let the verdict fade; it's feedback, not a badge."],
    dont: ["Rely on color alone: the verdict says Great or Miss in words."],
  },
];
