"use client";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { FiMail, FiPhone } from "react-icons/fi";
import { NotificationPreferences, ContactSettings } from "@/lib/settings/types";

type NotificationsSectionProps = {
  contact: ContactSettings;
};

const initialPrefs: NotificationPreferences = {
  travelTips: true,
  specialOffers: true,
  flightAlerts: true,
};

export default function NotificationsSection({ contact }: NotificationsSectionProps) {
  const { lang } = useApp();
  const [prefs, setPrefs] = useState<NotificationPreferences>(initialPrefs);

  const toggle = (key: keyof NotificationPreferences) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const items: {
    key: keyof NotificationPreferences;
    titleAr: string;
    titleEn: string;
    descAr: string;
    descEn: string;
  }[] = [
    {
      key: "travelTips",
      titleAr: "نصائح السفر",
      titleEn: "Travel Tips",
      descAr: "تحديث شهري حول أحدث نصائح السفر والحيل والاتجاهات والأدوات من كتارا جو.",
      descEn: "Monthly updates on the latest travel tips, tricks, trends, and tools from Katra Go.",
    },
    {
      key: "specialOffers",
      titleAr: "عروض خاصة",
      titleEn: "Special Offers",
      descAr: "احصل على عروض وخصومات خاصة ومحدودة الوقت من شركائنا.",
      descEn: "Get special and limited-time offers from our partners.",
    },
    {
      key: "flightAlerts",
      titleAr: "إشعارات الرحلات",
      titleEn: "Flight Alerts",
      descAr: "جميع إشعارات الرحلات (التحديثات والتذكيرات، تسجيل الوصول، حالة الرحلة، تنبيهات تغيير البوابة، إلخ.)",
      descEn: "All flight notifications (updates, reminders, check-in, flight status, gate changes, etc.)",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#DCE3EC] overflow-hidden">
      {/* Header */}
      <div className="p-6 md:p-8 border-b border-[#DCE3EC]">
        <h2 className="text-base md:text-lg font-extrabold text-[#163B45] mb-1">
          {lang === "ar" ? "الإشعارات" : "Notifications"}
        </h2>
        <p className="text-xs md:text-sm text-[#6F7E89]">
          {lang === "ar" ? "تفضيلات البريد الإلكتروني" : "Email Preferences"}
        </p>
        <p className="text-xs md:text-sm text-[#6F7E89] mt-1">
          {lang === "ar"
            ? `سنرسل رسائل البريد الإلكتروني المحددة إلى ${contact.email}.`
            : `We'll send the selected emails to ${contact.email}.`}
        </p>
      </div>

      {/* Preferences */}
      <div className="p-6 md:p-8 flex flex-col gap-5 border-b border-[#DCE3EC]">
        {items.map((item) => (
          <div
            key={item.key}
            className="flex items-start justify-between gap-4"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm md:text-base font-bold text-[#172B35] mb-1">
                {lang === "ar" ? item.titleAr : item.titleEn}
              </p>
              <p className="text-xs md:text-sm text-[#6F7E89] leading-relaxed">
                {lang === "ar" ? item.descAr : item.descEn}
              </p>
            </div>

            {/* Toggle Switch */}
            <button
              type="button"
              onClick={() => toggle(item.key)}
              className={`
                relative w-11 h-6 rounded-full transition-colors shrink-0 cursor-pointer
                ${prefs[item.key] ? "bg-[#0D154B]" : "bg-gray-300"}
              `}
              aria-label={lang === "ar" ? item.titleAr : item.titleEn}
            >
              <span
                className={`
                  absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow
                  transition-all duration-300
                  ${prefs[item.key] ? "start-6" : "start-1"}
                `}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Contact Info */}
      <div className="p-6 md:p-8 flex flex-col gap-4">
        {/* Email */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FAFCFE] border border-[#DCE3EC] flex items-center justify-center shrink-0">
            <FiMail className="text-[#0D154B] text-lg" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] md:text-xs text-[#6F7E89] mb-0.5">
              {lang === "ar" ? "البريد الإلكتروني" : "Email"}
            </p>
            <p className="text-sm md:text-base font-bold text-[#172B35] break-all">
              {contact.email}
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FAFCFE] border border-[#DCE3EC] flex items-center justify-center shrink-0">
            <FiPhone className="text-[#0D154B] text-lg" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] md:text-xs text-[#6F7E89] mb-0.5">
              {lang === "ar" ? "رسالة نصية (حالة الرحلة)" : "SMS (Flight Status)"}
            </p>
            <p className="text-sm md:text-base font-bold text-[#172B35] font-mono" dir="ltr">
              {contact.phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}