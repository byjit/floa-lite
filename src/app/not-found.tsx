import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/block/Logo';
import { ArrowLeft } from 'lucide-react';
import { GoBack } from '@/components/go-back';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-10 p-4 text-center">
        <Logo/>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
        <p className=" text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      </div>
      <GoBack className='text-sm' variant='default' text='Return to previous page' />
    </div>
  );
}
