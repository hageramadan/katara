"use client";

import { useEffect, useId, useRef } from "react";
import { FiLogOut } from "react-icons/fi";
import { useApp } from "@/context/AppContext";

type LogoutDialogProps = {
  open: boolean;
  pending: boolean;
  error: string;
  onClose: () => void;
  onConfirm: () => void;
};

export default function LogoutDialog({ open, pending, error, onClose, onConfirm }: LogoutDialogProps) {
  const { lang, dir } = useApp();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    cancelRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      dir={dir}
      aria-labelledby={titleId}
      aria-busy={pending}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      className="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-sm rounded-2xl border-0 bg-white p-6 text-center text-[#0D154B] shadow-2xl backdrop:bg-[#07102F]/45 backdrop:backdrop-blur-sm"
    >
      <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-red-50 text-[#D1454A]">
        <FiLogOut className="text-2xl" />
      </div>
      <h2 id={titleId} className="text-lg font-bold">
        {lang === "ar" ? "هل تريد تسجيل الخروج؟" : "Do you want to log out?"}
      </h2>
      {error && <p role="alert" className="mt-3 text-sm text-[#D1454A]">{error}</p>}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <button type="button" disabled={pending} onClick={onConfirm} className="rounded-xl bg-[#D1454A] px-4 py-3 font-semibold text-white transition hover:bg-[#B9383D] disabled:cursor-wait disabled:opacity-60">
          {pending ? (lang === "ar" ? "جارٍ تسجيل الخروج..." : "Logging out...") : (lang === "ar" ? "نعم" : "Yes")}
        </button>
        <button ref={cancelRef} type="button" disabled={pending} onClick={onClose} className="rounded-xl border border-[#DCE3EC] px-4 py-3 font-semibold transition hover:bg-gray-50 disabled:opacity-60">
          {lang === "ar" ? "لا" : "No"}
        </button>
      </div>
    </dialog>
  );
}
