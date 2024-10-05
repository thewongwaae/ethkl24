'use client'
import { useWalletContext } from "@/components/wallet";

export default function Login() {
	const {walletAddress, connectWallet, disconnectWallet, contract} = useWalletContext(); 
  return (
    <div>
			<button onClick={connectWallet}>hellow</button>
		  login page
    </div>
  );
}
