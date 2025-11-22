import { run } from "hardhat";
import * as fs from "fs";
import * as path from "path";

/**
 * Verify deployed contracts on block explorers
 */

async function main() {
  const networkName = process.env.HARDHAT_NETWORK || "hardhat";
  console.log(`\n🔍 Verifying contracts on ${networkName}...\n`);

  // Load deployment info
  const deploymentFile = path.join(__dirname, "..", "deployments", `${networkName}.json`);
  
  if (!fs.existsSync(deploymentFile)) {
    throw new Error(`Deployment file not found for ${networkName}`);
  }

  const deployment = JSON.parse(fs.readFileSync(deploymentFile, "utf-8"));
  const contracts = deployment.contracts;
  const config = deployment.config;

  // Verify YieldOracle
  console.log("📊 Verifying YieldOracle...");
  try {
    await run("verify:verify", {
      address: contracts.YieldOracle,
      constructorArguments: [
        config.pythOracle,
        config.chainlinkOracle
      ]
    });
    console.log("✅ YieldOracle verified");
  } catch (error: any) {
    if (error.message.includes("Already Verified")) {
      console.log("✅ YieldOracle already verified");
    } else {
      console.error("❌ YieldOracle verification failed:", error.message);
    }
  }

  // Verify AutoYieldToken
  console.log("\n🪙 Verifying AutoYieldToken...");
  try {
    await run("verify:verify", {
      address: contracts.AutoYieldToken,
      constructorArguments: [
        config.lzEndpoint,
        100
      ]
    });
    console.log("✅ AutoYieldToken verified");
  } catch (error: any) {
    if (error.message.includes("Already Verified")) {
      console.log("✅ AutoYieldToken already verified");
    } else {
      console.error("❌ AutoYieldToken verification failed:", error.message);
    }
  }

  // Verify HedgePodVault
  console.log("\n🏦 Verifying HedgePodVault...");
  try {
    await run("verify:verify", {
      address: contracts.HedgePodVault,
      constructorArguments: [
        config.depositToken,
        contracts.AutoYieldToken,
        config.pythOracle,
        config.priceIds.ETH_USD,
        config.priceIds.USDC_USD
      ]
    });
    console.log("✅ HedgePodVault verified");
  } catch (error: any) {
    if (error.message.includes("Already Verified")) {
      console.log("✅ HedgePodVault already verified");
    } else {
      console.error("❌ HedgePodVault verification failed:", error.message);
    }
  }

  // Verify VolatilityFeeHook
  console.log("\n🎣 Verifying VolatilityFeeHook...");
  try {
    const poolManager = deployment.deployer; // Using deployer as mock pool manager
    await run("verify:verify", {
      address: contracts.VolatilityFeeHook,
      constructorArguments: [
        config.pythOracle,
        poolManager,
        config.priceIds.ETH_USD
      ]
    });
    console.log("✅ VolatilityFeeHook verified");
  } catch (error: any) {
    if (error.message.includes("Already Verified")) {
      console.log("✅ VolatilityFeeHook already verified");
    } else {
      console.error("❌ VolatilityFeeHook verification failed:", error.message);
    }
  }

  console.log("\n✨ Verification complete!\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

