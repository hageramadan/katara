"use client";
import { user } from "@/lib/wallet/data";
import WalletHero from "@/components/profile/wallet/WalletHero";
import WalletHistory from "@/components/profile/wallet/WalletHistory";

export default function WalletPage() {
  return (
    <div className="flex flex-col gap-6">
      <WalletHero
        name={user.name}
        balance={user.balance}
        currency={user.currency}
      />

      <WalletHistory />
    </div>
  );
}