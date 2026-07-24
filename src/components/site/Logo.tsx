/**
 * Zygnal wordmark. Rendered as a CSS mask filled with `currentColor`, so the
 * logo inherits the surrounding text color and adapts to light/dark + the
 * dark hero automatically (no separate light/dark asset needed).
 */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Zygnal LLC"
      className={`inline-block bg-current ${className}`}
      style={{
        aspectRatio: "1600 / 419",
        WebkitMaskImage: "url(/brand/zygnal-logo.png)",
        maskImage: "url(/brand/zygnal-logo.png)",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
