'use client';
import { ArrowLeft } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ButtonProps } from '@react-email/components';

export function GoHome() {
  return (
    <Link
      href={'/'}
      className={cn(
        'flex items-center p-0',
        buttonVariants({
          variant: 'link',
        }),
      )}
    >
      <ArrowLeft className="h-4 w-4" />
      Home
    </Link>
  );
}

export function GoBack({ className, text = 'back', variant = 'ghost' }: { className?: string, text?: string, variant?: 'ghost' | 'link' | "default" }) {
  return (
    <Button size={'sm'} variant={variant} className={className} type="button" onClick={() => window.history.back()}>
      <ArrowLeft className="h-4 w-4" /> {text}
    </Button>
  );
}
