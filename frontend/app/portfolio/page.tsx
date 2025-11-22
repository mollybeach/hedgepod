/**
 * Portfolio Dashboard - Real-time data from Supabase
 */

'use client';

import { PageLayout } from '@/components/PageLayout';
import { Navigation } from '@/components/Navigation';
import { PortfolioStats } from '@/components/PortfolioStats';
import { WalletPrompt } from '@/components/WalletPrompt';
import { useAccount } from 'wagmi';

export default function Portfolio() {
  const { isConnected } = useAccount();

  return (
    <PageLayout>
      <Navigation />
      
      {!isConnected ? (
        <WalletPrompt 
          title="Connect to View Portfolio"
          message="Connect your wallet to see your portfolio, yields, and agent performance"
        />
      ) : (
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-green-700 drop-shadow-lg">
              Your Portfolio
            </h1>
            <p className="text-lg text-green-800 font-body">
              Track your yields across all chains in real-time
            </p>
          </div>

          {/* Portfolio Stats - Now with real Supabase data */}
          <PortfolioStats />
        </div>
      )}
    </PageLayout>
  );
}

