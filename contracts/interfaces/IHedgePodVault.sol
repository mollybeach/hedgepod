// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title IHedgePodVault
 * @notice Interface for the main HedgePod Vault contract
 * @dev Core interface for cross-chain yield optimization vault
 */
interface IHedgePodVault {
    // Events
    event Deposit(address indexed user, uint256 amount, uint256 sharesIssued);
    event Withdraw(address indexed user, uint256 amount, uint256 sharesBurned);
    event Rebalance(uint16 indexed targetChain, uint256 amount, uint256 timestamp);
    event AgentAuthorized(address indexed agent, uint256 limit, uint256 expiresAt);
    event EmergencyWithdraw(address indexed user, uint256 amount);
    
    // Uniswap v4 Events
    event PoolInitialized(bytes32 indexed poolId, address currency0, address currency1, uint24 fee);
    event LiquidityAdded(bytes32 indexed poolId, uint256 liquidity, int24 tickLower, int24 tickUpper);
    event LiquidityRemoved(bytes32 indexed poolId, uint256 liquidity, int24 tickLower, int24 tickUpper);
    event SwapExecuted(bytes32 indexed poolId, bool zeroForOne, int256 amountIn, int256 amountOut);

    // Structs
    struct ChainAllocation {
        uint16 chainId;
        uint256 amount;
        uint256 apr;
        uint256 lastUpdate;
    }

    struct AgentAuthorization {
        address agent;
        uint256 spendingLimit;
        uint256 expiresAt;
        bool active;
    }

    // Core Functions
    function deposit(uint256 amount) external returns (uint256 shares);
    function depositWithWorldID(
        uint256 amount,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) external returns (uint256 shares);
    
    function withdraw(uint256 shares) external returns (uint256 amount);
    function withdrawToChain(uint256 shares, uint16 targetChain) external returns (uint256 amount);
    
    function rebalance(uint16 targetChain, bytes[] calldata priceUpdate) external;
    function rebalanceWithAuthorization(
        uint16 targetChain,
        uint256 amount,
        bytes calldata authorization
    ) external;

    // View Functions
    function totalAssets() external view returns (uint256);
    function getUserShares(address user) external view returns (uint256);
    function getChainAllocations() external view returns (ChainAllocation[] memory);
    function calculateAPR(uint16 chainId) external view returns (uint256);
}

