import { validateSession } from 'auth';
import { Navbar } from '@/components/block/Navbar';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateSession();

  return (
    <div className='flex flex-col min-h-screen overflow-hidden'>
      <Navbar session={session} />
      <main className='w-full h-full'>
      {children}
      </main>
    </div>
  );
}
