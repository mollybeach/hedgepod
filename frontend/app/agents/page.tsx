/**
 * Agents Dashboard - Animal Crossing Theme
 * Monitor and configure your autonomous yield agents
 */

import { PageLayout } from '@/components/PageLayout';
import { Navigation } from '@/components/Navigation';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Avatar } from '@/components/Avatar';
import { Badge } from '@/components/Badge';

interface Agent {
  id: number;
  name: string;
  logo?: boolean;
  emoji?: string;
  status: 'active' | 'standby' | 'inactive';
  chains: string[];
  lastRebalance: string;
  totalRebalances: number;
  apr: string;
  tvl: string;
}

export default function Agents() {
  const agents: Agent[] = [
    {
      id: 1,
      name: 'HedgePod Agent #1',
      logo: true, // Use HedgePod logo
      status: 'active',
      chains: ['World Chain', 'Base', 'Celo'],
      lastRebalance: '2 hours ago',
      totalRebalances: 47,
      apr: '8.3%',
      tvl: '$12,345',
    },
    {
      id: 2,
      name: 'HedgePod Agent #2',
      logo: true, // Use HedgePod logo
      status: 'standby',
      chains: ['Polygon', 'Arbitrum'],
      lastRebalance: '1 day ago',
      totalRebalances: 23,
      apr: '7.1%',
      tvl: '$5,678',
    },
    {
      id: 3,
      name: 'HedgePod Agent #3',
      logo: true, // Use HedgePod logo
      status: 'inactive',
      chains: ['Optimism', 'Avalanche'],
      lastRebalance: 'Never',
      totalRebalances: 0,
      apr: '0%',
      tvl: '$0',
    },
  ];

  return (
    <PageLayout>
      <Navigation />
      
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
              <p className="text-3xl font-display font-bold text-green-800">3</p>
            </div>
          </Card>
          
          <Card variant="dialogue">
            <div className="text-center">
              <p className="text-sm font-body text-green-700 mb-2">Active</p>
              <p className="text-3xl font-display font-bold text-pink-600">1</p>
            </div>
          </Card>
          
          <Card variant="dialogue">
            <div className="text-center">
              <p className="text-sm font-body text-green-700 mb-2">Total Rebalances</p>
              <p className="text-3xl font-display font-bold text-green-800">70</p>
            </div>
          </Card>
          
          <Card variant="dialogue">
            <div className="text-center">
              <p className="text-sm font-body text-green-700 mb-2">Avg APR</p>
              <p className="text-3xl font-display font-bold text-pink-600">7.7%</p>
            </div>
          </Card>
        </div>

        {/* Agents List */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-display font-bold text-green-700">
              All Agents
            </h2>
            <Button variant="primary" size="md">
              + Deploy New Agent
            </Button>
          </div>

          <div className="grid gap-6">
            {agents.map((agent) => (
              <Card key={agent.id} variant="dialogue">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Agent Avatar */}
                  <div className="flex-shrink-0">
                    {agent.logo ? (
                      <Avatar size="lg" />
                    ) : (
                      <Avatar emoji={agent.emoji} size="lg" />
                    )}
                  </div>

                  {/* Agent Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-display font-bold text-green-700">
                          {agent.name}
                        </h3>
                        <p className="text-sm text-green-600">
                          Agent ID: #{agent.id.toString().padStart(4, '0')}
                        </p>
                      </div>
                      <Badge 
                        text={agent.status.toUpperCase()} 
                        variant={agent.status === 'active' ? 'green' : agent.status === 'standby' ? 'pink' : 'default'}
                      />
                    </div>

                    {/* Agent Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-green-600 mb-1">APR</p>
                        <p className="text-lg font-display font-bold text-pink-600">{agent.apr}</p>
                      </div>
                      <div>
                        <p className="text-xs text-green-600 mb-1">TVL</p>
                        <p className="text-lg font-display font-bold text-green-800">{agent.tvl}</p>
                      </div>
                      <div>
                        <p className="text-xs text-green-600 mb-1">Rebalances</p>
                        <p className="text-lg font-display font-bold text-green-800">{agent.totalRebalances}</p>
                      </div>
                      <div>
                        <p className="text-xs text-green-600 mb-1">Last Action</p>
                        <p className="text-lg font-display font-bold text-green-800">{agent.lastRebalance}</p>
                      </div>
                    </div>

                    {/* Active Chains */}
                    <div>
                      <p className="text-xs text-green-600 mb-2">Active Chains:</p>
                      <div className="flex flex-wrap gap-2">
                        {agent.chains.map((chain) => (
                          <span 
                            key={chain}
                            className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-display"
                          >
                            {chain}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button variant="secondary" size="sm">
                        Configure
                      </Button>
                      <Button variant="nav" size="sm">
                        View History
                      </Button>
                      {agent.status === 'inactive' && (
                        <Button variant="primary" size="sm">
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
    </PageLayout>
  );
}

