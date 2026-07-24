"use client";

import Reveal from "@/components/site/Reveal";
import { useApp } from "@/components/providers/AppProvider";

export default function Industries() {
  const { t } = useApp();

  return (
    <section className="border-t border-line/60 py-16">
      <div className="container-x">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="eyebrow shrink-0 md:w-48">{t.industries.label}</div>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {t.industries.items.map((ind) => (
              <div key={ind} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
                <span className="font-display text-lg text-text sm:text-xl">
                  {ind}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
