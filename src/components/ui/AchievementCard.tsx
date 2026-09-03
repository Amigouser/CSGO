"use client";

import { Achievement } from "@/lib/achievements";

interface AchievementCardProps {
  achievement: Achievement;
  current: number;
  unlocked: boolean;
}

export default function AchievementCard({
  achievement,
  current,
  unlocked,
}: AchievementCardProps) {
  const progress = Math.min((current / achievement.requirement) * 100, 100);

  return (
    <div
      className={`p-4 rounded-xl transition-all duration-300 ${
        unlocked ? "ring-2 ring-gold/30" : ""
      }`}
      style={{
        background: unlocked
          ? "linear-gradient(135deg, rgba(200,155,60,0.1), var(--surface))"
          : "var(--surface)",
        border: `1px solid ${unlocked ? "rgba(200,155,60,0.3)" : "var(--border)"}`,
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="text-3xl flex-shrink-0"
          style={{
            filter: unlocked ? "none" : "grayscale(1) opacity(0.5)",
          }}
        >
          {achievement.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4
              className="font-semibold text-sm truncate"
              style={{
                color: unlocked ? "var(--gold)" : "var(--foreground)",
              }}
            >
              {achievement.name}
            </h4>
            {unlocked && (
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-gold/20 text-gold">
                ✓
              </span>
            )}
          </div>
          <p className="text-xs mb-2" style={{ color: "var(--text-sub)" }}>
            {achievement.description}
          </p>

          {/* Progress bar */}
          <div className="relative h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: unlocked
                  ? "linear-gradient(90deg, var(--gold), var(--gold-light))"
                  : "var(--text-sub)",
              }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs" style={{ color: "var(--text-sub)" }}>
              {current.toLocaleString()} / {achievement.requirement.toLocaleString()}
            </span>
            <span className="text-xs font-medium" style={{ color: unlocked ? "var(--gold)" : "var(--text-sub)" }}>
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
