import { Badge } from "@/components/ui/badge";
import { Separator } from "../ui/separator";

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
              The All-in-one AI agent chat platform
            </h1>
            <p className="text-lg leading-relaxed max-w-lg text-left">
              Replace your perplexity, openai and claude subscription with a single platform that can connect your apps and answer/perform tasks across them.
              Save money and also get more features.
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* <Link href="https://github.com/byjit/floa-lite" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}>
              Github <FaGithub className="h-6 w-6" />
            </Link>
            <LoginButton text="Access yours" showArrow />     */}
            <iframe data-tally-src="https://tally.so/embed/wAROyz?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" loading="lazy" width="100%" height="174" title="Dreamreel Waitlist form"></iframe>
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
              alt="Floa Lite AI Agent Chat Screenshot"
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