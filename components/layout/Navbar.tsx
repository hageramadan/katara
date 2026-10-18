"use client";
import Link from "next/link";
import { FiUser, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import Image from "next/image";
import CountryDropdown from "@/components/ui/CountryDropdown";
import LanguageDropdown from "@/components/ui/LanguageDropdown";
import { FaAngleDown } from "react-icons/fa6";

export default function Navbar() {
  const { t, lang, country } = useApp();
  const [open, setOpen] = useState(false);

  // 🔐 بيانات المستخدم (مؤقتًا — هنربطها بـ Auth بعدين)
  const user = {
    name: "Mo3tz Elrawy",
    email: "mo3tzelrawy111@gmail.com",
    isLoggedIn: true, // غيّرها لـ false لو مش مسجل
  };

  const initial = user.name.charAt(0).toUpperCase();
  const firstName = user.name.split(" ")[0];

  return (
    <nav className="sticky bg-white top-0 z-50 shadow-md">
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
          className="md:hidden text-2xl text-primary"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* ==================== Mobile Menu ==================== */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-6">
          <CountryDropdown />
          <span className="w-px h-5 bg-primary/20" />
          <LanguageDropdown />

          <div className="text-start text-sm text-gray-500">
            {lang === "ar" ? "العملة" : "Currency"}:{" "}
            <span className="text-primary font-semibold">
              {country.currency}
            </span>
          </div>

          <Link
            href="/trips"
            className="text-base underline font-bold text-primary hover:opacity-80 transition block"
          >
            {lang === "ar" ? "رحلاتي" : "My Trips"}
          </Link>
         <Link
              href="/login"
              className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 rounded-md text-sm font-semibold"
            >
              <FiUser /> {t.navbar.login}
            </Link>
             <Link
              href="/profile"
              className="flex items-center gap-3 bg-[#FAFCFE] border border-[#DCE3EC] rounded-xl p-3 hover:bg-[#F0F4F8] transition"
            >
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                {initial}
              </div>
              <div className="flex flex-col text-start">
                <span className="text-sm font-bold text-primary">
                  {firstName}
                </span>
                <span className="text-xs text-gray-400 truncate max-w-[180px]">
                  {user.email}
                </span>
              </div>
            </Link>
          {/* User OR Login */}
          {/* {user.isLoggedIn ? (
            <Link
              href="/profile"
              className="flex items-center gap-3 bg-[#FAFCFE] border border-[#DCE3EC] rounded-xl p-3 hover:bg-[#F0F4F8] transition"
            >
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                {initial}
              </div>
              <div className="flex flex-col text-start">
                <span className="text-sm font-bold text-primary">
                  {firstName}
                </span>
                <span className="text-xs text-gray-400 truncate max-w-[180px]">
                  {user.email}
                </span>
              </div>
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 rounded-md text-sm font-semibold"
            >
              <FiUser /> {t.navbar.login}
            </Link>
          )} */}
        </div>
      )}
    </nav>
  );
}