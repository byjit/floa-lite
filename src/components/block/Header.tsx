import { Logo } from './Logo';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-2">
        <Logo />
      </div>
      <nav className="space-x-3 flex items-center text-sm">
        <Link href="https://github.com/byjit/floa-lite" className={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}>
          <FaGithub className="h-6 w-6" />
        </Link>
        <Link href="/login" className={cn(buttonVariants({ variant: 'default', }))}>Sign in</Link>
      </nav>
    </header>
  );
}
