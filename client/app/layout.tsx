import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/common/header";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import AutoSignOutRefreshExpires from "@/hooks/auto-signout-refresh-expires";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <Header />
          <main className="max-w-8xl mx-auto">{children}</main>
          <AutoSignOutRefreshExpires />
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
