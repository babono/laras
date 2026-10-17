import type { Metadata } from "next";
import { LinkCard } from "@/components/link-card";
import { PageHeader } from "@/components/page-header";
import { foundations } from "@/content/nav";

export const metadata: Metadata = { title: "Foundations" };

export default function Foundations() {
  return (
    <>
      <PageHeader eyebrow="Foundations" title="The tuning underneath">
        Color, type and space are the values every component is built from. Components never invent their own.
      </PageHeader>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {foundations.map((f) => (
          <LinkCard key={f.slug} href={`/foundations/${f.slug}/`} title={f.title}>
            {f.summary}
          </LinkCard>
        ))}
      </div>
    </>
  );
}
