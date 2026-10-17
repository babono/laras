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
};

export const components: ComponentDoc[] = [
  {
    slug: "button",
    name: "Button",
    swift: "PillButton · PrimaryButton",
    file: "Core/UI/Components.swift",
    summary:
      "The canonical pill: GO, NEXT, START PRACTICE. Filled for the one action that moves you forward, outlined for the rest, secondary on a card.",
    variants: [
      { id: "filled", label: "Filled", note: "The primary action. One per screen." },
      { id: "outlined", label: "Outlined", note: "A glass wash over whatever is behind, which on camera screens is the instrument." },
      { id: "secondary", label: "Secondary", note: "A card-colored slab." },
      { id: "compact", label: "Compact", note: "Drawn 38pt tall, with a 44pt target." },
    ],
    specs: [
      ["Height", "56pt (compact 38pt, target 44pt)"],
      ["Corner radius", "14pt"],
      ["Horizontal padding", "30pt (compact 18pt)"],
      ["Label", "SF Pro 19pt Black, uppercase, 1.5pt tracking (compact 14pt)"],
      ["Icon gap", "10pt (compact 8pt)"],
      ["Filled", "Tertiary slab, LaunchBackground label"],
      ["Outlined", "TitleText 1pt border, 8% TitleText wash over a thin material"],
      ["Feedback", "Kajar tick on press; silent for buttons that record or play audio"],
    ],
    do: [
      "Use one filled button per screen, for the step that moves the player on.",
      "Put a trailing arrow on buttons that go somewhere; a leading icon on buttons that do something.",
      "Keep labels to one or two short words.",
    ],
    dont: [
      "Let a label wrap. It is clipped instead, as a signal to shorten it.",
      "Make the compact button's target smaller than 44pt.",
      "Put light type on the filled slab.",
    ],
  },
  {
    slug: "secondary-button",
    name: "Secondary button",
    swift: "SecondaryButton",
    file: "Core/UI/Components.swift",
    summary: "The outlined utility button for settings and secondary actions: Switch gangsa, History, Connect controller.",
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
    variants: [{ id: "default", label: "Loading" }],
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
];
