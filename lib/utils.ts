import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import crypto from "crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format time
export function formatDate(date: string | number | Date | undefined) {
  if (!date) return date;
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
}

// Generate unique 6-digit verification code
export function generateCode() {
  return crypto.randomInt(100000, 999999).toString();
}
