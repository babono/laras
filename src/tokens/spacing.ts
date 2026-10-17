/**
 * Space and size. The scale is the designer's 8-point grid (Frame 240). The
 * app still writes values inline (`spacing: 10`, `.padding(.horizontal, 24)`);
 * `uses` counts how often each appears today, so it's visible which steps the
 * app already lives on and which it still has to move to.
 */

export const spaceScale = [
  { token: "space-1", value: 8, uses: 53, role: "Icon to label; rows in a list; title to its metadata." },
  { token: "space-2", value: 16, uses: 21, role: "Card padding; between blocks inside a card." },
  { token: "space-3", value: 24, uses: 37, role: "Screen gutters; between cards." },
  { token: "space-4", value: 32, uses: 6, role: "Between groups of cards." },
  { token: "space-5", value: 40, uses: 12, role: "Between sections of a screen." },
  { token: "space-6", value: 48, uses: 0, role: "Above a screen's first section." },
  { token: "space-7", value: 56, uses: 0, role: "Large breaks; matches the button height." },
  { token: "space-8", value: 64, uses: 0, role: "The largest break; hero spacing." },
];

/** The half step, for the tightest pairs only (an icon and its label). */
export const halfStep = { value: 4, uses: 28 };

/** Values in use that sit off the grid, most used first. Move them to the nearest step when you next touch them. */
export const offScale = [
  { value: 10, uses: 65, to: 8 },
  { value: 14, uses: 45, to: 16 },
  { value: 12, uses: 41, to: "8 or 16" },
  { value: 6, uses: 24, to: 8 },
  { value: 18, uses: 19, to: 16 },
  { value: 20, uses: 14, to: 24 },
];

export const metrics = [
  { name: "Button radius", value: "14", swift: "Theme.radius", role: "Buttons and wells." },
  { name: "Card radius", value: "24", swift: "designed", role: "Cards. Padding 16, so what sits inside gets 24 − 16 = 8." },
  { name: "Dialog radius", value: "22", swift: "BusyOverlay · ConfirmDialog", role: "Floating panels over a scrim." },
  { name: "Button height", value: "56", swift: "Theme.buttonHeight", role: "Primary pill buttons." },
  { name: "Compact button", value: "38", swift: "PillButton(compact:)", role: "Drawn height; the target is still 44." },
  { name: "Touch target", value: "44 × 44", swift: ".frame(minHeight: 44)", role: "The HIG minimum, for every control, whatever is drawn." },
  { name: "Screen gutter", value: "24", swift: "TopBar", role: "Horizontal padding at the screen edge." },
  { name: "Hairline", value: "1", swift: "strokeBorder(lineWidth: 1)", role: "Outlines on buttons and cards." },
];
