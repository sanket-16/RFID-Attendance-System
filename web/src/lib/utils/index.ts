import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import sendMail from "./sendMail"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export { cn, sendMail }
