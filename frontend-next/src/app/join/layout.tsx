import type { Metadata } from "next";
import "../globals.css";
import Header from "../../components/Header";

export const metadata: Metadata = {
  title: "Join Voting",
  description: "Join voting room by ID",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen">
        <Header title="Join Vote" />
        <main className="flex-grow flex items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}