import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 格式化时间
export function formatDate(date: string | number | Date | undefined) {
  if (!date) return date;
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
}
