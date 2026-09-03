import { Shield, Zap, RefreshCw, LayoutGrid } from "lucide-react";

const formats = [
  {
    icon: <Shield size={28} style={{ color: "#52b788" }} />,
    title: "Double Elimination",
    desc: "Классический формат. Проигравший попадает в нижнюю сетку — второй шанс есть у каждого.",
    tags: ["Справедливо", "Драматичные come-back", "Популярно на TI"],
  },
  {
    icon: <Zap size={28} style={{ color: "var(--red)" }} />,
    title: "Single Elimination",
    desc: "Быстро и решительно. Одно поражение — и ты вне игры. Идеально для однодневных турниров.",
    tags: ["Быстрый формат", "Максимум напряжения", "Подходит для большого числа команд"],
  },
  {
    icon: <RefreshCw size={28} style={{ color: "#4fc3f7" }} />,
    title: "Swiss System",
    desc: "Каждый играет с соперником своего уровня. Матчи идут раунд за раундом, пока не выявится лидер.",
    tags: ["Нет вылетов", "Честное распределение", "Много игр для всех"],
  },
  {
    icon: <LayoutGrid size={28} style={{ color: "var(--gold)" }} />,
    title: "Groups + Playoffs",
    desc: "Групповой этап + плейофф. Как на настоящих турнирах: сначала отбор, потом борьба на выбывание.",
    tags: ["Как на TI/Majors", "Длинный турнир", "Группы + Bracket"],
  },
];

export default function TournamentFormats() {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold mb-6" style={{ color: "var(--foreground)" }}>
        Форматы турниров
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {formats.map((fmt) => (
          <div
            key={fmt.title}
            className="p-5 rounded-xl dota-card"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <div className="flex items-start gap-3 mb-3">
              <span>{fmt.icon}</span>
              <div>
                <h3 className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>
                  {fmt.title}
                </h3>
                <p className="text-xs mt-1" style={{ color: "var(--text-sub)" }}>
                  {fmt.desc}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {fmt.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(200,155,60,0.1)",
                    color: "var(--gold)",
                    border: "1px solid rgba(200,155,60,0.2)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
