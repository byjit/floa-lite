import Link from 'next/link';
import { Logo } from './Logo';
import { LoginButton } from '../login-form';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center space-x-2">
        <Logo  />
      </div>
      <nav className="space-x-6 text-sm">
        <LoginButton text='Sign In' />
      </nav>
    </header>
  );
}
