import { Trophy, Search, Medal, Crown, Award } from "lucide-react";
import { prisma } from "@/lib/prisma";

const rankIcons: Record<string, string> = {
  "Global Elite": "👑",
  Supreme: "💎",
  "Legendary Eagle": "🥇",
  DMG: "🥇",
  MG: "🥈",
  "Gold Nova": "🥈",
  "Silver Elite": "🥉",
  "Silver I": "🥉",
};

export default async function LeaderboardPage() {
  const players = await prisma.user.findMany({
    orderBy: { mmr: "desc" },
    take: 50,
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8" style={{ color: "var(--foreground)" }}>
        🏆 Рейтинг игроков
      </h1>

      {players.length === 0 ? (
        <div className="text-center py-16">
          <Trophy size={48} style={{ color: "var(--text-sub)", margin: "0 auto 16px" }} />
          <p style={{ color: "var(--text-sub)" }}>Пока нет игроков</p>
        </div>
      ) : (
        <div
          className="rounded-xl overflow-hidden"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase" style={{ color: "var(--text-sub)" }}>Место</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase" style={{ color: "var(--text-sub)" }}>Игрок</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase" style={{ color: "var(--text-sub)" }}>MMR</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase" style={{ color: "var(--text-sub)" }}>Ранг</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase" style={{ color: "var(--text-sub)" }}>W/L</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase" style={{ color: "var(--text-sub)" }}>Винрейт</th>
              </tr>
            </thead>
            <tbody>
              {players.map((p, i) => {
                const totalGames = p.wins + p.losses;
                const winrate = totalGames > 0 ? Math.round((p.wins / totalGames) * 100) : 0;
                return (
                  <tr
                    key={p.id}
                    style={{ borderBottom: "1px solid var(--border)" }}
                    className="hover:opacity-80 transition-opacity"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {i === 0 && <Crown size={16} style={{ color: "#ffd700" }} />}
                        {i === 1 && <Medal size={16} style={{ color: "#c0c0c0" }} />}
                        {i === 2 && <Award size={16} style={{ color: "#cd7f32" }} />}
                        <span className="text-sm font-bold" style={{ color: i < 3 ? "var(--gold)" : "var(--text-sub)" }}>
                          {i + 1}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                        {p.nickname}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-bold" style={{ color: "var(--gold)" }}>
                        {p.mmr}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm">
                        {rankIcons[p.rank] || "🥉"} {p.rank}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm" style={{ color: "var(--text-sub)" }}>
                        <span style={{ color: "#52b788" }}>{p.wins}</span>/
                        <span style={{ color: "var(--red)" }}>{p.losses}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="text-sm font-medium"
                        style={{ color: winrate >= 50 ? "#52b788" : "var(--red)" }}
                      >
                        {winrate}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
