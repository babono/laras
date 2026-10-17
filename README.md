# Laras

The Kotek design system, published at **laras.kotek.app**. In gamelan, *laras* is the tuning an
ensemble shares; this is the tuning every Kotek screen shares.

- **Principles:** Consistency, Usability, Accessibility, Aesthetics
- **Foundations:** Colors, Typography, Spacing
- **Components:** replicas of the shared SwiftUI components, with specs and usage

## Develop

```sh
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in out/
```

Next.js with `output: "export"`: every page is prerendered to plain HTML in `out/`, so any static
host can serve it. There is no server.

## Where the values come from

The iOS app (`babono/gomelan`) is the source of truth.

| What | Source in the app | Here |
|---|---|---|
| Asset colors | `Kotek/Resources/Assets.xcassets/*.colorset` | `src/tokens/catalog.json`, written by `npm run sync-tokens` |
| Literal colors (voices, judgement, colotomic) | `Kotek/Core/UI/Theme.swift` | `src/tokens/colors.ts`, by hand |
| Type scale, faces | `Theme.swift` (`Font.serif`, `Font.sans`) | `src/tokens/typography.ts` |
| Spacing, sizes | inline values across the views, `Theme.radius` | `src/tokens/spacing.ts` |
| Components | `Kotek/Core/UI/Components.swift` | `src/content/components.ts`, `src/components/previews.tsx` |
| Katibeh | `Kotek/Resources/font/Katibeh-Regular.ttf` (OFL) | `src/app/fonts/` |

After a color changes in Xcode:

```sh
GOMELAN=~/Dev/gomelan npm run sync-tokens   # defaults to ~/Dev/gomelan
```

The site paints itself from the same tokens (`layout.tsx` sets the CSS variables from
`src/tokens/colors.ts`), so a synced color changes both the docs and the page they're on.

## Deploy

Build, then serve `out/` from the `laras` subdomain of kotek.app. On Vercel: import this repo as a
new project (framework preset Next.js; the static export is detected), then add the domain
`laras.kotek.app` and the CNAME record Vercel asks for at the DNS provider.
