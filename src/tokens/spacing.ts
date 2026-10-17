/**
 * Space and size. The app writes these values inline (`spacing: 10`,
 * `.padding(.horizontal, 24)`); `uses` counts how often each appears, so the
 * scale here is the one the app has converged on, not one imposed on it.
 */

export const spaceScale = [
  { token: "space-1", value: 4, uses: 28, role: "Icon to label in a back link; tight pairs." },
  { token: "space-2", value: 8, uses: 53, role: "Icon to label in buttons; rows in a list." },
  { token: "space-2.5", value: 10, uses: 65, role: "Between buttons in a row; label to control. The most used gap." },
  { token: "space-3", value: 12, uses: 41, role: "Between related lines of text." },
  { token: "space-3.5", value: 14, uses: 45, role: "Inside cards; matches the corner radius." },
  { token: "space-4", value: 16, uses: 21, role: "Between blocks inside a card." },
  { token: "space-6", value: 24, uses: 37, role: "Screen gutters; between sections." },
  { token: "space-10", value: 40, uses: 12, role: "Generous breaks; overlay padding." },
];

/** Values in use that sit off the scale, and should move onto it when touched. */
export const offScale = [2, 5, 6, 18, 20, 22, 28];

export const metrics = [
  { name: "Corner radius", value: "14", swift: "Theme.radius", role: "Buttons, cards and wells." },
  { name: "Dialog radius", value: "22", swift: "BusyOverlay · ConfirmDialog", role: "Floating panels over a scrim." },
  { name: "Button height", value: "56", swift: "Theme.buttonHeight", role: "Primary pill buttons." },
  { name: "Compact button", value: "38", swift: "PillButton(compact:)", role: "Drawn height; the target is still 44." },
  { name: "Touch target", value: "44 × 44", swift: ".frame(minHeight: 44)", role: "The HIG minimum, for every control, whatever is drawn." },
  { name: "Screen gutter", value: "24", swift: "TopBar", role: "Horizontal padding at the screen edge." },
  { name: "Hairline", value: "1", swift: "strokeBorder(lineWidth: 1)", role: "Outlines on buttons and cards." },
  { name: "Key outline", value: "3", swift: "Theme.keyOutlineWidth", role: "The outline drawn on a bilah in the overlay." },
];
