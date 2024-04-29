import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StarknetProvider } from "./components/StarknetProvider";

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
  let rpcApiKey = process.env.RPC_API_KEY || 'free';
  return (
    <html lang="en">
      <body className={`${inter.className} bg-neutral-800 text-neutral-100 min-h-screen`}>
        <main className="mx-auto mt-8 pb-24 px-4 max-w-7xl">
          <StarknetProvider rpcApiKey={rpcApiKey}>
            {children}
          </StarknetProvider>
        </main>
      </body>
    </html>
  );
}
