export const mealCategories = [
  { id: "featured", ar: "الوجبات المميزة", en: "Featured meals" },
  { id: "sandwiches", ar: "السندوتشات", en: "Sandwiches" },
  { id: "special", ar: "وجبات خاصة", en: "Special meals" },
  { id: "wraps", ar: "اللفائف", en: "Wraps" },
  { id: "hot", ar: "الطعام الساخن", en: "Hot food" },
] as const;

export type MealCategory = (typeof mealCategories)[number]["id"];

export type Meal = {
  id: string;
  category: MealCategory;
  ar: string;
  en: string;
  image: string;
  price: number;
  originalPrice: number;
};

const chicken = "/images/meals/chicken.png";
const sandwich = "/images/meals/turkey.png";

// Local preview menu; replace with the airline's catalog when the API is connected.
export const meals: Meal[] = [
  { id: "chicken-rice", category: "featured", ar: "دجاج مع الأرز", en: "Chicken and rice", image: chicken, price: 3, originalPrice: 3 },
  { id: "roast-chicken", category: "featured", ar: "الدجاج المشوي", en: "Roast chicken", image: chicken, price: 3, originalPrice: 3 },
  ...mealCategories.filter((category) => category.id !== "featured").flatMap((category) =>
    Array.from({ length: 6 }, (_, index) => ({
      id: `${category.id}-turkey-${index + 1}`,
      category: category.id,
      ar: "الديك الرومي",
      en: "Turkey meal",
      image: sandwich,
      price: 3,
      originalPrice: 3,
    })),
  ),
];

export function selectedMeals(ids: readonly string[] = []) {
  const selected = new Set(ids);
  return meals.filter((meal) => selected.has(meal.id));
}

export function mealsPrice(ids: readonly string[] = []) {
  return selectedMeals(ids).reduce((total, meal) => total + meal.price, 0);
}
