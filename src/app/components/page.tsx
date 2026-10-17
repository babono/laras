import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/components/previews";
import { components } from "@/content/components";

export const metadata: Metadata = { title: "Components" };

export default function Components() {
  return (
    <>
      <PageHeader eyebrow="Components" title="Building blocks">
        The shared components in the app&apos;s Core/UI. Each is shown here as a web replica built from the same
        numbers. Use them before building something new, and promote a component here only once a second screen needs
        it.
      </PageHeader>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {components.map((c) => (
          <Link
            key={c.slug}
            href={`/components/${c.slug}/`}
            className="group overflow-hidden rounded-kotek border border-gold/10 bg-card transition-colors hover:border-gold/40"
          >
            <div className="pointer-events-none grid min-h-44 place-items-center overflow-hidden bg-ground p-6" inert>
              <Preview id={`${c.slug}/${c.variants[0].id}`} />
            </div>
            <div className="p-5">
              <h2 className="font-display text-2xl tracking-wide text-gold uppercase">{c.name}</h2>
              <p className="mt-1 text-[15px] leading-relaxed">{c.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
