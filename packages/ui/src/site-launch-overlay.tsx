"use client";

import { SiteLoader } from "./site-loader";

type SiteLaunchOverlayProps = {
  productName: string;
  active: boolean;
};

export function SiteLaunchOverlay({ productName, active }: SiteLaunchOverlayProps) {
  return (
    <div
      className="site-launch-overlay"
      data-active={active ? "true" : "false"}
      aria-hidden={active ? undefined : "true"}
    >
      <div className="site-launch-overlay__inner">
        <p className="site-launch-overlay__eyebrow">Opening</p>
        <h2 className="site-launch-overlay__title">{productName}</h2>
        <SiteLoader />
      </div>
    </div>
  );
}
