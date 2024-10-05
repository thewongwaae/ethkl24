'use client'
import React, { createContext, useState, useContext } from 'react';
import { ethers } from 'ethers';

// Create the context
const WalletContext = createContext();

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Deployed contract address
// Create a provider component
export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState<ethers.Contract | null>(null);
	const [addressValue, setAddressValue] = useState<string | null>("");
	const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);



  // Function to connect the wallet
  const connectWallet = async () => {
   if (typeof window.ethereum !== "undefined") {
			try {

				// Set up provider
				const { ethereum } = window;
				if (!ethereum) {
					return toast({
						status: "error",
						position: "top-right",
						title: "Error",
						description: "No ethereum wallet found",
					});
				}
				const provider = new ethers.BrowserProvider(ethereum);
				setProvider(provider);

				const accounts: string[] = await provider.send("eth_requestAccounts", []); 

				setWalletAddress(accounts[0]);
				initializeContract(provider, accounts[0]);
			} catch (error) {
				console.error(error);
			}
		} else {
			console.log("MetaMask is not installed");
		} 
  };

const initializeContract = async (provider, account) => {
		// console.log("provider", provider);
		const signer = await provider.getSigner();
		const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signer);
		setContract(contractInstance);
	};

  return (
    <WalletContext.Provider value={{ walletAddress, signer, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

// Custom hook to use the wallet context
export const useWallet = () => {
  return useContext(WalletContext);
};
