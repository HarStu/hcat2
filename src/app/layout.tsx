import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"
import { cookies } from 'next/headers'

import { GoogleSignIn } from '@/components/google-signin'
import { Logout } from '@/components/logout'

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

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex justify-end">
          {sessionCookie ? <Logout /> : <GoogleSignIn />}
        </div>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
