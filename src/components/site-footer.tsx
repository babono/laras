export function SiteFooter() {
  return (
    <footer className="border-t border-gold/10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-8 text-sm text-body sm:px-6 lg:px-8">
        <p>
          <span className="font-display text-lg text-gold uppercase">Laras</span> is the design system behind{" "}
          <a href="https://kotek.app" className="text-gold hover:underline">Kotek</a>.
        </p>
        <p>Tokens synced from the iOS app&apos;s asset catalog.</p>
      </div>
    </footer>
  );
}
