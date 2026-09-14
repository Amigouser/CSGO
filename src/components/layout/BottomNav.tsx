"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Trophy,
  Medal,
  User,
  Home,
  Radio,
} from "lucide-react";

const bottomLinks = [
  { href: "/", label: "Главная", icon: Home },
  { href: "/tournaments", label: "Турниры", icon: Trophy },
  { href: "/live", label: "Live", icon: Radio },
  { href: "/leaderboard", label: "Рейтинг", icon: Medal },
  { href: "/profile/me", label: "Профиль", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 safe-bottom"
      style={{
        background: "#161b22",
        borderTop: "1px solid #30363d",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="flex items-center justify-around h-14">
        {bottomLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col items-center gap-0.5 px-2 py-1"
              style={{
                color: isActive ? "var(--gold)" : "var(--text-sub)",
              }}
            >
              <link.icon size={20} />
              <span className="text-[10px] font-medium">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
