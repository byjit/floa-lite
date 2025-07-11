import { HydrateClient } from '@/trpc/server';
import Header from '@/components/block/Header';
import { Hero } from '@/components/landing/hero';
import { IOSInstallPrompt } from '@/components/install-pwa';

export default async function Home() {
  return (
    <HydrateClient>
      <div className="min-h-screen flex flex-col">
        <Header />
        <Hero />
        <IOSInstallPrompt />
      </div>
    </HydrateClient>
  );
}
