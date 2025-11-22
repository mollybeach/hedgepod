'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Avatar } from '@/components/Avatar';
import { 
  getTotalStats, 
  getChainAPRs, 
  getRecentRebalances,
  subscribeToRebalances 
} from '@/lib/supabase';

type TotalStats = {
  totalValue: number;
  totalRebalances: number;
  avgAPR: number;
  activeAgents: number;
  totalAgents: number;
};

type ChainAPR = {
  chain: string;
  apr: number;
  tvl?: number;
  snapshot_at: string;
};

type Rebalance = {
  id: string;
  agent_id: string;
  from_chain: string;
  to_chain: string;
  amount: number;
  token: string;
  from_apr: number;
  to_apr: number;
  status: string;
  initiated_at: string;
};

export function PortfolioStats() {
  const [stats, setStats] = useState<TotalStats | null>(null);
  const [chainAPRs, setChainAPRs] = useState<ChainAPR[]>([]);
  const [recentRebalances, setRecentRebalances] = useState<Rebalance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // Fetch total stats
        const totalStats = await getTotalStats();
        setStats(totalStats);

        // Fetch chain APRs
        const aprs = await getChainAPRs();
        setChainAPRs(aprs);

        // Fetch recent rebalances
        const rebalances = await getRecentRebalances(5);
        setRecentRebalances(rebalances);

        setError(null);
      } catch (err) {
        console.error('Error fetching portfolio data:', err);
        setError('Unable to load portfolio data. Using demo data.');
        
        // Set demo data
        setStats({
          totalValue: 12345,
          totalRebalances: 47,
          avgAPR: 8.3,
          activeAgents: 3,
          totalAgents: 3,
        });
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    // Subscribe to real-time rebalance updates
    const subscription = subscribeToRebalances((newRebalance) => {
      setRecentRebalances((prev) => [newRebalance, ...prev.slice(0, 4)]);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto"></div>
          <p className="text-green-700 font-body">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  // Group chain APRs by chain for latest values
  const latestAPRs = chainAPRs.reduce((acc, item) => {
    if (!acc[item.chain] || new Date(item.snapshot_at) > new Date(acc[item.chain].snapshot_at)) {
      acc[item.chain] = item;
    }
    return acc;
  }, {} as Record<string, ChainAPR>);

  return (
    <div className="space-y-8">
      {/* Error Message */}
      {error && (
        <Card variant="dialogue">
          <div className="text-center text-yellow-700">
            <p className="font-body">⚠️ {error}</p>
          </div>
        </Card>
      )}

      {/* Portfolio Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card variant="dialogue">
          <div className="text-center">
            <p className="text-sm font-body text-green-700 mb-2">Total Value</p>
            <p className="text-3xl font-display font-bold text-green-800">
              ${stats?.totalValue.toLocaleString() || '0'}
            </p>
            <p className="text-xs text-pink-600 mt-2">+12.5% this month</p>
          </div>
        </Card>
        
        <Card variant="dialogue">
          <div className="text-center">
            <p className="text-sm font-body text-green-700 mb-2">Total Rebalances</p>
            <p className="text-3xl font-display font-bold text-green-800">
              {stats?.totalRebalances || 0}
            </p>
            <p className="text-xs text-green-600 mt-2">
              {stats?.activeAgents || 0} active agents
            </p>
          </div>
        </Card>
        
        <Card variant="dialogue">
          <div className="text-center">
            <p className="text-sm font-body text-green-700 mb-2">Average APR</p>
            <p className="text-3xl font-display font-bold text-green-800">
              {stats?.avgAPR.toFixed(2) || '0.00'}%
            </p>
            <p className="text-xs text-pink-600 mt-2">Auto-rebalancing</p>
          </div>
        </Card>
      </div>

      {/* Agent Status */}
      <Card variant="dialogue">
        <div className="flex items-center gap-6">
          <Avatar size="md" />
          <div className="flex-1">
            <h3 className="text-xl font-display font-bold text-green-700 mb-2">
              Your Agents
            </h3>
            <p className="text-sm font-body text-green-800">
              {stats?.activeAgents || 0} agents monitoring yields across 8 chains.
              {recentRebalances.length > 0 && (
                <span className="block mt-1">
                  Last rebalance: {new Date(recentRebalances[0].initiated_at).toLocaleString()}
                </span>
              )}
            </p>
          </div>
          <Button variant="secondary">View Agents</Button>
        </div>
      </Card>

      {/* Chain Breakdown */}
      <div>
        <h2 className="text-2xl font-display font-bold text-green-700 mb-4">
          Chain Breakdown
        </h2>
        {Object.keys(latestAPRs).length === 0 ? (
          <Card variant="dialogue">
            <p className="text-center text-green-700 font-body">
              No chain data available yet. Deploy agents to start tracking!
            </p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(latestAPRs).map(([chain, data]) => (
              <Card key={chain} variant="default">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-display font-bold text-green-700 capitalize">{chain}</p>
                    <p className="text-sm text-green-600">
                      TVL: ${data.tvl?.toLocaleString() || 'N/A'}
                    </p>
                  </div>
                  <p className="text-lg font-display font-bold text-pink-600">
                    {data.apr.toFixed(2)}% APR
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Recent Rebalances */}
      {recentRebalances.length > 0 && (
        <div>
          <h2 className="text-2xl font-display font-bold text-green-700 mb-4">
            Recent Rebalances
          </h2>
          <div className="space-y-3">
            {recentRebalances.map((rebalance) => (
              <Card key={rebalance.id} variant="default">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-body text-green-800">
                      <span className="font-bold capitalize">{rebalance.from_chain}</span>
                      {' → '}
                      <span className="font-bold capitalize">{rebalance.to_chain}</span>
                    </p>
                    <p className="text-sm text-green-600">
                      {rebalance.amount} {rebalance.token} • 
                      APR: {rebalance.from_apr.toFixed(2)}% → {rebalance.to_apr.toFixed(2)}%
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    rebalance.status === 'confirmed' 
                      ? 'bg-green-200 text-green-800' 
                      : rebalance.status === 'pending'
                      ? 'bg-yellow-200 text-yellow-800'
                      : 'bg-red-200 text-red-800'
                  }`}>
                    {rebalance.status}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

