"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const STORAGE_KEY = "cookie-notice-seen";

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) !== "1") {
        // Small delay so it doesn't flash on instant navigations
        const t = setTimeout(() => setVisible(true), 800);
        return () => clearTimeout(t);
      }
    } catch {
      // localStorage unavailable — silently skip
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Ignore
    }
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 pb-4"
      style={{ pointerEvents: "none" }}
    >
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center gap-3 max-w-2xl w-full px-5 py-4 rounded-xl"
        style={{
          pointerEvents: "auto",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          boxShadow: "0 -4px 24px rgba(0,0,0,0.25)",
          animation: "cookieSlideUp 0.35s ease-out",
        }}
      >
        <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--text-sub)" }}>
          Сайт использует cookie-файлы для авторизации и настроек интерфейса.{" "}
          <Link
            href="/privacy"
            onClick={dismiss}
            className="underline underline-offset-2 whitespace-nowrap"
            style={{ color: "var(--gold)" }}
          >
            Подробнее — в Политике конфиденциальности
          </Link>
          .
        </p>
        <button
          onClick={dismiss}
          className="shrink-0 px-5 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-opacity hover:opacity-85"
          style={{
            background: "linear-gradient(135deg, var(--gold), var(--gold-light))",
            color: "var(--background)",
          }}
        >
          Понятно
        </button>
      </div>

      <style>{`
        @keyframes cookieSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
