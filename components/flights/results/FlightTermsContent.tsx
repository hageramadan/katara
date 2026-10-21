"use client";

import { FiChevronUp, FiInfo } from "react-icons/fi";
import type { FlightResult } from "@/lib/flights/types";
import type { TermsTab } from "./FlightMoreOptionsContent";

export default function FlightTermsContent({ flight, ar, termsTab, onTermsTabChange }: { flight: FlightResult; ar: boolean; termsTab: TermsTab; onTermsTabChange: (tab: TermsTab) => void }) {
  const setTermsTab = onTermsTabChange;

  return (
    <div dir={ar ? "rtl" : "ltr"}>
      <div className="mx-auto mb-3 grid max-w-2xl grid-cols-2 gap-3">
        {([
          { key: "fees", ar: "الرسوم والإلغاء", en: "Fees & cancellation" },
          { key: "conditions", ar: "الشروط والأحكام", en: "Terms & conditions" },
        ] as const).map((tab) => {
          const selected = termsTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              aria-pressed={selected}
              onClick={() => setTermsTab(tab.key)}
              className={`rounded-md border px-3 py-2 text-xs font-semibold transition ${selected ? "border-[#252D62] bg-[#252D62] text-white" : "border-[#AAB5D0] bg-[#EFF4FB] text-[#454B56]"}`}
            >
              {ar ? tab.ar : tab.en}
            </button>
          );
        })}
      </div>

      {termsTab === "fees" ? (
        <div className="space-y-3 rounded-lg bg-white p-3 sm:p-4">
          <section>
            <div className="flex items-center justify-between rounded-md bg-[#252D62] px-3 py-2 text-sm font-bold text-white">
              <span>{ar ? "السعر الأساسي والتكاليف" : "Base fare and costs"}</span>
              <FiChevronUp aria-hidden="true" />
            </div>

            {/* Header row: Item first, then Amount */}
            <div className="flex justify-between px-5 py-2 text-xs font-bold text-[#131A50]">
              <span>{ar ? "البند" : "Item"}</span>
              <span>{ar ? "المبلغ" : "Amount"}</span>
            </div>

            {/* Total row: label first, then price */}
            <div className="flex items-center justify-between border-b border-[#EEF0F3] px-5 py-2 text-xs font-bold text-[#131A50]">
              <span>{ar ? "الإجمالي" : "Total"}</span>
              <p>{flight.price.toFixed(2)} KWD</p>
            </div>

            {/* Breakdown rows: label first, then amount */}
            <div className="space-y-0.5 px-5 py-2 text-xs font-semibold text-[#777]">
              {[
                [ar ? "تكلفة التذكرة" : "Ticket fare", "50.00 KWD"],
                [ar ? "مصاريف الإلغاء" : "Cancellation fee", "20.00 KWD"],
                [ar ? "مصاريف الخدمة" : "Service fee", "10.00 KWD"],
                [ar ? "المبلغ المسترجع" : "Refund amount", "120.00 KWD"],
              ].map(([label, amount]) => (
                <div key={label} className="flex justify-between py-2">
                  <span>{label}</span>
                  <p>{amount}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#EEF0F3] px-2 py-3 text-[11px]">
              <button type="button" onClick={() => setTermsTab("conditions")} className="text-[#26346F] underline">
                {ar ? "متابعة قواعد وأحكام الأسعار" : "Continue to fare rules and terms"}
              </button>
              <span className="flex items-center gap-1 text-[#555]">
                <FiInfo aria-hidden="true" />
                {ar ? "السعر أدناه هو المبلغ الواحد" : "Price below is per person"}
              </span>
            </div>
          </section>

          {[
            { title: ar ? "رسوم التغيير" : "Change fees", before: "25.00 KWD", after: "35.00 KWD" },
            { title: ar ? "رسوم الإلغاء" : "Cancellation fees", before: "20.00 KWD", after: "30.00 KWD" },
          ].map((section) => (
            <section key={section.title}>
              <div className="flex items-center justify-between rounded-md bg-[#252D62] px-3 py-2 text-sm font-bold text-white">
                <span>{section.title}</span>
                <FiChevronUp aria-hidden="true" />
              </div>
              <div className="overflow-hidden rounded-b-md border border-t-0 border-[#E0E3E8] bg-white text-xs">
                {/* Label first, then price */}
                <div className="flex items-center justify-between border-b border-[#E0E3E8] px-3 py-3">
                  <span className="font-semibold text-[#252D62]">
                    {ar ? "قبل موعد المغادرة" : "Before departure"}
                    <small className="block font-normal">{ar ? "(24 ساعة حتى 365 يوم)" : "(24 hours to 365 days)"}</small>
                  </span>
                  <p className="font-bold text-[#222]">{section.before}</p>
                </div>
                <div className="flex items-center justify-between px-3 py-3">
                  <span className="font-semibold text-[#252D62]">
                    {ar ? "بعد موعد المغادرة" : "After departure"}
                    <small className="block font-normal">{ar ? "(0 ساعة حتى 365 يوم)" : "(0 hours to 365 days)"}</small>
                  </span>
                  <p className="font-bold text-[#222]">{section.after}</p>
                </div>
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div
          id="fare-rules"
          className={`space-y-4 rounded-lg border border-[#E7E9ED] bg-white p-4 ${ar ? "text-right" : "text-left"} text-xs leading-6 text-[#666] sm:p-5`}
        >
          {[
            { title: ar ? "الإلغاءات" : "Cancellations", items: ["في أي وقت:", "يتم خصم 2000 جنيه مصري عند الإلغاء/استرداد التذكرة.", "يتم إلغاء الرسوم في حالة وفاة الراكب أو أحد أفراد عائلته.", "يتم خصم 2500 جنيه مصري في حالة عدم الحضور (No-Show)."] },
            { title: ar ? "التعديلات" : "Changes", items: ["يمكن إجراء تعديل واحد مجاني على الحجز.", "يتم فرض رسوم عند طلب تعديل إضافي.", "يجب أن يتم طلب التعديل قبل 48 ساعة من موعد الرحلة."] },
            { title: ar ? "الرسوم الإضافية" : "Additional fees", items: ["تُطبق رسوم إضافية على الأمتعة الزائدة.", "الأمتعة التي تتجاوز 23 كجم تخضع لرسوم إضافية.", "يجب حجز المقاعد مسبقًا حسب التوفر."] },
            { title: ar ? "تأمين السفر" : "Travel insurance", items: ["ينصح بالحصول على تأمين سفر لحماية نفسك من أي طارئ.", "يشمل التأمين تكاليف الإلغاء والتأخير والأمتعة المفقودة."] },
            { title: ar ? "تعديل الحجز" : "Booking changes", items: ["يمكن تقديم طلب التعديل عبر خدمة العملاء.", "تُطبق الرسوم وفقًا لسياسة شركة الطيران.", "يجب تقديم طلب التعديل قبل موعد الرحلة بمدة كافية."] },
          ].map((group) => (
            <section key={group.title}>
              <h3 className="mb-1 text-base font-extrabold text-[#222]">{group.title}</h3>
              <ul className="list-disc space-y-0.5 ps-5">
                {group.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
          ))}
          <button type="button" onClick={() => setTermsTab("fees")} className="text-[#26346F] underline">
            {ar ? "العودة إلى الرسوم والإلغاء" : "Back to fees and cancellation"}
          </button>
        </div>
      )}
    </div>
  );
}