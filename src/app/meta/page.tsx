"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const heroes = [
  { name: "Pudge", winrate: 58.2, picks: 450, trend: "up", change: 2.1 },
  { name: "Invoker", winrate: 52.1, picks: 380, trend: "down", change: -1.3 },
  { name: "Juggernaut", winrate: 61.5, picks: 350, trend: "up", change: 3.2 },
  { name: "Phantom Assassin", winrate: 48.3, picks: 320, trend: "down", change: -0.8 },
  { name: "Crystal Maiden", winrate: 55.0, picks: 300, trend: "stable", change: 0.1 },
  { name: "Anti-Mage", winrate: 49.7, picks: 280, trend: "up", change: 1.5 },
  { name: "Axe", winrate: 53.8, picks: 260, trend: "stable", change: -0.2 },
  { name: "Shadow Fiend", winrate: 50.2, picks: 240, trend: "down", change: -2.1 },
  { name: "Sniper", winrate: 47.5, picks: 220, trend: "down", change: -1.7 },
  { name: "Lina", winrate: 56.3, picks: 200, trend: "up", change: 2.8 },
];

export default function MetaPage() {
  const [sortBy, setSortBy] = useState<"winrate" | "picks">("picks");

  const sorted = [...heroes].sort((a, b) =>
    sortBy === "winrate" ? b.winrate - a.winrate : b.picks - a.picks
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
          📊 Мета
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => setSortBy("picks")}
            className="px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer"
            style={{
              background: sortBy === "picks" ? "rgba(200,155,60,0.15)" : "var(--surface)",
              color: sortBy === "picks" ? "var(--gold)" : "var(--text-sub)",
              border: `1px solid ${sortBy === "picks" ? "rgba(200,155,60,0.3)" : "var(--border)"}`,
            }}
          >
            По пикам
          </button>
          <button
            onClick={() => setSortBy("winrate")}
            className="px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer"
            style={{
              background: sortBy === "winrate" ? "rgba(200,155,60,0.15)" : "var(--surface)",
              color: sortBy === "winrate" ? "var(--gold)" : "var(--text-sub)",
              border: `1px solid ${sortBy === "winrate" ? "rgba(200,155,60,0.3)" : "var(--border)"}`,
            }}
          >
            По винрейту
          </button>
        </div>
      </div>

      <div
        className="rounded-xl overflow-hidden"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase" style={{ color: "var(--text-sub)" }}>
                #
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase" style={{ color: "var(--text-sub)" }}>
                Герой
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase" style={{ color: "var(--text-sub)" }}>
                Винрейт
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase" style={{ color: "var(--text-sub)" }}>
                Пики
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase" style={{ color: "var(--text-sub)" }}>
                Тренд
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((h, i) => (
              <tr key={h.name} style={{ borderBottom: "1px solid var(--border)" }}>
                <td className="px-4 py-3 text-sm font-bold" style={{ color: i < 3 ? "var(--gold)" : "var(--text-sub)" }}>
                  {i + 1}
                </td>
                <td className="px-4 py-3 text-sm font-medium" style={{ color: "var(--foreground)" }}>
                  {h.name}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-16 h-1.5 rounded-full overflow-hidden"
                      style={{ background: "var(--border)" }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${h.winrate}%`,
                          background: h.winrate >= 50 ? "#52b788" : "var(--red)",
                        }}
                      />
                    </div>
                    <span
                      className="text-sm font-medium"
                      style={{ color: h.winrate >= 50 ? "#52b788" : "var(--red)" }}
                    >
                      {h.winrate}%
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm" style={{ color: "var(--text-sub)" }}>
                  {h.picks}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    {h.trend === "up" && <TrendingUp size={14} style={{ color: "#52b788" }} />}
                    {h.trend === "down" && <TrendingDown size={14} style={{ color: "var(--red)" }} />}
                    {h.trend === "stable" && <Minus size={14} style={{ color: "var(--text-sub)" }} />}
                    <span
                      className="text-xs"
                      style={{
                        color: h.change > 0 ? "#52b788" : h.change < 0 ? "var(--red)" : "var(--text-sub)",
                      }}
                    >
                      {h.change > 0 ? "+" : ""}
                      {h.change}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
