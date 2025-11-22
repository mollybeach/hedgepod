// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./lib/IPyth.sol";
import "./interfaces/IYieldOracle.sol";

/**
 * @title YieldOracle
 * @notice Aggregates yield and price data from multiple sources
 * @dev Primary: Pyth, Fallback: Chainlink, with manual override capability
 * @custom:security-contact security@hedgepod.xyz
 */
contract YieldOracle is IYieldOracle, AccessControl {
    bytes32 public constant ORACLE_UPDATER_ROLE = keccak256("ORACLE_UPDATER_ROLE");
    bytes32 public constant PRICE_FEEDER_ROLE = keccak256("PRICE_FEEDER_ROLE");

    // Oracles
    IPyth public pythOracle;
    address public chainlinkOracle;
    
    // State
    mapping(uint16 => APRData) public aprData;
    mapping(bytes32 => uint256) public assetPrices;
    mapping(string => PriceSource) public priceSources;
    
    uint16[] public supportedChains;
    string[] public sourceNames;
    string public primarySource;
    
    // Configuration
    uint256 public constant MAX_PRICE_AGE = 1 hours;
    uint256 public constant MIN_UPDATE_INTERVAL = 5 minutes;
    
    // Statistics
    uint256 public totalAPRUpdates;
    uint256 public totalFallbackActivations;

    /**
     * @notice Initialize the Yield Oracle
     * @param _pythOracle Pyth oracle address
     * @param _chainlinkOracle Chainlink oracle address
     */
    constructor(address _pythOracle, address _chainlinkOracle) {
        require(_pythOracle != address(0), "Invalid Pyth oracle");
        require(_chainlinkOracle != address(0), "Invalid Chainlink oracle");
        
        pythOracle = IPyth(_pythOracle);
        chainlinkOracle = _chainlinkOracle;
        primarySource = "pyth";

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ORACLE_UPDATER_ROLE, msg.sender);
        _grantRole(PRICE_FEEDER_ROLE, msg.sender);

        // Initialize price sources
        priceSources["pyth"] = PriceSource({
            name: "pyth",
            oracle: _pythOracle,
            enabled: true,
            lastUpdate: block.timestamp
        });

        priceSources["chainlink"] = PriceSource({
            name: "chainlink",
            oracle: _chainlinkOracle,
            enabled: true,
            lastUpdate: block.timestamp
        });

        sourceNames.push("pyth");
        sourceNames.push("chainlink");
    }

    /**
     * @notice Update APR for a specific chain
     * @param chainId Chain ID
     * @param apr APR in basis points (500 = 5%)
     */
    function updateAPR(uint16 chainId, uint256 apr) 
        external 
        override 
        onlyRole(ORACLE_UPDATER_ROLE) 
    {
        APRData storage data = aprData[chainId];
        uint256 oldAPR = data.apr;

        // Update APR data
        data.chainId = chainId;
        data.apr = apr;
        data.timestamp = block.timestamp;
        data.source = primarySource;

        // Add to supported chains if new
        if (data.totalLiquidity == 0) {
            supportedChains.push(chainId);
        }

        totalAPRUpdates++;

        emit APRUpdated(chainId, oldAPR, apr);
    }

    /**
     * @notice Get APR for a specific chain
     * @param chainId Chain ID
     * @return apr APR in basis points
     */
    function getAPR(uint16 chainId) external view override returns (uint256) {
        APRData memory data = aprData[chainId];
        require(data.timestamp > 0, "No APR data for chain");
        require(
            block.timestamp - data.timestamp < MAX_PRICE_AGE,
            "APR data too old"
        );
        return data.apr;
    }

    /**
     * @notice Get price from Pyth oracle
     * @param assetId Asset identifier (Pyth price ID)
     * @return price Price in USD (scaled)
     */
    function getPrice(bytes32 assetId) external view override returns (uint256) {
        PythStructs.Price memory pythPrice = pythOracle.getPriceNoOlderThan(
            assetId,
            MAX_PRICE_AGE
        );
        
        // Convert Pyth price to uint256
        require(pythPrice.price > 0, "Invalid price");
        return uint256(uint64(pythPrice.price));
    }

    /**
     * @notice Get price with automatic fallback to Chainlink
     * @param assetId Asset identifier
     * @return price Price in USD (scaled)
     */
    function getPriceWithFallback(bytes32 assetId) 
        external 
        override 
        returns (uint256) 
    {
        // Try Pyth first
        try pythOracle.getPriceNoOlderThan(assetId, MAX_PRICE_AGE) returns (
            PythStructs.Price memory pythPrice
        ) {
            if (pythPrice.price > 0) {
                return uint256(uint64(pythPrice.price));
            }
        } catch {
            // Fallback to Chainlink
            emit FallbackActivated("pyth", "chainlink");
            totalFallbackActivations++;
            
            // In real implementation, would query Chainlink
            // For now, return cached price
            return assetPrices[assetId];
        }

        revert("All price sources failed");
    }

    /**
     * @notice Update liquidity data for chain
     * @param chainId Chain ID
     * @param liquidity Total liquidity on chain
     */
    function updateLiquidity(uint16 chainId, uint256 liquidity) 
        external 
        onlyRole(ORACLE_UPDATER_ROLE) 
    {
        require(aprData[chainId].timestamp > 0, "Chain not initialized");
        aprData[chainId].totalLiquidity = liquidity;
    }

    /**
     * @notice Manually set price (emergency override)
     * @param assetId Asset identifier
     * @param price Price to set
     */
    function setPrice(bytes32 assetId, uint256 price) 
        external 
        onlyRole(PRICE_FEEDER_ROLE) 
    {
        assetPrices[assetId] = price;
    }

    // ========== CONFIGURATION ==========

    function addPriceSource(string calldata name, address oracle) 
        external 
        override 
        onlyRole(DEFAULT_ADMIN_ROLE) 
    {
        require(oracle != address(0), "Invalid oracle address");
        require(bytes(priceSources[name].name).length == 0, "Source exists");

        priceSources[name] = PriceSource({
            name: name,
            oracle: oracle,
            enabled: true,
            lastUpdate: block.timestamp
        });

        sourceNames.push(name);
        emit PriceSourceUpdated(name, true);
    }

    function togglePriceSource(string calldata name, bool enabled) 
        external 
        override 
        onlyRole(DEFAULT_ADMIN_ROLE) 
    {
        require(bytes(priceSources[name].name).length > 0, "Source not found");
        priceSources[name].enabled = enabled;
        emit PriceSourceUpdated(name, enabled);
    }

    function setPrimarySource(string calldata source) 
        external 
        override 
        onlyRole(DEFAULT_ADMIN_ROLE) 
    {
        require(priceSources[source].enabled, "Source not enabled");
        primarySource = source;
    }

    function updatePythOracle(address _pythOracle) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(_pythOracle != address(0), "Invalid address");
        pythOracle = IPyth(_pythOracle);
        priceSources["pyth"].oracle = _pythOracle;
    }

    function updateChainlinkOracle(address _chainlinkOracle) 
        external 
        onlyRole(DEFAULT_ADMIN_ROLE) 
    {
        require(_chainlinkOracle != address(0), "Invalid address");
        chainlinkOracle = _chainlinkOracle;
        priceSources["chainlink"].oracle = _chainlinkOracle;
    }

    // ========== VIEW FUNCTIONS ==========

    function getAllAPRs() external view override returns (APRData[] memory) {
        APRData[] memory allAPRs = new APRData[](supportedChains.length);
        
        for (uint256 i = 0; i < supportedChains.length; i++) {
            allAPRs[i] = aprData[supportedChains[i]];
        }
        
        return allAPRs;
    }

    function getBestChain() external view override returns (uint16 chainId, uint256 apr) {
        require(supportedChains.length > 0, "No chains registered");
        
        uint256 bestAPR = 0;
        uint16 bestChain = 0;
        
        for (uint256 i = 0; i < supportedChains.length; i++) {
            uint16 chain = supportedChains[i];
            uint256 chainAPR = aprData[chain].apr;
            
            if (chainAPR > bestAPR) {
                bestAPR = chainAPR;
                bestChain = chain;
            }
        }
        
        return (bestChain, bestAPR);
    }

    function getPriceSources() external view override returns (PriceSource[] memory) {
        PriceSource[] memory sources = new PriceSource[](sourceNames.length);
        
        for (uint256 i = 0; i < sourceNames.length; i++) {
            sources[i] = priceSources[sourceNames[i]];
        }
        
        return sources;
    }

    function getSupportedChains() external view returns (uint16[] memory) {
        return supportedChains;
    }

    function getAPRData(uint16 chainId) external view returns (APRData memory) {
        return aprData[chainId];
    }

    // ========== STATISTICS ==========

    function getStatistics() 
        external 
        view 
        returns (
            uint256 _totalAPRUpdates,
            uint256 _totalFallbackActivations,
            uint256 _supportedChainsCount
        ) 
    {
        return (
            totalAPRUpdates,
            totalFallbackActivations,
            supportedChains.length
        );
    }
}

