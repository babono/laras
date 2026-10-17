export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <header className="max-w-3xl">
      <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">{eyebrow}</p>
      <h1 className="mt-3 font-display text-5xl leading-[1.05] text-gold sm:text-6xl">{title}</h1>
      {children && <div className="mt-5 text-lg leading-relaxed">{children}</div>}
    </header>
  );
}

export function SectionTitle({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mt-16 font-display text-3xl tracking-wide text-gold uppercase">
      {children}
    </h2>
  );
}
