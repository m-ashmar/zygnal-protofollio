"use client";

import Reveal from "@/components/site/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import Spotlight from "@/components/ui/Spotlight";
import LogoWatermark from "@/components/ui/LogoWatermark";
import { useApp } from "@/components/providers/AppProvider";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function ClientCard({
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

function PartnerCard({
  name,
  note,
  logo,
}: {
  name: string;
  note: string;
  logo: string;
}) {
  // Full-bleed artwork logos (light mark on their own background) fill the tile.
  const artwork = /\.jpe?g$/i.test(logo);
  return (
    <Spotlight className="card card-hover group relative flex h-full flex-col items-center p-6 text-center">
      {/* logo tile — light plate for dark marks; the artwork logo fills its own tile */}
      <div
        className={`flex h-24 w-full items-center justify-center overflow-hidden rounded-xl shadow-sm ring-1 ring-black/5 ${
          artwork ? "bg-bg-2" : "bg-white px-6 py-4"
        }`}
      >
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`${BASE}/brand/${logo}`}
            alt={name}
            className={
              artwork
                ? "h-full w-full object-cover"
                : "max-h-full max-w-[85%] object-contain"
            }
          />
        ) : (
          <span className="font-display text-2xl font-semibold tracking-tight text-[#0a1420]">
            {name}
          </span>
        )}
      </div>
      <p className="mt-4 font-mono text-[0.72rem] uppercase tracking-[0.15em] text-text-muted">
        {note}
      </p>
    </Spotlight>
  );
}

export default function Work() {
  const { t } = useApp();
  const w = t.work;

  return (
    <section id="work" className="section relative overflow-hidden border-t border-line/60">
      <LogoWatermark className="-left-20 -top-10 w-[24rem] -rotate-[8deg]" flip />

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

        {/* clients */}
        <div className="mt-14">
          <Reveal>
            <div className="eyebrow mb-5 flex items-center gap-3">
              <span className="rule-draw h-px w-8 origin-left bg-cyan/60" />
              {w.clientsLabel}
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {w.clients.map((c, i) => (
              <Reveal key={c.name} delay={i * 80}>
                <ClientCard name={c.name} note={c.note} accent="cyan" />
              </Reveal>
            ))}
          </div>
        </div>

        {/* partners */}
        <div className="mt-12">
          <Reveal>
            <div className="eyebrow mb-5 flex items-center gap-3">
              <span className="rule-draw h-px w-8 origin-left bg-amber/60" />
              {w.partnersLabel}
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {w.partners.map((p, i) => (
              <Reveal key={p.name} delay={i * 80}>
                <PartnerCard name={p.name} note={p.note} logo={p.logo} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
