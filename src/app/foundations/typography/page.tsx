import type { Metadata } from "next";
import { PageHeader, SectionTitle } from "@/components/page-header";
import { faces, typeScale } from "@/tokens/typography";

export const metadata: Metadata = { title: "Typography" };

export default function Typography() {
  return (
    <>
      <PageHeader eyebrow="Foundations" title="Typography">
        Two faces with two jobs. Katibeh is the voice: titles, headings and big numerals. SF Pro is the interface:
        everything a player reads to operate the app.
      </PageHeader>

      <SectionTitle>Typefaces</SectionTitle>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {faces.map((f) => (
          <div key={f.name} className="rounded-kotek border border-gold/10 bg-card p-6">
            <p className="text-gold" style={{ fontFamily: f.css, fontSize: 64, lineHeight: 1 }}>
              Aa
            </p>
            <h3 className="mt-4 text-xl font-semibold text-gold">{f.name}</h3>
            <code className="text-sm text-gold/80">{f.swift}</code>
            <p className="mt-3 leading-relaxed">{f.role}</p>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed">
              {f.notes.map((n) => (
                <li key={n} className="flex gap-3">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-gold/60" />
                  {n}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <SectionTitle>Scale</SectionTitle>
      <p className="mt-3 max-w-3xl leading-relaxed">
        Sizes are in points in the app and pixels here. The app writes sizes directly, so these names are Laras&apos;s;
        the uses column counts how many call sites set each size today.
      </p>
      <div className="mt-6 divide-y divide-gold/10 rounded-kotek border border-gold/10">
        {typeScale.map((t) => (
          <div key={t.name} className="grid gap-3 p-5 md:grid-cols-[180px_1fr] md:items-center">
            <div className="text-sm">
              <p className="font-semibold text-gold">{t.name}</p>
              <p className="mt-1 font-mono text-xs">
                {t.face === "display" ? "Katibeh" : "SF Pro"} {t.size} · {t.weight}
                {t.tracking ? ` · ${t.tracking} track` : ""}
              </p>
              <p className="mt-1 font-mono text-xs text-gold/70">{t.swift}</p>
              {t.uses && <p className="mt-1 text-xs">{t.uses} uses</p>}
            </div>
            <div className="min-w-0">
              <p
                className={`truncate text-gold ${t.uppercase ? "uppercase" : ""}`}
                style={{
                  fontFamily: t.face === "display" ? "var(--font-display)" : "var(--font-text)",
                  fontSize: t.size,
                  fontWeight: t.weight,
                  letterSpacing: t.tracking,
                  lineHeight: 1.2,
                }}
              >
                {t.sample}
              </p>
              <p className="mt-1 text-sm">{t.role}</p>
            </div>
          </div>
        ))}
      </div>

      <SectionTitle>Rules</SectionTitle>
      <ul className="mt-6 max-w-3xl space-y-3 leading-relaxed">
        <li><strong className="text-gold">Never below 11.</strong> Caption 2 is the smallest size iOS allows; Font.sans clamps anything smaller.</li>
        <li><strong className="text-gold">Buttons are Black.</strong> Heavy, short and tracked 1.5, so an uppercase word doesn&apos;t set solid.</li>
        <li><strong className="text-gold">Eyebrows are tracked 2.5.</strong> Uppercase SF at 12 semibold, above a group, never as a screen title.</li>
        <li><strong className="text-gold">Titles are Katibeh, interface is SF.</strong> A back link or a step counter is interface, even inside the top bar.</li>
        <li><strong className="text-gold">Symbols use symbol metrics.</strong> SF Symbols take Font.symbol, not a text size that happens to be nearby, so icons sit level with their labels.</li>
      </ul>
    </>
  );
}
