export type Country = {
  code: string;
  nameAr: string;
  nameEn: string;
  currency: string;
  currencyAr: string;
  currencyEn: string;
  flag: string;
  dialCode: string;
};

export const countries: Country[] = [
  { code: "EG", nameAr: "مصر", nameEn: "Egypt", currency: "EGP", currencyAr: "جنيه مصري", currencyEn: "Egyptian Pound", flag: "🇪🇬", dialCode: "+20" },
  { code: "KW", nameAr: "الكويت", nameEn: "Kuwait", currency: "KWD", currencyAr: "دينار كويتي", currencyEn: "Kuwaiti Dinar", flag: "🇰🇼", dialCode: "+965" },
  { code: "SA", nameAr: "السعودية", nameEn: "Saudi Arabia", currency: "SAR", currencyAr: "ريال سعودي", currencyEn: "Saudi Riyal", flag: "🇸🇦", dialCode: "+966" },
  { code: "AE", nameAr: "الإمارات", nameEn: "UAE", currency: "AED", currencyAr: "درهم إماراتي", currencyEn: "UAE Dirham", flag: "🇦🇪", dialCode: "+971" },
];