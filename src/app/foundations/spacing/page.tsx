import type { Metadata } from "next";
import { PageHeader, SectionTitle } from "@/components/page-header";
import { metrics, offScale, spaceScale } from "@/tokens/spacing";

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
        The steps the app has converged on, counted across its views. Most sit on a 4-point grid; 10 and 14 are the
        app&apos;s two in-betweens, for the gap inside controls and padding that matches the 14-point corner radius.
      </p>
      <div className="mt-6 divide-y divide-gold/10 rounded-kotek border border-gold/10">
        {spaceScale.map((s) => (
          <div key={s.token} className="grid items-center gap-3 p-4 sm:grid-cols-[120px_80px_1fr]">
            <code className="text-sm text-gold">{s.token}</code>
            <span className="font-mono text-sm">{s.value}pt</span>
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <span className="h-4 shrink-0 rounded-sm bg-gold" style={{ width: s.value * 2 }} />
                <span className="h-1 rounded-full bg-gold/25" style={{ width: `${(s.uses / most) * 100}%`, maxWidth: 160 }} />
                <span className="text-xs whitespace-nowrap">{s.uses} uses</span>
              </div>
              <p className="mt-2 text-sm">{s.role}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed">
        Off the scale but in use: {offScale.map((v) => `${v}`).join(", ")}. Move them to the nearest step when you next
        touch them.
      </p>

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
