import type { Metadata } from "next";
import AdditionalServicesContent from "@/components/booking/services/AdditionalServicesContent";

export const metadata: Metadata = {
  title: "الخدمات الإضافية | Katra Go",
  description: "اختيار المقاعد والأمتعة والخدمات الإضافية للمسافرين",
};

export default function AdditionalServicesPage() {
  return <AdditionalServicesContent />;
}
