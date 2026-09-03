export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "tournament" | "skill" | "social" | "special";
  requirement: number;
  current?: number;
  unlocked?: boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  // Tournament achievements
  {
    id: "first_tournament",
    name: "Первый шаг",
    description: "Зарегистрируйся на первый турнир",
    icon: "🎯",
    category: "tournament",
    requirement: 1,
  },
  {
    id: "tournament_winner",
    name: "Чемпион",
    description: "Выиграй свой первый турнир",
    icon: "🏆",
    category: "tournament",
    requirement: 1,
  },
  {
    id: "three_wins",
    name: "Тройная корона",
    description: "Выиграй 3 турнира",
    icon: "👑",
    category: "tournament",
    requirement: 3,
  },
  {
    id: "ten_tournaments",
    name: "Ветеран",
    description: "Участвуй в 10 турнирах",
    icon: "🎖️",
    category: "tournament",
    requirement: 10,
  },

  // Skill achievements
  {
    id: "win_streak_5",
    name: "Неудержимый",
    description: "Выиграй 5 матчей подряд",
    icon: "🔥",
    category: "skill",
    requirement: 5,
  },
  {
    id: "win_streak_10",
    name: "Доминатор",
    description: "Выиграй 10 матчей подряд",
    icon: "⚡",
    category: "skill",
    requirement: 10,
  },
  {
    id: "reach_ancient",
    name: "Древний",
    description: "Достигни ранга Ancient",
    icon: "🥇",
    category: "skill",
    requirement: 3850,
  },
  {
    id: "reach_divine",
    name: "Божественный",
    description: "Достигни ранга Divine",
    icon: "💎",
    category: "skill",
    requirement: 4620,
  },
  {
    id: "reach_immortal",
    name: "Бессмертный",
    description: "Достигни ранга Immortal",
    icon: "👑",
    category: "skill",
    requirement: 5420,
  },

  // Social achievements
  {
    id: "first_match",
    name: "Дебют",
    description: "Сыграй свой первый матч",
    icon: "⚔️",
    category: "social",
    requirement: 1,
  },
  {
    id: "hundred_matches",
    name: "Сталкер",
    description: "Сыграй 100 матчей",
    icon: "💯",
    category: "social",
    requirement: 100,
  },
  {
    id: "first_win",
    name: "Первая кровь",
    description: "Одержи первую победу",
    icon: "🗡️",
    category: "social",
    requirement: 1,
  },

  // Special achievements
  {
    id: "early_bird",
    name: "Ранняя пташка",
    description: "Зарегистрируйся в первых 5 на турнир",
    icon: "🐦",
    category: "special",
    requirement: 1,
  },
  {
    id: "night_owl",
    name: "Сова",
    description: "Сыграй матч после полуночи",
    icon: "🦉",
    category: "special",
    requirement: 1,
  },
  {
    id: "perfectionist",
    name: "Перфекционист",
    description: "Выиграй турнир без единого поражения",
    icon: "✨",
    category: "special",
    requirement: 1,
  },
];

export function getAchievementProgress(
  achievementId: string,
  userStats: {
    tournamentsJoined: number;
    tournamentsWon: number;
    currentWinStreak: number;
    mmr: number;
    matchesPlayed: number;
    matchesWon: number;
  }
): { current: number; unlocked: boolean } {
  switch (achievementId) {
    case "first_tournament":
      return { current: userStats.tournamentsJoined, unlocked: userStats.tournamentsJoined >= 1 };
    case "tournament_winner":
      return { current: userStats.tournamentsWon, unlocked: userStats.tournamentsWon >= 1 };
    case "three_wins":
      return { current: userStats.tournamentsWon, unlocked: userStats.tournamentsWon >= 3 };
    case "ten_tournaments":
      return { current: userStats.tournamentsJoined, unlocked: userStats.tournamentsJoined >= 10 };
    case "win_streak_5":
      return { current: userStats.currentWinStreak, unlocked: userStats.currentWinStreak >= 5 };
    case "win_streak_10":
      return { current: userStats.currentWinStreak, unlocked: userStats.currentWinStreak >= 10 };
    case "reach_ancient":
      return { current: userStats.mmr, unlocked: userStats.mmr >= 3850 };
    case "reach_divine":
      return { current: userStats.mmr, unlocked: userStats.mmr >= 4620 };
    case "reach_immortal":
      return { current: userStats.mmr, unlocked: userStats.mmr >= 5420 };
    case "first_match":
      return { current: userStats.matchesPlayed, unlocked: userStats.matchesPlayed >= 1 };
    case "hundred_matches":
      return { current: userStats.matchesPlayed, unlocked: userStats.matchesPlayed >= 100 };
    case "first_win":
      return { current: userStats.matchesWon, unlocked: userStats.matchesWon >= 1 };
    default:
      return { current: 0, unlocked: false };
  }
}
