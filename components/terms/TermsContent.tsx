"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { FiAlertCircle, FiChevronLeft, FiMail, FiMapPin, FiPhone, FiUsers } from "react-icons/fi";
import { useApp } from "@/context/AppContext";

const copy = {
  ar: {
    home: "الرئيسية", offers: "العروض", terms: "الشروط والأحكام",
    title: "الشروط والأحكام الخاصة بالخصومات",
    intro: "تنطبق هذه الشروط على جميع الخصومات والعروض الترويجية المعلنة على الحجوزات المباشرة. آخر تحديث: [تاريخ التحديث].",
    notice: "الخصم المعروض غير مضمون إلا بعد إتمام الحجز والدفع. الأسعار المعلنة قابلة للتغيير حتى تأكيد الحجز.",
    types: "1. أنواع الخصومات",
    children: "خصم الأطفال والرُّضَّع",
    childrenBody: "يُمنح خصم بنسبة [نسبة الخصم] للأطفال من عمر [العمر] إلى [العمر] سنة، والرُّضَّع دون [العمر] سنتين بنسبة [نسبة الخصم] من قيمة التذكرة، بشرط السفر برفقة شخص بالغ.",
    students: "خصم الطلاب",
    studentsBody: "يحق للطلاب المسجلين في مؤسسة تعليمية معتمدة الحصول على خصم بنسبة [نسبة الخصم] على الدرجات المؤهلة، مع تقديم ما يثبت الدراسة عند الحجز وعند الصعود.",
    seniors: "خصم كبار السن",
    seniorsBody: "يُمنح المسافرون الذين بلغوا [العمر] سنة فأكثر خصمًا بنسبة [نسبة الخصم] على الرحلات المؤهلة.",
    eligibility: "2. شروط الاستحقاق",
    rules: [
      "يسري الخصم على الحجوزات المنفَّذة عبر القنوات الرسمية للشركة فقط.",
      "يجب أن تقع فترة الحجز وفترة السفر ضمن المدد المعلنة للعرض: من [تاريخ البداية] إلى [تاريخ النهاية].",
      "يسري الخصم على الدرجات والوجهات المحددة في صفحة العرض.",
      "يجب أن تتطابق بيانات المسافر مع المستندات الرسمية.",
    ],
    documents: "3. المستندات المطلوبة", studentLabel: "الطلاب",
    studentDocument: "بطاقة طالب سارية أو إثبات قيد حديث", seniorLabel: "كبار السن",
    seniorDocument: "الهوية المدنية أو جواز السفر",
    documentNote: "يحق للشركة رفض الصعود أو تحصيل فرق السعر عند عدم تقديم المستند المطلوب.",
    restrictions: "4. القيود والاستثناءات", cancellation: "5. القيود والإلغاء",
    cancellationBody: "تخضع التذاكر المخفَّضة لسياسة التعديل والإلغاء الخاصة بالفئة السعرية المحجوزة، وقد تُطبَّق رسوم تعديل أو إلغاء بقيمة [الرسوم]. وفي حال الإلغاء، يُسترد المبلغ وفق الشروط المعلنة لكل فئة.",
    channel: "قناة التواصل المعتمدة", available: "متاح الآن", contactLabel: "بيانات التواصل",
    question: "هل لديك استفسار عن الخصومات؟", help: "فريق خدمة العملاء جاهز لمساعدتك على الرقم", contact: "تواصل معنا",
  },
  en: {
    home: "Home", offers: "Offers", terms: "Terms & Conditions",
    title: "Discount Terms & Conditions",
    intro: "These terms apply to all advertised discounts and promotional offers on direct bookings. Last updated: [update date].",
    notice: "The advertised discount is only guaranteed after booking and payment are completed. Prices may change until the booking is confirmed.",
    types: "1. Types of discounts", children: "Child and infant discount",
    childrenBody: "Children aged [age] to [age] years and infants under [age] years receive a [discount percentage] discount on the ticket price, provided they travel with an adult.",
    students: "Student discount",
    studentsBody: "Students enrolled at an accredited educational institution can receive a [discount percentage] discount on eligible fares. Proof of enrollment is required at booking and boarding.",
    seniors: "Senior discount",
    seniorsBody: "Travelers aged [age] years and above receive a [discount percentage] discount on eligible flights.",
    eligibility: "2. Eligibility requirements",
    rules: [
      "The discount applies only to bookings made through the company’s official channels.",
      "Booking and travel must fall within the advertised offer period: from [start date] to [end date].",
      "The discount applies to the fares and destinations specified on the offer page.",
      "Passenger details must match official documents.",
    ],
    documents: "3. Required documents", studentLabel: "Students",
    studentDocument: "A valid student card or recent proof of enrollment", seniorLabel: "Seniors",
    seniorDocument: "Civil ID or passport",
    documentNote: "The company may deny boarding or collect the fare difference if the required document is not provided.",
    restrictions: "4. Restrictions and exceptions", cancellation: "5. Changes and cancellation",
    cancellationBody: "Discounted tickets are subject to the change and cancellation policy of the booked fare. Change or cancellation fees of [fees] may apply. Refunds follow the published terms for each fare.",
    channel: "Official contact channel", available: "Available now", contactLabel: "Contact details",
    question: "Have a question about discounts?", help: "Our customer service team is ready to help at", contact: "Contact us",
  },
};

function TermsSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl bg-white px-5 py-6 sm:px-8 sm:py-7">
      <h2 className="mb-7 text-xl font-bold text-[#172033] sm:text-2xl">{title}</h2>
      {children}
    </section>
  );
}

export default function TermsContent() {
  const { lang, dir } = useApp();
  const t = copy[lang];
  const discounts = [
    { title: t.children, body: t.childrenBody },
    { title: t.students, body: t.studentsBody },
    { title: t.seniors, body: t.seniorsBody },
    { title: t.children, body: t.childrenBody },
  ];
  const contacts = [
    { icon: FiUsers, value: "@kataraGo" },
    { icon: FiMapPin, value: "Kuwait – KD City" },
    { icon: FiMail, value: "info@gmail.com", href: "mailto:info@gmail.com" },
    { icon: FiPhone, value: "+965 9499 0661", href: "tel:+96594990661" },
  ];
  const rules = (
    <ul className="list-disc space-y-4 border-b border-[#cecece] ps-5 pb-6 text-base leading-8 text-[#59677e] marker:text-[#344257]">
      {t.rules.map((rule) => <li key={rule}>{rule}</li>)}
    </ul>
  );

  return (
    <main dir={dir} className="bg-[#fcfcfc] pb-9 sm:pb-10">
      <div className="bg-white py-9 sm:py-14">
        <header className="mx-auto w-[calc(100%-2rem)] max-w-7xl rounded-3xl bg-[#232957] px-5 py-7 sm:px-8 sm:py-8">
          <nav aria-label={lang === "ar" ? "مسار التنقل" : "Breadcrumb"} className="mb-5 flex flex-wrap items-center gap-2 text-sm text-[#aeb4cf]">
            <Link href="/" className="hover:text-white">{t.home}</Link>
            <FiChevronLeft aria-hidden className="size-3 rtl:rotate-0 ltr:rotate-180" />
            <Link href="/#offers" className="hover:text-white">{t.offers}</Link>
            <FiChevronLeft aria-hidden className="size-3 rtl:rotate-0 ltr:rotate-180" />
            <span aria-current="page" className="text-[#d0d3e3]">{t.terms}</span>
          </nav>
          <h1 className="text-2xl font-extrabold leading-relaxed text-white sm:text-4xl lg:text-[40px]">{t.title}</h1>
          <p className="mt-3 text-base leading-8 text-[#c1c5d9] sm:text-lg">{t.intro}</p>
        </header>
      </div>

      <div className="mx-auto mt-8 w-[calc(100%-2rem)] max-w-7xl sm:mt-12">
        <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-9">
          <div className="min-w-0 space-y-6">
            <div role="note" className="flex items-start gap-4 rounded-[20px] border border-[#ef8b00] bg-[#fffbed] px-5 py-5 text-base font-medium leading-8 text-[#924513] sm:items-center sm:px-7">
              <FiAlertCircle aria-hidden className="mt-1 size-5 shrink-0 text-[#df7e00] sm:mt-0" />
              <p>{t.notice}</p>
            </div>

            <TermsSection title={t.types}>
              <div className="space-y-7">
                {discounts.map((discount, index) => (
                  <div key={index} className="border-b border-[#cecece] pb-4">
                    <h3 className="mb-3 text-lg font-bold text-[#263144]">{discount.title}</h3>
                    <p className="text-base leading-8 text-[#59677e]">{discount.body}</p>
                  </div>
                ))}
              </div>
            </TermsSection>

            <TermsSection title={t.eligibility}>{rules}</TermsSection>

            <TermsSection title={t.documents}>
              <div className="grid gap-5 sm:grid-cols-2 sm:gap-x-12">
                {[t.studentLabel, t.studentLabel, t.seniorLabel].map((label, index) => (
                  <div key={index} className={`rounded-xl border border-[#aaa] px-4 py-4 text-center ${index === 2 ? "sm:col-span-2" : ""}`}>
                    <h3 className="mb-1 text-base font-bold text-[#263144]">{label}</h3>
                    <p className="text-sm leading-7 text-[#7c8da7]">{index === 2 ? t.seniorDocument : t.studentDocument}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-center text-sm leading-7 text-[#7c8da7]">{t.documentNote}</p>
            </TermsSection>

            <TermsSection title={t.restrictions}>{rules}</TermsSection>
            <TermsSection title={t.cancellation}>
              <p className="border-b border-[#cecece] pb-6 text-base leading-8 text-[#59677e]">{t.cancellationBody}</p>
            </TermsSection>
          </div>

          <aside aria-label={t.contactLabel} className="rounded-2xl border-s-4 border-[#171c56] bg-white px-6 py-7 shadow-[0_12px_24px_#00000008] lg:row-start-auto">
            <div className="space-y-8">
              {contacts.map(({ icon: Icon, value, href }, index) => (
                <div key={value} className="flex items-center gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#f4f4f7] text-[#171c56]"><Icon aria-hidden className="size-5" /></span>
                  {href ? <a href={href} dir="ltr" className="min-w-0 break-words text-base font-medium text-[#43516a] hover:underline">{value}</a> : <span dir="ltr" className={index === 0 ? "text-2xl font-bold tracking-tight text-[#171c56]" : "text-base text-[#263144]"}>{value}</span>}
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#eef0f5] pt-6">
              <span className="text-xs text-[#94a3bb]">{t.channel}</span>
              <span className="rounded-full border border-[#b5f5da] bg-[#effdf7] px-2.5 py-1 text-xs text-[#159b78]">{t.available}</span>
            </div>
          </aside>
        </div>

        <section className="mt-9 flex flex-col items-start justify-between gap-6 rounded-2xl bg-[#232957] px-6 py-7 shadow-md sm:flex-row sm:items-center sm:px-8 sm:py-8">
          <div>
            <h2 className="text-xl font-bold text-white sm:text-[28px]">{t.question}</h2>
            <p className="mt-2 text-base leading-8 text-[#c1c5d9]">{t.help} <a href="tel:+96594990661" dir="ltr" className="inline-block hover:underline">+965 9499 0661</a>.</p>
          </div>
          <a href="tel:+96594990661" className="inline-flex min-h-12 w-full shrink-0 items-center justify-center rounded-lg bg-white px-10 py-2 text-xl font-bold text-[#232957] transition hover:bg-[#e7e9f2] sm:w-auto">{t.contact}</a>
        </section>
      </div>
    </main>
  );
}
