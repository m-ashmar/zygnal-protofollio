"use client";

import Reveal from "@/components/site/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import Spotlight from "@/components/ui/Spotlight";
import LogoWatermark from "@/components/ui/LogoWatermark";
import { useApp } from "@/components/providers/AppProvider";

export default function Projects() {
  const { t } = useApp();
  const p = t.projects;

  return (
    <section id="projects" className="section relative overflow-hidden border-t border-line/60">
      <LogoWatermark className="-bottom-20 -right-16 w-[22rem] rotate-[4deg]" />

      <div className="container-x relative">
        <SectionHeader
          index={p.index}
          eyebrow={p.eyebrow}
          title={
            <>
              {p.titleLead}
              <span className="text-gradient">{p.titleAccent}</span>
            </>
          }
          intro={p.intro}
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {p.items.map((proj, i) => (
            <Reveal key={proj.code} delay={i * 90}>
              <Spotlight
                as="article"
                className="card group relative flex min-h-[300px] flex-col overflow-hidden"
              >
                {/* blueprint header panel */}
                <div className="relative flex h-40 items-center justify-center overflow-hidden border-b border-line bg-bg-2">
                  <div className="absolute inset-0 bp-grid opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-2 to-transparent" />
                  <div className="relative flex flex-col items-center gap-3">
                    <div className="font-display text-4xl font-bold text-text/25">
                      {proj.code}
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-cyan/40 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-cyan">
                      <span className="glow-dot h-1.5 w-1.5 rounded-full bg-cyan" />
                      {proj.tag}
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-xl font-semibold">{proj.title}</h3>
                  <div className="mt-1.5 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-text-faint">
                    {proj.sector}
                  </div>
                  <div className="mt-5 flex gap-3 border-t border-line/50 pt-4">
                    <dt className="w-16 shrink-0 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-text-faint">
                      {p.scopeLabel}
                    </dt>
                    <dd className="text-sm leading-relaxed text-text-muted">
                      {proj.scope}
                    </dd>
                  </div>
                </div>
              </Spotlight>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-8 flex items-center justify-center">
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-full border border-line-strong px-5 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.15em] text-text-muted transition-colors hover:border-cyan/50 hover:text-cyan"
            >
              <span className="live-pulse h-1.5 w-1.5 rounded-full bg-cyan" />
              {p.requestLabel}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
