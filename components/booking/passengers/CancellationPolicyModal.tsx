"use client";

import { useApp } from "@/context/AppContext";
import PassengerDialog from "../PassengerDialog";

type CancellationPolicyModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function CancellationPolicyModal({ open, onClose }: CancellationPolicyModalProps) {
  const { lang } = useApp();

  return (
    <PassengerDialog
      open={open}
      onClose={onClose}
      title={lang === "ar" ? "سياسة الإلغاء" : "Cancellation policy"}
      titleId="cancellation-policy-title"
      descriptionId="cancellation-policy-description"
    >
      <p
        id="cancellation-policy-description"
        className="py-6 text-start text-sm leading-loose text-neutral-600 sm:text-base sm:leading-loose"
      >
        {lang === "ar"
          ? "فى حالة الإلغاء سيتم تطبيق الرسوم التالية: غير قابل للاسترداد ابتداءً من الاثنين، ٢٠ أكتوبر ٢٠٢٥ بالإضافة إلى أن النفقات الإدارية الخاصة بالتعديل أو الإلغاء ستكون ج.م.‏664.81 للراكب الواحد."
          : "In the event of cancellation, the following charges will apply: non-refundable from Monday, 20 October 2025. In addition, administrative fees for changes or cancellations will be EGP 664.81 per passenger."}
      </p>
    </PassengerDialog>
  );
}
