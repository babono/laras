"use client";

import { useState } from "react";
import { NavLinks } from "./nav-links";

/** Below the sidebar's breakpoint, the same tree behind a menu button. */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="ml-auto lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(!open)}
        className="flex h-11 items-center gap-2 rounded-kotek border border-gold/30 px-4 text-sm font-semibold text-gold"
      >
        {open ? "Close" : "Menu"}
      </button>
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Laras"
          className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto border-t border-gold/10 bg-ground px-6 py-8"
        >
          <NavLinks onNavigate={() => setOpen(false)} />
        </nav>
      )}
    </div>
  );
}
