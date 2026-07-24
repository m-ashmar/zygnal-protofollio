"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a numeric value up when it scrolls into view. Non-numeric values
 * (e.g. "Nationwide") are rendered as-is. Supports a prefix/suffix parsed
 * from the raw string, so "15+" animates 0→15 and keeps the "+".
 */
export default function CountUp({
  value,
  duration = 1400,
  className = "",
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  const numeric = !!match;
  const prefix = match?.[1] ?? "";
  const target = match ? parseFloat(match[2]) : 0;
  const decimals = match?.[2].includes(".") ? 1 : 0;
  const suffix = match?.[3] ?? "";

  const [display, setDisplay] = useState(numeric ? `${prefix}0${suffix}` : value);

  useEffect(() => {
    if (!numeric) return;
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(value);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              const current = (target * eased).toFixed(decimals);
              setDisplay(`${prefix}${current}${suffix}`);
              if (t < 1) requestAnimationFrame(tick);
              else setDisplay(value);
            };
            requestAnimationFrame(tick);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [numeric, value, prefix, suffix, target, decimals, duration]);

  return (
    <span ref={ref} className={`tabular ${className}`}>
      {display}
    </span>
  );
}
