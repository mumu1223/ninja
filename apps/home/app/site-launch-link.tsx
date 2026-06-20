"use client";

import { SiteLaunchOverlay } from "@latesight/ui/site-launch-overlay";
import { useState, type MouseEvent } from "react";

type SiteLaunchLinkProps = {
  href: string;
  productName: string;
  domain: string;
};

export function SiteLaunchLink({ href, productName, domain }: SiteLaunchLinkProps) {
  const [loading, setLoading] = useState(false);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (
      loading ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    setLoading(true);

    window.setTimeout(() => {
      window.location.href = href;
    }, 180);
  }

  return (
    <>
      <a className="home-site-link" href={href} onClick={handleClick}>
        <h2 className="home-site-title">
          <span className="home-site-title__dot" aria-hidden="true" />
          <span>{productName}</span>
          <span className="home-site-domain">{domain}</span>
        </h2>
      </a>
      <SiteLaunchOverlay productName={productName} active={loading} />
    </>
  );
}
