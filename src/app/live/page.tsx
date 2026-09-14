import { Swords, Clock, Trophy, Radio } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function LivePage() {
  const activeTournaments = await prisma.tournament.findMany({
    where: { status: "active" },
    include: {
      matches: {
        where: { status: { in: ["active", "pending"] } },
        include: { homePlayer: true, awayPlayer: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  const liveMatches = activeTournaments.flatMap((t) =>
    t.matches
      .filter((m) => m.status === "active")
      .map((m) => ({
        id: m.id,
        tournament: t.name,
        homePlayer: m.homePlayer?.nickname || "TBD",
        awayPlayer: m.awayPlayer?.nickname || "TBD",
        homeScore: m.homeScore ?? 0,
        awayScore: m.awayScore ?? 0,
        startTime: m.scheduledAt ? new Date(m.scheduledAt).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }) : "--:--",
      }))
  );

  const upcomingMatches = activeTournaments.flatMap((t) =>
    t.matches
      .filter((m) => m.status === "pending")
      .map((m) => ({
        id: m.id,
        tournament: t.name,
        homePlayer: m.homePlayer?.nickname || "TBD",
        awayPlayer: m.awayPlayer?.nickname || "TBD",
        startTime: m.scheduledAt ? new Date(m.scheduledAt).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }) : "--:--",
      }))
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="relative">
          <Radio size={24} style={{ color: "var(--red)" }} />
          <div className="absolute inset-0 animate-ping" style={{ color: "var(--red)", opacity: 0.5 }}>
            <Radio size={24} />
          </div>
        </div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Live матчи</h1>
      </div>

      {liveMatches.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: "var(--foreground)" }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--red)" }} />
            Идут сейчас
          </h2>
          <div className="space-y-4">
            {liveMatches.map((match) => (
              <div key={match.id} className="rounded-xl p-5" style={{ background: "linear-gradient(135deg, rgba(229,83,75,0.05), var(--surface))", border: "1px solid rgba(229,83,75,0.2)" }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(229,83,75,0.15)", color: "var(--red)" }}>LIVE</span>
                  <span className="text-xs" style={{ color: "var(--text-sub)" }}>{match.tournament}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-center flex-1"><div className="font-semibold" style={{ color: "var(--foreground)" }}>{match.homePlayer}</div></div>
                  <div className="text-center px-6">
                    <div className="text-3xl font-black" style={{ color: "var(--gold)" }}>{match.homeScore} : {match.awayScore}</div>
                  </div>
                  <div className="text-center flex-1"><div className="font-semibold" style={{ color: "var(--foreground)" }}>{match.awayPlayer}</div></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {upcomingMatches.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--foreground)" }}>Скоро начнутся</h2>
          <div className="space-y-3">
            {upcomingMatches.map((match) => (
              <div key={match.id} className="rounded-xl p-4 flex items-center justify-between" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <div>
                  <div className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{match.homePlayer} vs {match.awayPlayer}</div>
                  <div className="text-xs" style={{ color: "var(--text-sub)" }}>{match.tournament}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} style={{ color: "var(--text-sub)" }} />
                  <span className="text-sm font-medium" style={{ color: "var(--gold)" }}>{match.startTime}</span>
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
          <p className="text-sm mt-2" style={{ color: "var(--text-sub)" }}>Матчи появятся когда турнир начнётся</p>
        </div>
      )}
    </div>
  );
}
