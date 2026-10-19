"use client";
import { useState } from "react";
import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { FiMenu } from "react-icons/fi";
import { useApp } from "@/context/AppContext";
import ProfileSidebar from "@/components/profile/ProfileSidebar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<section className="min-h-screen bg-[#F7F9FB] py-6 md:py-10">{children}</section>}>
      <ProfileLayoutContent>{children}</ProfileLayoutContent>
    </Suspense>
  );
}

function ProfileLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { lang } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (pathname?.startsWith("/profile/bookings/")) {
    return (
      <section className="min-h-screen bg-[#F7F9FB] py-6 md:py-10">
        <div className="container mx-auto px-3 sm:px-4">
          <main className="min-w-0">{children}</main>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#F7F9FB] py-4 sm:py-6 md:py-10">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="mb-4 flex items-center justify-between lg:hidden">
          <h1 className="text-base font-bold text-[#0D154B]">{lang === "ar" ? "ملفي الشخصي" : "My profile"}</h1>
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-expanded={sidebarOpen}
            aria-controls="profile-sidebar-mobile"
            className="flex items-center gap-2 rounded-xl bg-[#0D154B] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#17245F]"
          >
            <FiMenu className="text-lg" />
            {lang === "ar" ? "القائمة" : "Menu"}
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-[280px_1fr]">
          {/* Sidebar */}
          <Suspense fallback={<div className="hidden h-96 w-72 rounded-2xl bg-white lg:block" />}>
            <ProfileSidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          </Suspense>

          {/* Content */}
          <main className="min-w-0">{children}</main>
        </div>
      </div>
      {sidebarOpen && (
        <button
          type="button"
          aria-label={lang === "ar" ? "إغلاق القائمة" : "Close menu"}
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-[60] bg-[#07102F]/45 backdrop-blur-[2px] lg:hidden"
        />
      )}
    </section>
  );
}
