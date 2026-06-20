import { PageShell } from "@latesight/ui/page-shell";
import { SiteLaunchLink } from "./site-launch-link";

export default function HomePage() {
  return (
    <PageShell>
      <section className="page-section" id="sites">
        <div className="hero-panel">
          <SiteLaunchLink
            href="https://dict.latesight.com"
            productName="Word Lens"
            domain="dict.latesight.com"
          />
        </div>
      </section>
    </PageShell>
  );
}
