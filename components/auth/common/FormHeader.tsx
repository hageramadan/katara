"use client";
import type { ReactNode } from "react";
import { useApp } from "@/context/AppContext";
import { CgTrashEmpty } from "react-icons/cg";


type FormHeaderProps = {
  title: string;
  onClear?: () => void;
  center?: ReactNode;
};

export default function FormHeader({ title, onClear, center }: FormHeaderProps) {
  const { lang } = useApp();

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} className={center ? "mb-2 grid grid-cols-2 items-center gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,240px)_minmax(0,1fr)]" : "flex items-center justify-between gap-3 mb-2"}>
      <h1 className="col-start-1 row-start-1 min-w-0 text-lg md:text-xl lg:text-[24px] font-extrabold text-[#163B45]">
        {title}
      </h1>
      {center && <div className="col-span-2 row-start-2 min-w-0 w-full max-w-60 justify-self-center lg:col-span-1 lg:col-start-2 lg:row-start-1">{center}</div>}
      {onClear && (
        <button
          type="button"
          onClick={onClear}
          className={`${center ? "lg:col-start-3" : ""} col-start-2 row-start-1 flex items-center justify-self-end cursor-pointer hover:scale-105 rounded-lg py-2 px-4 border gap-1.5 text-xs md:text-xs border-[#FF4D4F] text-[#FF4D4F] bg-[#FFF1F0] font-bold transition`}
        >
          
          {lang === "ar" ? "مسح البيانات" : "Clear"}
          <CgTrashEmpty className="text-sm" />
        </button>
      )}
    </div>
  );
}
