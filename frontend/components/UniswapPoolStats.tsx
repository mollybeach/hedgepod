'use client';

import { useState, useEffect } from 'react';
import { Card } from './Card';

interface PoolStat {
  poolId: string;
  pair: string;
  fee: string;
  liquidity: string;
  volume24h: string;
  currentFee: string;
  volatility: string;
}

export function UniswapPoolStats() {
  const [pools, setPools] = useState<PoolStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for now - in production, fetch from backend/contracts
    const mockPools: PoolStat[] = [
      {
        poolId: '0x1234...', 
        pair: 'USDC/ETH',
        fee: '0.3%',
        liquidity: '$1.2M',
        volume24h: '$450K',
        currentFee: '0.25%',
        volatility: 'Medium (2.5%)'
      },
      {
        poolId: '0x5678...',
        pair: 'USDC/WBTC',
        fee: '0.3%',
        liquidity: '$850K',
        volume24h: '$320K',
        currentFee: '0.20%',
        volatility: 'Low (1.2%)'
      },
      {
        poolId: '0x9abc...',
        pair: 'ETH/USDT',
        fee: '0.3%',
        liquidity: '$2.1M',
        volume24h: '$780K',
        currentFee: '0.30%',
        volatility: 'High (4.8%)'
      }
    ];

    // Simulate loading
    setTimeout(() => {
      setPools(mockPools);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <Card variant="default" className="animate-pulse">
        <div className="h-48 bg-green-100 rounded-lg"></div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-display font-bold text-green-700">
          🦄 Uniswap v4 Pools
        </h3>
        <div className="px-3 py-1 bg-pink-100 border-2 border-pink-400 rounded-full">
          <span className="text-sm font-body font-bold text-pink-600">
            Dynamic Fees Active
          </span>
        </div>
      </div>

      <div className="grid gap-4">
        {pools.map((pool, index) => (
          <Card key={index} variant="default" className="hover:shadow-ac-lg transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Pool Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="text-xl font-display font-bold text-green-700">
                    {pool.pair}
                  </h4>
                  <span className="px-2 py-0.5 bg-green-100 border border-green-400 rounded-full text-xs font-body text-green-700">
                    {pool.fee}
                  </span>
                </div>
                <p className="text-xs text-green-600 font-mono">
                  Pool ID: {pool.poolId}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-xs text-green-600 font-body">Liquidity</p>
                  <p className="text-lg font-display font-bold text-green-700">
                    {pool.liquidity}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-green-600 font-body">24h Volume</p>
                  <p className="text-lg font-display font-bold text-green-700">
                    {pool.volume24h}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-green-600 font-body">Current Fee</p>
                  <p className="text-lg font-display font-bold text-pink-600">
                    {pool.currentFee}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-green-600 font-body">Volatility</p>
                  <p className={`text-sm font-body font-bold ${
                    pool.volatility.startsWith('High') ? 'text-red-600' :
                    pool.volatility.startsWith('Medium') ? 'text-orange-600' :
                    'text-green-600'
                  }`}>
                    {pool.volatility}
                  </p>
                </div>
              </div>
            </div>

            {/* Volatility Indicator Bar */}
            <div className="mt-4 space-y-1">
              <div className="flex justify-between text-xs text-green-600 font-body">
                <span>Fee Adjustment</span>
                <span>Based on Pyth volatility data</span>
              </div>
              <div className="h-2 bg-green-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all ${
                    pool.volatility.startsWith('High') ? 'bg-red-500 w-full' :
                    pool.volatility.startsWith('Medium') ? 'bg-orange-500 w-2/3' :
                    'bg-green-500 w-1/3'
                  }`}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Info Note */}
      <div className="p-4 bg-blue-50 border-2 border-blue-300 rounded-xl">
        <p className="text-sm text-blue-800 font-body">
          💡 <span className="font-bold">Dynamic Fees:</span> Fees automatically adjust based on market volatility using 
          Pyth Network price feeds. High volatility = higher fees to protect liquidity providers.
        </p>
      </div>
    </div>
  );
}

