import type { Metadata } from "next";
import "@latesight/ui/brand-system.css";
import { sharedSiteIcons } from "@latesight/ui/site-metadata";
import { SiteFooter } from "@latesight/ui/site-footer";
import { SiteHeader } from "@latesight/ui/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "LateSight > Word Lens",
  description: "A focused dictionary and word lookup site.",
  icons: sharedSiteIcons
};

const headerLinks = [
  { label: "Lookup", href: "#lookup" },
  { label: "Main Site", href: "https://latesight.com" }
];

const footerLinks = [
  { label: "LateSight", href: "https://latesight.com" },
  { label: "Dictionary", href: "/" },
  { label: "Lookup", href: "#lookup" }
];

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="site-shell">
          <SiteHeader
            sectionKey="dict"
            titleCurrent="Word Lens"
            links={headerLinks}
            logoHref="https://latesight.com"
          />
          {children}
          <SiteFooter
            legal="Copyright © 2026 LateSight. All rights reserved."
            links={footerLinks}
          />
        </div>
      </body>
    </html>
  );
}
