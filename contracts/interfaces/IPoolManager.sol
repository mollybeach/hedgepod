// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title IPoolManager
 * @notice Interface for Uniswap v4 Pool Manager
 * @dev Core interface for pool operations and hook integration
 */
interface IPoolManager {
    /**
     * @notice Pool key structure
     * @dev Uniquely identifies a pool
     */
    struct PoolKey {
        address currency0;
        address currency1;
        uint24 fee;
        int24 tickSpacing;
        address hooks;
    }

    /**
     * @notice Swap parameters
     */
    struct SwapParams {
        bool zeroForOne;
        int256 amountSpecified;
        uint160 sqrtPriceLimitX96;
    }

    /**
     * @notice Modify liquidity parameters
     */
    struct ModifyLiquidityParams {
        int24 tickLower;
        int24 tickUpper;
        int256 liquidityDelta;
    }

    /**
     * @notice Pool state
     */
    struct PoolState {
        uint160 sqrtPriceX96;
        int24 tick;
        uint128 liquidity;
        uint24 feeProtocol;
    }

    /**
     * @notice Initialize a pool
     * @param key Pool key
     * @param sqrtPriceX96 Initial sqrt price
     * @return tick The initial tick
     */
    function initialize(
        PoolKey memory key,
        uint160 sqrtPriceX96
    ) external returns (int24 tick);

    /**
     * @notice Execute a swap
     * @param key Pool key
     * @param params Swap parameters
     * @return delta The balance changes
     */
    function swap(
        PoolKey memory key,
        SwapParams memory params
    ) external returns (int256 delta);

    /**
     * @notice Modify liquidity in a pool
     * @param key Pool key
     * @param params Modify liquidity parameters
     * @return delta The balance changes
     */
    function modifyLiquidity(
        PoolKey memory key,
        ModifyLiquidityParams memory params
    ) external returns (int256 delta);

    /**
     * @notice Update the dynamic swap fee for a pool
     * @param key Pool key
     * @param fee New fee (in hundredths of a bip, i.e. 1e-6)
     */
    function updateDynamicSwapFee(
        PoolKey memory key,
        uint24 fee
    ) external;

    /**
     * @notice Get pool state
     * @param id Pool ID
     * @return state The pool state
     */
    function getPool(bytes32 id) external view returns (PoolState memory state);

    /**
     * @notice Get pool ID from key
     * @param key Pool key
     * @return id The pool ID
     */
    function getPoolId(PoolKey memory key) external pure returns (bytes32 id);

    /**
     * @notice Check if a pool is initialized
     * @param id Pool ID
     * @return initialized True if initialized
     */
    function isPoolInitialized(bytes32 id) external view returns (bool initialized);
}

