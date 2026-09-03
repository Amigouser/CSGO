const K_FACTOR_NEW = 32;
const K_FACTOR_EXPERIENCED = 16;
const MATCHES_THRESHOLD = 30;

export function calculateElo(
  playerRating: number,
  opponentRating: number,
  actualScore: number,
  totalMatches: number
): number {
  const K = totalMatches >= MATCHES_THRESHOLD ? K_FACTOR_EXPERIENCED : K_FACTOR_NEW;
  const expectedScore = 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
  return Math.round(playerRating + K * (actualScore - expectedScore));
}

export function getRankByMmr(mmr: number): string {
  if (mmr >= 5420) return "Immortal";
  if (mmr >= 4620) return "Divine";
  if (mmr >= 3850) return "Ancient";
  if (mmr >= 3080) return "Legend";
  if (mmr >= 2310) return "Archon";
  if (mmr >= 1540) return "Crusader";
  if (mmr >= 770) return "Guardian";
  return "Herald";
}
