import { HydrateClient } from '@/trpc/server';
import Header from '@/components/block/Header';
import { Logo } from '@/components/block/Logo';
import { SparklesCore } from '@/components/ui/sparkles';
import { LoginButton } from '@/components/login-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FaGithub } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

export default async function Home() {
  return (
    <HydrateClient>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main>
          <div
            aria-hidden
            className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block">
            <div className="w-[35rem] h-[80rem] -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
            <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
            <div className="h-[80rem] -translate-y-87.5 absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
          </div>

          <section className="overflow-hidden bg-transparent">
            <div className="relative mx-auto max-w-5xl px-6 py-28 lg:py-24">
              <div className="relative z-10 mx-auto max-w-2xl text-center">
                <h1 className="text-balance text-4xl font-semibold md:text-5xl lg:text-6xl">AI agents for you</h1>
                <p className="mx-auto my-8 max-w-2xl text-slate-300">Replace your perplexity, openai and claude subscription with a single platform that can connect your apps and answer or perform tasks across them.</p>

                <LoginButton text="Claim yours" showArrow />
              </div>
            </div>

            <div className="mx-auto -mt-16 max-w-7xl [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)]">
              <div className="[perspective:1200px] [mask-image:linear-gradient(to_right,black_50%,transparent_100%)] -mr-16 pl-16 lg:-mr-56 lg:pl-56">
                <div className="[transform:rotateX(20deg);]">
                  <div className="lg:h-[44rem] relative skew-x-[.36rad]">
                    {/* TODO: placeholder picture, need to change*/}
                    <img
                      className="rounded-[--radius] z-[2] relative border block"
                      src="https://tailark.com/_next/image?url=%2Fdark-card.webp&w=3840&q=75"
                      alt="Tailark hero section"
                      width={2880}
                      height={2074}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="bg-background relative z-10 py-16">
            <div className="m-auto max-w-5xl px-6">
              <h2 className="text-center text-lg font-medium">Proudly open source.</h2>
              <div className="mx-auto mt-20 flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16 sm:gap-y-12">
                <a
                  href="https://github.com/byjit/mchat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2  transition-colors hover:text-white"
                >
                  <FaGithub className="h-6 w-6" />
                  <span className="text-lg font-medium">GitHub</span>
                </a>
                <a
                  href="mailto:prasanjitdutta45@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2  transition-colors hover:text-white"
                >
                  <FaEnvelope className="h-6 w-6" />
                  <span className="text-lg font-medium">Mail</span>
                </a>
                <a
                  href="https://twitter.com/jit_infinity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2  transition-colors hover:text-white"
                >
                  <FaTwitter className="h-6 w-6" />
                  <span className="text-lg font-medium">Twitter</span>
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </HydrateClient>
  );
}
