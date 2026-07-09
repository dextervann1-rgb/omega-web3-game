// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract GameContract {
    uint256 public score;
    uint256 public playFee = 0.0001 ether; // ~ $0.20 - $0.40 depending on ETH price
    address public owner;

    event ScoreUpdated(address indexed player, uint256 newScore);
    event FeesWithdrawn(address indexed owner, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    function updateScore(uint256 _score) external payable {
        require(msg.value >= playFee, "Insufficient fee to play");
        score = _score;
        emit ScoreUpdated(msg.sender, _score);
    }

    function setPlayFee(uint256 _newFee) external onlyOwner {
        playFee = _newFee;
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        (bool success, ) = owner.call{value: balance}("");
        require(success, "Withdrawal failed");
        emit FeesWithdrawn(owner, balance);
    }
}
