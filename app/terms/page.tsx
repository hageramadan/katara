import type { Metadata } from "next";
import TermsContent from "@/components/terms/TermsContent";

export const metadata: Metadata = {
  title: "الشروط والأحكام | Katara Go",
  description: "الشروط والأحكام الخاصة بالخصومات والعروض الترويجية والحجوزات المباشرة لدى كتارا جو.",
};

export default function TermsPage() {
  return <TermsContent />;
}
