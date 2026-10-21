import type { BookingTraveler, ServiceSelection } from "./types";

export const bookingFlights = {
  outbound: {
    from: {
      code: "CAI",
      cityAr: "القاهرة",
      cityEn: "Cairo",
      airportAr: "مطار القاهرة",
      airportEn: "Cairo Airport"
    },
    to: {
      code: "KWI",
      cityAr: "الكويت",
      cityEn: "Kuwait",
      airportAr: "مطار الكويت",
      airportEn: "Kuwait Airport"
    },
    departure: "11:05",
    arrival: "14:40",
    flightNumber: "QR 1301",
    dateAr: "23 سبتمبر 2026",
    dateEn: "23 September 2026"
  },
  inbound: {
    from: {
      code: "KWI",
      cityAr: "الكويت",
      cityEn: "Kuwait",
      airportAr: "مطار الكويت",
      airportEn: "Kuwait Airport"
    },
    to: {
      code: "CAI",
      cityAr: "القاهرة",
      cityEn: "Cairo",
      airportAr: "مطار القاهرة",
      airportEn: "Cairo Airport"
    },
    departure: "16:20",
    arrival: "19:35",
    flightNumber: "QR 1302",
    dateAr: "24 سبتمبر 2026",
    dateEn: "24 September 2026"
  }
} as const;

export const travelerTypes = {
  adult: {
    labelAr: "بالغ",
    labelEn: "Adult"
  },
  child: {
    labelAr: "طفل",
    labelEn: "Child"
  },
  infant: {
    labelAr: "رضيع",
    labelEn: "Infant"
  }
};

export const seatTypes = {
  standard: {
    labelAr: "مقعد أساسي",
    labelEn: "Standard seat"
  },
  comfort: {
    labelAr: "مقعد أكثر راحة",
    labelEn: "Extra comfort"
  },
  preferred: {
    labelAr: "مقعد مفضل",
    labelEn: "Preferred seat"
  },
  unavailable: {
    labelAr: "غير متاح",
    labelEn: "Unavailable"
  }
};

export const emptyServiceSelection: ServiceSelection = {
  seat: null,
  baggage: 0,
  wheelchair: false
};

export const initialTravelers: BookingTraveler[] = [
  {
    id: "adult-1",
    name: "Mahmoud Samir",
    type: "adult",
    number: 1
  },
  {
    id: "adult-2",
    name: "Omar Hassan",
    type: "adult",
    number: 2
  },
  {
    id: "child-1",
    name: "Ahmed El-Sayed",
    type: "child",
    number: 1
  },
  {
    id: "infant-1",
    name: "Sara Ali",
    type: "infant",
    number: 1
  },
].map((traveler) => ({
  ...traveler,
  type: traveler.type as BookingTraveler["type"],
  firstName: "",
  lastName: "",
  gender: "male",
  save: false,
  file: "",
  details: {
    birthDate: "",
    mobile: "",
    mobileCode: "+965",
    whatsapp: "",
    whatsappCode: "+965",
    email: "",
    guardian: "Mahmoud Samir",
    passport: "",
    passportExpiry: "",
    nationality: "",
    issuingCountry: ""
  },
}));
