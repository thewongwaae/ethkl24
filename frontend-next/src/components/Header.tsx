// src/components/Header.tsx
"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const router = useRouter();

  const handleUsernameClick = useCallback(() => {
    console.log("Username clicked");
  }, []);

  const handleHomeClick = useCallback(() => {
    router.push("/home");
  }, [router]);

  return (
    <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
      {/* Home Button on the left */}
      <button
        className="p-2 border border-white rounded hover:bg-gray-700 transition"
        onClick={handleHomeClick}
      >
        Home
      </button>

      {/* Title in the center */}
      <h1 className="text-2xl font-bold flex-grow text-center">
        {title}
      </h1>

      {/* Username Section on the right */}
      <h1
        className="font-bold transition-transform transform hover:scale-110 hover:text-gray-300 cursor-pointer"
        onClick={handleUsernameClick}
      >
        Username
      </h1>
    </header>
  );
}
