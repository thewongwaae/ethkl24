// Types for the contract data structures
export interface Group {
    title: string;
    description: string;
}

export interface VoteData {
    voteCount: number;    // uint256
    optionTitles: string[];
    voteCounts: number[]; // uint256[]
}

export interface UserGroupInfo {
    isInGroup: boolean;
    groupId: number;
    title: string;
    description: string;
}

// Contract ABI type
export const CONTRACT_ABI = [
    "function castVote(uint256 _voteId, uint256 _groupId) nonpayable",
    "function createGroup(string _title, string _description, string[] optionTitles) nonpayable",
    "function removeVote() nonpayable",
    "function userJoinGroup(uint256 _groupId) nonpayable",
    "function addressToGroupId(address) view returns (uint256)",
    "function addressToVoteId(address) view returns (uint256)",
    "function getVotes(uint256 _groupId) view returns (uint256, string[], uint256[])",
    "function groupIdCursor() view returns (uint256)",
    "function groups(uint256) view returns (string title, string description)",
    "function isUserInGroup() view returns (bool, uint256, string, string)"
] as const;