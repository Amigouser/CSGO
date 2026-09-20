"use client";

import { Shield, TrendingUp, Radio, LayoutGrid } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Steam-авторизация",
    desc: "Вход за один клик — никнейм, аватар и статистика подтягиваются автоматически",
    color: "var(--gold)",
  },
  {
    icon: TrendingUp,
    title: "FACEIT-рейтинг",
    desc: "Уровень и ELO FACEIT отображаются в профиле и карточках матчей",
    color: "#f97316",
  },
  {
    icon: Radio,
    title: "Live-матчи",
    desc: "Следи за матчами в реальном времени — счёт, статус и расписание",
    color: "#e5534b",
  },
  {
    icon: LayoutGrid,
    title: "4 формата сетки",
    desc: "Single / Double Elimination, Swiss System, Groups + Playoffs",
    color: "#4fc3f7",
  },
];

export default function StatsGrid() {
  return (
    <section
      className="py-14 px-4"
      style={{ borderBottom: "1px solid var(--surface-2)" }}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
        {features.map((f) => (
          <div
            key={f.title}
            className="text-center p-5 sm:p-6 rounded-xl group"
            style={{
              background: "var(--hover-bg)",
              border: "1px solid rgba(200,155,60,0.15)",
              transition: "transform 0.2s, border-color 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.borderColor = "rgba(200,155,60,0.35)";
              e.currentTarget.style.boxShadow = "0 6px 24px rgba(200,155,60,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.borderColor = "rgba(200,155,60,0.15)";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            <div className="mb-3 flex justify-center">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: `${f.color}14` }}
              >
                <f.icon size={24} style={{ color: f.color }} />
              </div>
            </div>
            <h3
              className="text-sm font-bold mb-1"
              style={{ color: "var(--foreground)" }}
            >
              {f.title}
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-sub)" }}>
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
