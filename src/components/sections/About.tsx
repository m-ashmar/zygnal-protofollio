"use client";

import Reveal from "@/components/site/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import Spotlight from "@/components/ui/Spotlight";
import CountUp from "@/components/ui/CountUp";
import SignalRings from "@/components/ui/SignalRings";
import { useApp } from "@/components/providers/AppProvider";

export default function About() {
  const { t } = useApp();
  const a = t.about;

  return (
    <section id="about" className="section relative overflow-hidden">
      <SignalRings className="-right-32 top-10 opacity-40" size={520} />

      <div className="container-x relative">
        <SectionHeader
          index={a.index}
          eyebrow={a.eyebrow}
          title={
            <>
              {a.titleLead}
              <span className="text-gradient">{a.titleAccent}</span>
            </>
          }
          intro={a.intro}
        />

        {/* stats strip */}
        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
          {t.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 70}>
              <Spotlight className="h-full bg-surface px-6 py-8">
                <div className="font-display text-3xl font-semibold text-text sm:text-4xl">
                  <CountUp value={s.value} />
                </div>
                <div className="mt-2 font-mono text-[0.72rem] uppercase tracking-[0.15em] text-text-muted">
                  {s.label}
                </div>
              </Spotlight>
            </Reveal>
          ))}
        </div>

        {/* vision + mission */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Spotlight glowBorder className="card relative h-full overflow-hidden p-8">
              <div className="eyebrow mb-4">{a.visionLabel}</div>
              <p className="font-display text-xl leading-relaxed text-text sm:text-2xl">
                {a.vision}
              </p>
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan/10 blur-3xl" />
            </Spotlight>
          </Reveal>
          <Reveal delay={90}>
            <Spotlight glowBorder className="card relative h-full overflow-hidden p-8">
              <div className="eyebrow mb-4">{a.missionLabel}</div>
              <p className="text-lg leading-relaxed text-text-muted">{a.mission}</p>
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber/10 blur-3xl" />
            </Spotlight>
          </Reveal>
        </div>

        {/* core values */}
        <div className="mt-16">
          <Reveal>
            <div className="eyebrow mb-6 flex items-center gap-3">
              <span className="rule-draw h-px w-8 origin-left bg-cyan/60" />
              {a.valuesLabel}
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.coreValues.map((v, i) => (
              <Reveal key={v.title} delay={(i % 3) * 70}>
                <Spotlight className="card card-hover flex h-full items-start gap-4 p-6">
                  <span className="mt-1.5 glow-dot h-2 w-2 shrink-0 rounded-full bg-cyan" />
                  <div>
                    <h3 className="font-display text-lg font-semibold">{v.title}</h3>
                    <p className="mt-1 text-sm text-text-muted">{v.desc}</p>
                  </div>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
