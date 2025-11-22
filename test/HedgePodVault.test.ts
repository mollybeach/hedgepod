import { expect } from "chai";
import { ethers } from "hardhat";
import { HedgePodVault, AutoYieldToken, YieldOracle } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("HedgePodVault", function () {
  let vault: HedgePodVault;
  let autoYieldToken: AutoYieldToken;
  let yieldOracle: YieldOracle;
  let depositToken: any;
  let pythOracle: any;
  
  let owner: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;
  let agent: SignerWithAddress;

  // Pyth price IDs (example)
  const ETH_PRICE_ID = "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace";
  const USDC_PRICE_ID = "0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a";

  beforeEach(async function () {
    [owner, user1, user2, agent] = await ethers.getSigners();

    // Deploy mock deposit token (USDC)
    const MockERC20 = await ethers.getContractFactory("MockERC20");
    depositToken = await MockERC20.deploy("Mock USDC", "USDC", 6);
    await depositToken.waitForDeployment();

    // Deploy mock Pyth oracle
    const MockPyth = await ethers.getContractFactory("MockPyth");
    pythOracle = await MockPyth.deploy();
    await pythOracle.waitForDeployment();

    // Deploy mock Chainlink oracle
    const MockChainlink = await ethers.getContractFactory("MockChainlink");
    const chainlinkOracle = await MockChainlink.deploy();
    await chainlinkOracle.waitForDeployment();

    // Deploy YieldOracle
    const YieldOracle = await ethers.getContractFactory("YieldOracle");
    yieldOracle = await YieldOracle.deploy(
      await pythOracle.getAddress(),
      await chainlinkOracle.getAddress()
    );
    await yieldOracle.waitForDeployment();

    // Deploy AutoYieldToken
    const AutoYieldToken = await ethers.getContractFactory("AutoYieldToken");
    autoYieldToken = await AutoYieldToken.deploy(
      owner.address, // Mock LayerZero endpoint
      100 // 1% APR threshold
    );
    await autoYieldToken.waitForDeployment();

    // Deploy HedgePodVault
    const HedgePodVault = await ethers.getContractFactory("HedgePodVault");
    vault = await HedgePodVault.deploy(
      await depositToken.getAddress(),
      await autoYieldToken.getAddress(),
      await pythOracle.getAddress(),
      ETH_PRICE_ID,
      USDC_PRICE_ID
    );
    await vault.waitForDeployment();

    // Setup: Mint tokens to users
    await depositToken.mint(user1.address, ethers.parseUnits("1000", 6));
    await depositToken.mint(user2.address, ethers.parseUnits("1000", 6));

    // Setup: Grant MINTER_ROLE to vault
    const MINTER_ROLE = await autoYieldToken.MINTER_ROLE();
    await autoYieldToken.grantRole(MINTER_ROLE, await vault.getAddress());

    // Setup: Set yield oracle in vault
    await vault.setYieldOracle(await yieldOracle.getAddress());
  });

  describe("Deposits", function () {
    it("Should accept USDC deposits", async function () {
      const depositAmount = ethers.parseUnits("100", 6);
      
      await depositToken.connect(user1).approve(await vault.getAddress(), depositAmount);
      await vault.connect(user1).deposit(depositAmount);

      expect(await vault.totalDeposits()).to.equal(depositAmount);
      expect(await vault.getUserShares(user1.address)).to.be.gt(0);
    });

    it("Should mint AutoYield tokens 1:1 on first deposit", async function () {
      const depositAmount = ethers.parseUnits("100", 6);
      
      await depositToken.connect(user1).approve(await vault.getAddress(), depositAmount);
      await vault.connect(user1).deposit(depositAmount);

      const shares = await vault.getUserShares(user1.address);
      expect(shares).to.equal(depositAmount);
    });

    it("Should calculate proportional shares for subsequent deposits", async function () {
      // First deposit
      const firstDeposit = ethers.parseUnits("100", 6);
      await depositToken.connect(user1).approve(await vault.getAddress(), firstDeposit);
      await vault.connect(user1).deposit(firstDeposit);

      // Second deposit
      const secondDeposit = ethers.parseUnits("50", 6);
      await depositToken.connect(user2).approve(await vault.getAddress(), secondDeposit);
      await vault.connect(user2).deposit(secondDeposit);

      const user2Shares = await vault.getUserShares(user2.address);
      expect(user2Shares).to.equal(secondDeposit); // Still 1:1 in this case
    });

    it("Should revert on zero amount deposit", async function () {
      await expect(
        vault.connect(user1).deposit(0)
      ).to.be.revertedWith("Amount must be > 0");
    });

    it("Should emit Deposit event", async function () {
      const depositAmount = ethers.parseUnits("100", 6);
      
      await depositToken.connect(user1).approve(await vault.getAddress(), depositAmount);
      
      await expect(vault.connect(user1).deposit(depositAmount))
        .to.emit(vault, "Deposit")
        .withArgs(user1.address, depositAmount, depositAmount);
    });
  });

  describe("Withdrawals", function () {
    beforeEach(async function () {
      // Setup: User1 deposits 100 USDC
      const depositAmount = ethers.parseUnits("100", 6);
      await depositToken.connect(user1).approve(await vault.getAddress(), depositAmount);
      await vault.connect(user1).deposit(depositAmount);
    });

    it("Should allow users to withdraw their shares", async function () {
      const shares = await vault.getUserShares(user1.address);
      const initialBalance = await depositToken.balanceOf(user1.address);

      await vault.connect(user1).withdraw(shares);

      const finalBalance = await depositToken.balanceOf(user1.address);
      expect(finalBalance).to.be.gt(initialBalance);
      expect(await vault.getUserShares(user1.address)).to.equal(0);
    });

    it("Should revert if user has insufficient shares", async function () {
      const shares = await vault.getUserShares(user1.address);
      
      await expect(
        vault.connect(user1).withdraw(shares + 1n)
      ).to.be.revertedWith("Insufficient shares");
    });

    it("Should emit Withdraw event", async function () {
      const shares = await vault.getUserShares(user1.address);
      
      await expect(vault.connect(user1).withdraw(shares))
        .to.emit(vault, "Withdraw");
    });
  });

  describe("Agent Authorization", function () {
    it("Should authorize agent with spending limit", async function () {
      const spendingLimit = ethers.parseUnits("1000", 6);
      const duration = 7 * 24 * 60 * 60; // 7 days

      await vault.connect(owner).authorizeAgent(
        agent.address,
        spendingLimit,
        duration
      );

      const authorization = await vault.agentAuthorizations(agent.address);
      expect(authorization.active).to.be.true;
      expect(authorization.spendingLimit).to.equal(spendingLimit);
    });

    it("Should grant AGENT_ROLE and REBALANCER_ROLE", async function () {
      const spendingLimit = ethers.parseUnits("1000", 6);
      const duration = 7 * 24 * 60 * 60;

      await vault.connect(owner).authorizeAgent(
        agent.address,
        spendingLimit,
        duration
      );

      const AGENT_ROLE = await vault.AGENT_ROLE();
      const REBALANCER_ROLE = await vault.REBALANCER_ROLE();

      expect(await vault.hasRole(AGENT_ROLE, agent.address)).to.be.true;
      expect(await vault.hasRole(REBALANCER_ROLE, agent.address)).to.be.true;
    });

    it("Should emit AgentAuthorized event", async function () {
      const spendingLimit = ethers.parseUnits("1000", 6);
      const duration = 7 * 24 * 60 * 60;

      await expect(
        vault.connect(owner).authorizeAgent(agent.address, spendingLimit, duration)
      ).to.emit(vault, "AgentAuthorized");
    });
  });

  describe("Rebalancing", function () {
    beforeEach(async function () {
      // Setup: User1 deposits 100 USDC
      const depositAmount = ethers.parseUnits("100", 6);
      await depositToken.connect(user1).approve(await vault.getAddress(), depositAmount);
      await vault.connect(user1).deposit(depositAmount);

      // Setup: Authorize agent
      const spendingLimit = ethers.parseUnits("1000", 6);
      const duration = 7 * 24 * 60 * 60;
      await vault.connect(owner).authorizeAgent(agent.address, spendingLimit, duration);

      // Setup: Update APRs in oracle
      await yieldOracle.updateAPR(1, 500); // 5% on current chain
      await yieldOracle.updateAPR(2, 700); // 7% on target chain
    });

    it("Should allow rebalance to higher APR chain", async function () {
      const targetChain = 2;
      const priceUpdate = []; // Empty for mock

      await expect(
        vault.connect(agent).rebalance(targetChain, priceUpdate)
      ).to.emit(vault, "Rebalance");
    });

    it("Should revert if APR improvement insufficient", async function () {
      // Update target chain to lower APR
      await yieldOracle.updateAPR(2, 550); // Only 0.5% improvement

      const targetChain = 2;
      const priceUpdate = [];

      await expect(
        vault.connect(agent).rebalance(targetChain, priceUpdate)
      ).to.be.revertedWith("Insufficient APR improvement");
    });

    it("Should enforce rebalance cooldown", async function () {
      const targetChain = 2;
      const priceUpdate = [];

      // First rebalance
      await vault.connect(agent).rebalance(targetChain, priceUpdate);

      // Immediate second rebalance should fail
      await expect(
        vault.connect(agent).rebalance(targetChain, priceUpdate)
      ).to.be.revertedWith("Cooldown not elapsed");
    });

    it("Should only allow REBALANCER_ROLE", async function () {
      const targetChain = 2;
      const priceUpdate = [];

      await expect(
        vault.connect(user1).rebalance(targetChain, priceUpdate)
      ).to.be.reverted;
    });
  });

  describe("View Functions", function () {
    it("Should return total assets", async function () {
      const depositAmount = ethers.parseUnits("100", 6);
      await depositToken.connect(user1).approve(await vault.getAddress(), depositAmount);
      await vault.connect(user1).deposit(depositAmount);

      expect(await vault.totalAssets()).to.equal(depositAmount);
    });

    it("Should return user shares", async function () {
      const depositAmount = ethers.parseUnits("100", 6);
      await depositToken.connect(user1).approve(await vault.getAddress(), depositAmount);
      await vault.connect(user1).deposit(depositAmount);

      const shares = await vault.getUserShares(user1.address);
      expect(shares).to.equal(depositAmount);
    });

    it("Should calculate APR for chain", async function () {
      const apr = await vault.calculateAPR(1);
      expect(apr).to.be.gt(0);
    });
  });

  describe("Emergency Controls", function () {
    it("Should allow owner to pause contract", async function () {
      await vault.connect(owner).pause();

      const depositAmount = ethers.parseUnits("100", 6);
      await depositToken.connect(user1).approve(await vault.getAddress(), depositAmount);
      
      await expect(
        vault.connect(user1).deposit(depositAmount)
      ).to.be.revertedWith("Contract is paused");
    });

    it("Should allow owner to unpause contract", async function () {
      await vault.connect(owner).pause();
      await vault.connect(owner).unpause();

      const depositAmount = ethers.parseUnits("100", 6);
      await depositToken.connect(user1).approve(await vault.getAddress(), depositAmount);
      
      await expect(vault.connect(user1).deposit(depositAmount)).to.not.be.reverted;
    });
  });
});

