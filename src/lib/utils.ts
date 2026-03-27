import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility to merge tailwind classes with clsx and tailwind-merge.
 * Best practice for handling conditional classes in a modern React application.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
