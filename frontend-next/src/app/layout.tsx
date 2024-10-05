
// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { WalletProvider } from "@/components/wallet";

import { headers } from "next/headers"; // added

export const metadata: Metadata = {
  title: "AppKit Example App",
  description: "Powered by WalletConnect"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang="en">
      <body>
				<WalletProvider>
			{children}	
			</WalletProvider>
      </body>
    </html>
  )
}
