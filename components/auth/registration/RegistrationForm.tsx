"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { FaTelegramPlane } from "react-icons/fa";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import type { RegistrationType, RegistrationValues, RegistrationErrors, RegistrationSuccess } from "@/lib/auth/types";
import { useRegistrationFields } from "@/lib/auth/use-registration-fields";
import { registerAccount, RegistrationApiError } from "@/lib/auth/api";
import { buildRegistrationPayload, mapRegistrationErrors, validateRegistration } from "@/lib/auth/registration";
import FormHeader from "../common/FormHeader";
import InputField from "../common/InputField";
import PasswordField from "../common/PasswordField";
import CheckboxField from "../common/CheckboxField";
import PhoneInput from "../common/PhoneInput";
import RegistrationField from "./RegistrationField";

const titles: Record<RegistrationType, { ar: string; en: string }> = {
  member: { ar: "إنشاء حساب عضو", en: "Create Member Account" },
  agency_employee: { ar: "إنشاء حساب الوكيل", en: "Create Agent Account" },
  broker: { ar: "إنشاء حساب بروكر", en: "Create Broker Account" },
  travel_company: { ar: "إنشاء حساب شركة سياحة وسفر", en: "Create Travel Company Account" },
  company: { ar: "إنشاء حساب شركة", en: "Create Company Account" },
  third_party_partner: { ar: "إنشاء حساب شريك ثالث", en: "Create Third Partner Account" },
};

export default function RegistrationForm({ type }: { type: RegistrationType }) {
  const { lang, country } = useApp();
  const { setAuthenticatedUser } = useAuth();
  const { fields, status, retry } = useRegistrationFields(type, lang);
  const [values, setValues] = useState<RegistrationValues>({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const submitLock = useRef(false);
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState<RegistrationSuccess | null>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const phoneCodeFields = new Map(fields
    .filter((field) => field.type === "tel")
    .flatMap((phone) => {
      const code = fields.find((field) => field.key === `${phone.key}_country_code`);
      return code ? [[phone.key, code] as const] : [];
    }));
  const groupedCodeKeys = new Set([...phoneCodeFields.values()].map((field) => field.key));
  const identityFields = ["gender", "first_name", "last_name"].flatMap((key) => {
    const field = fields.find((item) => item.key === key);
    return field ? [field] : [];
  });
  const groupIdentity = identityFields.length === 3;
  const formValues: RegistrationValues = { ...values };
  for (const code of phoneCodeFields.values()) {
    formValues[code.key] ??= country.dialCode;
  }
  const errorLabels: Record<string, string> = {
    email: lang === "ar" ? "البريد الإلكتروني" : "Email",
    password: lang === "ar" ? "كلمة المرور" : "Password",
    password_confirmation: lang === "ar" ? "تأكيد كلمة المرور" : "Confirm Password",
    terms: lang === "ar" ? "الشروط والأحكام" : "Terms",
  };

  function clearAll() {
    setValues({});
    setEmail("");
    setPassword("");
    setConfirmation("");
    setAgreed(false);
    setErrors({});
    setMessage("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitLock.current || status !== "ready" || success) return;
    const accountEmail = fields.some((field) => field.key === "email") ? String(formValues.email ?? "") : email;
    const validation = validateRegistration(fields, formValues, accountEmail, password, confirmation, agreed, lang);
    setErrors(validation);
    setMessage("");
    if (Object.keys(validation).length) {
      requestAnimationFrame(() => feedbackRef.current?.focus());
      return;
    }
    const payload = buildRegistrationPayload(type, accountEmail, password, fields, formValues);
    submitLock.current = true;
    setSubmitting(true);
    try {
      const result = await registerAccount(payload, lang);
      setAuthenticatedUser(result.user);
      setPassword("");
      setConfirmation("");
      setSuccess(result);
    } catch (error) {
      if (error instanceof RegistrationApiError) {
        setErrors(mapRegistrationErrors(error.errors, payload, fields));
        setMessage(error.message);
      } else {
        setMessage(lang === "ar" ? "تعذر الاتصال. تأكدي من حالة حسابك قبل إعادة المحاولة." : "Connection failed. Check your account status before trying again.");
      }
      requestAnimationFrame(() => feedbackRef.current?.focus());
    } finally {
      submitLock.current = false;
      setSubmitting(false);
    }
  }

  if (success) return (
    <div role="status" className="rounded-xl border border-teal-200 bg-teal-50 p-6 text-[#163B45]">
      <h2 className="mb-2 text-xl font-bold">{lang === "ar" ? "تم إنشاء الحساب بنجاح" : "Account created successfully"}</h2>
      <p>{success.user.display_name}</p>
      <p className="mt-1 text-sm">{success.message}</p>
      <Link href="/" className="mt-5 inline-block rounded-full bg-[#00A8B5] px-6 py-3 text-sm font-bold text-white">{lang === "ar" ? "العودة للرئيسية" : "Go to home"}</Link>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5 md:gap-6" aria-busy={status === "loading" || submitting}>
      <FormHeader title={titles[type][lang]} onClear={submitting ? undefined : clearAll} />
      {(message || Object.keys(errors).length > 0) && (
        <div ref={feedbackRef} tabIndex={-1} role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 outline-none focus:ring-2 focus:ring-red-300">
          <p>{message || (lang === "ar" ? "راجعي البيانات التالية:" : "Please check the following:")}</p>
          {Object.entries(errors).map(([key, messages]) => (
            <p key={key} className="mt-1">
              {fields.find((field) => field.key === key)?.label ?? errorLabels[key] ?? key}: {messages.join(" ")}
            </p>
          ))}
        </div>
      )}
      {status === "loading" && (
        <div role="status" className="flex justify-center py-8">
          <span aria-hidden="true" className="size-9 animate-spin rounded-full border-4 border-[#00A8B5]/20 border-t-[#00A8B5] motion-reduce:animate-none" />
          <span className="sr-only">{lang === "ar" ? "جاري تحميل حقول التسجيل..." : "Loading registration fields..."}</span>
        </div>
      )}
      {status === "error" && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <p>{lang === "ar" ? "تعذر تحميل حقول التسجيل. حاولي مرة أخرى." : "Unable to load registration fields. Please try again."}</p>
          <button type="button" onClick={retry} className="mt-3 cursor-pointer font-semibold underline">{lang === "ar" ? "إعادة المحاولة" : "Try again"}</button>
        </div>
      )}
      {status === "ready" && (
        <fieldset disabled={submitting} className="flex min-w-0 flex-col gap-5 md:gap-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {fields.filter((field) => !groupedCodeKeys.has(field.key)).map((field) => {
              if (groupIdentity && field.key === "gender") return (
                <div key="identity" className="grid min-w-0 grid-cols-1 gap-4 md:col-span-2 lg:grid-cols-3">
                  {identityFields.map((identityField) => (
                    <RegistrationField key={identityField.key} field={identityField} value={formValues[identityField.key]}
                      error={errors[identityField.key]?.join(" ")}
                      onChange={(value) => setValues((previous) => ({ ...previous, [identityField.key]: value }))} />
                  ))}
                </div>
              );
              if (groupIdentity && (field.key === "first_name" || field.key === "last_name")) return null;
              const codeField = phoneCodeFields.get(field.key);
              if (codeField) return (
                <PhoneInput key={field.key} label={field.label} name={field.key}
                  required={field.is_required} value={String(formValues[field.key] ?? "")}
                  dialCode={String(formValues[codeField.key])} dialCodeName={codeField.key}
                  dialCodeLabel={codeField.label} dialCodeRequired={codeField.is_required}
                  error={errors[field.key]?.join(" ")} dialCodeError={errors[codeField.key]?.join(" ")}
                  validateLength={false}
                  onValueChange={(value) => setValues((previous) => ({ ...previous, [field.key]: value }))}
                  onDialCodeChange={(value) => setValues((previous) => ({ ...previous, [codeField.key]: value }))} />
              );
              return <RegistrationField key={field.key} field={field} value={formValues[field.key]}
                error={errors[field.key]?.join(" ")}
                onChange={(value) => setValues((previous) => ({ ...previous, [field.key]: value }))} />;
            })}
          </div>
          {/* Existing account controls stay separate from the API-defined profile fields. */}
          {!fields.some((field) => field.key === "email") && <InputField label={lang === "ar" ? "البريد الإلكتروني" : "Email"} type="email" required value={email} onChange={setEmail} placeholder="example@email.com" />}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <PasswordField label={lang === "ar" ? "كلمة المرور" : "Password"} required minLength={8}
              helper={lang === "ar" ? "8 أحرف أو أرقام على الأقل" : "At least 8 characters"}
              error={errors.password?.join(" ")} value={password} onChange={(value) => {
                setPassword(value);
                setErrors((previous) => {
                  const next = { ...previous };
                  delete next.password;
                  delete next.password_confirmation;
                  return next;
                });
              }} />
            <PasswordField label={lang === "ar" ? "تأكيد كلمة المرور" : "Confirm Password"} required value={confirmation}
              error={errors.password_confirmation?.join(" ")} onChange={(value) => {
                setConfirmation(value);
                setErrors((previous) => {
                  const next = { ...previous };
                  delete next.password_confirmation;
                  return next;
                });
              }} />
          </div>
          <CheckboxField checked={agreed} onChange={setAgreed} required />
          <div className="flex justify-end">
            <button type="submit" disabled={submitting} className="w-full cursor-pointer rounded-full bg-[#00A8B5] px-9 py-3 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-wait disabled:opacity-50 lg:w-fit">
              {submitting ? (lang === "ar" ? "جاري إنشاء الحساب..." : "Creating account...") : (lang === "ar" ? "إنشاء الحساب" : "Create Account")}
              <FaTelegramPlane aria-hidden="true" className="ms-2 inline-block size-5" />
            </button>
          </div>
        </fieldset>
      )}
    </form>
  );
}
