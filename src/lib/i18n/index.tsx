"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { ru, type Translations } from "./locales/ru";
import { en } from "./locales/en";

export type Locale = "ru" | "en";

const translations: Record<Locale, Translations> = { ru, en };

export const localeNames: Record<Locale, string> = {
  ru: "Русский",
  en: "English",
};

export const localeFlags: Record<Locale, string> = {
  ru: "🇷🇺",
  en: "🇬🇧",
};

interface I18nContextType {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ru");

  useEffect(() => {
    const stored = localStorage.getItem("locale") as Locale | null;
    if (stored && translations[stored]) {
      setLocaleState(stored);
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
    document.documentElement.lang = newLocale;
  }, []);

  const t = translations[locale];

  return (
    <I18nContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}
