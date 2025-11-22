// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title IYieldOracle
 * @notice Interface for yield and price data aggregation
 * @dev Aggregates data from Pyth and Chainlink for redundancy
 */
interface IYieldOracle {
    // Events
    event APRUpdated(uint16 indexed chainId, uint256 oldAPR, uint256 newAPR);
    event PriceSourceUpdated(string source, bool enabled);
    event FallbackActivated(string primarySource, string fallbackSource);

    // Structs
    struct PriceSource {
        string name;
        address oracle;
        bool enabled;
        uint256 lastUpdate;
    }

    struct APRData {
        uint16 chainId;
        uint256 apr;
        uint256 totalLiquidity;
        uint256 timestamp;
        string source;
    }

    // Core Functions
    function updateAPR(uint16 chainId, uint256 apr) external;
    function getAPR(uint16 chainId) external view returns (uint256);
    function getPrice(bytes32 assetId) external view returns (uint256);
    function getPriceWithFallback(bytes32 assetId) external returns (uint256);

    // Configuration
    function addPriceSource(string calldata name, address oracle) external;
    function togglePriceSource(string calldata name, bool enabled) external;
    function setPrimarySource(string calldata source) external;

    // View Functions
    function getAllAPRs() external view returns (APRData[] memory);
    function getBestChain() external view returns (uint16 chainId, uint256 apr);
    function getPriceSources() external view returns (PriceSource[] memory);
}

