import Link from "next/link";
import { Trophy, Users } from "lucide-react";

interface TournamentCardProps {
  id: string;
  name: string;
  game: string;
  format: string;
  status: string;
  startDate: string;
  participants?: number;
  maxTeams: number;
}

export default function TournamentCard({
  id,
  name,
  game,
  format,
  status,
  startDate,
  participants = 0,
  maxTeams,
}: TournamentCardProps) {
  const statusColors: Record<string, { bg: string; text: string }> = {
    upcoming: { bg: "rgba(79,195,247,0.15)", text: "#4fc3f7" },
    registration: { bg: "rgba(200,155,60,0.15)", text: "var(--gold)" },
    active: { bg: "rgba(82,183,136,0.15)", text: "#52b788" },
    completed: { bg: "rgba(139,148,158,0.15)", text: "var(--text-sub)" },
  };

  const statusLabels: Record<string, string> = {
    upcoming: "Скоро",
    registration: "Регистрация",
    active: "Активный",
    completed: "Завершён",
  };

  const sc = statusColors[status] || statusColors.upcoming;

  return (
    <Link href={`/tournaments/${id}`}>
      <div
        className="rounded-xl overflow-hidden game-card"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <div
          className="h-32 flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #081a0d, #0d1117)",
          }}
        >
          <Trophy size={48} style={{ color: "var(--gold)", opacity: 0.3 }} />
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ background: sc.bg, color: sc.text }}
            >
              {statusLabels[status] || status}
            </span>
            <span className="text-xs" style={{ color: "var(--text-sub)" }}>
              CS2
            </span>
          </div>
          <h3 className="font-semibold text-sm mb-1" style={{ color: "var(--foreground)" }}>
            {name}
          </h3>
          <div className="flex items-center gap-3 text-xs" style={{ color: "var(--text-sub)" }}>
            <span className="flex items-center gap-1">
              <Users size={12} />
              {participants}/{maxTeams}
            </span>
            <span>{new Date(startDate).toLocaleDateString("ru-RU")}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
