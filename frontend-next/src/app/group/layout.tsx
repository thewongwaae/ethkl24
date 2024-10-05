import type { Metadata } from "next";
import "../globals.css";
import Header from "../../components/Header";

export const metadata: Metadata = {
	title: "Group",
	description: "View votes available within your group",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header title="Choose your vote topic!" />
        <main className="flex-grow flex items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}
