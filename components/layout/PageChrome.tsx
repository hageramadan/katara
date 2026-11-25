"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LoginNavbar from "./LoginNavbar";

export default function PageChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/forgot-password") return (
    <div className="relative isolate flex min-h-svh flex-col bg-[url('/images/login/bg.jpg')] bg-cover bg-center">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-black/40 to-[#273C49]" />
      <LoginNavbar />
      {children}
    </div>
  );

  return <><Navbar />{children}{pathname !== "/signup" && <Footer />}</>;
}
