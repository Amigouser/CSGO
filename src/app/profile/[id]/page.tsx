import {
  Trophy,
  Swords,
  Calendar,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import FaceitRefreshButton from "@/components/ui/FaceitRefreshButton";

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let lookupId = id;
  if (id === "me") {
    const me = await getCurrentUser();
    if (!me) redirect("/login");
    redirect(`/profile/${me.steamId}`);
  }

  const currentUser = await getCurrentUser();

  const user = await prisma.user.findFirst({
    where: { OR: [{ steamId: lookupId }, { id: lookupId }] },
    include: {
      tournaments: { include: { tournament: true } },
      matchesHome: true,
      matchesAway: true,
    },
  });

  if (!user) notFound();

  const totalGames = user.wins + user.losses;
  const winrate = totalGames > 0 ? Math.round((user.wins / totalGames) * 100) : 0;
  const daysOnPlatform = Math.floor(
    (Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/leaderboard"
        className="inline-flex items-center gap-2 text-sm mb-6"
        style={{ color: "var(--text-sub)" }}
      >
        <ArrowLeft size={16} />
        Назад к рейтингу
      </Link>

      {/* Profile header */}
      <div
        className="rounded-2xl p-6 mb-6"
        style={{
          background: "linear-gradient(135deg, #150d00, var(--surface))",
          border: "1px solid rgba(200,155,60,0.25)",
        }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div
            className="w-20 h-20 rounded-xl flex items-center justify-center text-3xl overflow-hidden"
            style={{ background: "var(--surface-2)", border: "2px solid var(--gold)" }}
          >
            {user.avatar ? (
              <img src={user.avatar} alt={user.nickname} className="w-full h-full object-cover" />
            ) : (
              "👑"
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
                {user.nickname}
              </h1>
            </div>
            <FaceitRefreshButton
              currentUserId={currentUser?.id ?? null}
              profileUserId={user.id}
              faceitLevel={user.faceitLevel}
              faceitElo={user.faceitElo}
            />
            <p className="text-sm mb-3" style={{ color: "var(--text-sub)" }}>
              Steam ID: {user.steamId}
            </p>
            <div className="flex flex-wrap gap-4">
              {user.faceitElo > 0 && (
                <div>
                  <div className="text-xs" style={{ color: "var(--text-sub)" }}>FACEIT ELO</div>
                  <div className="text-xl font-bold" style={{ color: "var(--gold)" }}>
                    {user.faceitElo}
                  </div>
                </div>
              )}
              <div>
                <div className="text-xs" style={{ color: "var(--text-sub)" }}>W/L</div>
                <div className="text-xl font-bold">
                  <span style={{ color: "#52b788" }}>{user.wins}</span>
                  <span style={{ color: "var(--text-sub)" }}>/</span>
                  <span style={{ color: "var(--red)" }}>{user.losses}</span>
                </div>
              </div>
              <div>
                <div className="text-xs" style={{ color: "var(--text-sub)" }}>Винрейт</div>
                <div
                  className="text-xl font-bold"
                  style={{ color: winrate >= 50 ? "#52b788" : "var(--red)" }}
                >
                  {winrate}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Турниров", value: user.tournaments.length, icon: Trophy, color: "var(--gold)" },
          { label: "Матчей", value: totalGames, icon: Swords, color: "#4fc3f7" },
          { label: "Побед", value: user.wins, icon: TrendingUp, color: "#52b788" },
          ...(user.faceitLevel > 0 ? [{ label: "FACEIT", value: `Lvl ${user.faceitLevel} / ${user.faceitElo} ELO`, icon: TrendingUp, color: "#f97316" }] : [{ label: "FACEIT", value: "Не привязан", icon: TrendingUp, color: "var(--text-sub)" }]),
          {
            label: "На платформе",
            value: `${daysOnPlatform} дн.`,
            icon: Calendar,
            color: "var(--text-sub)",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="p-4 rounded-xl text-center"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <s.icon size={20} style={{ color: s.color, margin: "0 auto 8px" }} />
            <div className="text-lg font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs" style={{ color: "var(--text-sub)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Recent matches */}
      <div
        className="rounded-xl p-5"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <h2 className="text-lg font-bold mb-4" style={{ color: "var(--foreground)" }}>
          Последние матчи
        </h2>
        {user.matchesHome.length === 0 && user.matchesAway.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--text-sub)" }}>
            Пока нет матчей. Зарегистрируйся на турнир!
          </p>
        ) : (
          <div className="space-y-3">
            {[...user.matchesHome, ...user.matchesAway]
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .slice(0, 5)
              .map((m) => {
                const isHome = m.homePlayerId === user.id;
                const won = m.winner === user.id;
                return (
                  <div
                    key={m.id}
                    className="flex items-center justify-between p-3 rounded-lg"
                    style={{ background: "var(--hover-bg)" }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{
                          background: won ? "rgba(82,183,136,0.15)" : "rgba(229,83,75,0.15)",
                          color: won ? "#52b788" : "var(--red)",
                        }}
                      >
                        {won ? "Победа" : "Поражение"}
                      </span>
                      <span className="text-sm font-bold" style={{ color: "var(--gold)" }}>
                        {m.homeScore ?? "?"}:{m.awayScore ?? "?"}
                      </span>
                    </div>
                    <span className="text-xs" style={{ color: "var(--text-sub)" }}>
                      {new Date(m.createdAt).toLocaleDateString("ru-RU")}
                    </span>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}
