"use client";

import Link from "next/link";
import { Swords } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Swords size={20} style={{ color: "var(--gold)" }} />
              <span className="font-bold" style={{ color: "var(--foreground)" }}>
                TomskGG
              </span>
            </div>
            <p className="text-sm" style={{ color: "var(--text-sub)" }}>
              {t.footer.platform}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm" style={{ color: "var(--foreground)" }}>
              {t.footer.navigation}
            </h4>
            <div className="flex flex-col gap-2">
              <Link href="/tournaments" className="text-sm" style={{ color: "var(--text-sub)" }}>
                {t.nav.tournaments}
              </Link>
              <Link href="/leaderboard" className="text-sm" style={{ color: "var(--text-sub)" }}>
                {t.nav.leaderboard}
              </Link>
              <Link href="/hall-of-fame" className="text-sm" style={{ color: "var(--text-sub)" }}>
                {t.nav.hallOfFame}
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm" style={{ color: "var(--foreground)" }}>
              {t.footer.information}
            </h4>
            <div className="flex flex-col gap-2">
              <Link href="/meta" className="text-sm" style={{ color: "var(--text-sub)" }}>
                {t.nav.meta}
              </Link>
              <Link href="/balance" className="text-sm" style={{ color: "var(--text-sub)" }}>
                {t.nav.balance}
              </Link>
              <Link href="/login" className="text-sm" style={{ color: "var(--text-sub)" }}>
                {t.nav.login}
              </Link>
            </div>
          </div>
        </div>
        <div
          className="mt-8 pt-6 text-center text-xs"
          style={{ borderTop: "1px solid var(--border)", color: "var(--text-sub)" }}
        >
          {t.footer.copyright.replace("{year}", new Date().getFullYear().toString())}
        </div>
      </div>
    </footer>
  );
}
