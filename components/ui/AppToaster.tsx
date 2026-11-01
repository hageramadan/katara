"use client";

import { Toaster } from "react-hot-toast";
import { useApp } from "@/context/AppContext";

export default function AppToaster() {
  const { dir } = useApp();

  return (
    <Toaster position="top-center" containerStyle={{ top: 80 }} toastOptions={{
      duration: 4000,
      style: {
        direction: dir,
        fontFamily: "inherit",
        color: "#0D154B",
        border: "1px solid #DCE3EC",
        borderRadius: "12px",
        padding: "14px 20px",
      },
      success: { iconTheme: { primary: "#00A8B5", secondary: "#FFFFFF" } },
    }} />
  );
}
