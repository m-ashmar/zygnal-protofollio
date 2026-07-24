"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  dictionaries,
  defaultLocale,
  defaultTheme,
  localeMeta,
  isLocale,
  isTheme,
  type Content,
  type Locale,
  type Theme,
} from "@/lib/i18n";

interface AppState {
  locale: Locale;
  theme: Theme;
  dir: "ltr" | "rtl";
  t: Content;
  setLocale: (l: Locale) => void;
  toggleLocale: () => void;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
}

const AppContext = createContext<AppState | null>(null);

/**
 * Applies locale + theme to <html> and persists them. An inline
 * beforeInteractive script (in layout) sets these before first paint;
 * this provider keeps React state in sync and reacts to toggles.
 */
export default function AppProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [theme, setThemeState] = useState<Theme>(defaultTheme);

  // Hydrate from whatever the init script / localStorage already decided.
  useEffect(() => {
    const el = document.documentElement;
    const l = el.getAttribute("lang");
    const th = el.getAttribute("data-theme");
    let activeLocale: Locale = defaultLocale;
    if (isLocale(l)) activeLocale = l;
    else {
      const stored = localStorage.getItem("locale");
      if (isLocale(stored)) activeLocale = stored;
    }
    setLocaleState(activeLocale);
    document.title = dictionaries[activeLocale].meta.title;
    if (isTheme(th)) setThemeState(th);
    else {
      const stored = localStorage.getItem("theme");
      if (isTheme(stored)) setThemeState(stored);
    }
  }, []);

  const applyLocale = useCallback((l: Locale) => {
    const el = document.documentElement;
    const dir = localeMeta[l].dir;
    el.setAttribute("lang", l);
    el.setAttribute("dir", dir);
    el.classList.toggle("lang-ar", l === "ar");
    document.title = dictionaries[l].meta.title;
    try {
      localStorage.setItem("locale", l);
    } catch {}
  }, []);

  const applyTheme = useCallback((th: Theme) => {
    document.documentElement.setAttribute("data-theme", th);
    try {
      localStorage.setItem("theme", th);
    } catch {}
  }, []);

  const setLocale = useCallback(
    (l: Locale) => {
      setLocaleState(l);
      applyLocale(l);
    },
    [applyLocale]
  );

  const setTheme = useCallback(
    (th: Theme) => {
      setThemeState(th);
      applyTheme(th);
    },
    [applyTheme]
  );

  const value = useMemo<AppState>(
    () => ({
      locale,
      theme,
      dir: localeMeta[locale].dir,
      t: dictionaries[locale],
      setLocale,
      toggleLocale: () => setLocale(locale === "en" ? "ar" : "en"),
      setTheme,
      toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark"),
    }),
    [locale, theme, setLocale, setTheme]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
