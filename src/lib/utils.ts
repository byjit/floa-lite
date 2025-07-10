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


/**
 * Turn an AsyncIterable<T> into a ReadableStream<U>,
 * emitting only those items where `filter(item)` is true,
 * mapped through `mapper(item)`.
 */
export function toReadableStream<T, U>(
  iterable: AsyncIterable<T>,
  options?: {
    filter?: (item: T) => boolean;
    mapper?: (item: T) => U;
  },
): ReadableStream<U> {
  return new ReadableStream<U>({
    async start(controller) {
      try {
        for await (const item of iterable) {
          // Optionally apply filtering
          if (options?.filter && !options.filter(item)) {
            continue;
          }

          // Optionally apply mapping
          const value = options?.mapper ? options.mapper(item) : (item as U);

          controller.enqueue(value);
        }
      } finally {
        controller.close();
      }
    },
  });
}