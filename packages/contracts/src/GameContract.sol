// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract GameContract {
    uint256 public score;
    event ScoreUpdated(uint256 newScore);

    function updateScore(uint256 _score) external {
        score = _score;
        emit ScoreUpdated(_score);
    }
}
