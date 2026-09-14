import { TrendingUp } from "lucide-react";

export default function MetaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8" style={{ color: "var(--foreground)" }}>Мета</h1>
      <div className="text-center py-16">
        <TrendingUp size={48} style={{ color: "var(--text-sub)", margin: "0 auto 16px" }} />
        <p style={{ color: "var(--text-sub)" }}>Статистика меты появится после накопления данных матчей</p>
      </div>
    </div>
  );
}
