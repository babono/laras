import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DoDont } from "@/components/do-dont";
import { PageHeader, SectionTitle } from "@/components/page-header";
import { Preview } from "@/components/previews";
import { StatusBadge } from "@/components/status-badge";
import { components } from "@/content/components";

export const dynamicParams = false;

export function generateStaticParams() {
  return components.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/components/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = components.find((x) => x.slug === slug);
  return { title: c?.name, description: c?.summary };
}

export default async function ComponentPage({ params }: PageProps<"/components/[slug]">) {
  const { slug } = await params;
  const c = components.find((x) => x.slug === slug);
  if (!c) notFound();

  return (
    <article>
      <PageHeader eyebrow="Component" title={c.name}>
        {c.summary}
      </PageHeader>
      <p className="mt-4 text-sm">
        {c.status === "designed" ? (
          <StatusBadge />
        ) : (
          <>
            <code className="text-gold">{c.swift}</code> in <code className="text-gold/80">Kotek/{c.file}</code>
          </>
        )}
      </p>

      <SectionTitle>Preview</SectionTitle>
      <div className="mt-6 space-y-4">
        {c.variants.map((v) => (
          <figure key={v.id} className="overflow-hidden rounded-kotek border border-gold/10">
            {/* Wider-than-phone previews (the landscape top bar) scroll here rather than squash. */}
            <div className="overflow-x-auto bg-ground">
              <div className="flex min-h-40 w-max min-w-full items-center justify-center p-8">
                <Preview id={`${c.slug}/${v.id}`} />
              </div>
            </div>
            <figcaption className="border-t border-gold/10 bg-card px-5 py-3 text-sm">
              <span className="font-semibold text-gold">{v.label}</span>
              {v.note && <span> · {v.note}</span>}
            </figcaption>
          </figure>
        ))}
      </div>

      <SectionTitle>Specs</SectionTitle>
      <dl className="mt-6 divide-y divide-gold/10 rounded-kotek border border-gold/10">
        {c.specs.map(([k, v]) => (
          <div key={k} className="grid gap-1 px-5 py-3 sm:grid-cols-[200px_1fr]">
            <dt className="text-sm font-semibold text-gold">{k}</dt>
            <dd className="text-sm leading-relaxed">{v}</dd>
          </div>
        ))}
      </dl>

      {c.guidance && (
        <>
          <SectionTitle>Guidance</SectionTitle>
          <ol className="mt-6 max-w-3xl space-y-7">
            {c.guidance.map((g) => (
              <li key={g.title}>
                <h3 className="text-lg font-semibold text-gold">{g.title}</h3>
                <p className="mt-2 leading-relaxed">{g.body}</p>
                {g.source && (
                  <a href={g.source.href} className="mt-2 inline-block text-sm text-gold underline-offset-2 hover:underline">
                    {g.source.label} ↗
                  </a>
                )}
              </li>
            ))}
          </ol>
        </>
      )}

      <SectionTitle>Usage</SectionTitle>
      <DoDont dos={c.do} donts={c.dont} />
    </article>
  );
}
