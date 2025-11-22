// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title IVolatilityFeeHook
 * @notice Interface for Uniswap v4 dynamic fee hook based on Pyth volatility
 * @dev Adjusts swap fees dynamically based on market volatility
 */
interface IVolatilityFeeHook {
    // Events
    event FeeAdjusted(
        bytes32 indexed poolId,
        uint24 oldFee,
        uint24 newFee,
        uint256 volatility
    );
    event VolatilityThresholdsUpdated(
        uint256 lowThreshold,
        uint256 mediumThreshold,
        uint256 highThreshold
    );
    event PriceUpdated(bytes32 indexed priceId, int64 price, uint64 timestamp);

    // Structs
    struct VolatilityConfig {
        uint256 lowThreshold;
        uint256 mediumThreshold;
        uint256 highThreshold;
        uint24 lowFee; // 0.1%
        uint24 mediumFee; // 0.2%
        uint24 highFee; // 0.3%
    }

    struct PriceData {
        int64 price;
        uint64 conf;
        int32 expo;
        uint256 publishTime;
    }

    // Configuration Functions
    function setVolatilityThresholds(
        uint256 low,
        uint256 medium,
        uint256 high
    ) external;

    function setFeeTiers(
        uint24 lowFee,
        uint24 mediumFee,
        uint24 highFee
    ) external;

    function setPythPriceId(bytes32 priceId) external;

    // View Functions
    function calculateVolatility(
        int64 currentPrice,
        int64 historicalPrice
    ) external pure returns (uint256);

    function getCurrentFee(bytes32 poolId) external view returns (uint24);
    function getVolatilityConfig() external view returns (VolatilityConfig memory);
}

