"use client";

import { useState } from "react";
import Link from "next/link";

interface Props {
  tournamentId: string;
  registrationStatus: string | null;
  isFull: boolean;
  isOpen: boolean;
  isLoggedIn: boolean;
  minFaceitLevel?: number;
  userFaceitLevel?: number;
}

export default function RegisterButton({ tournamentId, registrationStatus, isFull, isOpen, isLoggedIn, minFaceitLevel = 0, userFaceitLevel = 0 }: Props) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(registrationStatus);
  const [error, setError] = useState("");

  if (!isLoggedIn) {
    return (
      <Link
        href="/login"
        className="px-6 py-3 rounded-xl font-bold text-sm glow-gold"
        style={{ background: "linear-gradient(135deg, var(--gold), var(--gold-light))", color: "var(--background)" }}
      >
        Войти для регистрации
      </Link>
    );
  }

  if (status === "approved") {
    return (
      <span className="px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-1.5" style={{ background: "rgba(82,183,136,0.15)", color: "#52b788" }}>
        ✓ Принят
      </span>
    );
  }

  if (status === "pending") {
    return (
      <span className="px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-1.5" style={{ background: "rgba(200,155,60,0.15)", color: "var(--gold)" }}>
        ⏳ Ожидает подтверждения
      </span>
    );
  }

  if (minFaceitLevel > 0 && userFaceitLevel < minFaceitLevel) {
    return (
      <div className="flex flex-col items-end gap-1">
        <span className="px-6 py-3 rounded-xl font-bold text-sm" style={{ background: "rgba(229,83,75,0.15)", color: "var(--red)" }}>
          Требуется FACEIT {minFaceitLevel}+
        </span>
        <span className="text-xs" style={{ color: "var(--text-sub)" }}>
          Ваш уровень: {userFaceitLevel || "нет"}
        </span>
      </div>
    );
  }

  if (!isOpen) {
    return (
      <span className="px-6 py-3 rounded-xl font-bold text-sm" style={{ background: "var(--surface-2)", color: "var(--text-sub)" }}>
        Регистрация закрыта
      </span>
    );
  }

  if (isFull) {
    return (
      <span className="px-6 py-3 rounded-xl font-bold text-sm" style={{ background: "var(--surface-2)", color: "var(--text-sub)" }}>
        Мест нет
      </span>
    );
  }

  const handleRegister = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/tournaments/${tournamentId}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Ошибка");
      }
      setStatus("pending");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Ошибка");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        onClick={handleRegister}
        disabled={loading}
        className="px-6 py-3 rounded-xl font-bold text-sm glow-gold cursor-pointer disabled:opacity-50"
        style={{ background: "linear-gradient(135deg, var(--gold), var(--gold-light))", color: "var(--background)" }}
      >
        {loading ? "Отправка..." : "Зарегистрироваться"}
      </button>
      {error && <span className="text-xs" style={{ color: "var(--red)" }}>{error}</span>}
    </div>
  );
}
