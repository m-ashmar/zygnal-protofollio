"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/site/Logo";

/**
 * A small logo badge that follows the scroll — fades in once the visitor is
 * past the hero (so it doesn't compete with the intro), and fades back out
 * near the footer (where the full logo already appears). Doubles as a
 * "back to top" affordance.
 */
export default function FloatingMark() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    let queued = false;

    const apply = () => {
      queued = false;
      // The 3D hero is very tall (700vh) and has its own HUD/captions, so
      // "past the hero" is keyed off its actual height, not a fixed
      // scroll-distance guess.
      const hero = document.getElementById("lifecycle");
      const past = hero
        ? hero.getBoundingClientRect().bottom < window.innerHeight * 0.2
        : window.scrollY > window.innerHeight * 1.3;
      const contact = document.getElementById("contact");
      const nearFooter = contact
        ? contact.getBoundingClientRect().top < window.innerHeight * 1.1
        : false;
      setVisible(past && !nearFooter);
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
  }, []);

  return (
    <a
      href="#top"
      aria-label="Back to top"
      className={`fixed bottom-5 left-5 z-40 flex items-center gap-2 rounded-full border border-line-strong bg-surface/85 px-4 py-2.5 shadow-lg backdrop-blur-md transition-all duration-500 ease-out hover:border-cyan/50 sm:bottom-7 sm:left-7 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <span className="glow-dot h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
      <Logo decorative className="h-3 text-text sm:h-3.5" />
    </a>
  );
}
