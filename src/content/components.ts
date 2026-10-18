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
    swift: "PillButton · CapsuleButton · CircleIconButton · ButtonSurface",
    file: "Core/UI/Components.swift",
    summary:
      "Every button is a capsule, drawn one of four ways depending on the layer it sits in: gold glass for the way on, plain glass for navigation, solid gold when the way on sits inside content, and a flat wash for everything else.",
    variants: [
      { id: "prominent", label: "Prominent glass", note: "The way on, in a floating bar: Start, Next, Resume. Glass tinted gold, dark type." },
      { id: "glass", label: "Glass", note: "Navigation and floating controls: back, help, settings, search, Create." },
      { id: "solid", label: "Solid", note: "The way on inside content: an empty state, a card, a panel. Opaque gold, because glass doesn't belong in content." },
      { id: "wash", label: "Wash", note: "Everything else: Quit, Coop, Edit, Cancel, the utility buttons in cards." },
      { id: "disabled", label: "Disabled", note: "The gold and the press response go; the type fades. Not the whole button at 40%." },
    ],
    specs: [
      ["Shape", "Capsule (icon-only: circle)"],
      ["Height", "Pill 56pt (compact 38pt); capsule and circle 44pt; every target at least 44pt"],
      ["Pill label", "SF Pro 19pt Black, uppercase, 1.5pt tracking (compact 14pt)"],
      ["Capsule label", "SF Pro 16pt Semibold, sentence case"],
      ["Prominent", "glassEffect(.regular.tint(Tertiary at 60%).interactive()); LaunchBackground label"],
      ["Glass", "glassEffect(.regular.interactive()); TitleText label"],
      ["Solid", "Tertiary slab; LaunchBackground label"],
      ["Wash", "The tint at 12% (cream by default, red for destructive); label in the tint"],
      ["Disabled", "Untinted glass or a 6% wash, no press response; label TitleText at 40%"],
      ["Grouping", "Glass controls that sit together share a GlassEffectContainer"],
      ["Feedback", "Kajar tick on press; silent for buttons that record or play audio"],
    ],
    do: [
      "Use one prominent button per view, for the step that moves the player on.",
      "Use glass for controls that float over content, and for navigation.",
      "Put glass controls that sit together in one GlassEffectContainer.",
    ],
    dont: [
      "Put a glass button inside a card, a panel or an empty state. Use Solid or Wash.",
      "Fade a disabled button with opacity; let the disabled state draw it.",
      "Let a label wrap. It is clipped instead, as a signal to shorten it.",
    ],
    guidance: [
      {
        title: "Glass is for the functional layer",
        body: "Liquid Glass is a layer for controls and navigation that floats above the content. Apple: \u201cDon't use Liquid Glass in the content layer.\u201d In Kotek that means the top bar, bottom bars, the pause screen and controls over the camera or the waterfall. A button inside a card, a panel or an empty state is content, and is Solid or Wash.",
        source: HIG.materials,
      },
      {
        title: "Use it sparingly",
        body: "Apple: \u201cLimit these effects to the most important functional elements in your app.\u201d Plain glass on every button was tried in Kotek and flattened the hierarchy; even clear glass on the secondary buttons stood up as loud as the calls to action. So only navigation and the way on are glass.",
        source: HIG.materials,
      },
      {
        title: "Color only for the way on",
        body: "Glass has no color of its own. Apple reserves color for primary actions, on the background rather than the label, and asks to \u201crefrain from adding color to the background of multiple controls.\u201d Kotek tints exactly one button gold: the way on.",
        source: HIG.color,
      },
      {
        title: "Regular, not clear",
        body: "Regular glass blurs and adjusts what's behind it to keep labels legible. Clear is for controls over photos and video and needs a dimming layer. Kotek's controls sit on the brown ground or the camera, so they use regular.",
        source: HIG.materials,
      },
      {
        title: "Build it with the system, and let it morph",
        body: "Use glassEffect(_:in:) on the label itself, with interactive() for the system press response. Put glass that sits together in a GlassEffectContainer, which renders it in one pass and lets it blend. When one control turns into another, as search's magnifying glass opens into a field, give both the same glassEffectID and the glass flows between them.",
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
      "The utility button for actions inside cards and settings: Switch gangsa, History, Connect controller. A capsule wash; never glass, because it sits in the content layer.",
    variants: [
      { id: "default", label: "With icon" },
      { id: "row", label: "In a row", note: "Wrapped with a 10pt gap." },
    ],
    specs: [
      ["Min height", "44pt"],
      ["Padding", "11pt vertical, 18pt horizontal"],
      ["Shape", "Capsule"],
      ["Label", "SF Pro 15pt Black, 1.5pt tracking, sentence case"],
      ["Fill", "Cream wash at 12%; no border"],
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
      ["Back, help, settings", "44pt glass circles in one GlassEffectContainer, with accessibility labels"],
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
      { id: "dark", label: "Dark", note: "#1C1612 on a Card track. In the design; where it's used is still to be decided." },
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
      ["Buttons", "Compact wash Cancel, then the confirm action as a wash of Miss"],
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
