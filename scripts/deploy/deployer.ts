/**
 * HedgePod Deployment Script
 * 
 * Comprehensive deployment with logging, ABI saving, and data management
 * Combines features from deploy.ts and deploy.mjs
 */

import hre from "hardhat";
const { ethers, network } = hre;
import * as fs from "fs";
import * as path from "path";

// Import configurations from root config folder
import { getNetworkConfig, PRICE_IDS } from "../../config";

// =====================================================
// LOGGING UTILITIES
// =====================================================

function printSectionHeader(title: string) {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`  ${title}`);
  console.log(`${"=".repeat(60)}\n`);
}

function printStepHeader(step: string) {
  console.log(`\n[${step}]`);
}

function printSuccess(message: string) {
  console.log(`\n✅ ${message}\n`);
}

function printInfo(message: string) {
  console.log(`${message}`);
}

function printAddress(label: string, address: string) {
  console.log(`${label}: ${address}`);
}

function printExplorerLink(label: string, address: string, explorerUrl: string) {
  if (!explorerUrl) return;
  const link = `${explorerUrl}/address/${address}`;
  console.log(`${label}: ${address}`);
  console.log(`🔗 ${link}`);
}

// =====================================================
// FILE MANAGEMENT
// =====================================================

function saveABI(contractName: string, abi: any) {
  const abiDir = path.join(__dirname, "..", "..", "deployments", "abis");
  if (!fs.existsSync(abiDir)) {
    fs.mkdirSync(abiDir, { recursive: true });
  }
  
  const abiFile = path.join(abiDir, `${contractName}.json`);
  fs.writeFileSync(abiFile, JSON.stringify(abi, null, 2));
  console.log(`💾 ABI saved: ${abiFile}`);
}

function saveDeploymentData(data: any) {
  // Save to main deployments folder
  const deploymentsDir = path.join(__dirname, "..", "..", "deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  // Save network-specific deployment
  const networkFile = path.join(deploymentsDir, `${data.network}.json`);
  fs.writeFileSync(networkFile, JSON.stringify(data, null, 2));
  console.log(`💾 Deployment data saved: ${networkFile}`);

  // Save timestamped deployment history
  const deploymentId = `${data.network}-${Date.now()}`;
  const historyFile = path.join(deploymentsDir, `deployment-${deploymentId}.json`);
  fs.writeFileSync(historyFile, JSON.stringify(data, null, 2));
  console.log(`📊 Deployment history saved: ${historyFile}`);
}

function saveFrontendData(data: any) {
  const frontendDataDir = path.join(__dirname, "..", "..", "frontend", "lib", "data");
  if (!fs.existsSync(frontendDataDir)) {
    fs.mkdirSync(frontendDataDir, { recursive: true });
  }

  const contractsDataFile = path.join(frontendDataDir, "contracts_data.json");
  fs.writeFileSync(contractsDataFile, JSON.stringify(data, null, 2));
  console.log(`📊 Frontend contracts data saved: ${contractsDataFile}`);
}

// =====================================================
// MAIN DEPLOYMENT
// =====================================================

async function main() {
  const networkName = network.name;
  const timestamp = new Date().toISOString();
  
  printSectionHeader("HedgePod Deployment");
  printInfo(`🚀 Deploying Complete HedgePod System`);
  printInfo(`📅 Timestamp: ${timestamp}`);

  // Get deployer
  const [deployer] = await ethers.getSigners();
  const deployerBalance = await ethers.provider.getBalance(deployer.address);
  
  // Get network info
  const chainId = (await ethers.provider.getNetwork()).chainId;
  const config = getNetworkConfig(networkName); // This will throw if network not found

  printInfo(`📡 Network: ${config.name} (${networkName})`);
  printInfo(`🔢 Chain ID: ${chainId}`);
  printAddress("👤 Deployer", deployer.address);
  printInfo(`💰 Balance: ${ethers.formatEther(deployerBalance)} ETH`);

  const deployedContracts: Record<string, string> = {};

  // =====================================================
  // 1. Deploy YieldOracle
  // =====================================================
  printStepHeader("Step 1: Deploy YieldOracle");
  printInfo("📊 Deploying YieldOracle with Pyth and Chainlink oracles...");
  
  const YieldOracle = await ethers.getContractFactory("YieldOracle");
  const yieldOracle = await YieldOracle.deploy(
    config.pythOracle,
    config.chainlinkOracle
  );
  await yieldOracle.waitForDeployment();
  const yieldOracleAddress = await yieldOracle.getAddress();
  deployedContracts.YieldOracle = yieldOracleAddress;
  
  printExplorerLink("✅ YieldOracle", yieldOracleAddress, config.explorerUrl);
  saveABI("YieldOracle", YieldOracle.interface.formatJson());

  // =====================================================
  // 2. Deploy AutoYieldToken
  // =====================================================
  printStepHeader("Step 2: Deploy AutoYieldToken");
  printInfo("🪙 Deploying LayerZero OFT token...");
  
  const AutoYieldToken = await ethers.getContractFactory("AutoYieldToken");
  const autoYieldToken = await AutoYieldToken.deploy(
    config.lzEndpoint,
    100 // 1% APR threshold
  );
  await autoYieldToken.waitForDeployment();
  const autoYieldTokenAddress = await autoYieldToken.getAddress();
  deployedContracts.AutoYieldToken = autoYieldTokenAddress;
  
  printExplorerLink("✅ AutoYieldToken", autoYieldTokenAddress, config.explorerUrl);
  saveABI("AutoYieldToken", AutoYieldToken.interface.formatJson());

  // Set yield oracle in token
  printInfo("🔗 Setting yield oracle in AutoYieldToken...");
  const setOracleTx = await autoYieldToken.setYieldOracle(yieldOracleAddress);
  await setOracleTx.wait();
  printSuccess("Yield oracle set in AutoYieldToken");

  // =====================================================
  // 3. Deploy HedgePodVault
  // =====================================================
  printStepHeader("Step 3: Deploy HedgePodVault");
  printInfo("🏦 Deploying main vault contract...");
  
  const HedgePodVault = await ethers.getContractFactory("HedgePodVault");
  const vault = await HedgePodVault.deploy(
    config.depositToken,
    autoYieldTokenAddress,
    config.pythOracle,
    PRICE_IDS.ETH_USD,
    PRICE_IDS.USDC_USD
  );
  await vault.waitForDeployment();
  const vaultAddress = await vault.getAddress();
  deployedContracts.HedgePodVault = vaultAddress;
  
  printExplorerLink("✅ HedgePodVault", vaultAddress, config.explorerUrl);
  saveABI("HedgePodVault", HedgePodVault.interface.formatJson());

  // Set yield oracle in vault
  printInfo("🔗 Setting yield oracle in HedgePodVault...");
  const setVaultOracleTx = await vault.setYieldOracle(yieldOracleAddress);
  await setVaultOracleTx.wait();
  printSuccess("Yield oracle set in HedgePodVault");

  // Grant MINTER_ROLE to vault
  printInfo("🔑 Granting MINTER_ROLE to vault...");
  const MINTER_ROLE = await autoYieldToken.MINTER_ROLE();
  const grantRoleTx = await autoYieldToken.grantRole(MINTER_ROLE, vaultAddress);
  await grantRoleTx.wait();
  printSuccess("MINTER_ROLE granted to vault");

  // =====================================================
  // 4. Deploy VolatilityFeeHook
  // =====================================================
  printStepHeader("Step 4: Deploy VolatilityFeeHook");
  printInfo("🎣 Deploying Uniswap v4 hook...");
  
  const poolManager = deployer.address; // Mock pool manager for now
  const VolatilityFeeHook = await ethers.getContractFactory("VolatilityFeeHook");
  const hook = await VolatilityFeeHook.deploy(
    config.pythOracle,
    poolManager,
    PRICE_IDS.ETH_USD
  );
  await hook.waitForDeployment();
  const hookAddress = await hook.getAddress();
  deployedContracts.VolatilityFeeHook = hookAddress;
  
  printExplorerLink("✅ VolatilityFeeHook", hookAddress, config.explorerUrl);
  saveABI("VolatilityFeeHook", VolatilityFeeHook.interface.formatJson());

  // =====================================================
  // 5. Save Deployment Data
  // =====================================================
  printStepHeader("Step 5: Save Deployment Data");
  
  const deploymentData = {
    network: networkName,
    networkName: config.name,
    chainId: chainId.toString(),
    deployer: deployer.address,
    timestamp: timestamp,
    deploymentId: `${networkName}-${Date.now()}`,
    contracts: deployedContracts,
    config: {
      pythOracle: config.pythOracle,
      chainlinkOracle: config.chainlinkOracle,
      lzEndpoint: config.lzEndpoint,
      depositToken: config.depositToken,
      priceIds: PRICE_IDS,
      explorerUrl: config.explorerUrl,
    },
    verificationCommands: {
      YieldOracle: `npx hardhat verify --network ${networkName} ${yieldOracleAddress} ${config.pythOracle} ${config.chainlinkOracle}`,
      AutoYieldToken: `npx hardhat verify --network ${networkName} ${autoYieldTokenAddress} ${config.lzEndpoint} 100`,
      HedgePodVault: `npx hardhat verify --network ${networkName} ${vaultAddress} ${config.depositToken} ${autoYieldTokenAddress} ${config.pythOracle} ${PRICE_IDS.ETH_USD} ${PRICE_IDS.USDC_USD}`,
      VolatilityFeeHook: `npx hardhat verify --network ${networkName} ${hookAddress} ${config.pythOracle} ${poolManager} ${PRICE_IDS.ETH_USD}`,
    }
  };

  saveDeploymentData(deploymentData);
  saveFrontendData(deploymentData);

  // =====================================================
  // 6. Print Summary
  // =====================================================
  printSectionHeader("DEPLOYMENT SUMMARY");
  printInfo(`Network:           ${config.name} (${networkName})`);
  printInfo(`Chain ID:          ${chainId}`);
  printInfo(`Deployer:          ${deployer.address}`);
  printInfo(`Timestamp:         ${timestamp}`);
  console.log();
  printInfo("📝 Deployed Contracts:");
  printInfo(`  YieldOracle:       ${yieldOracleAddress}`);
  printInfo(`  AutoYieldToken:    ${autoYieldTokenAddress}`);
  printInfo(`  HedgePodVault:     ${vaultAddress}`);
  printInfo(`  VolatilityFeeHook: ${hookAddress}`);
  console.log();
  printInfo("🔗 Explorer Links:");
  printInfo(`  ${config.explorerUrl}/address/${yieldOracleAddress}`);
  printInfo(`  ${config.explorerUrl}/address/${autoYieldTokenAddress}`);
  printInfo(`  ${config.explorerUrl}/address/${vaultAddress}`);
  printInfo(`  ${config.explorerUrl}/address/${hookAddress}`);
  
  printSectionHeader("✨ Deployment Complete!");
  
  // Print verification instructions
  printStepHeader("Contract Verification");
  printInfo("To verify contracts on block explorer, run:");
  console.log();
  Object.entries(deploymentData.verificationCommands).forEach(([name, cmd]) => {
    printInfo(`# ${name}`);
    printInfo(cmd as string);
    console.log();
  });
}

// =====================================================
// EXECUTION
// =====================================================

main()
  .then(() => {
    console.log("\n✅ Deployment script completed successfully\n");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });

