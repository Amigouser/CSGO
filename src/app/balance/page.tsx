"use client";

import { TrendingUp, TrendingDown, Minus, Scale } from "lucide-react";

const balanceChanges = [
  {
    hero: "Pudge",
    change: "Buff",
    detail: "Meat Hook damage increased from 150/220/290/360 to 180/240/300/360",
    patch: "7.37d",
    impact: "high",
  },
  {
    hero: "Invoker",
    change: "Nerf",
    detail: "Invoke cooldown increased from 6/4/2/0 to 7/5/3/0",
    patch: "7.37d",
    impact: "medium",
  },
  {
    hero: "Juggernaut",
    change: "Buff",
    detail: "Blade Fury duration increased from 5s to 5.5s",
    patch: "7.37d",
    impact: "low",
  },
  {
    hero: "Crystal Maiden",
    change: "Rework",
    detail: "Arcane Aura now also provides +10 attack speed to nearby allies",
    patch: "7.37d",
    impact: "high",
  },
  {
    hero: "Anti-Mage",
    change: "Nerf",
    detail: "Mana Break mana burn reduced from 28/40/52/64 to 24/36/48/60",
    patch: "7.37d",
    impact: "medium",
  },
];

const impactColors: Record<string, { bg: string; text: string }> = {
  high: { bg: "rgba(229,83,75,0.15)", text: "var(--red)" },
  medium: { bg: "rgba(200,155,60,0.15)", text: "var(--gold)" },
  low: { bg: "rgba(82,183,136,0.15)", text: "#52b788" },
};

const changeColors: Record<string, { bg: string; text: string }> = {
  Buff: { bg: "rgba(82,183,136,0.15)", text: "#52b788" },
  Nerf: { bg: "rgba(229,83,75,0.15)", text: "var(--red)" },
  Rework: { bg: "rgba(79,195,247,0.15)", text: "#4fc3f7" },
};

export default function BalancePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--foreground)" }}>
        ⚖️ Баланс
      </h1>
      <p className="text-sm mb-8" style={{ color: "var(--text-sub)" }}>
        Последние изменения баланса в патчах
      </p>

      <div className="space-y-3">
        {balanceChanges.map((bc, i) => {
          const ic = impactColors[bc.impact];
          const cc = changeColors[bc.change];
          return (
            <div
              key={i}
              className="p-5 rounded-xl dota-card"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>
                      {bc.hero}
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: cc.bg, color: cc.text }}
                    >
                      {bc.change}
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: ic.bg, color: ic.text }}
                    >
                      {bc.impact === "high" ? "Высокий" : bc.impact === "medium" ? "Средний" : "Низкий"} импакт
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: "var(--text-sub)" }}>
                    {bc.detail}
                  </p>
                </div>
                <span className="text-xs font-mono" style={{ color: "var(--text-sub)" }}>
                  {bc.patch}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
