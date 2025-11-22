/**
 * Portfolio Dashboard - Animal Crossing Theme
 * Your portfolio is managed by autonomous AI agents
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { PageLayout } from '@/components/PageLayout';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Avatar } from '@/components/Avatar';
import { Badge } from '@/components/Badge';
import { WalletPrompt } from '@/components/WalletPrompt';
import Image from 'next/image';

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

// Chain configuration with logos
const CHAIN_CONFIG: Record<string, { name: string; logo: string; isImage?: boolean }> = {
  'World Chain': { 
    name: 'World Chain', 
    logo: '/worldchain_white.png',
    isImage: true
  },
  'Base': { 
    name: 'Base', 
    logo: '🔵',
  },
  'Celo': { 
    name: 'Celo', 
    logo: '🌱',
  },
  'Zircuit': { 
    name: 'Zircuit', 
    logo: '⚡',
  },
  'Polygon': { 
    name: 'Polygon', 
    logo: '🟣',
  },
  'Arbitrum': { 
    name: 'Arbitrum', 
    logo: '🔷',
  },
  'Optimism': { 
    name: 'Optimism', 
    logo: '🔴',
  },
  'Avalanche': { 
    name: 'Avalanche', 
    logo: '🔺',
  },
};

export default function Portfolio() {
  const router = useRouter();
  const { address, isConnected } = useAccount();

  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [activating, setActivating] = useState<string | null>(null);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100 border-green-400';
      case 'inactive':
        return 'text-gray-600 bg-gray-100 border-gray-400';
      case 'paused':
        return 'text-orange-600 bg-orange-100 border-orange-400';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-400';
    }
  };

  const handleActivate = async (agentId: string) => {
    setActivating(agentId);

    try {
      const response = await fetch(`/api/agents/${agentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'activate' }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage('✅ Agent activated successfully! It will start monitoring and rebalancing.');
        fetchAgents();
        setTimeout(() => setSuccessMessage(null), 5000); // Auto-hide after 5 seconds
      } else {
        setError(data.error);
        setTimeout(() => setError(null), 5000);
      }
    } catch (err: any) {
      setError(err.message);
      setTimeout(() => setError(null), 5000);
    } finally {
      setActivating(null);
    }
  };

  const handlePause = async (agentId: string) => {
    setActivating(agentId);

    try {
      const response = await fetch(`/api/agents/${agentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'pause' }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage('⏸️ Agent paused successfully! Monitoring stopped.');
        fetchAgents();
        setTimeout(() => setSuccessMessage(null), 5000);
      } else {
        setError(data.error);
        setTimeout(() => setError(null), 5000);
      }
    } catch (err: any) {
      setError(err.message);
      setTimeout(() => setError(null), 5000);
    } finally {
      setActivating(null);
    }
  };

  const handleDeployNew = () => {
    if (!isConnected) {
      alert('Please connect your wallet first!');
      return;
    }
    router.push('/portfolio/deploy');
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
      {!isConnected ? (
        <WalletPrompt 
          title="Connect to View Portfolio"
          message="Connect your wallet to manage your portfolio and deploy AI agents"
        />
      ) : (
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-green-700 drop-shadow-lg pt-8">
              Your Portfolio
            </h1>
            <p className="text-lg text-green-800 font-body max-w-2xl mx-auto">
              Your portfolio is managed by autonomous AI agents working 24/7 to maximize your yields across all chains
            </p>
          </div>

          {/* Wallet Address Display */}
          <div className="max-w-3xl mx-auto">
            <Card variant="default" className="bg-gradient-to-r from-pink-100 via-purple-100 to-green-100 border-3 border-pink-400">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">👛</span>
                    <h3 className="text-lg font-display font-bold text-green-700">Your Wallet</h3>
                  </div>
                  <div className="bg-white bg-opacity-60 rounded-xl p-3 border-2 border-pink-300">
                    <p className="text-xs text-green-600 font-body mb-1">Address:</p>
                    <p className="text-sm md:text-base font-mono text-green-800 break-all leading-relaxed">
                      {address}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(address || '');
                    setSuccessMessage('✅ Address copied to clipboard!');
                    setTimeout(() => setSuccessMessage(null), 3000);
                  }}
                  className="bg-pink-500 hover:bg-pink-400 text-white font-display font-bold py-3 px-6 rounded-full border-3 border-brown-500 shadow-ac-sm hover:shadow-ac transition-all transform hover:-translate-y-0.5 flex items-center gap-2 justify-center md:flex-shrink-0"
                >
                  <span>📋</span>
                  <span>Copy Address</span>
                </button>
              </div>
            </Card>
          </div>

          {/* Success Message */}
          {successMessage && (
            <Card variant="dialogue" className="bg-green-100 border-green-500">
              <div className="flex items-center justify-between">
                <p className="text-green-800 font-body">{successMessage}</p>
                <button onClick={() => setSuccessMessage(null)} className="text-green-800 hover:text-green-900 font-bold">
                  ✕
                </button>
              </div>
            </Card>
          )}

          {/* Error Message */}
          {error && (
            <Card variant="dialogue" className="bg-red-100 border-red-500">
              <div className="flex items-center justify-between">
                <p className="text-red-800 font-body">❌ {error}</p>
                <button onClick={() => setError(null)} className="text-red-800 hover:text-red-900 font-bold">
                  ✕
                </button>
              </div>
            </Card>
          )}

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

        {/* All Agents Section */}
        <div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4 p-4 bg-cream-100 rounded-2xl border-3 border-brown-400">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-display font-bold text-green-700">
                All Agents
              </h2>
            </div>
            <Button 
              variant="primary" 
              size="lg" 
              onClick={handleDeployNew}
              className="w-full md:w-auto"
            >
              🤖 + Deploy New Agent
            </Button>
          </div>

          {/* Loading State */}
          {loading && (
            <Card variant="dialogue">
              <div className="text-center py-8">
                <p className="text-green-700 font-body text-lg">🔄 Loading your agents...</p>
              </div>
            </Card>
          )}

          {/* Error State */}
          {error && !loading && (
            <Card variant="dialogue">
              <div className="text-center py-8 space-y-4">
                <p className="text-red-600 font-body text-lg">❌ {error}</p>
                <Button variant="secondary" onClick={fetchAgents}>
                  🔄 Retry
                </Button>
              </div>
            </Card>
          )}

          {/* Empty State */}
          {!loading && !error && agents.length === 0 && (
            <Card variant="dialogue">
              <div className="text-center py-8 space-y-4">
                <div className="text-6xl">🦔</div>
                <h3 className="text-2xl font-display font-bold text-green-700">
                  No Agents Yet!
                </h3>
                <p className="text-green-800 font-body max-w-md mx-auto">
                  Deploy your first autonomous agent to start earning yields across multiple chains.
                </p>
                <Button variant="primary" size="lg" onClick={handleDeployNew}>
                  🚀 Deploy Your First Agent
                </Button>
              </div>
            </Card>
          )}

          {/* Agent Cards */}
          {!loading && !error && agents.length > 0 && (
            <div className="space-y-4">
              {agents.map((agent) => {
                const activeChains = getActiveChains(agent.chain_distribution);
                const lastRebalance = formatLastRebalance(agent.last_rebalance_at);

                return (
                  <Card key={agent.agent_id} variant="default">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <Avatar size="xl" />
                      </div>

                      {/* Agent Info */}
                      <div className="flex-1 space-y-3">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <div>
                            <h3 className="text-2xl font-display font-bold text-green-700">
                              {agent.agent_name}
                            </h3>
                            <p className="text-sm text-green-600 font-body font-mono">
                              Agent ID: #{agent.id.toString().padStart(4, '0')}
                            </p>
                          </div>
                          <div className={`px-4 py-2 rounded-full text-sm font-body font-bold border-2 ${getStatusColor(agent.status)} uppercase`}>
                            {agent.status}
                          </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-xs text-green-600 font-body mb-1">APR</p>
                            <p className="text-xl font-display font-bold text-pink-600">
                              {agent.current_apr.toFixed(1)}%
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-green-600 font-body mb-1">TVL</p>
                            <p className="text-xl font-display font-bold text-green-700">
                              ${agent.total_value_managed.toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-green-600 font-body mb-1">Rebalances</p>
                            <p className="text-xl font-display font-bold text-green-700">
                              {agent.total_rebalances}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-green-600 font-body mb-1">Last Action</p>
                            <p className="text-sm font-body text-green-700">
                              {lastRebalance}
                            </p>
                          </div>
                        </div>

                        {/* Active Chains */}
                        {activeChains.length > 0 && (
                          <div>
                            <p className="text-xs text-green-600 font-body mb-2">Active Chains:</p>
                            <div className="flex flex-wrap gap-2">
                              {activeChains.map((chain) => {
                                const config = CHAIN_CONFIG[chain];
                                return (
                                  <Badge key={chain} variant="green">
                                    <span className="flex items-center gap-1.5">
                                      {/* Chain Logo/Icon */}
                                      {config?.isImage ? (
                                        <Image 
                                          src={config.logo} 
                                          alt={config.name}
                                          width={16}
                                          height={16}
                                          className="flex-shrink-0"
                                        />
                                      ) : (
                                        <span className="text-sm">{config?.logo}</span>
                                      )}
                                      {/* Chain Name - Always shown in badges */}
                                      <span>{chain}</span>
                                    </span>
                                  </Badge>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-2 md:flex-shrink-0">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => router.push(`/portfolio/${agent.agent_id}/configure`)}
                        >
                          ⚙️ Configure
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => router.push(`/portfolio/${agent.agent_id}/history`)}
                        >
                          📊 View History
                        </Button>
                        {agent.status === 'inactive' && (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleActivate(agent.agent_id)}
                            disabled={activating === agent.agent_id}
                          >
                            {activating === agent.agent_id ? '⏳ Activating...' : '✅ Activate'}
                          </Button>
                        )}
                        {agent.status === 'active' && (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handlePause(agent.agent_id)}
                            disabled={activating === agent.agent_id}
                          >
                            {activating === agent.agent_id ? '⏳ Pausing...' : '⏸️ Pause'}
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* How Agents Work Section */}
        <Card variant="dialogue">
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-bold text-green-700 flex items-center gap-2">
              <span>🤖</span> How Agents Work
            </h3>
            <div className="space-y-3 font-body text-green-800">
              <div className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✅ Autonomous:</span>
                <p>Your agent is a Coinbase CDP Server Wallet that operates 24/7 without your intervention</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✅ Secure:</span>
                <p>You grant x402 authorization once - the agent can only rebalance, never withdraw</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✅ Intelligent:</span>
                <p>Monitors APRs across all selected chains using Pyth Network real-time data</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✅ Gas-Efficient:</span>
                <p>Only rebalances when the APR improvement exceeds gas costs</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✅ Transparent:</span>
                <p>All transactions are recorded and viewable in your agent history</p>
              </div>
            </div>
          </div>
        </Card>
        </div>
      )}
    </PageLayout>
  );
}
