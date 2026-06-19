type SiteCardProps = {
  name: string;
  domain: string;
  description: string;
  status: string;
};

export function SiteCard({
  name,
  domain,
  description,
  status
}: SiteCardProps) {
  return (
    <article className="surface-panel">
      <p className="meta-label">{status}</p>
      <h3
        style={{
          margin: "10px 0 8px",
          fontSize: "1.45rem",
          letterSpacing: "-0.03em"
        }}
      >
        {name}
      </h3>
      <p
        style={{
          margin: 0,
          color: "var(--color-muted)",
          lineHeight: "var(--leading-body)"
        }}
      >
        {description}
      </p>
      <p
        style={{
          margin: "18px 0 0",
          color: "var(--color-accent-blue)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.88rem"
        }}
      >
        {domain}
      </p>
    </article>
  );
}
