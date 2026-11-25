"use client";

import Image from "next/image";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import CountryDropdown from "@/components/ui/CountryDropdown";
import LanguageDropdown from "@/components/ui/LanguageDropdown";

export default function LoginNavbar() {
  const { lang, dir, country } = useApp();
  const { user } = useAuth();

  return (
    <header className="relative z-30 mx-auto mt-4 w-[calc(100%-1.5rem)] max-w-7xl rounded-2xl bg-[#273C49]/45 backdrop-blur-sm sm:w-[85%]">
      <nav dir={dir} aria-label={lang === "ar" ? "القائمة الرئيسية" : "Main navigation"} className="flex min-h-18 items-center justify-between gap-3 px-3 sm:px-4">
        <Link href="/" aria-label={lang === "ar" ? "الصفحة الرئيسية" : "Home"} className="shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
          <Image src="/logo.png" alt="Katara Go" width={120} height={80} className="h-14 w-20 object-contain" priority />
        </Link>
        <div className="flex flex-wrap items-center justify-end gap-2 text-white sm:gap-4">
          <CountryDropdown width="w-52" triggerClassName="text-white! text-xs! sm:text-sm!" />
          <span aria-hidden="true" className="h-4 w-px bg-white/35" />
          <span className="text-xs font-bold sm:text-sm">{country.currency}</span>
          <LanguageDropdown width="w-36" triggerClassName="text-white! text-xs! sm:text-sm!" />
          {user && (
            <Link href="/profile" className="flex items-center gap-2 rounded-full border border-white/60 px-2 py-1 text-xs transition hover:bg-white/10 sm:text-sm">
              <span className="flex size-8 items-center justify-center rounded-full bg-primary font-bold">{user.display_name.charAt(0).toUpperCase()}</span>
              <span className="max-w-24 truncate">{user.display_name.split(" ")[0]}</span>
              <FiChevronDown aria-hidden="true" />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
