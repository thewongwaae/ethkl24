"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useWalletContext } from "./wallet";


interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const router = useRouter();
  const { walletAddress, connectWallet, disconnectWallet, contract } = useWalletContext();

  const formatAddress = (address: string): string => {
	if (!address) return '';
	if (address.length <= 8) return address;
	return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const handleUsernameClick = useCallback(() => {
    console.log("Username clicked");
  }, []);

  const handleHomeClick = useCallback(() => {
    router.push("/home");
  }, [router]);

  return (
    <header className="bg-gray-800 text-white p-4 flex items-center justify-between relative">
      {/* Home Icon on the left */}
      <button
        className="p-2 rounded hover:bg-gray-700 transition-transform transform hover:scale-110"
        onClick={handleHomeClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-white">
          <path d="M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z"/>
        </svg>
      </button>
  
      {/* Title in the center */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <h1 className="text-2xl font-bold">
          {title}
        </h1>
      </div>
  
      {/* Username Section on the right */}
      <h1
        className="font-bold transition-transform transform hover:scale-110 hover:text-gray-300 cursor-pointer ml-auto"
        onClick={connectWallet}
      >
				{walletAddress ? walletAddress : "Connect wallet"}
      </h1>
    </header>
  );
}
