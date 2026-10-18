"use client";
import { useState, useMemo } from "react";
import { useApp } from "@/context/AppContext";
import { FiCheck, FiCircle, FiLock } from "react-icons/fi";
import FloatingLabelInput from "@/components/auth/common/FloatingLabelInput";

export default function PasswordSection() {
  const { lang } = useApp();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ✅ قواعد التحقق
  const checks = useMemo(
    () => ({
      length: newPassword.length >= 10,
      uppercase: /[A-Z]/.test(newPassword),
      matches: newPassword.length > 0 && newPassword === confirmPassword,
    }),
    [newPassword, confirmPassword]
  );

  const canSubmit =
    oldPassword.length > 0 &&
    checks.length &&
    checks.uppercase &&
    checks.matches;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ oldPassword, newPassword });
  };

  return (
    <div className="bg-white rounded-2xl border border-[#DCE3EC] overflow-hidden">
      {/* Header */}
      <div className="p-6 md:p-8 border-b border-[#DCE3EC]">
        <h2 className="text-base md:text-lg font-extrabold text-[#163B45] mb-1">
          {lang === "ar" ? "أمان الحساب" : "Account Security"}
        </h2>
        <p className="text-xs md:text-sm text-[#6F7E89]">
          {lang === "ar" ? "تغيير كلمة المرور" : "Change Password"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-8 flex flex-col gap-5">
        {/* Section title */}
        <div>
          <h3 className="text-sm md:text-base font-bold text-[#172B35] mb-1">
            {lang === "ar" ? "تغيير كلمة المرور" : "Change Password"}
          </h3>
          <p className="text-xs md:text-sm text-[#6F7E89]">
            {lang === "ar"
              ? "إدارة حسابك على كتارا جو"
              : "Manage your Katra Go account"}
          </p>
        </div>

        {/* Old Password */}
        <FloatingLabelInput
          label={lang === "ar" ? "كلمة المرور القديمة" : "Old Password"}
          required
          type="password"
          value={oldPassword}
          onChange={setOldPassword}
        />

        {/* New Password */}
        <FloatingLabelInput
          label={lang === "ar" ? "كلمة المرور الجديدة" : "New Password"}
          required
          type="password"
          value={newPassword}
          onChange={setNewPassword}
        />

        {/* Confirm Password */}
        <FloatingLabelInput
          label={
            lang === "ar"
              ? "تأكيد كلمة المرور الجديدة"
              : "Confirm New Password"
          }
          required
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />

        {/* ==================== Password Requirements ==================== */}
        <div className="bg-[#FAFCFE] border border-[#DCE3EC] rounded-xl p-4">
          <p className="text-xs md:text-sm font-bold text-[#172B35] mb-3">
            {lang === "ar" ? "متطلبات كلمة المرور" : "Password Requirements"}
          </p>

          <ul className="flex flex-col gap-2.5">
            {/* Length */}
            <li className="flex items-center gap-2">
              <span
                className={`
                  w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition
                  ${checks.length ? "bg-[#16A34A] text-white" : "bg-gray-200 text-gray-400"}
                `}
              >
                {checks.length ? (
                  <FiCheck className="text-xs" strokeWidth={3} />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                )}
              </span>
              <span
                className={`text-xs md:text-sm flex-1 ${
                  checks.length ? "text-[#16A34A]" : "text-[#6F7E89]"
                }`}
              >
                {lang === "ar"
                  ? "تحتوي على 10 أحرف كحد أدنى."
                  : "At least 10 characters."}
              </span>
              <span className="text-[11px] md:text-xs font-mono text-[#6F7E89]">
                {Math.min(newPassword.length, 10)}/10
              </span>
            </li>

            {/* Uppercase */}
            <li className="flex items-center gap-2">
              <span
                className={`
                  w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition
                  ${checks.uppercase ? "bg-[#16A34A] text-white" : "bg-gray-200 text-gray-400"}
                `}
              >
                {checks.uppercase ? (
                  <FiCheck className="text-xs" strokeWidth={3} />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                )}
              </span>
              <span
                className={`text-xs md:text-sm flex-1 ${
                  checks.uppercase ? "text-[#16A34A]" : "text-[#6F7E89]"
                }`}
              >
                {lang === "ar"
                  ? "تحتوي على حرف كبير واحد على الأقل."
                  : "At least one uppercase letter."}
              </span>
              <span className="text-[11px] md:text-xs font-mono text-[#6F7E89]">
                {checks.uppercase ? "1" : "0"}/1
              </span>
            </li>
          </ul>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!canSubmit}
          className="
            w-full flex items-center justify-center gap-2
            bg-[#0D154B] text-white font-bold text-sm md:text-base
            py-3.5 rounded-full mt-2
            hover:opacity-90 active:scale-[0.99] transition
            disabled:opacity-40 disabled:cursor-not-allowed
          "
        >
          <FiLock className="text-base" />
          {lang === "ar" ? "تغيير كلمة المرور" : "Change Password"}
        </button>
      </form>
    </div>
  );
}