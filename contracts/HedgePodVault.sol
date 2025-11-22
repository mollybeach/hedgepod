// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./lib/IPyth.sol";
import "./interfaces/IHedgePodVault.sol";
import "./interfaces/IAutoYieldToken.sol";
import "./interfaces/IYieldOracle.sol";

/**
 * @title HedgePodVault
 * @notice Main vault contract for cross-chain yield optimization
 * @dev Integrates with LayerZero, Pyth, Chainlink, and Uniswap v4
 * @custom:security-contact security@hedgepod.xyz
 */
contract HedgePodVault is IHedgePodVault, AccessControl, ReentrancyGuard {
    using SafeERC20 for IERC20;

    // Roles
    bytes32 public constant AGENT_ROLE = keccak256("AGENT_ROLE");
    bytes32 public constant REBALANCER_ROLE = keccak256("REBALANCER_ROLE");

    // Constants
    uint256 public constant MIN_APR_DELTA = 100; // 1% minimum APR improvement
    uint256 public constant MAX_SLIPPAGE = 100; // 1% max slippage
    uint256 public constant REBALANCE_COOLDOWN = 1 hours;

    // State Variables
    IERC20 public immutable depositToken; // USDC/USDT/ETH
    IAutoYieldToken public immutable autoYieldToken;
    IPyth public immutable pyth;
    IYieldOracle public yieldOracle;

    uint256 public totalDeposits;
    uint256 public totalShares;
    uint256 public lastRebalanceTime;
    
    mapping(address => uint256) public userShares;
    mapping(address => AgentAuthorization) public agentAuthorizations;
    mapping(uint16 => ChainAllocation) public chainAllocations;
    uint16[] public activeChains;

    // Price Feed IDs (Pyth)
    bytes32 public immutable ETH_PRICE_ID;
    bytes32 public immutable USDC_PRICE_ID;

    // Emergency Controls
    bool public paused;
    bool public emergencyMode;

    /**
     * @notice Initialize the HedgePod Vault
     * @param _depositToken Address of the deposit token (USDC/USDT/ETH)
     * @param _autoYieldToken Address of the AutoYield token (LayerZero OFT)
     * @param _pyth Address of the Pyth oracle
     * @param _ethPriceId Pyth price ID for ETH/USD
     * @param _usdcPriceId Pyth price ID for USDC/USD
     */
    constructor(
        address _depositToken,
        address _autoYieldToken,
        address _pyth,
        bytes32 _ethPriceId,
        bytes32 _usdcPriceId
    ) {
        require(_depositToken != address(0), "Invalid deposit token");
        require(_autoYieldToken != address(0), "Invalid AutoYield token");
        require(_pyth != address(0), "Invalid Pyth oracle");

        depositToken = IERC20(_depositToken);
        autoYieldToken = IAutoYieldToken(_autoYieldToken);
        pyth = IPyth(_pyth);
        ETH_PRICE_ID = _ethPriceId;
        USDC_PRICE_ID = _usdcPriceId;

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    /**
     * @notice Deposit tokens into the vault
     * @param amount Amount of tokens to deposit
     * @return shares Amount of shares minted
     */
    function deposit(uint256 amount) 
        public 
        override 
        nonReentrant 
        whenNotPaused 
        returns (uint256 shares) 
    {
        require(amount > 0, "Amount must be > 0");

        // Calculate shares to mint
        shares = totalShares == 0 
            ? amount 
            : (amount * totalShares) / totalDeposits;

        // Transfer tokens from user
        depositToken.safeTransferFrom(msg.sender, address(this), amount);

        // Update state
        totalDeposits += amount;
        totalShares += shares;
        userShares[msg.sender] += shares;

        // Mint AutoYield tokens (1:1 with shares)
        // Note: Assumes AutoYieldToken has mint permission
        
        emit Deposit(msg.sender, amount, shares);
    }

    /**
     * @notice Deposit with World ID verification for sybil resistance
     * @param amount Amount to deposit
     * @param root Merkle root
     * @param nullifierHash Unique nullifier
     * @param proof zkProof array
     */
    function depositWithWorldID(
        uint256 amount,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) external override nonReentrant whenNotPaused returns (uint256 shares) {
        // World ID verification would go here
        // For now, call standard deposit
        // TODO: Integrate @worldcoin/world-id-contracts
        
        return deposit(amount);
    }

    /**
     * @notice Withdraw tokens from vault
     * @param shares Amount of shares to burn
     * @return amount Amount of tokens withdrawn
     */
    function withdraw(uint256 shares) 
        public 
        override 
        nonReentrant 
        returns (uint256 amount) 
    {
        require(shares > 0, "Shares must be > 0");
        require(userShares[msg.sender] >= shares, "Insufficient shares");

        // Calculate withdrawal amount
        amount = (shares * totalDeposits) / totalShares;

        // Update state
        totalDeposits -= amount;
        totalShares -= shares;
        userShares[msg.sender] -= shares;

        // Transfer tokens to user
        depositToken.safeTransfer(msg.sender, amount);

        emit Withdraw(msg.sender, amount, shares);
    }

    /**
     * @notice Withdraw to specific chain using EIL SDK
     * @param shares Amount of shares to burn
     * @param targetChain Target chain ID
     */
    function withdrawToChain(uint256 shares, uint16 targetChain) 
        external 
        override 
        nonReentrant 
        returns (uint256 amount) 
    {
        // Standard withdrawal first
        amount = withdraw(shares);
        
        // Cross-chain transfer would be initiated here
        // TODO: Integrate EIL SDK for L2 abstraction
        
        return amount;
    }

    /**
     * @notice Rebalance funds to higher APR chain
     * @param targetChain Target chain ID
     * @param priceUpdate Pyth price update data
     */
    function rebalance(uint16 targetChain, bytes[] calldata priceUpdate) 
        external 
        override 
        onlyRole(REBALANCER_ROLE) 
        nonReentrant 
    {
        require(!paused, "Contract paused");
        require(
            block.timestamp >= lastRebalanceTime + REBALANCE_COOLDOWN,
            "Cooldown not elapsed"
        );

        // Update Pyth prices
        uint256 fee = pyth.getUpdateFee(priceUpdate);
        pyth.updatePriceFeeds{value: fee}(priceUpdate);

        // Get current and target APRs
        uint256 currentAPR = getCurrentAPR();
        uint256 targetAPR = calculateAPR(targetChain);

        require(
            targetAPR > currentAPR + MIN_APR_DELTA,
            "Insufficient APR improvement"
        );

        // Execute rebalance via LayerZero
        _executeRebalance(targetChain, totalDeposits / 2); // Rebalance 50% for safety

        lastRebalanceTime = block.timestamp;
        
        emit Rebalance(targetChain, totalDeposits / 2, block.timestamp);
    }

    /**
     * @notice Rebalance with x402 authorization (CDP)
     * @param targetChain Target chain
     * @param amount Amount to rebalance
     * @param authorization Authorization signature
     */
    function rebalanceWithAuthorization(
        uint16 targetChain,
        uint256 amount,
        bytes calldata authorization
    ) external override nonReentrant {
        AgentAuthorization storage auth = agentAuthorizations[msg.sender];
        
        require(auth.active, "Agent not authorized");
        require(auth.expiresAt > block.timestamp, "Authorization expired");
        require(amount <= auth.spendingLimit, "Exceeds spending limit");

        // Verify x402 authorization signature
        // TODO: Implement CDP x402 verification

        _executeRebalance(targetChain, amount);
        
        emit Rebalance(targetChain, amount, block.timestamp);
    }

    /**
     * @notice Authorize agent wallet with spending limit
     * @param agent Agent address
     * @param limit Spending limit
     * @param duration Authorization duration
     */
    function authorizeAgent(
        address agent,
        uint256 limit,
        uint256 duration
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        uint256 expiresAt = block.timestamp + duration;
        
        agentAuthorizations[agent] = AgentAuthorization({
            agent: agent,
            spendingLimit: limit,
            expiresAt: expiresAt,
            active: true
        });

        _grantRole(AGENT_ROLE, agent);
        _grantRole(REBALANCER_ROLE, agent);

        emit AgentAuthorized(agent, limit, expiresAt);
    }

    // ========== INTERNAL FUNCTIONS ==========

    /**
     * @dev Execute cross-chain rebalance
     */
    function _executeRebalance(uint16 targetChain, uint256 amount) internal {
        // This would integrate with LayerZero for cross-chain transfer
        // TODO: Call AutoYieldToken.sendWithAPRCheck()
        
        // Update chain allocation
        chainAllocations[targetChain] = ChainAllocation({
            chainId: targetChain,
            amount: amount,
            apr: calculateAPR(targetChain),
            lastUpdate: block.timestamp
        });
    }

    // ========== VIEW FUNCTIONS ==========

    function totalAssets() external view override returns (uint256) {
        return totalDeposits;
    }

    function getUserShares(address user) external view override returns (uint256) {
        return userShares[user];
    }

    function getChainAllocations() external view override returns (ChainAllocation[] memory) {
        ChainAllocation[] memory allocations = new ChainAllocation[](activeChains.length);
        for (uint256 i = 0; i < activeChains.length; i++) {
            allocations[i] = chainAllocations[activeChains[i]];
        }
        return allocations;
    }

    function calculateAPR(uint16 chainId) public view override returns (uint256) {
        // Get price data from Pyth
        PythStructs.Price memory ethPrice = pyth.getPriceNoOlderThan(ETH_PRICE_ID, 60);
        PythStructs.Price memory usdcPrice = pyth.getPriceNoOlderThan(USDC_PRICE_ID, 60);

        // Calculate APR based on chain liquidity and price data
        // This is simplified - real implementation would query DeFi protocols
        uint256 baseAPR = 500; // 5% base
        uint256 volatilityBonus = calculateVolatilityBonus(ethPrice.price, usdcPrice.price);
        
        return baseAPR + volatilityBonus;
    }

    function getCurrentAPR() public view returns (uint256) {
        // Get current chain APR
        // For simplicity, return weighted average
        if (activeChains.length == 0) return 0;
        
        uint256 totalAPR = 0;
        for (uint256 i = 0; i < activeChains.length; i++) {
            totalAPR += chainAllocations[activeChains[i]].apr;
        }
        
        return totalAPR / activeChains.length;
    }

    function calculateVolatilityBonus(int64 ethPrice, int64 usdcPrice) 
        internal 
        pure 
        returns (uint256) 
    {
        // Simplified volatility calculation
        // Real implementation would use historical data
        return 50; // 0.5% bonus
    }

    // ========== ADMIN FUNCTIONS ==========

    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        paused = true;
    }

    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        paused = false;
    }

    function setYieldOracle(address _yieldOracle) external onlyRole(DEFAULT_ADMIN_ROLE) {
        yieldOracle = IYieldOracle(_yieldOracle);
    }

    // ========== MODIFIERS ==========

    modifier whenNotPaused() {
        require(!paused, "Contract is paused");
        _;
    }

    // Required for Pyth price updates
    receive() external payable {}
}

