import { Transaction, PointsEntry } from "./types";

export const user = {
  name: "فيصل محمد بن طلال",
  balance: "2000",
  currency: "KWD",
  loyaltyPoints: "1,250",
};

export const transactions: Transaction[] = [
  { id: 1, type: "deposit", amount: "500 د.ك", time: "02:24 صباحًا", card: "******4875", dateGroup: "today" },
  { id: 2, type: "flight", amount: "500 د.ك", time: "02:24 صباحًا", card: "******4875", dateGroup: "today" },
  { id: 3, type: "hotel", amount: "500 د.ك", time: "02:24 صباحًا", card: "******4875", dateGroup: "26/11/2024" },
  { id: 4, type: "refund", amount: "500 د.ك", time: "02:24 صباحًا", card: "******4875", dateGroup: "26/11/2024" },
];

export const points: PointsEntry[] = [
  { id: 1, type: "add", amount: "30 نقطة", time: "02:24 صباحًا", dateGroup: "today" },
  { id: 2, type: "deduct", amount: "-30 نقطة", time: "02:24 صباحًا", dateGroup: "today" },
  { id: 3, type: "add", amount: "30 نقطة", time: "02:24 صباحًا", dateGroup: "29/11/2024" },
  { id: 4, type: "deduct", amount: "-30 نقطة", time: "02:24 صباحًا", dateGroup: "29/11/2024" },
];