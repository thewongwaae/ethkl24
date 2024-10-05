// src/components/Header.tsx
"use client";

import { useCallback } from "react";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const handleUsernameClick = useCallback(() => {
    console.log("Username clicked");
  }, []);

  return (
    <header className="bg-gray-800 text-white p-4 flex items-center justify-between relative">
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <div className="flex-shrink-0 ml-auto">
        <h1
          className="font-bold transition-transform transform hover:scale-110 hover:text-gray-300 cursor-pointer"
          onClick={handleUsernameClick}
        >
          Username
        </h1>
      </div>
    </header>
  );
}