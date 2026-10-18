"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { countries, Country } from "@/lib/countries";
import { translations, Lang, Translation } from "@/lib/translations";

type AppContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  dir: "rtl" | "ltr";
  country: Country;
  setCountry: (c: Country) => void;
  currency: string;
  t: Translation;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");
  const [country, setCountry] = useState<Country>(countries[0]);

  const dir = lang === "ar" ? "rtl" : "ltr";
  const t = translations[lang] as Translation;

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const toggleLang = () => setLang(prev => (prev === "ar" ? "en" : "ar"));

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        dir,
        country,
        setCountry,
        currency: country.currency,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}