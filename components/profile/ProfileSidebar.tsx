"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import {
  FiGrid,
  FiUser,
  FiCreditCard,
  FiUsers,
  FiCalendar,
  FiHeart,
  FiSettings,
  FiHelpCircle,
  FiX,
} from "react-icons/fi";
import { FaAngleLeft } from "react-icons/fa6";

// ==================== Menu Items ====================
const menuItems = [
  {
    key: "dashboard",
    href: "/profile",
    icon: FiGrid,
    ar: "لوحة التحكم",
    en: "Dashboard",
  },
  {
    key: "personal",
    href: "/profile/personal-info",
    icon: FiUser,
    ar: "معلوماتي الشخصية",
    en: "Personal Info",
  },
  {
    key: "wallet",
    href: "/profile/wallet",
    icon: FiCreditCard,
    ar: "المحفظة",
    en: "Wallet",
  },
  {
    key: "travelers",
    href: "/profile/travelers",
    icon: FiUsers,
    ar: "مسافرون آخرون",
    en: "Other Travelers",
  },
  {
    key: "bookings",
    href: "/profile/bookings",
    icon: FiCalendar,
    ar: "حجوزاتي",
    en: "My Bookings",
  },
  {
    key: "favorites",
    href: "/profile/favorites",
    icon: FiHeart,
    ar: "المفضلة",
    en: "Favorites",
  },
  {
    key: "settings",
    href: "/profile/settings",
    icon: FiSettings,
    ar: "الإعدادات",
    en: "Settings",
  },
  {
    key: "support",
    href: "/profile/support",
    icon: FiHelpCircle,
    ar: "مركز الدعم والمساعدة",
    en: "Support Center",
  },
];

// ==================== Component ====================
type ProfileSidebarProps = {
  mobileOpen?: boolean;
  onClose?: () => void;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
};

export default function ProfileSidebar({
  mobileOpen = false,
  onClose,
  user = {
    name: "Mo3tz Elrawy",
    email: "mo3tzelrawy111@gmail.com",
  },
}: ProfileSidebarProps) {
  const { lang } = useApp();
  const pathname = usePathname();

  const initial = user.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("");

  const content = (
    <>
      <div className="border-b border-gray-100 bg-[#FAFCFE] p-3 sm:p-4 lg:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-base font-semibold text-white shadow-md sm:h-12 sm:w-12 lg:h-14 lg:w-14 lg:text-[22px]">
            {initial}
          </div>
          <div className="flex min-w-0 flex-col gap-1 lg:gap-2">
            <h3 className="truncate text-sm font-medium text-[#0D0D0D] md:text-xl">{user.name}</h3>
            <p className="truncate text-[11px] text-[#8E8E8E] md:text-xs">{user.email}</p>
          </div>
        </div>
      </div>
      <nav aria-label={lang === "ar" ? "قائمة الملف الشخصي" : "Profile navigation"} className="p-2 sm:p-3">
        <ul className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = item.href === "/profile" ? pathname === "/profile" : pathname.startsWith(item.href);
            return (
              <li key={item.key}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center justify-between gap-2 rounded-xl px-4 py-3 text-start text-sm font-semibold transition-all duration-200 md:text-base ${active ? "bg-[#E5F6F7] text-[#163B45]" : "text-[#0D154B] hover:bg-gray-50"}`}
                >
                  <span className="flex items-center gap-2">
                    <Icon className={`shrink-0 text-lg ${active ? "text-[#55BBC4]" : "text-[#6F7E89]"}`} />
                    <span>{lang === "ar" ? item.ar : item.en}</span>
                  </span>
                  {active && <FaAngleLeft className="ltr:rotate-180" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );

  return (
    <>
      <aside id="profile-sidebar-desktop" className="hidden h-fit w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm lg:sticky lg:top-24 lg:block lg:w-72">
        {content}
      </aside>
      {mobileOpen && (
        <aside id="profile-sidebar-mobile" className="fixed inset-y-0 inset-e-0 z-[70] h-dvh w-[min(88vw,320px)] overflow-y-auto rounded-s-2xl border border-gray-100 bg-white shadow-2xl lg:hidden">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <span className="text-sm font-bold text-primary">{lang === "ar" ? "القائمة" : "Menu"}</span>
            <button type="button" onClick={onClose} aria-label={lang === "ar" ? "إغلاق القائمة" : "Close menu"} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F3F6FA] text-lg text-primary">
              <FiX />
            </button>
          </div>
          {content}
        </aside>
      )}
    </>
  );
}
