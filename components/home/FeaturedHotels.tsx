"use client";
import { FiStar, FiMapPin } from "react-icons/fi";
import { useApp } from "@/context/AppContext";

const hotels = [
  { id: 1, nameAr: "فندق النيل بلازا", nameEn: "Nile Plaza Hotel", cityAr: "القاهرة", cityEn: "Cairo", price: 1200, rating: 4.8 },
  { id: 2, nameAr: "برج الكويت", nameEn: "Kuwait Tower", cityAr: "الكويت", cityEn: "Kuwait", price: 85, rating: 4.6 },
  { id: 3, nameAr: "منتجع البحر الأحمر", nameEn: "Red Sea Resort", cityAr: "الغردقة", cityEn: "Hurghada", price: 900, rating: 4.9 },
];

export default function FeaturedHotels() {
  const { t, lang, currency } = useApp();

  return (
    <section className="container mx-auto py-16 px-4">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-primary">{t.sections.featured}</h2>
        <p className="text-gray-500 mt-1">{t.sections.featuredSub}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {hotels.map(h => (
          <div key={h.id} className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition bg-white group">
            <div className="h-48 bg-linear-to-br from-primary to-primary/60 group-hover:scale-105 transition duration-500" />
            <div className="p-4">
              <h3 className="font-bold text-primary text-lg">
                {lang === "ar" ? h.nameAr : h.nameEn}
              </h3>
              <p className="text-gray-500 flex items-center gap-1 text-sm mt-1">
                <FiMapPin /> {lang === "ar" ? h.cityAr : h.cityEn}
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="flex items-center gap-1 text-yellow-500 text-sm">
                  <FiStar fill="currentColor" /> {h.rating}
                </span>
                <span className="text-primary font-bold">
                  {h.price} {currency}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}