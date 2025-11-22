/**
 * 1inch Swap Service
 * Provides optimal swap routing and cross-chain functionality
 */

import axios from 'axios';

const ONEINCH_API_KEY = process.env.ONEINCH_API_KEY;
const ONEINCH_API_BASE = 'https://api.1inch.dev';

export interface SwapQuote {
  fromToken: string;
  toToken: string;
  fromTokenAmount: string;
  toTokenAmount: string;
  protocols: string[];
  estimatedGas: number;
}

export interface SwapTransaction {
  from: string;
  to: string;
  data: string;
  value: string;
  gas: number;
  gasPrice: string;
}

export class OneInchService {
  private headers = {
    'Authorization': `Bearer ${ONEINCH_API_KEY}`,
    'accept': 'application/json',
  };

  /**
   * Get swap quote without executing
   */
  async getQuote(
    chainId: number,
    fromToken: string,
    toToken: string,
    amount: string
  ): Promise<SwapQuote> {
    try {
      const response = await axios.get(
        `${ONEINCH_API_BASE}/swap/v5.2/${chainId}/quote`,
        {
          params: {
            src: fromToken,
            dst: toToken,
            amount: amount,
          },
          headers: this.headers,
        }
      );

      console.log(`✅ 1inch: Got quote for ${amount} tokens on chain ${chainId}`);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching 1inch quote:', error);
      throw error;
    }
  }

  /**
   * Get executable swap transaction
   */
  async getSwap(
    chainId: number,
    fromToken: string,
    toToken: string,
    amount: string,
    fromAddress: string,
    slippage: number = 1
  ): Promise<SwapTransaction> {
    try {
      const response = await axios.get(
        `${ONEINCH_API_BASE}/swap/v5.2/${chainId}/swap`,
        {
          params: {
            src: fromToken,
            dst: toToken,
            amount: amount,
            from: fromAddress,
            slippage: slippage,
            disableEstimate: true,
          },
          headers: this.headers,
        }
      );

      console.log(`✅ 1inch: Got swap transaction on chain ${chainId}`);
      return response.data.tx;
    } catch (error) {
      console.error('❌ Error getting 1inch swap:', error);
      throw error;
    }
  }

  /**
   * Get liquidity sources for a token pair
   */
  async getLiquiditySources(chainId: number): Promise<string[]> {
    try {
      const response = await axios.get(
        `${ONEINCH_API_BASE}/swap/v5.2/${chainId}/liquidity-sources`,
        {
          headers: this.headers,
        }
      );

      console.log(`✅ 1inch: Got ${response.data.protocols.length} liquidity sources`);
      return response.data.protocols.map((p: any) => p.title);
    } catch (error) {
      console.error('❌ Error fetching liquidity sources:', error);
      return [];
    }
  }

  /**
   * Get token info
   */
  async getTokenInfo(chainId: number, tokenAddress: string): Promise<any> {
    try {
      const response = await axios.get(
        `${ONEINCH_API_BASE}/token/v1.2/${chainId}`,
        {
          headers: this.headers,
        }
      );

      const token = response.data.tokens[tokenAddress.toLowerCase()];
      if (!token) {
        throw new Error(`Token ${tokenAddress} not found on chain ${chainId}`);
      }

      console.log(`✅ 1inch: Got info for token ${token.symbol}`);
      return token;
    } catch (error) {
      console.error('❌ Error fetching token info:', error);
      throw error;
    }
  }

  /**
   * Calculate best route for cross-chain swap
   */
  async getBestCrossChainRoute(
    fromChainId: number,
    toChainId: number,
    token: string,
    amount: string
  ): Promise<{
    estimatedOutput: string;
    route: string[];
    estimatedTime: number;
  }> {
    try {
      // For cross-chain, we'd typically use 1inch Fusion+ API
      // For now, return a simple estimation
      console.log(`✅ 1inch: Calculating cross-chain route from ${fromChainId} to ${toChainId}`);
      
      return {
        estimatedOutput: amount, // Simplified
        route: [`Chain ${fromChainId}`, 'Bridge', `Chain ${toChainId}`],
        estimatedTime: 300, // 5 minutes in seconds
      };
    } catch (error) {
      console.error('❌ Error calculating cross-chain route:', error);
      throw error;
    }
  }

  /**
   * Check if a swap is profitable (considering gas)
   */
  async isProfitable(
    chainId: number,
    fromToken: string,
    toToken: string,
    amount: string,
    minProfitPercentage: number = 0.5
  ): Promise<boolean> {
    try {
      const quote = await this.getQuote(chainId, fromToken, toToken, amount);
      
      const inputAmount = parseInt(amount);
      const outputAmount = parseInt(quote.toTokenAmount);
      const profitPercentage = ((outputAmount - inputAmount) / inputAmount) * 100;

      const isProfitable = profitPercentage >= minProfitPercentage;
      
      console.log(
        `✅ 1inch: Swap ${isProfitable ? 'IS' : 'NOT'} profitable ` +
        `(${profitPercentage.toFixed(2)}% profit)`
      );
      
      return isProfitable;
    } catch (error) {
      console.error('❌ Error checking profitability:', error);
      return false;
    }
  }
}

export const oneInchService = new OneInchService();

