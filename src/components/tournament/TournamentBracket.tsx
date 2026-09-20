"use client";

import { useMemo, useState } from "react";
import MatchCard, { type MatchCardPlayer } from "./MatchCard";
import MatchDetailsModal from "./MatchDetailsModal";

/* ─────────────────────── types ──────────────────────── */

type BracketType = "upper" | "lower" | "grand_final";

interface MatchData {
  id: string;
  bracketType: BracketType;
  round: number;
  matchNumber: number;
  homePlayerId: string | null;
  awayPlayerId: string | null;
  homeSourceMatchId?: string;
  awaySourceMatchId?: string;
  loserGoesTo?: { matchId: string; slot: "home" | "away" };
  homeScore?: number | null;
  awayScore?: number | null;
  winner?: "home" | "away" | null;
  status?: string;
  scheduledAt?: string | null;
}

interface PlayerInfo extends MatchCardPlayer {
  id: string;
}

export interface TournamentBracketProps {
  matches: MatchData[];
  players: Record<string, PlayerInfo>;
  /** Tournament gameMode — "1v1" shows FaceitBadge+ELO in cards */
  gameMode?: string;
}

/* ───────────────────── constants ────────────────────── */

const CW = 220; // card width
const CH = 72; // card height
const COL_GAP = 48; // horizontal gap between round columns
const ROW_GAP = 16; // vertical gap between matches in one column
const SEC_GAP = 80; // gap between upper and lower sections
const HDR_H = 36; // round-header height
const PAD = 24; // outer padding

type Pos = { x: number; y: number };

/* ─────────────── round-name generators ──────────────── */

function ubRoundName(r: number, total: number): string {
  const fromEnd = total - r;
  if (fromEnd === 0) return "Upper Bracket Final";
  if (fromEnd === 1) return "Upper Bracket Semifinals";
  if (fromEnd === 2) return "UB Quarterfinals";
  return `UB Round ${r}`;
}

function lbRoundName(r: number, total: number): string {
  const fromEnd = total - r;
  if (fromEnd === 0) return "Lower Bracket Final";
  if (fromEnd === 1) return "Lower Bracket Semifinals";
  if (fromEnd === 2) return "LB Quarterfinals";
  return `LB Round ${r}`;
}

/* ────────────────── main component ──────────────────── */

export default function TournamentBracket({
  matches,
  players,
  gameMode,
}: TournamentBracketProps) {
  const [modalMatchId, setModalMatchId] = useState<string | null>(null);
  /* ── Layout: positions for every match card ── */
  const layout = useMemo(() => {
    const ub = new Map<number, MatchData[]>();
    const lb = new Map<number, MatchData[]>();
    let gf: MatchData | null = null;

    for (const m of matches) {
      if (m.bracketType === "upper") {
        const a = ub.get(m.round) ?? [];
        a.push(m);
        ub.set(m.round, a);
      } else if (m.bracketType === "lower") {
        const a = lb.get(m.round) ?? [];
        a.push(m);
        lb.set(m.round, a);
      } else {
        gf = m;
      }
    }

    const ubR = ub.size; // total UB rounds
    const lbR = lb.size; // total LB rounds

    // Column index: UB round r → r-1, LB round r → r, GF → max(ubR-1, lbR)+1
    const colOf = (bt: BracketType, r: number): number => {
      if (bt === "upper") return r - 1;
      if (bt === "lower") return r;
      return Math.max(ubR - 1, lbR) + 1;
    };
    const totalCols = Math.max(ubR - 1, lbR) + 2;

    // Both sections share the same height (based on the taller one)
    const ubMax = Math.max(1, ...Array.from(ub.values()).map((a) => a.length));
    const lbMax = Math.max(1, ...Array.from(lb.values()).map((a) => a.length));
    const secH = Math.max(ubMax, lbMax) * (CH + ROW_GAP);

    const xOf = (col: number) => PAD + col * (CW + COL_GAP);
    const pos = new Map<string, Pos>();

    // ── UB positions ──
    // R1: evenly spaced
    const ubR1 = ub.get(1) ?? [];
    for (let i = 0; i < ubR1.length; i++) {
      const slot = secH / ubR1.length;
      pos.set(ubR1[i].id, {
        x: xOf(colOf("upper", 1)),
        y: PAD + HDR_H + i * slot + (slot - CH) / 2,
      });
    }
    // R2+: vertically centred between two source matches
    for (let r = 2; r <= ubR; r++) {
      for (const m of ub.get(r) ?? []) {
        const h = m.homeSourceMatchId ? pos.get(m.homeSourceMatchId) : undefined;
        const a = m.awaySourceMatchId ? pos.get(m.awaySourceMatchId) : undefined;
        const y =
          h && a ? (h.y + a.y) / 2 : (h?.y ?? a?.y ?? PAD + HDR_H);
        pos.set(m.id, { x: xOf(colOf("upper", r)), y });
      }
    }

    // ── LB positions ──
    const lbBase = PAD + HDR_H + secH + SEC_GAP + HDR_H;

    // R1: evenly spaced in lower section
    const lbR1 = lb.get(1) ?? [];
    for (let i = 0; i < lbR1.length; i++) {
      const slot = secH / lbR1.length;
      pos.set(lbR1[i].id, {
        x: xOf(colOf("lower", 1)),
        y: lbBase + i * slot + (slot - CH) / 2,
      });
    }

    // R2+: even rounds → same y as home source (LB survivor);
    //       odd rounds → centred between two LB sources
    for (let r = 2; r <= lbR; r++) {
      for (const m of lb.get(r) ?? []) {
        const h = m.homeSourceMatchId ? pos.get(m.homeSourceMatchId) : undefined;
        const a = m.awaySourceMatchId ? pos.get(m.awaySourceMatchId) : undefined;
        const y =
          r % 2 === 0
            ? (h?.y ?? lbBase)
            : h && a
              ? (h.y + a.y) / 2
              : (h?.y ?? a?.y ?? lbBase);
        pos.set(m.id, { x: xOf(colOf("lower", r)), y });
      }
    }

    // ── Grand Final: centred vertically between the two sections ──
    if (gf) {
      const totalSecH = 2 * secH + SEC_GAP + 2 * HDR_H;
      pos.set(gf.id, {
        x: xOf(colOf("grand_final", 1)),
        y: PAD + totalSecH / 2 - CH / 2,
      });
    }

    // ── Dimensions ──
    const totalW = PAD * 2 + totalCols * (CW + COL_GAP) - COL_GAP;
    const totalH = PAD * 2 + 2 * HDR_H + 2 * secH + SEC_GAP;

    // Midpoint of the gap between UB and LB sections (for loser connectors)
    const gapMidY = PAD + HDR_H + secH + SEC_GAP / 2;

    // ── Column header info ──
    const cols: { ci: number; x: number; ub?: string; lb?: string }[] = [];
    const getCol = (ci: number) => {
      let c = cols.find((x) => x.ci === ci);
      if (!c) {
        c = { ci, x: xOf(ci) };
        cols.push(c);
      }
      return c;
    };
    for (const [r] of ub) getCol(colOf("upper", r)).ub = ubRoundName(r, ubR);
    for (const [r] of lb) getCol(colOf("lower", r)).lb = lbRoundName(r, lbR);
    cols.sort((a, b) => a.ci - b.ci);

    return {
      pos,
      totalW,
      totalH,
      gapMidY,
      cols,
      secH,
      gf,
      colOf,
      xOf,
    };
  }, [matches]);

  /* ── Connector SVG paths ── */
  const connectors = useMemo(() => {
    const lines: { d: string; dashed: boolean }[] = [];
    const { pos, gapMidY } = layout;

    for (const m of matches) {
      // Winner: homeSource → this match's home slot (top quarter)
      if (m.homeSourceMatchId) {
        const s = pos.get(m.homeSourceMatchId);
        const d = pos.get(m.id);
        if (s && d) {
          const sx = s.x + CW;
          const sy = s.y + CH / 2;
          const dx = d.x;
          const dy = d.y + CH / 4;
          const mx = (sx + dx) / 2;
          lines.push({ d: `M${sx},${sy}H${mx}V${dy}H${dx}`, dashed: false });
        }
      }
      // Winner: awaySource → this match's away slot (bottom quarter)
      if (m.awaySourceMatchId) {
        const s = pos.get(m.awaySourceMatchId);
        const d = pos.get(m.id);
        if (s && d) {
          const sx = s.x + CW;
          const sy = s.y + CH / 2;
          const dx = d.x;
          const dy = d.y + (CH * 3) / 4;
          const mx = (sx + dx) / 2;
          lines.push({ d: `M${sx},${sy}H${mx}V${dy}H${dx}`, dashed: false });
        }
      }
      // Loser: UB match → LB match (routed through the gap)
      if (m.bracketType === "upper" && m.loserGoesTo) {
        const s = pos.get(m.id);
        const d = pos.get(m.loserGoesTo.matchId);
        if (s && d) {
          const sx = s.x + CW / 2;
          const sy = s.y + CH;
          const dx = d.x;
          const dy =
            d.y + (m.loserGoesTo.slot === "home" ? CH / 4 : (CH * 3) / 4);
          lines.push({
            d: `M${sx},${sy}V${gapMidY}H${dx}V${dy}`,
            dashed: true,
          });
        }
      }
    }
    return lines;
  }, [matches, layout]);

  /* ── Empty state ── */
  if (matches.length === 0) {
    return (
      <div
        className="text-center py-16"
        style={{ color: "var(--text-sub)" }}
      >
        Турнирная сетка пока не сгенерирована
      </div>
    );
  }

  const { pos, totalW, totalH, cols, gf, secH, colOf, xOf } = layout;

  return (
    <div style={{ overflowX: "auto", paddingBottom: 16 }}>
      <div
        style={{
          position: "relative",
          width: totalW,
          height: totalH,
          minWidth: totalW,
        }}
      >
        {/* ── SVG connector layer ── */}
        <svg
          width={totalW}
          height={totalH}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
          }}
        >
          {connectors.map((c, i) => (
            <path
              key={i}
              d={c.d}
              fill="none"
              stroke="var(--border)"
              strokeWidth={1.5}
              strokeDasharray={c.dashed ? "4 3" : undefined}
              opacity={c.dashed ? 0.45 : 0.6}
            />
          ))}
        </svg>

        {/* ── Round headers: upper section ── */}
        {cols.map(
          (col) =>
            col.ub && (
              <div
                key={`ub-h-${col.ci}`}
                style={{
                  position: "absolute",
                  left: col.x + CW / 2,
                  top: PAD,
                  transform: "translateX(-50%)",
                }}
              >
                <HeaderLabel>{col.ub}</HeaderLabel>
              </div>
            ),
        )}

        {/* ── Round headers: lower section ── */}
        {cols.map(
          (col) =>
            col.lb && (
              <div
                key={`lb-h-${col.ci}`}
                style={{
                  position: "absolute",
                  left: col.x + CW / 2,
                  top: PAD + HDR_H + secH + SEC_GAP,
                  transform: "translateX(-50%)",
                }}
              >
                <HeaderLabel>{col.lb}</HeaderLabel>
              </div>
            ),
        )}

        {/* ── Grand Final header ── */}
        {gf && (
          <div
            style={{
              position: "absolute",
              left: xOf(colOf("grand_final", 1)) + CW / 2,
              top: PAD + HDR_H + secH + SEC_GAP / 2 - CH / 2 - 30,
              transform: "translateX(-50%)",
            }}
          >
            <HeaderLabel gold>Grand Final</HeaderLabel>
          </div>
        )}

        {/* ── Match cards ── */}
        {matches.map((m) => {
          const p = pos.get(m.id);
          if (!p) return null;
          const hp = m.homePlayerId ? players[m.homePlayerId] : undefined;
          const ap = m.awayPlayerId ? players[m.awayPlayerId] : undefined;
          return (
            <div
              key={m.id}
              style={{ position: "absolute", left: p.x, top: p.y }}
            >
              <MatchCard
                matchId={m.id}
                home={
                  hp
                    ? { nickname: hp.nickname, avatar: hp.avatar, teamName: hp.teamName, faceitLevel: hp.faceitLevel, faceitElo: hp.faceitElo }
                    : undefined
                }
                away={
                  ap
                    ? { nickname: ap.nickname, avatar: ap.avatar, teamName: ap.teamName, faceitLevel: ap.faceitLevel, faceitElo: ap.faceitElo }
                    : undefined
                }
                homeScore={m.homeScore}
                awayScore={m.awayScore}
                winner={m.winner}
                status={m.status}
                width={CW}
                height={CH}
                highlight={m.bracketType === "grand_final"}
                showFaceit={gameMode === "1v1"}
                onInfoClick={setModalMatchId}
              />
            </div>
          );
        })}
      </div>

      {/* Match details modal */}
      {modalMatchId && (
        <MatchDetailsModal
          matchId={modalMatchId}
          isOpen={!!modalMatchId}
          onClose={() => setModalMatchId(null)}
        />
      )}
    </div>
  );
}

/* ────────────── tiny shared sub-components ────────────── */

function HeaderLabel({
  children,
  gold,
}: {
  children: React.ReactNode;
  gold?: boolean;
}) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 12px",
        borderRadius: 6,
        background: gold ? "rgba(200,155,60,0.12)" : "var(--surface-2)",
        border: `1px solid ${gold ? "rgba(200,155,60,0.3)" : "var(--border)"}`,
        fontSize: 11,
        fontWeight: gold ? 700 : 600,
        color: gold ? "var(--gold)" : "var(--text-sub)",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}
