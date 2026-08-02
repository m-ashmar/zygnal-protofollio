"use client";

import { useApp } from "@/components/providers/AppProvider";

/**
 * Build credit for TechNova Dev. The wordmark is set in type rather than as an
 * image so it stays crisp at this size and reads correctly in both themes:
 * "TECH" takes the surrounding text colour, "NOVA" uses the TechNova brand blue.
 */
const TECHNOVA_BLUE = "#0A84FF";

export default function Signature() {
  const { t } = useApp();

  return (
    <a
      href="mailto:nova@technovasy.com"
      className="group inline-flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-text-faint transition-colors hover:text-text-muted"
    >
      <span>{t.contact.builtBy}</span>
      <span className="font-display font-semibold tracking-[0.12em] text-text-muted transition-colors group-hover:text-text">
        TECH<span style={{ color: TECHNOVA_BLUE }}>NOVA</span>
      </span>
    </a>
  );
}
