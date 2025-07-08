import { Logo } from "./Logo";
import { SignOutBtn } from "./SignOutBtn";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Session } from "auth";
import { Button, ButtonProps, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

export function Navbar({session}: {session: Session}) {
  return (
    <nav className="w-full flex items-center justify-between py-4 px-4 md:px-12 mx-auto border border-b">
      <Link href="/">
        <Logo />
      </Link>
      <div className="flex items-center space-x-4"></div>
      <Link className={cn("", buttonVariants({variant: "ghost", size: "icon"}))} href="/dashboard">
        <Avatar>
          <AvatarImage src={session.user.image ?? '#'} alt="Profile" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </Link>
    </nav>
  );
}
