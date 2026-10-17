import Link from "next/link";

export function LinkCard({ href, title, children }: { href: string; title: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group block rounded-kotek border border-gold/10 bg-card p-6 transition-colors hover:border-gold/40"
    >
      <h3 className="font-display text-2xl tracking-wide text-gold uppercase">{title}</h3>
      <div className="mt-2 text-[15px] leading-relaxed">{children}</div>
      <p className="mt-4 text-sm font-semibold text-gold">
        Read more <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span>
      </p>
    </Link>
  );
}
