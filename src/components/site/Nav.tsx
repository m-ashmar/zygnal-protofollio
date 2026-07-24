"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/site/Logo";
import { useApp } from "@/components/providers/AppProvider";
import { localeMeta } from "@/lib/i18n";

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

export default function Nav() {
  const { t, locale, theme, toggleLocale, toggleTheme } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "border-b border-line/70 bg-bg/70 backdrop-blur-xl"
          : "tokens-dark border-b border-transparent"
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between">
        <a
          href="#top"
          aria-label="Zygnal — home"
          className="flex items-center text-text transition-opacity hover:opacity-80"
        >
          <Logo className="h-6 sm:h-7" />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {t.nav.items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="font-mono text-[0.72rem] uppercase tracking-[0.15em] text-text-muted transition-colors hover:text-text"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* language toggle */}
          <button
            onClick={toggleLocale}
            aria-label="Switch language"
            className="rounded-full border border-line-strong px-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-text-muted transition-colors hover:border-cyan/50 hover:text-cyan"
          >
            {localeMeta[locale].switchTo}
          </button>

          {/* theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="grid h-8 w-8 place-items-center rounded-full border border-line-strong text-text-muted transition-colors hover:border-cyan/50 hover:text-cyan"
          >
            {theme === "dark" ? <MoonIcon /> : <SunIcon />}
          </button>

          <a
            href="#contact"
            className="hidden rounded-full border border-cyan/40 px-4 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.15em] text-cyan transition-colors hover:bg-cyan/10 lg:inline-block"
          >
            {t.nav.cta}
          </a>

          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 text-text md:hidden"
          >
            <span className={`h-px w-5 bg-current transition-all ${open ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`h-px w-5 bg-current transition-all ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {/* mobile drawer */}
      {open && (
        <div className="border-t border-line bg-bg/95 backdrop-blur-xl md:hidden">
          <ul className="container-x flex flex-col py-4">
            {t.nav.items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-mono text-sm uppercase tracking-[0.15em] text-text-muted"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
