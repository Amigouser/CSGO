"use client";

import FaceitBadge from "@/components/ui/FaceitBadge";

export interface MatchCardPlayer {
  nickname: string;
  avatar?: string | null;
  teamName?: string | null;
  faceitLevel?: number;
  faceitElo?: number;
}

export interface MatchCardProps {
  matchId: string;
  home?: MatchCardPlayer;
  away?: MatchCardPlayer;
  homeScore?: number | null;
  awayScore?: number | null;
  winner?: "home" | "away" | null;
  status?: string;
  width: number;
  height: number;
  highlight?: boolean;
  /** Show FACEIT badge + ELO next to player name (for 1v1) */
  showFaceit?: boolean;
  /** Called when user clicks the "i" button */
  onInfoClick?: (matchId: string) => void;
}

export default function MatchCard({
  matchId,
  home,
  away,
  homeScore,
  awayScore,
  winner,
  status,
  width,
  height,
  highlight,
  showFaceit,
  onInfoClick,
}: MatchCardProps) {
  const done = status === "completed";
  const half = height / 2;

  const Row = ({
    p,
    score,
    isWin,
    isLose,
  }: {
    p?: MatchCardPlayer;
    score?: number | null;
    isWin?: boolean;
    isLose?: boolean;
  }) => {
    const name = p?.teamName || p?.nickname || "Ожидание";
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0 8px",
          height: half,
          opacity: isLose ? 0.4 : 1,
        }}
      >
        {/* Avatar / initial */}
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: 4,
            background: "var(--surface-2)",
            marginRight: 6,
            flexShrink: 0,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {p?.avatar ? (
            <img
              src={p.avatar}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span style={{ fontSize: 9, color: "var(--text-sub)" }}>
              {p ? p.nickname.charAt(0).toUpperCase() : "?"}
            </span>
          )}
        </div>

        {/* Name + optional FaceitBadge */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 4,
            overflow: "hidden",
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: isWin ? 700 : 400,
              color: p ? "var(--foreground)" : "var(--text-sub)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {name}
          </span>
          {showFaceit && p?.faceitLevel && p.faceitLevel > 0 && (
            <div style={{ flexShrink: 0 }}>
              <FaceitBadge level={p.faceitLevel} elo={p.faceitElo} size="sm" showElo={false} />
            </div>
          )}
        </div>

        {/* Score + ELO */}
        <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
          {showFaceit && p?.faceitElo && p.faceitElo > 0 && (
            <span style={{ fontSize: 10, color: "var(--text-sub)" }}>
              {p.faceitElo}
            </span>
          )}
          {done && score != null ? (
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: isWin ? "var(--gold)" : "var(--text-sub)",
                minWidth: 16,
                textAlign: "right",
              }}
            >
              {score}
            </span>
          ) : (
            <span
              style={{
                fontSize: 12,
                color: "var(--text-sub)",
                opacity: 0.3,
                minWidth: 16,
                textAlign: "right",
              }}
            >
              –
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{ position: "relative", width, height }}>
      {/* Card body */}
      <div
        style={{
          width,
          height,
          background: "var(--surface)",
          border: `1px solid ${highlight ? "var(--gold)" : "var(--border)"}`,
          borderRadius: 8,
          overflow: "hidden",
          transition: "border-color 0.15s",
        }}
      >
        <Row p={home} score={homeScore} isWin={winner === "home"} isLose={winner === "away"} />
        <div style={{ height: 1, background: "var(--border)" }} />
        <Row p={away} score={awayScore} isWin={winner === "away"} isLose={winner === "home"} />
      </div>

      {/* Info button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onInfoClick?.(matchId);
        }}
        style={{
          position: "absolute",
          right: -16,
          top: height / 2 - 8,
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: "var(--surface-2)",
          border: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "var(--text-sub)",
          padding: 0,
        }}
      >
        <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
          <text x="12" y="16" textAnchor="middle" fontSize="14" fontWeight="bold" fill="currentColor">i</text>
        </svg>
      </button>
    </div>
  );
}
