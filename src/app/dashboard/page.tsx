"use client";

import { Trophy, Users, Swords, TrendingUp, BarChart3, Activity } from "lucide-react";

const stats = [
  { label: "Всего турниров", value: 12, icon: Trophy, color: "var(--gold)" },
  { label: "Активных игроков", value: 156, icon: Users, color: "#52b788" },
  { label: "Матчей сыграно", value: 342, icon: Swords, color: "#4fc3f7" },
  { label: "Средний MMR", value: 3200, icon: TrendingUp, color: "var(--gold)" },
];

const recentMatches = [
  { id: "1", home: "ProPlayer_KG", away: "MidOrFeed", score: "2:1", game: "Dota 2", date: "2026-01-15" },
  { id: "2", home: "BishkekBoss", away: "DotaKing99", score: "16:12", game: "CS2", date: "2026-01-14" },
  { id: "3", home: "CarryPlayer", away: "SupportMain", score: "2:0", game: "Dota 2", date: "2026-01-13" },
  { id: "4", home: "OfflaneKing", away: "KyrgyzWarrior", score: "2:1", game: "Dota 2", date: "2026-01-12" },
  { id: "5", home: "NewbieHero", away: "FreshMeat", score: "16:8", game: "CS2", date: "2026-01-11" },
];

const topHeroes = [
  { name: "Pudge", picks: 45, winrate: 58 },
  { name: "Invoker", picks: 38, winrate: 52 },
  { name: "Juggernaut", picks: 35, winrate: 61 },
  { name: "Phantom Assassin", picks: 32, winrate: 48 },
  { name: "Crystal Maiden", picks: 30, winrate: 55 },
];

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8" style={{ color: "var(--foreground)" }}>
        📈 Дашборд
      </h1>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-4 rounded-xl"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <stat.icon size={20} style={{ color: stat.color }} />
              <span className="text-xs" style={{ color: "var(--text-sub)" }}>
                {stat.label}
              </span>
            </div>
            <div className="text-2xl font-bold" style={{ color: stat.color }}>
              {stat.value.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent matches */}
        <div
          className="rounded-xl p-5"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <h2 className="text-lg font-bold mb-4" style={{ color: "var(--foreground)" }}>
            Последние матчи
          </h2>
          <div className="space-y-3">
            {recentMatches.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between p-3 rounded-lg"
                style={{ background: "var(--hover-bg)" }}
              >
                <div className="flex-1">
                  <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                    {m.home}
                  </span>
                  <span className="text-sm mx-2" style={{ color: "var(--gold)" }}>
                    {m.score}
                  </span>
                  <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                    {m.away}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-xs" style={{ color: "var(--text-sub)" }}>
                    {m.game}
                  </div>
                  <div className="text-xs" style={{ color: "var(--text-sub)" }}>
                    {new Date(m.date).toLocaleDateString("ru-RU")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top heroes */}
        <div
          className="rounded-xl p-5"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <h2 className="text-lg font-bold mb-4" style={{ color: "var(--foreground)" }}>
            Топ герои
          </h2>
          <div className="space-y-3">
            {topHeroes.map((h, i) => (
              <div
                key={h.name}
                className="flex items-center justify-between p-3 rounded-lg"
                style={{ background: "var(--hover-bg)" }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="text-sm font-bold w-6"
                    style={{ color: i < 3 ? "var(--gold)" : "var(--text-sub)" }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                    {h.name}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs" style={{ color: "var(--text-sub)" }}>
                    {h.picks} пиков
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: h.winrate >= 50 ? "#52b788" : "var(--red)" }}
                  >
                    {h.winrate}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
