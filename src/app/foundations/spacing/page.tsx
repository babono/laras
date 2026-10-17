import type { Metadata } from "next";
import { PageHeader, SectionTitle } from "@/components/page-header";
import { halfStep, metrics, offScale, spaceScale } from "@/tokens/spacing";

export const metadata: Metadata = { title: "Spacing" };

export default function Spacing() {
  const most = Math.max(...spaceScale.map((s) => s.uses));
  return (
    <>
      <PageHeader eyebrow="Foundations" title="Spacing">
        Space is the structure. There are no rules between sections: on a dark ground with room between cards, space
        already draws every boundary a line would.
      </PageHeader>

      <SectionTitle>Scale</SectionTitle>
      <p className="mt-3 max-w-3xl leading-relaxed">
        An 8-point grid, from 8 to 64. Every space between and inside elements is one of these steps; {halfStep.value}{" "}
        is a half step, for the tightest pairs only, like an icon and its label. The bars show how often the app
        uses each step today.
      </p>
      <div className="mt-6 divide-y divide-gold/10 rounded-kotek border border-gold/10">
        {spaceScale.map((s) => (
          <div key={s.token} className="grid items-center gap-3 p-4 sm:grid-cols-[120px_80px_1fr]">
            <code className="text-sm text-gold">{s.token}</code>
            <span className="font-mono text-sm">{s.value}pt</span>
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <span className="h-4 shrink-0 rounded-sm bg-gold" style={{ width: s.value * 2 }} />
                <span className="h-1 rounded-full bg-gold/25" style={{ width: `${(s.uses / most) * 160}px` }} />
                <span className="text-xs whitespace-nowrap">{s.uses} uses</span>
              </div>
              <p className="mt-2 text-sm">{s.role}</p>
            </div>
          </div>
        ))}
      </div>
      <h3 className="mt-10 text-lg font-semibold text-gold">Off the grid, in the app today</h3>
      <p className="mt-2 max-w-3xl leading-relaxed">
        The app grew before the grid. Move these to the nearest step when you next touch the screen they&apos;re on.
      </p>
      <div className="mt-4 overflow-x-auto rounded-kotek border border-gold/10">
        <table className="w-full min-w-[420px] text-left text-sm">
          <thead className="bg-card text-xs tracking-[0.12em] text-gold uppercase">
            <tr>
              <th className="px-4 py-3 font-semibold">Value</th>
              <th className="px-4 py-3 font-semibold">Uses</th>
              <th className="px-4 py-3 font-semibold">Move to</th>
            </tr>
          </thead>
          <tbody>
            {offScale.map((o) => (
              <tr key={o.value} className="border-t border-gold/10">
                <td className="px-4 py-2.5 font-mono">{o.value}</td>
                <td className="px-4 py-2.5">{o.uses}</td>
                <td className="px-4 py-2.5 font-mono">{o.to}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SectionTitle>Sizes</SectionTitle>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.name} className="rounded-kotek border border-gold/10 bg-card p-5">
            <p className="font-display text-4xl text-gold">{m.value}</p>
            <h3 className="mt-2 font-semibold text-gold">{m.name}</h3>
            <code className="text-xs text-gold/70">{m.swift}</code>
            <p className="mt-2 text-sm leading-relaxed">{m.role}</p>
          </div>
        ))}
      </div>

      <SectionTitle>Concentric corners</SectionTitle>
      <div className="mt-6 flex flex-wrap items-center gap-10 rounded-kotek border border-gold/10 p-6">
        <div className="relative size-48 shrink-0 rounded-[24px] bg-card p-4" aria-hidden>
          <div className="size-full rounded-[8px] bg-gold/20" />
          <span className="absolute top-1 left-1/2 -translate-x-1/2 font-mono text-[10px]">16</span>
        </div>
        <p className="max-w-xl leading-relaxed">
          A shape inside another shares its center of curvature: its radius is the outer radius minus the padding
          between them. A card with radius 24 and padding 16 gives what&apos;s inside it radius 8. This is how iOS draws
          its own nested shapes, and SwiftUI can do the arithmetic itself with <code className="text-gold">ConcentricRectangle</code>{" "}
          and <code className="text-gold">containerShape(_:)</code>.
        </p>
      </div>

      <SectionTitle>Touch targets</SectionTitle>
      <div className="mt-6 flex flex-wrap items-end gap-10 rounded-kotek border border-gold/10 p-6">
        <figure className="text-center">
          <div className="grid h-11 w-28 place-items-center rounded-md border border-dashed border-gold/60">
            <span className="h-[38px] w-24 shrink-0 rounded-kotek bg-gold/15" />
          </div>
          <figcaption className="mt-3 text-xs">44pt target, 38pt drawn</figcaption>
        </figure>
        <p className="max-w-xl leading-relaxed">
          Every control gets at least 44 × 44 points to land on, whatever it draws. Players reach for the screen while
          standing over an instrument holding a mallet, which is not the moment for a six-point miss.
        </p>
      </div>
    </>
  );
}
