// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../interfaces/IPoolManager.sol";

/**
 * @title MockPoolManager
 * @notice Mock implementation of Uniswap v4 Pool Manager for testing
 * @dev Simplified version for local development and testing
 */
contract MockPoolManager is IPoolManager {
    mapping(bytes32 => PoolState) public pools;
    mapping(bytes32 => bool) public poolInitialized;
    mapping(bytes32 => uint24) public dynamicFees;

    event PoolInitialized(bytes32 indexed poolId, uint160 sqrtPriceX96);
    event Swap(bytes32 indexed poolId, bool zeroForOne, int256 amountSpecified);
    event LiquidityModified(bytes32 indexed poolId, int256 liquidityDelta);
    event DynamicFeeUpdated(bytes32 indexed poolId, uint24 fee);

    /**
     * @inheritdoc IPoolManager
     */
    function initialize(
        PoolKey memory key,
        uint160 sqrtPriceX96
    ) external override returns (int24 tick) {
        bytes32 poolId = getPoolId(key);
        require(!poolInitialized[poolId], "Pool already initialized");

        // Initialize pool state
        pools[poolId] = PoolState({
            sqrtPriceX96: sqrtPriceX96,
            tick: 0, // Simplified: assume price is at tick 0
            liquidity: 0,
            feeProtocol: 0
        });

        poolInitialized[poolId] = true;
        dynamicFees[poolId] = key.fee;

        emit PoolInitialized(poolId, sqrtPriceX96);
        
        return 0; // Simplified tick calculation
    }

    /**
     * @inheritdoc IPoolManager
     */
    function swap(
        PoolKey memory key,
        SwapParams memory params
    ) external override returns (int256 delta) {
        bytes32 poolId = getPoolId(key);
        require(poolInitialized[poolId], "Pool not initialized");

        // Simplified swap logic
        // In real Uniswap v4, this would execute the swap and call beforeSwap/afterSwap hooks
        
        emit Swap(poolId, params.zeroForOne, params.amountSpecified);
        
        // Return simplified delta (1:1 swap for testing)
        return params.amountSpecified;
    }

    /**
     * @inheritdoc IPoolManager
     */
    function modifyLiquidity(
        PoolKey memory key,
        ModifyLiquidityParams memory params
    ) external override returns (int256 delta) {
        bytes32 poolId = getPoolId(key);
        require(poolInitialized[poolId], "Pool not initialized");

        // Update pool liquidity
        PoolState storage pool = pools[poolId];
        
        if (params.liquidityDelta > 0) {
            pool.liquidity += uint128(uint256(params.liquidityDelta));
        } else if (params.liquidityDelta < 0) {
            pool.liquidity -= uint128(uint256(-params.liquidityDelta));
        }

        emit LiquidityModified(poolId, params.liquidityDelta);
        
        return params.liquidityDelta;
    }

    /**
     * @inheritdoc IPoolManager
     */
    function updateDynamicSwapFee(
        PoolKey memory key,
        uint24 fee
    ) external override {
        bytes32 poolId = getPoolId(key);
        require(poolInitialized[poolId], "Pool not initialized");
        require(fee <= 100000, "Fee too high"); // Max 10%

        dynamicFees[poolId] = fee;
        
        emit DynamicFeeUpdated(poolId, fee);
    }

    /**
     * @inheritdoc IPoolManager
     */
    function getPool(bytes32 id) external view override returns (PoolState memory state) {
        return pools[id];
    }

    /**
     * @inheritdoc IPoolManager
     */
    function getPoolId(PoolKey memory key) public pure override returns (bytes32 id) {
        return keccak256(abi.encode(
            key.currency0,
            key.currency1,
            key.fee,
            key.tickSpacing,
            key.hooks
        ));
    }

    /**
     * @inheritdoc IPoolManager
     */
    function isPoolInitialized(bytes32 id) external view override returns (bool initialized) {
        return poolInitialized[id];
    }

    /**
     * @notice Get the current dynamic fee for a pool
     * @param poolId Pool ID
     * @return fee Current dynamic fee
     */
    function getDynamicFee(bytes32 poolId) external view returns (uint24 fee) {
        return dynamicFees[poolId];
    }
}

