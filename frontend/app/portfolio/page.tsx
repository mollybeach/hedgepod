/**
 * Portfolio Dashboard - Animal Crossing Theme
 */

import { PageLayout } from '@/components/PageLayout';
import { Navigation } from '@/components/Navigation';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Avatar } from '@/components/Avatar';

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
            Track your yields across all chains
          </p>
        </div>

        {/* Portfolio Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card variant="dialogue">
            <div className="text-center">
              <p className="text-sm font-body text-green-700 mb-2">Total Value</p>
              <p className="text-3xl font-display font-bold text-green-800">$12,345</p>
              <p className="text-xs text-pink-600 mt-2">+12.5% this month</p>
            </div>
          </Card>
          
          <Card variant="dialogue">
            <div className="text-center">
              <p className="text-sm font-body text-green-700 mb-2">Active Chains</p>
              <p className="text-3xl font-display font-bold text-green-800">5</p>
              <p className="text-xs text-green-600 mt-2">8 available</p>
            </div>
          </Card>
          
          <Card variant="dialogue">
            <div className="text-center">
              <p className="text-sm font-body text-green-700 mb-2">APR</p>
              <p className="text-3xl font-display font-bold text-green-800">8.3%</p>
              <p className="text-xs text-pink-600 mt-2">Auto-rebalancing</p>
            </div>
          </Card>
        </div>

        {/* Agent Status */}
        <Card variant="dialogue">
          <div className="flex items-center gap-6">
            <Avatar emoji="🤖" size="md" />
            <div className="flex-1">
              <h3 className="text-xl font-display font-bold text-green-700 mb-2">
                Your Agent
              </h3>
              <p className="text-sm font-body text-green-800">
                Monitoring yields across 8 chains. Last rebalance: 2 hours ago.
              </p>
            </div>
            <Button variant="secondary">Configure</Button>
          </div>
        </Card>

        {/* Chain Breakdown */}
        <div>
          <h2 className="text-2xl font-display font-bold text-green-700 mb-4">
            Chain Breakdown
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {['World Chain', 'Base', 'Celo', 'Polygon', 'Arbitrum'].map((chain) => (
              <Card key={chain} variant="default">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-display font-bold text-green-700">{chain}</p>
                    <p className="text-sm text-green-600">$2,400</p>
                  </div>
                  <p className="text-lg font-display font-bold text-pink-600">7.8% APR</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

