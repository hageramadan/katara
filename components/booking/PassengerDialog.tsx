"use client";

import { useEffect, useRef, type ReactNode, type MouseEvent } from "react";
import { FiX } from "react-icons/fi";
import { useApp } from "@/context/AppContext";

type PassengerDialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  titleId: string;
  descriptionId?: string;
  children: ReactNode;
};

export default function PassengerDialog({
  open,
  onClose,
  title,
  titleId,
  descriptionId,
  children
}: PassengerDialogProps) {
  const { lang, dir } = useApp();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const outside = event.clientX < bounds.left
      || event.clientX > bounds.right
      || event.clientY < bounds.top
      || event.clientY > bounds.bottom;

    if (outside) onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      dir={dir}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-xl border-0 bg-white p-0 text-primary shadow-xl backdrop:bg-[var(--color-primary)]/15"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={handleBackdropClick}
    >
      <div className="px-4 pb-3 sm:px-6">
        <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-neutral-200 bg-white py-5">
          <h2
            id={titleId}
            className="text-lg font-bold text-neutral-950 sm:text-xl"
          >
            {title}
          </h2>
          <button
            type="button"
            aria-label={lang === "ar" ? "إغلاق" : "Close"}
            onClick={onClose}
            className="grid size-11 shrink-0 place-items-center rounded-full text-neutral-700 transition hover:bg-[var(--color-primary-50)] focus-visible:outline-2 focus-visible:outline-[var(--color-primary)]"
          >
            <FiX className="text-2xl" />
          </button>
        </header>
        {children}
      </div>
    </dialog>
  );
}
