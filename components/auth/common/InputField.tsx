"use client";

type InputFieldProps = {
  label: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  helper?: string;
  className?: string;
};

export default function InputField({
  label,
  required,
  placeholder,
  value,
  onChange,
  type = "text",
  helper,
  className = "",
}: InputFieldProps) {
  return (
    <div className={className}>
      <label className="block text-xs md:text-sm font-semibold text-[#1E2A3A] mb-2">
       {label}
        {required && <span className="text-[#D1454A] font-bold ms-1">*</span>}
        
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full bg-[#FAFCFE] rounded-[10px]
          px-4 py-3 border border-[#DCE3EC]
          text-[#0D154B] text-sm md:text-sm font-medium
          outline-none focus:ring-2 focus:ring-[#0D154B]/20
          transition
        "
      />
      {helper && (
        <p className="text-[11px] md:text-xs text-gray-400 mt-1.5">{helper}</p>
      )}
    </div>
  );
}