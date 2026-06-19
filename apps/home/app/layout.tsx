import type { Metadata } from "next";
import "@latesight/ui/brand-system.css";
import { sharedSiteIcons } from "@latesight/ui/site-metadata";
import { SiteFooter } from "@latesight/ui/site-footer";
import { SiteHeader } from "@latesight/ui/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Latesight",
  description: "A personal hub for focused web tools.",
  icons: sharedSiteIcons
};

const headerLinks = [
  { label: "Index", href: "#index" },
  { label: "Sites", href: "#sites" },
  { label: "About", href: "#about" },
  { label: "Dictionary", href: "https://dict.latesight.com" }
];

const footerLinks = [
  { label: "Main", href: "/" },
  { label: "Dictionary", href: "https://dict.latesight.com" },
  { label: "Status", href: "#sites" },
  { label: "Docs", href: "#about" }
];

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="site-shell">
          <SiteHeader
            siteLabel="Latesight Network"
            sectionLabel="Index"
            links={headerLinks}
            logoHref="/"
          />
          {children}
          <SiteFooter
            summary="Latesight is a personal network of focused tools and compact information sites."
            legal="Copyright © 2026 Latesight. All rights reserved."
            links={footerLinks}
          />
        </div>
      </body>
    </html>
  );
}
