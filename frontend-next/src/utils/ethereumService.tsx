import { ethers } from 'ethers';
import { Group, VoteData, UserGroupInfo } from './types';

// Replace with your contract address
const CONTRACT_ADDRESS = 'YOUR_CONTRACT_ADDRESS';

class EthereumService {
    private provider: ethers.providers.Web3Provider | null = null;
    private contract: ethers.Contract | null = null;
    private signer: ethers.Signer | null = null;

    constructor() {
        this.initializeEthereum();
    }

    private async initializeEthereum() {
        if (typeof window !== 'undefined' && window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                
                this.provider = new ethers.providers.Web3Provider(window.ethereum);
                this.signer = this.provider.getSigner();
                
                this.contract = new ethers.Contract(
                    CONTRACT_ADDRESS,
                    CONTRACT_ABI,
                    this.signer
                );

                window.ethereum.on('accountsChanged', () => {
                    window.location.reload();
                });

            } catch (error) {
                console.error('Error initializing Ethereum:', error);
            }
        } else {
            console.error('Please install MetaMask!');
        }
    }

    // Create a new group
    async createGroup(title: string, description: string, optionTitles: string[]): Promise<void> {
        try {
            if (!this.contract) throw new Error('Contract not initialized');

            const transaction = await this.contract.createGroup(title, description, optionTitles);
            await transaction.wait();
        } catch (error) {
            console.error('Error creating group:', error);
            throw error;
        }
    }

    // Join an existing group
    async joinGroup(groupId: number): Promise<void> {
        try {
            if (!this.contract) throw new Error('Contract not initialized');

            const transaction = await this.contract.userJoinGroup(groupId);
            await transaction.wait();
        } catch (error) {
            console.error('Error joining group:', error);
            throw error;
        }
    }

    // Cast a vote
    async castVote(voteId: number, groupId: number): Promise<void> {
        try {
            if (!this.contract) throw new Error('Contract not initialized');

            const transaction = await this.contract.castVote(voteId, groupId);
            await transaction.wait();
        } catch (error) {
            console.error('Error casting vote:', error);
            throw error;
        }
    }

    // Remove a vote
    async removeVote(): Promise<void> {
        try {
            if (!this.contract) throw new Error('Contract not initialized');

            const transaction = await this.contract.removeVote();
            await transaction.wait();
        } catch (error) {
            console.error('Error removing vote:', error);
            throw error;
        }
    }

    // Get group info
    async getGroup(groupId: number): Promise<Group> {
        try {
            if (!this.contract) throw new Error('Contract not initialized');

            const group = await this.contract.groups(groupId);
            return {
                title: group.title,
                description: group.description
            };
        } catch (error) {
            console.error('Error getting group:', error);
            throw error;
        }
    }

    // Get votes for a group
    async getVotes(groupId: number): Promise<VoteData> {
        try {
            if (!this.contract) throw new Error('Contract not initialized');

            const [voteCount, optionTitles, voteCounts] = await this.contract.getVotes(groupId);
            return {
                voteCount: voteCount.toNumber(),
                optionTitles,
                voteCounts: voteCounts.map((count: ethers.BigNumber) => count.toNumber())
            };
        } catch (error) {
            console.error('Error getting votes:', error);
            throw error;
        }
    }

    // Get user's group info
    async getUserGroupInfo(): Promise<UserGroupInfo> {
        try {
            if (!this.contract) throw new Error('Contract not initialized');

            const [isInGroup, groupId, title, description] = await this.contract.isUserInGroup();
            return {
                isInGroup,
                groupId: groupId.toNumber(),
                title,
                description
            };
        } catch (error) {
            console.error('Error getting user group info:', error);
            throw error;
        }
    }

    // Get user's group ID
    async getUserGroupId(address: string): Promise<number> {
        try {
            if (!this.contract) throw new Error('Contract not initialized');

            const groupId = await this.contract.addressToGroupId(address);
            return groupId.toNumber();
        } catch (error) {
            console.error('Error getting user group ID:', error);
            throw error;
        }
    }

    // Get user's vote ID
    async getUserVoteId(address: string): Promise<number> {
        try {
            if (!this.contract) throw new Error('Contract not initialized');

            const voteId = await this.contract.addressToVoteId(address);
            return voteId.toNumber();
        } catch (error) {
            console.error('Error getting user vote ID:', error);
            throw error;
        }
    }

    // Get total number of groups
    async getGroupCount(): Promise<number> {
        try {
            if (!this.contract) throw new Error('Contract not initialized');

            const cursor = await this.contract.groupIdCursor();
            return cursor.toNumber();
        } catch (error) {
            console.error('Error getting group count:', error);
            throw error;
        }
    }

    // Get current connected account
    async getCurrentAccount(): Promise<string | null> {
        try {
            if (!this.signer) throw new Error('Signer not initialized');
            return await this.signer.getAddress();
        } catch (error) {
            console.error('Error getting current account:', error);
            return null;
        }
    }
}

// Export a singleton instance
export const ethereumService = new EthereumService();