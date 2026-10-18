"use client";

type DateFieldProps = {
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  helper?: string;
};

export default function DateField({
  label,
  required,
  value,
  onChange,
  helper,
}: DateFieldProps) {
  return (
    <div>
      <label className="block text-xs md:text-sm font-semibold text-[#1E2A3A] mb-2">
        {label}
        {required && <span className="text-[#D1454A] font-bold ms-1">*</span>}
      </label>
      <div className="relative">
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
             w-full bg-[#FAFCFE] rounded-[10px]
          px-4 py-3 border border-[#DCE3EC]
          text-[#0D154B] text-sm md:text-sm font-medium
          outline-none focus:ring-2 focus:ring-[#0D154B]/20
          transition
          "
        />
        {/* <FiCalendar className="absolute top-1/2 -translate-y-1/2 inset-e-4 text-gray-400 pointer-events-none" /> */}
      </div>
      {helper && (
        <p className="text-[11px] md:text-xs text-gray-400 mt-1.5">{helper}</p>
      )}
    </div>
  );
}
