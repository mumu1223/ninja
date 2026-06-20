import type { CSSProperties } from "react";

const loaderDotColors = [
  "#ff5ca8",
  "#ffad1f",
  "#94d800",
  "#2fd6ba",
  "#4f98ff",
  "#8f63ff",
  "#ff466c"
] as const;

export function SiteLoader() {
  return (
    <div className="site-loader" role="status" aria-live="polite" aria-label="Loading">
      <div
        className="site-loader__track"
        aria-hidden="true"
        style={
          {
            "--loader-dot-count": loaderDotColors.length
          } as CSSProperties
        }
      >
        {loaderDotColors.map((color, index) => (
          <span
            key={color}
            className="site-loader__dot"
            style={
              {
                "--loader-dot-color": color,
                "--loader-dot-index": index,
                "--loader-dot-delay": `${index * 90}ms`
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
