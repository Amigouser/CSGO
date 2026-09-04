"use client";

import { useState, useRef, useEffect } from "react";
import { useI18n, localeNames, localeFlags, type Locale } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const languages: Locale[] = ["ru", "en"];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
        style={{
          background: "var(--hover-bg)",
          border: "1px solid var(--border)",
          color: "var(--text-sub)",
        }}
        title="Language"
      >
        <span>{localeFlags[locale]}</span>
        <span className="uppercase">{locale}</span>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full mt-1 rounded-xl overflow-hidden shadow-2xl min-w-[120px]"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            animation: "fadeIn 0.15s ease-out",
          }}
        >
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => {
                setLocale(lang);
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium transition-colors cursor-pointer"
              style={{
                background: locale === lang ? "rgba(200,155,60,0.1)" : "transparent",
                color: locale === lang ? "var(--gold)" : "var(--foreground)",
              }}
              onMouseEnter={(e) => {
                if (locale !== lang) e.currentTarget.style.background = "var(--hover-bg)";
              }}
              onMouseLeave={(e) => {
                if (locale !== lang) e.currentTarget.style.background = "transparent";
              }}
            >
              <span>{localeFlags[lang]}</span>
              <span>{localeNames[lang]}</span>
              {locale === lang && <span className="ml-auto">✓</span>}
            </button>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
