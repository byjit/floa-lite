import { validateSession } from 'auth';
import { Navbar } from '@/components/block/Navbar';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateSession();

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar session={session} />
      <main className='max-w-3xl mx-auto'>
      {children}
    </main>
    </div>
  );
}
