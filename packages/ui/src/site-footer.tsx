type FooterLink = {
  label: string;
  href: string;
};

type SiteFooterProps = {
  summary: string;
  legal: string;
  links: FooterLink[];
};

export function SiteFooter({ summary, legal, links }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__meta">
          <div>{summary}</div>
          <div>{legal}</div>
        </div>
        <nav className="site-footer__links" aria-label="Footer">
          {links.map((link) => (
            <a key={link.href} className="footer-link" href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
