'use client'
import React, { createContext, useState, useContext, useEffect } from 'react';
import { ethers } from 'ethers';

// Create the context
const WalletContext = createContext(null);

const CONTRACT_ADDRESS = "0x69f89Ab22115f8c128748B76E79034A5277a1201"; // Deployed contract address
const contractABI = require("../abi.json");
// Create a provider component
export const WalletProvider = ({ children }) => {
	const [walletAddress, setWalletAddress] = useState(null);
	const [contract, setContract] = useState<ethers.Contract | null>(null);
	const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
	const [groupId, setGroupId] = useState(null);
	const [voteId,setVoteId] = useState(null);


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
		const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
		setContract(contractInstance);
	};

	useEffect(() => {
		if (window.ethereum) {
			window.ethereum.on('accountsChanged', (accounts) => {
				setWalletAddress(accounts[0]);
				initializeContract(provider, accounts[0]);
			});
		}

		return () => {
			if (window.ethereum) {
				window.ethereum.removeListener('accountsChanged', (accounts) => {
					setWalletAddress(accounts[0]);
					initializeContract(provider, accounts[0]);
				});
			}
		};
	}, []);

	const disconnectWallet = () => {
		setWalletAddress(null);
	}

	return (
		<WalletContext.Provider value={{ walletAddress, connectWallet, disconnectWallet, contract, voteId, setVoteId, groupId, setGroupId }}>
			{children}
		</WalletContext.Provider>
	);
};

// Custom hook to use the wallet context
export const useWalletContext = () => {
  return useContext(WalletContext);
};
