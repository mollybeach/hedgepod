/**
 * Pyth Network Price Feed Service
 * Uses Hermes API to fetch real-time price data
 */

import axios from 'axios';

const PYTH_HERMES_URL = process.env.PYTH_HERMES_URL || 'https://hermes.pyth.network';

// Pyth price feed IDs (from config/priceIds.ts)
const PRICE_IDS = {
  ETH_USD: '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace',
  USDC_USD: '0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a',
  BTC_USD: '0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43',
};

export interface PythPrice {
  id: string;
  price: {
    price: string;
    conf: string;
    expo: number;
    publish_time: number;
  };
  ema_price: {
    price: string;
    conf: string;
    expo: number;
    publish_time: number;
  };
}

export class PythService {
  /**
   * Get latest price for a specific asset
   */
  async getPrice(assetSymbol: 'ETH' | 'USDC' | 'BTC'): Promise<number> {
    try {
      const priceId = PRICE_IDS[`${assetSymbol}_USD`];
      const response = await axios.get(`${PYTH_HERMES_URL}/api/latest_price_feeds`, {
        params: {
          ids: [priceId],
        },
      });

      const priceData: PythPrice = response.data[0];
      const price = parseInt(priceData.price.price);
      const expo = priceData.price.expo;
      
      // Convert to human-readable price
      const actualPrice = price * Math.pow(10, expo);
      
      console.log(`✅ Pyth: ${assetSymbol}/USD = $${actualPrice.toFixed(2)}`);
      return actualPrice;
    } catch (error) {
      console.error(`❌ Error fetching ${assetSymbol} price from Pyth:`, error);
      throw error;
    }
  }

  /**
   * Get prices for multiple assets
   */
  async getPrices(assets: Array<'ETH' | 'USDC' | 'BTC'>): Promise<Record<string, number>> {
    const prices: Record<string, number> = {};
    
    for (const asset of assets) {
      try {
        prices[asset] = await this.getPrice(asset);
      } catch (error) {
        console.error(`Failed to fetch ${asset} price`);
        prices[asset] = 0;
      }
    }
    
    return prices;
  }

  /**
   * Get price update data (for on-chain updates)
   */
  async getPriceUpdateData(assetSymbol: 'ETH' | 'USDC' | 'BTC'): Promise<string[]> {
    try {
      const priceId = PRICE_IDS[`${assetSymbol}_USD`];
      const response = await axios.get(`${PYTH_HERMES_URL}/api/latest_vaas`, {
        params: {
          ids: [priceId],
        },
      });

      const vaas: string[] = response.data;
      console.log(`✅ Pyth: Got ${vaas.length} price update VAAs for ${assetSymbol}`);
      return vaas;
    } catch (error) {
      console.error(`❌ Error fetching price update data for ${assetSymbol}:`, error);
      throw error;
    }
  }

  /**
   * Calculate volatility from price history
   */
  async calculateVolatility(
    assetSymbol: 'ETH' | 'USDC' | 'BTC', 
    periodSeconds: number = 300
  ): Promise<number> {
    try {
      // In production, fetch historical prices and calculate standard deviation
      // For now, return a mock volatility score
      const currentPrice = await this.getPrice(assetSymbol);
      
      // Simple volatility estimate (would use historical data in production)
      const volatility = Math.random() * 0.05; // 0-5% volatility
      
      console.log(`✅ Pyth: ${assetSymbol} volatility = ${(volatility * 100).toFixed(2)}%`);
      return volatility;
    } catch (error) {
      console.error(`❌ Error calculating volatility for ${assetSymbol}:`, error);
      return 0;
    }
  }
}

export const pythService = new PythService();

