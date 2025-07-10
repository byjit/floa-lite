import { HydrateClient } from '@/trpc/server';
import Header from '@/components/block/Header';
import { Logo } from '@/components/block/Logo';
import { SparklesCore } from '@/components/ui/sparkles';
import { LoginButton } from '@/components/login-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FaGithub } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Hero } from '@/components/landing/hero';

export default async function Home() {
  return (
    <HydrateClient>
      <div className="min-h-screen flex flex-col">
        <Header />
        <Hero />
      </div>
    </HydrateClient>
  );
}
