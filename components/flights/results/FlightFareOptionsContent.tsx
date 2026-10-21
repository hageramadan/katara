"use client";

import Image from "next/image";
import { FaCheck, FaPlane, FaSuitcase } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";

export const fares = [
   {
    key: "basic",
    ar: "Basic",
    en: "Basic",
    code: "YBASIC",
    price: 35,
    seatAr: "مقعد عادي مجاني",
    seatEn: "Free standard seat",
    baggageAr: ["حقيبة كابينة 7 KG", "حقيبة مسجلة 23 KG", "فئة الحجز E · 9 مقاعد متاحة"],
    baggageEn: ["7 KG cabin bag", "23 KG checked bag", "Booking class E · 9 seats available"],
    includedAr: ["وجبة ومشروب", "5% أميال متراكمة", "حقيبة يد"],
    includedEn: ["Meal and drink", "5% miles accrual", "Hand baggage"],
    extrasAr: ["اختيار مقعد عادي", "اختيار مقعد مفضل", "مقعد بجواره فاضي", "رسوم وزن زائد"],
    extrasEn: ["Standard seat selection", "Preferred seat selection", "Empty adjacent seat", "Excess baggage fee"],
  },
   {
    key: "value",
    ar: "Value",
    en: "Value",
    code: "YVALUE",
    price: 45,
    seatAr: "مقعد عادي مجاني",
    seatEn: "Free standard seat",
    baggageAr: ["حقيبة كابينة 7 KG", "حقيبة مسجلة 40 KG", "فئة الحجز E · 9 مقاعد متاحة"],
    baggageEn: ["7 KG cabin bag", "40 KG checked bag", "Booking class E · 9 seats available"],
    includedAr: ["وجبة ومشروب", "35% أميال متراكمة", "حقيبة يد", "حقيبة مسجلة حتى 40 كجم"],
    includedEn: ["Meal and drink", "35% miles accrual", "Hand baggage", "Checked baggage up to 40 kg"],
    extrasAr: ["اختيار مقعد مفضل", "مقعد بجواره فاضي"],
    extrasEn: ["Preferred seat selection", "Empty adjacent seat"],
  },
  {
    key: "comfort",
    ar: "Comfort",
    en: "Comfort",
    code: "YCOMFORT",
    price: 50,
    seatAr: "مقعد مفضل",
    seatEn: "Preferred seat",
    baggageAr: ["حقيبة كابينة 7 KG", "حقيبة مسجلة 45 KG", "فئة الحجز E · 9 مقاعد متاحة"],
    baggageEn: ["7 KG cabin bag", "45 KG checked bag", "Booking class E · 9 seats available"],
    includedAr: ["وجبة ومشروب", "75% أميال متراكمة", "حقيبة يد", "حقيبة مسجلة حتى 45 كجم"],
    includedEn: ["Meal and drink", "75% miles accrual", "Hand baggage", "Checked baggage up to 45 kg"],
    extrasAr: ["مقعد بجواره فاضي"],
    extrasEn: ["Empty adjacent seat"],
  },
 
 
] as const;

export type FareKey = (typeof fares)[number]["key"];

export function getFarePrice(key: FareKey) {
  return fares.find((fare) => fare.key === key)?.price ?? fares[2].price;
}

export default function FlightFareOptionsContent({ ar, selectedFareKey, onFareChange }: { ar: boolean; selectedFareKey: FareKey; onFareChange: (key: FareKey) => void }) {
  const setSelectedFareKey = onFareChange;
  return (
<div className="space-y-3">
              <div className="grid grid-cols-1 items-center gap-3 rounded-xl border border-[#E2E6EC] bg-white p-3 sm:grid-cols-[1fr_auto] sm:p-4">
                <div className="flex min-w-0 items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <div className="flex h-6 w-18 shrink-0 items-center justify-center ">
                      <Image src="/images/more/more.png" alt="" width={800} height={400} className=" w-18 h-6" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-extrabold text-[#263142] sm:text-base">{ar ? "الخطوط السعودية" : "Saudia Airlines"}</p>
                      <p className="mt-1 text-[11px] font-semibold text-[#77808D]" dir="ltr">SV-311 · Airbus A320</p>
                    </div>
                  </div>
           
                </div>
                <div dir="ltr" className="flex items-center justify-between gap-3 rounded-lg bg-[#F8F9FB] px-3 py-2 sm:min-w-[230px]">
                  <div className="text-center">
                    <p className="text-base font-extrabold text-[#263142]">14:20</p>
                    <p className="text-[10px] font-semibold text-[#77808D]">CAI</p>
                  </div>
                  <div className="flex flex-1 flex-col items-center text-[#77808D]">
                   
                    <span className="flex w-full items-center gap-1"><span className="h-px flex-1 bg-[#C9D0DA]" /><FaPlane className="text-[#16865C]" /><span className="h-px flex-1 bg-[#C9D0DA]" /></span>
                  </div>
                  <div className="text-center">
                    <p className="text-base font-extrabold text-[#263142]">17:35</p>
                    <p className="text-[10px] font-semibold text-[#77808D]">JED</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2 rounded-lg border border-[#F4D58A] bg-[#FFF8E7] px-3 py-2.5 text-[11px] leading-5 text-[#8A681A]">
                <span aria-hidden="true">⚠</span>
                <p>{ar ? "قد لا تكون كل الخدمات متاحة حسب نوع الرحلة (مشتركة أو عبر أكثر من شركة طيران)." : "Available services may vary by fare family or airline."}</p>
              </div>

              <div className="grid grid-cols-1 gap-2.5 md:grid-cols-3">
                {fares.map((fare) => {
                  const active = selectedFareKey === fare.key;
                  const baggageItems = ar ? fare.baggageAr : fare.baggageEn;
                  const includedItems = ar ? fare.includedAr : fare.includedEn;
                  const extraItems = ar ? fare.extrasAr : fare.extrasEn;
                  return (
                    <button
                      key={fare.key}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setSelectedFareKey(fare.key)}
                      className={`rounded-xl border bg-white p-3 text-start transition sm:p-4 ${active ? "border-[#0D154B] ring-1 ring-[#0D154B]" : "border-[#DCE2EA] hover:border-[#AAB4C2]"}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-extrabold text-[#0D154B]">{fare.ar}</span>
                        {active && <FaCheck aria-hidden="true" className="text-xs text-[#0D154B]" />}
                      </div>
                      <p className="mt-1 text-[10px] font-medium text-[#9AA1AA]">{fare.code}</p>
                      <p  className="mt-2 block text-base font-extrabold text-[#263142]">KWD {fare.price.toFixed(2)}</p>
                      <p className="mt-3 flex items-center gap-2 text-[11px] text-[#73777D]">
                        <FaSuitcase aria-hidden="true" className="shrink-0 text-[#263142]" />
                        {ar ? `9 مقاعد متاحة · ${fare.seatAr}` : `9 seats available · ${fare.seatEn}`}
                      </p>

                      <div className="mt-3 space-y-1.5 border-t border-[#EEF1F5] pt-3">
                        <h3 className="text-sm font-extrabold text-[#262626]">{ar ? "الأمتعة" : "Baggage"}</h3>
                        {baggageItems.map((item) => (
                          <p key={item} className="flex items-center gap-2 text-[11px] text-[#5E6268]">
                            <FaSuitcase aria-hidden="true" className="shrink-0 text-[#0D154B]" />{item}
                          </p>
                        ))}
                      </div>

                      <div className="mt-3 space-y-1.5">
                        <h3 className="text-sm font-extrabold text-[#262626]">{ar ? "مشمول" : "Included"}</h3>
                        {includedItems.map((item) => (
                          <p key={item} className="flex items-center gap-2 text-[11px] text-[#5E6268]">
                            <FaCheck aria-hidden="true" className="shrink-0 text-[10px] text-[#0D154B]" />{item}
                          </p>
                        ))}
                      </div>

                      <div className="mt-3 space-y-1.5">
                        <h3 className="text-sm font-extrabold text-[#262626]">{ar ? "رسوم إضافية" : "Additional fees"}</h3>
                        {extraItems.map((item) => (
                          <p key={item} className="flex items-center gap-2 text-[11px] text-[#5E6268]">
                            <FiPlus aria-hidden="true" className="shrink-0 text-[#E7A719]" />{item}
                          </p>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
  );
}
