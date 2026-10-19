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
  flightEmail: true,
  flightSms: true,
};

function NotificationToggle({
  enabled,
  label,
  onToggle,
}: {
  enabled: boolean;
  label: string;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      onClick={onToggle}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${enabled ? "bg-[#34C759]" : "bg-gray-300"}`}
    >
      <span
        className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white shadow transition-all duration-300 ${enabled ? "start-6" : "start-1"}`}
      />
    </button>
  );
}

export default function NotificationsSection({ contact }: NotificationsSectionProps) {
  const { lang } = useApp();
  const [prefs, setPrefs] = useState<NotificationPreferences>(initialPrefs);
  const toggle = (key: keyof NotificationPreferences) => {
    setPrefs((previous) => ({ ...previous, [key]: !previous[key] }));
  };

  const emailItems = [
    {
      key: "travelTips" as const,
      title: lang === "ar" ? "نصائح السفر" : "Travel tips",
      description: lang === "ar"
        ? "تحديث شهري حول أحدث نصائح السفر والحيل والاتجاهات والأدوات من كتارا جو."
        : "Monthly updates on the latest travel tips, tricks, trends, and tools from Katra Go.",
    },
    {
      key: "specialOffers" as const,
      title: lang === "ar" ? "عروض خاصة" : "Special offers",
      description: lang === "ar"
        ? "احصل على عروض وخصومات خاصة ومحدودة الوقت من شركائنا."
        : "Get special and limited-time offers from our partners.",
    },
  ];
  const flightTitle = lang === "ar" ? "إشعارات الرحلات" : "Flight notifications";

  return (
    <div className="overflow-hidden rounded-2xl border border-[#DCE3EC] bg-white">
      <header className="px-5 py-4 sm:px-6 md:px-8">
        <h2 className="mb-1 text-base font-bold text-[#0D0D0D] md:text-xl">
          {lang === "ar" ? "الإشعارات" : "Notifications"}
        </h2>
      </header>

      <section aria-labelledby="email-preferences-heading" className="flex flex-col gap-5 px-5 py-5 sm:px-6 md:px-8">
        <div>
          <h3 id="email-preferences-heading" className="text-sm font-bold text-[#172B35] md:text-base">
            {lang === "ar" ? "تفضيلات البريد الإلكتروني" : "Email preferences"}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-[#6F7E89] md:text-sm">
            {lang === "ar" ? "سنرسل رسائل البريد الإلكتروني المحددة إلى" : "We’ll send the selected emails to"}{" "}
            <span className="font-semibold text-[#172B35]" dir="ltr">{contact.email}</span>.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {emailItems.map((item) => (
            <div key={item.key} className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h4 className="mb-1 text-sm font-bold text-[#172B35] md:text-base">{item.title}</h4>
                <p className="text-xs leading-relaxed text-[#6F7E89] md:text-sm">{item.description}</p>
              </div>
              <NotificationToggle enabled={prefs[item.key]} label={item.title} onToggle={() => toggle(item.key)} />
            </div>
          ))}
        </div>
      </section>

      <div role="separator" className="mx-5 border-t border-[#DCE3EC] sm:mx-6 md:mx-8" />

      <section aria-labelledby="flight-notifications-heading" className="flex flex-col gap-5 px-5 py-5 sm:px-6 md:px-8">
        <div className="min-w-0">
          <h3 id="flight-notifications-heading" className="mb-1 text-sm font-bold text-[#172B35] md:text-base">{flightTitle}</h3>
          <p className="text-xs leading-relaxed text-[#6F7E89] md:text-sm">
            {lang === "ar"
              ? "جميع إشعارات الرحلات (التحديثات والتذكيرات، تسجيل الوصول، حالة الرحلة، تنبيهات تغيير البوابة، إلخ.)"
              : "All flight notifications (updates and reminders, check-in, flight status, gate change alerts, etc.)."}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <ContactRow
            icon={<FiMail />}
            label={lang === "ar" ? "البريد الإلكتروني" : "Email"}
            value={contact.email}
            lang={lang}
            enabled={prefs.flightEmail}
            onToggle={() => toggle("flightEmail")}
          />
          <ContactRow
            icon={<FiPhone />}
            label={lang === "ar" ? "رسالة نصية (حالة الرحلة)" : "Text message (flight status)"}
            value={contact.phone}
            dir="ltr"
            lang={lang}
            enabled={prefs.flightSms}
            onToggle={() => toggle("flightSms")}
          />
        </div>
      </section>
    </div>
  );
}

function ContactRow({
  icon,
  label,
  value,
  dir,
  lang,
  enabled,
  onToggle,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  dir?: "ltr" | "rtl";
  lang: "ar" | "en";
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#DCE3EC] bg-[#FAFCFE] text-lg text-[#0D154B]" aria-hidden="true">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="mb-0.5 text-[11px] text-[#6F7E89] md:text-xs">{label}</p>
        <p className={`break-all text-sm font-bold text-[#172B35] md:text-base ${lang === "ar" ? "text-right" : "text-left"}`} dir={dir}>{value}</p>
      </div>
      <NotificationToggle enabled={enabled} label={label} onToggle={onToggle} />
    </div>
  );
}
