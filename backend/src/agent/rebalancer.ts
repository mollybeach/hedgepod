/**
 * Autonomous Rebalancing Service
 * Executes cross-chain rebalancing based on yield opportunities
 */

import { ethers } from "ethers";
import config from "../config";
import logger from "../utils/logger";
import { walletManager } from "./wallet";
import { pythOracle } from "../oracle/pyth";
import { oneInchAPI } from "../oracle/oneinch";
import { yieldMonitor } from "./monitor";
import type { RebalanceOpportunity } from "../types";

export class Rebalancer {
  private lastRebalanceTime: number = 0;
  private isRebalancing: boolean = false;
  private cooldownPeriod: number = config.agent.rebalanceInterval;

  /**
   * Start autonomous rebalancing
   */
  async start(): Promise<void> {
    logger.info("🤖 Starting autonomous rebalancer...");

    // Schedule periodic rebalancing checks
    setInterval(async () => {
      if (!this.isRebalancing && this.canRebalance()) {
        try {
          await this.checkAndRebalance();
        } catch (error) {
          logger.error("Error in rebalancing:", error);
        }
      }
    }, config.agent.rebalanceInterval);

    logger.info(`✅ Rebalancer started (checking every ${config.agent.rebalanceInterval / 1000}s)`);
  }

  /**
   * Check if rebalancing is allowed
   */
  private canRebalance(): boolean {
    const timeSinceLastRebalance = Date.now() - this.lastRebalanceTime;
    return timeSinceLastRebalance >= this.cooldownPeriod;
  }

  /**
   * Check for opportunities and execute rebalance
   */
  private async checkAndRebalance(): Promise<void> {
    try {
      logger.info("🔄 Checking for rebalancing opportunities...");

      // Get best chain
      const bestChain = yieldMonitor.getBestChain();
      if (!bestChain) {
        logger.warn("No APR data available");
        return;
      }

      // Get current allocations from vault
      // In real implementation, would query vault contract
      const currentChain = config.chainIds.base; // Assuming current chain
      const currentAPR = yieldMonitor.getChainAPR(currentChain);

      if (!currentAPR) {
        logger.warn("Current chain APR not available");
        return;
      }

      // Check if rebalancing would be beneficial
      const aprDelta = bestChain.apr - currentAPR;
      if (aprDelta < config.agent.minAPRDelta) {
        logger.info(`APR delta (${aprDelta / 100}%) below threshold (${config.agent.minAPRDelta / 100}%)`);
        return;
      }

      logger.info(
        `📈 Rebalancing opportunity found: ` +
        `${currentAPR / 100}% → ${bestChain.apr / 100}% (+${aprDelta / 100}%)`
      );

      // Execute rebalance
      await this.executeRebalance({
        fromChain: currentChain,
        toChain: bestChain.chainId,
        fromAPR: currentAPR,
        toAPR: bestChain.apr,
        aprDelta,
        estimatedAmount: 0n,
        estimatedGas: 0n,
      });
    } catch (error) {
      logger.error("Error checking and rebalancing:", error);
      throw error;
    }
  }

  /**
   * Execute cross-chain rebalance
   */
  async executeRebalance(opportunity: RebalanceOpportunity): Promise<void> {
    if (this.isRebalancing) {
      logger.warn("Rebalance already in progress");
      return;
    }

    this.isRebalancing = true;

    try {
      logger.info(`🚀 Executing rebalance: Chain ${opportunity.fromChain} → ${opportunity.toChain}`);

      // Get agent wallet address
      const agentAddress = await walletManager.getAddress();
      logger.info(`Agent address: ${agentAddress}`);

      // Step 1: Get price update data from Pyth
      logger.info("📊 Fetching Pyth price updates...");
      const priceIds = [config.pyth.priceIds.ethUsd, config.pyth.priceIds.usdcUsd];
      const priceUpdateData = await pythOracle.getPriceUpdateData(priceIds);
      logger.info(`✅ Got ${priceUpdateData.length} price updates`);

      // Step 2: Call vault rebalance function with x402 authorization
      logger.info("🔐 Executing rebalance with x402 authorization...");
      
      const vaultAddress = config.contracts.base.vault; // Get from deployment
      const targetChain = opportunity.toChain;
      const authSignature = "0x"; // Would generate proper x402 signature

      const txHash = await walletManager.executeAuthorizedCall(
        vaultAddress,
        opportunity.fromChain,
        "rebalanceWithAuthorization",
        [targetChain, ethers.parseUnits("1000", 6), authSignature], // 1000 USDC example
        authSignature
      );

      logger.info(`✅ Rebalance transaction sent: ${txHash}`);

      // Step 3: Update metrics
      yieldMonitor.updateMetrics(true, opportunity.aprDelta, 0n);

      // Update last rebalance time
      this.lastRebalanceTime = Date.now();

      logger.info("🎉 Rebalance completed successfully!");
    } catch (error) {
      logger.error("❌ Rebalance failed:", error);
      yieldMonitor.updateMetrics(false, 0, 0n);
      throw error;
    } finally {
      this.isRebalancing = false;
    }
  }

  /**
   * Execute swap via 1inch (fallback option)
   */
  private async executeSwap(
    chainId: number,
    fromToken: string,
    toToken: string,
    amount: string
  ): Promise<string> {
    try {
      logger.info(`🔄 Executing swap on chain ${chainId}`);

      const agentAddress = await walletManager.getAddress();

      // Get swap transaction
      const swapTx = await oneInchAPI.getSwapTransaction(
        chainId,
        fromToken,
        toToken,
        amount,
        agentAddress,
        config.agent.maxSlippage / 100
      );

      // Execute transaction
      logger.info("Executing swap transaction...");
      // In real implementation, would use walletManager to send transaction

      return "0x..."; // Mock transaction hash
    } catch (error) {
      logger.error("Failed to execute swap:", error);
      throw error;
    }
  }

  /**
   * Estimate rebalancing gas cost
   */
  private async estimateGasCost(
    fromChain: number,
    toChain: number,
    amount: bigint
  ): Promise<bigint> {
    try {
      // Simplified gas estimation
      // In real implementation, would simulate full transaction

      const baseGas = 200000n; // Base gas for rebalance
      const crossChainGas = 150000n; // Additional gas for cross-chain
      const gasPrice = 50000000000n; // 50 gwei

      return (baseGas + crossChainGas) * gasPrice;
    } catch (error) {
      logger.error("Failed to estimate gas cost:", error);
      return 0n;
    }
  }

  /**
   * Validate rebalance opportunity
   */
  private async validateOpportunity(opportunity: RebalanceOpportunity): Promise<boolean> {
    try {
      // Check if APR delta is still above threshold
      if (opportunity.aprDelta < config.agent.minAPRDelta) {
        logger.warn("APR delta below minimum threshold");
        return false;
      }

      // Estimate gas cost
      const gasCost = await this.estimateGasCost(
        opportunity.fromChain,
        opportunity.toChain,
        opportunity.estimatedAmount
      );

      // Calculate if rebalance is profitable after gas
      const aprBenefit = opportunity.aprDelta / 100; // Annualized
      logger.info(`APR benefit: ${aprBenefit}%, Estimated gas: ${ethers.formatEther(gasCost)} ETH`);

      // Simple profitability check
      // In real implementation, would calculate break-even time
      return true;
    } catch (error) {
      logger.error("Failed to validate opportunity:", error);
      return false;
    }
  }

  /**
   * Get rebalancing status
   */
  getStatus(): {
    isRebalancing: boolean;
    lastRebalanceTime: number;
    canRebalance: boolean;
  } {
    return {
      isRebalancing: this.isRebalancing,
      lastRebalanceTime: this.lastRebalanceTime,
      canRebalance: this.canRebalance(),
    };
  }
}

// Singleton instance
export const rebalancer = new Rebalancer();
export default rebalancer;

