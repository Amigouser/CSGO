"use client";

import { useState, useCallback } from "react";
import { Dice1, RotateCcw } from "lucide-react";

const heroes = [
  "Pudge", "Invoker", "Juggernaut", "Phantom Assassin", "Crystal Maiden",
  "Anti-Mage", "Axe", "Shadow Fiend", "Sniper", "Pugna",
  "Lina", "Lion", "Rubick", "Earthshaker", "Tidehunter",
  "Drow Ranger", "Windranger", "Mirana", "Bounty Hunter", "Riki",
  "Witch Doctor", "Warlock", "Ogre Magi", "Zeus", "Viper",
];

export default function RollPage() {
  const [result, setResult] = useState<string | null>(null);
  const [rolling, setRolling] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const roll = useCallback(() => {
    setRolling(true);
    setResult(null);

    let count = 0;
    const interval = setInterval(() => {
      setResult(heroes[Math.floor(Math.random() * heroes.length)]);
      count++;
      if (count > 15) {
        clearInterval(interval);
        const final = heroes[Math.floor(Math.random() * heroes.length)];
        setResult(final);
        setHistory((prev) => [final, ...prev].slice(0, 10));
        setRolling(false);
      }
    }, 100);
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 text-center" style={{ color: "var(--foreground)" }}>
        🎲 Ролл героя
      </h1>

      <div
        className="rounded-2xl p-8 text-center mb-6"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <div
          className="text-6xl font-black mb-6 min-h-[80px] flex items-center justify-center"
          style={{
            color: result ? "var(--gold)" : "var(--text-sub)",
            opacity: rolling ? 0.7 : 1,
            transition: "opacity 0.1s",
          }}
        >
          {result || "?"}
        </div>

        <button
          onClick={roll}
          disabled={rolling}
          className="px-8 py-3 rounded-xl font-bold text-sm transition-all glow-gold cursor-pointer disabled:opacity-50"
          style={{
            background: "linear-gradient(135deg, var(--gold), var(--gold-light))",
            color: "var(--background)",
          }}
        >
          {rolling ? (
            <span className="flex items-center gap-2">
              <RotateCcw size={16} className="animate-spin" />
              Ролл...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Dice1 size={16} />
              Ролл!
            </span>
          )}
        </button>
      </div>

      {history.length > 0 && (
        <div
          className="rounded-xl p-5"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--foreground)" }}>
            История
          </h3>
          <div className="flex flex-wrap gap-2">
            {history.map((h, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1 rounded-full"
                style={{
                  background: i === 0 ? "rgba(200,155,60,0.15)" : "var(--hover-bg)",
                  color: i === 0 ? "var(--gold)" : "var(--text-sub)",
                  border: `1px solid ${i === 0 ? "rgba(200,155,60,0.3)" : "var(--border)"}`,
                }}
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
