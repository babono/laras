import type { Metadata } from "next";
import { CopyButton } from "@/components/copy-button";
import { PageHeader, SectionTitle } from "@/components/page-header";
import { contrast, grade } from "@/lib/contrast";
import { colorGroups, palette, type ColorToken } from "@/tokens/colors";

export const metadata: Metadata = { title: "Colors" };

/** `fg` laid over `bg` at `alpha`, as the app sets text at an opacity. */
function over(fg: string, bg: string, alpha: number) {
  const f = parseInt(fg.slice(1), 16);
  const b = parseInt(bg.slice(1), 16);
  const mix = (shift: number) =>
    Math.round(((f >> shift) & 255) * alpha + ((b >> shift) & 255) * (1 - alpha))
      .toString(16)
      .padStart(2, "0");
  return `#${mix(16)}${mix(8)}${mix(0)}`.toUpperCase();
}

const pairs = [
  { label: "Title text on the ground", fg: palette.gold, bg: palette.ground },
  { label: "Title text on a card", fg: palette.gold, bg: palette.card },
  { label: "Title text at 75%, as descriptions are set", fg: over(palette.gold, palette.ground, 0.75), bg: palette.ground },
  { label: "Title text at 62%, on a settings card", fg: over(palette.gold, palette.card, 0.62), bg: palette.card },
  { label: "Description text on the ground", fg: palette.description, bg: palette.ground },
  { label: "Description text on a card", fg: palette.description, bg: palette.card },
  { label: "Label on the filled button", fg: palette.onFill, bg: palette.fill },
  { label: "Proposed description #A08470 on the ground", fg: "#A08470", bg: palette.ground, proposal: true },
];

export default function Colors() {
  return (
    <>
      <PageHeader eyebrow="Foundations" title="Colors">
        Gold on brown, and color beyond it only where it means something: which half you are playing, and how a strike
        landed. Asset colors are synced from the app; the rest are copied from Theme.swift and marked as such.
      </PageHeader>

      {colorGroups.map((group) => (
        <section key={group.title}>
          <SectionTitle>{group.title}</SectionTitle>
          <p className="mt-3 max-w-3xl leading-relaxed">{group.intro}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {group.tokens.map((t) => (
              <Swatch key={t.name} token={t} />
            ))}
          </div>
        </section>
      ))}

      <SectionTitle id="contrast">Contrast</SectionTitle>
      <p className="mt-3 max-w-3xl leading-relaxed">
        WCAG asks 4.5:1 for body text and 3:1 for large text (24px, or 19px bold) and interface parts. Description text
        fails on both surfaces, and it sets supporting text across the app (through Theme.stone and Theme.inkStone too),
        so it is the most important contrast issue open. The designer&apos;s proposed replacement is in the last row.
      </p>
      <div className="mt-6 overflow-x-auto rounded-kotek border border-gold/10">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-card text-xs tracking-[0.12em] text-gold uppercase">
            <tr>
              <th className="px-4 py-3 font-semibold">Pair</th>
              <th className="px-4 py-3 font-semibold">Sample</th>
              <th className="px-4 py-3 font-semibold">Ratio</th>
              <th className="px-4 py-3 font-semibold">Result</th>
            </tr>
          </thead>
          <tbody>
            {pairs.map((p) => {
              const ratio = contrast(p.fg, p.bg);
              const g = grade(ratio);
              return (
                <tr key={p.label} className="border-t border-gold/10">
                  <td className="px-4 py-3">
                    {p.label}
                    {p.proposal && <span className="ml-2 rounded bg-gold/15 px-1.5 py-0.5 text-xs text-gold">proposal</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-md px-3 py-1.5" style={{ background: p.bg, color: p.fg }}>
                      Kotekan
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono">{ratio.toFixed(2)}:1</td>
                  <td className={`px-4 py-3 font-semibold ${g === "Fail" ? "text-miss" : g === "AA Large" ? "text-gold" : "text-hit"}`}>
                    {g}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Swatch({ token }: { token: ColorToken }) {
  const onGround = contrast(token.hex, palette.ground);
  return (
    <div className="overflow-hidden rounded-kotek border border-gold/10 bg-card">
      <div className="h-24 border-b border-gold/10" style={{ background: token.hex }} />
      <div className="space-y-2 p-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-semibold text-gold">{token.name}</h3>
          <CopyButton value={token.hex} label={`${token.name} ${token.hex}`} />
        </div>
        <p className="text-sm leading-relaxed">{token.role}</p>
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <code className="text-gold/80">{token.swift}</code>
          <span className="rounded bg-ground px-1.5 py-0.5">
            {token.unused ? "unused" : token.source === "asset" ? "asset catalog" : token.source === "artwork" ? "artwork" : "Theme.swift"}
          </span>
          <span className="rounded bg-ground px-1.5 py-0.5" title="Contrast against Background">
            {onGround.toFixed(1)}:1 on ground
          </span>
        </div>
      </div>
    </div>
  );
}
