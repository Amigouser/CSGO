import Link from "next/link";
import { Medal } from "lucide-react";

export default function HallOfFameBanner() {
  return (
    <section className="mb-12">
      <div
        className="relative overflow-hidden rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{
          background: "linear-gradient(135deg, #150d00, #1a0808)",
          border: "1px solid rgba(200,155,60,0.25)",
        }}
      >
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 80% 50%, #c89b3c 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Medal size={24} style={{ color: "var(--gold)" }} />
            <h3 className="text-lg font-bold" style={{ color: "#e6edf3" }}>
              Зал Славы
            </h3>
          </div>
          <p className="text-sm" style={{ color: "#8b949e" }}>
            Чемпионы всех турниров, рекорды сообщества и лучшие игроки платформы
          </p>
        </div>
        <Link
          href="/hall-of-fame"
          className="relative z-10 flex-shrink-0 px-6 py-2.5 rounded-xl text-sm font-bold transition-all"
          style={{
            background: "linear-gradient(135deg,#c89b3c,#f0c060)",
            color: "#0d1117",
          }}
        >
          Смотреть →
        </Link>
      </div>
    </section>
  );
}
