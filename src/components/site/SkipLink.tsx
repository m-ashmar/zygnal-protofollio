"use client";

import { useApp } from "@/components/providers/AppProvider";

export default function SkipLink() {
  const { t } = useApp();
  return (
    <a
      href="#about"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-cyan focus:px-4 focus:py-2 focus:text-bg"
    >
      {t.nav.skip}
    </a>
  );
}
