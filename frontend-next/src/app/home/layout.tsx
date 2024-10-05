import type { Metadata } from "next";
import "../globals.css";
import Header from "../../components/Header";
import { WalletProvider } from "@/components/wallet";

export const metadata: Metadata = {
  title: "Voting App Home",
  description: "Web3 voting solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen">
        <Header title="Voting App" />
		<WalletProvider>
        <main className="flex-grow flex items-center justify-center">
          {children}
        </main>
		</WalletProvider>
      </body>
    </html>
  );
}
