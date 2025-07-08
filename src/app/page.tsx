import { HydrateClient } from '@/trpc/server';
import Header from '@/components/block/Header';
import { Logo } from '@/components/block/Logo';

export default async function Home() {
  return (
    <HydrateClient>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 h-screen flex items-center justify-center">
        </main>
      </div>
    </HydrateClient>
  );
}
