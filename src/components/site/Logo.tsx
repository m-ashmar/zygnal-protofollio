/**
 * Zygnal wordmark. Rendered as a CSS mask filled with `currentColor`, so the
 * logo inherits the surrounding text color and adapts to light/dark + the
 * dark hero automatically (no separate light/dark asset needed).
 */
const LOGO_SRC = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/brand/zygnal-logo.png`;

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Zygnal LLC"
      className={`inline-block bg-current ${className}`}
      style={{
        aspectRatio: "1600 / 419",
        WebkitMaskImage: `url(${LOGO_SRC})`,
        maskImage: `url(${LOGO_SRC})`,
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
