import type { CSSProperties } from "react";

const loaderDotColors = [
  "#f28cb7",
  "#ffb73b",
  "#9edb46",
  "#74d9c6",
  "#86b8ff",
  "#a384f5",
  "#ff6f8c"
] as const;

export function SiteLoader() {
  return (
    <div className="site-loader" role="status" aria-live="polite" aria-label="Loading">
      <div className="site-loader__track" aria-hidden="true">
        {loaderDotColors.map((color, index) => (
          <span
            key={color}
            className="site-loader__dot"
            style={
              {
                "--loader-dot-color": color,
                "--loader-dot-delay": `${index * 120}ms`
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
