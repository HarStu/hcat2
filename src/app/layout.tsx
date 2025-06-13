import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"
import { cookies } from 'next/headers'
import Link from "next/link";

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import { GoogleSignIn } from '@/components/google-signin'
import { Logout } from '@/components/logout'

import { gameConfigs } from '@/lib/games'

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hcat2",
  description: "Games with words...",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('better-auth.session_token')
  console.log(`${sessionCookie}`)

  const generateSidebar = () => {
    if (sessionCookie) {
      return (
        gameConfigs.map((game) => {
          return (
            <Button key={game.name} variant="link" className="w-24 gap-4 m-4" asChild>
              <Link href={`/play/${game.name}`}>{game.name}</Link>
            </Button >
          )
        })
      )
    } else {
      return (
        <div>hello</div>
      )
    }
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex">
          <div className="flex flex-col">
            {sessionCookie ? <Logout /> : <GoogleSignIn />}
            {generateSidebar()}
          </div>
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
