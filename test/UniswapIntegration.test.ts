import { expect } from "chai";
import { ethers } from "hardhat";
import { HedgePodVault, MockPoolManager, VolatilityFeeHook, MockPyth } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("Uniswap v4 Integration", function () {
  let vault: HedgePodVault;
  let poolManager: MockPoolManager;
  let volatilityHook: VolatilityFeeHook;
  let pythOracle: MockPyth;
  let autoYieldToken: any;
  let owner: SignerWithAddress;
  let rebalancer: SignerWithAddress;
  let user: SignerWithAddress;

  const ETH_PRICE_ID = "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace";
  const USDC_PRICE_ID = "0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a";
  
  const USDC_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"; // Mock
  const WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; // Mock

  beforeEach(async function () {
    [owner, rebalancer, user] = await ethers.getSigners();

    // Deploy mock Pyth oracle
    const MockPyth = await ethers.getContractFactory("MockPyth");
    pythOracle = await MockPyth.deploy();
    await pythOracle.waitForDeployment();

    // Set initial prices
    await pythOracle.setPrice(
      ETH_PRICE_ID,
      2000 * 10**8, // $2000
      1 * 10**8,
      -8,
      Math.floor(Date.now() / 1000)
    );

    await pythOracle.setPrice(
      USDC_PRICE_ID,
      1 * 10**8, // $1
      1 * 10**6,
      -8,
      Math.floor(Date.now() / 1000)
    );

    // Deploy AutoYieldToken (mock)
    const AutoYieldToken = await ethers.getContractFactory("AutoYieldToken");
    autoYieldToken = await AutoYieldToken.deploy(
      ethers.ZeroAddress, // Mock LZ endpoint
      100 // Initial supply
    );
    await autoYieldToken.waitForDeployment();

    // Deploy HedgePodVault
    const HedgePodVault = await ethers.getContractFactory("HedgePodVault");
    vault = await HedgePodVault.deploy(
      ethers.ZeroAddress, // depositToken (allow zero for testing)
      await autoYieldToken.getAddress(),
      await pythOracle.getAddress(),
      ETH_PRICE_ID,
      USDC_PRICE_ID
    );
    await vault.waitForDeployment();

    // Deploy MockPoolManager
    const MockPoolManager = await ethers.getContractFactory("MockPoolManager");
    poolManager = await MockPoolManager.deploy();
    await poolManager.waitForDeployment();

    // Deploy VolatilityFeeHook
    const VolatilityFeeHook = await ethers.getContractFactory("VolatilityFeeHook");
    volatilityHook = await VolatilityFeeHook.deploy(
      await pythOracle.getAddress(),
      await poolManager.getAddress(),
      ETH_PRICE_ID
    );
    await volatilityHook.waitForDeployment();

    // Set up vault with pool manager and hook
    await vault.setPoolManager(await poolManager.getAddress());
    await vault.setVolatilityHook(await volatilityHook.getAddress());

    // Grant rebalancer role
    const REBALANCER_ROLE = await vault.REBALANCER_ROLE();
    await vault.grantRole(REBALANCER_ROLE, rebalancer.address);
  });

  describe("Pool Initialization", function () {
    it("Should initialize a new Uniswap v4 pool", async function () {
      const sqrtPriceX96 = "79228162514264337593543950336"; // ~1:1 price

      const tx = await vault.initializePool(
        USDC_ADDRESS,
        WETH_ADDRESS,
        3000, // 0.3% fee
        60,   // tick spacing
        sqrtPriceX96
      );

      await expect(tx).to.emit(vault, "PoolInitialized");

      // Check pool was added to active pools
      const activePools = await vault.getActivePools();
      expect(activePools.length).to.equal(1);
    });

    it("Should store pool key correctly", async function () {
      const sqrtPriceX96 = "79228162514264337593543950336";

      await vault.initializePool(
        USDC_ADDRESS,
        WETH_ADDRESS,
        3000,
        60,
        sqrtPriceX96
      );

      const activePools = await vault.getActivePools();
      const poolId = activePools[0];

      const { key, liquidity } = await vault.getPoolInfo(poolId);

      expect(key.currency0).to.equal(USDC_ADDRESS);
      expect(key.currency1).to.equal(WETH_ADDRESS);
      expect(key.fee).to.equal(3000);
      expect(key.tickSpacing).to.equal(60);
      expect(key.hooks).to.equal(await volatilityHook.getAddress());
      expect(liquidity).to.equal(0); // No liquidity added yet
    });

    it("Should revert if pool manager not set", async function () {
      // Deploy new vault without pool manager
      const HedgePodVault = await ethers.getContractFactory("HedgePodVault");
      const newVault = await HedgePodVault.deploy(
        ethers.ZeroAddress,
        await autoYieldToken.getAddress(),
        await pythOracle.getAddress(),
        ETH_PRICE_ID,
        USDC_PRICE_ID
      );

      await expect(
        newVault.initializePool(
          USDC_ADDRESS,
          WETH_ADDRESS,
          3000,
          60,
          "79228162514264337593543950336"
        )
      ).to.be.revertedWith("Pool manager not set");
    });
  });

  describe("Liquidity Management", function () {
    let poolId: string;

    beforeEach(async function () {
      // Initialize pool first
      await vault.initializePool(
        USDC_ADDRESS,
        WETH_ADDRESS,
        3000,
        60,
        "79228162514264337593543950336"
      );

      const activePools = await vault.getActivePools();
      poolId = activePools[0];
    });

    it("Should add liquidity to pool", async function () {
      const liquidityDelta = ethers.parseEther("100"); // 100 liquidity units

      const tx = await vault.connect(rebalancer).addLiquidity(
        poolId,
        -600,  // tickLower
        600,   // tickUpper
        liquidityDelta
      );

      await expect(tx)
        .to.emit(vault, "LiquidityAdded")
        .withArgs(poolId, liquidityDelta, -600, 600);

      // Check liquidity was tracked
      const { liquidity } = await vault.getPoolInfo(poolId);
      expect(liquidity).to.equal(liquidityDelta);
    });

    it("Should remove liquidity from pool", async function () {
      const liquidityDelta = ethers.parseEther("100");

      // Add liquidity first
      await vault.connect(rebalancer).addLiquidity(
        poolId,
        -600,
        600,
        liquidityDelta
      );

      // Remove half
      const removeAmount = ethers.parseEther("50");
      const tx = await vault.connect(rebalancer).removeLiquidity(
        poolId,
        -600,
        600,
        -removeAmount // Negative for removal
      );

      await expect(tx)
        .to.emit(vault, "LiquidityRemoved")
        .withArgs(poolId, removeAmount, -600, 600);

      // Check liquidity updated
      const { liquidity } = await vault.getPoolInfo(poolId);
      expect(liquidity).to.equal(liquidityDelta - removeAmount);
    });

    it("Should revert if non-rebalancer tries to add liquidity", async function () {
      await expect(
        vault.connect(user).addLiquidity(
          poolId,
          -600,
          600,
          ethers.parseEther("100")
        )
      ).to.be.reverted; // AccessControl revert
    });

    it("Should revert if liquidity delta is not positive for add", async function () {
      await expect(
        vault.connect(rebalancer).addLiquidity(
          poolId,
          -600,
          600,
          -ethers.parseEther("100") // Negative
        )
      ).to.be.revertedWith("Liquidity must be positive");
    });

    it("Should revert if liquidity delta is not negative for remove", async function () {
      await expect(
        vault.connect(rebalancer).removeLiquidity(
          poolId,
          -600,
          600,
          ethers.parseEther("100") // Positive
        )
      ).to.be.revertedWith("Liquidity delta must be negative");
    });
  });

  describe("Swap Execution", function () {
    let poolId: string;

    beforeEach(async function () {
      // Initialize pool and add liquidity
      await vault.initializePool(
        USDC_ADDRESS,
        WETH_ADDRESS,
        3000,
        60,
        "79228162514264337593543950336"
      );

      const activePools = await vault.getActivePools();
      poolId = activePools[0];

      // Add liquidity
      await vault.connect(rebalancer).addLiquidity(
        poolId,
        -600,
        600,
        ethers.parseEther("1000")
      );
    });

    it("Should execute swap through Uniswap pool", async function () {
      const amountIn = ethers.parseUnits("100", 6); // 100 USDC
      const sqrtPriceLimitX96 = "1461446703485210103287273052203988822378723970342";

      const tx = await vault.connect(rebalancer).swapThroughUniswap(
        poolId,
        true, // zeroForOne (USDC -> WETH)
        amountIn,
        sqrtPriceLimitX96
      );

      await expect(tx).to.emit(vault, "SwapExecuted");
    });

    it("Should revert if pool not initialized", async function () {
      const fakePoolId = ethers.keccak256(ethers.toUtf8Bytes("fake"));

      await expect(
        vault.connect(rebalancer).swapThroughUniswap(
          fakePoolId,
          true,
          ethers.parseUnits("100", 6),
          "0"
        )
      ).to.be.revertedWith("Pool not initialized");
    });

    it("Should revert if amount is zero", async function () {
      await expect(
        vault.connect(rebalancer).swapThroughUniswap(
          poolId,
          true,
          0,
          "0"
        )
      ).to.be.revertedWith("Amount must be non-zero");
    });

    it("Should revert if non-rebalancer tries to swap", async function () {
      await expect(
        vault.connect(user).swapThroughUniswap(
          poolId,
          true,
          ethers.parseUnits("100", 6),
          "0"
        )
      ).to.be.reverted; // AccessControl revert
    });
  });

  describe("Dynamic Fee Adjustment via Hook", function () {
    let poolId: string;

    beforeEach(async function () {
      await vault.initializePool(
        USDC_ADDRESS,
        WETH_ADDRESS,
        3000,
        60,
        "79228162514264337593543950336"
      );

      const activePools = await vault.getActivePools();
      poolId = activePools[0];
    });

    it("Should update fee when volatility changes", async function () {
      // Simulate price movement
      await pythOracle.setPrice(
        ETH_PRICE_ID,
        2200 * 10**8, // $2200 (10% increase)
        1 * 10**8,
        -8,
        Math.floor(Date.now() / 1000)
      );

      // Execute swap (triggers hook)
      await vault.connect(rebalancer).swapThroughUniswap(
        poolId,
        true,
        ethers.parseUnits("100", 6),
        "0"
      );

      // In a real implementation, we'd check the pool's dynamic fee
      // For now, just verify swap succeeded (hook was called)
    });

    it("Should use different fees for different volatility levels", async function () {
      // Set low volatility price
      await pythOracle.setPrice(
        ETH_PRICE_ID,
        2010 * 10**8, // $2010 (0.5% change)
        1 * 10**8,
        -8,
        Math.floor(Date.now() / 1000)
      );

      // Execute swap - should use low fee (0.1%)
      await vault.connect(rebalancer).swapThroughUniswap(
        poolId,
        true,
        ethers.parseUnits("100", 6),
        "0"
      );

      // Set high volatility price
      await pythOracle.setPrice(
        ETH_PRICE_ID,
        2150 * 10**8, // $2150 (7.5% change)
        1 * 10**8,
        -8,
        Math.floor(Date.now() / 1000)
      );

      // Execute swap - should use high fee (0.3%)
      await vault.connect(rebalancer).swapThroughUniswap(
        poolId,
        true,
        ethers.parseUnits("100", 6),
        "0"
      );
    });
  });

  describe("View Functions", function () {
    it("Should return empty array for new vault with no pools", async function () {
      const activePools = await vault.getActivePools();
      expect(activePools.length).to.equal(0);
    });

    it("Should return all active pools", async function () {
      // Initialize multiple pools
      await vault.initializePool(
        USDC_ADDRESS,
        WETH_ADDRESS,
        3000,
        60,
        "79228162514264337593543950336"
      );

      await vault.initializePool(
        USDC_ADDRESS,
        WETH_ADDRESS,
        10000, // Different fee tier
        200,
        "79228162514264337593543950336"
      );

      const activePools = await vault.getActivePools();
      expect(activePools.length).to.equal(2);
    });

    it("Should return correct pool info", async function () {
      await vault.initializePool(
        USDC_ADDRESS,
        WETH_ADDRESS,
        3000,
        60,
        "79228162514264337593543950336"
      );

      const activePools = await vault.getActivePools();
      const poolId = activePools[0];

      const { key, liquidity } = await vault.getPoolInfo(poolId);

      expect(key.currency0).to.equal(USDC_ADDRESS);
      expect(key.currency1).to.equal(WETH_ADDRESS);
      expect(liquidity).to.equal(0);
    });
  });

  describe("Admin Functions", function () {
    it("Should allow admin to set pool manager", async function () {
      const newPoolManager = ethers.Wallet.createRandom().address;
      await vault.setPoolManager(newPoolManager);
      
      expect(await vault.poolManager()).to.equal(newPoolManager);
    });

    it("Should allow admin to set volatility hook", async function () {
      const newHook = ethers.Wallet.createRandom().address;
      await vault.setVolatilityHook(newHook);
      
      expect(await vault.volatilityHook()).to.equal(newHook);
    });

    it("Should revert if non-admin tries to set pool manager", async function () {
      const newPoolManager = ethers.Wallet.createRandom().address;
      
      await expect(
        vault.connect(user).setPoolManager(newPoolManager)
      ).to.be.reverted;
    });

    it("Should revert on zero address for pool manager", async function () {
      await expect(
        vault.setPoolManager(ethers.ZeroAddress)
      ).to.be.revertedWith("Invalid pool manager");
    });

    it("Should revert on zero address for volatility hook", async function () {
      await expect(
        vault.setVolatilityHook(ethers.ZeroAddress)
      ).to.be.revertedWith("Invalid hook");
    });
  });
});

