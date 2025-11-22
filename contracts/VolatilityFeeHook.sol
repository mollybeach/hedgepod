// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./lib/IPyth.sol";
import "./interfaces/IVolatilityFeeHook.sol";

/**
 * @title VolatilityFeeHook
 * @notice Uniswap v4 hook that adjusts swap fees based on Pyth volatility data
 * @dev Dynamically adjusts fees: 0.1% (low vol), 0.2% (medium vol), 0.3% (high vol)
 * @custom:security-contact security@hedgepod.xyz
 */
contract VolatilityFeeHook is IVolatilityFeeHook {
    // Pyth oracle
    IPyth public immutable pyth;
    
    // Configuration
    VolatilityConfig public config;
    bytes32 public priceId;
    
    // Pool manager (Uniswap v4)
    address public immutable poolManager;
    
    // Fee storage per pool
    mapping(bytes32 => uint24) public poolFees;
    mapping(bytes32 => uint256) public lastFeeUpdate;
    
    // Historical prices for volatility calculation
    mapping(bytes32 => int64) public lastPrice;
    mapping(bytes32 => uint256) public lastPriceTimestamp;
    
    // Constants
    uint256 public constant VOLATILITY_WINDOW = 5 minutes;
    uint256 public constant MIN_UPDATE_INTERVAL = 1 minutes;
    uint256 public constant MAX_PRICE_AGE = 60 seconds;

    // Access control
    address public owner;
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    modifier onlyPoolManager() {
        require(msg.sender == poolManager, "Only pool manager");
        _;
    }

    /**
     * @notice Initialize the Volatility Fee Hook
     * @param _pyth Pyth oracle address (can be zero for local testing)
     * @param _poolManager Uniswap v4 Pool Manager address (can be zero for local testing)
     * @param _priceId Pyth price ID to monitor
     */
    constructor(
        address _pyth,
        address _poolManager,
        bytes32 _priceId
    ) {
        // Allow zero addresses for local development/testing
        if (_pyth != address(0)) {
            pyth = IPyth(_pyth);
        }
        poolManager = _poolManager;
        priceId = _priceId;
        owner = msg.sender;

        // Set default volatility thresholds
        config = VolatilityConfig({
            lowThreshold: 100,      // 1% volatility
            mediumThreshold: 300,   // 3% volatility
            highThreshold: 500,     // 5% volatility
            lowFee: 1000,          // 0.1% = 1000 (in basis points * 10)
            mediumFee: 2000,       // 0.2% = 2000
            highFee: 3000          // 0.3% = 3000
        });
    }

    /**
     * @notice Hook called before each swap
     * @dev This is the core Uniswap v4 hook function
     * @param key The pool key
     * @return bytes4 Function selector for validation
     */
    function beforeSwap(
        address /* sender */,
        PoolKey calldata key,
        SwapParams calldata /* params */,
        bytes calldata /* hookData */
    ) external onlyPoolManager returns (bytes4) {
        bytes32 poolId = keccak256(abi.encode(key));
        
        // Check if enough time has passed since last update
        if (block.timestamp >= lastFeeUpdate[poolId] + MIN_UPDATE_INTERVAL) {
            _updateFee(poolId);
        }

        return this.beforeSwap.selector;
    }

    /**
     * @dev Update fee based on current volatility
     */
    function _updateFee(bytes32 poolId) internal {
        // Get current price from Pyth
        PythStructs.Price memory currentPrice = pyth.getPriceNoOlderThan(
            priceId,
            MAX_PRICE_AGE
        );

        // Get historical price
        int64 historicalPrice = lastPrice[priceId];
        
        // Calculate volatility if we have historical data
        if (historicalPrice != 0 && 
            block.timestamp >= lastPriceTimestamp[priceId] + VOLATILITY_WINDOW) {
            
            uint256 volatility = calculateVolatility(
                currentPrice.price,
                historicalPrice
            );

            // Determine appropriate fee tier
            uint24 newFee = _getFeeForVolatility(volatility);
            uint24 oldFee = poolFees[poolId];

            // Update fee if changed
            if (newFee != oldFee) {
                poolFees[poolId] = newFee;
                lastFeeUpdate[poolId] = block.timestamp;
                
                // In real implementation, would call:
                // IPoolManager(poolManager).updateDynamicSwapFee(key, newFee);
                
                emit FeeAdjusted(poolId, oldFee, newFee, volatility);
            }
        }

        // Store current price for next volatility calculation
        lastPrice[priceId] = currentPrice.price;
        lastPriceTimestamp[priceId] = block.timestamp;

        emit PriceUpdated(priceId, currentPrice.price, uint64(currentPrice.publishTime));
    }

    /**
     * @notice Calculate volatility percentage
     * @param currentPrice Current price from Pyth
     * @param historicalPrice Historical price
     * @return volatility Volatility in basis points (100 = 1%)
     */
    function calculateVolatility(
        int64 currentPrice,
        int64 historicalPrice
    ) public pure override returns (uint256) {
        require(currentPrice > 0 && historicalPrice > 0, "Invalid prices");

        // Calculate absolute price change
        int64 priceDelta = currentPrice > historicalPrice
            ? currentPrice - historicalPrice
            : historicalPrice - currentPrice;

        // Calculate percentage change in basis points
        // Convert int64 to uint256 safely
        uint256 absDelta = uint256(uint64(priceDelta));
        uint256 absHistorical = uint256(uint64(historicalPrice));
        uint256 volatility = (absDelta * 10000) / absHistorical;

        return volatility;
    }

    /**
     * @dev Get fee tier for given volatility
     */
    function _getFeeForVolatility(uint256 volatility) internal view returns (uint24) {
        if (volatility >= config.highThreshold) {
            return config.highFee;
        } else if (volatility >= config.mediumThreshold) {
            return config.mediumFee;
        } else {
            return config.lowFee;
        }
    }

    // ========== CONFIGURATION FUNCTIONS ==========

    function setVolatilityThresholds(
        uint256 low,
        uint256 medium,
        uint256 high
    ) external override onlyOwner {
        require(low < medium && medium < high, "Invalid thresholds");
        
        config.lowThreshold = low;
        config.mediumThreshold = medium;
        config.highThreshold = high;

        emit VolatilityThresholdsUpdated(low, medium, high);
    }

    function setFeeTiers(
        uint24 lowFee,
        uint24 mediumFee,
        uint24 highFee
    ) external override onlyOwner {
        require(lowFee < mediumFee && mediumFee < highFee, "Invalid fee tiers");
        require(highFee <= 10000, "Fee too high"); // Max 10%
        
        config.lowFee = lowFee;
        config.mediumFee = mediumFee;
        config.highFee = highFee;
    }

    function setPythPriceId(bytes32 _priceId) external override onlyOwner {
        priceId = _priceId;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid address");
        owner = newOwner;
    }

    // ========== VIEW FUNCTIONS ==========

    function getCurrentFee(bytes32 poolId) external view override returns (uint24) {
        uint24 fee = poolFees[poolId];
        return fee == 0 ? config.lowFee : fee; // Default to low fee
    }

    function getVolatilityConfig() external view override returns (VolatilityConfig memory) {
        return config;
    }

    function getLastPrice(bytes32 _priceId) external view returns (int64 price, uint256 timestamp) {
        return (lastPrice[_priceId], lastPriceTimestamp[_priceId]);
    }

    // Required for Pyth price updates
    receive() external payable {}
}

// ========== SUPPORTING STRUCTS ==========

/**
 * @dev Uniswap v4 Pool Key structure
 * @notice Simplified for this implementation
 */
struct PoolKey {
    address currency0;
    address currency1;
    uint24 fee;
    int24 tickSpacing;
    address hooks;
}

/**
 * @dev Uniswap v4 Swap Parameters
 */
struct SwapParams {
    bool zeroForOne;
    int256 amountSpecified;
    uint160 sqrtPriceLimitX96;
}

