export type Game = "dota2" | "cs2";

export type TournamentFormat =
  | "single_elim"
  | "double_elim"
  | "swiss"
  | "groups_playoffs";

export type TournamentStatus =
  | "upcoming"
  | "registration"
  | "active"
  | "completed";

export type MatchStatus = "pending" | "active" | "completed";

export const RANKS = [
  { name: "Herald", minMmr: 0, icon: "🥉" },
  { name: "Guardian", minMmr: 770, icon: "🥉" },
  { name: "Crusader", minMmr: 1540, icon: "🥈" },
  { name: "Archon", minMmr: 2310, icon: "🥈" },
  { name: "Legend", minMmr: 3080, icon: "🥇" },
  { name: "Ancient", minMmr: 3850, icon: "🥇" },
  { name: "Divine", minMmr: 4620, icon: "💎" },
  { name: "Immortal", minMmr: 5420, icon: "👑" },
] as const;

export function getRankByMmr(mmr: number): string {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (mmr >= RANKS[i].minMmr) return RANKS[i].name;
  }
  return "Herald";
}

export const FORMAT_LABELS: Record<TournamentFormat, string> = {
  single_elim: "Single Elimination",
  double_elim: "Double Elimination",
  swiss: "Swiss System",
  groups_playoffs: "Groups + Playoffs",
};

export const STATUS_LABELS: Record<TournamentStatus, string> = {
  upcoming: "Скоро",
  registration: "Регистрация",
  active: "Активный",
  completed: "Завершён",
};

export const GAME_LABELS: Record<Game, string> = {
  dota2: "Dota 2",
  cs2: "CS2",
};
