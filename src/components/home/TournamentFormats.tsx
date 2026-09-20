import { Shield, Zap, RefreshCw, LayoutGrid } from "lucide-react";

/* ─── SVG pictograms for each bracket format ─── */

function SingleElimPictogram() {
  return (
    <svg viewBox="0 0 52 40" width="52" height="40" fill="none" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="6" cy="10" r="3" fill="var(--gold)" opacity="0.6" />
      <circle cx="6" cy="30" r="3" fill="var(--gold)" opacity="0.6" />
      <path d="M9,10 H17 V20 H25" stroke="var(--gold)" opacity="0.5" />
      <path d="M9,30 H17 V20 H25" stroke="var(--gold)" opacity="0.5" />
      <path d="M25,20 H35" stroke="var(--gold)" />
      <circle cx="40" cy="20" r="3.5" fill="var(--gold)" />
      {/* Eliminated branch */}
      <path d="M17,10 H22" stroke="var(--red)" opacity="0.25" strokeDasharray="2 2" />
      <path d="M17,30 H22" stroke="var(--red)" opacity="0.25" strokeDasharray="2 2" />
    </svg>
  );
}

function DoubleElimPictogram() {
  return (
    <svg viewBox="0 0 56 52" width="56" height="52" fill="none" strokeWidth="1.5" strokeLinecap="round">
      {/* Upper bracket */}
      <circle cx="6" cy="8" r="3" fill="var(--gold)" opacity="0.6" />
      <circle cx="6" cy="22" r="3" fill="var(--gold)" opacity="0.6" />
      <path d="M9,8 H15 V15 H22" stroke="var(--gold)" opacity="0.5" />
      <path d="M9,22 H15 V15 H22" stroke="var(--gold)" opacity="0.5" />
      <path d="M22,15 H30" stroke="var(--gold)" />
      {/* Lower bracket */}
      <path d="M15,8 V36 H22 V42 H30" stroke="#52b788" opacity="0.5" />
      <path d="M15,22 V36" stroke="#52b788" opacity="0.5" />
      <path d="M30,42 V32 H38" stroke="#52b788" opacity="0.5" />
      {/* Grand Final */}
      <path d="M30,15 H36 V32 H38" stroke="var(--gold)" />
      <circle cx="44" cy="32" r="3.5" fill="var(--gold)" />
    </svg>
  );
}

function SwissPictogram() {
  return (
    <svg viewBox="0 0 44 44" width="44" height="44" fill="none" strokeWidth="1.2">
      {/* Grid of connected nodes */}
      {[
        [8, 8], [22, 8], [36, 8],
        [8, 22], [22, 22], [36, 22],
        [8, 36], [22, 36], [36, 36],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="var(--gold)" opacity={i === 4 ? 0.9 : 0.35} />
      ))}
      {/* Cross connections */}
      <line x1="8" y1="8" x2="36" y2="36" stroke="var(--gold)" opacity="0.15" />
      <line x1="36" y1="8" x2="8" y2="36" stroke="var(--gold)" opacity="0.15" />
      <line x1="22" y1="8" x2="22" y2="36" stroke="var(--gold)" opacity="0.12" />
      <line x1="8" y1="22" x2="36" y2="22" stroke="var(--gold)" opacity="0.12" />
      <line x1="8" y1="8" x2="36" y2="22" stroke="var(--gold)" opacity="0.08" />
      <line x1="36" y1="8" x2="8" y2="22" stroke="var(--gold)" opacity="0.08" />
    </svg>
  );
}

function GroupsPlayoffsPictogram() {
  return (
    <svg viewBox="0 0 56 44" width="56" height="44" fill="none" strokeWidth="1.5" strokeLinecap="round">
      {/* Group A */}
      <circle cx="10" cy="12" r="8" stroke="#4fc3f7" opacity="0.4" />
      <circle cx="10" cy="12" r="2" fill="#4fc3f7" opacity="0.6" />
      {/* Group B */}
      <circle cx="10" cy="34" r="8" stroke="#4fc3f7" opacity="0.4" />
      <circle cx="10" cy="34" r="2" fill="#4fc3f7" opacity="0.6" />
      {/* Arrow to playoffs */}
      <path d="M20,12 H28 V22 H36" stroke="var(--gold)" />
      <path d="M20,34 H28 V22 H36" stroke="var(--gold)" />
      <path d="M36,22 H44" stroke="var(--gold)" />
      <circle cx="48" cy="22" r="3.5" fill="var(--gold)" />
    </svg>
  );
}

/* ─── Format data ─── */

const formats = [
  {
    icon: <Shield size={24} style={{ color: "#52b788" }} />,
    pictogram: <DoubleElimPictogram />,
    title: "Double Elimination",
    desc: "Классический формат. Проигравший попадает в нижнюю сетку — второй шанс есть у каждого.",
    tags: ["Справедливо", "Драматичные come-back", "Популярно на TI"],
  },
  {
    icon: <Zap size={24} style={{ color: "var(--red)" }} />,
    pictogram: <SingleElimPictogram />,
    title: "Single Elimination",
    desc: "Быстро и решительно. Одно поражение — и ты вне игры. Идеально для однодневных турниров.",
    tags: ["Быстрый формат", "Максимум напряжения", "Для большого числа команд"],
  },
  {
    icon: <RefreshCw size={24} style={{ color: "#4fc3f7" }} />,
    pictogram: <SwissPictogram />,
    title: "Swiss System",
    desc: "Каждый играет с соперником своего уровня. Матчи идут раунд за раундом, пока не выявится лидер.",
    tags: ["Нет вылетов", "Честное распределение", "Много игр для всех"],
  },
  {
    icon: <LayoutGrid size={24} style={{ color: "var(--gold)" }} />,
    pictogram: <GroupsPlayoffsPictogram />,
    title: "Groups + Playoffs",
    desc: "Групповой этап + плейофф. Как на настоящих турнирах: сначала отбор, потом борьба на выбывание.",
    tags: ["Как на TI / Majors", "Длинный турнир", "Группы + Bracket"],
  },
];

export default function TournamentFormats() {
  return (
    <section className="mb-14">
      <h2 className="text-xl font-bold mb-6" style={{ color: "var(--foreground)" }}>
        Форматы турниров
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {formats.map((fmt) => (
          <div
            key={fmt.title}
            className="format-card p-5 rounded-xl flex gap-4"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            {/* Pictogram column */}
            <div
              className="flex-shrink-0 flex items-center justify-center rounded-lg"
              style={{
                width: 72,
                minHeight: 72,
                background: "var(--surface-2)",
              }}
            >
              {fmt.pictogram}
            </div>

            {/* Text column */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                {fmt.icon}
                <h3
                  className="font-semibold text-sm"
                  style={{ color: "var(--foreground)" }}
                >
                  {fmt.title}
                </h3>
              </div>
              <p
                className="text-xs mb-3 leading-relaxed"
                style={{ color: "var(--text-sub)" }}
              >
                {fmt.desc}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {fmt.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(200,155,60,0.08)",
                      color: "var(--gold)",
                      border: "1px solid rgba(200,155,60,0.15)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
