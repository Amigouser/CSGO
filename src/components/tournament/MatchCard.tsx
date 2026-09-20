"use client";

import { useState, useRef, useEffect } from "react";
import { Info } from "lucide-react";

export interface MatchCardPlayer {
  nickname: string;
  avatar?: string | null;
  teamName?: string | null;
}

export interface MatchCardProps {
  home?: MatchCardPlayer;
  away?: MatchCardPlayer;
  homeScore?: number | null;
  awayScore?: number | null;
  winner?: "home" | "away" | null;
  status?: string;
  scheduledAt?: string | null;
  width: number;
  height: number;
  highlight?: boolean;
}

export default function MatchCard({
  home,
  away,
  homeScore,
  awayScore,
  winner,
  status,
  scheduledAt,
  width,
  height,
  highlight,
}: MatchCardProps) {
  const [showInfo, setShowInfo] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close popover on outside click
  useEffect(() => {
    if (!showInfo) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setShowInfo(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [showInfo]);

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
          padding: "0 10px",
          height: half,
          opacity: isLose ? 0.4 : 1,
        }}
      >
        {/* Avatar / initial */}
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: 4,
            background: "var(--surface-2)",
            marginRight: 8,
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
            <span style={{ fontSize: 10, color: "var(--text-sub)" }}>
              {p ? p.nickname.charAt(0).toUpperCase() : "?"}
            </span>
          )}
        </div>

        {/* Name */}
        <span
          style={{
            flex: 1,
            fontSize: 12,
            fontWeight: isWin ? 700 : 400,
            color: p ? "var(--foreground)" : "var(--text-sub)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </span>

        {/* Score */}
        {done && score != null ? (
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: isWin ? "var(--gold)" : "var(--text-sub)",
              marginLeft: 8,
              flexShrink: 0,
            }}
          >
            {score}
          </span>
        ) : (
          <span
            style={{
              fontSize: 12,
              color: "var(--text-sub)",
              marginLeft: 8,
              flexShrink: 0,
              opacity: 0.3,
            }}
          >
            –
          </span>
        )}
      </div>
    );
  };

  return (
    <div ref={ref} style={{ position: "relative", width, height }}>
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
          setShowInfo(!showInfo);
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
        <Info size={9} />
      </button>

      {/* Info popover */}
      {showInfo && (
        <div
          style={{
            position: "absolute",
            left: width + 8,
            top: 0,
            zIndex: 20,
            width: 180,
            padding: 12,
            borderRadius: 8,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
            fontSize: 11,
            lineHeight: 1.7,
            color: "var(--text-sub)",
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: 4, color: "var(--foreground)" }}>
            Детали матча
          </div>
          <div>
            Статус: {done ? "Завершён" : status === "active" ? "Идёт" : "Ожидание"}
          </div>
          {scheduledAt && (
            <div>Дата: {new Date(scheduledAt).toLocaleString("ru-RU")}</div>
          )}
          {done && (
            <div>
              Счёт: {homeScore ?? 0} – {awayScore ?? 0}
            </div>
          )}
          {home && <div>🏠 {home.teamName || home.nickname}</div>}
          {away && <div>✈️ {away.teamName || away.nickname}</div>}
        </div>
      )}
    </div>
  );
}
