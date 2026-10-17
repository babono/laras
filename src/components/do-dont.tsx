export function DoDont({ dos, donts }: { dos: string[]; donts: string[] }) {
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      <List title="Do" items={dos} tone="border-hit text-hit" />
      <List title="Don't" items={donts} tone="border-miss text-miss" />
    </div>
  );
}

function List({ title, items, tone }: { title: string; items: string[]; tone: string }) {
  return (
    <div className="rounded-kotek bg-card p-5">
      <p className={`border-l-4 pl-3 text-sm font-black tracking-[0.1em] uppercase ${tone}`}>{title}</p>
      <ul className="mt-4 space-y-3 text-[15px] leading-relaxed">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold/60" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
