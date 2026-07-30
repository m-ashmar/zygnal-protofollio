"use client";

import Reveal from "@/components/site/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import Spotlight from "@/components/ui/Spotlight";
import LogoWatermark from "@/components/ui/LogoWatermark";
import { useApp } from "@/components/providers/AppProvider";

export default function Services() {
  const { t } = useApp();
  const s = t.services;
  const [featured, ...rest] = s.items;

  return (
    <section id="services" className="section relative overflow-hidden border-t border-line/60">
      <LogoWatermark className="-bottom-16 -right-24 w-[26rem] rotate-[6deg]" />

      <div className="container-x relative">
        <SectionHeader
          index={s.index}
          eyebrow={s.eyebrow}
          title={
            <>
              {s.titleLead}
              <span className="text-gradient">{s.titleAccent}</span>
            </>
          }
          intro={s.intro}
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {/* featured tile */}
          <Reveal className="lg:col-span-1 lg:row-span-2">
            <Spotlight
              glowBorder
              className="card group relative flex h-full min-h-[280px] flex-col justify-between overflow-hidden p-8"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-cyan">01</span>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-amber">
                  {s.coreLabel}
                </span>
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold leading-tight">
                  {featured.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {featured.desc}
                </p>
                <div className="mt-6 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-cyan">
                  {s.featuredFlow}
                  <span className="h-px w-8 bg-cyan/60" />
                </div>
              </div>
              <div className="pointer-events-none absolute -bottom-20 -right-16 h-52 w-52 rounded-full bg-cyan/10 blur-3xl" />
            </Spotlight>
          </Reveal>

          {/* remaining services */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
            {rest.map((svc, i) => (
              <Reveal key={svc.title} delay={(i % 2) * 70}>
                <Spotlight className="card group relative h-full overflow-hidden p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-mono text-xs text-cyan">
                      {String(i + 2).padStart(2, "0")}
                    </span>
                    <span className="h-5 w-5 rounded-full border border-line-strong transition-colors group-hover:border-cyan/60" />
                  </div>
                  <h3 className="font-display text-base font-semibold leading-snug">
                    {svc.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {svc.desc}
                  </p>
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-cyan to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
