'use client';
import { Button, ButtonProps } from '@/components/ui/button';


import { signInGoogle } from '@/lib/auth-client';
import { env } from '@/env';
import { ArrowRight } from 'lucide-react';

export function LoginButton({
  redirectUrl,
  text = 'Sign up',
  showArrow = false,
  ...props
}: ButtonProps & {
  redirectUrl?: string;
    text: string;
    showArrow?: boolean;
}) {

  return (
    <Button
      onClick={() => signInGoogle({ callbackURL: redirectUrl ?? env.NEXT_PUBLIC_APP_URL + '/chat' })}
      {...props}
    >
      <span className="btn-label">{text}</span>
      {showArrow && <ArrowRight />}
    </Button>
  );
}
