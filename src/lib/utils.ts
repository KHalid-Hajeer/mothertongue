// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}