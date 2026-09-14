export type Game = "cs2";

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
  { name: "Silver I", minMmr: 0, icon: "🥉" },
  { name: "Silver Elite", minMmr: 500, icon: "🥉" },
  { name: "Gold Nova", minMmr: 1000, icon: "🥈" },
  { name: "MG", minMmr: 1500, icon: "🥈" },
  { name: "DMG", minMmr: 2000, icon: "🥇" },
  { name: "Legendary Eagle", minMmr: 2500, icon: "🥇" },
  { name: "Supreme", minMmr: 3500, icon: "💎" },
  { name: "Global Elite", minMmr: 4500, icon: "👑" },
] as const;

export function getRankByMmr(mmr: number): string {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (mmr >= RANKS[i].minMmr) return RANKS[i].name;
  }
  return "Silver I";
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
  cs2: "CS2",
};
