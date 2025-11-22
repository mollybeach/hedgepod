/**
 * Pyth Network Integration
 * Real-time price feeds and APR data
 */

import axios from "axios";
import config from "../config";
import logger from "../utils/logger";
import type { PriceData, APRData } from "../types";

export class PythOracle {
  private hermesUrl: string;
  private priceIds: Record<string, string>;

  constructor() {
    this.hermesUrl = config.pyth.hermesUrl;
    this.priceIds = config.pyth.priceIds;
  }

  /**
   * Get latest price for an asset
   */
  async getPrice(priceId: string): Promise<PriceData> {
    try {
      const url = `${this.hermesUrl}/api/latest_price_feeds?ids[]=${priceId}`;
      const response = await axios.get(url);

      if (!response.data || response.data.length === 0) {
        throw new Error(`No price data found for ${priceId}`);
      }

      const priceData = response.data[0];
      const price = priceData.price;

      return {
        id: priceId,
        price: parseFloat(price.price) * Math.pow(10, price.expo),
        conf: parseFloat(price.conf) * Math.pow(10, price.expo),
        expo: price.expo,
        publishTime: price.publish_time,
      };
    } catch (error) {
      logger.error(`Failed to get price for ${priceId}:`, error);
      throw error;
    }
  }

  /**
   * Get multiple prices at once
   */
  async getPrices(priceIds: string[]): Promise<Map<string, PriceData>> {
    try {
      const idsParam = priceIds.map(id => `ids[]=${id}`).join("&");
      const url = `${this.hermesUrl}/api/latest_price_feeds?${idsParam}`;
      const response = await axios.get(url);

      const priceMap = new Map<string, PriceData>();

      response.data.forEach((priceData: any) => {
        const price = priceData.price;
        priceMap.set(priceData.id, {
          id: priceData.id,
          price: parseFloat(price.price) * Math.pow(10, price.expo),
          conf: parseFloat(price.conf) * Math.pow(10, price.expo),
          expo: price.expo,
          publishTime: price.publish_time,
        });
      });

      return priceMap;
    } catch (error) {
      logger.error("Failed to get multiple prices:", error);
      throw error;
    }
  }

  /**
   * Get price update data for on-chain submission
   */
  async getPriceUpdateData(priceIds: string[]): Promise<string[]> {
    try {
      const idsParam = priceIds.map(id => `ids[]=${id}`).join("&");
      const url = `${this.hermesUrl}/api/latest_vaas?${idsParam}`;
      const response = await axios.get(url);

      return response.data;
    } catch (error) {
      logger.error("Failed to get price update data:", error);
      throw error;
    }
  }

  /**
   * Calculate APR based on price volatility and liquidity
   * This is a simplified calculation - real implementation would query DeFi protocols
   */
  async calculateAPR(chainId: number): Promise<number> {
    try {
      // Get ETH and USDC prices
      const ethPrice = await this.getPrice(this.priceIds.ethUsd);
      const usdcPrice = await this.getPrice(this.priceIds.usdcUsd);

      // Calculate volatility (simplified)
      const volatility = Math.abs(ethPrice.conf / ethPrice.price) * 10000; // in basis points

      // Base APR varies by chain (simplified - would query actual protocols)
      const baseAPRs: Record<number, number> = {
        [config.chainIds.base]: 450, // 4.5%
        [config.chainIds.celo]: 550, // 5.5%
        [config.chainIds.polygon]: 600, // 6%
        [config.chainIds.arbitrum]: 500, // 5%
        [config.chainIds.optimism]: 480, // 4.8%
        [config.chainIds.avalanche]: 520, // 5.2%
      };

      const baseAPR = baseAPRs[chainId] || 500;
      const volatilityBonus = Math.min(volatility / 10, 100); // Max 1% bonus

      return baseAPR + volatilityBonus;
    } catch (error) {
      logger.error(`Failed to calculate APR for chain ${chainId}:`, error);
      throw error;
    }
  }

  /**
   * Monitor prices for significant changes
   */
  async monitorPrices(
    priceIds: string[],
    threshold: number,
    callback: (priceData: PriceData) => void
  ): Promise<void> {
    const lastPrices = new Map<string, number>();

    const checkPrices = async () => {
      try {
        const prices = await this.getPrices(priceIds);

        prices.forEach((priceData, id) => {
          const lastPrice = lastPrices.get(id);

          if (lastPrice) {
            const change = Math.abs((priceData.price - lastPrice) / lastPrice);
            if (change > threshold) {
              logger.info(`Significant price change detected for ${id}: ${change * 100}%`);
              callback(priceData);
            }
          }

          lastPrices.set(id, priceData.price);
        });
      } catch (error) {
        logger.error("Error monitoring prices:", error);
      }
    };

    // Check every 10 seconds
    setInterval(checkPrices, 10000);
    await checkPrices(); // Initial check
  }

  /**
   * Get ETH price
   */
  async getETHPrice(): Promise<number> {
    const priceData = await this.getPrice(this.priceIds.ethUsd);
    return priceData.price;
  }

  /**
   * Get USDC price
   */
  async getUSDCPrice(): Promise<number> {
    const priceData = await this.getPrice(this.priceIds.usdcUsd);
    return priceData.price;
  }

  /**
   * Get BTC price
   */
  async getBTCPrice(): Promise<number> {
    const priceData = await this.getPrice(this.priceIds.btcUsd);
    return priceData.price;
  }
}

// Singleton instance
export const pythOracle = new PythOracle();
export default pythOracle;

