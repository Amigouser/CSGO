"use client";

interface FaceitBadgeProps {
  level: number;
  elo?: number;
  size?: "sm" | "md" | "lg";
  showElo?: boolean;
}

const levelColors: Record<number, { bg: string; text: string }> = {
  1: { bg: "#808080", text: "#fff" },
  2: { bg: "#77b14a", text: "#fff" },
  3: { bg: "#77b14a", text: "#fff" },
  4: { bg: "#3b82f6", text: "#fff" },
  5: { bg: "#3b82f6", text: "#fff" },
  6: { bg: "#eab308", text: "#000" },
  7: { bg: "#eab308", text: "#000" },
  8: { bg: "#f97316", text: "#fff" },
  9: { bg: "#ef4444", text: "#fff" },
  10: { bg: "linear-gradient(135deg, #c89b3c, #f0c060)", text: "#000" },
};

const levelSizes = {
  sm: { badge: "w-5 h-5", text: "text-[10px]", eloText: "text-[10px]" },
  md: { badge: "w-7 h-7", text: "text-xs", eloText: "text-xs" },
  lg: { badge: "w-10 h-10", text: "text-base font-bold", eloText: "text-sm" },
};

export default function FaceitBadge({ level, elo, size = "md", showElo = false }: FaceitBadgeProps) {
  if (level <= 0 || level > 10) return null;

  const colors = levelColors[level] || levelColors[1];
  const dimensions = levelSizes[size];

  return (
    <div className="flex items-center gap-1.5">
      <div
        className={`${dimensions.badge} rounded-md flex items-center justify-center font-bold ${dimensions.text}`}
        style={{
          background: colors.bg,
          color: colors.text,
          boxShadow: level === 10 ? "0 0 8px rgba(200,155,60,0.5)" : undefined,
        }}
        title={`FACEIT Level ${level}`}
      >
        {level}
      </div>
      {showElo && elo != null && elo > 0 && (
        <span className={`${dimensions.eloText} font-medium`} style={{ color: "var(--text-sub)" }}>
          {elo} ELO
        </span>
      )}
    </div>
  );
}
