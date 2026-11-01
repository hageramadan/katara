"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { loginAccount, LoginApiError } from "./api";
import { userTypeByRole, type AuthRoleKey, type RegistrationErrors } from "./types";

export function useLogin(language: "ar" | "en") {
  const router = useRouter();
  const { setAuthenticatedUser } = useAuth();
  const lock = useRef(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<RegistrationErrors>({});

  function clearErrors() {
    setMessage("");
    setErrors({});
  }

  async function submit(role: AuthRoleKey, email: string, password: string) {
    if (lock.current) return false;
    clearErrors();
    const validation: RegistrationErrors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) validation.email = [language === "ar" ? "أدخلي بريدًا إلكترونيًا صحيحًا." : "Enter a valid email address."];
    if (!password) validation.password = [language === "ar" ? "أدخلي كلمة المرور." : "Enter your password."];
    if (Object.keys(validation).length) {
      setErrors(validation);
      return false;
    }
    lock.current = true;
    setSubmitting(true);
    try {
      const result = await loginAccount({ email: email.trim(), password, user_type: userTypeByRole[role] }, language);
      setAuthenticatedUser(result.user);
      toast.success(language === "ar" ? "تم تسجيل الدخول بنجاح" : "Signed in successfully", { id: "login-success" });
      router.replace("/profile");
      router.refresh();
      return true;
    } catch (error) {
      if (error instanceof LoginApiError) {
        setMessage(error.message);
        setErrors(error.errors);
      } else {
        setMessage(language === "ar" ? "تعذر الاتصال. حاولي مرة أخرى." : "Connection failed. Please try again.");
      }
      lock.current = false;
      setSubmitting(false);
      return false;
    }
  }

  return { submitting, message, errors, submit, clearErrors };
}
