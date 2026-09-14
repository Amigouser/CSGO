import { Trophy, Crown, Medal, Award } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function HallOfFamePage() {
  const completedTournaments = await prisma.tournament.findMany({
    where: { status: "completed" },
    include: {
      participants: {
        where: { status: "approved" },
        include: { user: true },
        take: 3,
      },
    },
    orderBy: { endDate: "desc" },
    take: 10,
  });

  const topPlayers = await prisma.user.findMany({
    orderBy: { wins: "desc" },
    take: 5,
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8" style={{ color: "var(--foreground)" }}>Зал Славы</h1>

      <section className="mb-10">
        <h2 className="text-lg font-bold mb-4" style={{ color: "var(--foreground)" }}>Чемпионы турниров</h2>
        {completedTournaments.length === 0 ? (
          <div className="rounded-xl p-8 text-center" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <p style={{ color: "var(--text-sub)" }}>Турниры пока не завершены. Чемпионы появятся после первых турниров!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {completedTournaments.map((t, i) => (
              <div key={t.id} className="p-5 rounded-xl game-card" style={{ background: "linear-gradient(135deg, #150d00, var(--surface))", border: "1px solid rgba(200,155,60,0.25)" }}>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    {i === 0 ? <Crown size={28} style={{ color: "#ffd700" }} /> : i === 1 ? <Medal size={28} style={{ color: "#c0c0c0" }} /> : <Award size={28} style={{ color: "#cd7f32" }} />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1" style={{ color: "var(--foreground)" }}>{t.name}</h3>
                    {t.participants.length > 0 && (
                      <p className="text-sm" style={{ color: "var(--gold)" }}>🏆 {t.participants[0].user.nickname}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-lg font-bold mb-4" style={{ color: "var(--foreground)" }}>Лучшие игроки</h2>
        {topPlayers.length === 0 ? (
          <div className="rounded-xl p-8 text-center" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <p style={{ color: "var(--text-sub)" }}>Пока нет данных</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {topPlayers.map((p) => (
              <div key={p.id} className="p-5 rounded-xl" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <div className="flex items-center gap-3 mb-2">
                  <Trophy size={20} style={{ color: "var(--gold)" }} />
                  <span className="text-sm font-bold" style={{ color: "var(--foreground)" }}>{p.nickname}</span>
                </div>
                <div className="text-xl font-bold" style={{ color: "var(--gold)" }}>{p.wins} побед</div>
                <div className="text-xs" style={{ color: "var(--text-sub)" }}>{p.mmr} MMR · {p.rank}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
