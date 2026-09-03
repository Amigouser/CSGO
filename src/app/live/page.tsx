"use client";

import { useState, useEffect } from "react";
import { Swords, Clock, Trophy, Radio } from "lucide-react";

interface LiveMatch {
  id: string;
  tournament: string;
  homePlayer: string;
  awayPlayer: string;
  homeScore: number;
  awayScore: number;
  game: string;
  startTime: string;
  status: "live" | "upcoming";
}

const mockLiveMatches: LiveMatch[] = [
  {
    id: "1",
    tournament: "INTKG Winter Cup",
    homePlayer: "ProPlayer_KG",
    awayPlayer: "MidOrFeed",
    homeScore: 1,
    awayScore: 0,
    game: "Dota 2",
    startTime: "15:30",
    status: "live",
  },
  {
    id: "2",
    tournament: "CS2 Pro League",
    homePlayer: "BishkekBoss",
    awayPlayer: "DotaKing99",
    homeScore: 12,
    awayScore: 8,
    game: "CS2",
    startTime: "16:00",
    status: "live",
  },
  {
    id: "3",
    tournament: "INTKG Winter Cup",
    homePlayer: "CarryPlayer",
    awayPlayer: "SupportMain",
    homeScore: 0,
    awayScore: 0,
    game: "Dota 2",
    startTime: "18:00",
    status: "upcoming",
  },
];

export default function LivePage() {
  const [matches, setMatches] = useState(mockLiveMatches);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const liveMatches = matches.filter((m) => m.status === "live");
  const upcomingMatches = matches.filter((m) => m.status === "upcoming");

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="relative">
          <Radio size={24} style={{ color: "var(--red)" }} />
          <div
            className="absolute inset-0 animate-ping"
            style={{ color: "var(--red)", opacity: 0.5 }}
          >
            <Radio size={24} />
          </div>
        </div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
          Live матчи
        </h1>
      </div>

      {/* Live matches */}
      {liveMatches.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: "var(--foreground)" }}>
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "var(--red)" }}
            />
            Идут сейчас
          </h2>
          <div className="space-y-4">
            {liveMatches.map((match) => (
              <div
                key={match.id}
                className="rounded-xl p-5"
                style={{
                  background: "linear-gradient(135deg, rgba(229,83,75,0.05), var(--surface))",
                  border: "1px solid rgba(229,83,75,0.2)",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(229,83,75,0.15)", color: "var(--red)" }}>
                    LIVE
                  </span>
                  <span className="text-xs" style={{ color: "var(--text-sub)" }}>
                    {match.tournament}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-center flex-1">
                    <div className="font-semibold" style={{ color: "var(--foreground)" }}>
                      {match.homePlayer}
                    </div>
                  </div>

                  <div className="text-center px-6">
                    <div className="text-3xl font-black" style={{ color: "var(--gold)" }}>
                      {match.homeScore} : {match.awayScore}
                    </div>
                    <div className="text-xs mt-1" style={{ color: "var(--text-sub)" }}>
                      {match.game}
                    </div>
                  </div>

                  <div className="text-center flex-1">
                    <div className="font-semibold" style={{ color: "var(--foreground)" }}>
                      {match.awayPlayer}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Upcoming matches */}
      {upcomingMatches.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--foreground)" }}>
            Скоро начнутся
          </h2>
          <div className="space-y-3">
            {upcomingMatches.map((match) => (
              <div
                key={match.id}
                className="rounded-xl p-4 flex items-center justify-between"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <div>
                  <div className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                    {match.homePlayer} vs {match.awayPlayer}
                  </div>
                  <div className="text-xs" style={{ color: "var(--text-sub)" }}>
                    {match.tournament} • {match.game}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} style={{ color: "var(--text-sub)" }} />
                  <span className="text-sm font-medium" style={{ color: "var(--gold)" }}>
                    {match.startTime}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {liveMatches.length === 0 && upcomingMatches.length === 0 && (
        <div className="text-center py-16">
          <Swords size={48} style={{ color: "var(--text-sub)", margin: "0 auto 16px" }} />
          <p style={{ color: "var(--text-sub)" }}>Нет активных матчей</p>
        </div>
      )}
    </div>
  );
}
