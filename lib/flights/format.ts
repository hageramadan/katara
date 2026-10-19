export function localizeDigits(value: string | number, isArabic: boolean): string {
  const text = String(value);
  return isArabic
    ? text.replace(/[0-9]/g, (digit) => "٠١٢٣٤٥٦٧٨٩"[Number(digit)])
    : text;
}
