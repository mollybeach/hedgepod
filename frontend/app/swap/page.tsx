/**
 * Swap Page - Uniswap v4 Trading
 * Trade tokens with dynamic fees based on volatility
 */

'use client';

import { PageLayout } from '@/components/PageLayout';
import { Navigation } from '@/components/Navigation';
import { UniswapPoolStats } from '@/components/UniswapPoolStats';
import { WalletPrompt } from '@/components/WalletPrompt';
import { useAccount } from 'wagmi';

export default function SwapPage() {
  const { isConnected } = useAccount();

  return (
    <PageLayout>
      <Navigation />
      
      {!isConnected ? (
        <WalletPrompt 
          title="Connect to Start Trading"
          message="Connect your wallet to swap tokens on Uniswap v4 with dynamic fees"
        />
      ) : (
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center items-center gap-3">
              <span className="text-6xl">🦄</span>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-green-700 drop-shadow-lg">
                Swap Tokens
              </h1>
            </div>
            <p className="text-lg md:text-xl text-green-800 font-body max-w-2xl mx-auto">
              Trade on Uniswap v4 with dynamic fees that adjust to market volatility
            </p>
          </div>

          {/* Uniswap Pools */}
          <UniswapPoolStats />
        </div>
      )}
    </PageLayout>
  );
}

