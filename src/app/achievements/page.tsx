"use client";

import { useState } from "react";
import { ACHIEVEMENTS, getAchievementProgress } from "@/lib/achievements";
import AchievementCard from "@/components/ui/AchievementCard";
import { Trophy, Star, Users, Sparkles } from "lucide-react";

const mockUserStats = {
  tournamentsJoined: 3,
  tournamentsWon: 1,
  currentWinStreak: 4,
  mmr: 4200,
  matchesPlayed: 45,
  matchesWon: 28,
};

const categories = [
  { id: "all", label: "Все", icon: Trophy },
  { id: "tournament", label: "Турниры", icon: Trophy },
  { id: "skill", label: "Мастерство", icon: Star },
  { id: "social", label: "Социальные", icon: Users },
  { id: "special", label: "Особые", icon: Sparkles },
] as const;

export default function AchievementsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered =
    activeCategory === "all"
      ? ACHIEVEMENTS
      : ACHIEVEMENTS.filter((a) => a.category === activeCategory);

  const unlockedCount = ACHIEVEMENTS.filter((a) => {
    const { unlocked } = getAchievementProgress(a.id, mockUserStats);
    return unlocked;
  }).length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--foreground)" }}>
          🏅 Достижения
        </h1>
        <p className="text-sm" style={{ color: "var(--text-sub)" }}>
          Разблокировано: {unlockedCount} / {ACHIEVEMENTS.length}
        </p>

        {/* Progress bar */}
        <div
          className="mt-3 h-2 rounded-full overflow-hidden"
          style={{ background: "var(--border)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${(unlockedCount / ACHIEVEMENTS.length) * 100}%`,
              background: "linear-gradient(90deg, var(--gold), var(--gold-light))",
            }}
          />
        </div>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer"
            style={{
              background:
                activeCategory === cat.id
                  ? "rgba(200,155,60,0.15)"
                  : "var(--surface)",
              color:
                activeCategory === cat.id ? "var(--gold)" : "var(--text-sub)",
              border: `1px solid ${
                activeCategory === cat.id
                  ? "rgba(200,155,60,0.3)"
                  : "var(--border)"
              }`,
            }}
          >
            <cat.icon size={14} />
            {cat.label}
          </button>
        ))}
      </div>

      {/* Achievements grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((achievement) => {
          const { current, unlocked } = getAchievementProgress(
            achievement.id,
            mockUserStats
          );
          return (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              current={current}
              unlocked={unlocked}
            />
          );
        })}
      </div>
    </div>
  );
}
