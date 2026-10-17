import Link from "next/link";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-gold/10 bg-ground/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-3xl leading-none tracking-wide text-gold uppercase">Laras</span>
          <span className="text-xs text-body">by Kotek</span>
        </Link>
        <nav aria-label="Sections" className="ml-auto hidden items-center gap-6 text-sm md:flex">
          <Link href="/principles/" className="hover:text-gold">Principles</Link>
          <Link href="/foundations/" className="hover:text-gold">Foundations</Link>
          <Link href="/components/" className="hover:text-gold">Components</Link>
          <a href="https://kotek.app" className="text-gold hover:underline">kotek.app ↗</a>
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
