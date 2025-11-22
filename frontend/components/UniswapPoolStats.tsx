'use client';

import { useState, useEffect } from 'react';
import { Card } from './Card';
import { Button } from './Button';

interface PoolStat {
  poolId: string;
  pair: string;
  fee: string;
  liquidity: string;
  volume24h: string;
  currentFee: string;
  volatility: string;
  token0: string;
  token1: string;
}

export function UniswapPoolStats() {
  const [pools, setPools] = useState<PoolStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [swapModalOpen, setSwapModalOpen] = useState(false);
  const [selectedPool, setSelectedPool] = useState<PoolStat | null>(null);

  useEffect(() => {
    // Mock data for now - in production, fetch from backend/contracts
    const mockPools: PoolStat[] = [
      {
        poolId: '0x1234...', 
        pair: 'USDC/ETH',
        token0: 'USDC',
        token1: 'ETH',
        fee: '0.3%',
        liquidity: '$1.2M',
        volume24h: '$450K',
        currentFee: '0.25%',
        volatility: 'Medium (2.5%)'
      },
      {
        poolId: '0x5678...',
        pair: 'USDC/WBTC',
        token0: 'USDC',
        token1: 'WBTC',
        fee: '0.3%',
        liquidity: '$850K',
        volume24h: '$320K',
        currentFee: '0.20%',
        volatility: 'Low (1.2%)'
      },
      {
        poolId: '0x9abc...',
        pair: 'ETH/USDT',
        token0: 'ETH',
        token1: 'USDT',
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

  const handleSwap = (pool: PoolStat) => {
    setSelectedPool(pool);
    setSwapModalOpen(true);
  };

  const handleAddLiquidity = (pool: PoolStat) => {
    setSelectedPool(pool);
    // In production: open add liquidity modal
    alert(`Add liquidity to ${pool.pair}\n\nThis will:\n• Earn trading fees (currently ${pool.currentFee})\n• Fees adjust with volatility\n• Powered by Pyth price feeds`);
  };

  if (loading) {
    return (
      <Card variant="default" className="animate-pulse">
        <div className="h-48 bg-green-100 rounded-lg"></div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-display font-bold text-green-700">
            🦄 Trade on Uniswap v4
          </h3>
          <div className="px-4 py-2 bg-pink-100 border-2 border-pink-400 rounded-full">
            <span className="text-sm font-body font-bold text-pink-600">
              🔥 Dynamic Fees Active
            </span>
          </div>
        </div>
        
        {/* Explanation Card */}
        <Card variant="dialogue" className="bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="flex items-start gap-3">
            <div className="text-4xl">💡</div>
            <div className="flex-1 space-y-2">
              <h4 className="font-display font-bold text-green-700 text-lg">
                How to Use Uniswap Pools
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-green-800 font-body">
                <div className="flex items-start gap-2">
                  <span className="text-2xl">🔄</span>
                  <div>
                    <strong>Swap Tokens:</strong> Click &quot;Trade Now&quot; to swap between {pools[0]?.token0 || 'tokens'} at the best dynamic fee
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-2xl">💰</span>
                  <div>
                    <strong>Add Liquidity:</strong> Earn fees when others trade. Fees increase during volatility to protect you
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-4">
        {pools.map((pool, index) => (
          <Card key={index} variant="default" className="hover:shadow-ac-lg transition-all">
            <div className="space-y-4">
              {/* Top Row: Pool Info + Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Pool Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-2xl font-display font-bold text-green-700">
                      {pool.pair}
                    </h4>
                    <span className="px-3 py-1 bg-green-100 border-2 border-green-400 rounded-full text-xs font-body font-bold text-green-700">
                      Base: {pool.fee}
                    </span>
                  </div>
                  <p className="text-xs text-green-600 font-mono">
                    {pool.poolId}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 flex-wrap">
                  <Button 
                    variant="primary" 
                    size="md"
                    onClick={() => handleSwap(pool)}
                  >
                    🔄 Trade Now
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="md"
                    onClick={() => handleAddLiquidity(pool)}
                  >
                    💰 Add Liquidity
                  </Button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-cream-50 rounded-lg border border-green-200">
                <div className="text-center">
                  <p className="text-xs text-green-600 font-body mb-1">Liquidity</p>
                  <p className="text-lg font-display font-bold text-green-700">
                    {pool.liquidity}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-green-600 font-body mb-1">24h Volume</p>
                  <p className="text-lg font-display font-bold text-green-700">
                    {pool.volume24h}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-green-600 font-body mb-1">Current Fee</p>
                  <p className="text-xl font-display font-bold text-pink-600">
                    {pool.currentFee}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-green-600 font-body mb-1">Volatility</p>
                  <p className={`text-sm font-body font-bold ${
                    pool.volatility.startsWith('High') ? 'text-red-600' :
                    pool.volatility.startsWith('Medium') ? 'text-orange-600' :
                    'text-green-600'
                  }`}>
                    {pool.volatility}
                  </p>
                </div>
              </div>

              {/* Volatility Indicator Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-green-600 font-body">
                  <span className="font-bold">⚡ Dynamic Fee Adjustment</span>
                  <span>Powered by Pyth Network</span>
                </div>
                <div className="h-3 bg-green-100 rounded-full overflow-hidden border border-green-300">
                  <div 
                    className={`h-full rounded-full transition-all ${
                      pool.volatility.startsWith('High') ? 'bg-gradient-to-r from-red-500 to-red-600 w-full' :
                      pool.volatility.startsWith('Medium') ? 'bg-gradient-to-r from-orange-500 to-orange-600 w-2/3' :
                      'bg-gradient-to-r from-green-500 to-green-600 w-1/3'
                    }`}
                  />
                </div>
                <div className="flex justify-between text-xs text-green-700 font-body italic">
                  <span>0.1% (Low Vol)</span>
                  <span>0.2% (Medium Vol)</span>
                  <span>0.3% (High Vol)</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* How It Works */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card variant="dialogue" className="text-center">
          <div className="text-4xl mb-2">📊</div>
          <h5 className="font-display font-bold text-green-700 mb-1">1. Choose Pool</h5>
          <p className="text-sm text-green-800 font-body">
            Select the token pair you want to trade
          </p>
        </Card>
        <Card variant="dialogue" className="text-center">
          <div className="text-4xl mb-2">⚡</div>
          <h5 className="font-display font-bold text-green-700 mb-1">2. Get Best Rate</h5>
          <p className="text-sm text-green-800 font-body">
            Fee adjusts automatically based on volatility
          </p>
        </Card>
        <Card variant="dialogue" className="text-center">
          <div className="text-4xl mb-2">✅</div>
          <h5 className="font-display font-bold text-green-700 mb-1">3. Trade Instantly</h5>
          <p className="text-sm text-green-800 font-body">
            Execute swap with optimal pricing
          </p>
        </Card>
      </div>

      {/* Simple Swap Modal */}
      {swapModalOpen && selectedPool && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setSwapModalOpen(false)}>
          <div className="max-w-md w-full bg-cream border-3 border-brown-500 rounded-2xl p-6 shadow-ac-lg" onClick={(e) => e.stopPropagation()}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-2xl font-display font-bold text-green-700">
                  Swap on Uniswap v4
                </h4>
                <button onClick={() => setSwapModalOpen(false)} className="text-2xl text-green-600 hover:text-pink-600">
                  ✕
                </button>
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-cream-50 rounded-lg border-2 border-green-300">
                  <p className="text-sm text-green-600 font-body mb-2">You Pay</p>
                  <div className="flex items-center justify-between">
                    <input 
                      type="text" 
                      placeholder="0.00" 
                      className="text-2xl font-display font-bold bg-transparent outline-none flex-1"
                    />
                    <span className="px-3 py-1 bg-green-100 border border-green-400 rounded-full text-sm font-body font-bold">
                      {selectedPool.token0}
                    </span>
                  </div>
                </div>

                <div className="text-center text-2xl">🔄</div>

                <div className="p-4 bg-cream-50 rounded-lg border-2 border-green-300">
                  <p className="text-sm text-green-600 font-body mb-2">You Receive</p>
                  <div className="flex items-center justify-between">
                    <input 
                      type="text" 
                      placeholder="0.00" 
                      className="text-2xl font-display font-bold bg-transparent outline-none flex-1"
                      disabled
                    />
                    <span className="px-3 py-1 bg-green-100 border border-green-400 rounded-full text-sm font-body font-bold">
                      {selectedPool.token1}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-pink-50 border-2 border-pink-300 rounded-lg text-sm space-y-1">
                  <div className="flex justify-between font-body">
                    <span className="text-green-700">Current Fee:</span>
                    <span className="font-bold text-pink-600">{selectedPool.currentFee}</span>
                  </div>
                  <div className="flex justify-between font-body">
                    <span className="text-green-700">Volatility:</span>
                    <span className="font-bold text-green-700">{selectedPool.volatility}</span>
                  </div>
                  <p className="text-xs text-green-600 italic mt-2">
                    💡 Fee adjusts automatically based on market conditions
                  </p>
                </div>

                <Button variant="primary" size="lg" className="w-full">
                  🔄 Swap Now
                </Button>

                <p className="text-xs text-center text-green-600 font-body">
                  Coming soon: Connect your wallet to trade
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

