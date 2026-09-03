"use client";

import { useState } from "react";
import { Globe } from "lucide-react";
import { useI18n, localeNames, localeFlags, type Locale } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const languages: Locale[] = ["ru", "kg", "en"];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-8 h-8 rounded-lg transition-all cursor-pointer"
        style={{
          background: "var(--hover-bg)",
          border: "1px solid var(--border)",
          color: "var(--text-sub)",
        }}
        title="Сменить язык"
      >
        <Globe size={16} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div
            className="absolute right-0 top-10 z-50 rounded-xl overflow-hidden shadow-xl min-w-[140px]"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setLocale(lang);
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors cursor-pointer"
                style={{
                  background: locale === lang ? "rgba(200,155,60,0.1)" : "transparent",
                  color: locale === lang ? "var(--gold)" : "var(--foreground)",
                }}
              >
                <span className="text-base">{localeFlags[lang]}</span>
                <span>{localeNames[lang]}</span>
                {locale === lang && (
                  <span className="ml-auto text-xs">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
