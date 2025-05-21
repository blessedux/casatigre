import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Casa Tigre",
  description: "A Web3 builder's paradise in the Paraná Delta. Wind down with the crypto fam after Devconnect in our cozy builder retreat residencies.",
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/android-chrome-192x192.png',
      },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://casatigre.vercel.app',
    title: 'Casa Tigre - A Web3 Builder\'s Paradise',
    description: '🌴 Join us for an unforgettable post-Devconnect retreat in the Paraná Delta! Experience the perfect blend of tropical paradise and crypto community vibes. Build, connect, and unwind in our exclusive island house with jetskis, boats, and amazing builder retreat residencies. Only 1 hour from Buenos Aires! 🚀',
    siteName: 'Casa Tigre',
    images: [
      {
        url: '/delta_ghibli.png',
        width: 1200,
        height: 630,
        alt: 'Casa Tigre - A Web3 Builder\'s Paradise in the Paraná Delta',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Casa Tigre - A Web3 Builder\'s Paradise',
    description: '🌴 Join us for an unforgettable post-Devconnect retreat in the Paraná Delta! Experience the perfect blend of tropical paradise and crypto community vibes. Build, connect, and unwind in our exclusive island house with jetskis, boats, and amazing builder retreat residencies. Only 1 hour from Buenos Aires! 🚀',
    images: ['/delta_ghibli.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-transparent`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
