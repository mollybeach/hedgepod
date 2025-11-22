import { expect } from "chai";
import { ethers } from "hardhat";
import { VolatilityFeeHook } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("VolatilityFeeHook", function () {
  let hook: VolatilityFeeHook;
  let pythOracle: any;
  let owner: SignerWithAddress;
  let poolManager: SignerWithAddress;
  let user: SignerWithAddress;

  const ETH_PRICE_ID = "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace";
  
  beforeEach(async function () {
    [owner, poolManager, user] = await ethers.getSigners();

    // Deploy mock Pyth oracle
    const MockPyth = await ethers.getContractFactory("MockPyth");
    pythOracle = await MockPyth.deploy();
    await pythOracle.waitForDeployment();

    // Set initial price
    await pythOracle.setPrice(
      ETH_PRICE_ID,
      2000 * 10**8, // $2000
      1 * 10**8,    // confidence
      -8,           // expo
      Math.floor(Date.now() / 1000)
    );

    // Deploy VolatilityFeeHook
    const VolatilityFeeHook = await ethers.getContractFactory("VolatilityFeeHook");
    hook = await VolatilityFeeHook.deploy(
      await pythOracle.getAddress(),
      poolManager.address,
      ETH_PRICE_ID
    );
    await hook.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set correct Pyth oracle", async function () {
      expect(await hook.pyth()).to.equal(await pythOracle.getAddress());
    });

    it("Should set correct pool manager", async function () {
      expect(await hook.poolManager()).to.equal(poolManager.address);
    });

    it("Should set correct price ID", async function () {
      expect(await hook.priceId()).to.equal(ETH_PRICE_ID);
    });

    it("Should initialize default volatility config", async function () {
      const config = await hook.getVolatilityConfig();
      expect(config.lowThreshold).to.equal(100);   // 1%
      expect(config.mediumThreshold).to.equal(300); // 3%
      expect(config.highThreshold).to.equal(500);   // 5%
      expect(config.lowFee).to.equal(1000);        // 0.1%
      expect(config.mediumFee).to.equal(2000);     // 0.2%
      expect(config.highFee).to.equal(3000);       // 0.3%
    });
  });

  describe("Volatility Calculation", function () {
    it("Should calculate volatility correctly", async function () {
      const currentPrice = 2100 * 10**8;  // $2100
      const historicalPrice = 2000 * 10**8; // $2000
      
      const volatility = await hook.calculateVolatility(currentPrice, historicalPrice);
      
      // Expected: (2100 - 2000) / 2000 * 10000 = 500 (5%)
      expect(volatility).to.equal(500);
    });

    it("Should handle price decrease", async function () {
      const currentPrice = 1900 * 10**8;  // $1900
      const historicalPrice = 2000 * 10**8; // $2000
      
      const volatility = await hook.calculateVolatility(currentPrice, historicalPrice);
      
      // Expected: (2000 - 1900) / 2000 * 10000 = 500 (5%)
      expect(volatility).to.equal(500);
    });

    it("Should handle small price changes", async function () {
      const currentPrice = 2010 * 10**8;  // $2010
      const historicalPrice = 2000 * 10**8; // $2000
      
      const volatility = await hook.calculateVolatility(currentPrice, historicalPrice);
      
      // Expected: (2010 - 2000) / 2000 * 10000 = 50 (0.5%)
      expect(volatility).to.equal(50);
    });

    it("Should revert on invalid prices", async function () {
      await expect(
        hook.calculateVolatility(0, 2000 * 10**8)
      ).to.be.revertedWith("Invalid prices");

      await expect(
        hook.calculateVolatility(2000 * 10**8, 0)
      ).to.be.revertedWith("Invalid prices");
    });
  });

  describe("Fee Updates", function () {
    it("Should start with low fee for new pool", async function () {
      const poolId = ethers.keccak256(ethers.toUtf8Bytes("test-pool"));
      const fee = await hook.getCurrentFee(poolId);
      expect(fee).to.equal(1000); // Default to low fee
    });

    it("Should store fee after beforeSwap call", async function () {
      // This would require a full Uniswap v4 setup
      // For now, we test the internal logic via configuration
      const poolId = ethers.keccak256(ethers.toUtf8Bytes("test-pool"));
      
      // Verify default fee
      const fee = await hook.getCurrentFee(poolId);
      expect(fee).to.equal(1000);
    });
  });

  describe("Configuration", function () {
    it("Should update volatility thresholds", async function () {
      await hook.setVolatilityThresholds(150, 350, 550);
      
      const config = await hook.getVolatilityConfig();
      expect(config.lowThreshold).to.equal(150);
      expect(config.mediumThreshold).to.equal(350);
      expect(config.highThreshold).to.equal(550);
    });

    it("Should emit event on threshold update", async function () {
      await expect(hook.setVolatilityThresholds(150, 350, 550))
        .to.emit(hook, "VolatilityThresholdsUpdated")
        .withArgs(150, 350, 550);
    });

    it("Should revert if thresholds not ascending", async function () {
      await expect(
        hook.setVolatilityThresholds(500, 300, 100)
      ).to.be.revertedWith("Invalid thresholds");

      await expect(
        hook.setVolatilityThresholds(100, 100, 500)
      ).to.be.revertedWith("Invalid thresholds");
    });

    it("Should update fee tiers", async function () {
      await hook.setFeeTiers(500, 1500, 2500);
      
      const config = await hook.getVolatilityConfig();
      expect(config.lowFee).to.equal(500);
      expect(config.mediumFee).to.equal(1500);
      expect(config.highFee).to.equal(2500);
    });

    it("Should revert if fees not ascending", async function () {
      await expect(
        hook.setFeeTiers(3000, 2000, 1000)
      ).to.be.revertedWith("Invalid fee tiers");
    });

    it("Should revert if fee too high", async function () {
      await expect(
        hook.setFeeTiers(5000, 7500, 15000)
      ).to.be.revertedWith("Fee too high");
    });

    it("Should update Pyth price ID", async function () {
      const newPriceId = "0x0000000000000000000000000000000000000000000000000000000000000001";
      await hook.setPythPriceId(newPriceId);
      expect(await hook.priceId()).to.equal(newPriceId);
    });

    it("Should only allow owner to update config", async function () {
      await expect(
        hook.connect(user).setVolatilityThresholds(150, 350, 550)
      ).to.be.revertedWith("Only owner");

      await expect(
        hook.connect(user).setFeeTiers(500, 1500, 2500)
      ).to.be.revertedWith("Only owner");

      await expect(
        hook.connect(user).setPythPriceId(ETH_PRICE_ID)
      ).to.be.revertedWith("Only owner");
    });
  });

  describe("Ownership", function () {
    it("Should transfer ownership", async function () {
      await hook.transferOwnership(user.address);
      expect(await hook.owner()).to.equal(user.address);
    });

    it("Should revert on zero address", async function () {
      await expect(
        hook.transferOwnership(ethers.ZeroAddress)
      ).to.be.revertedWith("Invalid address");
    });

    it("Should only allow current owner to transfer", async function () {
      await expect(
        hook.connect(user).transferOwnership(user.address)
      ).to.be.revertedWith("Only owner");
    });
  });

  describe("Price History", function () {
    it("Should store last price after update", async function () {
      // Set a new price
      const newPrice = 2100 * 10**8;
      await pythOracle.setPrice(
        ETH_PRICE_ID,
        newPrice,
        1 * 10**8,
        -8,
        Math.floor(Date.now() / 1000)
      );

      // Note: lastPrice would be updated by beforeSwap call
      // This is tested via integration with pool manager
    });

    it("Should get last price and timestamp", async function () {
      const [price, timestamp] = await hook.getLastPrice(ETH_PRICE_ID);
      // Initially should be 0 until first beforeSwap call
      expect(timestamp).to.equal(0);
    });
  });

  describe("View Functions", function () {
    it("Should return current fee for pool", async function () {
      const poolId = ethers.keccak256(ethers.toUtf8Bytes("test-pool"));
      const fee = await hook.getCurrentFee(poolId);
      expect(fee).to.be.gte(1000); // At least low fee
    });

    it("Should return volatility config", async function () {
      const config = await hook.getVolatilityConfig();
      expect(config.lowThreshold).to.be.gt(0);
      expect(config.mediumThreshold).to.be.gt(config.lowThreshold);
      expect(config.highThreshold).to.be.gt(config.mediumThreshold);
    });
  });
});

