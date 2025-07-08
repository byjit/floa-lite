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
import { FaXTwitter } from "react-icons/fa6";

export default async function Home() {
  return (
    <HydrateClient>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main>
          <section className="overflow-hidden bg-transparent">
            <div className="relative mx-auto max-w-5xl px-6 py-28 lg:py-24">
              <div className="relative z-10 mx-auto max-w-2xl text-center">
                <h1 className="text-balance text-4xl font-semibold md:text-5xl lg:text-6xl">AI agents for you</h1>
                <p className="mx-auto my-8 max-w-2xl font-light text-slate-300 text-xl">Replace your perplexity, openai and claude subscription with a single platform that can connect your apps and answer or perform tasks across them.</p>

                <LoginButton text="Access yours" className='outline outline-slate-400 outline-offset-2' showArrow />
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
                <Link
                  href="https://github.com/byjit/mchat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2  transition-colors hover:text-white"
                >
                  <FaGithub className="h-6 w-6" />
                  <span className="text-lg font-medium">GitHub</span>
                </Link>
                <Link
                  href="mailto:prasanjitdutta45@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2  transition-colors hover:text-white"
                >
                  <FaEnvelope className="h-6 w-6" />
                  <span className="text-lg font-medium">Mail</span>
                </Link>
                <Link
                  href="https://x.com/jit_infinity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2  transition-colors hover:text-white"
                >
                  <FaXTwitter className="h-6 w-6" />
                  <span className="text-lg font-medium">Twitter</span>
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </HydrateClient>
  );
}
