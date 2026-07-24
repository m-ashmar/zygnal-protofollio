/**
 * Decorative concentric signal rings — a subtle callback to the hero's
 * "network goes live" moment. Purely ornamental; sits behind content.
 */
export default function SignalRings({
  className = "",
  size = 460,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="relative h-full w-full">
        {[0, 1.5, 3, 4.5].map((delay, i) => (
          <span
            key={i}
            className="signal-ring"
            style={{ animationDelay: `${delay}s` }}
          />
        ))}
        <span className="glow-dot absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan" />
      </div>
    </div>
  );
}
