"use client";
import { ContactSettings } from "@/lib/settings/types";
import PasswordSection from "./PasswordSection";
import NotificationsSection from "./NotificationsSection";
import AccountSection from "./AccountSection";

const contact: ContactSettings = {
  email: "mo3tzelrawy111@gmail.com",
  phone: "+20 1068622014",
};

export default function SettingsContent() {
  return (
    <div className="flex flex-col gap-6">
      <PasswordSection />
      <NotificationsSection contact={contact} />
      <AccountSection />
    </div>
  );
}