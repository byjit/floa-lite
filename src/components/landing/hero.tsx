import { MoveRight, PhoneCall } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LoginButton } from "../login-form";
import { FaGithub } from "react-icons/fa";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const Hero = () => (
  <div className="w-full py-20">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 gap-8 items-center md:grid-cols-2">
        <div className="flex gap-8 flex-col">
          <div>
            <Badge variant="outline">We&apos;re live!</Badge>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-lg text-left font-regular">
              AI agents for you
            </h1>
            <p className="text-xl leading-relaxed text-gray-300 max-w-lg text-left">
            Replace your perplexity, openai and claude subscription with a single platform that can connect your apps and answer or perform tasks across them.
            Do more than just chat with AI, connect your apps and tools to AI agents and let them do the work for you.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="https://github.com/byjit/floa-lite" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}>
              Github <FaGithub className="h-6 w-6" />
            </Link>
            <LoginButton text="Access yours" showArrow />    
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-muted rounded-md aspect-square outline outline-1 outline-slate-800 rounded-lg outline-offset-4"></div>
          <div className="bg-muted rounded-md row-span-2 outline outline-1 outline-slate-800 rounded-lg outline-offset-4"></div>
          <div className="bg-muted rounded-md aspect-square outline outline-1 outline-slate-800 rounded-lg outline-offset-4"></div>
        </div>
      </div>
    </div>
  </div>
);