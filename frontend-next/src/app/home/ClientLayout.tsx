// app/home/ClientLayout.tsx
"use client";

import { useState, useEffect } from "react";
import Header from "../../components/Header";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [worldAddress, setWorldAddress] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve worldAddress from localStorage
    const storedWorldAddress = localStorage.getItem('worldAddress');
    if (storedWorldAddress) {
      setWorldAddress(storedWorldAddress);
    }
  }, []);

  return (
    <>
      <Header title="Voting App" username={worldAddress || "Username"} />
      <main className="flex-grow flex items-center justify-center">
        {children}
      </main>
    </>
  );
}