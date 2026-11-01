import type { Metadata } from "next";
import { Noto_Kufi_Arabic, Inter } from "next/font/google";
import { AppProvider } from "@/context/AppContext";
import { AuthProvider } from "@/context/AuthContext";
import { BookingFlowProvider } from "@/context/BookingFlowContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AppToaster from "@/components/ui/AppToaster";
import "./globals.css";

const notoKufi = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-noto-kufi",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
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
            <AppToaster />
            <Navbar />
            <BookingFlowProvider>{children}</BookingFlowProvider>
            <Footer />
          </AuthProvider>
        </AppProvider>
      </body>
    </html>
  );
}
