"use client";

import { Trophy, Flame, Users, Swords } from "lucide-react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const stats = [
  { label: "Турниров", value: 12, icon: Trophy, color: "var(--gold)" },
  { label: "Активных", value: 3, icon: Flame, color: "var(--red)" },
  { label: "Игроков", value: 156, icon: Users, color: "var(--gold)" },
  { label: "Матчей", value: 342, icon: Swords, color: "var(--gold)" },
];

export default function StatsGrid() {
  return (
    <section
      className="py-12 px-4"
      style={{ borderBottom: "1px solid var(--surface-2)" }}
    >
      <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="text-center p-4 sm:p-6 rounded-xl group hover:scale-105 transition-transform duration-300"
            style={{
              background: "var(--hover-bg)",
              border: "1px solid rgba(200,155,60,0.2)",
              animationDelay: `${i * 100}ms`,
            }}
          >
            <div className="mb-2 flex justify-center">
              <stat.icon
                size={32}
                style={{ color: stat.color }}
                className="group-hover:scale-110 transition-transform"
              />
            </div>
            <div
              className="text-2xl sm:text-3xl font-bold"
              style={{ color: "var(--gold)" }}
            >
              <AnimatedCounter end={stat.value} duration={1500 + i * 300} />
            </div>
            <div className="text-sm mt-1" style={{ color: "var(--text-sub)" }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
