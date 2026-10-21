import { FiUsers } from "react-icons/fi";
import type { FlightResult } from "@/lib/flights/types";
import { localizeDigits } from "@/lib/flights/format";
import Image from "next/image";

function AirlineMark() {
  return (
    <span className="flex h-6 w-22 shrink-0 items-center justify-center sm:w-22">
      <Image
        src="/images/promo/Frame.png"
        alt=""
        width={600}
        height={200}
        className="h-6 w-21.5"
      />
    </span>
  );
}

export default function FlightCardHeader({
  flight,
  airline,
  formattedPrice,
  ar,
}: {
  flight: FlightResult;
  airline: string;
  formattedPrice: string;
  ar: boolean;
}) {
  const refundableLabel = flight.refundable
    ? ar
      ? "قابلة للاسترداد"
      : "Refundable"
    : ar
      ? "غير قابلة للاسترداد"
      : "Non-refundable";

  return (
    <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 rounded-t-2xl border-b border-[#E8EDF3] bg-linear-to-br from-white via-white to-[#F8FAFD] p-4 sm:grid-cols-[minmax(180px,1fr)_auto_auto] sm:gap-4 sm:p-5">
      <div className="col-start-1 row-start-1 flex min-w-0 items-center gap-3">
        <AirlineMark />
        <p className="truncate text-sm font-bold text-[#0D0D0D] sm:text-lg">
          {airline}
        </p>
      </div>
      <div className="col-span-2 row-start-2 flex min-w-0 flex-wrap items-center gap-2 sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:flex-nowrap">
        <span
          className={`rounded-full px-2.5 py-1 text-[10px] font-semibold sm:text-base ${flight.refundable ? "text-[#4CD964]" : "bg-[#FFF0F0] text-[#B64646]"}`}
        >
          {refundableLabel}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full py-1 text-sm font-semibold text-[#777777] sm:text-base">
          <FiUsers className="shrink-0" />
          {ar
            ? `متبقي ${localizeDigits(flight.seatsLeft, false)} مقاعد`
            : `${flight.seatsLeft} seats left`}
        </span>
      </div>
      <div className="col-start-2 row-start-1 shrink-0 px-4 text-end sm:col-start-3">
        <p className="text-sm font-semibold text-[#4A4A4A] sm:text-base">
          {ar ? "السعر للشخص البالغ" : "Price per adult"}
        </p>
        <p className="mt-0.5 text-lg font-bold tracking-tight text-[#0D154B] sm:text-2xl">
          KWD {formattedPrice}
        </p>
      </div>
    </header>
  );
}
