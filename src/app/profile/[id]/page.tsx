import {
  Trophy,
  Swords,
  Calendar,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

const mockProfile = {
  nickname: "ProPlayer_KG",
  steamId: "76561198000000001",
  avatar: null,
  mmr: 5800,
  rank: "Immortal",
  wins: 120,
  losses: 45,
  tournaments: 8,
  createdAt: "2025-06-15",
  recentMatches: [
    { opponent: "MidOrFeed", result: "win", score: "2:1", game: "Dota 2", date: "2026-01-15" },
    { opponent: "BishkekBoss", result: "win", score: "2:0", game: "Dota 2", date: "2026-01-10" },
    { opponent: "CarryPlayer", result: "loss", score: "1:2", game: "Dota 2", date: "2026-01-05" },
    { opponent: "SupportMain", result: "win", score: "2:0", game: "Dota 2", date: "2025-12-28" },
  ],
};

export default function ProfilePage() {
  const p = mockProfile;
  const totalGames = p.wins + p.losses;
  const winrate = totalGames > 0 ? Math.round((p.wins / totalGames) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/leaderboard"
        className="inline-flex items-center gap-2 text-sm mb-6"
        style={{ color: "var(--text-sub)" }}
      >
        <ArrowLeft size={16} />
        Назад к рейтингу
      </Link>

      {/* Profile header */}
      <div
        className="rounded-2xl p-6 mb-6"
        style={{
          background: "linear-gradient(135deg, #150d00, var(--surface))",
          border: "1px solid rgba(200,155,60,0.25)",
        }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div
            className="w-20 h-20 rounded-xl flex items-center justify-center text-3xl"
            style={{ background: "var(--surface-2)", border: "2px solid var(--gold)" }}
          >
            👑
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--foreground)" }}>
              {p.nickname}
            </h1>
            <p className="text-sm mb-3" style={{ color: "var(--text-sub)" }}>
              Steam ID: {p.steamId}
            </p>
            <div className="flex flex-wrap gap-4">
              <div>
                <div className="text-xs" style={{ color: "var(--text-sub)" }}>
                  MMR
                </div>
                <div className="text-xl font-bold" style={{ color: "var(--gold)" }}>
                  {p.mmr.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-xs" style={{ color: "var(--text-sub)" }}>
                  Ранг
                </div>
                <div className="text-xl font-bold" style={{ color: "var(--foreground)" }}>
                  👑 {p.rank}
                </div>
              </div>
              <div>
                <div className="text-xs" style={{ color: "var(--text-sub)" }}>
                  W/L
                </div>
                <div className="text-xl font-bold">
                  <span style={{ color: "#52b788" }}>{p.wins}</span>
                  <span style={{ color: "var(--text-sub)" }}>/</span>
                  <span style={{ color: "var(--red)" }}>{p.losses}</span>
                </div>
              </div>
              <div>
                <div className="text-xs" style={{ color: "var(--text-sub)" }}>
                  Винрейт
                </div>
                <div
                  className="text-xl font-bold"
                  style={{ color: winrate >= 50 ? "#52b788" : "var(--red)" }}
                >
                  {winrate}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Турниров", value: p.tournaments, icon: Trophy, color: "var(--gold)" },
          { label: "Матчей", value: totalGames, icon: Swords, color: "#4fc3f7" },
          { label: "Побед", value: p.wins, icon: TrendingUp, color: "#52b788" },
          {
            label: "На платформе",
            value: `${Math.floor((Date.now() - new Date(p.createdAt).getTime()) / (1000 * 60 * 60 * 24))} дн.`,
            icon: Calendar,
            color: "var(--text-sub)",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="p-4 rounded-xl text-center"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <s.icon size={20} style={{ color: s.color, margin: "0 auto 8px" }} />
            <div className="text-lg font-bold" style={{ color: s.color }}>
              {s.value}
            </div>
            <div className="text-xs" style={{ color: "var(--text-sub)" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Recent matches */}
      <div
        className="rounded-xl p-5"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <h2 className="text-lg font-bold mb-4" style={{ color: "var(--foreground)" }}>
          Последние матчи
        </h2>
        <div className="space-y-3">
          {p.recentMatches.map((m, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-lg"
              style={{ background: "var(--hover-bg)" }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{
                    background: m.result === "win" ? "rgba(82,183,136,0.15)" : "rgba(229,83,75,0.15)",
                    color: m.result === "win" ? "#52b788" : "var(--red)",
                  }}
                >
                  {m.result === "win" ? "Победа" : "Поражение"}
                </span>
                <span className="text-sm" style={{ color: "var(--foreground)" }}>
                  vs {m.opponent}
                </span>
                <span className="text-sm font-bold" style={{ color: "var(--gold)" }}>
                  {m.score}
                </span>
              </div>
              <span className="text-xs" style={{ color: "var(--text-sub)" }}>
                {new Date(m.date).toLocaleDateString("ru-RU")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
