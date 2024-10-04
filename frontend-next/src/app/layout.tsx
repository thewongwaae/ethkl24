import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Voting App",
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
        <header className="bg-gray-800 text-white p-4 text-center">
          <h1 className="text-2xl font-bold">Vote App</h1>
        </header>
        <main className="flex-grow flex items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}