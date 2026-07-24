"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useApp } from "@/components/providers/AppProvider";
import { activePhaseIndex, clamp01, smoothstep } from "@/lib/lifecycle";

const TowerScene = dynamic(() => import("./TowerScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center">
      <div className="font-mono text-xs tracking-[0.3em] text-cyan/70 uppercase animate-pulse">
        …
      </div>
    </div>
  ),
});

function useHasWebGL() {
  const [ok, setOk] = useState(true);
  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      const gl =
        c.getContext("webgl2") ||
        c.getContext("webgl") ||
        c.getContext("experimental-webgl");
      setOk(!!gl);
    } catch {
      setOk(false);
    }
  }, []);
  return ok;
}

export default function HeroLifecycle() {
  const { t, locale } = useApp();
  const phases = t.lifecycle.phases;

  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  const introRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const captionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tickRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hudIndexRef = useRef<HTMLSpanElement>(null);
  const hudBarRef = useRef<HTMLDivElement>(null);

  const [reduced, setReduced] = useState(false);
  const hasWebGL = useHasWebGL();
  const [forceFlat, setForceFlat] = useState(false);

  useEffect(() => {
    setForceFlat(new URLSearchParams(window.location.search).has("flat"));
  }, []);
  const show3D = hasWebGL && !forceFlat;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let raf = 0;
    let queued = false;

    const apply = () => {
      queued = false;
      const total = section.offsetHeight - window.innerHeight;
      const scrolled = clamp01(-section.getBoundingClientRect().top / (total || 1));
      progressRef.current = scrolled;

      const introOut = 1 - smoothstep(0.0, 0.08, scrolled);
      if (introRef.current) introRef.current.style.opacity = String(introOut);
      if (hintRef.current)
        hintRef.current.style.opacity = String(1 - smoothstep(0, 0.03, scrolled));

      const active = activePhaseIndex(scrolled);
      captionRefs.current.forEach((el, i) => {
        if (!el) return;
        const on = i === active && scrolled > 0.045;
        el.style.opacity = on ? "1" : "0";
        el.style.transform = on ? "translateY(0)" : "translateY(14px)";
      });
      tickRefs.current.forEach((el, i) => {
        if (!el) return;
        el.setAttribute("data-active", String(i === active));
        el.setAttribute("data-done", String(i < active));
      });

      if (hudIndexRef.current)
        hudIndexRef.current.textContent = phases[active].title;
      if (hudBarRef.current)
        hudBarRef.current.style.transform = `scaleX(${scrolled.toFixed(4)})`;
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [locale, phases]);

  return (
    <section
      id="lifecycle"
      ref={sectionRef}
      dir="ltr"
      className="tokens-dark relative h-[700vh] bg-bg text-text"
      aria-label="Telecom site lifecycle"
    >
      {/* sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-bg">
        {/* 3D scene or fallback */}
        <div className="absolute inset-0">
          {show3D ? (
            <TowerScene progress={progressRef} reduced={reduced} />
          ) : (
            <div className="absolute inset-0 bp-grid bp-grid-fade" />
          )}
        </div>

        {/* vignette + legibility gradients */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 0%, transparent 40%, rgba(5,8,13,0.55) 100%), linear-gradient(180deg, rgba(5,8,13,0.85) 0%, transparent 22%, transparent 68%, rgba(5,8,13,0.9) 100%)",
          }}
        />

        {/* intro overlay */}
        <div
          ref={introRef}
          dir={locale === "ar" ? "rtl" : "ltr"}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <div className="eyebrow mb-5">{t.hero.location}</div>
          <h1
            className={
              locale === "ar"
                ? "font-display text-[11.5vw] leading-[1.2] font-bold sm:text-[8vw] lg:text-[6.75rem]"
                : "font-display text-[13vw] leading-[0.86] font-bold tracking-tight sm:text-[9vw] lg:text-[7.5rem]"
            }
          >
            <span className="text-gradient">{t.hero.titleTop}</span>
            <br />
            <span className="text-text">{t.hero.titleBottom}</span>
          </h1>
          <p className="mt-7 max-w-xl text-balance text-base text-text-muted sm:text-lg">
            {t.hero.intro}
          </p>
        </div>

        {/* scroll hint */}
        <div
          ref={hintRef}
          className="pointer-events-none absolute bottom-7 left-1/2 -translate-x-1/2 text-center"
        >
          <div className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-text-faint">
            {t.hero.scroll}
          </div>
          <div className="mx-auto mt-2 h-8 w-px bg-gradient-to-b from-cyan/70 to-transparent" />
        </div>

        {/* phase captions (bottom-start) */}
        <div className="pointer-events-none absolute bottom-8 left-0 w-full px-[clamp(1.25rem,5vw,3rem)]">
          <div className="relative h-[132px] max-w-md">
            {phases.map((ph, i) => (
              <div
                key={ph.id}
                ref={(el) => {
                  captionRefs.current[i] = el;
                }}
                className="absolute inset-0 opacity-0 transition-all duration-500 ease-out"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="font-mono text-xs text-cyan">{ph.index}</span>
                  <span className="h-px w-8 bg-cyan/50" />
                  <span className="glow-dot inline-block h-1.5 w-1.5 rounded-full bg-cyan" />
                </div>
                <h2 className="font-display text-2xl font-semibold text-text sm:text-3xl">
                  {ph.title}
                </h2>
                <p className="mt-2 max-w-sm text-sm text-text-muted">{ph.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* phase rail (right) */}
        <div className="pointer-events-none absolute right-[clamp(1rem,4vw,2.5rem)] top-1/2 hidden -translate-y-1/2 flex-col gap-3 md:flex">
          {phases.map((ph, i) => (
            <div
              key={ph.id}
              ref={(el) => {
                tickRefs.current[i] = el;
              }}
              data-active="false"
              data-done="false"
              className="group flex items-center justify-end gap-3 [&[data-active=true]_.lbl]:text-cyan [&[data-active=true]_.lbl]:opacity-100 [&[data-active=true]_.bar]:w-8 [&[data-active=true]_.bar]:bg-cyan [&[data-done=true]_.bar]:bg-cyan/40"
            >
              <span className="lbl font-mono text-[0.62rem] uppercase tracking-[0.2em] text-text-faint opacity-50 transition-all">
                {ph.index}
              </span>
              <span className="bar h-px w-4 bg-line-strong transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* HUD (top-right) */}
        <div className="pointer-events-none absolute right-[clamp(1.25rem,5vw,3rem)] top-24 hidden items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-text-faint sm:flex">
          <span className="live-pulse inline-block h-2 w-2 rounded-full bg-amber" />
          <span>{t.hero.phaseLabel}</span>
          <span ref={hudIndexRef} className="text-cyan">
            {phases[0].title}
          </span>
        </div>

        {/* global progress bar */}
        <div className="pointer-events-none absolute bottom-0 left-0 h-[3px] w-full bg-line/40">
          <div
            ref={hudBarRef}
            className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-cyan via-cyan to-amber"
          />
        </div>
      </div>
    </section>
  );
}
