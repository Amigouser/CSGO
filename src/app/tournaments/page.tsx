"use client";

import { useState } from "react";
import Link from "next/link";
import { Trophy, Users, Calendar, Search, Filter } from "lucide-react";

const mockTournaments = [
  {
    id: "1",
    name: "INTKG Winter Cup 2026",
    game: "dota2",
    format: "double_elim",
    status: "registration",
    maxTeams: 16,
    participants: 8,
    startDate: "2026-02-15",
    description: "Зимний кубок по Dota 2",
  },
  {
    id: "2",
    name: "CS2 Pro League KG",
    game: "cs2",
    format: "groups_playoffs",
    status: "active",
    maxTeams: 8,
    participants: 8,
    startDate: "2026-01-20",
    description: "Профессиональная лига CS2",
  },
  {
    id: "3",
    name: "Dota 2 Swiss Challenge",
    game: "dota2",
    format: "swiss",
    status: "upcoming",
    maxTeams: 32,
    participants: 12,
    startDate: "2026-03-01",
    description: "Швейцарский формат для всех",
  },
  {
    id: "4",
    name: "Bishkek LAN Party",
    game: "dota2",
    format: "single_elim",
    status: "completed",
    maxTeams: 8,
    participants: 8,
    startDate: "2025-12-10",
    description: "LAN турнир в Бишкеке",
  },
];

const formatLabels: Record<string, string> = {
  single_elim: "Single Elim",
  double_elim: "Double Elim",
  swiss: "Swiss",
  groups_playoffs: "Groups + Playoffs",
};

const statusLabels: Record<string, string> = {
  upcoming: "Скоро",
  registration: "Регистрация",
  active: "Активный",
  completed: "Завершён",
};

const statusColors: Record<string, { bg: string; text: string }> = {
  upcoming: { bg: "rgba(79,195,247,0.15)", text: "#4fc3f7" },
  registration: { bg: "rgba(200,155,60,0.15)", text: "var(--gold)" },
  active: { bg: "rgba(82,183,136,0.15)", text: "#52b788" },
  completed: { bg: "rgba(139,148,158,0.15)", text: "var(--text-sub)" },
};

export default function TournamentsPage() {
  const [gameFilter, setGameFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = mockTournaments.filter((t) => {
    if (gameFilter !== "all" && t.game !== gameFilter) return false;
    if (statusFilter !== "all" && t.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
          Турниры
        </h1>
        <Link
          href="/login"
          className="px-4 py-2 rounded-xl text-sm font-bold transition-all glow-gold"
          style={{
            background: "linear-gradient(135deg, var(--gold), var(--gold-light))",
            color: "var(--background)",
          }}
        >
          Создать турнир
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex items-center gap-2">
          <Filter size={16} style={{ color: "var(--text-sub)" }} />
          <select
            value={gameFilter}
            onChange={(e) => setGameFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg text-sm"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
            }}
          >
            <option value="all">Все игры</option>
            <option value="dota2">Dota 2</option>
            <option value="cs2">CS2</option>
          </select>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-1.5 rounded-lg text-sm"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            color: "var(--foreground)",
          }}
        >
          <option value="all">Все статусы</option>
          <option value="registration">Регистрация</option>
          <option value="active">Активный</option>
          <option value="upcoming">Скоро</option>
          <option value="completed">Завершён</option>
        </select>
      </div>

      {/* Tournament grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((t) => {
          const sc = statusColors[t.status];
          return (
            <Link key={t.id} href={`/tournaments/${t.id}`}>
              <div
                className="rounded-xl overflow-hidden dota-card"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <div
                  className="h-32 flex items-center justify-center"
                  style={{
                    background:
                      t.game === "dota2"
                        ? "linear-gradient(135deg, #1a0808, #0d1117)"
                        : "linear-gradient(135deg, #081a0d, #0d1117)",
                  }}
                >
                  <Trophy size={48} style={{ color: "var(--gold)", opacity: 0.3 }} />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: sc.bg, color: sc.text }}
                    >
                      {statusLabels[t.status]}
                    </span>
                    <span className="text-xs" style={{ color: "var(--text-sub)" }}>
                      {formatLabels[t.format]}
                    </span>
                  </div>
                  <h3
                    className="font-semibold text-sm mb-1"
                    style={{ color: "var(--foreground)" }}
                  >
                    {t.name}
                  </h3>
                  <p className="text-xs mb-2" style={{ color: "var(--text-sub)" }}>
                    {t.description}
                  </p>
                  <div
                    className="flex items-center gap-3 text-xs"
                    style={{ color: "var(--text-sub)" }}
                  >
                    <span className="flex items-center gap-1">
                      <Users size={12} />
                      {t.participants}/{t.maxTeams}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(t.startDate).toLocaleDateString("ru-RU")}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Trophy size={48} style={{ color: "var(--text-sub)", margin: "0 auto 16px" }} />
          <p style={{ color: "var(--text-sub)" }}>Турниры не найдены</p>
        </div>
      )}
    </div>
  );
}
