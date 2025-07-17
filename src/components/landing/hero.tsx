import { Badge } from "@/components/ui/badge";
import { Separator } from "../ui/separator";
import { LoginButton } from "../login-form";
import { FaGithub } from "react-icons/fa";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { InstallPwaButton } from "../install-pwa";

export const Hero = () => (
  <div className="w-full py-20">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 gap-8 items-center md:grid-cols-2">
        <div className="flex gap-8 flex-col">
          <div>
            <Badge variant="outline">Accepting waitlist!</Badge>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-lg text-left font-regular">
              AI agents for you
            </h1>
            <p className="text-lg leading-relaxed max-w-lg text-left">
            Replace your perplexity, openai and claude subscription with a single platform that can connect your apps and answer or perform tasks across them.
            Do more than just chat with AI, connect your apps and tools to AI agents and let them do the work for you.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <InstallPwaButton variant={'outline'} />
            <LoginButton text="Access yours" showArrow />    
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-neutral-900 p-8 rounded-md aspect-square rounded-lg space-y-4 text-neutral-400">
            <p>Today grok 4 is the best model. Tomorrow it be someone else. Winning models keep changing.
              But how do you ensure that you work with the winner?</p>
            <p>This platform is what can help you!</p>
          </div>
          <div className="row-span-2 flex items-center justify-center rounded-md overflow-hidden">
            <img
              src="https://res.cloudinary.com/dz8mikz3h/image/upload/v1752234659/Screenshot_11-7-2025_171833_pbs.twimg.com_slujkk.jpg"
              alt="Floa AI Agent Chat Screenshot"
              className="object-contain w-full h-full rounded-md"
            />
          </div>
          <div className="bg-neutral-900 p-4 rounded-md aspect-square rounded-lg">
            <div className="space-y-2 text-sm text-neutral-400">
              <p>Multiple winning AI providers in one platform</p>
              <Separator />
              <p>Fully Agentic - connect your apps and interact with them</p>
              <Separator />
              <p>Open source and secure</p>
              <Separator />
              <p>Free for BYOK users</p>
              <Separator />
              <p>Project oriented so that you get separate spaces for your chats related to different work aspects</p>
              <Separator />
              <p>Great mobile and desktop experience alike</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);