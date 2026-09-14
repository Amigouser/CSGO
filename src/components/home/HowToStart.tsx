import Link from "next/link";
import { Trophy, Swords, Award } from "lucide-react";

const steps = [
  {
    num: 1,
    title: "Войди через Steam",
    desc: "Авторизуйся — MMR подтянется автоматически",
    link: "/login",
    linkText: "Войти",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ color: "var(--gold)" }}
      >
        <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.606 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.76-1.121-1.39-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.252 0-2.265-1.014-2.265-2.265z" />
      </svg>
    ),
  },
  {
    num: 2,
    title: "Найди турнир",
    desc: "Выбери формат: Single, Double Elim, Swiss или Groups",
    link: "/tournaments",
    linkText: "Смотреть",
    icon: <Trophy size={32} style={{ color: "var(--gold)" }} />,
  },
  {
    num: 3,
    title: "Зарегистрируйся",
    desc: "Запишись на турнир и жди начала драфта",
    link: "/tournaments",
    linkText: "Записаться",
    icon: <Award size={32} style={{ color: "var(--gold)" }} />,
  },
  {
    num: 4,
    title: "Играй и побеждай",
    desc: "Результаты, статистика и рейтинг — всё здесь",
    link: "/leaderboard",
    linkText: "Рейтинг",
    icon: <Swords size={32} style={{ color: "var(--gold)" }} />,
  },
];

export default function HowToStart() {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold mb-6" style={{ color: "var(--foreground)" }}>
        Как начать за 4 шага
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step) => (
          <div
            key={step.num}
            className="p-5 rounded-xl relative"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <div
              className="absolute top-4 right-4 text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: "rgba(200,155,60,0.15)", color: "var(--gold)" }}
            >
              {step.num}
            </div>
            <div className="mb-3">{step.icon}</div>
            <h3 className="font-semibold mb-1 text-sm" style={{ color: "var(--foreground)" }}>
              {step.title}
            </h3>
            <p className="text-xs mb-4" style={{ color: "var(--text-sub)" }}>
              {step.desc}
            </p>
            <Link href={step.link} className="text-xs font-semibold" style={{ color: "var(--gold)" }}>
              {step.linkText} →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
