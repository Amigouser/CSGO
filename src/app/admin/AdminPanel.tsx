"use client";

import { useState } from "react";
import Link from "next/link";
import { Trophy, Trash2, Play, UserCheck, UserX, Users, Clock, CheckCircle, XCircle, ArrowUpDown, ChevronUp, ChevronDown, Shuffle } from "lucide-react";
import FaceitBadge from "@/components/ui/FaceitBadge";

interface Participant {
  id: string;
  userId: string;
  tournamentId: string;
  teamName: string | null;
  status: string;
  user: { id: string; nickname: string; steamId: string; faceitLevel: number; faceitElo: number };
}

interface Tournament {
  id: string;
  name: string;
  game: string;
  gameMode: string;
  format: string;
  status: string;
  maxTeams: number;
  minFaceitLevel: number;
  startDate: Date;
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
  const [seedingId, setSeedingId] = useState<string | null>(null);
  const [seedOrder, setSeedOrder] = useState<Record<string, string[]>>({});

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

  // ── Seeding ──

  const initSeed = (tournamentId: string, approved: Participant[]) => {
    setSeedOrder((prev) => {
      if (prev[tournamentId]) return prev;
      return { ...prev, [tournamentId]: approved.map((p) => p.userId) };
    });
    setSeedingId(tournamentId);
  };

  const moveSeed = (tournamentId: string, index: number, dir: -1 | 1) => {
    setSeedOrder((prev) => {
      const arr = [...(prev[tournamentId] || [])];
      const target = index + dir;
      if (target < 0 || target >= arr.length) return prev;
      [arr[index], arr[target]] = [arr[target], arr[index]];
      return { ...prev, [tournamentId]: arr };
    });
  };

  const shuffleSeed = (tournamentId: string, approved: Participant[]) => {
    setSeedOrder((prev) => {
      const arr = [...approved.map((p) => p.userId)];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return { ...prev, [tournamentId]: arr };
    });
  };

  const handleGenerateBracket = async (tournamentId: string) => {
    const ids = seedOrder[tournamentId];
    if (!ids || ids.length < 2) { alert("Нужно минимум 2 участника"); return; }
    if (!confirm("Сгенерировать сетку? Существующие матчи будут заменены.")) return;
    setLoading(tournamentId);
    try {
      await api(`/api/tournaments/${tournamentId}/seed`, {
        method: "POST",
        body: JSON.stringify({ participantIds: ids }),
      });
      alert("Сетка сгенерирована!");
      setSeedingId(null);
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "Ошибка");
    } finally { setLoading(""); }
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
                    <div className="text-xs flex gap-3 flex-wrap" style={{ color: "var(--text-sub)" }}>
                      <span className="flex items-center gap-1"><Users size={12} /> {approved.length}/{t.maxTeams} одобрено</span>
                      <span className="px-1.5 py-0.5 rounded text-[11px] font-medium" style={{ background: "rgba(79,195,247,0.15)", color: "#4fc3f7" }}>{t.gameMode}</span>
                      {t.minFaceitLevel > 0 && (
                        <span className="px-1.5 py-0.5 rounded text-[11px] font-medium" style={{ background: "rgba(249,115,22,0.15)", color: "#f97316" }}>FACEIT {t.minFaceitLevel}+</span>
                      )}
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
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{p.user.nickname}</span>
                            {p.user.faceitLevel > 0 && <FaceitBadge level={p.user.faceitLevel} size="sm" />}
                            <span className="text-xs" style={{ color: "var(--text-sub)" }}>{p.user.faceitElo > 0 ? `${p.user.faceitElo} ELO` : ""}</span>
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
                            {p.user.faceitLevel > 0 && <FaceitBadge level={p.user.faceitLevel} size="sm" />}
                            <span className="text-xs" style={{ color: "var(--text-sub)" }}>{p.user.faceitElo > 0 ? `${p.user.faceitElo} ELO` : ""}</span>
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

                {/* Seeding */}
                {approved.length >= 2 && (t.status === "upcoming" || t.status === "registration") && (
                  <div className="px-4 pb-4">
                    {seedingId === t.id ? (
                      <div
                        className="rounded-lg overflow-hidden"
                        style={{ border: "1px solid rgba(200,155,60,0.25)" }}
                      >
                        <div
                          className="p-3 flex items-center justify-between"
                          style={{ background: "rgba(200,155,60,0.06)" }}
                        >
                          <h3 className="text-xs font-bold uppercase flex items-center gap-1.5" style={{ color: "var(--gold)" }}>
                            <ArrowUpDown size={14} /> Сидирование ({approved.length})
                          </h3>
                          <div className="flex gap-2">
                            <button
                              onClick={() => shuffleSeed(t.id, approved)}
                              className="px-2 py-1 rounded text-xs cursor-pointer flex items-center gap-1"
                              style={{ background: "var(--hover-bg)", color: "var(--text-sub)" }}
                            >
                              <Shuffle size={11} /> Перемешать
                            </button>
                            <button
                              onClick={() => setSeedingId(null)}
                              className="px-2 py-1 rounded text-xs cursor-pointer"
                              style={{ color: "var(--text-sub)", background: "transparent" }}
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                        <div className="p-3 space-y-1">
                          {(seedOrder[t.id] || []).map((userId, idx) => {
                            const p = approved.find((a) => a.userId === userId);
                            if (!p) return null;
                            const isFirst = idx === 0;
                            const isLast = idx === (seedOrder[t.id]?.length ?? 0) - 1;
                            return (
                              <div
                                key={userId}
                                className="flex items-center gap-2 px-2 py-1.5 rounded-lg"
                                style={{ background: "var(--hover-bg)" }}
                              >
                                <span className="text-[11px] font-bold w-5 text-center" style={{ color: "var(--text-sub)" }}>
                                  {idx + 1}
                                </span>
                                <span className="text-sm flex-1" style={{ color: "var(--foreground)" }}>
                                  {p.teamName || p.user.nickname}
                                </span>
                                {p.user.faceitLevel > 0 && <FaceitBadge level={p.user.faceitLevel} size="sm" />}
                                <div className="flex gap-0.5">
                                  <button
                                    onClick={() => moveSeed(t.id, idx, -1)}
                                    disabled={isFirst}
                                    className="p-0.5 rounded cursor-pointer disabled:opacity-20"
                                    style={{ color: "var(--text-sub)", background: "transparent" }}
                                  >
                                    <ChevronUp size={14} />
                                  </button>
                                  <button
                                    onClick={() => moveSeed(t.id, idx, 1)}
                                    disabled={isLast}
                                    className="p-0.5 rounded cursor-pointer disabled:opacity-20"
                                    style={{ color: "var(--text-sub)", background: "transparent" }}
                                  >
                                    <ChevronDown size={14} />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="p-3 pt-0">
                          <button
                            onClick={() => handleGenerateBracket(t.id)}
                            disabled={loading === t.id}
                            className="w-full py-2.5 rounded-lg text-xs font-bold cursor-pointer flex items-center justify-center gap-1.5"
                            style={{
                              background: "linear-gradient(135deg, var(--gold), var(--gold-light))",
                              color: "var(--background)",
                              opacity: loading === t.id ? 0.6 : 1,
                            }}
                          >
                            {loading === t.id ? "Генерация..." : "Сгенерировать сетку"}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => initSeed(t.id, approved)}
                        className="w-full py-2 rounded-lg text-xs font-semibold cursor-pointer flex items-center justify-center gap-1.5"
                        style={{ background: "rgba(200,155,60,0.08)", color: "var(--gold)", border: "1px solid rgba(200,155,60,0.2)" }}
                      >
                        <ArrowUpDown size={13} /> Настроить сидирование
                      </button>
                    )}
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
