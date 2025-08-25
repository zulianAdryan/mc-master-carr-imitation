import "./globals.css";

import { Geist } from "next/font/google";
import type { Metadata } from "next";

import Providers from "@/providers/providers";
import { Wrapper } from "@/components/wrapper";

import { config } from "@/lib/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { template: "McMaster Imitation | %s", default: "McMaster Imitation" },
  description: "Imitating the fastest website with the newest stack of Next JS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href={config.BASE_URL} crossOrigin="anonymous" />
        <link rel="dns-prefetch" href={config.BASE_URL} />
      </head>
      <body className={`${geistSans.variable} antialiased`}>
        <Providers>
          <Wrapper>{children}</Wrapper>
        </Providers>
      </body>
    </html>
  );
}
