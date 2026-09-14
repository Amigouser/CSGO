"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Trophy, LayoutDashboard, Medal, Radio, Menu, X, Swords } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import UserMenu from "@/components/layout/UserMenu";
import { useI18n } from "@/lib/i18n";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useI18n();

  const links = [
    { href: "/tournaments", label: t.nav.tournaments, icon: Trophy },
    { href: "/live", label: t.nav.live, icon: Radio },
    { href: "/leaderboard", label: t.nav.leaderboard, icon: Medal },
    { href: "/dashboard", label: t.nav.dashboard, icon: LayoutDashboard },
    { href: "/hall-of-fame", label: t.nav.hallOfFame, icon: Medal },
  ];

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;

  return (
    <nav
      className="safe-top sticky top-0 z-50"
      style={{
        background: "rgba(22, 27, 34, 0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(48, 54, 61, 0.6)",
      }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 items-center gap-2">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-black text-base sm:text-lg transition-opacity hover:opacity-80 flex-shrink-0"
          >
            <Swords size={22} style={{ color: "var(--gold)" }} />
            <span style={{ color: "var(--foreground)" }}>
              Tomsk<span style={{ color: "var(--gold)" }}>GG</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all relative"
                  style={{
                    color: active ? "var(--gold)" : "var(--text-sub)",
                    background: active ? "rgba(200,155,60,0.08)" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = "var(--hover-bg)";
                      e.currentTarget.style.color = "var(--foreground)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "var(--text-sub)";
                    }
                  }}
                >
                  <link.icon size={14} />
                  {link.label}
                  {active && (
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                      style={{ background: "var(--gold)" }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <UserMenu />
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              className="md:hidden p-1.5 rounded-lg cursor-pointer"
              style={{ color: "var(--text-sub)", background: "transparent" }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t overflow-hidden"
          style={{
            background: "rgba(22, 27, 34, 0.95)",
            backdropFilter: "blur(16px)",
            borderColor: "rgba(48, 54, 61, 0.6)",
            animation: "slideDown 0.2s ease-out",
          }}
        >
          <div className="px-3 py-2 space-y-0.5">
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                  style={{
                    color: active ? "var(--gold)" : "var(--text-sub)",
                    background: active ? "rgba(200,155,60,0.08)" : "transparent",
                  }}
                >
                  <link.icon size={18} />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from { max-height: 0; opacity: 0; }
          to { max-height: 600px; opacity: 1; }
        }
      `}</style>
    </nav>
  );
}
