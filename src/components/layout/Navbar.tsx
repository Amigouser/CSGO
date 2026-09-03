"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Trophy,
  LayoutDashboard,
  Dice1,
  Medal,
  TrendingUp,
  Scale,
  Menu,
  X,
  Swords,
  Award,
  Radio,
  Sparkles,
} from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { NotificationPanel } from "@/components/ui/NotificationCenter";
import { useI18n } from "@/lib/i18n";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useI18n();

  const navLinks = [
    { href: "/tournaments", label: t.nav.tournaments, icon: Trophy },
    { href: "/live", label: t.nav.live, icon: Radio },
    { href: "/leaderboard", label: t.nav.leaderboard, icon: Medal },
    { href: "/dashboard", label: t.nav.dashboard, icon: LayoutDashboard },
    { href: "/achievements", label: t.nav.achievements, icon: Award },
    { href: "/predictions", label: t.nav.predictions, icon: Sparkles },
    { href: "/roll", label: t.nav.roll, icon: Dice1 },
    { href: "/hall-of-fame", label: t.nav.hallOfFame, icon: Medal },
    { href: "/meta", label: t.nav.meta, icon: TrendingUp },
    { href: "/balance", label: t.nav.balance, icon: Scale },
  ];

  return (
    <nav
      className="safe-top sticky top-0 z-50"
      style={{
        background: "#161b22",
        borderBottom: "1px solid #30363d",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-black text-lg transition-opacity hover:opacity-80"
          >
            <Swords size={20} style={{ color: "var(--gold)" }} />
            <span className="hidden sm:block" style={{ color: "var(--foreground)" }}>
              Tomsk<span style={{ color: "var(--gold)" }}>GG</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                style={{ color: "var(--text-sub)", background: "transparent" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--hover-bg)";
                  e.currentTarget.style.color = "var(--foreground)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--text-sub)";
                }}
              >
                <link.icon size={14} />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <NotificationPanel />
            <ThemeToggle />
            <button
              className="md:hidden p-2 rounded-lg cursor-pointer"
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
          className="md:hidden border-t"
          style={{ background: "#161b22", borderColor: "#30363d" }}
        >
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium"
                style={{ color: "var(--text-sub)" }}
                onClick={() => setMobileOpen(false)}
              >
                <link.icon size={16} />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
