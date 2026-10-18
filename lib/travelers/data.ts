import { TravelerData } from "./types";

export const initialTravelers: TravelerData[] = [
  {
    id: "traveler-1",
    labelAr: "المسافر الأول",
    labelEn: "Traveler 1",
    lastName: "Elrawy",
    firstName: "Mo3tz",
    birthDate: "",
    nationality: "",
    gender: "female",
    phone: "1068622014",
    dialCode: "+20",
    email: "mo3tzelrawy111@gmail.com",
    passportNumber: "",
    passportExpiry: "",
    nationalIdNumber: "",
    nationalIdExpiry: "",
  },
  {
    id: "traveler-2",
    labelAr: "المسافر الثاني",
    labelEn: "Traveler 2",
    lastName: "",
    firstName: "",
    birthDate: "",
    nationality: "",
    gender: "",
    phone: "",
    dialCode: "+965",
    email: "",
    passportNumber: "",
    passportExpiry: "",
    nationalIdNumber: "",
    nationalIdExpiry: "",
  },
  {
    id: "traveler-3",
    labelAr: "المسافر الثالث",
    labelEn: "Traveler 3",
    lastName: "",
    firstName: "",
    birthDate: "",
    nationality: "",
    gender: "",
    phone: "",
    dialCode: "+965",
    email: "",
    passportNumber: "",
    passportExpiry: "",
    nationalIdNumber: "",
    nationalIdExpiry: "",
  },
];

// إنشاء مسافر جديد فاضي
export const createEmptyTraveler = (index: number): TravelerData => {
  const ordinals = ["الأول", "الثاني", "الثالث", "الرابع", "الخامس"];
  const ordinalsEn = ["1", "2", "3", "4", "5"];
  return {
    id: `traveler-${Date.now()}`,
    labelAr: `المسافر ${ordinals[index] ?? index + 1}`,
    labelEn: `Traveler ${ordinalsEn[index] ?? index + 1}`,
    lastName: "",
    firstName: "",
    birthDate: "",
    nationality: "",
    gender: "",
    phone: "",
    dialCode: "+965",
    email: "",
    passportNumber: "",
    passportExpiry: "",
    nationalIdNumber: "",
    nationalIdExpiry: "",
  };
};