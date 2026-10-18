"use client";
import { useMemo, useState } from "react";
import { useApp } from "@/context/AppContext";
import { transactions, points } from "@/lib/wallet/data";
import { HistoryTab } from "@/lib/wallet/types";
import WalletTabs from "./WalletTabs";
import HistoryGroup from "./HistoryGroup";
import TransactionItem from "./TransactionItem";
import PointsItem from "./PointsItem";

export default function WalletHistory() {
  const { lang } = useApp();
  const [activeTab, setActiveTab] = useState<HistoryTab>("transactions");
  const [txFilter] = useState("all");

 
  // Group transactions
  const groupedTx = useMemo(() => {
    const filtered = txFilter === "all"
      ? transactions
      : transactions.filter((t) => t.type === txFilter);

    const result: Record<string, typeof transactions> = {};
    filtered.forEach((tx) => {
      const key = tx.dateGroup === "today"
        ? (lang === "ar" ? "اليوم" : "Today")
        : tx.dateGroup;
      if (!result[key]) result[key] = [];
      result[key].push(tx);
    });
    return result;
  }, [txFilter, lang]);

  // Group points
  const groupedPoints = useMemo(() => {
    const result: Record<string, typeof points> = {};
    points.forEach((p) => {
      const key = p.dateGroup === "today"
        ? (lang === "ar" ? "اليوم" : "Today")
        : p.dateGroup;
      if (!result[key]) result[key] = [];
      result[key].push(p);
    });
    return result;
  }, [lang]);


  return (
    <section>
      

      {/* Tabs */}
      <WalletTabs active={activeTab} onChange={setActiveTab} />

      {/* Content */}
      <h1 className="text-base md:text-xl font-bold mt-7 mb-4 lg:mt-12 lg:mb-6">{lang=='ar'?'سجل المعاملات الخاص بك':'Your transaction history'}</h1>
      <div className="bg-white rounded-2xl border border-[#DCE3EC] overflow-hidden">
        {activeTab === "transactions" ? (
          Object.keys(groupedTx).length === 0 ? (
            <EmptyState message={lang === "ar" ? "لا توجد معاملات" : "No transactions"} />
          ) : (
            Object.entries(groupedTx).map(([date, txs]) => (
              <HistoryGroup key={date} date={date}>
                {txs.map((tx) => (
                  <TransactionItem key={tx.id} tx={tx} />
                ))}
              </HistoryGroup>
            ))
          )
        ) : Object.keys(groupedPoints).length === 0 ? (
          <EmptyState message={lang === "ar" ? "لا توجد نقاط" : "No points"} />
        ) : (
          Object.entries(groupedPoints).map(([date, entries]) => (
            <HistoryGroup key={date} date={date}>
              {entries.map((p) => (
                <PointsItem key={p.id} entry={p} />
              ))}
            </HistoryGroup>
          ))
        )}
      </div>
    </section>
  );
}

// Small local component
function EmptyState({ message }: { message: string }) {
  return <div className="p-10 text-center text-[#6F7E89] text-sm">{message}</div>;
}