import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name?: string | null): string {
  if (!name) return '';
  // Ensure name is treated as a string before splitting
  const nameStr = String(name);
  return nameStr
    .split(' ')
    .map((n) => n[0]?.toUpperCase())
    .join('');
}

export function toInputName(str: string): string {
  if (str.length > 40) {
    str = str.slice(0, 40);
  }
  const randomSuffix = Math.floor(Math.random() * 1000).toString(); // Generate random number as string
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // remove non-alphanumeric except spaces
    .replace(/\s+/g, '_') + `_${randomSuffix}`; // replace spaces with underscores and append random number
}