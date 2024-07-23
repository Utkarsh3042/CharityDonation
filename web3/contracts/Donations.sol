// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Donations {
    struct Charity {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donation_amnt;
    }

    mapping(uint256 => Charity) public charities;

    uint256 public numberOfCharities = 0;

    function createCharity(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public returns (uint256) {
        Charity storage charity = charities[numberOfCharities];

        require(charity.deadline < block.timestamp, "The deadline should be a date in the future.");

        charity.owner = _owner;
        charity.title = _title;
        charity.description = _description;
        charity.target = _target;
        charity.deadline = _deadline;
        charity.amountCollected = 0;
        charity.image = _image;

        numberOfCharities++;

        return numberOfCharities-1;

    }

    function donateToCharity(uint256 _id) public payable {
        uint256 amount = msg.value;
        Charity storage charity = charities[_id];

        charity.donators.push(msg.sender);
        charity.donation_amnt.push(amount);

        (bool sent,) = payable(charity.owner).call{value: amount}("");

        if(sent){
            charity.amountCollected = charity.amountCollected+amount;
        }
    }

    function getDonators(uint256 _id) view public returns(address[] memory, uint256[] memory ) {
        return(charities[_id].donators, charities[_id].donation_amnt);
    }

    function getCharities() public view returns(Charity[] memory) {
        Charity[] memory allCharity = new Charity[](numberOfCharities);

        for(uint i=0; i<numberOfCharities;i++){
            Charity storage item = charities[i];
            allCharity[i] = item;
        }

        return allCharity;
    }

}
