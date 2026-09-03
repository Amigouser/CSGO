"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Trophy,
  Users,
  Calendar,
  ArrowLeft,
  Swords,
  Clock,
  Award,
} from "lucide-react";

const mockTournament = {
  id: "1",
  name: "INTKG Winter Cup 2026",
  game: "dota2",
  format: "double_elim",
  status: "registration",
  maxTeams: 16,
  teamSize: 5,
  description:
    "Зимний кубок по Dota 2. Double Elimination формат с призовым фондом. Регистрация открыта!",
  startDate: "2026-02-15T18:00:00",
  prizePool: "50,000 сом",
  participants: [
    { id: "1", nickname: "ProPlayer_KG", mmr: 5800, rank: "Immortal" },
    { id: "2", nickname: "BishkekBoss", mmr: 4200, rank: "Ancient" },
    { id: "3", nickname: "DotaKing99", mmr: 3500, rank: "Legend" },
    { id: "4", nickname: "KyrgyzWarrior", mmr: 2800, rank: "Archon" },
    { id: "5", nickname: "MidOrFeed", mmr: 5100, rank: "Divine" },
    { id: "6", nickname: "SupportMain", mmr: 3900, rank: "Legend" },
    { id: "7", nickname: "CarryPlayer", mmr: 4600, rank: "Ancient" },
    { id: "8", nickname: "OfflaneKing", mmr: 3200, rank: "Archon" },
  ],
};

export default function TournamentDetailPage() {
  const [activeTab, setActiveTab] = useState<"info" | "bracket" | "participants">("info");
  const t = mockTournament;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link
        href="/tournaments"
        className="inline-flex items-center gap-2 text-sm mb-6"
        style={{ color: "var(--text-sub)" }}
      >
        <ArrowLeft size={16} />
        Назад к турнирам
      </Link>

      {/* Header */}
      <div
        className="rounded-2xl p-6 mb-6"
        style={{
          background: "linear-gradient(135deg, #150d00, #1a0808)",
          border: "1px solid rgba(200,155,60,0.25)",
        }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: "rgba(200,155,60,0.15)", color: "var(--gold)" }}
              >
                Регистрация
              </span>
              <span className="text-xs" style={{ color: "var(--text-sub)" }}>
                {t.game === "dota2" ? "Dota 2" : "CS2"}
              </span>
            </div>
            <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--foreground)" }}>
              {t.name}
            </h1>
            <p className="text-sm" style={{ color: "var(--text-sub)" }}>
              {t.description}
            </p>
          </div>
          <button
            className="px-6 py-3 rounded-xl font-bold text-sm glow-gold cursor-pointer"
            style={{
              background: "linear-gradient(135deg, var(--gold), var(--gold-light))",
              color: "var(--background)",
            }}
          >
            Зарегистрироваться
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="flex items-center gap-2">
            <Users size={16} style={{ color: "var(--gold)" }} />
            <div>
              <div className="text-xs" style={{ color: "var(--text-sub)" }}>
                Участники
              </div>
              <div className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                {t.participants.length}/{t.maxTeams}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} style={{ color: "var(--gold)" }} />
            <div>
              <div className="text-xs" style={{ color: "var(--text-sub)" }}>
                Дата
              </div>
              <div className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                {new Date(t.startDate).toLocaleDateString("ru-RU")}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Award size={16} style={{ color: "var(--gold)" }} />
            <div>
              <div className="text-xs" style={{ color: "var(--text-sub)" }}>
                Призовой фонд
              </div>
              <div className="text-sm font-semibold" style={{ color: "var(--gold)" }}>
                {t.prizePool}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Swords size={16} style={{ color: "var(--gold)" }} />
            <div>
              <div className="text-xs" style={{ color: "var(--text-sub)" }}>
                Формат
              </div>
              <div className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                Double Elim
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6" style={{ borderBottom: "1px solid var(--border)" }}>
        {(["info", "bracket", "participants"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 py-2 text-sm font-medium transition-all cursor-pointer"
            style={{
              color: activeTab === tab ? "var(--gold)" : "var(--text-sub)",
              borderBottom: activeTab === tab ? "2px solid var(--gold)" : "2px solid transparent",
            }}
          >
            {tab === "info" ? "Информация" : tab === "bracket" ? "Сетка" : "Участники"}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "info" && (
        <div
          className="rounded-xl p-6"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <h3 className="font-semibold mb-4" style={{ color: "var(--foreground)" }}>
            О турнире
          </h3>
          <div className="space-y-3 text-sm" style={{ color: "var(--text-sub)" }}>
            <p>
              <strong style={{ color: "var(--foreground)" }}>Формат:</strong> Double Elimination
            </p>
            <p>
              <strong style={{ color: "var(--foreground)" }}>Размер команды:</strong> {t.teamSize}{" "}
              игроков
            </p>
            <p>
              <strong style={{ color: "var(--foreground)" }}>Начало:</strong>{" "}
              {new Date(t.startDate).toLocaleString("ru-RU")}
            </p>
            <p>
              <strong style={{ color: "var(--foreground)" }}>Призовой фонд:</strong> {t.prizePool}
            </p>
          </div>
        </div>
      )}

      {activeTab === "bracket" && (
        <div
          className="rounded-xl p-6"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <h3 className="font-semibold mb-4" style={{ color: "var(--foreground)" }}>
            Турнирная сетка
          </h3>
          <div className="text-center py-8">
            <Swords size={48} style={{ color: "var(--text-sub)", margin: "0 auto 16px" }} />
            <p style={{ color: "var(--text-sub)" }}>
              Сетка будет сгенерирована после начала турнира
            </p>
          </div>
        </div>
      )}

      {activeTab === "participants" && (
        <div
          className="rounded-xl overflow-hidden"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <th
                  className="px-4 py-3 text-left text-xs font-medium uppercase"
                  style={{ color: "var(--text-sub)" }}
                >
                  #
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium uppercase"
                  style={{ color: "var(--text-sub)" }}
                >
                  Игрок
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium uppercase"
                  style={{ color: "var(--text-sub)" }}
                >
                  MMR
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium uppercase"
                  style={{ color: "var(--text-sub)" }}
                >
                  Ранг
                </th>
              </tr>
            </thead>
            <tbody>
              {t.participants.map((p, i) => (
                <tr
                  key={p.id}
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <td className="px-4 py-3 text-sm" style={{ color: "var(--text-sub)" }}>
                    {i + 1}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium" style={{ color: "var(--foreground)" }}>
                    {p.nickname}
                  </td>
                  <td className="px-4 py-3 text-sm" style={{ color: "var(--gold)" }}>
                    {p.mmr}
                  </td>
                  <td className="px-4 py-3 text-sm" style={{ color: "var(--text-sub)" }}>
                    {p.rank}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
