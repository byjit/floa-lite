import { HydrateClient } from '@/trpc/server';
import Header from '@/components/block/Header';
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
