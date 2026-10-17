import type { Metadata } from "next";
import { LinkCard } from "@/components/link-card";
import { PageHeader } from "@/components/page-header";
import { principles } from "@/content/principles";

export const metadata: Metadata = { title: "Principles" };

export default function Principles() {
  return (
    <>
      <PageHeader eyebrow="Principles" title="How we decide">
        Four ideas every screen is checked against. When two of them pull in different directions, the player standing at
        the instrument decides.
      </PageHeader>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {principles.map((p) => (
          <LinkCard key={p.slug} href={`/principles/${p.slug}/`} title={p.title}>
            {p.summary}
          </LinkCard>
        ))}
      </div>
    </>
  );
}
