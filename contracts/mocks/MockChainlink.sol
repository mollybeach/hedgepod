// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title MockChainlink
 * @notice Mock Chainlink aggregator for testing
 */
contract MockChainlink {
    int256 private _price;
    uint8 private _decimals;
    uint256 private _updatedAt;

    constructor() {
        _decimals = 8;
        _price = 2000 * 10**8; // $2000 default
        _updatedAt = block.timestamp;
    }

    function setPrice(int256 price) external {
        _price = price;
        _updatedAt = block.timestamp;
    }

    function latestRoundData()
        external
        view
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {
        return (
            1,
            _price,
            _updatedAt,
            _updatedAt,
            1
        );
    }

    function decimals() external view returns (uint8) {
        return _decimals;
    }

    function description() external pure returns (string memory) {
        return "Mock Chainlink Aggregator";
    }

    function version() external pure returns (uint256) {
        return 1;
    }
}

