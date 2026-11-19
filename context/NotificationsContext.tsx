"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { notifications, isNotificationUnread } from "@/lib/notifications";

type NotificationsState = { readIds: string[]; unreadCount: number; markRead: (ids: string[]) => void };
const NotificationsContext = createContext<NotificationsState | null>(null);

function NotificationStore({ storageKey, children }: { storageKey: string; children: ReactNode }) {
  const [readIds, setReadIds] = useState<string[]>([]);
  useEffect(() => {
    let active = true;
    Promise.resolve().then(() => {
      try {
        const saved: unknown = JSON.parse(localStorage.getItem(storageKey) || "[]");
        if (active && Array.isArray(saved)) setReadIds(saved.filter((id): id is string => typeof id === "string"));
      } catch { /* Storage may be unavailable. Reading still works in memory. */ }
    });
    const sync = (event: StorageEvent) => {
      if (event.key !== storageKey && event.key !== null) return;
      try {
        const saved: unknown = JSON.parse(event.newValue || "[]");
        if (Array.isArray(saved)) setReadIds(saved.filter((id): id is string => typeof id === "string"));
      } catch { /* Ignore invalid stored data. */ }
    };
    window.addEventListener("storage", sync);
    return () => { active = false; window.removeEventListener("storage", sync); };
  }, [storageKey]);

  function markRead(ids: string[]) {
    const next = Array.from(new Set([...readIds, ...ids]));
    setReadIds(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch { /* Keep the current session usable. */ }
  }

  return <NotificationsContext.Provider value={{ readIds, markRead, unreadCount: notifications.filter((item) => isNotificationUnread(item, readIds)).length }}>{children}</NotificationsContext.Provider>;
}

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const storageKey = `katara-notifications:${user?.id ?? "preview"}`;
  return <NotificationStore key={storageKey} storageKey={storageKey}>{children}</NotificationStore>;
}

export function useNotifications() {
  const value = useContext(NotificationsContext);
  if (!value) throw new Error("useNotifications must be used within NotificationsProvider");
  return value;
}
