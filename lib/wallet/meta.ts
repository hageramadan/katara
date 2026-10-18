import { FiRefreshCw, FiStar, FiMinusCircle } from "react-icons/fi";

import { TxType, PointsType, MetaItem } from "./types";
import { IoMdTrendingUp } from "react-icons/io";
import { IoMdTrendingDown } from "react-icons/io";
import { FaStarOfLife } from "react-icons/fa";


export const txMeta: Record<TxType, MetaItem> = {
  deposit: { ar: "إيداع", en: "Deposit", icon: IoMdTrendingUp, color: "#059669" },
  flight: { ar: "حجز طيران", en: "Flight Booking", icon: IoMdTrendingDown, color: "#B91C1C" },
  hotel: { ar: "حجز فندق", en: "Hotel Booking", icon: IoMdTrendingDown, color: "#B91C1C" },
  refund: { ar: "إسترداد تذكرة طيران", en: "Flight Refund", icon: FiRefreshCw, color: "#D97706" },
};

export const pointsMeta: Record<PointsType, MetaItem> = {
  add: { ar: "إيداع نقاط", en: "Points Added", icon: FaStarOfLife, color: "#0D154B" },
  deduct: { ar: "خصم نقاط", en: "Points Deducted", icon: FaStarOfLife, color: "#0D154B" },
};