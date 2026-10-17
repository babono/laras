import { NavLinks } from "./nav-links";

export function Sidebar() {
  return (
    <aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-56 shrink-0 overflow-y-auto py-8 lg:block">
      <nav aria-label="Laras">
        <NavLinks />
      </nav>
    </aside>
  );
}
