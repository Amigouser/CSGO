"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Copy, Check, Save } from "lucide-react";

/* ─────────────────────── types ──────────────────────── */

interface MatchDetail {
  id: string;
  homePlayerId: string | null;
  awayPlayerId: string | null;
  homePlayer: { id: string; nickname: string; avatar: string | null; faceitLevel: number; faceitElo: number } | null;
  awayPlayer: { id: string; nickname: string; avatar: string | null; faceitLevel: number; faceitElo: number } | null;
  homeScore: number | null;
  awayScore: number | null;
  winner: string | null;
  status: string;
  scheduledAt: string | null;
  tournament: { id: string; name: string; gameMode: string; format: string };
  serverLink?: string | null; // undefined = not authorized to see
}

interface Props {
  matchId: string;
  isOpen: boolean;
  onClose: () => void;
}

/* ───────────────────── component ────────────────────── */

export default function MatchDetailsModal({ matchId, isOpen, onClose }: Props) {
  const [data, setData] = useState<MatchDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Admin editing state
  const [editLink, setEditLink] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editHomeScore, setEditHomeScore] = useState("");
  const [editAwayScore, setEditAwayScore] = useState("");
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  const fetchMatch = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/matches/${matchId}`);
      if (!res.ok) throw new Error("Ошибка загрузки");
      const d: MatchDetail = await res.json();
      setData(d);
      setEditLink(d.serverLink || "");
      setEditStatus(d.status);
      setEditHomeScore(d.homeScore?.toString() ?? "");
      setEditAwayScore(d.awayScore?.toString() ?? "");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Ошибка");
    } finally {
      setLoading(false);
    }
  }, [matchId]);

  useEffect(() => {
    if (isOpen) fetchMatch();
  }, [isOpen, fetchMatch]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const handleCopy = async () => {
    if (!data?.serverLink) return;
    try {
      await navigator.clipboard.writeText(data.serverLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = data.serverLink;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/matches/${matchId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serverLink: editLink,
          status: editStatus,
          homeScore: editHomeScore !== "" ? Number(editHomeScore) : null,
          awayScore: editAwayScore !== "" ? Number(editAwayScore) : null,
        }),
      });
      if (!res.ok) throw new Error("Ошибка сохранения");
      await fetchMatch();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "Ошибка");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  const statusLabels: Record<string, string> = {
    pending: "Ожидание",
    active: "Идёт",
    completed: "Завершён",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 440,
          margin: "0 16px",
          borderRadius: 16,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <span style={{ fontWeight: 700, fontSize: 15, color: "var(--foreground)" }}>
            Детали матча
          </span>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-sub)",
              padding: 4,
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: 20 }}>
          {loading && (
            <div style={{ textAlign: "center", padding: 24, color: "var(--text-sub)" }}>
              Загрузка...
            </div>
          )}

          {error && (
            <div
              style={{
                padding: 12,
                borderRadius: 8,
                background: "rgba(229,83,75,0.12)",
                color: "var(--red)",
                fontSize: 13,
              }}
            >
              {error}
            </div>
          )}

          {data && !loading && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Tournament name */}
              <div style={{ fontSize: 12, color: "var(--text-sub)" }}>
                {data.tournament.name}
              </div>

              {/* Teams / Score */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 16,
                  padding: "12px 0",
                }}
              >
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--foreground)" }}>
                    {data.homePlayer?.nickname || "TBD"}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: "var(--gold)",
                    minWidth: 70,
                    textAlign: "center",
                  }}
                >
                  {data.homeScore ?? "–"} : {data.awayScore ?? "–"}
                </div>
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--foreground)" }}>
                    {data.awayPlayer?.nickname || "TBD"}
                  </div>
                </div>
              </div>

              {/* Status */}
              <div style={{ fontSize: 13, color: "var(--text-sub)" }}>
                Статус:{" "}
                <span style={{ color: "var(--foreground)", fontWeight: 500 }}>
                  {statusLabels[data.status] || data.status}
                </span>
              </div>

              {data.scheduledAt && (
                <div style={{ fontSize: 13, color: "var(--text-sub)" }}>
                  Время:{" "}
                  <span style={{ color: "var(--foreground)" }}>
                    {new Date(data.scheduledAt).toLocaleString("ru-RU")}
                  </span>
                </div>
              )}

              {/* Server link: participant view (read-only with copy) */}
              {data.serverLink !== undefined && !data.homePlayer && false && null}

              {/* If serverLink is present in response → user can see it */}
              {data.serverLink !== undefined && data.serverLink && (
                <div
                  style={{
                    padding: 12,
                    borderRadius: 8,
                    background: "rgba(200,155,60,0.08)",
                    border: "1px solid rgba(200,155,60,0.2)",
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "var(--gold)",
                      marginBottom: 8,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Сервер матча
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <code
                      style={{
                        flex: 1,
                        fontSize: 12,
                        padding: "6px 10px",
                        borderRadius: 6,
                        background: "var(--surface-2)",
                        color: "var(--foreground)",
                        wordBreak: "break-all",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {data.serverLink}
                    </code>
                    <button
                      onClick={handleCopy}
                      style={{
                        flexShrink: 0,
                        width: 32,
                        height: 32,
                        borderRadius: 6,
                        background: copied ? "rgba(82,183,136,0.2)" : "var(--surface-2)",
                        border: `1px solid ${copied ? "#52b788" : "var(--border)"}`,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: copied ? "#52b788" : "var(--text-sub)",
                      }}
                      title="Скопировать"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
              )}

              {/* Admin: editable fields */}
              {data.serverLink !== undefined && (
                <div
                  style={{
                    borderTop: "1px solid var(--border)",
                    paddingTop: 16,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-sub)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Управление матчем
                  </div>

                  {/* Server link input */}
                  <div>
                    <label style={{ display: "block", fontSize: 12, color: "var(--text-sub)", marginBottom: 4 }}>
                      Ссылка на сервер
                    </label>
                    <input
                      value={editLink}
                      onChange={(e) => setEditLink(e.target.value)}
                      placeholder="connect 123.45.67.89:27015"
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        borderRadius: 8,
                        border: "1px solid var(--border)",
                        background: "var(--hover-bg)",
                        color: "var(--foreground)",
                        fontSize: 13,
                        outline: "none",
                        fontFamily: "var(--font-mono)",
                      }}
                    />
                  </div>

                  {/* Score + Status row */}
                  <div style={{ display: "flex", gap: 8 }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: "block", fontSize: 12, color: "var(--text-sub)", marginBottom: 4 }}>
                        Счёт
                      </label>
                      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                        <input
                          value={editHomeScore}
                          onChange={(e) => setEditHomeScore(e.target.value.replace(/\D/g, ""))}
                          placeholder="0"
                          type="text"
                          inputMode="numeric"
                          style={{
                            width: 48,
                            padding: "8px",
                            borderRadius: 8,
                            border: "1px solid var(--border)",
                            background: "var(--hover-bg)",
                            color: "var(--foreground)",
                            fontSize: 14,
                            fontWeight: 600,
                            textAlign: "center",
                            outline: "none",
                          }}
                        />
                        <span style={{ color: "var(--text-sub)", fontSize: 14 }}>:</span>
                        <input
                          value={editAwayScore}
                          onChange={(e) => setEditAwayScore(e.target.value.replace(/\D/g, ""))}
                          placeholder="0"
                          type="text"
                          inputMode="numeric"
                          style={{
                            width: 48,
                            padding: "8px",
                            borderRadius: 8,
                            border: "1px solid var(--border)",
                            background: "var(--hover-bg)",
                            color: "var(--foreground)",
                            fontSize: 14,
                            fontWeight: 600,
                            textAlign: "center",
                            outline: "none",
                          }}
                        />
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: "block", fontSize: 12, color: "var(--text-sub)", marginBottom: 4 }}>
                        Статус
                      </label>
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          borderRadius: 8,
                          border: "1px solid var(--border)",
                          background: "var(--hover-bg)",
                          color: "var(--foreground)",
                          fontSize: 13,
                          outline: "none",
                        }}
                      >
                        <option value="pending">Ожидание</option>
                        <option value="active">Идёт</option>
                        <option value="completed">Завершён</option>
                      </select>
                    </div>
                  </div>

                  {/* Save button */}
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      padding: "10px 0",
                      borderRadius: 10,
                      border: "none",
                      background: "linear-gradient(135deg, var(--gold), var(--gold-light))",
                      color: "var(--background)",
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: saving ? "default" : "pointer",
                      opacity: saving ? 0.6 : 1,
                    }}
                  >
                    <Save size={14} />
                    {saving ? "Сохранение..." : "Сохранить"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
