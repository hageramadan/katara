import { FaCheckCircle } from "react-icons/fa";

export default function FlightSelectionNotice({
  ar,
  tripKind,
}: {
  ar: boolean;
  tripKind: "multi" | "oneway" | "round";
}) {
  const message =
    tripKind === "oneway"
      ? ar
        ? "تم اختيار رحلة باتجاه واحد"
        : "One-way flight selected"
      : ar
        ? "اختيار الرحلة يتم لكل اتجاه بشكل مستقل"
        : "Choose a flight separately for each direction";

  return (
    <p className="mx-3 mb-3 flex items-center gap-1 px-3 py-2 text-[10px] text-[#7B8A90] sm:mx-4 sm:text-xs">
      {message}
      <FaCheckCircle className="shrink-0 text-xs text-[#7B8A90]" />
    </p>
  );
}
