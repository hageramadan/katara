"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import logo from "@/public/logo.png";

export default function HomeLoadingScreen() {
  const { lang } = useApp();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let onLoad: () => void;
    const pageReady = new Promise<void>((resolve) => {
      onLoad = resolve;
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", onLoad, { once: true });
    });

    // The hero uses a CSS background, so explicitly wait for it to be decoded.
    // Failed assets must not leave the loading screen covering the page.
    const hero = new window.Image();
    hero.src = "/hero.png";
    const heroReady = hero.decode().catch(() => undefined);
    const fontsReady = document.fonts.ready.catch(() => undefined);

    Promise.all([pageReady, heroReady, fontsReady]).then(() => {
      if (!active) return;
      document.body.style.overflow = previousOverflow;
      setLoading(false);
    });

    return () => {
      active = false;
      window.removeEventListener("load", onLoad);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!loading) return null;

  return (
    <>
      <div className="home-loading-screen fixed inset-0 z-[100] flex min-h-svh flex-col items-center justify-center gap-7 bg-white px-6"
        role="status" aria-live="polite" aria-label={lang === "ar" ? "جاري تحميل الصفحة الرئيسية" : "Loading the home page"}>
        <div className="flex size-56 items-center justify-center rounded-full bg-[radial-gradient(circle,#E5F6F7_0%,#FFFFFF_70%)] sm:size-64">
          <Image src={logo} alt="Katara Go" preload sizes="192px" className="h-auto w-40 object-contain sm:w-48" />
        </div>
        <span aria-hidden="true" className="size-10 animate-spin rounded-full border-[3px] border-[#E5F6F7] border-t-[#00A8B5] motion-reduce:animate-none" />
        {/* <span className="text-sm font-medium text-[#6F7E89]">{lang === "ar" ? "جاري التحميل..." : "Loading..."}</span> */}
      </div>
      <noscript><style>{".home-loading-screen { display: none; }"}</style></noscript>
    </>
  );
}
