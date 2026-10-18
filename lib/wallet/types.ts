export type TxType = "deposit" | "flight" | "hotel" | "refund";
export type PointsType = "add" | "deduct";
export type HistoryTab = "transactions" | "points";

export type Transaction = {
  id: number;
  type: TxType;
  amount: string;
  time: string;
  card: string;
  dateGroup: string;
};

export type PointsEntry = {
  id: number;
  type: PointsType;
  amount: string;
  time: string;
  dateGroup: string;
};

export type MetaItem = {
  ar: string;
  en: string;
  icon: React.ElementType;
  color: string;
};