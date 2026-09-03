"use client";

import { useTheme } from "@/hooks/useTheme";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      title={theme === "dark" ? "Светлая тема" : "Тёмная тема"}
      className="flex items-center justify-center w-8 h-8 rounded-lg transition-all cursor-pointer"
      style={{
        background: "var(--hover-bg)",
        border: "1px solid var(--border)",
        color: "var(--text-sub)",
      }}
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
