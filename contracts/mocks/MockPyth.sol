// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../lib/IPyth.sol";

/**
 * @title MockPyth
 * @notice Mock Pyth oracle for testing
 */
contract MockPyth is IPyth {
    mapping(bytes32 => PythStructs.Price) public prices;
    uint256 public updateFee = 0.001 ether;

    function setPrice(
        bytes32 id,
        int64 price,
        uint64 conf,
        int32 expo,
        uint256 publishTime
    ) external {
        prices[id] = PythStructs.Price({
            price: price,
            conf: conf,
            expo: expo,
            publishTime: publishTime
        });
    }

    function getPrice(bytes32 id) external view returns (PythStructs.Price memory) {
        return prices[id];
    }

    function getPriceNoOlderThan(bytes32 id, uint256 age) 
        external 
        view 
        returns (PythStructs.Price memory) 
    {
        PythStructs.Price memory price = prices[id];
        require(
            block.timestamp - price.publishTime <= age,
            "Price too old"
        );
        return price;
    }

    function getUpdateFee(bytes[] calldata) external view returns (uint256) {
        return updateFee;
    }

    function updatePriceFeeds(bytes[] calldata) external payable {
        require(msg.value >= updateFee, "Insufficient fee");
    }

    // Stub implementations for interface compliance
    function getValidTimePeriod() external pure returns (uint256) {
        return 60;
    }

    function getEmaPrice(bytes32 id) external view returns (PythStructs.Price memory) {
        return prices[id];
    }

    function getPriceUnsafe(bytes32 id) external view returns (PythStructs.Price memory) {
        return prices[id];
    }

    function getEmaPriceUnsafe(bytes32 id) external view returns (PythStructs.Price memory) {
        return prices[id];
    }

    function getEmaPriceNoOlderThan(bytes32 id, uint256) 
        external 
        view 
        returns (PythStructs.Price memory) 
    {
        return prices[id];
    }

    function parsePriceFeedUpdates(
        bytes[] calldata,
        bytes32[] calldata,
        uint64,
        uint64
    ) external payable returns (PythStructs.PriceFeed[] memory) {
        revert("Not implemented");
    }

    function updatePriceFeedsIfNecessary(
        bytes[] calldata,
        bytes32[] calldata,
        uint64[] calldata
    ) external payable {}
}

