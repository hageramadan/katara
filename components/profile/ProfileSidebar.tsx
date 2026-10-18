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
  FiLogOut,
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
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
};

export default function ProfileSidebar({
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

  return (
    <aside className="w-full lg:w-72 bg-white lg:rounded-2xl shadow-sm border border-gray-100 overflow-hidden lg:sticky lg:top-24 h-fit">
      {/* ==================== User Info ==================== */}
      <div className="bg-[#FAFCFE] p-6 border-b border-gray-100">
        <div className="flex items-start gap-1.5">
          {/* Avatar */}
          <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-base lg:text-[22px] shadow-md">
            {initial}
          </div>
          <div className="flex flex-col gap-2">
            {/* Name */}
            <h3 className="text-base md:text-xl font-meduim text-[#0D0D0D] ">
              {user.name}
            </h3>

            {/* Email */}
            <p className="text-xs md:text-xs text-[#8E8E8E]  break-all">
              {user.email}
            </p>
          </div>
        </div>
      </div>

      {/* ==================== Menu ==================== */}
      <nav className="p-3">
        <ul className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/profile"
                ? pathname === "/profile"
                : pathname.startsWith(item.href);

            return (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center justify-between px-4 py-3 rounded-xl
                    text-sm md:text-base font-semibold
                    transition-all duration-200
                    ${
                      active
                        ? "bg-[#E5F6F7] text-[#163B45]"
                        : "text-[#0D154B] hover:bg-gray-50"
                    }
                  `}
                >
                 
                  <div className="flex items-center gap-2">
                     <Icon
                    className={`text-lg shrink-0 ${
                      active ? "text-[#55BBC4]" : "text-[#6F7E89]"
                    }`}
                  />
                    <span>{lang === "ar" ? item.ar : item.en}</span>
                
                  </div>
                    <FaAngleLeft
                    className={` ${active ? "block" : "hidden"} ltr:rotate-180 `}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ==================== Logout ==================== */}
        {/* <div className="mt-3 pt-3 border-t border-gray-100">
          <button
            type="button"
            className="
              w-full flex items-center gap-3 px-4 py-3 rounded-xl
              text-sm md:text-sm font-semibold
              text-[#D1454A] hover:bg-[#D1454A]/5 transition
            "
          >
            <FiLogOut className="text-lg shrink-0" />
            <span>{lang === "ar" ? "تسجيل الخروج" : "Logout"}</span>
          </button>
        </div> */}
      </nav>
    </aside>
  );
}
