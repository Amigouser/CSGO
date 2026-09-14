import Link from "next/link";
import TournamentCard from "@/components/tournament/TournamentCard";
import { prisma } from "@/lib/prisma";

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
          className="rounded-xl p-8 text-center"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <p style={{ color: "var(--text-sub)" }}>Турниров пока нет. Скоро появятся!</p>
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
