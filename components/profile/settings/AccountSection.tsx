"use client";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { FiTrash2, FiAlertTriangle } from "react-icons/fi";
import Modal from "@/components/ui/Modal";

export default function AccountSection() {
  const { lang } = useApp();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDelete = () => {
    console.log("Delete account");
    setConfirmOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-[#DCE3EC] overflow-hidden">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-[#DCE3EC]">
          <h2 className="text-base md:text-lg font-extrabold text-[#163B45] mb-1">
            {lang === "ar" ? "الحساب" : "Account"}
          </h2>
        </div>

        {/* Danger Zone */}
        <div className="p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm md:text-base font-bold text-[#D1454A] mb-1">
                {lang === "ar" ? "حذف الحساب" : "Delete Account"}
              </p>
              <p className="text-xs md:text-sm text-[#6F7E89]">
                {lang === "ar"
                  ? "سيؤدي هذا الإجراء إلى حذف حسابك نهائيًا."
                  : "This action will permanently delete your account."}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setConfirmOpen(true)}
              className="
                inline-flex items-center justify-center gap-2 shrink-0
                border-2 border-[#D1454A] text-[#D1454A] font-bold
                text-sm md:text-base px-6 py-3 rounded-full
                hover:bg-[#D1454A] hover:text-white transition
              "
            >
              <FiTrash2 className="text-base" />
              {lang === "ar" ? "حذف" : "Delete"}
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title={lang === "ar" ? "حذف الحساب" : "Delete Account"}
      >
        <div className="flex flex-col gap-5">
          <div className="flex items-start gap-3 p-4 bg-[#D1454A]/5 border border-[#D1454A]/20 rounded-xl">
            <FiAlertTriangle className="text-[#D1454A] text-xl shrink-0 mt-0.5" />
            <p className="text-xs md:text-sm text-[#6F7E89] leading-relaxed">
              {lang === "ar"
                ? "سيؤدي هذا الإجراء إلى حذف حسابك نهائيًا ولا يمكن التراجع عنه."
                : "This action will permanently delete your account and cannot be undone."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => setConfirmOpen(false)}
              className="flex-1 bg-gray-100 text-[#172B35] font-bold text-sm md:text-base py-3 rounded-full hover:bg-gray-200 transition"
            >
              {lang === "ar" ? "إلغاء" : "Cancel"}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="flex-1 bg-[#D1454A] text-white font-bold text-sm md:text-base py-3 rounded-full hover:opacity-90 transition"
            >
              {lang === "ar" ? "نعم، احذف" : "Yes, Delete"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}