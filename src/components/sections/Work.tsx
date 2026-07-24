"use client";

import Reveal from "@/components/site/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import Spotlight from "@/components/ui/Spotlight";
import { useApp } from "@/components/providers/AppProvider";

function EntityCard({
  name,
  note,
  accent,
}: {
  name: string;
  note: string;
  accent: "cyan" | "amber";
}) {
  return (
    <Spotlight className="card card-hover group relative flex h-full flex-col justify-between overflow-hidden p-7">
      <div className="flex items-start justify-between">
        <span className="font-display text-2xl font-semibold tracking-tight text-text">
          {name}
        </span>
        <span
          className={`mt-1 h-2 w-2 rounded-full glow-dot ${
            accent === "cyan" ? "bg-cyan" : "bg-amber"
          }`}
        />
      </div>
      <div className="mt-8 flex items-center gap-3">
        <span
          className={`h-px flex-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${
            accent === "cyan" ? "bg-cyan/50" : "bg-amber/50"
          }`}
        />
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.15em] text-text-muted">
          {note}
        </p>
      </div>
      <div
        className={`pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full blur-3xl ${
          accent === "cyan" ? "bg-cyan/10" : "bg-amber/10"
        }`}
      />
    </Spotlight>
  );
}

export default function Work() {
  const { t } = useApp();
  const w = t.work;

  return (
    <section id="work" className="section relative overflow-hidden border-t border-line/60">
      <div className="container-x relative">
        <SectionHeader
          index={w.index}
          eyebrow={w.eyebrow}
          title={
            <>
              {w.titleLead}
              <span className="text-gradient">{w.titleAccent}</span>
            </>
          }
          intro={w.intro}
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div>
            <Reveal>
              <div className="eyebrow mb-5 flex items-center gap-3">
                <span className="rule-draw h-px w-8 origin-left bg-cyan/60" />
                {w.clientsLabel}
              </div>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {w.clients.map((c, i) => (
                <Reveal key={c.name} delay={i * 80}>
                  <EntityCard name={c.name} note={c.note} accent="cyan" />
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <Reveal>
              <div className="eyebrow mb-5 flex items-center gap-3">
                <span className="rule-draw h-px w-8 origin-left bg-amber/60" />
                {w.partnersLabel}
              </div>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {w.partners.map((p, i) => (
                <Reveal key={p.name} delay={i * 80}>
                  <EntityCard name={p.name} note={p.note} accent="amber" />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
