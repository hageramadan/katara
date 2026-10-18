"use client";
import { useApp } from "@/context/AppContext";
import { CgTrashEmpty } from "react-icons/cg";


type FormHeaderProps = {
  title: string;
  onClear?: () => void;
};

export default function FormHeader({ title, onClear }: FormHeaderProps) {
  const { lang } = useApp();

  return (
    <div className="flex items-center justify-between gap-3 mb-2">
      <h1 className="text-lg md:text-xl lg:text-[24px] font-extrabold text-[#163B45]">
        {title}
      </h1>
      {onClear && (
        <button
          type="button"
          onClick={onClear}
          className="flex items-center cursor-pointer hover:scale-105 rounded-lg py-2 px-4 border gap-1.5 text-xs md:text-xs border-[#FF4D4F] text-[#FF4D4F] bg-[#FFF1F0] font-bold transition"
        >
          
          {lang === "ar" ? "مسح البيانات" : "Clear"}
          <CgTrashEmpty className="text-sm" />
        </button>
      )}
    </div>
  );
}