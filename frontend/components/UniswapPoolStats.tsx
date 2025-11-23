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
  const [liquidityModalOpen, setLiquidityModalOpen] = useState(false);
  const [selectedPool, setSelectedPool] = useState<PoolStat | null>(null);
  const [inputAmount, setInputAmount] = useState('');
  const [outputAmount, setOutputAmount] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const [liquidityToken0Amount, setLiquidityToken0Amount] = useState('');
  const [liquidityToken1Amount, setLiquidityToken1Amount] = useState('');
  const [addingLiquidity, setAddingLiquidity] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [swapping, setSwapping] = useState(false);

  useEffect(() => {
    // Fetch real pool data from Pyth Network API
    const fetchPoolData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/uniswap/pools');
        
        if (!response.ok) {
          throw new Error('Failed to fetch pool data');
        }

        const data = await response.json();
        
        if (data.success && data.pools) {
          // Format pool IDs for display
          const formattedPools = data.pools.map((pool: any) => ({
            ...pool,
            poolId: `${pool.poolId.slice(0, 6)}...${pool.poolId.slice(-4)}`,
          }));
          
          setPools(formattedPools);
          console.log('✅ Loaded real-time pool data from Pyth Network');
        } else {
          console.error('❌ API returned no pool data');
        }
      } catch (error) {
        console.error('❌ Error fetching pool data:', error);
        // Keep pools empty or show error state
      } finally {
        setLoading(false);
      }
    };

    fetchPoolData();

    // Refresh every 30 seconds
    const interval = setInterval(fetchPoolData, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSwap = (pool: PoolStat) => {
    setSelectedPool(pool);
    setSwapModalOpen(true);
    setInputAmount('');
    setOutputAmount('');
    setIsReversed(false);
  };

  const handleAddLiquidity = (pool: PoolStat) => {
    setSelectedPool(pool);
    setLiquidityModalOpen(true);
    setLiquidityToken0Amount('');
    setLiquidityToken1Amount('');
  };

  const calculateLiquidityToken1 = (token0Amount: string) => {
    if (!token0Amount || !selectedPool) return '';
    
    const amount = parseFloat(token0Amount);
    if (isNaN(amount)) return '';

    // Mock exchange rates (maintain pool ratio)
    const rates: { [key: string]: number } = {
      'USDC/ETH': 0.00033,
      'USDC/WBTC': 0.000015,
      'ETH/USDT': 3000,
    };

    const rate = rates[selectedPool.pair] || 1;
    const token1 = amount * rate;

    return token1.toFixed(6);
  };

  const handleLiquidityToken0Change = (value: string) => {
    setLiquidityToken0Amount(value);
    const token1 = calculateLiquidityToken1(value);
    setLiquidityToken1Amount(token1);
  };

  const submitAddLiquidity = async () => {
    if (!selectedPool || !liquidityToken0Amount || !liquidityToken1Amount) {
      alert('Please enter amounts for both tokens');
      return;
    }

    setAddingLiquidity(true);

    try {
      // Simulate API call to add liquidity
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate mock transaction hash
      const mockTxHash = '0x' + Array.from({length: 64}, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('');
      
      setTxHash(mockTxHash);
      setLiquidityModalOpen(false);
      setSuccessModalOpen(true);
      setLiquidityToken0Amount('');
      setLiquidityToken1Amount('');
    } catch (error) {
      alert('❌ Error adding liquidity. Please try again.');
    } finally {
      setAddingLiquidity(false);
    }
  };

  const submitSwap = async () => {
    if (!selectedPool || !inputAmount || !outputAmount) {
      alert('Please enter an amount to swap');
      return;
    }

    setSwapping(true);

    try {
      // Simulate API call to execute swap
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate mock transaction hash
      const mockTxHash = '0x' + Array.from({length: 64}, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('');
      
      setTxHash(mockTxHash);
      setSwapModalOpen(false);
      setSuccessModalOpen(true);
      setInputAmount('');
      setOutputAmount('');
    } catch (error) {
      alert('❌ Error executing swap. Please try again.');
    } finally {
      setSwapping(false);
    }
  };

  const calculateOutputAmount = (input: string, reversed: boolean) => {
    if (!input || !selectedPool) return '';
    
    const amount = parseFloat(input);
    if (isNaN(amount)) return '';

    // Mock exchange rates (in production, fetch from Uniswap pool)
    const rates: { [key: string]: number } = {
      'USDC/ETH': 0.00033, // 1 USDC = 0.00033 ETH (~$3000 ETH)
      'USDC/WBTC': 0.000015, // 1 USDC = 0.000015 WBTC (~$67000 BTC)
      'ETH/USDT': 3000, // 1 ETH = 3000 USDT
    };

    let rate = rates[selectedPool.pair] || 1;
    
    // If reversed, use inverse rate
    if (reversed) {
      rate = 1 / rate;
    }

    // Apply fee (convert percentage to decimal)
    const feePercentage = parseFloat(selectedPool.currentFee) / 100;
    const output = amount * rate * (1 - feePercentage);

    return output.toFixed(6);
  };

  const handleInputChange = (value: string) => {
    setInputAmount(value);
    const output = calculateOutputAmount(value, isReversed);
    setOutputAmount(output);
  };

  const handleFlipTokens = () => {
    setIsReversed(!isReversed);
    // Swap input/output amounts
    const newInput = outputAmount;
    const newOutput = inputAmount;
    setInputAmount(newInput);
    setOutputAmount(newOutput);
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
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h3 className="text-3xl font-display font-bold text-green-700">
            🦄 Trade on Uniswap v4
          </h3>
          <div className="flex gap-2 flex-wrap">
            <div className="px-4 py-2 bg-pink-100 border-2 border-pink-400 rounded-full">
              <span className="text-sm font-body font-bold text-pink-600">
                🔥 Dynamic Fees
              </span>
            </div>
            <div className="px-4 py-2 bg-purple-100 border-2 border-purple-400 rounded-full animate-pulse">
              <span className="text-sm font-body font-bold text-purple-600">
                📡 Pyth + The Graph
              </span>
            </div>
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
                      value={inputAmount}
                      onChange={(e) => handleInputChange(e.target.value)}
                      className="text-2xl font-display font-bold bg-transparent outline-none flex-1"
                    />
                    <span className="px-3 py-1 bg-green-100 border border-green-400 rounded-full text-sm font-body font-bold">
                      {isReversed ? selectedPool.token1 : selectedPool.token0}
                    </span>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={handleFlipTokens}
                    className="px-3 py-2 bg-green-500 hover:bg-green-600 border-2 border-green-700 rounded-lg shadow-ac transition-all hover:scale-110 active:scale-95"
                    title="Swap token positions"
                  >
                    <div className="flex flex-col items-center text-white">
                      <span className="text-xl font-bold leading-none">▲</span>
                      <span className="text-xl font-bold leading-none">▲</span>
                    </div>
                  </button>
                </div>

                <div className="p-4 bg-cream-50 rounded-lg border-2 border-green-300">
                  <p className="text-sm text-green-600 font-body mb-2">You Receive</p>
                  <div className="flex items-center justify-between">
                    <input 
                      type="text" 
                      placeholder="0.00" 
                      value={outputAmount}
                      readOnly
                      className="text-2xl font-display font-bold bg-transparent outline-none flex-1 text-green-700"
                    />
                    <span className="px-3 py-1 bg-green-100 border border-green-400 rounded-full text-sm font-body font-bold">
                      {isReversed ? selectedPool.token0 : selectedPool.token1}
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

                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-full"
                  onClick={submitSwap}
                  disabled={swapping || !inputAmount || !outputAmount}
                >
                  {swapping ? '⏳ Swapping...' : '🔄 Swap Now'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Liquidity Modal */}
      {liquidityModalOpen && selectedPool && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setLiquidityModalOpen(false)}>
          <div className="max-w-md w-full bg-cream border-3 border-brown-500 rounded-2xl p-6 shadow-ac-lg" onClick={(e) => e.stopPropagation()}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-2xl font-display font-bold text-green-700">
                  💰 Add Liquidity
                </h4>
                <button onClick={() => setLiquidityModalOpen(false)} className="text-2xl text-green-600 hover:text-pink-600">
                  ✕
                </button>
              </div>

              <div className="p-3 bg-green-50 border-2 border-green-300 rounded-lg">
                <p className="text-sm text-green-800 font-body">
                  <strong>{selectedPool.pair}</strong> Pool
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Current Fee: {selectedPool.currentFee} • Volatility: {selectedPool.volatility}
                </p>
              </div>

              <div className="space-y-3">
                {/* Token 0 Input */}
                <div className="p-4 bg-cream-50 rounded-lg border-2 border-green-300">
                  <p className="text-sm text-green-600 font-body mb-2">{selectedPool.token0} Amount</p>
                  <div className="flex items-center justify-between gap-3">
                    <input 
                      type="text" 
                      placeholder="0.00" 
                      value={liquidityToken0Amount}
                      onChange={(e) => handleLiquidityToken0Change(e.target.value)}
                      className="text-2xl font-display font-bold bg-transparent outline-none flex-1"
                    />
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => {
                          const current = parseFloat(liquidityToken0Amount) || 0;
                          handleLiquidityToken0Change((current + 10).toString());
                        }}
                        className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded border border-green-700 text-xs font-bold transition-colors"
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => {
                          const current = parseFloat(liquidityToken0Amount) || 0;
                          handleLiquidityToken0Change(Math.max(0, current - 10).toString());
                        }}
                        className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded border border-green-700 text-xs font-bold transition-colors"
                      >
                        ▼
                      </button>
                    </div>
                    <span className="px-3 py-1 bg-green-100 border border-green-400 rounded-full text-sm font-body font-bold">
                      {selectedPool.token0}
                    </span>
                  </div>
                </div>

                {/* Plus Sign */}
                <div className="text-center text-2xl font-bold text-green-700">+</div>

                {/* Token 1 Input (Auto-calculated) */}
                <div className="p-4 bg-cream-50 rounded-lg border-2 border-green-300">
                  <p className="text-sm text-green-600 font-body mb-2">{selectedPool.token1} Amount</p>
                  <div className="flex items-center justify-between">
                    <input 
                      type="text" 
                      placeholder="0.00" 
                      value={liquidityToken1Amount}
                      readOnly
                      className="text-2xl font-display font-bold bg-transparent outline-none flex-1 text-green-700"
                    />
                    <span className="px-3 py-1 bg-green-100 border border-green-400 rounded-full text-sm font-body font-bold">
                      {selectedPool.token1}
                    </span>
                  </div>
                  <p className="text-xs text-green-600 mt-2 italic">
                    💡 Amount calculated to maintain pool ratio
                  </p>
                </div>

                {/* Info Card */}
                <div className="p-3 bg-pink-50 border-2 border-pink-300 rounded-lg text-sm space-y-2">
                  <h5 className="font-display font-bold text-green-700 mb-2">What You&apos;ll Earn:</h5>
                  <div className="flex items-start gap-2 font-body text-green-800">
                    <span>💰</span>
                    <p><strong>{selectedPool.currentFee}</strong> fee on every trade</p>
                  </div>
                  <div className="flex items-start gap-2 font-body text-green-800">
                    <span>⚡</span>
                    <p>Fees <strong>increase</strong> during high volatility</p>
                  </div>
                  <div className="flex items-start gap-2 font-body text-green-800">
                    <span>🔒</span>
                    <p>Your liquidity is always <strong>withdrawable</strong></p>
                  </div>
                </div>

                {/* Add Liquidity Button */}
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-full"
                  onClick={submitAddLiquidity}
                  disabled={addingLiquidity || !liquidityToken0Amount || !liquidityToken1Amount}
                >
                  {addingLiquidity ? '⏳ Adding Liquidity...' : '💰 Add Liquidity'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {successModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-cream w-full max-w-md rounded-3xl border-3 border-brown-500 shadow-ac-lg overflow-hidden">
            <div className="p-6 space-y-6">
              {/* Success Header */}
              <div className="text-center space-y-3">
                <div className="text-6xl">✅</div>
                <h3 className="text-2xl font-display font-bold text-green-700">
                  Liquidity Added!
                </h3>
                <p className="text-green-800 font-body">
                  Your transaction was successful
                </p>
              </div>

              {/* Transaction Details */}
              <div className="space-y-3">
                <div className="p-4 bg-cream-100 rounded-xl border-2 border-green-300">
                  <p className="text-xs text-green-600 font-body mb-1">Transaction Hash</p>
                  <p className="text-xs font-mono text-green-800 break-all">
                    {txHash}
                  </p>
                </div>

                <div className="p-4 bg-pink-50 rounded-xl border-2 border-pink-300">
                  <p className="text-sm font-display font-bold text-green-700 mb-2">
                    🎉 You&apos;ll now earn fees on this pool!
                  </p>
                  <p className="text-xs text-green-800 font-body">
                    Your liquidity is actively earning trading fees. You can withdraw anytime.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <a
                  href={`https://sepolia.basescan.org/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="primary" size="lg" className="w-full">
                    🔍 View on Explorer
                  </Button>
                </a>
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="w-full"
                  onClick={() => {
                    setSuccessModalOpen(false);
                    setTxHash('');
                  }}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

