"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/content/nav";

/** The section tree, shared by the sidebar and the mobile menu. */
export function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const path = usePathname();
  return (
    <div className="space-y-7">
      {nav.map((group) => (
        <div key={group.href}>
          <Link
            href={group.href}
            onClick={onNavigate}
            className="text-xs font-semibold tracking-[0.18em] text-gold uppercase hover:underline"
          >
            {group.title}
          </Link>
          <ul className="mt-3 space-y-0.5 border-l border-gold/15">
            {group.items.map((item) => {
              const active = path === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={`-ml-px block border-l py-1.5 pl-4 text-sm ${
                      active ? "border-gold text-gold" : "border-transparent hover:border-gold/40 hover:text-gold"
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
