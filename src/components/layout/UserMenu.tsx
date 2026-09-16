"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { LogOut, User, ShieldPlus, LayoutDashboard } from "lucide-react";
import FaceitBadge from "@/components/ui/FaceitBadge";

interface UserData {
  id: string;
  steamId: string;
  nickname: string;
  avatar: string | null;
  isAdmin: boolean;
  faceitLevel: number;
  faceitElo: number;
}

export default function UserMenu() {
  const [user, setUser] = useState<UserData | null>(null);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/me")
      .then((r) => (r.ok ? r.json() : null))
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (!user) {
    return (
      <Link
        href="/login"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-all"
        style={{
          background: "linear-gradient(135deg, var(--gold), var(--gold-light))",
          color: "var(--background)",
        }}
      >
        Войти
      </Link>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-2 py-1 rounded-lg transition-all cursor-pointer"
        style={{ background: open ? "var(--hover-bg)" : "transparent" }}
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center text-sm overflow-hidden"
          style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
        >
          {user.avatar ? (
            <img src={user.avatar} alt="" className="w-full h-full object-cover" />
          ) : (
            "👤"
          )}
        </div>
        <span className="text-[13px] font-medium hidden sm:block" style={{ color: "var(--foreground)" }}>
          {user.nickname}
        </span>
        {user.faceitLevel > 0 && (
          <FaceitBadge level={user.faceitLevel} size="sm" />
        )}
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-1 w-52 rounded-xl overflow-hidden shadow-2xl"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            animation: "fadeIn 0.15s ease-out",
          }}
        >
          <div className="px-4 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2">
              <div className="text-sm font-bold" style={{ color: "var(--foreground)" }}>{user.nickname}</div>
              {user.faceitLevel > 0 && (
                <FaceitBadge level={user.faceitLevel} elo={user.faceitElo} size="sm" showElo />
              )}
            </div>
            <div className="text-xs" style={{ color: "var(--text-sub)" }}>
              {user.faceitElo > 0 ? `${user.faceitElo} ELO` : "FACEIT не привязан"}
              {user.isAdmin && <span style={{ color: "var(--gold)" }}> · Админ</span>}
            </div>
          </div>
          <Link
            href={`/profile/${user.steamId}`}
            className="flex items-center gap-2 px-4 py-2.5 text-[13px] font-medium transition-colors"
            style={{ color: "var(--text-sub)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--hover-bg)";
              e.currentTarget.style.color = "var(--foreground)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--text-sub)";
            }}
            onClick={() => setOpen(false)}
          >
            <User size={14} />
            Мой профиль
          </Link>
          {user.isAdmin && (
            <Link
              href="/admin"
              className="flex items-center gap-2 px-4 py-2.5 text-[13px] font-medium transition-colors"
              style={{ color: "var(--gold)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--hover-bg)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              onClick={() => setOpen(false)}
            >
              <LayoutDashboard size={14} />
              Админ-панель
            </Link>
          )}
          {user.isAdmin && (
            <Link
              href="/tournaments/create"
              className="flex items-center gap-2 px-4 py-2.5 text-[13px] font-medium transition-colors"
              style={{ color: "var(--gold)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--hover-bg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
              onClick={() => setOpen(false)}
            >
              <ShieldPlus size={14} />
              Создать турнир
            </Link>
          )}
          <a
            href="/api/steam/logout"
            className="flex items-center gap-2 px-4 py-2.5 text-[13px] font-medium transition-colors"
            style={{ color: "var(--red)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--hover-bg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <LogOut size={14} />
            Выйти
          </a>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
