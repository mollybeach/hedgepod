/**
 * Yield Monitoring Service
 * Continuously monitors APRs across chains and identifies rebalancing opportunities
 */

import config from "../config";
import logger from "../utils/logger";
import { pythOracle } from "../oracle/pyth";
import { oneInchAPI } from "../oracle/oneinch";
import type { APRData, RebalanceOpportunity, MonitoringMetrics } from "../types";

export class YieldMonitor {
  private aprCache: Map<number, APRData> = new Map();
  private lastCheck: number = 0;
  private metrics: MonitoringMetrics = {
    totalAPRChecks: 0,
    totalRebalances: 0,
    successfulRebalances: 0,
    failedRebalances: 0,
    totalGasSaved: 0n,
    averageAPRImprovement: 0,
    uptime: Date.now(),
    lastRebalance: 0,
  };

  /**
   * Start monitoring yields across all chains
   */
  async start(): Promise<void> {
    logger.info("🔍 Starting yield monitor...");

    // Initial APR check
    await this.checkAllChainAPRs();

    // Schedule periodic checks
    setInterval(async () => {
      try {
        await this.checkAllChainAPRs();
      } catch (error) {
        logger.error("Error in yield monitoring:", error);
      }
    }, config.agent.monitorInterval);

    logger.info(`✅ Yield monitor started (checking every ${config.agent.monitorInterval / 1000}s)`);
  }

  /**
   * Check APRs for all supported chains
   */
  private async checkAllChainAPRs(): Promise<void> {
    try {
      logger.info("📊 Checking APRs across all chains...");
      this.metrics.totalAPRChecks++;
      this.lastCheck = Date.now();

      const chainIds = Object.values(config.chainIds);
      const aprPromises = chainIds.map(chainId => this.checkChainAPR(chainId));

      const aprs = await Promise.allSettled(aprPromises);

      aprs.forEach((result, index) => {
        if (result.status === "fulfilled") {
          const chainId = chainIds[index];
          this.aprCache.set(chainId, result.value);
          logger.info(`  ${this.getChainName(chainId)}: ${result.value.apr / 100}%`);
        } else {
          logger.warn(`  Failed to get APR for chain ${chainIds[index]}: ${result.reason}`);
        }
      });

      // Check for rebalancing opportunities
      const opportunities = this.identifyRebalanceOpportunities();
      if (opportunities.length > 0) {
        logger.info(`🎯 Found ${opportunities.length} rebalancing opportunities`);
        opportunities.forEach(opp => {
          logger.info(
            `  ${this.getChainName(opp.fromChain)} (${opp.fromAPR / 100}%) → ` +
            `${this.getChainName(opp.toChain)} (${opp.toAPR / 100}%) ` +
            `[+${opp.aprDelta / 100}%]`
          );
        });
      }
    } catch (error) {
      logger.error("Error checking chain APRs:", error);
      throw error;
    }
  }

  /**
   * Check APR for a specific chain
   */
  private async checkChainAPR(chainId: number): Promise<APRData> {
    try {
      const apr = await pythOracle.calculateAPR(chainId);
      
      // In a real implementation, would also query DeFi protocols directly
      // For now, using Pyth-based calculation

      return {
        chainId,
        chainName: this.getChainName(chainId),
        apr,
        totalLiquidity: 1000000, // Mock value - would query actual protocols
        timestamp: Date.now(),
        source: "pyth",
      };
    } catch (error) {
      logger.error(`Failed to check APR for chain ${chainId}:`, error);
      throw error;
    }
  }

  /**
   * Identify profitable rebalancing opportunities
   */
  private identifyRebalanceOpportunities(): RebalanceOpportunity[] {
    const opportunities: RebalanceOpportunity[] = [];
    const aprs = Array.from(this.aprCache.values());

    // Compare each pair of chains
    for (let i = 0; i < aprs.length; i++) {
      for (let j = i + 1; j < aprs.length; j++) {
        const fromChain = aprs[i];
        const toChain = aprs[j];

        // Check if moving from lower to higher APR
        const aprDelta = toChain.apr - fromChain.apr;

        if (aprDelta >= config.agent.minAPRDelta) {
          opportunities.push({
            fromChain: fromChain.chainId,
            toChain: toChain.chainId,
            fromAPR: fromChain.apr,
            toAPR: toChain.apr,
            aprDelta,
            estimatedAmount: 0n, // Would calculate based on vault balance
            estimatedGas: 0n,
          });
        }
      }
    }

    // Sort by APR delta (descending)
    return opportunities.sort((a, b) => b.aprDelta - a.aprDelta);
  }

  /**
   * Get best chain (highest APR)
   */
  getBestChain(): { chainId: number; apr: number } | null {
    if (this.aprCache.size === 0) {
      return null;
    }

    let best = { chainId: 0, apr: 0 };
    this.aprCache.forEach((data, chainId) => {
      if (data.apr > best.apr) {
        best = { chainId, apr: data.apr };
      }
    });

    return best;
  }

  /**
   * Get current APR for a specific chain
   */
  getChainAPR(chainId: number): number | null {
    const data = this.aprCache.get(chainId);
    return data ? data.apr : null;
  }

  /**
   * Get all cached APR data
   */
  getAllAPRs(): APRData[] {
    return Array.from(this.aprCache.values());
  }

  /**
   * Get monitoring metrics
   */
  getMetrics(): MonitoringMetrics {
    return { ...this.metrics };
  }

  /**
   * Update metrics after rebalance
   */
  updateMetrics(success: boolean, aprImprovement: number, gasSaved: bigint) {
    this.metrics.totalRebalances++;
    if (success) {
      this.metrics.successfulRebalances++;
      this.metrics.lastRebalance = Date.now();
      this.metrics.totalGasSaved += gasSaved;
      
      // Update average APR improvement
      const totalImprovement = 
        this.metrics.averageAPRImprovement * (this.metrics.successfulRebalances - 1) +
        aprImprovement;
      this.metrics.averageAPRImprovement = totalImprovement / this.metrics.successfulRebalances;
    } else {
      this.metrics.failedRebalances++;
    }
  }

  /**
   * Get chain name from ID
   */
  private getChainName(chainId: number): string {
    const entry = Object.entries(config.chainIds).find(([, id]) => id === chainId);
    return entry ? entry[0] : `Chain ${chainId}`;
  }

  /**
   * Check if monitoring is healthy
   */
  isHealthy(): boolean {
    const timeSinceLastCheck = Date.now() - this.lastCheck;
    const maxInterval = config.agent.monitorInterval * 2;
    return timeSinceLastCheck < maxInterval;
  }
}

// Singleton instance
export const yieldMonitor = new YieldMonitor();
export default yieldMonitor;

