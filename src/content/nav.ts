import { components } from "./components";
import { principles } from "./principles";

export type NavGroup = { title: string; href: string; items: { title: string; href: string }[] };

export const foundations = [
  { slug: "colors", title: "Colors", summary: "The gold-on-brown palette, the two voices and the colors of a strike." },
  { slug: "typography", title: "Typography", summary: "Katibeh for the voice, SF Pro for the interface, and the scale between them." },
  { slug: "spacing", title: "Spacing", summary: "The steps the app has converged on, and the sizes every control respects." },
];

export const nav: NavGroup[] = [
  {
    title: "Principles",
    href: "/principles/",
    items: principles.map((p) => ({ title: p.title, href: `/principles/${p.slug}/` })),
  },
  {
    title: "Foundations",
    href: "/foundations/",
    items: foundations.map((f) => ({ title: f.title, href: `/foundations/${f.slug}/` })),
  },
  {
    title: "Components",
    href: "/components/",
    items: components.map((c) => ({ title: c.name, href: `/components/${c.slug}/` })),
  },
];
