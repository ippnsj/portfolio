import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function isValidHexColor(value: string): boolean {
  return /^#[0-9A-Fa-f]{3,8}$/.test(value);
}
