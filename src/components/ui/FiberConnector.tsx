"use client";

import { useApp } from "@/components/providers/AppProvider";

/**
 * A short vertical "fiber" between the hero and the content, with a light
 * pulse traveling down it — echoes the hero's fiber/transmission beat.
 */
export default function FiberConnector() {
  const { t } = useApp();
  return (
    <div aria-hidden className="pointer-events-none relative flex flex-col items-center">
      <div className="fiber-line h-20">
        <span className="fiber-pulse" />
      </div>
      <span className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-text-faint">
        {t.hero.connector}
      </span>
    </div>
  );
}
