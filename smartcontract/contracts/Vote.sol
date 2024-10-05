// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;


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
	}

	struct Group {

		uint256[] voteAmount;
		uint256[] voteOptionId;
		string[] voteTitle;
		string title;
		string description;
	}

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

	function createGroup(string memory _title, string memory _description, string[] memory optionTitles) public returns (uint256) {
		require(bytes(_title).length > 0, "Error: Title cannot be empty");
        require(bytes(_description).length > 0, "Error: Description cannot be empty");
        require(optionTitles.length > 0, "Error: At least one option must be provided");
		uint256[] memory voteAmount = new uint256[](optionTitles.length);
		uint256[] memory voteOptionId = new uint256[](optionTitles.length);
		string[] memory voteTitle = new string[](optionTitles.length);
		Group memory newGroup = Group({
			voteAmount: voteAmount,
			voteOptionId: voteOptionId,
			voteTitle: voteTitle,
			title: _title,
			description:_description 
    	});

		for (uint256 i = 0; i < optionTitles.length; i++) {
			newGroup.voteAmount[i] = 0;
			newGroup.voteOptionId[i] = i;
			newGroup.voteTitle[i] = optionTitles[i];
		}
		groups.push(newGroup);
		return groupIdCursor++;
	}

	function userJoinGroup(uint256 _groupId) public {
        require(_groupId > 0 && _groupId <= groups.length, "Error: GroupID invalid");  // Check for valid Group ID
        require(addressToGroupId[msg.sender] != 0, "Error: User is already in a group");  // Check for valid Group ID
        addressToGroupId[msg.sender] = _groupId;  // Associate user with group
	}

	function castVote(uint256 _voteId, uint256 _groupId) public returns (uint256) {
		require(_groupId > 0 && _groupId <= groups.length, "Error: Invalid Group ID");  // Check for valid Group ID
		require(addressToGroupId[msg.sender] == _groupId, "Error: User not in the specified group");  // Check if user is in the group
		require(addressToVoteId[msg.sender] == 0, "Error: User has already voted");
		require(groups[addressToGroupId[msg.sender]].voteAmount.length >= _voteId && _voteId != 0, "Error: invalid vote id");
        addressToVoteId[msg.sender] = _voteId;  // Associate user with the vote ID
		groups[_groupId].voteAmount[_voteId]++;
		return (groups[_groupId].voteAmount[_voteId]);

	}

	function removeVote() public returns (uint256) {
		require(addressToGroupId[msg.sender] != 0, "Error: User not in any group");  // Check if user is in any group
        require(addressToVoteId[msg.sender] != 0, "Error: User has not voted");  // Check if user has voted
		uint256 groupId = addressToGroupId[msg.sender];
		uint256 voteId = addressToVoteId[msg.sender];
		groups[groupId].voteAmount[voteId]--;
		delete addressToVoteId[msg.sender];
		return (groups[groupId].voteAmount[voteId])
	}

	function getVotes(uint256 _groupId) public view returns (uint256, string[] memory, uint256[] memory) {
		require(_groupId > 0 && _groupId <= groups.length, "Error: Invalid Group ID");  // Check for valid Group ID
        require(addressToGroupId[msg.sender] == _groupId, "Error: User not in this group");  // Check if user is in the group

        Group storage groupRef = groups[_groupId];  // Adjust for 0-based indexing
        string[] memory voteTitles = new string[](groupRef.voteAmount.length);  // Create array to hold titles
		uint256[] memory voteAmount = new uint256[](groupRef.voteAmount.length);

        for (uint256 i = 0; i < groupRef.voteAmount.length; i++) {
            voteTitles[i] = groupRef.voteTitle[i];  // Populate titles array
			voteAmount[i] = groupRef.voteAmount[i];
        }
		
        return (addressToVoteId[msg.sender], voteTitles, voteAmount);
	}
}

