/**
 * 1inch API Integration
 * Swap routing and liquidity aggregation
 */

import axios from "axios";
import config from "../config";
import logger from "../utils/logger";
import type { SwapQuote } from "../types";

export class OneInchAPI {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = config.oneInch.apiKey;
    this.baseUrl = config.oneInch.baseUrl;
  }

  /**
   * Get swap quote
   */
  async getQuote(
    chainId: number,
    fromToken: string,
    toToken: string,
    amount: string,
    slippage: number = 1
  ): Promise<SwapQuote> {
    try {
      const url = `${this.baseUrl}/swap/v5.2/${chainId}/quote`;
      const params = {
        fromTokenAddress: fromToken,
        toTokenAddress: toToken,
        amount,
      };

      const response = await axios.get(url, {
        params,
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      });

      return {
        fromToken,
        toToken,
        fromChain: chainId,
        toChain: chainId, // Same chain swap
        amount,
        estimatedOutput: response.data.toTokenAmount,
        slippage,
        gas: response.data.estimatedGas,
        route: response.data.protocols?.[0]?.map((p: any) => p.name) || [],
      };
    } catch (error) {
      logger.error("Failed to get 1inch quote:", error);
      throw error;
    }
  }

  /**
   * Get swap transaction data
   */
  async getSwapTransaction(
    chainId: number,
    fromToken: string,
    toToken: string,
    amount: string,
    fromAddress: string,
    slippage: number = 1
  ): Promise<any> {
    try {
      const url = `${this.baseUrl}/swap/v5.2/${chainId}/swap`;
      const params = {
        fromTokenAddress: fromToken,
        toTokenAddress: toToken,
        amount,
        fromAddress,
        slippage,
        disableEstimate: true,
      };

      const response = await axios.get(url, {
        params,
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      });

      return response.data.tx;
    } catch (error) {
      logger.error("Failed to get swap transaction:", error);
      throw error;
    }
  }

  /**
   * Execute cross-chain swap using Fusion+
   */
  async executeCrossChainSwap(
    fromChain: number,
    toChain: number,
    fromToken: string,
    toToken: string,
    amount: string,
    fromAddress: string,
    slippage: number = 1
  ): Promise<string> {
    try {
      logger.info(`Executing cross-chain swap from chain ${fromChain} to ${toChain}`);

      const url = `${this.baseUrl}/fusion/v1.0/swap`;
      const payload = {
        srcChainId: fromChain,
        dstChainId: toChain,
        srcTokenAddress: fromToken,
        dstTokenAddress: toToken,
        amount,
        from: fromAddress,
        slippage,
      };

      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
      });

      logger.info(`Cross-chain swap initiated: ${response.data.orderId}`);
      return response.data.orderId;
    } catch (error) {
      logger.error("Failed to execute cross-chain swap:", error);
      throw error;
    }
  }

  /**
   * Get liquidity sources for a token pair
   */
  async getLiquiditySources(chainId: number): Promise<string[]> {
    try {
      const url = `${this.baseUrl}/swap/v5.2/${chainId}/liquidity-sources`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      });

      return response.data.protocols.map((p: any) => p.id);
    } catch (error) {
      logger.error("Failed to get liquidity sources:", error);
      throw error;
    }
  }

  /**
   * Check if swap is profitable after fees
   */
  async isProfitable(
    chainId: number,
    fromToken: string,
    toToken: string,
    amount: string,
    minimumOutput: string
  ): Promise<boolean> {
    try {
      const quote = await this.getQuote(chainId, fromToken, toToken, amount);
      return BigInt(quote.estimatedOutput) >= BigInt(minimumOutput);
    } catch (error) {
      logger.error("Failed to check profitability:", error);
      return false;
    }
  }
}

// Singleton instance
export const oneInchAPI = new OneInchAPI();
export default oneInchAPI;

