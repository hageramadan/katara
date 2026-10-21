"use client";
import { useEffect } from "react";
import { FiX } from "react-icons/fi";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: string;
};

export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
  maxWidth = "max-w-xl",
}: ModalProps) {
  // إغلاق بـ Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // منع scroll في الخلفية
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Content */}
      <div
        className={`
          relative w-full ${maxWidth}
          bg-white rounded-2xl shadow-2xl
          max-h-[90vh] overflow-y-auto
          animate-in fade-in zoom-in-95 duration-200
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ==================== Header (Centered) ==================== */}
        {(title || description) && (
          <div className="relative px-5 md:px-6 pt-6 ">
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 inset-e-4 w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-[#6F7E89] hover:text-[#D1454A] transition"
              aria-label="Close"
            >
              <FiX className="text-xl" />
            </button>

            <div className="text-start pe-8 ps-8">
              {title && (
                <h2 className="text-base md:text-lg lg:text-xl font-bold text-[#0D0D0D]">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-xs md:text-sm lg:text-base text-[#9CA3AF] leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Body */}
        <div className="px-5 md:px-6 py-3">{children}</div>
      </div>
    </div>
  );
}