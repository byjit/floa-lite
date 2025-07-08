'use client';
import { useMemo } from 'react';

export const useDateFormatters = () => {
  const dateFormatter = useMemo(() => new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }), []);

  const shortDateFormatter = useMemo(() => new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric'
  }), []);

  return { dateFormatter, shortDateFormatter };
};