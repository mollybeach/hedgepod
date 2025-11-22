/**
 * HedgePod Agent - Main Entry Point
 * Autonomous cross-chain yield optimization
 */

import express from "express";
import config from "./config";
import logger from "./utils/logger";
import { walletManager } from "./agent/wallet";
import { yieldMonitor } from "./agent/monitor";
import { rebalancer } from "./agent/rebalancer";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    monitor: {
      healthy: yieldMonitor.isHealthy(),
      metrics: yieldMonitor.getMetrics(),
    },
    rebalancer: rebalancer.getStatus(),
  });
});

// Get current APRs
app.get("/aprs", (req, res) => {
  const aprs = yieldMonitor.getAllAPRs();
  res.json({ aprs });
});

// Get best chain
app.get("/best-chain", (req, res) => {
  const bestChain = yieldMonitor.getBestChain();
  if (!bestChain) {
    return res.status(404).json({ error: "No APR data available" });
  }
  res.json(bestChain);
});

// Get wallet info
app.get("/wallet", async (req, res) => {
  try {
    const walletInfo = await walletManager.getWalletInfo();
    res.json(walletInfo);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Manual rebalance trigger (for testing)
app.post("/rebalance", async (req, res) => {
  try {
    const { fromChain, toChain } = req.body;
    
    if (!fromChain || !toChain) {
      return res.status(400).json({ error: "fromChain and toChain required" });
    }

    // Get APRs
    const fromAPR = yieldMonitor.getChainAPR(fromChain);
    const toAPR = yieldMonitor.getChainAPR(toChain);

    if (!fromAPR || !toAPR) {
      return res.status(404).json({ error: "APR data not available" });
    }

    // Execute rebalance
    await rebalancer.executeRebalance({
      fromChain,
      toChain,
      fromAPR,
      toAPR,
      aprDelta: toAPR - fromAPR,
      estimatedAmount: 0n,
      estimatedGas: 0n,
    });

    res.json({ success: true, message: "Rebalance initiated" });
  } catch (error: any) {
    logger.error("Manual rebalance failed:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Initialize and start the agent
 */
async function startAgent() {
  try {
    logger.info("\n" + "=".repeat(60));
    logger.info("🚀 HedgePod Agent Starting...");
    logger.info("=".repeat(60));

    // Initialize wallet
    logger.info("\n💼 Initializing agent wallet...");
    await walletManager.initializeWallet("base-sepolia");
    const walletInfo = await walletManager.getWalletInfo();
    logger.info(`✅ Wallet initialized: ${walletInfo.address}`);
    logger.info(`💰 Balance: ${walletInfo.balance.toString()}`);

    // Start yield monitor
    logger.info("\n📊 Starting yield monitor...");
    await yieldMonitor.start();

    // Start rebalancer
    logger.info("\n🤖 Starting autonomous rebalancer...");
    await rebalancer.start();

    // Start API server
    logger.info("\n🌐 Starting API server...");
    app.listen(PORT, () => {
      logger.info(`✅ API server running on port ${PORT}`);
      logger.info("\n" + "=".repeat(60));
      logger.info("🎉 HedgePod Agent is now running!");
      logger.info("=".repeat(60));
      logger.info(`\n📡 Health check: http://localhost:${PORT}/health`);
      logger.info(`📊 APRs endpoint: http://localhost:${PORT}/aprs`);
      logger.info(`🏆 Best chain: http://localhost:${PORT}/best-chain`);
      logger.info(`💼 Wallet info: http://localhost:${PORT}/wallet\n`);
    });
  } catch (error) {
    logger.error("❌ Failed to start agent:", error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on("SIGINT", () => {
  logger.info("\n🛑 Shutting down agent...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  logger.info("\n🛑 Shutting down agent...");
  process.exit(0);
});

// Start the agent
startAgent();

