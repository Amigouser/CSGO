"use client";

import { useState, useEffect, createContext, useContext, useCallback, ReactNode } from "react";
import { X, Bell, Trophy, Swords, Award } from "lucide-react";

interface Notification {
  id: string;
  type: "tournament" | "match" | "achievement" | "info";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, "id" | "time" | "read">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationProvider");
  return ctx;
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "tournament",
      title: "Турнир начинается!",
      message: "INTKG Winter Cup 2026 начнётся через 1 час",
      time: "5 мин назад",
      read: false,
    },
    {
      id: "2",
      type: "match",
      title: "Результат матча",
      message: "Вы победили MidOrFeed со счётом 2:1",
      time: "1 час назад",
      read: false,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const addNotification = useCallback(
    (notification: Omit<Notification, "id" | "time" | "read">) => {
      const newNotification: Notification = {
        ...notification,
        id: Date.now().toString(),
        time: "только что",
        read: false,
      };
      setNotifications((prev) => [newNotification, ...prev].slice(0, 20));
    },
    []
  );

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, addNotification, markAsRead, markAllAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function NotificationPanel() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "tournament":
        return <Trophy size={16} style={{ color: "var(--gold)" }} />;
      case "match":
        return <Swords size={16} style={{ color: "#4fc3f7" }} />;
      case "achievement":
        return <Award size={16} style={{ color: "#52b788" }} />;
      default:
        return <Bell size={16} style={{ color: "var(--text-sub)" }} />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center w-8 h-8 rounded-lg transition-all cursor-pointer"
        style={{
          background: "var(--hover-bg)",
          border: "1px solid var(--border)",
          color: "var(--text-sub)",
        }}
      >
        <Bell size={16} />
        {unreadCount > 0 && (
          <span
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center"
            style={{ background: "var(--red)", color: "white" }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-10 w-80 rounded-xl shadow-xl overflow-hidden z-50"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
          }}
        >
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <span className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>
              Уведомления
            </span>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs cursor-pointer"
                style={{ color: "var(--gold)" }}
              >
                Прочитать все
              </button>
            )}
          </div>

          <div className="max-h-64 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-sm" style={{ color: "var(--text-sub)" }}>
                Нет уведомлений
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className="flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors"
                  style={{
                    background: n.read ? "transparent" : "var(--hover-bg)",
                    borderBottom: "1px solid var(--border)",
                  }}
                  onClick={() => markAsRead(n.id)}
                >
                  {getIcon(n.type)}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                      {n.title}
                    </div>
                    <div className="text-xs" style={{ color: "var(--text-sub)" }}>
                      {n.message}
                    </div>
                    <div className="text-xs mt-1" style={{ color: "var(--text-sub)" }}>
                      {n.time}
                    </div>
                  </div>
                  {!n.read && (
                    <div
                      className="w-2 h-2 rounded-full mt-1 flex-shrink-0"
                      style={{ background: "var(--gold)" }}
                    />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
