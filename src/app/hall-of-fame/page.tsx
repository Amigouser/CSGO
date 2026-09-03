import { Trophy, Crown, Medal, Award, Star, Flame } from "lucide-react";

const champions = [
  { tournament: "INTKG Winter Cup 2025", winner: "ProPlayer_KG", game: "Dota 2", date: "2025-12-15" },
  { tournament: "CS2 Pro League S1", winner: "BishkekBoss", game: "CS2", date: "2025-11-20" },
  { tournament: "Dota 2 Swiss Challenge", winner: "MidOrFeed", game: "Dota 2", date: "2025-10-10" },
  { tournament: "Bishkek LAN Party", winner: "CarryPlayer", game: "Dota 2", date: "2025-09-05" },
];

const records = [
  { label: "Самая длинная серия побед", value: "15 матчей", holder: "ProPlayer_KG", icon: Flame },
  { label: "Высший MMR", value: "5,800", holder: "ProPlayer_KG", icon: Crown },
  { label: "Больше всего турниров", value: "8 турниров", holder: "MidOrFeed", icon: Trophy },
  { label: "Лучший винрейт", value: "73%", holder: "CarryPlayer", icon: Star },
];

export default function HallOfFamePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8" style={{ color: "var(--foreground)" }}>
        🎖️ Зал Славы
      </h1>

      {/* Champions */}
      <section className="mb-10">
        <h2 className="text-lg font-bold mb-4" style={{ color: "var(--foreground)" }}>
          Чемпионы турниров
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {champions.map((c, i) => (
            <div
              key={i}
              className="p-5 rounded-xl dota-card"
              style={{
                background: "linear-gradient(135deg, #150d00, var(--surface))",
                border: "1px solid rgba(200,155,60,0.25)",
              }}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  {i === 0 ? (
                    <Crown size={28} style={{ color: "#ffd700" }} />
                  ) : i === 1 ? (
                    <Medal size={28} style={{ color: "#c0c0c0" }} />
                  ) : (
                    <Award size={28} style={{ color: "#cd7f32" }} />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1" style={{ color: "var(--foreground)" }}>
                    {c.tournament}
                  </h3>
                  <p className="text-sm" style={{ color: "var(--gold)" }}>
                    🏆 {c.winner}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs" style={{ color: "var(--text-sub)" }}>
                      {c.game}
                    </span>
                    <span className="text-xs" style={{ color: "var(--text-sub)" }}>
                      {new Date(c.date).toLocaleDateString("ru-RU")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Records */}
      <section>
        <h2 className="text-lg font-bold mb-4" style={{ color: "var(--foreground)" }}>
          Рекорды сообщества
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {records.map((r, i) => (
            <div
              key={i}
              className="p-5 rounded-xl"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <div className="flex items-center gap-3 mb-2">
                <r.icon size={20} style={{ color: "var(--gold)" }} />
                <span className="text-xs font-medium uppercase" style={{ color: "var(--text-sub)" }}>
                  {r.label}
                </span>
              </div>
              <div className="text-xl font-bold mb-1" style={{ color: "var(--gold)" }}>
                {r.value}
              </div>
              <div className="text-sm" style={{ color: "var(--text-sub)" }}>
                {r.holder}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
