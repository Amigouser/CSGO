import Link from "next/link";
import { Trophy, Users, Calendar, Filter } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

const statusLabels: Record<string, string> = {
  upcoming: "Скоро",
  registration: "Регистрация",
  active: "Активный",
  completed: "Завершён",
};

const statusColors: Record<string, { bg: string; text: string }> = {
  upcoming: { bg: "rgba(79,195,247,0.15)", text: "#4fc3f7" },
  registration: { bg: "rgba(200,155,60,0.15)", text: "var(--gold)" },
  active: { bg: "rgba(82,183,136,0.15)", text: "#52b788" },
  completed: { bg: "rgba(139,148,158,0.15)", text: "var(--text-sub)" },
};

const formatLabels: Record<string, string> = {
  single_elim: "Single Elim",
  double_elim: "Double Elim",
  swiss: "Swiss",
  groups_playoffs: "Groups + Playoffs",
};

export default async function TournamentsPage() {
  const [tournaments, user] = await Promise.all([
    prisma.tournament.findMany({
      orderBy: { startDate: "asc" },
      include: { _count: { select: { participants: true } } },
    }),
    getCurrentUser(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
          Турниры
        </h1>
        {user?.isAdmin && (
          <Link
            href="/tournaments/create"
            className="px-4 py-2 rounded-xl text-sm font-bold transition-all glow-gold"
            style={{
              background: "linear-gradient(135deg, var(--gold), var(--gold-light))",
              color: "var(--background)",
            }}
          >
            Создать турнир
          </Link>
        )}
      </div>

      {tournaments.length === 0 ? (
        <div className="text-center py-16">
          <Trophy size={48} style={{ color: "var(--text-sub)", margin: "0 auto 16px" }} />
          <p style={{ color: "var(--text-sub)" }}>Турниров пока нет</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tournaments.map((t) => {
            const sc = statusColors[t.status] || statusColors.upcoming;
            return (
              <Link key={t.id} href={`/tournaments/${t.id}`}>
                <div
                  className="rounded-xl overflow-hidden game-card"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                >
                  <div
                    className="h-32 flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #081a0d, #0d1117)" }}
                  >
                    <Trophy size={48} style={{ color: "var(--gold)", opacity: 0.3 }} />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ background: sc.bg, color: sc.text }}
                      >
                        {statusLabels[t.status] || t.status}
                      </span>
                      <span className="text-xs" style={{ color: "var(--text-sub)" }}>
                        {formatLabels[t.format] || t.format}
                      </span>
                    </div>
                    <h3 className="font-semibold text-sm mb-1" style={{ color: "var(--foreground)" }}>
                      {t.name}
                    </h3>
                    {t.description && (
                      <p className="text-xs mb-2" style={{ color: "var(--text-sub)" }}>
                        {t.description}
                      </p>
                    )}
                    <div className="flex items-center gap-3 text-xs" style={{ color: "var(--text-sub)" }}>
                      <span className="flex items-center gap-1">
                        <Users size={12} />
                        {t._count.participants}/{t.maxTeams}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(t.startDate).toLocaleDateString("ru-RU")}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
