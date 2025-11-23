/**
 * Uniswap v4 Pools API Route
 * Fetches real pool data using:
 * - Pyth Network: Real-time volatility and prices
 * - The Graph: Real liquidity and 24h volume from Uniswap v3
 */

import { NextResponse } from 'next/server';
import { fetchUniswapPools, formatUSD, formatFeeTier } from '@/lib/thegraph';

// Pyth price feed IDs (from Pyth Network)
const PRICE_FEEDS = {
  ETH_USD: '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace',
  BTC_USD: '0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43',
  USDC_USD: '0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a',
};

interface PythPriceData {
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

/**
 * Calculate volatility from Pyth confidence interval
 */
function calculateVolatility(price: number, confidence: number): number {
  // Volatility = (confidence / price) * 100
  const volatilityPercent = (confidence / price) * 100;
  return Math.min(Math.max(volatilityPercent, 0.1), 10); // Clamp between 0.1% and 10%
}

/**
 * Get volatility category
 */
function getVolatilityCategory(volatility: number): string {
  if (volatility < 1.5) return 'Low';
  if (volatility < 3.0) return 'Medium';
  return 'High';
}

/**
 * Calculate dynamic fee based on volatility
 */
function calculateDynamicFee(volatility: number): number {
  if (volatility < 1.5) return 0.10; // Low volatility
  if (volatility < 3.0) return 0.20; // Medium volatility
  return 0.30; // High volatility
}

/**
 * Fetch price and volatility from Pyth Network
 */
async function fetchPythData(priceId: string) {
  try {
    const response = await fetch(
      `https://hermes.pyth.network/v2/updates/price/latest?ids[]=${priceId}`,
      { next: { revalidate: 10 } } // Cache for 10 seconds
    );

    if (!response.ok) {
      throw new Error(`Pyth API error: ${response.statusText}`);
    }

    const data = await response.json();
    const priceData: PythPriceData = data.parsed[0];

    const price = parseInt(priceData.price.price);
    const conf = parseInt(priceData.price.conf);
    const expo = priceData.price.expo;

    // Convert to human-readable values
    const actualPrice = price * Math.pow(10, expo);
    const confidence = conf * Math.pow(10, expo);

    return {
      price: actualPrice,
      confidence,
      volatility: calculateVolatility(Math.abs(actualPrice), confidence),
    };
  } catch (error) {
    console.error(`Error fetching Pyth data for ${priceId}:`, error);
    // Return fallback data
    return {
      price: 0,
      confidence: 0,
      volatility: 2.0, // Default medium volatility
    };
  }
}

/**
 * Map token pairs to The Graph pool data
 */
async function getRealPoolData(token0: string, token1: string) {
  console.log(`\n🔎 [Pool Data] Looking for ${token0}/${token1} pool...`);
  
  try {
    // Fetch from The Graph (Ethereum mainnet has most reliable data)
    const pools = await fetchUniswapPools('mainnet');
    
    console.log(`📦 [Pool Data] Received ${pools.length} pools from The Graph`);
    
    if (pools.length === 0) {
      console.error(`⚠️ [Pool Data] NO POOLS RETURNED from The Graph!`);
      console.error(`   Reason: API call failed or returned empty array`);
      console.error(`   USING FALLBACK DATA ($0)`);
      return {
        liquidity: '$0',
        volume24h: '$0',
        poolId: '0x0000000000000000000000000000000000000000',
        feeTier: '0.30%',
      };
    }
    
    // Log all available pool pairs for debugging
    console.log(`   Available pools:`);
    pools.slice(0, 5).forEach(p => {
      console.log(`      - ${p.token0.symbol}/${p.token1.symbol}`);
    });
    
    // Find pool matching our token pair (case-insensitive)
    const pool = pools.find(
      (p) =>
        (p.token0.symbol.toUpperCase() === token0.toUpperCase() &&
          p.token1.symbol.toUpperCase() === token1.toUpperCase()) ||
        (p.token0.symbol.toUpperCase() === token1.toUpperCase() &&
          p.token1.symbol.toUpperCase() === token0.toUpperCase())
    );

    if (pool) {
      const liquidity = formatUSD(pool.totalValueLockedUSD);
      const volume = formatUSD(pool.volumeUSD);
      
      console.log(`✅ [Pool Data] FOUND ${token0}/${token1} pool!`);
      console.log(`   Liquidity: ${liquidity}`);
      console.log(`   24h Volume: ${volume}`);
      console.log(`   Pool ID: ${pool.id}`);
      
      return {
        liquidity,
        volume24h: volume,
        poolId: pool.id,
        feeTier: formatFeeTier(pool.feeTier),
      };
    }

    // No matching pool found - this is different from API failure
    console.warn(`⚠️ [Pool Data] Pool ${token0}/${token1} NOT FOUND in results`);
    console.warn(`   The Graph returned data, but this specific pair wasn't in it`);
    console.warn(`   USING FALLBACK DATA ($0)`);
    
    return {
      liquidity: '$0',
      volume24h: '$0',
      poolId: '0x0000000000000000000000000000000000000000',
      feeTier: '0.30%',
    };
  } catch (error) {
    console.error(`❌ [Pool Data] ERROR fetching pool data for ${token0}/${token1}:`, error);
    console.error(`   USING FALLBACK DATA ($0)`);
    return {
      liquidity: '$0',
      volume24h: '$0',
      poolId: '0x0000000000000000000000000000000000000000',
      feeTier: '0.30%',
    };
  }
}

export async function GET() {
  console.log('\n🚀 [Uniswap Pools API] Starting pool data fetch...');
  
  try {
    // Fetch real volatility data from Pyth Network for all pairs
    console.log('📡 [Pyth] Fetching price data...');
    const [ethData, btcData, usdcEthPool, usdcWbtcPool, ethUsdtPool] = await Promise.all([
      fetchPythData(PRICE_FEEDS.ETH_USD),
      fetchPythData(PRICE_FEEDS.BTC_USD),
      getRealPoolData('USDC', 'ETH'),
      getRealPoolData('USDC', 'WBTC'),
      getRealPoolData('ETH', 'USDT'),
    ]);

    console.log('\n✅ [Pyth] Price data fetched:');
    console.log(`   ETH: $${ethData.price.toLocaleString()}`);
    console.log(`   BTC: $${btcData.price.toLocaleString()}`);

    // Build pool stats with REAL data from Pyth + The Graph
    const pools = [
      {
        poolId: usdcEthPool.poolId,
        pair: 'USDC/ETH',
        token0: 'USDC',
        token1: 'ETH',
        fee: usdcEthPool.feeTier,
        liquidity: usdcEthPool.liquidity,
        volume24h: usdcEthPool.volume24h,
        currentFee: `${calculateDynamicFee(ethData.volatility).toFixed(2)}%`,
        volatility: `${getVolatilityCategory(ethData.volatility)} (${ethData.volatility.toFixed(1)}%)`,
        volatilityPercent: ethData.volatility,
        price: ethData.price,
      },
      {
        poolId: usdcWbtcPool.poolId,
        pair: 'USDC/WBTC',
        token0: 'USDC',
        token1: 'WBTC',
        fee: usdcWbtcPool.feeTier,
        liquidity: usdcWbtcPool.liquidity,
        volume24h: usdcWbtcPool.volume24h,
        currentFee: `${calculateDynamicFee(btcData.volatility).toFixed(2)}%`,
        volatility: `${getVolatilityCategory(btcData.volatility)} (${btcData.volatility.toFixed(1)}%)`,
        volatilityPercent: btcData.volatility,
        price: btcData.price,
      },
      {
        poolId: ethUsdtPool.poolId,
        pair: 'ETH/USDT',
        token0: 'ETH',
        token1: 'USDT',
        fee: ethUsdtPool.feeTier,
        liquidity: ethUsdtPool.liquidity,
        volume24h: ethUsdtPool.volume24h,
        currentFee: `${calculateDynamicFee(ethData.volatility).toFixed(2)}%`,
        volatility: `${getVolatilityCategory(ethData.volatility)} (${ethData.volatility.toFixed(1)}%)`,
        volatilityPercent: ethData.volatility,
        price: ethData.price,
      },
    ];

    return NextResponse.json({
      success: true,
      pools,
      timestamp: Date.now(),
      sources: {
        volatility: 'Pyth Network (Real-time)',
        liquidity: 'The Graph (Uniswap v3)',
        volume: 'The Graph (Uniswap v3)',
      },
    });
  } catch (error) {
    console.error('Error fetching Uniswap pool data:', error);

    // Return fallback data on error
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch pool data',
      pools: [],
    }, { status: 500 });
  }
}

