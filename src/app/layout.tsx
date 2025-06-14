import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"
import { cookies } from 'next/headers'

import { TRPCReactProvider } from "@/trpc/client";

import { GoogleSignIn } from '@/components/google-signin'
import { Logout } from '@/components/logout'

import { GameList } from '@/components/gameList'
import { ChatList } from '@/components/chatList'

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
        <div className="max-h-screen">
          <Logout />
          <div className="ml-10">
            new games!
          </div>
          <GameList />
          <div className="ml-7">
            past progress!
          </div>
          <ChatList />
        </div>
      )
    } else {
      return (
        <div>
          <GoogleSignIn />
          <div className="w-24 ml-8 p-2 text-wrap text-sm text-center border rounded">
            Login to save your progress and play additional games!
          </div>
        </div>
      )
    }
  }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <TRPCReactProvider>
          <div className="flex">
            <div className="flex flex-col">
              {generateSidebar()}
            </div>
            {children}
          </div>
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
