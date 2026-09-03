export interface BracketMatch {
  round: number;
  matchNumber: number;
  homePlayerId: string | null;
  awayPlayerId: string | null;
}

export function generateSingleElimination(playerIds: string[]): BracketMatch[] {
  const n = playerIds.length;
  const rounds = Math.ceil(Math.log2(n));
  const totalSlots = Math.pow(2, rounds);
  const matches: BracketMatch[] = [];

  const seeded = [...playerIds];
  while (seeded.length < totalSlots) seeded.push("BYE");

  for (let round = 1; round <= rounds; round++) {
    const matchesInRound = Math.pow(2, rounds - round);
    for (let i = 0; i < matchesInRound; i++) {
      if (round === 1) {
        matches.push({
          round: 1,
          matchNumber: i + 1,
          homePlayerId: seeded[i * 2] === "BYE" ? null : seeded[i * 2],
          awayPlayerId: seeded[i * 2 + 1] === "BYE" ? null : seeded[i * 2 + 1],
        });
      } else {
        matches.push({
          round,
          matchNumber: i + 1,
          homePlayerId: null,
          awayPlayerId: null,
        });
      }
    }
  }
  return matches;
}

export function generateDoubleElimination(playerIds: string[]): BracketMatch[] {
  const upperBracket = generateSingleElimination(playerIds);
  const rounds = Math.max(...upperBracket.map((m) => m.round));
  const lowerBracket: BracketMatch[] = [];

  for (let round = 1; round <= rounds - 1; round++) {
    const matchesInRound = Math.pow(2, rounds - round - 1);
    for (let i = 0; i < matchesInRound; i++) {
      lowerBracket.push({
        round: rounds + round,
        matchNumber: i + 1,
        homePlayerId: null,
        awayPlayerId: null,
      });
    }
  }

  lowerBracket.push({
    round: rounds * 2,
    matchNumber: 1,
    homePlayerId: null,
    awayPlayerId: null,
  });

  return [...upperBracket, ...lowerBracket];
}

export function generateSwissRounds(playerIds: string[]): BracketMatch[] {
  const rounds = Math.ceil(Math.log2(playerIds.length));
  const matches: BracketMatch[] = [];

  for (let round = 1; round <= rounds; round++) {
    const shuffled = [...playerIds].sort(() => Math.random() - 0.5);
    for (let i = 0; i < shuffled.length - 1; i += 2) {
      matches.push({
        round,
        matchNumber: Math.floor(i / 2) + 1,
        homePlayerId: shuffled[i],
        awayPlayerId: shuffled[i + 1],
      });
    }
  }
  return matches;
}
