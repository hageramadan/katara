import type { Metadata } from "next";
import localFont from "next/font/local";
import { AppProvider } from "@/context/AppContext";
import { AuthProvider } from "@/context/AuthContext";
import { NotificationsProvider } from "@/context/NotificationsContext";
import { BookingFlowProvider } from "@/context/BookingFlowContext";
import PageChrome from "@/components/layout/PageChrome";
import AppToaster from "@/components/ui/AppToaster";
import "./globals.css";

const notoKufi = localFont({
  src: "../public/fonts/NotoKufiArabic-Variable.ttf",
  weight: "100 900",
  style: "normal",
  variable: "--font-noto-kufi",
  display: "swap",
});

const inter = localFont({
  src: "../public/fonts/Inter-Variable.ttf",
  weight: "100 900",
  style: "normal",
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Katra Go - احجز رحلتك بسهولة",
  description: "منصتك الموثوقة لحجز الفنادق والطيران",
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${notoKufi.variable} ${inter.variable} font-arabic antialiased`}
      >

        <AppProvider>
          <AuthProvider>
            <NotificationsProvider>
            <AppToaster />
            <PageChrome><BookingFlowProvider>{children}</BookingFlowProvider></PageChrome>
            </NotificationsProvider>
          </AuthProvider>
        </AppProvider>
      </body>
    </html>
  );
}
