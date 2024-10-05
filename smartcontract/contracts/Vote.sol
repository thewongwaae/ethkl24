// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;


contract Vote {
	Group[] public groups;
	mapping(address => uint256) public addressToGroupId;
	mapping(address => uint256) public addressToVoteId;
	uint256 public groupIdCursor;

	struct VoteOption {
		uint256 voteAmount;
		uint256 groupId;
		uint256 voteOptionId;
		string title;
	};

	struct Group {
		VoteOption[] voteOptions;
		string title;
		string description;
	};

	constructor() {
		groupIdCursor = 1;
	}

	function isUserInGroup() public view returns (bool, uint256, string memory, string memory) {
		uint256 groupId = addressToGroupId[msg.sender];

		if (groupId == 0) {
			return (false, 0, "", "");
		}
        Group memory userGroup = groups[groupId];
        return (true, groupId, userGroup.title, userGroup.description);
	}

	function createGroup(string memory _title, string memory _description, string[] memory optionTitles) public returns (uint256, string memory, string memory, string[] memory) {
		require(bytes(_title).length > 0, "Error: Title cannot be empty");
        require(bytes(_description).length > 0, "Error: Description cannot be empty");
        require(optionTitles.length > 0, "Error: At least one option must be provided");
		VoteOption[] memory newVoteOptions = new VoteOption[](optionTitles.length);

		for (uint256 i = 0; i < optionTitles.length; i++) {
            newVoteOptions[i] = VoteOption(0, groupIdCursor, i + 1, optionTitles[i]);
        }

		Group memory newGroup = Group({
			voteOptions: newVoteOptions,
			title: _title,
			description:_description 
    	});
		groups.push(newGroup);
		return (groupIdCursor++, newGroup.title, newGroup.description, newVoteOptions); 
	}

	function userJoinGroup(uint256 _groupId) public {
        require(_groupId > 0 && _groupId <= groups.length, "Error: GroupID invalid");  // Check for valid Group ID
        require(addressToGroupId[msg.sender] != 0, "Error: User is already in a group");  // Check for valid Group ID
        addressToGroupId[msg.sender] = _groupId;  // Associate user with group
	}

	function castVote(uint256 _voteId, uint256 _groupId) public {
		require(_groupId > 0 && _groupId <= groups.length, "Error: Invalid Group ID");  // Check for valid Group ID
		require(addressToGroupId[msg.sender] == _groupId, "Error: User not in the specified group");  // Check if user is in the group
		require(addressToVoteId[msg.sender] == 0, "Error: User has already voted");
		require(groups[addressToGroupId[msg.sender]].voteOptions.length >= _voteId && _voteId != 0, "Error: invalid vote id");
        addressToVoteId[msg.sender] = _voteId;  // Associate user with the vote ID
		groups[_groupId].voteOptions[_voteId].voteAmount++;

	}

	function removeVote() public {
		require(addressToGroupId[msg.sender] != 0, "Error: User not in any group");  // Check if user is in any group
        require(addressToVoteId[msg.sender] != 0, "Error: User has not voted");  // Check if user has voted
		uint256 groupId = addressToGroupId[msg.sender];
		uint256 voteId = addressToVoteId[msg.sender];
		groups[groupId].voteOptions[voteId].voteAmount--;
		delete addressToVoteId[msg.sender];
	}

	function getVotes(uint256 _groupId) view returns (string[] memory, uint256[] memory) {
		require(_groupId > 0 && _groupId <= groups.length, "Error: Invalid Group ID");  // Check for valid Group ID
        require(addressToGroupId[msg.sender] == _groupId, "Error: User not in this group");  // Check if user is in the group

        Group storage groupRef = groups[_groupId];  // Adjust for 0-based indexing
        string[] memory voteTitles = new string[](groupRef.voteOptions.length);  // Create array to hold titles
		uint256[] memory voteAmount = new uint256[](groupRef.voteOptions.length);

        for (uint256 i = 0; i < groupRef.voteOptions.length; i++) {
            voteTitles[i] = groupRef.voteOptions[i].title;  // Populate titles array
			voteAmount[i] = groupRef.voteOptions[i].voteAmount;
        }

        return (voteTitles, voteAmounts);	
	}
}

