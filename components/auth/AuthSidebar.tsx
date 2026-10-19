"use client";

import { useApp } from "@/context/AppContext";
import { FaUserCircle, FaPlaneDeparture, FaUsers } from "react-icons/fa";
import { FaUserTie, FaHandshake, FaBuilding } from "react-icons/fa6";

// ==================== Roles Types ====================
export type RoleKey =
  | "members"
  | "agents"
  | "travelCompanies"
  | "brokers"
  | "companies"
  | "partners";

// ==================== Roles Data ====================
export const roles: {
  key: RoleKey;
  icon: React.ElementType;
  ar: string;
  en: string;
}[] = [
  { key: "members", icon: FaUserCircle, ar: "الأعضاء", en: "Members" },
  { key: "agents", icon: FaUserTie, ar: "الوكلاء", en: "Agents" },
  {
    key: "travelCompanies",
    icon: FaPlaneDeparture,
    ar: "شركات السياحة والسفر",
    en: "Travel Companies",
  },
  { key: "brokers", icon: FaHandshake, ar: "بروكر", en: "Brokers" },
  { key: "companies", icon: FaBuilding, ar: "الشركات", en: "Companies" },
  { key: "partners", icon: FaUsers, ar: "شريك ثالث", en: "Third Partner" },
];

// ==================== Component ====================
type AuthSidebarProps = {
  activeRole: RoleKey;
  onRoleChange: (role: RoleKey) => void;
  className?: string;
};

export default function AuthSidebar({
  activeRole,
  onRoleChange,
  className = "",
}: AuthSidebarProps) {
  const { lang } = useApp();

  return (
    <aside
      className={`
        bg-white p-2.5 sm:p-4 md:p-6
        border-b md:border-b-0 md:border-e border-gray-200
        ${className}
      `}
    >
      <ul
        className="
          flex md:flex-col gap-2 
          overflow-x-auto md:overflow-visible 
          [&::-webkit-scrollbar]:hidden
          [-ms-overflow-style:none]
          scrollbar-none
        "
      >
        {roles.map((role) => {
          const Icon = role.icon;
          const active = role.key === activeRole;

          return (
            <li key={role.key} className="shrink-0 md:shrink">
              <button
                type="button"
                onClick={() => onRoleChange(role.key)}
                className={`
                  w-full flex flex-row md:flex-col items-center justify-center gap-2 md:gap-3 px-3 py-2.5 md:px-4 md:py-3 rounded-full md:rounded-xl
                  text-xs sm:text-sm font-semibold whitespace-nowrap
                  transition-all duration-200 cursor-pointer
                  ${
                    active
                      ? "bg-[#E5F6F7] text-[#163B45]"
                      : "bg-white text-[#172B35] hover:bg-gray-100 "
                  }
                `}
              >
                <Icon
                  className={`text-lg md:text-3xl shrink-0 ${active ? "text-[#55BBC4]" : "text-[#6F7E89]"}`}
                />
                <span>{lang === "ar" ? role.ar : role.en}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
