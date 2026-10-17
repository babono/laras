import { LinkCard } from "@/components/link-card";
import { MotifBand } from "@/components/motif-band";
import { components } from "@/content/components";
import { foundations } from "@/content/nav";
import { principles } from "@/content/principles";

export default function Home() {
  return (
    <>
      <section className="max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">The Kotek design system</p>
        <h1 className="mt-3 font-display text-7xl leading-[0.85] text-gold uppercase sm:text-8xl">Laras</h1>
        <p className="mt-4 text-xl leading-relaxed">
          In gamelan, <em className="text-gold not-italic">laras</em> is the tuning an ensemble shares. Every instrument in
          a set is forged to the same scale, so that two players&apos; halves of a kotekan lock into one line.
        </p>
        <p className="mt-4 text-lg leading-relaxed">
          Laras is the same thing for Kotek: the principles, foundations and components every screen is tuned to, so the
          app sounds like one instrument wherever you are in it.
        </p>
      </section>

      <div className="-mx-4 mt-12 sm:-mx-6 lg:mx-0 lg:rounded-kotek">
        <MotifBand height={200} />
      </div>

      <section className="mt-14 grid gap-5 md:grid-cols-3">
        <LinkCard href="/principles/" title="Principles">
          {principles.length} ideas every decision is checked against: {principles.map((p) => p.title).join(", ")}.
        </LinkCard>
        <LinkCard href="/foundations/" title="Foundations">
          The tokens underneath everything: {foundations.map((f) => f.title.toLowerCase()).join(", ")}.
        </LinkCard>
        <LinkCard href="/components/" title="Components">
          {components.length} building blocks from the app, with their specs and how to use them.
        </LinkCard>
      </section>

      <section className="mt-16 max-w-3xl rounded-kotek border border-gold/10 p-6">
        <h2 className="font-display text-2xl tracking-wide text-gold uppercase">Where the truth lives</h2>
        <p className="mt-3 leading-relaxed">
          The iOS app is the source. Colors are read from its asset catalog by{" "}
          <code className="text-gold">npm run sync-tokens</code>, so this site is painted with exactly the values it
          documents. Type sizes, spacing and component specs are taken from <code className="text-gold">Theme.swift</code>{" "}
          and <code className="text-gold">Components.swift</code>; when those change, update the matching file in{" "}
          <code className="text-gold">src/tokens</code> or <code className="text-gold">src/content</code>.
        </p>
      </section>
    </>
  );
}
