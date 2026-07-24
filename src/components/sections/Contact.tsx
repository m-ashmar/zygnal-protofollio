"use client";

import Reveal from "@/components/site/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import SignalRings from "@/components/ui/SignalRings";
import { useApp } from "@/components/providers/AppProvider";

export default function Contact() {
  const { t } = useApp();
  const c = t.contact;

  return (
    <footer id="contact" className="relative overflow-hidden border-t border-line/60">
      <div className="pointer-events-none absolute inset-0 bp-grid bp-grid-fade opacity-30" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan/10 blur-[100px]" />
      <SignalRings className="left-1/2 top-10 -translate-x-1/2 opacity-40" size={620} />

      <div className="container-x relative">
        {/* CTA */}
        <div className="section text-center">
          <Reveal>
            <div className="eyebrow mb-6 flex items-center justify-center gap-3">
              <span className="h-px w-6 bg-cyan/60" />
              {c.eyebrow}
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mx-auto max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {c.titleLead}
              <span className="text-gradient">{c.titleAccent}</span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mx-auto mt-6 max-w-xl text-base text-text-muted sm:text-lg">
              {c.intro}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-6">
              <MagneticButton href={`mailto:${c.email}`}>
                <span className="group inline-flex items-center gap-2 rounded-full bg-cyan px-6 py-3 font-mono text-sm font-medium uppercase tracking-[0.1em] text-bg shadow-[0_0_30px_-6px_var(--cyan)] transition-shadow hover:shadow-[0_0_44px_-4px_var(--cyan)]">
                  {c.email}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </MagneticButton>
              <span className="font-mono text-sm text-text-muted">{c.location}</span>
            </div>
          </Reveal>
        </div>

        {/* footer bar */}
        <div className="flex flex-col gap-8 border-t border-line/60 py-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="glow-dot h-2.5 w-2.5 rounded-full bg-cyan" />
              <span className="font-display text-xl font-semibold">
                {t.company.name}
              </span>
            </div>
            <p className="mt-4 text-sm text-text-muted">{t.company.tagline}</p>
            <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-text-faint">
              {t.company.legalName}
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <div className="eyebrow mb-4">{c.navLabel}</div>
              <ul className="space-y-2.5">
                {t.nav.items.map((n) => (
                  <li key={n.href}>
                    <a
                      href={n.href}
                      className="text-sm text-text-muted transition-colors hover:text-text"
                    >
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="eyebrow mb-4">{c.locationsLabel}</div>
              <ul className="space-y-2.5 text-sm text-text-muted">
                <li>{c.location}</li>
                <li>{c.branch}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-line/60 py-6 text-center font-mono text-[0.68rem] uppercase tracking-[0.15em] text-text-faint sm:flex-row sm:justify-between sm:text-left">
          <span>
            © {new Date().getFullYear()} {t.company.name}. {c.rights}
          </span>
          <span>{t.company.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
