"use client";

import { useState } from "react";
import Link from "next/link";
import { Trophy, Trash2, Play, UserCheck, UserX, Users, Clock, CheckCircle, XCircle } from "lucide-react";

interface Participant {
  id: string;
  userId: string;
  tournamentId: string;
  teamName: string | null;
  status: string;
  user: { id: string; nickname: string; steamId: string; mmr: number; rank: string };
}

interface Tournament {
  id: string;
  name: string;
  game: string;
  format: string;
  status: string;
  maxTeams: number;
  startDate: string;
  participants: Participant[];
}

const statusLabels: Record<string, string> = {
  upcoming: "Скоро",
  registration: "Регистрация",
  active: "Активный",
  completed: "Завершён",
};

export default function AdminPanel({ tournaments }: { tournaments: Tournament[] }) {
  const [data, setData] = useState(tournaments);
  const [loading, setLoading] = useState("");

  const api = async (url: string, opts?: RequestInit) => {
    const res = await fetch(url, { headers: { "Content-Type": "application/json" }, ...opts });
    if (!res.ok) throw new Error((await res.json()).error || "Error");
    return res.json();
  };

  const handleApprove = async (tournamentId: string, participantId: string) => {
    setLoading(participantId);
    try {
      await api(`/api/tournaments/${tournamentId}/participants`, {
        method: "POST",
        body: JSON.stringify({ participantId, action: "approve" }),
      });
      setData((prev) =>
        prev.map((t) =>
          t.id === tournamentId
            ? {
                ...t,
                participants: t.participants.map((p) =>
                  p.id === participantId ? { ...p, status: "approved" } : p
                ),
              }
            : t
        )
      );
    } catch { alert("Ошибка"); }
    finally { setLoading(""); }
  };

  const handleReject = async (tournamentId: string, participantId: string) => {
    setLoading(participantId);
    try {
      await api(`/api/tournaments/${tournamentId}/participants`, {
        method: "POST",
        body: JSON.stringify({ participantId, action: "reject" }),
      });
      setData((prev) =>
        prev.map((t) =>
          t.id === tournamentId
            ? {
                ...t,
                participants: t.participants.map((p) =>
                  p.id === participantId ? { ...p, status: "rejected" } : p
                ),
              }
            : t
        )
      );
    } catch { alert("Ошибка"); }
    finally { setLoading(""); }
  };

  const handleRemove = async (tournamentId: string, participantId: string) => {
    if (!confirm("Удалить игрока из турнира?")) return;
    setLoading(participantId);
    try {
      await api(`/api/tournaments/${tournamentId}/participants`, {
        method: "DELETE",
        body: JSON.stringify({ participantId }),
      });
      setData((prev) =>
        prev.map((t) =>
          t.id === tournamentId
            ? { ...t, participants: t.participants.filter((p) => p.id !== participantId) }
            : t
        )
      );
    } catch { alert("Ошибка"); }
    finally { setLoading(""); }
  };

  const handleSetActive = async (tournamentId: string) => {
    setLoading(tournamentId);
    try {
      await api(`/api/tournaments/${tournamentId}`, {
        method: "PATCH",
        body: JSON.stringify({ status: "active" }),
      });
      setData((prev) =>
        prev.map((t) => (t.id === tournamentId ? { ...t, status: "active" } : t))
      );
    } catch { alert("Ошибка"); }
    finally { setLoading(""); }
  };

  const handleDelete = async (tournamentId: string, name: string) => {
    if (!confirm(`Удалить турнир "${name}"?`)) return;
    setLoading(tournamentId);
    try {
      await api(`/api/tournaments/${tournamentId}`, { method: "DELETE" });
      setData((prev) => prev.filter((t) => t.id !== tournamentId));
    } catch { alert("Ошибка"); }
    finally { setLoading(""); }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8" style={{ color: "var(--foreground)" }}>
        Панель администратора
      </h1>

      {data.length === 0 ? (
        <div className="text-center py-16">
          <Trophy size={48} style={{ color: "var(--text-sub)", margin: "0 auto 16px" }} />
          <p style={{ color: "var(--text-sub)" }}>Нет турниров</p>
          <Link href="/tournaments/create" className="text-sm mt-4 inline-block" style={{ color: "var(--gold)" }}>
            Создать первый турнир →
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((t) => {
            const pending = t.participants.filter((p) => p.status === "pending");
            const approved = t.participants.filter((p) => p.status === "approved");
            const rejected = t.participants.filter((p) => p.status === "rejected");

            return (
              <div
                key={t.id}
                className="rounded-xl overflow-hidden"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                {/* Tournament header */}
                <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3" style={{ borderBottom: "1px solid var(--border)" }}>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Link href={`/tournaments/${t.id}`} className="font-bold" style={{ color: "var(--foreground)" }}>
                        {t.name}
                      </Link>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(200,155,60,0.15)", color: "var(--gold)" }}>
                        {statusLabels[t.status] || t.status}
                      </span>
                    </div>
                    <div className="text-xs flex gap-3" style={{ color: "var(--text-sub)" }}>
                      <span className="flex items-center gap-1"><Users size={12} /> {approved.length}/{t.maxTeams} одобрено</span>
                      {pending.length > 0 && <span className="flex items-center gap-1" style={{ color: "var(--gold)" }}><Clock size={12} /> {pending.length} ожидают</span>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {t.status === "registration" && (
                      <button
                        onClick={() => handleSetActive(t.id)}
                        disabled={loading === t.id}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1"
                        style={{ background: "rgba(82,183,136,0.15)", color: "#52b788" }}
                      >
                        <Play size={12} /> Запустить
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(t.id, t.name)}
                      disabled={loading === t.id}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1"
                      style={{ background: "rgba(229,83,75,0.15)", color: "var(--red)" }}
                    >
                      <Trash2 size={12} /> Удалить
                    </button>
                  </div>
                </div>

                {/* Pending registrations */}
                {pending.length > 0 && (
                  <div className="p-4" style={{ background: "rgba(200,155,60,0.03)" }}>
                    <h3 className="text-xs font-bold uppercase mb-3 flex items-center gap-1.5" style={{ color: "var(--gold)" }}>
                      <Clock size={14} /> Заявки на регистрацию
                    </h3>
                    <div className="space-y-2">
                      {pending.map((p) => (
                        <div key={p.id} className="flex items-center justify-between p-3 rounded-lg" style={{ background: "var(--hover-bg)" }}>
                          <div>
                            <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{p.user.nickname}</span>
                            <span className="text-xs ml-2" style={{ color: "var(--text-sub)" }}>{p.user.mmr} MMR · {p.user.rank}</span>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleApprove(t.id, p.id)}
                              disabled={loading === p.id}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1"
                              style={{ background: "rgba(82,183,136,0.15)", color: "#52b788" }}
                            >
                              <UserCheck size={12} /> Принять
                            </button>
                            <button
                              onClick={() => handleReject(t.id, p.id)}
                              disabled={loading === p.id}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1"
                              style={{ background: "rgba(229,83,75,0.15)", color: "var(--red)" }}
                            >
                              <UserX size={12} /> Отклонить
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Approved participants */}
                {approved.length > 0 && (
                  <div className="p-4">
                    <h3 className="text-xs font-bold uppercase mb-3 flex items-center gap-1.5" style={{ color: "#52b788" }}>
                      <CheckCircle size={14} /> Участники ({approved.length})
                    </h3>
                    <div className="space-y-1">
                      {approved.map((p) => (
                        <div key={p.id} className="flex items-center justify-between p-2 rounded-lg" style={{ background: "var(--hover-bg)" }}>
                          <div className="flex items-center gap-2">
                            <span className="text-sm" style={{ color: "var(--foreground)" }}>{p.user.nickname}</span>
                            <span className="text-xs" style={{ color: "var(--text-sub)" }}>{p.user.mmr} MMR</span>
                          </div>
                          <button
                            onClick={() => handleRemove(t.id, p.id)}
                            disabled={loading === p.id}
                            className="px-2 py-1 rounded text-xs cursor-pointer"
                            style={{ color: "var(--red)", background: "transparent" }}
                            title="Удалить из турнира"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Rejected */}
                {rejected.length > 0 && (
                  <div className="px-4 pb-4">
                    <h3 className="text-xs font-bold uppercase mb-2 flex items-center gap-1.5" style={{ color: "var(--text-sub)" }}>
                      <XCircle size={14} /> Отклонённые ({rejected.length})
                    </h3>
                    <div className="space-y-1">
                      {rejected.map((p) => (
                        <div key={p.id} className="flex items-center p-2 rounded-lg" style={{ background: "var(--hover-bg)", opacity: 0.5 }}>
                          <span className="text-sm" style={{ color: "var(--text-sub)" }}>{p.user.nickname}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
