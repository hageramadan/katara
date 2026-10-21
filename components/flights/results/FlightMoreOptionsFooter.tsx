import type { TabKey } from "./FlightMoreOptionsContent";

export default function FlightMoreOptionsFooter({
  ar,
  activeTab,
  price,
  onClose,
}: {
  ar: boolean;
  activeTab: TabKey;
  price: number;
  onClose: () => void;
}) {
  const isTermsTab = activeTab === "terms";

  return (
    <footer
      dir={ar && isTermsTab ? "rtl" : "ltr"}
      className={`sticky bottom-0 shrink-0 border-t border-[#E5E8ED] bg-white px-3 py-3 sm:px-5 ${isTermsTab ? "flex items-end justify-between gap-4" : "grid grid-cols-1 gap-2"}`}
    >
      <div className={isTermsTab ? "text-end" : ""}>
        {isTermsTab && <p className="text-[10px] font-semibold text-[#777]">{ar ? "السعر للشخص البالغ" : "Price per adult"}</p>}
        <bdi dir="ltr" className="text-xl font-extrabold text-[#0D154B]">KWD {price.toFixed(2)}</bdi>
      </div>
      <button
        type="button"
        onClick={onClose}
        className={`${isTermsTab ? "min-w-28" : "w-full"} rounded-lg bg-[#0D154B] px-8 py-2.5 text-xs font-bold text-white transition hover:bg-[#17245F] sm:text-sm`}
      >
        {ar ? "احجز الآن" : "Book now"}
      </button>
    </footer>
  );
}
