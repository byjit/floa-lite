import '@/styles/globals.css';
import { type Metadata } from 'next';

import { HydrateClient } from '@/trpc/server';
import { TRPCReactProvider } from '@/trpc/react';
import { ThemeProvider } from '@/components/theme-providers';
import { Toaster } from "@/components/ui/sonner"
import { env } from '@/env';
import Script from 'next/script';
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Floa lite - The all-in-one AI Agent Chat Platform',
  description:
    'Floa lite is the all-in-one AI Agent Chat Platform for all screens. Switch between AI providers, upload files for RAG, connect any app with MCP, search the web, record thoughts, and create multiple AI personas. For professionals, devs, and students.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
  assets: ['/favicon.ico'],
  authors: [{ name: 'Jit', url: 'https://directory.byjit.com' }],
  keywords: [
    "AI chat",
    "AI agent",
    "All-in-one AI platform",
    "AI for individuals",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Floa lite - The all-in-one AI Agent Chat Platform',
    description: 'Switch between AI providers, upload files for RAG, connect any app with MCP, search the web, record thoughts, and create multiple AI personas. For professionals, devs, and students.',
    url: `${env.NEXT_PUBLIC_APP_URL}`,
    siteName: 'Floa lite',
    images: [
      {
        url: `${env.NEXT_PUBLIC_APP_URL}/og-image.png`,
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Floa lite - The all-in-one AI Agent Chat Platform',
    description: 'Switch between AI providers, upload files for RAG, connect any app with MCP, search the web, record thoughts, and create multiple AI personas. For professionals, devs, and students.',
    creator: '@jit_infinity',
    images: [`${env.NEXT_PUBLIC_APP_URL}/og-image.png`],
  },
  category: 'AI, chat, productivity, multi-provider, RAG, MCP',
  creator: 'Jit',
  metadataBase: new URL(`${env.NEXT_PUBLIC_APP_URL}`),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
        <Script id="tally-so" async src="https://tally.so/widgets/embed.js"></Script>
        <meta name="google-site-verification" content="eV_8lm-A-X7GqiT1epPzizzLuGw542DEMsqF6j1wWQg" />
        <link rel="canonical" href={env.NEXT_PUBLIC_APP_URL} />
        <Script id="schema-org" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Floa lite",
            "description": "Floa lite is the all-in-one AI Agent Chat Platform for all screens. Switch between AI providers, upload files for RAG, connect any app with MCP, search the web, record thoughts, and create multiple AI personas. For professionals, devs, and students.",
            "url": env.NEXT_PUBLIC_APP_URL,
            "applicationCategory": "ProductivityApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </Script>
        <Script id="tally-so" async src="https://tally.so/widgets/embed.js"></Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <TRPCReactProvider>
            <HydrateClient>
              {children}
            </HydrateClient>
          </TRPCReactProvider>
        </ThemeProvider>
        <Toaster />
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
