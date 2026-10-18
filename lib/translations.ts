import ar from "@/messages/ar.json";
import en from "@/messages/en.json";

export type Lang = "ar" | "en";

export const translations = { ar, en };

export type Translation = typeof ar;