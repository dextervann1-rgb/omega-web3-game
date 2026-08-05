import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import VFVSealBackground from '@/components/VFVSealBackground';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ÒMEGA - Web3 Business Simulation",
  description: "Immersive blockchain-based Business Simulation and Educational Game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>
          <VFVSealBackground opacity={0.08}>
            <div className="flex-1 flex flex-col">
              {children}
              <footer className="py-6 text-center text-sm opacity-60">
                Est. by Abba — Stewarded by Vann Family
              </footer>
            </div>
          </VFVSealBackground>
        </Providers>
      </body>
    </html>
  );
}
