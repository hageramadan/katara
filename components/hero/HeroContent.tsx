"use client";
import { useApp } from "@/context/AppContext";

export default function HeroContent() {
  const { t } = useApp();

  return (
    <div className="text-center text-white max-w-3xl mb-8">
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
        {t.hero.title}
      </h1>
      <p className="text-sm sm:text-base md:text-xl text-white font-semibold">
        {t.hero.subtitle}
      </p>
    </div>
  );
}
