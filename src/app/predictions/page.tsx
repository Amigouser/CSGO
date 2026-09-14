import { Trophy } from "lucide-react";

export default function PredictionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Предсказания</h1>
      <p className="text-sm mb-8" style={{ color: "var(--text-sub)" }}>
        Угадай победителя и заработай очки предсказателя
      </p>

      <div className="text-center py-16">
        <Trophy size={48} style={{ color: "var(--text-sub)", margin: "0 auto 16px" }} />
        <p style={{ color: "var(--text-sub)" }}>Предсказания появятся когда начнутся матчи</p>
      </div>
    </div>
  );
}
