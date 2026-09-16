import { Trophy, Users, Swords, TrendingUp } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const [tournamentCount, playerCount, matchCount, topPlayers] = await Promise.all([
    prisma.tournament.count(),
    prisma.user.count(),
    prisma.match.count(),
    prisma.user.findMany({ orderBy: { faceitElo: "desc" }, take: 5 }),
  ]);

  const avgElo = topPlayers.length > 0
    ? Math.round(topPlayers.reduce((s, p) => s + p.faceitElo, 0) / topPlayers.length)
    : 0;

  const stats = [
    { label: "Всего турниров", value: tournamentCount, icon: Trophy, color: "var(--gold)" },
    { label: "Активных игроков", value: playerCount, icon: Users, color: "#52b788" },
    { label: "Матчей сыграно", value: matchCount, icon: Swords, color: "#4fc3f7" },
    { label: "Средний ELO", value: avgElo, icon: TrendingUp, color: "var(--gold)" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8" style={{ color: "var(--foreground)" }}>📈 Дашборд</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="p-4 rounded-xl" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2 mb-2">
              <stat.icon size={20} style={{ color: stat.color }} />
              <span className="text-xs" style={{ color: "var(--text-sub)" }}>{stat.label}</span>
            </div>
            <div className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl p-5" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <h2 className="text-lg font-bold mb-4" style={{ color: "var(--foreground)" }}>Топ игроки</h2>
        {topPlayers.length === 0 ? (
          <p style={{ color: "var(--text-sub)" }}>Пока нет игроков</p>
        ) : (
          <div className="space-y-3">
            {topPlayers.map((p, i) => (
              <div key={p.id} className="flex items-center justify-between p-3 rounded-lg" style={{ background: "var(--hover-bg)" }}>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold w-6" style={{ color: i < 3 ? "var(--gold)" : "var(--text-sub)" }}>{i + 1}</span>
                  <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{p.nickname}</span>
                </div>
                <span className="text-sm font-bold" style={{ color: "var(--gold)" }}>{p.faceitElo > 0 ? `${p.faceitElo} ELO` : "—"}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
