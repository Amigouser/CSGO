import Link from "next/link";
import TournamentCard from "@/components/tournament/TournamentCard";
import { prisma } from "@/lib/prisma";
import { Clock, CalendarDays } from "lucide-react";

export default async function TournamentsPreview() {
  const tournaments = await prisma.tournament.findMany({
    orderBy: { startDate: "asc" },
    take: 6,
    include: { _count: { select: { participants: true } } },
  });

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>
          Турниры
        </h2>
        <Link
          href="/tournaments"
          className="text-sm font-medium transition-colors"
          style={{ color: "var(--gold)" }}
        >
          Смотреть все →
        </Link>
      </div>
      {tournaments.length === 0 ? (
        <div
          className="rounded-xl overflow-hidden"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          {/* Header area — same height as TournamentCard image */}
          <div
            className="h-32 flex items-center justify-center relative"
            style={{ background: "linear-gradient(135deg, #0a0d12, #12080a)" }}
          >
            {/* Subtle grid pattern */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 50% 50%, rgba(200,155,60,0.12) 0%, transparent 60%)",
              }}
            />
            <div className="relative flex items-center gap-3">
              <CalendarDays size={40} style={{ color: "var(--gold)", opacity: 0.25 }} />
              <Clock size={32} style={{ color: "var(--gold)", opacity: 0.15 }} />
            </div>
          </div>

          {/* Body — mirrors TournamentCard structure */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
                style={{ background: "rgba(200,155,60,0.12)", color: "var(--gold)" }}
              >
                Скоро
              </span>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: "rgba(79,195,247,0.12)", color: "#4fc3f7" }}
              >
                CS2
              </span>
            </div>

            <h3
              className="font-bold text-sm mb-2"
              style={{ color: "var(--foreground)" }}
            >
              Первый турнир стартует совсем скоро
            </h3>
            <p className="text-xs mb-4 leading-relaxed" style={{ color: "var(--text-sub)" }}>
              Следи за анонсами в Discord — будь первым, кто зарегистрируется
            </p>

            <div className="flex items-center justify-between">
              <a
                href="https://discord.gg/644tWdfqfc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold transition-colors"
                style={{ color: "var(--gold)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.369a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.331c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.332-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.332-.947 2.418-2.157 2.418z" />
                </svg>
                Присоединиться к Discord
              </a>
              <Link
                href="/tournaments"
                className="text-xs font-medium transition-colors"
                style={{ color: "var(--text-sub)" }}
              >
                Все турниры →
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tournaments.map((t) => (
            <TournamentCard
              key={t.id}
              id={t.id}
              name={t.name}
              game={t.game}
              format={t.format}
              status={t.status}
              startDate={t.startDate.toISOString()}
              participants={t._count.participants}
              maxTeams={t.maxTeams}
            />
          ))}
        </div>
      )}
    </section>
  );
}
