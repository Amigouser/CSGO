"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import FaceitBadge from "@/components/ui/FaceitBadge";

interface FaceitRefreshButtonProps {
  currentUserId: string | null;
  profileUserId: string;
  faceitLevel: number;
  faceitElo: number;
}

export default function FaceitRefreshButton({
  currentUserId,
  profileUserId,
  faceitLevel,
  faceitElo,
}: FaceitRefreshButtonProps) {
  const [level, setLevel] = useState(faceitLevel);
  const [elo, setElo] = useState(faceitElo);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const isOwnProfile = currentUserId === profileUserId;

  const handleRefresh = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/faceit/refresh", { method: "POST" });
      const data = await res.json();
      if (data.updated) {
        setLevel(data.faceitLevel);
        setElo(data.faceitElo);
        setMessage("FACEIT данные обновлены!");
      } else {
        setMessage(data.message || "FACEIT аккаунт не найден");
      }
    } catch {
      setMessage("Ошибка обновления");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {level > 0 ? (
        <FaceitBadge level={level} elo={elo} size="lg" showElo />
      ) : (
        <span className="text-xs px-2 py-1 rounded-lg" style={{ background: "var(--surface-2)", color: "var(--text-sub)" }}>
          FACEIT не привязан
        </span>
      )}
      {isOwnProfile && (
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer disabled:opacity-50"
          style={{
            background: "var(--surface-2)",
            color: "var(--text-sub)",
            border: "1px solid var(--border)",
          }}
          title="Обновить FACEIT данные"
        >
          <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
          {loading ? "..." : "Обновить FACEIT"}
        </button>
      )}
      {message && (
        <span className="text-xs" style={{ color: level > 0 ? "#52b788" : "var(--text-sub)" }}>
          {message}
        </span>
      )}
    </div>
  );
}
