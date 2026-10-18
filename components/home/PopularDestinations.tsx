"use client";
import { useApp } from "@/context/AppContext";

const destinations = [
  { ar: "شرم الشيخ", en: "Sharm El Sheikh" },
  { ar: "دبي", en: "Dubai" },
  { ar: "الكويت", en: "Kuwait" },
  { ar: "أسوان", en: "Aswan" },
];

export default function PopularDestinations() {
  const { t, lang } = useApp();

  return (
    <section className="bg-secondary/30 py-16 px-4">
      <div className="container mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-primary">{t.sections.destinations}</h2>
          <p className="text-gray-500 mt-1">{t.sections.destinationsSub}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {destinations.map(d => (
            <div
              key={d.en}
              className="relative h-56 rounded-xl overflow-hidden group cursor-pointer bg-primary/20"
            >
              <div className="absolute inset-0 bg-linear-to-t from-primary/90 via-primary/30 to-transparent" />
              <span className="absolute bottom-4 inset-s-4 text-white font-bold text-lg">
                {lang === "ar" ? d.ar : d.en}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}