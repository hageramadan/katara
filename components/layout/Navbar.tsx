"use client";
import Link from "next/link";
import { FiUser, FiMenu, FiX, FiSettings } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { useApp } from "@/context/AppContext";
import Image from "next/image";
import CountryDropdown from "@/components/ui/CountryDropdown";
import LanguageDropdown from "@/components/ui/LanguageDropdown";
import { FaAngleDown } from "react-icons/fa6";
import { RiPlaneLine } from "react-icons/ri";

export default function Navbar() {
  const { t, lang, country } = useApp();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOnOutsideClick = (event: PointerEvent) => {
      const target = event.target as Node;
      if (menuRef.current?.contains(target) || toggleRef.current?.contains(target)) return;
      setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  // 🔐 بيانات المستخدم (مؤقتًا — هنربطها بـ Auth بعدين)
  const user = {
    name: "Mo3tz Elrawy",
    email: "mo3tzelrawy111@gmail.com",
    isLoggedIn: true, // غيّرها لـ false لو مش مسجل
  };

  const initial = user.name.charAt(0).toUpperCase();
  const firstName = user.name.split(" ")[0];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.png"
            alt="Katra Go Logo"
            width={120}
            height={60}
            className="w-20 h-14 object-contain"
            priority
          />
        </Link>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <CountryDropdown />

          <span className="w-px h-5 bg-gray-200" />

          <LanguageDropdown />

          <span className="w-px h-5 bg-gray-200" />

          <span className="text-primary text-base font-bold">
            {country.currency}
          </span>

          <span className="w-3" />

          <Link
            href="/trips"
            className="text-base me-2 underline font-bold text-primary hover:opacity-80 transition"
          >
            {lang === "ar" ? "رحلاتي" : "My Trips"}
          </Link>
         <Link
              href="/profile"
              className="flex items-center gap-2.5 hover:opacity-90 transition group border rounded-full px-3 py-1 border-gray-300 bg-gray-100"
            >
              {/* Avatar */}
              <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold text-base shadow-sm group-hover:shadow-md transition">
                {initial}
              </div>
              {/* First Name */}
              <span className="text-base font-bold text-primary">
                {firstName}
              </span>
              <FaAngleDown className="text-primary text-lg"/>
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-1.5 bg-primary text-white px-5 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition"
            >
              <FiUser /> {t.navbar.login}
            </Link>
          {/* ==================== User OR Login ==================== */}
          {/* {user.isLoggedIn ? (
            <Link
              href="/profile"
              className="flex items-center gap-2.5 hover:opacity-90 transition group"
            >
             
              <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold text-base shadow-sm group-hover:shadow-md transition">
                {initial}
              </div>
             
              <span className="text-base font-bold text-primary">
                {firstName}
              </span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1.5 bg-primary text-white px-5 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition"
            >
              <FiUser /> {t.navbar.login}
            </Link>
          )} */}
        </div>

        {/* Mobile Toggle */}
        <button
          ref={toggleRef}
          className="md:hidden text-2xl text-primary"
          onClick={() => setOpen(!open)}
          aria-label={open ? (lang === "ar" ? "إغلاق القائمة" : "Close menu") : (lang === "ar" ? "فتح القائمة" : "Open menu")}
          aria-expanded={open}
          aria-controls="mobile-navigation-menu"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* ==================== Mobile Menu ==================== */}
      {open && (
        <>
          <button
            type="button"
            aria-label={lang === "ar" ? "إغلاق القائمة" : "Close menu"}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[55] bg-[#07102F]/45 backdrop-blur-[2px] md:hidden"
          />
          <div
            ref={menuRef}
            id="mobile-navigation-menu"
            className="fixed inset-y-0 inset-e-0 z-[60] flex w-[min(88vw,360px)] flex-col overflow-y-auto bg-white shadow-2xl md:hidden"
          >
            <div className="flex items-center justify-between border-b border-white/15 bg-primary px-5 py-5 text-white">
              <div className="flex items-center gap-3">
                <Image src="/logo.png" alt="Katra Go" width={90} height={45} className="h-10 w-20 rounded-lg bg-white object-contain p-1" />
                <div>
                  <p className="text-sm font-bold">{lang === "ar" ? "أهلاً بك" : "Welcome"}</p>
                  <p className="mt-0.5 text-xs text-white/70">{lang === "ar" ? "استكشف خدمات الأفضل" : "Explore Al-Afdal"}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={lang === "ar" ? "إغلاق القائمة" : "Close menu"}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl transition hover:bg-white/20"
              >
                <FiX />
              </button>
            </div>

            <div className="flex-1 space-y-6 px-5 py-6">
              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-2xl bg-[#F3F7FA] p-4 transition hover:bg-[#EAF1F5]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#55BBC4] text-lg font-bold text-white">{initial}</div>
                <div className="min-w-0 flex-1 text-start">
                  <span className="block text-sm font-bold text-primary">{firstName}</span>
                  <span className="mt-1 block truncate text-xs text-[#84909E]">{user.email}</span>
                </div>
                <FaAngleDown className="-rotate-90 text-primary rtl:rotate-90" />
              </Link>

              <div>
                <p className="mb-2 px-1 text-xs font-bold text-[#9AA3AF]">{lang === "ar" ? "حسابك" : "Your account"}</p>
                <Link
                  href="/trips"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3.5 text-sm font-semibold text-[#243247] transition hover:bg-[#F3F7FA]"
                >
                  <RiPlaneLine className="text-xl text-[#55BBC4]" />
                  {lang === "ar" ? "رحلاتي" : "My Trips"}
                </Link>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="mt-1 flex items-center gap-3 rounded-xl px-3 py-3.5 text-sm font-semibold text-[#243247] transition hover:bg-[#F3F7FA]"
                >
                  <FiUser className="text-xl text-[#55BBC4]" />
                  {t.navbar.login}
                </Link>
              </div>

              <div className="border-t border-[#E9EDF1] pt-5">
                <p className="mb-3 flex items-center gap-2 px-1 text-xs font-bold text-[#9AA3AF]"><FiSettings />{lang === "ar" ? "التفضيلات" : "Preferences"}</p>
                <div className="flex flex-col gap-2.5">
                  <CountryDropdown
                    width="w-full"
                    onSelect={() => setOpen(false)}
                    className="w-full"
                    triggerClassName="w-full justify-between rounded-xl bg-[#F6F8FA] px-3 py-3 text-sm"
                  />
                  <LanguageDropdown
                    width="w-full"
                    onSelect={() => setOpen(false)}
                    className="w-full"
                    triggerClassName="w-full justify-between rounded-xl bg-[#F6F8FA] px-3 py-3 text-sm"
                  />
                </div>
                <p className="mt-3 px-1 text-start text-xs text-[#84909E]">
                  {lang === "ar" ? "العملة" : "Currency"}: <span className="font-semibold text-primary">{country.currency}</span>
                </p>
              </div>
            </div>

            <div className="border-t border-[#E9EDF1] p-5">
              <p className="text-center text-[11px] text-[#9AA3AF]">{lang === "ar" ? "رحلتك تبدأ من هنا" : "Your journey starts here"}</p>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
