"use client";

import { useState } from "react";
import { Trophy, Search, Medal, Crown, Award } from "lucide-react";

const mockPlayers = [
  { id: "1", nickname: "ProPlayer_KG", mmr: 5800, rank: "Immortal", wins: 120, losses: 45 },
  { id: "2", nickname: "MidOrFeed", mmr: 5100, rank: "Divine", wins: 98, losses: 52 },
  { id: "3", nickname: "CarryPlayer", mmr: 4600, rank: "Ancient", wins: 85, losses: 60 },
  { id: "4", nickname: "BishkekBoss", mmr: 4200, rank: "Ancient", wins: 72, losses: 48 },
  { id: "5", nickname: "SupportMain", mmr: 3900, rank: "Legend", wins: 65, losses: 55 },
  { id: "6", nickname: "DotaKing99", mmr: 3500, rank: "Legend", wins: 58, losses: 42 },
  { id: "7", nickname: "OfflaneKing", mmr: 3200, rank: "Archon", wins: 50, losses: 50 },
  { id: "8", nickname: "KyrgyzWarrior", mmr: 2800, rank: "Archon", wins: 42, losses: 38 },
  { id: "9", nickname: "NewbieHero", mmr: 1500, rank: "Guardian", wins: 20, losses: 30 },
  { id: "10", nickname: "FreshMeat", mmr: 800, rank: "Herald", wins: 10, losses: 25 },
];

const rankIcons: Record<string, string> = {
  Immortal: "👑",
  Divine: "💎",
  Ancient: "🥇",
  Legend: "🥇",
  Archon: "🥈",
  Crusader: "🥈",
  Guardian: "🥉",
  Herald: "🥉",
};

export default function LeaderboardPage() {
  const [search, setSearch] = useState("");

  const filtered = mockPlayers.filter((p) =>
    p.nickname.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
          🏆 Рейтинг игроков
        </h1>
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--text-sub)" }}
          />
          <input
            type="text"
            placeholder="Поиск игрока..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 rounded-lg text-sm"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
              outline: "none",
            }}
          />
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
                Место
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase" style={{ color: "var(--text-sub)" }}>
                Игрок
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase" style={{ color: "var(--text-sub)" }}>
                MMR
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase" style={{ color: "var(--text-sub)" }}>
                Ранг
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase" style={{ color: "var(--text-sub)" }}>
                W/L
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase" style={{ color: "var(--text-sub)" }}>
                Винрейт
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => {
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
                      {rankIcons[p.rank]} {p.rank}
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
    </div>
  );
}
