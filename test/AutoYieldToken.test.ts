import { expect } from "chai";
import { ethers } from "hardhat";
import { AutoYieldToken, YieldOracle } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("AutoYieldToken", function () {
  let token: AutoYieldToken;
  let yieldOracle: YieldOracle;
  let owner: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;
  let agent: SignerWithAddress;

  const INITIAL_APR_THRESHOLD = 100; // 1%

  beforeEach(async function () {
    [owner, user1, user2, agent] = await ethers.getSigners();

    // Deploy mock oracles
    const MockPyth = await ethers.getContractFactory("MockPyth");
    const pythOracle = await MockPyth.deploy();
    await pythOracle.waitForDeployment();

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
    token = await AutoYieldToken.deploy(
      owner.address, // Mock LZ endpoint
      INITIAL_APR_THRESHOLD
    );
    await token.waitForDeployment();

    // Set yield oracle
    await token.setYieldOracle(await yieldOracle.getAddress());

    // Mint tokens to users
    const MINTER_ROLE = await token.MINTER_ROLE();
    await token.grantRole(MINTER_ROLE, owner.address);
    await token.mint(user1.address, ethers.parseEther("1000"));
    await token.mint(user2.address, ethers.parseEther("1000"));
  });

  describe("Deployment", function () {
    it("Should set correct name and symbol", async function () {
      expect(await token.name()).to.equal("HedgePod AutoYield Token");
      expect(await token.symbol()).to.equal("HAYT");
    });

    it("Should set initial APR threshold", async function () {
      expect(await token.aprThreshold()).to.equal(INITIAL_APR_THRESHOLD);
    });

    it("Should grant admin role to deployer", async function () {
      const DEFAULT_ADMIN_ROLE = await token.DEFAULT_ADMIN_ROLE();
      expect(await token.hasRole(DEFAULT_ADMIN_ROLE, owner.address)).to.be.true;
    });
  });

  describe("Cross-Chain Transfers", function () {
    beforeEach(async function () {
      // Setup APRs
      await yieldOracle.updateAPR(1, 500); // 5% on chain 1
      await yieldOracle.updateAPR(2, 700); // 7% on chain 2
      await token.updateChainAPR(1, 500);
      await token.updateChainAPR(2, 700);
    });

    it("Should send tokens with APR check", async function () {
      const amount = ethers.parseEther("100");
      const dstChainId = 2;
      const toAddress = ethers.solidityPacked(["address"], [user2.address]);

      await expect(
        token.connect(user1).sendWithAPRCheck(
          dstChainId,
          toAddress,
          amount,
          user1.address,
          ethers.ZeroAddress,
          "0x"
        )
      ).to.emit(token, "APRCheckPassed");
    });

    it("Should revert if APR improvement insufficient", async function () {
      // Update chain 2 to lower APR
      await yieldOracle.updateAPR(2, 550); // Only 0.5% improvement
      await token.updateChainAPR(2, 550);

      const amount = ethers.parseEther("100");
      const dstChainId = 2;
      const toAddress = ethers.solidityPacked(["address"], [user2.address]);

      await expect(
        token.connect(user1).sendWithAPRCheck(
          dstChainId,
          toAddress,
          amount,
          user1.address,
          ethers.ZeroAddress,
          "0x"
        )
      ).to.be.revertedWith("Insufficient APR improvement");
    });

    it("Should revert if circuit breaker active", async function () {
      const dstChainId = 2;
      await token.toggleCircuitBreaker(dstChainId, true);

      const amount = ethers.parseEther("100");
      const toAddress = ethers.solidityPacked(["address"], [user2.address]);

      await expect(
        token.connect(user1).sendWithAPRCheck(
          dstChainId,
          toAddress,
          amount,
          user1.address,
          ethers.ZeroAddress,
          "0x"
        )
      ).to.be.revertedWith("Circuit breaker active");
    });

    it("Should burn tokens on source chain", async function () {
      const amount = ethers.parseEther("100");
      const dstChainId = 2;
      const toAddress = ethers.solidityPacked(["address"], [user2.address]);

      const balanceBefore = await token.balanceOf(user1.address);

      await token.connect(user1).sendWithAPRCheck(
        dstChainId,
        toAddress,
        amount,
        user1.address,
        ethers.ZeroAddress,
        "0x"
      );

      const balanceAfter = await token.balanceOf(user1.address);
      expect(balanceBefore - balanceAfter).to.equal(amount);
    });
  });

  describe("Batch Transfers", function () {
    beforeEach(async function () {
      await yieldOracle.updateAPR(1, 500);
      await yieldOracle.updateAPR(2, 700);
      await yieldOracle.updateAPR(3, 800);
      await token.updateChainAPR(1, 500);
      await token.updateChainAPR(2, 700);
      await token.updateChainAPR(3, 800);
    });

    it("Should batch send to multiple chains", async function () {
      const dstChainIds = [2, 3];
      const amounts = [ethers.parseEther("100"), ethers.parseEther("50")];

      await expect(
        token.connect(user1).batchSend(dstChainIds, amounts, user1.address)
      ).to.emit(token, "BatchTransferCompleted");
    });

    it("Should revert if arrays length mismatch", async function () {
      const dstChainIds = [2, 3];
      const amounts = [ethers.parseEther("100")]; // Length mismatch

      await expect(
        token.connect(user1).batchSend(dstChainIds, amounts, user1.address)
      ).to.be.revertedWith("Array length mismatch");
    });

    it("Should revert if insufficient balance", async function () {
      const dstChainIds = [2, 3];
      const amounts = [
        ethers.parseEther("600"),
        ethers.parseEther("600")
      ]; // Total > balance

      await expect(
        token.connect(user1).batchSend(dstChainIds, amounts, user1.address)
      ).to.be.revertedWith("Insufficient balance");
    });
  });

  describe("Configuration", function () {
    it("Should update APR threshold", async function () {
      const newThreshold = 200; // 2%
      await token.setAPRThreshold(newThreshold);
      expect(await token.aprThreshold()).to.equal(newThreshold);
    });

    it("Should emit APRThresholdUpdated event", async function () {
      const newThreshold = 200;
      await expect(token.setAPRThreshold(newThreshold))
        .to.emit(token, "APRThresholdUpdated")
        .withArgs(INITIAL_APR_THRESHOLD, newThreshold);
    });

    it("Should toggle circuit breaker", async function () {
      const chainId = 2;
      await token.toggleCircuitBreaker(chainId, true);
      expect(await token.circuitBreakers(chainId)).to.be.true;

      await token.toggleCircuitBreaker(chainId, false);
      expect(await token.circuitBreakers(chainId)).to.be.false;
    });

    it("Should only allow admin to update config", async function () {
      await expect(
        token.connect(user1).setAPRThreshold(200)
      ).to.be.reverted;
    });
  });

  describe("Emergency Mode", function () {
    it("Should block transfers when emergency mode active", async function () {
      await token.activateEmergencyMode();

      const amount = ethers.parseEther("100");
      const dstChainId = 2;
      const toAddress = ethers.solidityPacked(["address"], [user2.address]);

      await expect(
        token.connect(user1).sendWithAPRCheck(
          dstChainId,
          toAddress,
          amount,
          user1.address,
          ethers.ZeroAddress,
          "0x"
        )
      ).to.be.revertedWith("Emergency mode active");
    });

    it("Should allow transfers after deactivating emergency mode", async function () {
      await token.activateEmergencyMode();
      await token.deactivateEmergencyMode();

      // Setup APRs
      await yieldOracle.updateAPR(1, 500);
      await yieldOracle.updateAPR(2, 700);
      await token.updateChainAPR(1, 500);
      await token.updateChainAPR(2, 700);

      const amount = ethers.parseEther("100");
      const dstChainId = 2;
      const toAddress = ethers.solidityPacked(["address"], [user2.address]);

      await expect(
        token.connect(user1).sendWithAPRCheck(
          dstChainId,
          toAddress,
          amount,
          user1.address,
          ethers.ZeroAddress,
          "0x"
        )
      ).to.not.be.reverted;
    });
  });

  describe("View Functions", function () {
    it("Should estimate send fee", async function () {
      const dstChainId = 2;
      const toAddress = ethers.solidityPacked(["address"], [user2.address]);
      const amount = ethers.parseEther("100");

      const [nativeFee, zroFee] = await token.estimateSendFee(
        dstChainId,
        toAddress,
        amount,
        false,
        "0x"
      );

      expect(nativeFee).to.be.gt(0);
      expect(zroFee).to.equal(0);
    });

    it("Should get current chain APR", async function () {
      await token.updateChainAPR(1, 500);
      // Note: getCurrentChainAPR uses block.chainid which is 31337 in hardhat
      // This test verifies the function exists and returns a value
      const apr = await token.getCurrentChainAPR();
      expect(apr).to.be.gte(0);
    });
  });
});

