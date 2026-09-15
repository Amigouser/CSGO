"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trophy, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateTournamentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      gameMode: formData.get("gameMode"),
      format: formData.get("format"),
      maxTeams: formData.get("maxTeams"),
      teamSize: formData.get("teamSize"),
      minFaceitLevel: formData.get("minFaceitLevel"),
      description: formData.get("description"),
      startDate: formData.get("startDate"),
      prizePool: formData.get("prizePool"),
    };

    try {
      const res = await fetch("/api/tournaments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Ошибка создания");
      }

      const tournament = await res.json();
      router.push(`/tournaments/${tournament.id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Ошибка");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link
        href="/tournaments"
        className="inline-flex items-center gap-2 text-sm mb-6"
        style={{ color: "var(--text-sub)" }}
      >
        <ArrowLeft size={16} />
        Назад к турнирам
      </Link>

      <h1 className="text-2xl font-bold mb-8" style={{ color: "var(--foreground)" }}>
        Создать турнир
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div
          className="rounded-xl p-6 space-y-5"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--foreground)" }}>
              Название турнира *
            </label>
            <input
              name="name"
              required
              placeholder="INTKG Winter Cup 2026"
              className="w-full px-4 py-2.5 rounded-lg text-sm"
              style={{ background: "var(--hover-bg)", border: "1px solid var(--border)", color: "var(--foreground)", outline: "none" }}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--foreground)" }}>
                Режим *
              </label>
              <select
                name="gameMode"
                required
                className="w-full px-4 py-2.5 rounded-lg text-sm"
                style={{ background: "var(--hover-bg)", border: "1px solid var(--border)", color: "var(--foreground)" }}
              >
                <option value="5v5">5 vs 5</option>
                <option value="2v2">2 vs 2</option>
                <option value="1v1">1 vs 1</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--foreground)" }}>
                Формат *
              </label>
              <select
                name="format"
                required
                className="w-full px-4 py-2.5 rounded-lg text-sm"
                style={{ background: "var(--hover-bg)", border: "1px solid var(--border)", color: "var(--foreground)" }}
              >
                <option value="single_elim">Single Elimination</option>
                <option value="double_elim">Double Elimination</option>
                <option value="swiss">Swiss System</option>
                <option value="groups_playoffs">Groups + Playoffs</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--foreground)" }}>
                Макс. команд *
              </label>
              <input
                name="maxTeams"
                type="number"
                required
                min={2}
                max={128}
                defaultValue={16}
                className="w-full px-4 py-2.5 rounded-lg text-sm"
                style={{ background: "var(--hover-bg)", border: "1px solid var(--border)", color: "var(--foreground)", outline: "none" }}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--foreground)" }}>
                Размер команды
              </label>
              <input
                name="teamSize"
                type="number"
                min={1}
                max={10}
                defaultValue={5}
                className="w-full px-4 py-2.5 rounded-lg text-sm"
                style={{ background: "var(--hover-bg)", border: "1px solid var(--border)", color: "var(--foreground)", outline: "none" }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--foreground)" }}>
                Мин. FACEIT ур.
              </label>
              <select
                name="minFaceitLevel"
                className="w-full px-4 py-2.5 rounded-lg text-sm"
                style={{ background: "var(--hover-bg)", border: "1px solid var(--border)", color: "var(--foreground)" }}
              >
                <option value="0">Без ограничений</option>
                <option value="1">Level 1+</option>
                <option value="2">Level 2+</option>
                <option value="3">Level 3+</option>
                <option value="4">Level 4+</option>
                <option value="5">Level 5+</option>
                <option value="6">Level 6+</option>
                <option value="7">Level 7+</option>
                <option value="8">Level 8+</option>
                <option value="9">Level 9+</option>
                <option value="10">Level 10</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--foreground)" }}>
                Дата начала *
              </label>
              <input
                name="startDate"
                type="datetime-local"
                required
                className="w-full px-4 py-2.5 rounded-lg text-sm"
                style={{ background: "var(--hover-bg)", border: "1px solid var(--border)", color: "var(--foreground)", outline: "none" }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--foreground)" }}>
              Призовой фонд
            </label>
            <input
              name="prizePool"
              placeholder="50,000 сом"
              className="w-full px-4 py-2.5 rounded-lg text-sm"
              style={{ background: "var(--hover-bg)", border: "1px solid var(--border)", color: "var(--foreground)", outline: "none" }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--foreground)" }}>
              Описание
            </label>
            <textarea
              name="description"
              rows={3}
              placeholder="Описание турнира..."
              className="w-full px-4 py-2.5 rounded-lg text-sm resize-none"
              style={{ background: "var(--hover-bg)", border: "1px solid var(--border)", color: "var(--foreground)", outline: "none" }}
            />
          </div>
        </div>

        {error && (
          <div className="text-sm p-3 rounded-lg" style={{ background: "rgba(229,83,75,0.15)", color: "var(--red)" }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl font-bold text-sm glow-gold cursor-pointer disabled:opacity-50"
          style={{
            background: "linear-gradient(135deg, var(--gold), var(--gold-light))",
            color: "var(--background)",
          }}
        >
          {loading ? "Создание..." : "Создать турнир"}
        </button>
      </form>
    </div>
  );
}
