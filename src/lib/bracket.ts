export type BracketType = "upper" | "lower" | "grand_final";

export interface BracketMatch {
  /** Unique bracket-level id, e.g. "UB-R1-M1", "LB-R3-M2", "GF-M1" */
  id: string;
  bracketType: BracketType;
  /** Round number *within* its bracket (upper and lower count independently) */
  round: number;
  matchNumber: number;

  homePlayerId: string | null;
  awayPlayerId: string | null;

  /** Match whose WINNER fills the home slot */
  homeSourceMatchId?: string;
  /** Match whose WINNER fills the away slot */
  awaySourceMatchId?: string;

  /** Where the LOSER of this upper-bracket match drops to */
  loserGoesTo?: { matchId: string; slot: "home" | "away" };

  isBye?: boolean;
}

/* ─────────────────────── helpers ─────────────────────── */

function padToPow2(ids: string[]): { seeded: string[]; k: number } {
  const k = Math.max(1, Math.ceil(Math.log2(ids.length)));
  const total = 1 << k;
  const seeded = [...ids];
  while (seeded.length < total) seeded.push("BYE");
  return { seeded, k };
}

function makeId(prefix: string, round: number, match: number): string {
  return `${prefix}-R${round}-M${match}`;
}

/* ─────────────────── Single Elimination ──────────────── */

export function generateSingleElimination(playerIds: string[]): BracketMatch[] {
  if (playerIds.length < 2) return [];
  const { seeded, k } = padToPow2(playerIds);
  const rounds: BracketMatch[][] = [];
  const all: BracketMatch[] = [];

  for (let r = 1; r <= k; r++) {
    const count = 1 << (k - r);
    const round: BracketMatch[] = [];
    for (let m = 1; m <= count; m++) {
      const match: BracketMatch = {
        id: makeId("R", r, m),
        bracketType: "upper",
        round: r,
        matchNumber: m,
        homePlayerId: null,
        awayPlayerId: null,
      };
      if (r === 1) {
        const h = (m - 1) * 2;
        match.homePlayerId = seeded[h] === "BYE" ? null : seeded[h];
        match.awayPlayerId = seeded[h + 1] === "BYE" ? null : seeded[h + 1];
        if (seeded[h] === "BYE" || seeded[h + 1] === "BYE") match.isBye = true;
      }
      round.push(match);
      all.push(match);
    }
    rounds.push(round);
  }

  // Link winners forward
  for (let r = 0; r < k - 1; r++) {
    for (let m = 0; m < rounds[r].length; m++) {
      const dest = rounds[r + 1][m >> 1];
      if ((m & 1) === 0) dest.homeSourceMatchId = rounds[r][m].id;
      else dest.awaySourceMatchId = rounds[r][m].id;
    }
  }

  return all;
}

/* ─────────────────── Double Elimination ──────────────── */

/**
 * Generate a full double-elimination bracket with upper bracket,
 * lower bracket, and grand final. All source/destination links are
 * populated so the component can draw connectors.
 *
 * Lower bracket structure (for k = log2(teams)):
 *   LB R1         : paired UB R1 losers          → N/4 matches
 *   LB R2         : LB R1 winners vs UB R2 losers → N/4 matches
 *   LB R3         : paired LB R2 winners          → N/8 matches
 *   LB R4         : LB R3 winners vs UB R3 losers → N/8 matches
 *   …
 *   LB R(2k-3)    : paired                         → 2 matches
 *   LB R(2k-2)    : vs UB Rk loser                 → 1 match (LB Final)
 */
export function generateDoubleElimination(playerIds: string[]): BracketMatch[] {
  if (playerIds.length < 2) return [];
  const { seeded, k } = padToPow2(playerIds);
  const all: BracketMatch[] = [];

  /* ── Upper bracket ── */
  const ub: BracketMatch[][] = [];
  for (let r = 1; r <= k; r++) {
    const count = 1 << (k - r);
    const round: BracketMatch[] = [];
    for (let m = 1; m <= count; m++) {
      const match: BracketMatch = {
        id: makeId("UB", r, m),
        bracketType: "upper",
        round: r,
        matchNumber: m,
        homePlayerId: null,
        awayPlayerId: null,
      };
      if (r === 1) {
        const h = (m - 1) * 2;
        match.homePlayerId = seeded[h] === "BYE" ? null : seeded[h];
        match.awayPlayerId = seeded[h + 1] === "BYE" ? null : seeded[h + 1];
        if (seeded[h] === "BYE" || seeded[h + 1] === "BYE") match.isBye = true;
      }
      round.push(match);
      all.push(match);
    }
    ub.push(round);
  }

  // UB winner links
  for (let r = 0; r < k - 1; r++) {
    for (let m = 0; m < ub[r].length; m++) {
      const dest = ub[r + 1][m >> 1];
      if ((m & 1) === 0) dest.homeSourceMatchId = ub[r][m].id;
      else dest.awaySourceMatchId = ub[r][m].id;
    }
  }

  /* ── Lower bracket ── */
  const lbRoundCount = 2 * Math.max(0, k - 1);
  const lb: BracketMatch[][] = [];

  for (let lr = 1; lr <= lbRoundCount; lr++) {
    let count: number;
    if (lr === 1) {
      count = Math.max(1, 1 << (k - 2));
    } else if (lr % 2 === 0) {
      count = lb[lr - 2].length;
    } else {
      count = Math.max(1, lb[lr - 2].length >> 1);
    }
    const round: BracketMatch[] = [];
    for (let m = 1; m <= count; m++) {
      round.push({
        id: makeId("LB", lr, m),
        bracketType: "lower",
        round: lr,
        matchNumber: m,
        homePlayerId: null,
        awayPlayerId: null,
      });
    }
    lb.push(round);
    all.push(...round);
  }

  // LB R1: paired UB R1 losers
  if (lb.length > 0) {
    for (let m = 0; m < lb[0].length; m++) {
      const lbm = lb[0][m];
      const u1 = ub[0][m * 2];
      const u2 = ub[0][m * 2 + 1];
      if (u1) {
        lbm.homeSourceMatchId = u1.id;
        u1.loserGoesTo = { matchId: lbm.id, slot: "home" };
      }
      if (u2) {
        lbm.awaySourceMatchId = u2.id;
        u2.loserGoesTo = { matchId: lbm.id, slot: "away" };
      }
    }
  }

  // LB even rounds (2, 4, …): home = prev-LB winner, away = UB loser
  for (let lr = 2; lr <= lbRoundCount; lr += 2) {
    const j = lr / 2; // UB round j (0-indexed) feeds losers here
    for (let m = 0; m < lb[lr - 1].length; m++) {
      const lbm = lb[lr - 1][m];
      if (lb[lr - 2][m]) lbm.homeSourceMatchId = lb[lr - 2][m].id;
      if (ub[j]?.[m]) {
        lbm.awaySourceMatchId = ub[j][m].id;
        ub[j][m].loserGoesTo = { matchId: lbm.id, slot: "away" };
      }
    }
  }

  // LB odd rounds (3, 5, …): paired from previous even round
  for (let lr = 3; lr <= lbRoundCount; lr += 2) {
    for (let m = 0; m < lb[lr - 1].length; m++) {
      const lbm = lb[lr - 1][m];
      if (lb[lr - 2][m * 2]) lbm.homeSourceMatchId = lb[lr - 2][m * 2].id;
      if (lb[lr - 2][m * 2 + 1]) lbm.awaySourceMatchId = lb[lr - 2][m * 2 + 1].id;
    }
  }

  /* ── Grand Final ── */
  if (lbRoundCount > 0) {
    const ubFinal = ub[k - 1][0];
    const lbFinal = lb[lbRoundCount - 1][0];
    all.push({
      id: "GF-M1",
      bracketType: "grand_final",
      round: 1,
      matchNumber: 1,
      homePlayerId: null,
      awayPlayerId: null,
      homeSourceMatchId: ubFinal.id,
      awaySourceMatchId: lbFinal.id,
    });
  }

  return all;
}

/* ──────────────────── Swiss System ───────────────────── */

export function generateSwissRounds(playerIds: string[]): BracketMatch[] {
  const rounds = Math.max(1, Math.ceil(Math.log2(playerIds.length)));
  const matches: BracketMatch[] = [];
  for (let r = 1; r <= rounds; r++) {
    const shuffled = [...playerIds].sort(() => Math.random() - 0.5);
    for (let i = 0; i < shuffled.length - 1; i += 2) {
      const mn = Math.floor(i / 2) + 1;
      matches.push({
        id: makeId("S", r, mn),
        bracketType: "upper",
        round: r,
        matchNumber: mn,
        homePlayerId: shuffled[i],
        awayPlayerId: shuffled[i + 1],
      });
    }
  }
  return matches;
}

/* ──────────────── apply match result ─────────────────── */

/**
 * Route the winner forward and the loser to the lower bracket.
 * Returns a new array (immutable).
 */
export function applyMatchResult(
  matches: BracketMatch[],
  matchId: string,
  winnerId: string,
  loserId: string | null,
): BracketMatch[] {
  const src = matches.find((m) => m.id === matchId);
  if (!src) return matches;

  return matches.map((m) => {
    const u = { ...m };

    // Winner advances to whichever match references this one as a source
    if (m.homeSourceMatchId === matchId) u.homePlayerId = winnerId;
    if (m.awaySourceMatchId === matchId) u.awayPlayerId = winnerId;

    // Loser drops to the lower bracket
    if (src.loserGoesTo?.matchId === m.id && loserId) {
      if (src.loserGoesTo.slot === "home") u.homePlayerId = loserId;
      else u.awayPlayerId = loserId;
    }

    return u;
  });
}
