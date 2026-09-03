"use client";

import { useState, useEffect } from "react";
import { Trophy, UserPlus, Swords, Star } from "lucide-react";

interface Activity {
  id: string;
  type: "registration" | "match_start" | "match_result" | "achievement";
  message: string;
  time: string;
  icon: typeof Trophy;
}

const mockActivities: Activity[] = [
  { id: "1", type: "registration", message: "ProPlayer_KG зарегистрировался на Winter Cup", time: "2 мин назад", icon: UserPlus },
  { id: "2", type: "match_result", message: "MidOrFeed победил BishkekBoss (2:1)", time: "5 мин назад", icon: Swords },
  { id: "3", type: "achievement", message: "CarryPlayer разблокировал 'Чемпион'", time: "12 мин назад", icon: Star },
  { id: "4", type: "match_start", message: "Матч начался: DotaKing99 vs OfflaneKing", time: "15 мин назад", icon: Swords },
  { id: "5", type: "registration", message: "SupportMain зарегистрировался на Swiss Challenge", time: "20 мин назад", icon: UserPlus },
];

export default function LiveActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setActivities(mockActivities);
    setIsVisible(true);

    // Simulate new activity every 30 seconds
    const interval = setInterval(() => {
      const newActivity: Activity = {
        id: Date.now().toString(),
        type: "registration",
        message: `Новый игрок присоединился к турниру`,
        time: "только что",
        icon: UserPlus,
      };
      setActivities((prev) => [newActivity, ...prev].slice(0, 5));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="relative">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: "#52b788" }}
          />
          <div
            className="absolute inset-0 w-2 h-2 rounded-full animate-ping"
            style={{ background: "#52b788", opacity: 0.75 }}
          />
        </div>
        <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
          Активность в реальном времени
        </h3>
      </div>

      <div className="space-y-2">
        {activities.map((activity, i) => (
          <div
            key={activity.id}
            className="flex items-center gap-3 p-3 rounded-lg transition-all duration-300"
            style={{
              background: i === 0 ? "rgba(200,155,60,0.08)" : "var(--hover-bg)",
              border: `1px solid ${i === 0 ? "rgba(200,155,60,0.15)" : "transparent"}`,
              opacity: i === 0 ? 1 : 0.8 - i * 0.1,
              animation: i === 0 ? "slideIn 0.3s ease-out" : "none",
            }}
          >
            <activity.icon
              size={16}
              style={{ color: "var(--gold)", flexShrink: 0 }}
            />
            <span className="text-sm flex-1" style={{ color: "var(--foreground)" }}>
              {activity.message}
            </span>
            <span className="text-xs whitespace-nowrap" style={{ color: "var(--text-sub)" }}>
              {activity.time}
            </span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
