import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DoDont } from "@/components/do-dont";
import { PageHeader, SectionTitle } from "@/components/page-header";
import { principles } from "@/content/principles";

export const dynamicParams = false;

export function generateStaticParams() {
  return principles.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/principles/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = principles.find((x) => x.slug === slug);
  return { title: p?.title, description: p?.summary };
}

export default async function Principle({ params }: PageProps<"/principles/[slug]">) {
  const { slug } = await params;
  const index = principles.findIndex((x) => x.slug === slug);
  if (index < 0) notFound();
  const p = principles[index];
  const next = principles[(index + 1) % principles.length];

  return (
    <article>
      <PageHeader eyebrow={`Principle ${index + 1} of ${principles.length}`} title={p.title}>
        {p.intro}
      </PageHeader>

      <SectionTitle>Guidelines</SectionTitle>
      <ol className="mt-6 max-w-3xl space-y-8">
        {p.guidelines.map((g, i) => (
          <li key={g.title} className="grid grid-cols-[2.5rem_1fr] gap-x-2">
            <span className="font-display text-3xl leading-none text-gold/50">{i + 1}</span>
            <div>
              <h3 className="text-lg font-semibold text-gold">{g.title}</h3>
              <p className="mt-2 leading-relaxed">{g.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <SectionTitle>In practice</SectionTitle>
      <DoDont dos={p.do} donts={p.dont} />

      <Link
        href={`/principles/${next.slug}/`}
        className="mt-16 flex items-center justify-between rounded-kotek border border-gold/10 p-6 hover:border-gold/40"
      >
        <span className="text-sm">Next principle</span>
        <span className="font-display text-2xl tracking-wide text-gold uppercase">{next.title} →</span>
      </Link>
    </article>
  );
}
