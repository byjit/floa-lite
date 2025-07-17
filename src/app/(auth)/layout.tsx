import { validateSession } from 'auth';
import { Navbar } from '@/components/block/Navbar';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateSession();

  return (
    <Sheet>
    <div className='flex flex-col min-h-screen overflow-hidden'>
      <Navbar session={session} />
      <main className='w-full h-full'>
      {children}
      </main>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
    </div>
    </Sheet>
  );
}
