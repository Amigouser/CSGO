"use client";

import { useState } from "react";

interface MatchData {
  id: string;
  round: number;
  matchNumber: number;
  homePlayer: string | null;
  awayPlayer: string | null;
  homeScore: number | null;
  awayScore: number | null;
  winner: "home" | "away" | null;
}

interface TournamentBracketProps {
  matches: MatchData[];
  rounds: number;
}

export default function TournamentBracket({ matches, rounds }: TournamentBracketProps) {
  const [hoveredMatch, setHoveredMatch] = useState<string | null>(null);

  const matchWidth = 200;
  const matchHeight = 60;
  const roundGap = 60;
  const matchGap = 20;

  const getMatchesByRound = (round: number) =>
    matches.filter((m) => m.round === round);

  const totalHeight = Math.pow(2, rounds - 1) * (matchHeight + matchGap);
  const totalWidth = rounds * (matchWidth + roundGap) + 40;

  return (
    <div className="overflow-x-auto pb-4">
      <svg
        width={totalWidth}
        height={totalHeight}
        viewBox={`0 0 ${totalWidth} ${totalHeight}`}
        className="min-w-full"
      >
        {Array.from({ length: rounds }, (_, round) => {
          const roundMatches = getMatchesByRound(round + 1);
          const matchesInRound = Math.pow(2, rounds - round - 1);
          const spacing = totalHeight / matchesInRound;

          return roundMatches.map((match, i) => {
            const x = 20 + round * (matchWidth + roundGap);
            const y = spacing * i + spacing / 2 - matchHeight / 2;
            const isHovered = hoveredMatch === match.id;

            return (
              <g key={match.id}>
                {/* Connector line to next round */}
                {round < rounds - 1 && (
                  <line
                    x1={x + matchWidth}
                    y1={y + matchHeight / 2}
                    x2={x + matchWidth + roundGap}
                    y2={y + matchHeight / 2}
                    stroke="rgba(200,155,60,0.2)"
                    strokeWidth={2}
                  />
                )}

                {/* Match box */}
                <rect
                  x={x}
                  y={y}
                  width={matchWidth}
                  height={matchHeight}
                  rx={8}
                  fill={isHovered ? "rgba(200,155,60,0.15)" : "var(--surface)"}
                  stroke={isHovered ? "var(--gold)" : "var(--border)"}
                  strokeWidth={isHovered ? 2 : 1}
                  className="cursor-pointer transition-all"
                  onMouseEnter={() => setHoveredMatch(match.id)}
                  onMouseLeave={() => setHoveredMatch(null)}
                />

                {/* Home player */}
                <text
                  x={x + 10}
                  y={y + 22}
                  fill={match.winner === "home" ? "var(--gold)" : "var(--foreground)"}
                  fontSize={12}
                  fontWeight={match.winner === "home" ? "bold" : "normal"}
                >
                  {match.homePlayer || "TBD"}
                </text>

                {/* Home score */}
                {match.homeScore !== null && (
                  <text
                    x={x + matchWidth - 10}
                    y={y + 22}
                    fill={match.winner === "home" ? "var(--gold)" : "var(--text-sub)"}
                    fontSize={12}
                    fontWeight="bold"
                    textAnchor="end"
                  >
                    {match.homeScore}
                  </text>
                )}

                {/* Divider */}
                <line
                  x1={x + 10}
                  y1={y + matchHeight / 2}
                  x2={x + matchWidth - 10}
                  y2={y + matchHeight / 2}
                  stroke="var(--border)"
                  strokeWidth={0.5}
                />

                {/* Away player */}
                <text
                  x={x + 10}
                  y={y + 44}
                  fill={match.winner === "away" ? "var(--gold)" : "var(--foreground)"}
                  fontSize={12}
                  fontWeight={match.winner === "away" ? "bold" : "normal"}
                >
                  {match.awayPlayer || "TBD"}
                </text>

                {/* Away score */}
                {match.awayScore !== null && (
                  <text
                    x={x + matchWidth - 10}
                    y={y + 44}
                    fill={match.winner === "away" ? "var(--gold)" : "var(--text-sub)"}
                    fontSize={12}
                    fontWeight="bold"
                    textAnchor="end"
                  >
                    {match.awayScore}
                  </text>
                )}

                {/* Round label */}
                {i === 0 && (
                  <text
                    x={x + matchWidth / 2}
                    y={y - 10}
                    fill="var(--text-sub)"
                    fontSize={10}
                    textAnchor="middle"
                    fontWeight="bold"
                  >
                    {round === rounds - 1
                      ? "Финал"
                      : round === rounds - 2
                      ? "Полуфинал"
                      : `Раунд ${round + 1}`}
                  </text>
                )}
              </g>
            );
          });
        })}
      </svg>
    </div>
  );
}
