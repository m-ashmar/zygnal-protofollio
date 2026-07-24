"use client";

import Reveal from "@/components/site/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import Spotlight from "@/components/ui/Spotlight";
import { useApp } from "@/components/providers/AppProvider";

export default function Projects() {
  const { t } = useApp();
  const p = t.projects;

  return (
    <section id="projects" className="section relative overflow-hidden border-t border-line/60">
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
              <Spotlight as="article" className="card group relative flex min-h-[320px] flex-col overflow-hidden">
                {/* blueprint header panel (placeholder for real photo) */}
                <div className="relative flex h-44 items-center justify-center overflow-hidden border-b border-line bg-bg-2">
                  <div className="absolute inset-0 bp-grid opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-2 to-transparent" />
                  <div className="relative text-center">
                    <div className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-text-faint">
                      {proj.code}
                    </div>
                    <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-amber/40 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-amber">
                      <span className="live-pulse h-1.5 w-1.5 rounded-full bg-amber" />
                      {p.awaiting}
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-xl font-semibold">{proj.title}</h3>
                  <dl className="mt-4 space-y-2 text-sm">
                    <div className="flex gap-3">
                      <dt className="w-20 shrink-0 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-text-faint">
                        {p.clientLabel}
                      </dt>
                      <dd className="text-text-muted">{proj.client}</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="w-20 shrink-0 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-text-faint">
                        {p.countryLabel}
                      </dt>
                      <dd className="text-text-muted">{proj.country}</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="w-20 shrink-0 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-text-faint">
                        {p.scopeLabel}
                      </dt>
                      <dd className="text-text-muted">{proj.scope}</dd>
                    </div>
                  </dl>
                </div>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
