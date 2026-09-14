import { Trophy } from "lucide-react";

export default function AchievementsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8" style={{ color: "var(--foreground)" }}>Достижения</h1>
      <div className="text-center py-16">
        <Trophy size={48} style={{ color: "var(--text-sub)", margin: "0 auto 16px" }} />
        <p style={{ color: "var(--text-sub)" }}>Достижения появятся после участия в турнирах</p>
      </div>
    </div>
  );
}
