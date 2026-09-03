"use client";

import { useState } from "react";
import { Trophy, TrendingUp, Users } from "lucide-react";

interface Prediction {
  id: string;
  matchId: string;
  homePlayer: string;
  awayPlayer: string;
  game: string;
  startTime: string;
  totalVotes: number;
  homeVotes: number;
  awayVotes: number;
  userPrediction?: "home" | "away";
}

const mockPredictions: Prediction[] = [
  {
    id: "1",
    matchId: "m1",
    homePlayer: "ProPlayer_KG",
    awayPlayer: "MidOrFeed",
    game: "Dota 2",
    startTime: "Сегодня, 18:00",
    totalVotes: 45,
    homeVotes: 28,
    awayVotes: 17,
  },
  {
    id: "2",
    matchId: "m2",
    homePlayer: "BishkekBoss",
    awayPlayer: "DotaKing99",
    game: "Dota 2",
    startTime: "Сегодня, 20:00",
    totalVotes: 32,
    homeVotes: 18,
    awayVotes: 14,
  },
  {
    id: "3",
    matchId: "m3",
    homePlayer: "CarryPlayer",
    awayPlayer: "SupportMain",
    game: "CS2",
    startTime: "Завтра, 19:00",
    totalVotes: 21,
    homeVotes: 12,
    awayVotes: 9,
  },
];

export default function PredictionsPage() {
  const [predictions, setPredictions] = useState(mockPredictions);

  const handlePredict = (id: string, choice: "home" | "away") => {
    setPredictions((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        if (p.userPrediction) return p;

        return {
          ...p,
          userPrediction: choice,
          totalVotes: p.totalVotes + 1,
          homeVotes: choice === "home" ? p.homeVotes + 1 : p.homeVotes,
          awayVotes: choice === "away" ? p.awayVotes + 1 : p.awayVotes,
        };
      })
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--foreground)" }}>
        🔮 Предсказания
      </h1>
      <p className="text-sm mb-8" style={{ color: "var(--text-sub)" }}>
        Угадай победителя и заработай очки предсказателя
      </p>

      <div className="space-y-4">
        {predictions.map((p) => {
          const homePercent =
            p.totalVotes > 0 ? Math.round((p.homeVotes / p.totalVotes) * 100) : 50;
          const awayPercent = 100 - homePercent;

          return (
            <div
              key={p.id}
              className="rounded-xl p-5"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(79,195,247,0.15)", color: "#4fc3f7" }}>
                    {p.game}
                  </span>
                  <span className="text-xs" style={{ color: "var(--text-sub)" }}>
                    {p.startTime}
                  </span>
                </div>
                <span className="text-xs flex items-center gap-1" style={{ color: "var(--text-sub)" }}>
                  <Users size={12} />
                  {p.totalVotes} голосов
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Home player */}
                <button
                  onClick={() => handlePredict(p.id, "home")}
                  disabled={!!p.userPrediction}
                  className="p-4 rounded-xl text-center transition-all cursor-pointer disabled:cursor-default"
                  style={{
                    background:
                      p.userPrediction === "home"
                        ? "rgba(82,183,136,0.15)"
                        : "var(--hover-bg)",
                    border: `2px solid ${
                      p.userPrediction === "home"
                        ? "#52b788"
                        : p.userPrediction === "away"
                        ? "var(--border)"
                        : "var(--border)"
                    }`,
                  }}
                >
                  <div className="font-semibold text-sm mb-1" style={{ color: "var(--foreground)" }}>
                    {p.homePlayer}
                  </div>
                  <div className="text-2xl font-bold" style={{ color: "var(--gold)" }}>
                    {homePercent}%
                  </div>
                  {p.userPrediction === "home" && (
                    <div className="text-xs mt-1" style={{ color: "#52b788" }}>
                      Ваш выбор ✓
                    </div>
                  )}
                </button>

                {/* Away player */}
                <button
                  onClick={() => handlePredict(p.id, "away")}
                  disabled={!!p.userPrediction}
                  className="p-4 rounded-xl text-center transition-all cursor-pointer disabled:cursor-default"
                  style={{
                    background:
                      p.userPrediction === "away"
                        ? "rgba(82,183,136,0.15)"
                        : "var(--hover-bg)",
                    border: `2px solid ${
                      p.userPrediction === "away"
                        ? "#52b788"
                        : p.userPrediction === "home"
                        ? "var(--border)"
                        : "var(--border)"
                    }`,
                  }}
                >
                  <div className="font-semibold text-sm mb-1" style={{ color: "var(--foreground)" }}>
                    {p.awayPlayer}
                  </div>
                  <div className="text-2xl font-bold" style={{ color: "var(--gold)" }}>
                    {awayPercent}%
                  </div>
                  {p.userPrediction === "away" && (
                    <div className="text-xs mt-1" style={{ color: "#52b788" }}>
                      Ваш выбор ✓
                    </div>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
