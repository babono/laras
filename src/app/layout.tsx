import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { CSSProperties } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Sidebar } from "@/components/sidebar";
import { palette } from "@/tokens/colors";
import "./globals.css";

/** The app's display face, the same file the iOS app bundles. */
const katibeh = localFont({
  variable: "--font-katibeh",
  display: "swap",
  src: "./fonts/Katibeh-Regular.ttf",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://laras.kotek.app"),
  title: { default: "Laras · Kotek design system", template: "%s · Laras" },
  description: "Laras is the design system behind Kotek: the principles, foundations and components every screen is tuned to.",
  openGraph: { type: "website", url: "https://laras.kotek.app", siteName: "Laras" },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: palette.ground,
};

const tokens = {
  "--ground": palette.ground,
  "--pattern": palette.pattern,
  "--card": palette.card,
  "--gold": palette.gold,
  "--description": palette.description,
  "--fill": palette.fill,
  "--on-fill": palette.onFill,
  "--progress": palette.progress,
} as CSSProperties;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={katibeh.variable} style={tokens}>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-kotek focus:bg-fill focus:px-4 focus:py-2 focus:text-on-fill"
        >
          Skip to content
        </a>
        <SiteHeader />
        <div className="mx-auto flex w-full max-w-7xl gap-10 px-4 sm:px-6 lg:px-8">
          <Sidebar />
          <main id="main" className="min-w-0 flex-1 pt-8 pb-24">
            {children}
          </main>
        </div>
        <SiteFooter />
      </body>
    </html>
  );
}
