// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title IPyth
 * @notice Stub interface for Pyth Network oracle
 * @dev This is a simplified version for compilation. Use @pythnetwork/pyth-sdk-solidity in production
 */
interface IPyth {
    function getUpdateFee(bytes[] calldata priceUpdate) external view returns (uint256);
    function updatePriceFeeds(bytes[] calldata priceUpdate) external payable;
    function getPriceNoOlderThan(bytes32 id, uint256 age) external view returns (PythStructs.Price memory);
    function getPrice(bytes32 id) external view returns (PythStructs.Price memory);
}

library PythStructs {
    struct Price {
        int64 price;
        uint64 conf;
        int32 expo;
        uint256 publishTime;
    }
    
    struct PriceFeed {
        bytes32 id;
        Price price;
        Price emaPrice;
    }
}

