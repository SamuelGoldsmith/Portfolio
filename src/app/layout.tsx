import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { Header } from "@/components/header";
import React from "react";

export const metadata: Metadata = {
  title: "WPI Repairability Calculator",
  description:
    "Repairability calculator created by Mina Boktor, Samuel Goldsmith, and Brenden Peters. This project is for CS3043, Social Implications of Computer Processing at Worcester Polytechnic Institute in Worcester, Massachusetts. ",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <TRPCReactProvider>
        <body className="flex min-h-screen w-full flex-col">
          <Header />
          <main className="bg-muted/40 flex-grow">{children}</main>
          <Analytics />
        </body>
      </TRPCReactProvider>
    </html>
  );
}
