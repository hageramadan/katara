"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { FiArrowLeft, FiArrowRight, FiCheck } from "react-icons/fi";
import { useApp } from "@/context/AppContext";
import { mealCategories, meals, selectedMeals, type Meal, type MealCategory } from "@/lib/booking/meals";

type MealOptionsProps = {
  value: string[];
  onChange: (meals: string[]) => void;
};

export default function MealOptions({ value = [], onChange }: MealOptionsProps) {
  const { lang, dir } = useApp();
  const [category, setCategory] = useState<MealCategory>("featured");
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);
  const featured = meals.filter((meal) => meal.category === "featured");
  const selected = selectedMeals(value);

  function toggleMeal(meal: Meal) {
    onChange(value.includes(meal.id) ? value.filter((id) => id !== meal.id) : [...value, meal.id]);
  }

  function moveFeatured(index: number) {
    setFeaturedIndex(index);
    const card = carousel.current?.children[index] as HTMLElement | undefined;
    if (card && carousel.current) {
      carousel.current.scrollTo({ left: (dir === "rtl" ? -1 : 1) * index * (card.offsetWidth + 20), behavior: "smooth" });
    }
  }

  return (
    <div className="py-6 text-neutral-900 sm:py-7">
      <h2 className="mb-5 text-xl font-bold sm:text-2xl">{lang === "ar" ? "اختر وجبتك" : "Choose your meal"}</h2>
      <nav aria-label={lang === "ar" ? "تصنيفات الوجبات" : "Meal categories"} className="mb-7 flex overflow-x-auto rounded-md border border-[#CBCDD7]">
        {mealCategories.map((item) => (
          <a
            key={item.id}
            href={`#meal-${item.id}`}
            aria-current={category === item.id ? "location" : undefined}
            onClick={(event) => {
              event.preventDefault();
              setCategory(item.id);
              document.getElementById(`meal-${item.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className={`flex min-h-12 min-w-24 flex-1 items-center justify-center border-e border-[#CBCDD7] px-2 py-3 text-center text-[11px] font-bold last:border-e-0 sm:text-xs ${category === item.id ? "bg-primary text-white" : "bg-[#D8D9E2] text-primary hover:bg-primary-100"}`}
          >
            {lang === "ar" ? item.ar : item.en}
          </a>
        ))}
      </nav>

      <div role="status" className="sr-only">
        {lang === "ar" ? `عدد الوجبات المختارة: ${selected.length}` : `${selected.length} meals selected`}
      </div>

      <section id="meal-featured" aria-labelledby="featured-meals-heading" className="scroll-mt-28">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h3 id="featured-meals-heading" className="text-xl font-bold sm:text-2xl">{lang === "ar" ? "الوجبات المميزة" : "Featured meals"}</h3>
          <div className="flex gap-2">
            {[0, 1].map((direction) => {
              const next = direction === 1;
              const Icon = (dir === "rtl" ? !next : next) ? FiArrowRight : FiArrowLeft;
              return (
                <button key={direction} type="button" onClick={() => moveFeatured(featuredIndex + (next ? 1 : -1))} disabled={next ? featuredIndex === featured.length - 1 : featuredIndex === 0} aria-label={next ? (lang === "ar" ? "الوجبة التالية" : "Next meal") : (lang === "ar" ? "الوجبة السابقة" : "Previous meal")} className="grid size-9 place-items-center rounded-full border border-neutral-400 transition hover:bg-white disabled:cursor-default disabled:opacity-30">
                  <Icon aria-hidden="true" />
                </button>
              );
            })}
          </div>
        </div>
        <div ref={carousel} className="flex snap-x snap-mandatory gap-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" onScroll={() => {
          if (carousel.current) {
            const card = carousel.current.children[0] as HTMLElement;
            setFeaturedIndex(Math.round(Math.abs(carousel.current.scrollLeft) / (card.offsetWidth + 20)));
          }
        }}>
          {featured.map((meal) => {
            const added = value.includes(meal.id);
            return (
              <button key={meal.id} type="button" aria-pressed={added} aria-label={`${lang === "ar" ? (added ? "إزالة" : "إضافة") : (added ? "Remove" : "Add")} ${lang === "ar" ? meal.ar : meal.en}, ${meal.price.toFixed(3)} KWD`} onClick={() => toggleMeal(meal)} className={`relative aspect-[1.9] w-[90%] shrink-0 snap-start overflow-hidden rounded-[28px] text-start focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-[#0D154B] ${added ? "ring-4 ring-inset ring-[#0D154B]" : ""}`}>
                <Image src={meal.image} alt={lang === "ar" ? meal.ar : meal.en} fill sizes="(max-width: 1023px) 85vw, 65vw" className="object-cover" />
                <span className="absolute inset-0 bg-linear-to-t from-black/65 via-transparent to-transparent" />
                <span className="absolute end-5 top-4 rounded-full bg-white px-4 py-1.5 text-xs font-semibold">{added ? (lang === "ar" ? "تمت الإضافة" : "Added") : (lang === "ar" ? "الأكثر مبيعًا" : "Best seller")}</span>
                <span className="absolute start-5 bottom-5 text-start text-white">
                  <span className="mb-1 block text-xl font-semibold">{lang === "ar" ? meal.ar : meal.en}</span>
                  <span className="flex flex-wrap items-center gap-3">
                    <bdi className="text-sm font-bold text-amber-400">{meal.price.toFixed(3)}</bdi>
                    <del className="text-xs text-white/70"><bdi>KWD {meal.originalPrice.toFixed(3)}</bdi></del>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {mealCategories.filter((item) => item.id !== "featured").map((item) => (
        <section key={item.id} id={`meal-${item.id}`} aria-labelledby={`meal-heading-${item.id}`} className="mt-8 scroll-mt-28 sm:mt-10">
          <h3 id={`meal-heading-${item.id}`} className="mb-5 text-xl font-bold sm:text-2xl">{lang === "ar" ? item.ar : item.en}</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 xl:gap-7">
            {meals.filter((meal) => meal.category === item.id).map((meal) => {
              const added = value.includes(meal.id);
              return (
                <article key={meal.id} className={`min-w-0 rounded-[28px] border-2 bg-white p-2.5 sm:p-3.5 ${added ? "border-[#0D154B]" : "border-transparent"}`}>
                  <div className="relative mb-4 aspect-[1.8] overflow-hidden rounded-[22px]">
                    <Image src={meal.image} alt={lang === "ar" ? meal.ar : meal.en} fill sizes="(max-width: 639px) 42vw, (max-width: 1023px) 28vw, 22vw" className="object-cover" />
                  </div>
                  <h4 className="text-sm leading-relaxed font-bold">{lang === "ar" ? meal.ar : meal.en}</h4>
                  <p className="mt-1.5 mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                    <span className="sr-only">{lang === "ar" ? "السعر الحالي" : "Current price"}</span>
                    <bdi className="font-bold text-amber-500">{meal.price.toFixed(3)}</bdi>
                    <span className="sr-only">{lang === "ar" ? "السعر السابق" : "Previous price"}</span>
                    <del className="text-neutral-400"><bdi>KWD {meal.originalPrice.toFixed(3)}</bdi></del>
                  </p>
                  <button type="button" aria-pressed={added} aria-label={`${lang === "ar" ? (added ? "إزالة" : "إضافة") : (added ? "Remove" : "Add")} ${lang === "ar" ? meal.ar : meal.en}`} onClick={() => toggleMeal(meal)} className={`flex min-h-10 w-full items-center justify-center gap-1 rounded-full px-2 py-2 text-xs font-semibold transition sm:text-sm ${added ? "bg-primary text-white hover:bg-primary-600" : "bg-[#E7E5E5] text-neutral-700 hover:bg-primary-100"}`}>
                    {added && <FiCheck aria-hidden="true" />}
                    {lang === "ar" ? (added ? "إزالة" : "إضافة") : (added ? "Remove" : "Add")}
                  </button>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
