import {
  Trophy,
  Users,
  Calendar,
  ArrowLeft,
  Swords,
  Award,
} from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import RegisterButton from "./RegisterButton";
import FaceitBadge from "@/components/ui/FaceitBadge";
import TournamentBracket from "@/components/tournament/TournamentBracket";
import {
  generateSingleElimination,
  generateDoubleElimination,
} from "@/lib/bracket";

const statusLabels: Record<string, string> = {
  upcoming: "Скоро",
  registration: "Регистрация",
  active: "Активный",
  completed: "Завершён",
};

const formatLabels: Record<string, string> = {
  single_elim: "Single Elimination",
  double_elim: "Double Elimination",
  swiss: "Swiss System",
  groups_playoffs: "Groups + Playoffs",
};

const gameModeLabels: Record<string, string> = {
  "1v1": "1 vs 1",
  "2v2": "2 vs 2",
  "5v5": "5 vs 5",
};

export default async function TournamentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const tournament = await prisma.tournament.findUnique({
    where: { id },
    include: {
      participants: { include: { user: true } },
    },
  });

  if (!tournament) notFound();

  const user = await getCurrentUser();
  const myParticipation = user
    ? tournament.participants.find((p) => p.userId === user.id)
    : null;
  const registrationStatus = myParticipation?.status || null;
  const approvedCount = tournament.participants.filter((p) => p.status === "approved").length;
  const isFull = approvedCount >= tournament.maxTeams;

  /* ── Bracket data ── */
  const dbMatches = await prisma.match.findMany({
    where: { tournamentId: id },
    orderBy: [{ round: "asc" }, { matchNumber: "asc" }],
  });

  const approvedIds = tournament.participants
    .filter((p) => p.status === "approved")
    .map((p) => p.userId);

  const bracket =
    approvedIds.length >= 2
      ? tournament.format === "double_elim"
        ? generateDoubleElimination(approvedIds)
        : generateSingleElimination(approvedIds)
      : [];

  const playerMap: Record<
    string,
    { id: string; nickname: string; avatar: string | null; teamName: string | null; faceitLevel: number; faceitElo: number }
  > = {};
  for (const p of tournament.participants) {
    playerMap[p.userId] = {
      id: p.userId,
      nickname: p.user.nickname,
      avatar: p.user.avatar,
      teamName: p.teamName,
      faceitLevel: p.user.faceitLevel,
      faceitElo: p.user.faceitElo,
    };
  }

  const mergedMatches = bracket.map((bm) => {
    const db = dbMatches.find(
      (dm) => dm.round === bm.round && dm.matchNumber === bm.matchNumber,
    );
    const homeId = db?.homePlayerId ?? bm.homePlayerId;
    const awayId = db?.awayPlayerId ?? bm.awayPlayerId;
    let winner: "home" | "away" | null = null;
    if (db?.winner) {
      if (db.winner === homeId) winner = "home";
      else if (db.winner === awayId) winner = "away";
    }
    return {
      ...bm,
      homePlayerId: homeId,
      awayPlayerId: awayId,
      homeScore: db?.homeScore ?? null,
      awayScore: db?.awayScore ?? null,
      winner,
      status: db?.status ?? "pending",
      scheduledAt: db?.scheduledAt?.toISOString() ?? null,
    };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link
        href="/tournaments"
        className="inline-flex items-center gap-2 text-sm mb-6"
        style={{ color: "var(--text-sub)" }}
      >
        <ArrowLeft size={16} />
        Назад к турнирам
      </Link>

      {/* Header */}
      <div
        className="rounded-2xl p-6 mb-6"
        style={{
          background: "linear-gradient(135deg, #150d00, #1a0808)",
          border: "1px solid rgba(200,155,60,0.25)",
        }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: "rgba(200,155,60,0.15)", color: "var(--gold)" }}
              >
                {statusLabels[tournament.status] || tournament.status}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(79,195,247,0.15)", color: "#4fc3f7" }}>
                {gameModeLabels[tournament.gameMode] || tournament.gameMode}
              </span>
              <span className="text-xs" style={{ color: "var(--text-sub)" }}>CS2</span>
              {tournament.minFaceitLevel > 0 && (
                <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(249,115,22,0.15)", color: "#f97316" }}>
                  FACEIT {tournament.minFaceitLevel}+
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--foreground)" }}>
              {tournament.name}
            </h1>
            {tournament.description && (
              <p className="text-sm" style={{ color: "var(--text-sub)" }}>
                {tournament.description}
              </p>
            )}
          </div>
          <RegisterButton
            tournamentId={tournament.id}
            registrationStatus={registrationStatus}
            isFull={isFull}
            isOpen={tournament.status === "registration"}
            isLoggedIn={!!user}
            minFaceitLevel={tournament.minFaceitLevel}
            userFaceitLevel={user?.faceitLevel ?? 0}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="flex items-center gap-2">
            <Users size={16} style={{ color: "var(--gold)" }} />
            <div>
              <div className="text-xs" style={{ color: "var(--text-sub)" }}>Участники</div>
              <div className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                {tournament.participants.length}/{tournament.maxTeams}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} style={{ color: "var(--gold)" }} />
            <div>
              <div className="text-xs" style={{ color: "var(--text-sub)" }}>Дата</div>
              <div className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                {new Date(tournament.startDate).toLocaleDateString("ru-RU")}
              </div>
            </div>
          </div>
          {tournament.prizePool && (
            <div className="flex items-center gap-2">
              <Award size={16} style={{ color: "var(--gold)" }} />
              <div>
                <div className="text-xs" style={{ color: "var(--text-sub)" }}>Призовой фонд</div>
                <div className="text-sm font-semibold" style={{ color: "var(--gold)" }}>
                  {tournament.prizePool}
                </div>
              </div>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Swords size={16} style={{ color: "var(--gold)" }} />
            <div>
              <div className="text-xs" style={{ color: "var(--text-sub)" }}>Формат</div>
              <div className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                {formatLabels[tournament.format] || tournament.format}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Participants */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <div className="px-4 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
          <h2 className="text-sm font-bold" style={{ color: "var(--foreground)" }}>
            Участники ({approvedCount})
          </h2>
        </div>
        {approvedCount === 0 ? (
          <div className="p-8 text-center">
            <p style={{ color: "var(--text-sub)" }}>Пока нет одобренных участников</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase" style={{ color: "var(--text-sub)" }}>#</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase" style={{ color: "var(--text-sub)" }}>Игрок</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase" style={{ color: "var(--text-sub)" }}>FACEIT</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase" style={{ color: "var(--text-sub)" }}>ELO</th>
              </tr>
            </thead>
            <tbody>
              {tournament.participants
                .filter((p) => p.status === "approved")
                .map((p, i) => (
                <tr key={p.id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td className="px-4 py-3 text-sm" style={{ color: "var(--text-sub)" }}>{i + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium" style={{ color: "var(--foreground)" }}>
                    {p.user.nickname}
                  </td>
                  <td className="px-4 py-3">
                    {p.user.faceitLevel > 0 ? (
                      <FaceitBadge level={p.user.faceitLevel} size="sm" />
                    ) : (
                      <span className="text-xs" style={{ color: "var(--text-sub)" }}>—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm" style={{ color: "var(--gold)" }}>
                    {p.user.faceitElo > 0 ? p.user.faceitElo : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Bracket */}
      {mergedMatches.length > 0 && (
        <div className="mt-6">
          <h2
            className="text-lg font-bold mb-4"
            style={{ color: "var(--foreground)" }}
          >
            Турнирная сетка
          </h2>
          <div
            className="rounded-xl p-4"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <TournamentBracket
              matches={mergedMatches}
              players={playerMap}
              gameMode={tournament.gameMode}
            />
          </div>
        </div>
      )}
    </div>
  );
}
