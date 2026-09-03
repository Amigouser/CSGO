import { Trophy, Shield, Users, BarChart3 } from "lucide-react";

const features = [
  { icon: Trophy, title: "Турниры", desc: "Участвуй в турнирах по Dota 2 и CS2" },
  { icon: Shield, title: "Рейтинг", desc: "Соревнуйся и поднимайся в рейтинге" },
  { icon: Users, title: "Команды", desc: "Находи тиммейтов и создавай команды" },
  { icon: BarChart3, title: "Статистика", desc: "Отслеживай свою статистику" },
];

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div
            className="text-6xl mb-4"
            style={{ filter: "drop-shadow(0 0 30px rgba(200,155,60,0.4))" }}
          >
            ⚔️
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--foreground)" }}>
            Войти через Steam
          </h1>
          <p className="text-sm" style={{ color: "var(--text-sub)" }}>
            Авторизуйся для участия в турнирах и отслеживания статистики
          </p>
        </div>

        <div
          className="rounded-2xl p-6 mb-6"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <a
            href="/api/auth/signin"
            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl font-bold text-sm transition-all glow-gold"
            style={{
              background: "linear-gradient(135deg, var(--gold), var(--gold-light))",
              color: "var(--background)",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.606 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.76-1.121-1.39-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.252 0-2.265-1.014-2.265-2.265z" />
            </svg>
            Войти через Steam
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-4 rounded-xl text-center"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <f.icon size={24} style={{ color: "var(--gold)", margin: "0 auto 8px" }} />
              <h3 className="text-xs font-semibold mb-1" style={{ color: "var(--foreground)" }}>
                {f.title}
              </h3>
              <p className="text-xs" style={{ color: "var(--text-sub)" }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
