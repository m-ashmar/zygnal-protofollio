"use client";

import Reveal from "@/components/site/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import Spotlight from "@/components/ui/Spotlight";
import SignalRings from "@/components/ui/SignalRings";
import { useApp } from "@/components/providers/AppProvider";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Board() {
  const { t } = useApp();
  const b = t.board;

  return (
    <section id="board" className="section relative overflow-hidden border-t border-line/60">
      <SignalRings className="-right-40 top-24 opacity-25" size={560} />

      <div className="container-x relative">
        <SectionHeader
          index={b.index}
          eyebrow={b.eyebrow}
          title={
            <>
              {b.titleLead}
              <span className="text-gradient">{b.titleAccent}</span>
            </>
          }
          intro={b.intro}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {b.members.map((m, i) => (
            <Reveal key={m.name} delay={(i % 4) * 80}>
              <Spotlight
                as="article"
                glowBorder
                className="card group relative flex h-full flex-col overflow-hidden"
              >
                {/* portrait */}
                <div className="relative aspect-square w-full overflow-hidden bg-bg-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${BASE}/team/${m.photo}`}
                    alt={m.name}
                    loading="lazy"
                    className="h-full w-full object-cover object-top grayscale-[35%] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.04]"
                  />
                  {/* tint + fade into the card */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent" />
                  <div className="pointer-events-none absolute inset-0 bg-cyan/10 opacity-60 mix-blend-overlay transition-opacity duration-700 group-hover:opacity-0" />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-cyan to-transparent transition-transform duration-700 group-hover:scale-x-100" />
                </div>

                {/* identity */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center gap-2.5">
                    <span className="glow-dot h-1.5 w-1.5 rounded-full bg-cyan" />
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-cyan">
                      {m.role}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-semibold leading-tight">
                    {m.name}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-text-muted">
                    {m.summary}
                  </p>

                  <ul className="mt-5 space-y-2 border-t border-line/50 pt-4">
                    {m.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5">
                        <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-cyan/60" />
                        <span className="text-[0.8rem] leading-relaxed text-text-muted">
                          {p}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
