/**
 * Agent Configuration Page
 * Configure agent settings, chains, and parameters
 */

'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PageLayout } from '@/components/PageLayout';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';

interface Agent {
  agent_id: string;
  agent_name: string;
  status: string;
  chain_distribution: Record<string, number>;
  total_value_managed: number;
  current_apr: number;
}

const AVAILABLE_CHAINS = [
  'World Chain',
  'Base',
  'Celo',
  'Zircuit',
  'Polygon',
  'Arbitrum',
  'Optimism',
  'Avalanche',
];

export default function AgentConfigPage() {
  const params = useParams();
  const router = useRouter();
  const agentId = params.agentId as string;

  const [agent, setAgent] = useState<Agent | null>(null);
  const [agentName, setAgentName] = useState('');
  const [selectedChains, setSelectedChains] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchAgent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agentId]);

  const fetchAgent = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/agents/${agentId}`);
      const data = await response.json();

      if (data.success) {
        setAgent(data.agent);
        setAgentName(data.agent.agent_name);
        setSelectedChains(Object.keys(data.agent.chain_distribution || {}));
      } else {
        setError(data.error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChainToggle = (chain: string) => {
    if (selectedChains.includes(chain)) {
      setSelectedChains(selectedChains.filter((c) => c !== chain));
    } else {
      setSelectedChains([...selectedChains, chain]);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setSuccess(false);
      setError(null);

      const chainDistribution = selectedChains.reduce((acc, chain) => {
        acc[chain] = agent?.chain_distribution?.[chain] || 0;
        return acc;
      }, {} as Record<string, number>);

      const response = await fetch(`/api/agents/${agentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'configure',
          config: {
            agent_name: agentName,
            chain_distribution: chainDistribution,
          },
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setAgent(data.agent);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(data.error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handlePause = async () => {
    if (!confirm('Are you sure you want to pause this agent?')) return;

    try {
      const response = await fetch(`/api/agents/${agentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'pause' }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Agent paused successfully!');
        fetchAgent();
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleActivate = async () => {
    if (!confirm('Are you sure you want to activate this agent?')) return;

    try {
      const response = await fetch(`/api/agents/${agentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'activate' }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Agent activated successfully!');
        fetchAgent();
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <PageLayout>
        <Card variant="dialogue">
          <div className="text-center py-8">
            <p className="text-green-700 font-body">Loading agent...</p>
          </div>
        </Card>
      </PageLayout>
    );
  }

  if (error && !agent) {
    return (
      <PageLayout>
        <Card variant="dialogue">
          <div className="text-center py-8">
            <p className="text-red-600 font-body">❌ {error}</p>
            <Button variant="primary" size="md" onClick={() => router.back()}>
              Go Back
            </Button>
          </div>
        </Card>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-green-700 drop-shadow-lg pt-8">
              Configure Agent
            </h1>
            <p className="text-lg text-green-800 font-body mt-2">
              {agent?.agent_name}
            </p>
          </div>
          <Button variant="nav" size="md" onClick={() => router.back()}>
            ← Back
          </Button>
        </div>

        {/* Success Message */}
        {success && (
          <Card variant="dialogue">
            <p className="text-green-700 font-body text-center">
              ✅ Configuration saved successfully!
            </p>
          </Card>
        )}

        {/* Agent Name */}
        <Card variant="dialogue">
          <h3 className="text-xl font-display font-bold text-green-700 mb-4">
            Agent Name
          </h3>
          <input
            type="text"
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-3 border-brown-500 bg-cream-50 text-green-800 font-body focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Enter agent name"
          />
        </Card>

        {/* Active Chains */}
        <Card variant="dialogue">
          <h3 className="text-xl font-display font-bold text-green-700 mb-4">
            Active Chains
          </h3>
          <p className="text-sm text-green-600 mb-4">
            Select which chains this agent should monitor and rebalance across
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {AVAILABLE_CHAINS.map((chain) => (
              <button
                key={chain}
                onClick={() => handleChainToggle(chain)}
                className={`px-4 py-3 rounded-lg border-3 font-display transition-all ${
                  selectedChains.includes(chain)
                    ? 'bg-green-500 text-white border-green-700 shadow-ac'
                    : 'bg-cream-50 text-green-700 border-brown-500 hover:bg-cream-100'
                }`}
              >
                {chain}
              </button>
            ))}
          </div>
        </Card>

        {/* Agent Stats */}
        <Card variant="dialogue">
          <h3 className="text-xl font-display font-bold text-green-700 mb-4">
            Current Stats
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-green-600 mb-1">Status</p>
              <p className="text-lg font-display font-bold text-green-800 uppercase">
                {agent?.status}
              </p>
            </div>
            <div>
              <p className="text-xs text-green-600 mb-1">Total Value Managed</p>
              <p className="text-lg font-display font-bold text-green-800">
                ${agent?.total_value_managed?.toLocaleString() || 0}
              </p>
            </div>
            <div>
              <p className="text-xs text-green-600 mb-1">Current APR</p>
              <p className="text-lg font-display font-bold text-pink-600">
                {agent?.current_apr?.toFixed(2) || 0}%
              </p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 flex-wrap">
          <Button
            variant="primary"
            size="md"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Saving...' : '💾 Save Configuration'}
          </Button>

          {agent?.status === 'active' && (
            <Button variant="secondary" size="md" onClick={handlePause}>
              ⏸ Pause Agent
            </Button>
          )}

          {agent?.status !== 'active' && (
            <Button variant="primary" size="md" onClick={handleActivate}>
              ▶️ Activate Agent
            </Button>
          )}

          <Button
            variant="nav"
            size="md"
            onClick={() => router.push(`/agents/${agentId}/history`)}
          >
            📜 View History
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}

