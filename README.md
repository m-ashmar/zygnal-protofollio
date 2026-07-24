# Zygnal — Portfolio Website

A world-class portfolio site for **Zygnal** (شركة زيغنال للحلول الذكية), a Syrian
telecommunications infrastructure company. The centerpiece is a **scroll-driven 3D
tower lifecycle** — the visitor scrolls a telecom site from bare ground through
civil works, tower erection, BTS/antenna install, power, fiber, network go-live,
and modernization to 5G. The animation doubles as an accurate explainer of what
Zygnal actually does.

Tagline: **Local Expertise. Global Standards. Trusted Execution.**

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 4** (design tokens in `src/app/globals.css`)
- **three.js** + **@react-three/fiber** + **@react-three/drei** — the 3D scene
- **@react-three/postprocessing** — bloom / vignette
- Fonts: Space Grotesk (display), Inter (body), JetBrains Mono (technical labels)

## Run

```bash
npm run dev      # dev server (http://localhost:3000)
npm run build    # production build
npm start        # serve the production build
```

## Project structure

```
src/
  app/
    layout.tsx         Fonts, metadata, viewport
    page.tsx           Assembles all sections
    globals.css        Design tokens + utilities (colors, grid, reveal, etc.)
  lib/
    content.en.ts      ← ALL COPY (English) — single source of truth
    content.ar.ts      ← ALL COPY (Arabic) — same shape as en
    i18n.ts            Locale/theme types, dictionaries, metadata
    lifecycle.ts       Shared phase timeline + math (scene + captions stay in sync)
  components/
    providers/AppProvider.tsx  Locale + theme context (useApp)
    hero/
      HeroLifecycle.tsx  Tall scroll section, sticky canvas, synced captions, HUD
      TowerScene.tsx     The R3F scene: tower, antennas, power, fiber, signal, camera
    site/    Nav, Reveal, ScrollManager, SkipLink
    ui/      SectionHeader, Spotlight, CountUp, SignalRings, FiberConnector, MagneticButton
    sections/  About, Services, Capabilities, Industries, Work, Projects, Contact
```

## Languages & theming

The site ships in **English (LTR)** and **Arabic (RTL)**, with a **light** and
**dark** theme. Both are toggled from the nav (globe = language, sun/moon =
theme) and persist to `localStorage`. An inline script in the layout applies the
saved choice before first paint, so there is no flash.

- **Content dictionaries**: `src/lib/content.en.ts` and `src/lib/content.ar.ts`
  hold every UI string. They share one shape (TypeScript enforces
  `ar: typeof en`), so a missing/mismatched key fails the build.
- **Provider**: `src/components/providers/AppProvider.tsx` exposes `useApp()` →
  `{ t, locale, theme, dir, toggleLocale, toggleTheme }`. Sections read all copy
  from `t`.
- **Add a language**: create `content.<code>.ts` with the same shape, add it to
  `dictionaries` + `localeMeta` in `src/lib/i18n.ts`.
- **RTL**: driven by `dir="rtl"` on `<html>`; Arabic uses IBM Plex Sans Arabic
  and letter-spacing is reset (it would break Arabic glyph joining).
- **Theme tokens**: dark is the default `:root`; light is
  `:root[data-theme="light"]` in `globals.css`. The skyblue/cyan accent is kept
  in both. The **3D hero stays dark in both themes** (it carries the
  `.tokens-dark` scope) — a deliberate cinematic choice.

## Editing content

All copy and data live in the two dictionaries above (`content.en.ts` /
`content.ar.ts`). Edit both to change the company intro, vision/mission,
services, capabilities, clients, partners, etc. No data is hard-coded in
components.

### ⚠️ Flagship projects (currently placeholders)

The client had not provided the two flagship projects at build time, so
`projects` in both dictionaries contains **TBD placeholders** and the Projects
section shows "Awaiting details" cards. When the client sends the real details:

1. Edit the `projects.items` array in `content.en.ts` **and** `content.ar.ts` —
   fill `title`, `client`, `country`, `scope`.
2. Add each project's photos to `public/projects/` and wire them into the card
   header in `src/components/sections/Projects.tsx` (replace the blueprint
   placeholder panel with an `<Image>`).

## The 3D lifecycle timeline

Phase windows live in `src/lib/lifecycle.ts` (`PHASES`). One normalized scroll
progress value `p` (0–1) drives both the 3D scene and the DOM captions, so they
never drift. To retune pacing, adjust the `start`/`end` of each phase there.

## Accessibility & fallbacks

- **`prefers-reduced-motion`**: bloom and idle motion are disabled; the scene
  snaps rather than eases.
- **No WebGL**: the hero falls back to a static blueprint-grid backdrop.
- **`?flat=1`** query flag: forces the no-3D fallback (handy for quick content
  QA and for capturing screenshots).

## Notes

- The 3D scene is intentionally a **stylized blueprint aesthetic** (thin emissive
  lattice + bloom), not photoreal — it loads fast and reads as serious
  infrastructure engineering.
- Best viewed in a real browser; some embedded/headless screenshotters cannot
  capture a live WebGL canvas.
