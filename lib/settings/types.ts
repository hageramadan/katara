export type SettingsTab = "security" | "notifications" | "account";

export type NotificationPreferences = {
  travelTips: boolean;
  specialOffers: boolean;
  flightEmail: boolean;
  flightSms: boolean;
};

export type ContactSettings = {
  email: string;
  phone: string;
};
