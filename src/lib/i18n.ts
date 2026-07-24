import en from "./content.en";
import ar from "./content.ar";

export type Locale = "en" | "ar";
export type Theme = "dark" | "light";
export type Content = typeof en;

export const dictionaries: Record<Locale, Content> = { en, ar };

export const defaultLocale: Locale = "en";
export const defaultTheme: Theme = "dark";

export const localeMeta: Record<
  Locale,
  { label: string; dir: "ltr" | "rtl"; htmlLang: string; switchTo: string }
> = {
  en: { label: "EN", dir: "ltr", htmlLang: "en", switchTo: "عربي" },
  ar: { label: "ع", dir: "rtl", htmlLang: "ar", switchTo: "EN" },
};

export const isLocale = (v: unknown): v is Locale => v === "en" || v === "ar";
export const isTheme = (v: unknown): v is Theme => v === "dark" || v === "light";
