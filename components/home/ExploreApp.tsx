"use client";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

export default function ExploreApp() {
  const { lang } = useApp();

  const stores = [
    {
      id: "google",
      iconSrc: "/images/stores/google-play.png",
      topAr: "احصل عليه من",
      topEn: "GET IT ON",
      bottomAr: "Google Play",
      bottomEn: "Google Play",
    },
    {
      id: "apple",
      iconSrc: "/images/stores/app-store.png",
      topAr: "تنزيل من",
      topEn: "Download on the",
      bottomAr: "App Store",
      bottomEn: "App Store",
    },
    {
      id: "huawei",
      iconSrc: "/images/stores/app-gallery.png",
      topAr: "اكتشف المزيد علي",
      topEn: "EXPLORE IT ON",
      bottomAr: "AppGallery",
      bottomEn: "AppGallery",
    },
  ];

  return (
    <section className="py-6 md:py-10 px-4">
      <div className="container mx-auto">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-0">
            {/* ==================== Image Side ==================== */}
            <div className="relative h-64 md:h-full md:min-h-126">
              <Image
                src="/images/explore/app-preview.png"
                alt="App Preview"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* ==================== Content Side ==================== */}
            <div className="p-6 md:p-10 order-1 md:order-2 flex flex-col gap-4 md:gap-5">
              {/* Title */}
              <h2 className="font-bold text-[22px] md:text-[28px] text-[#0D0D0D] lg:text-[32px] leading-tight">
                {lang === "ar"
                  ? "اكتشف أفضل عروض السفر في الكون مع تطبيق الأفضل"
                  : "Discover the Best Travel Deals in the Universe with Al-Afdal App"}
              </h2>

              {/* Description */}
              <div className="flex flex-col gap-2.5 text-sm md:text-base leading-relaxed">
                <div className="flex items-start gap-2">
                  <IoCheckmarkCircleSharp className="text-[#44B50C] text-xl md:text-2xl shrink-0 mt-0.5" />
                  <p className="text-[#1D1D1D] text-sm lg:text-base">
                    {lang === "ar"
                      ? "ابحث وقارن واحجز أفضل عروض الرحلات والفنادق — كل ذلك في تطبيق واحد."
                      : "Search, compare, and book the best flight and hotel deals — all in one app."}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <IoCheckmarkCircleSharp className="text-[#44B50C] text-xl md:text-2xl shrink-0 mt-0.5" />
                  <p className="text-[#1D1D1D] text-sm lg:text-base">
                    {lang === "ar"
                      ? "وفّر أكثر مع رموز الخصم داخل التطبيق. اختر أرخص يوم للسفر."
                      : "Save more with in-app discount codes. Choose the cheapest day to travel."}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <IoCheckmarkCircleSharp className="text-[#44B50C] text-xl md:text-2xl shrink-0 mt-0.5" />
                  <p className="text-[#1D1D1D] text-sm lg:text-base">
                    {lang === "ar"
                      ? "عبر الدردشة وواتساب والهاتف والبريد الإلكتروني."
                      : "Chat, WhatsApp, call, and email."}
                  </p>
                </div>
              </div>

              {/* Scan to Download + QR */}
              <div className="flex flex-col">
                <p className="font-bold text-sm md:text-[20px] text-[#0D0D0D] mb-2 lg:mb-4">
                  {lang === "ar" ? "امسح للتحميل" : "Scan to Download"}
                </p>

                <div className="flex gap-3 items-stretch">
                  {/* QR Code */}
                  <Image
                    src="/images/explore/qr-code.png"
                    alt="QR Code"
                    width={800}
                    height={800}
                    className="w-33 h-30 md:w-38.75 md:h-35 object-cover rounded-lg shrink-0"
                  />

                  {/* Store Buttons */}
                  <div className="flex flex-col gap-2 justify-between">
                    {stores.map((store) => (
                      <button
                        key={store.id}
                        className="
                        w-fit
                          group flex items-center gap-2
                          bg-black text-white hover:bg-black/80 border border-black/20
                          ps-2.5 pe-3 py-1 rounded-[10px]
                          transition
                        "
                      >
                       
                        <span className="flex flex-col text-start leading-tight">
                          <span className="text-[9px] md:text-[10px] text-white/70 uppercase">
                            {lang === "ar" ? store.topAr : store.topEn}
                          </span>
                          <span className="text-xs md:text-sm font-bold whitespace-nowrap">
                            {lang === "ar" ? store.bottomAr : store.bottomEn}
                          </span>
                        </span>
                          <Image
                          src={store.iconSrc}
                          alt={store.id}
                          width={280}
                          height={280}
                          className="shrink-0 w-6 h-6 md:w-7 md:h-7 object-contain"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}