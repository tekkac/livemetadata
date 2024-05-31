import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StarknetProvider } from "./components/StarknetProvider";
import { Suspense } from 'react'
import { NextUIProvider } from "@nextui-org/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Asset Checker",
  description: "Live Metadata Checker for Starknet Assets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let rpcApiKey = process.env.RPC_API_KEY || '';
  return (
    <html lang="en">
      <body className={`${inter.className} bg-neutral-800 text-neutral-100 min-h-screen`}>
        <nav className="px-4 py-4 grid grid-flow-col gap-4 place-content-center sticky top-0 border-b border-neutral-900 shadow-lg bg-neutral-800 z-10 text-xl uppercase">
          Live Metadata
        </nav>
        <main className="mx-auto mt-8 pb-24 px-4 max-w-4xl text-center">
          <Suspense>
            <NextUIProvider>
              <StarknetProvider rpcApiKey={rpcApiKey}>
                {children}
              </StarknetProvider>
            </NextUIProvider>
          </Suspense>
        </main>
      </body>
    </html>
  );
}
