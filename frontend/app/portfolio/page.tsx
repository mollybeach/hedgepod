/**
 * Portfolio Dashboard - Real-time data from Supabase
 */

import { PageLayout } from '@/components/PageLayout';
import { Navigation } from '@/components/Navigation';
import { PortfolioStats } from '@/components/PortfolioStats';

export default function Portfolio() {
  return (
    <PageLayout>
      <Navigation />
      
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
    </PageLayout>
  );
}

