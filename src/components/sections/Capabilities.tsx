"use client";

import Reveal from "@/components/site/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import Spotlight from "@/components/ui/Spotlight";
import SignalRings from "@/components/ui/SignalRings";
import { useApp } from "@/components/providers/AppProvider";

export default function Capabilities() {
  const { t } = useApp();
  const c = t.capabilities;

  return (
    <section
      id="capabilities"
      className="section relative overflow-hidden border-t border-line/60"
    >
      {/* faint blueprint backdrop */}
      <div className="pointer-events-none absolute inset-0 bp-grid bp-grid-fade opacity-40" />
      <SignalRings className="-left-40 bottom-0 opacity-30" size={560} />

      <div className="container-x relative">
        <SectionHeader
          index={c.index}
          eyebrow={c.eyebrow}
          title={
            <>
              {c.titleLead}
              <span className="text-gradient">{c.titleAccent}</span>
            </>
          }
          intro={c.intro}
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          {/* capability list */}
          <Reveal>
            <Spotlight glowBorder className="card h-full p-8">
              <ul className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
                {c.items.map((cap, i) => (
                  <li
                    key={cap}
                    className="group flex items-start gap-3 border-b border-line/40 py-3 last:border-0 sm:[&:nth-last-child(2)]:border-0"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan/70 transition-all duration-300 group-hover:scale-150 group-hover:bg-cyan" />
                    <span className="text-sm leading-relaxed text-text transition-colors group-hover:text-cyan">
                      {cap}
                    </span>
                    <span className="ml-auto hidden font-mono text-[0.6rem] text-text-faint sm:block">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </li>
                ))}
              </ul>
            </Spotlight>
          </Reveal>

          {/* execution + vendors */}
          <div className="flex flex-col gap-4">
            <Reveal delay={80}>
              <Spotlight className="card h-full p-8">
                <div className="eyebrow mb-5">{c.execLabel}</div>
                <ul className="space-y-3">
                  {c.execution.map((e) => (
                    <li key={e} className="flex items-start gap-3 text-sm text-text-muted">
                      <span className="mt-1.5 live-pulse h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                      {e}
                    </li>
                  ))}
                </ul>
              </Spotlight>
            </Reveal>

            <Reveal delay={140}>
              <Spotlight className="card p-8">
                <div className="eyebrow mb-5">{c.vendorLabel}</div>
                <div className="flex flex-wrap gap-2.5">
                  {t.vendors.map((v) => (
                    <span
                      key={v}
                      className="rounded-full border border-line-strong px-3.5 py-1.5 font-mono text-xs text-text-muted transition-colors hover:border-cyan/50 hover:text-cyan"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </Spotlight>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
