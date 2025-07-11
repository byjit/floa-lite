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
      <main className='w-full py-24'>
      {children}
      </main>
    </div>
  );
}
