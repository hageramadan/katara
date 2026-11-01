"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { RegistrationUser } from "@/lib/auth/types";
import { readStoredAuthUser, storeAuthUser } from "@/lib/auth/storage";

type AuthContextValue = {
  user: RegistrationUser | null;
  isLoading: boolean;
  setAuthenticatedUser: (user: RegistrationUser) => void;
};
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<RegistrationUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const version = useRef(0);
  const setAuthenticatedUser = useCallback((user: RegistrationUser) => {
    version.current += 1;
    storeAuthUser(user);
    setUser(user);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    let active = true;
    const currentVersion = version.current;
    Promise.resolve().then(() => {
      if (active && currentVersion === version.current) {
        setUser(readStoredAuthUser());
        setIsLoading(false);
      }
    });
    const syncStorage = (event: StorageEvent) => {
      if (event.storageArea === window.localStorage && (event.key === "token" || event.key === "user" || event.key === null)) {
        version.current += 1;
        setUser(readStoredAuthUser());
      }
    };
    window.addEventListener("storage", syncStorage);
    return () => {
      active = false;
      window.removeEventListener("storage", syncStorage);
    };
  }, []);

  return <AuthContext.Provider value={{ user, isLoading, setAuthenticatedUser }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
