export type SettingsTab = "security" | "notifications" | "account";

export type NotificationPreferences = {
  travelTips: boolean;
  specialOffers: boolean;
  flightAlerts: boolean;
};

export type ContactSettings = {
  email: string;
  phone: string;
};