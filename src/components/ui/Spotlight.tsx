"use client";

import { useRef, type ReactNode } from "react";

/**
 * Card wrapper with a cursor-following radial glow and corner brackets
 * that snap in on hover. Echoes the hero's technical, "instrument" feel.
 */
export default function Spotlight({
  children,
  className = "",
  brackets = true,
  glowBorder = false,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  brackets?: boolean;
  glowBorder?: boolean;
  as?: "div" | "article" | "li" | "a";
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Comp = Tag as any;
  return (
    <Comp
      ref={ref}
      onMouseMove={onMove}
      className={`spot ${glowBorder ? "glow-border" : ""} ${className}`}
    >
      {children}
      {brackets && (
        <>
          <span className="brk-corner brk-tl" />
          <span className="brk-corner brk-tr" />
          <span className="brk-corner brk-bl" />
          <span className="brk-corner brk-br" />
        </>
      )}
    </Comp>
  );
}
