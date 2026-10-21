"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FiCheck, FiChevronLeft, FiChevronRight, FiSearch, FiX } from "react-icons/fi";
import Modal from "@/components/ui/Modal";
import Dropdown from "@/components/ui/Dropdown";
import type { FlightResult } from "@/lib/flights/types";

function addDays(date: string, amount: number) {
  const next = new Date(`${date}T12:00:00`);
  next.setDate(next.getDate() + amount);
  return next.toISOString().slice(0, 10);
}

function formatCalendarDate(date: string, ar: boolean) {
  const locale = ar ? "ar-EG-u-nu-latn" : "en-GB";
  const parsed = new Date(`${date}T12:00:00`);
  const weekday = new Intl.DateTimeFormat(locale, { weekday: "long" }).format(parsed);
  const day = new Intl.DateTimeFormat(locale, { day: "numeric" }).format(parsed);
  const month = new Intl.DateTimeFormat(locale, { month: "long" }).format(parsed);
  return ar ? `${weekday}، ${day} ${month}` : `${weekday}, ${month} ${day}`;
}

export default function FlightPriceCalendarModal({
  open,
  onClose,
  ar,
  departureDate,
  returnDate,
  flights,
  onDatesChange,
}: {
  open: boolean;
  onClose: () => void;
  ar: boolean;
  departureDate: string;
  returnDate: string;
  flights: FlightResult[];
  onDatesChange: (departure: string, returnDate: string) => void;
}) {
  const [weekOffset, setWeekOffset] = useState(0);
  const [airline, setAirline] = useState("all");
  const [selectedCell, setSelectedCell] = useState("2-3");
  const [calendarDeparture, setCalendarDeparture] = useState(departureDate);
  const [calendarReturn, setCalendarReturn] = useState(returnDate);
  const wasOpen = useRef(false);
  useEffect(() => {
    if (open && !wasOpen.current) {
      setCalendarDeparture(departureDate);
      setCalendarReturn(returnDate);
      setWeekOffset(0);
    }
    wasOpen.current = open;
  }, [departureDate, open, returnDate]);
  const airlines = useMemo(
    () => Array.from(new Map(flights.map((flight) => [flight.airlineEn, flight])).values()),
    [flights],
  );
  const selectedFlight = airline === "all" ? flights[0] : flights.find((flight) => flight.airlineEn === airline) ?? flights[0];
  const dateColumns = Array.from({ length: 6 }, (_, index) => addDays(calendarDeparture, index - 2 + weekOffset * 7));
  const dateRows = Array.from({ length: 6 }, (_, index) => addDays(calendarReturn, index - 2 + weekOffset * 7));

  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-7xl">
      <div dir={ar ? "rtl" : "ltr"} className="-mx-6 -my-3 flex max-h-[90vh] min-h-[75vh] flex-col overflow-hidden rounded-2xl border border-[#10194F] bg-white p-0">
        <header className="mb-3 grid shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-3 px-3 pt-3 sm:mb-4 sm:px-4 sm:pt-4">
          <button type="button" onClick={onClose} aria-label={ar ? "إغلاق" : "Close"} className="flex h-9 w-9 items-center justify-center justify-self-start rounded-full border border-[#D3D3D3] text-[#333] hover:bg-[#F5F5F5]">
            <FiX className="text-lg" />
          </button>
          <div className="flex items-center gap-3 sm:gap-5">
            <button type="button" onClick={() => setWeekOffset((value) => value - 1)} aria-label={ar ? "الأسبوع السابق" : "Previous week"} className="hidden h-9 w-9 items-center justify-center rounded-full border border-[#D3D3D3] text-[#777] hover:bg-[#F5F5F5] sm:flex"><FiChevronRight /></button>
            <h2 className="text-base font-extrabold text-[#111] sm:text-xl">{ar ? "تقويم التسعير" : "Price calendar"}</h2>
            <button type="button" onClick={() => setWeekOffset((value) => value + 1)} aria-label={ar ? "الأسبوع التالي" : "Next week"} className="hidden h-9 w-9 items-center justify-center rounded-full border border-[#D3D3D3] text-[#777] hover:bg-[#F5F5F5] sm:flex"><FiChevronLeft /></button>
          </div>
          <Dropdown
            align="end"
            width="w-56"
            className="max-w-[150px] justify-self-end sm:max-w-[210px]"
            triggerClassName="w-full justify-between rounded-xl border border-[#E4E8EE] bg-[#F8F9FB] px-3 py-2.5 text-start text-[#263142] transition hover:border-[#AAB4C2]"
            panelClassName="mt-2 max-h-64 overflow-y-auto"
            trigger={
              <span className="min-w-0 flex-1 truncate text-xs font-bold sm:text-sm">
                {airline === "all" ? (ar ? "شركة الطيران" : "Airline") : airlines.find((item) => item.airlineEn === airline)?.[ar ? "airline" : "airlineEn"]}
              </span>
            }
          >
            {(close) => (
              <div className="py-1">
                {[{ airlineEn: "all", airline: "شركة الطيران" }, ...airlines].map((item) => {
                  const selected = item.airlineEn === airline;
                  return (
                    <button
                      key={item.airlineEn}
                      type="button"
                      onClick={() => { setAirline(item.airlineEn); close(); }}
                      className={`flex w-full items-center justify-between gap-3 px-3 py-2.5 text-start text-xs transition sm:text-sm ${selected ? "bg-[#E7F7F7] font-bold text-[#0D154B]" : "text-[#354052] hover:bg-[#F7F8FA]"}`}
                    >
                      <span className="truncate">{item.airlineEn === "all" ? (ar ? "شركة الطيران" : "Airline") : ar ? item.airline : item.airlineEn}</span>
                      {selected && <FiCheck className="shrink-0 text-[#0D154B]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </Dropdown>
        </header>

        <div className="min-h-0 flex-1 overflow-auto rounded-lg px-2 pb-2 sm:px-3 sm:pb-3">
          <div className="grid min-w-[900px] grid-cols-[120px_repeat(6,minmax(105px,1fr))] gap-2" dir={ar ? "rtl" : "ltr"}>
            <div className="rounded-lg bg-[#10194F]" />
            {dateColumns.map((date) => (
              <div key={date} className="flex min-h-[54px] flex-col items-center justify-center rounded-lg bg-[#10194F] px-1 text-center text-[10px] font-bold leading-5 text-white sm:text-xs">
                <span>{ar ? "المغادرة" : "Departure"}</span>
                <span>{formatCalendarDate(date, ar)}</span>
              </div>
            ))}

            {dateRows.map((returnDay, rowIndex) => (
              <div key={returnDay} className="contents">
                <div className="flex min-h-[82px] flex-col items-center justify-center rounded-lg bg-[#10194F] px-2 text-center text-[11px] font-bold leading-5 text-white sm:text-sm">
                  <span>{ar ? "العودة" : "Return"}</span>
                  <span>{formatCalendarDate(returnDay, ar)}</span>
                </div>
                {dateColumns.map((departureDay, columnIndex) => {
                  const cellKey = `${rowIndex}-${columnIndex}`;
                  const available = (rowIndex * 3 + columnIndex) % 5 > 0;
                  const selected = selectedCell === cellKey;
                  const price = (selectedFlight?.price ?? 0) + rowIndex * 35 + columnIndex * 20;
                  return (
                    <button
                      key={cellKey}
                      type="button"
                      aria-label={available ? `${departureDay} / ${returnDay}, KWD ${price}` : (ar ? "البحث عن رحلات" : "Search flights")}
                      onClick={() => {
                        setSelectedCell(cellKey);
                        onDatesChange(departureDay, returnDay);
                      }}
                      className={`relative flex min-h-[82px] flex-col items-center justify-center gap-1 rounded-lg px-2 py-3 text-center transition ${available ? selected ? "bg-[#E8FBFD] ring-1 ring-[#86DDE8]" : "bg-[#F2FCFD] hover:bg-[#E5F8FA]" : "bg-[#F5F5F5] text-[#777] hover:bg-[#ECECEC]"}`}
                    >
                      {available ? (
                        <>
                          {price < (selectedFlight?.price ?? 0) + 80 && <span className="absolute end-0 top-1 rounded-s-sm bg-[#10194F] px-2 py-0.5 text-[9px] font-bold text-white">{ar ? "الأرخص" : "Cheapest"}</span>}
                          {selected && <FiCheck aria-hidden="true" className="absolute start-1 top-1 rounded-full bg-[#209B13] p-0.5 text-sm text-white" />}
                          <span className="line-clamp-1 text-[11px] font-bold text-[#252525] sm:text-sm">{ar ? selectedFlight?.airline : selectedFlight?.airlineEn}</span>
                          <bdi dir="ltr" className="text-[10px] font-extrabold text-[#209B13] sm:text-xs">{price} KWD</bdi>
                        </>
                      ) : (
                        <><FiSearch aria-hidden="true" className="text-base" /><span className="text-[10px]">{ar ? "بحث" : "Search"}</span></>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
