/**
 * Agents Dashboard - Animal Crossing Theme
 * Monitor and configure your autonomous yield agents
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { PageLayout } from '@/components/PageLayout';
import { Navigation } from '@/components/Navigation';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Avatar } from '@/components/Avatar';
import { Badge } from '@/components/Badge';
import { WalletPrompt } from '@/components/WalletPrompt';

interface Agent {
  id: number;
  agent_id: string;
  agent_name: string;
  status: 'active' | 'standby' | 'inactive' | 'paused';
  chain_distribution: Record<string, number>;
  last_rebalance_at: string | null;
  total_rebalances: number;
  current_apr: number;
  total_value_managed: number;
}

export default function Agents() {
  const router = useRouter();
  const { address, isConnected } = useAccount();

  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAgents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      // TODO: Filter by wallet address once owner_wallet column is added to DB
      const response = await fetch('/api/agents');
      const data = await response.json();

      if (data.success) {
        setAgents(data.agents.map((agent: any, idx: number) => ({
          ...agent,
          id: idx + 1,
        })));
      } else {
        setError(data.error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getActiveChains = (chainDistribution: Record<string, number>) => {
    return Object.keys(chainDistribution || {});
  };

  const formatLastRebalance = (timestamp: string | null) => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    if (diffDays < 30) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  const handleConfigure = (agentId: string) => {
    router.push(`/agents/${agentId}/configure`);
  };

  const handleViewHistory = (agentId: string) => {
    router.push(`/agents/${agentId}/history`);
  };

  const handleActivate = async (agentId: string) => {
    if (!confirm('Activate this agent? It will start monitoring and rebalancing.')) return;

    try {
      const response = await fetch(`/api/agents/${agentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'activate' }),
      });

      const data = await response.json();

      if (data.success) {
        alert('✅ Agent activated successfully!');
        fetchAgents();
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (err: any) {
      alert(`❌ Error: ${err.message}`);
    }
  };

  const handleDeployNew = () => {
    if (!isConnected) {
      alert('Please connect your wallet first!');
      return;
    }
    router.push('/agents/deploy');
  };

  // Calculate totals
  const totalAgents = agents.length;
  const activeAgents = agents.filter((a) => a.status === 'active').length;
  const totalRebalances = agents.reduce((sum, a) => sum + (a.total_rebalances || 0), 0);
  const avgAPR = totalAgents > 0
    ? agents.reduce((sum, a) => sum + (a.current_apr || 0), 0) / totalAgents
    : 0;

  return (
    <PageLayout>
      <Navigation />

      {!isConnected ? (
        <WalletPrompt 
          title="Connect to Manage Agents"
          message="Connect your wallet to deploy agents and monitor their performance"
        />
      ) : (
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-green-700 drop-shadow-lg">
              Your Agents
            </h1>
            <p className="text-lg text-green-800 font-body max-w-2xl mx-auto">
              Autonomous AI agents working 24/7 to maximize your yields across all chains
            </p>
          </div>

        {/* Agent Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card variant="dialogue">
            <div className="text-center">
              <p className="text-sm font-body text-green-700 mb-2">Total Agents</p>
              <p className="text-3xl font-display font-bold text-green-800">{totalAgents}</p>
            </div>
          </Card>

          <Card variant="dialogue">
            <div className="text-center">
              <p className="text-sm font-body text-green-700 mb-2">Active</p>
              <p className="text-3xl font-display font-bold text-pink-600">{activeAgents}</p>
            </div>
          </Card>

          <Card variant="dialogue">
            <div className="text-center">
              <p className="text-sm font-body text-green-700 mb-2">Total Rebalances</p>
              <p className="text-3xl font-display font-bold text-green-800">{totalRebalances}</p>
            </div>
          </Card>

          <Card variant="dialogue">
            <div className="text-center">
              <p className="text-sm font-body text-green-700 mb-2">Avg APR</p>
              <p className="text-3xl font-display font-bold text-pink-600">
                {avgAPR.toFixed(1)}%
              </p>
            </div>
          </Card>
        </div>

        {/* Loading State */}
        {loading && (
          <Card variant="dialogue">
            <div className="text-center py-8">
              <p className="text-green-700 font-body">Loading agents...</p>
            </div>
          </Card>
        )}

        {/* Error State */}
        {error && !loading && (
          <Card variant="dialogue">
            <div className="text-center py-8">
              <p className="text-red-600 font-body">❌ {error}</p>
            </div>
          </Card>
        )}

        {/* Agents List */}
        {!loading && !error && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-display font-bold text-green-700">
                All Agents
              </h2>
              <Button variant="primary" size="md" onClick={handleDeployNew}>
                + Deploy New Agent
              </Button>
            </div>

            {/* Empty State */}
            {agents.length === 0 && (
              <Card variant="dialogue">
                <div className="text-center py-8 space-y-4">
                  <p className="text-green-700 font-body text-lg">
                    🌱 No agents deployed yet
                  </p>
                  <p className="text-green-600 font-body">
                    Deploy your first agent to start automating your yield optimization!
                  </p>
                  <Button variant="primary" size="md" onClick={handleDeployNew}>
                    🚀 Deploy Your First Agent
                  </Button>
                </div>
              </Card>
            )}

            {/* Agent Cards */}
            <div className="grid gap-6">
              {agents.map((agent) => (
                <Card key={agent.id} variant="dialogue">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Agent Avatar */}
                    <div className="flex-shrink-0">
                      <Avatar size="lg" />
                    </div>

                    {/* Agent Info */}
                    <div className="flex-1 space-y-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <h3 className="text-xl font-display font-bold text-green-700">
                            {agent.agent_name}
                          </h3>
                          <p className="text-sm text-green-600">
                            Agent ID: #{agent.id.toString().padStart(4, '0')}
                          </p>
                        </div>
                        <Badge
                          text={agent.status.toUpperCase()}
                          variant={
                            agent.status === 'active'
                              ? 'green'
                              : agent.status === 'standby' || agent.status === 'paused'
                              ? 'pink'
                              : 'default'
                          }
                        />
                      </div>

                      {/* Agent Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-green-600 mb-1">APR</p>
                          <p className="text-lg font-display font-bold text-pink-600">
                            {agent.current_apr?.toFixed(1) || 0}%
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-green-600 mb-1">TVL</p>
                          <p className="text-lg font-display font-bold text-green-800">
                            ${agent.total_value_managed?.toLocaleString() || 0}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-green-600 mb-1">Rebalances</p>
                          <p className="text-lg font-display font-bold text-green-800">
                            {agent.total_rebalances || 0}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-green-600 mb-1">Last Action</p>
                          <p className="text-lg font-display font-bold text-green-800">
                            {formatLastRebalance(agent.last_rebalance_at)}
                          </p>
                        </div>
                      </div>

                      {/* Active Chains */}
                      <div>
                        <p className="text-xs text-green-600 mb-2">Active Chains:</p>
                        <div className="flex flex-wrap gap-2">
                          {getActiveChains(agent.chain_distribution).length > 0 ? (
                            getActiveChains(agent.chain_distribution).map((chain) => (
                              <span
                                key={chain}
                                className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-display"
                              >
                                {chain}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-green-600 italic">
                              No chains configured
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 flex-wrap">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleConfigure(agent.agent_id)}
                        >
                          Configure
                        </Button>
                        <Button
                          variant="nav"
                          size="sm"
                          onClick={() => handleViewHistory(agent.agent_id)}
                        >
                          View History
                        </Button>
                        {(agent.status === 'inactive' || agent.status === 'paused') && (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleActivate(agent.agent_id)}
                          >
                            Activate
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* How It Works */}
        <Card variant="dialogue">
          <h3 className="text-xl font-display font-bold text-green-700 mb-4">
            🤖 How Agents Work
          </h3>
          <div className="space-y-3 text-green-800 font-body">
            <p>
              <span className="font-bold">1. Monitor:</span> Agents continuously track APRs across 8+ chains using Pyth Network price feeds
            </p>
            <p>
              <span className="font-bold">2. Analyze:</span> AI algorithms identify optimal yield opportunities and calculate gas-efficient rebalancing strategies
            </p>
            <p>
              <span className="font-bold">3. Execute:</span> When conditions are met, agents automatically move your funds via LayerZero to the best-performing chains
            </p>
            <p>
              <span className="font-bold">4. Optimize:</span> All transactions are gasless (sponsored by Privy), maximizing your net returns
            </p>
          </div>
        </Card>
        </div>
      )}
    </PageLayout>
  );
}
