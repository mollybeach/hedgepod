/**
 * Deploy New Agent Page
 * Create a new CDP Server Wallet agent
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { PageLayout } from '@/components/PageLayout';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { WorldIDVerify } from '@/components/WorldIDVerify';
import Image from 'next/image';

// Chain configuration with logos
const CHAIN_CONFIG: Record<string, { name: string; logo: string; isImage?: boolean }> = {
  'World Chain': { 
    name: 'World Chain', 
    logo: '/worldchain_white.png',
    isImage: true
  },
  'Base': { 
    name: 'Base', 
    logo: '🔵', // Replace with /base-logo.png when available
  },
  'Celo': { 
    name: 'Celo', 
    logo: '🌱', // Replace with /celo-logo.png when available
  },
  'Zircuit': { 
    name: 'Zircuit', 
    logo: '⚡', // Replace with /zircuit-logo.png when available
  },
  'Polygon': { 
    name: 'Polygon', 
    logo: '🟣', // Replace with /polygon-logo.png when available
  },
  'Arbitrum': { 
    name: 'Arbitrum', 
    logo: '🔷', // Replace with /arbitrum-logo.png when available
  },
  'Optimism': { 
    name: 'Optimism', 
    logo: '🔴', // Replace with /optimism-logo.png when available
  },
  'Avalanche': { 
    name: 'Avalanche', 
    logo: '🔺', // Replace with /avalanche-logo.png when available
  },
};

const AVAILABLE_CHAINS = Object.keys(CHAIN_CONFIG);

export default function DeployAgentPage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();

  const [agentName, setAgentName] = useState('');
  const [selectedChains, setSelectedChains] = useState<string[]>(['World Chain', 'Base']);
  const [depositAmount, setDepositAmount] = useState('');
  const [deploying, setDeploying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [worldIdVerified, setWorldIdVerified] = useState(false);
  const [worldIdProof, setWorldIdProof] = useState<any>(null);

  // Random agent name generator
  const generateRandomName = () => {
    const prefixes = [
      'Yieldy', 'Hedge', 'Alpha', 'Mega', 'Super', 'Turbo', 'Quantum', 
      'Crypto', 'DeFi', 'Chain', 'Smart', 'Auto', 'Flash', 'Quick',
      'Swift', 'Noble', 'Wise', 'Lucky', 'Happy', 'Sunny'
    ];
    const animals = [
      'Hedgehog', 'Fox', 'Bear', 'Bull', 'Lion', 'Tiger', 'Eagle',
      'Whale', 'Dolphin', 'Otter', 'Panda', 'Koala', 'Rabbit', 'Cat',
      'Dog', 'Wolf', 'Hawk', 'Owl', 'Deer', 'Raccoon'
    ];
    const suffixes = [
      'Agent', 'Bot', 'Master', 'Pro', 'Hunter', 'Wizard', 'Guru',
      'Ninja', 'Hero', 'Champion', 'Legend', 'King', 'Queen', 'Lord',
      'Captain', 'Chief', 'Scout', 'Guardian', 'Sentinel', 'Watcher'
    ];

    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const animal = animals[Math.floor(Math.random() * animals.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const number = Math.floor(Math.random() * 999) + 1;

    const nameStyle = Math.floor(Math.random() * 4);
    switch(nameStyle) {
      case 0: return `${prefix} ${animal} #${number}`;
      case 1: return `${animal} ${suffix} #${number}`;
      case 2: return `${prefix} ${suffix} ${animal}`;
      default: return `${animal} the ${prefix}`;
    }
  };

  const handleChainToggle = (chain: string) => {
    if (selectedChains.includes(chain)) {
      // Must have at least 1 chain
      if (selectedChains.length > 1) {
        setSelectedChains(selectedChains.filter((c) => c !== chain));
      }
    } else {
      setSelectedChains([...selectedChains, chain]);
    }
  };

  const handleDeploy = async () => {
    if (!isConnected || !address) {
      alert('Please connect your wallet first!');
      return;
    }

    // TEMPORARILY DISABLED FOR TESTING
    // if (!worldIdVerified) {
    //   setError('Please verify your humanity with World ID first');
    //   return;
    // }

    if (!agentName.trim()) {
      setError('Please enter an agent name');
      return;
    }

    if (selectedChains.length === 0) {
      setError('Please select at least one chain');
      return;
    }

    try {
      setDeploying(true);
      setError(null);

      const response = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletAddress: address,
          agentName: agentName.trim(),
          chains: selectedChains,
          depositAmount: depositAmount ? parseFloat(depositAmount) : 0,
          worldIdProof: worldIdProof, // Include World ID proof
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert(`✅ ${data.message}\n\nAgent ID: ${data.agent.agent_id}`);
        router.push('/portfolio');
      } else {
        setError(data.error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setDeploying(false);
    }
  };

  if (!isConnected) {
    return (
      <PageLayout>
        <div className="space-y-8">
          <Card variant="dialogue">
            <div className="text-center py-8 space-y-4">
              <h2 className="text-2xl font-display font-bold text-green-700">
                Connect Wallet Required
              </h2>
              <p className="text-green-800 font-body">
                Please connect your wallet to deploy a new agent.
              </p>
              <Button variant="primary" size="md" onClick={() => router.push('/portfolio')}>
                Go Back
              </Button>
            </div>
          </Card>
        </div>
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
              Deploy New Agent
            </h1>
            <p className="text-lg text-green-800 font-body mt-2">
              Create your autonomous yield-optimizing agent
            </p>
          </div>
          <Button variant="nav" size="md" onClick={() => router.back()}>
            ← Back
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <Card variant="dialogue">
            <p className="text-red-600 font-body text-center">❌ {error}</p>
          </Card>
        )}

        {/* World ID Verification - TEMPORARILY DISABLED FOR TESTING */}
        {/* <Card variant="dialogue">
          <h3 className="text-xl font-display font-bold text-green-700 mb-4">
            1. Verify Your Humanity 🔒
          </h3>
          <WorldIDVerify
            onSuccess={(proof) => {
              console.log('World ID verification successful:', proof);
              setWorldIdVerified(true);
              setWorldIdProof(proof);
            }}
            onError={(error) => {
              console.error('World ID verification failed:', error);
              setError('World ID verification failed. Please try again.');
            }}
            actionId="hedgepod-deploy-agent"
            signal={address}
          />
          {worldIdVerified && (
            <div className="mt-4 p-3 bg-green-100 border-2 border-green-500 rounded-lg">
              <p className="text-sm text-green-800 font-body text-center">
                ✅ Humanity verified! You can now proceed with deployment.
              </p>
            </div>
          )}
        </Card> */}

        {/* Agent Name */}
        <Card variant="dialogue">
          <h3 className="text-xl font-display font-bold text-green-700 mb-4">
            1. Name Your Agent
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border-3 border-brown-500 bg-cream-50 text-green-800 font-body focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="e.g., HedgePod Agent #1"
              maxLength={50}
            />
            <Button 
              variant="secondary" 
              size="md" 
              onClick={() => setAgentName(generateRandomName())}
            >
              🎲 Random
            </Button>
          </div>
          <p className="text-xs text-green-600 mt-2">
            Choose a memorable name for your agent or generate a random one
          </p>
        </Card>

        {/* Select Chains */}
        <Card variant="dialogue">
          <h3 className="text-xl font-display font-bold text-green-700 mb-4">
            3. Select Active Chains
          </h3>
          <p className="text-sm text-green-600 mb-4">
            Choose which chains your agent should monitor and rebalance across
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {AVAILABLE_CHAINS.map((chain) => {
              const config = CHAIN_CONFIG[chain];
              return (
                <button
                  key={chain}
                  onClick={() => handleChainToggle(chain)}
                  className={`px-4 py-3 rounded-lg border-3 font-display transition-all flex items-center justify-center gap-2 ${
                    selectedChains.includes(chain)
                      ? 'bg-green-500 text-white border-green-700 shadow-ac'
                      : 'bg-cream-50 text-green-700 border-brown-500 hover:bg-cream-100'
                  }`}
                >
                  {/* Chain Logo/Icon */}
                  {config.isImage ? (
                    <Image 
                      src={config.logo} 
                      alt={config.name}
                      width={20}
                      height={20}
                      className="flex-shrink-0"
                    />
                  ) : (
                    <span className="text-lg">{config.logo}</span>
                  )}
                  
                  {/* Chain Name - Hidden on mobile, shown on larger screens */}
                  <span className="hidden sm:inline">{config.name}</span>
                </button>
              );
            })}
          </div>
          <p className="text-xs text-green-600 mt-4">
            Selected: {selectedChains.length} chain{selectedChains.length !== 1 ? 's' : ''}
          </p>
        </Card>

        {/* Initial Deposit (Optional) */}
        <Card variant="dialogue">
          <h3 className="text-xl font-display font-bold text-green-700 mb-4">
            3. Initial Deposit (Optional)
          </h3>
          <p className="text-sm text-green-600 mb-4">
            You can fund your agent now or later
          </p>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border-3 border-brown-500 bg-cream-50 text-green-800 font-body focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="0.00"
              min="0"
              step="0.01"
            />
            <span className="text-green-700 font-display font-bold">USDC</span>
          </div>
          <p className="text-xs text-green-600 mt-2">
            💡 Agents need funds to start rebalancing. You can also deposit later.
          </p>
        </Card>

        {/* How It Works */}
        <Card variant="dialogue">
          <h3 className="text-xl font-display font-bold text-green-700 mb-4">
            🤖 How Your Agent Works
          </h3>
          <div className="space-y-3 text-green-800 font-body text-sm">
            <p>
              <span className="font-bold">✅ Autonomous:</span> Your agent is a Coinbase CDP Server Wallet that operates 24/7 without your intervention
            </p>
            <p>
              <span className="font-bold">✅ Secure:</span> You grant x402 authorization once - the agent can only rebalance, never withdraw
            </p>
            <p>
              <span className="font-bold">✅ Intelligent:</span> Monitors APRs across all selected chains using Pyth Network real-time data
            </p>
            <p>
              <span className="font-bold">✅ Gas-Efficient:</span> Only rebalances when the APR improvement exceeds gas costs
            </p>
            <p>
              <span className="font-bold">✅ Transparent:</span> All transactions are recorded and viewable in your agent history
            </p>
          </div>
        </Card>

        {/* Deploy Button */}
        <div className="flex justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={handleDeploy}
            disabled={deploying || !agentName.trim() || selectedChains.length === 0}
          >
            {deploying ? '🚀 Deploying...' : '🚀 Deploy Agent'}
          </Button>
        </div>

        {/* World ID Required Notice - TEMPORARILY DISABLED */}
        {/* {!worldIdVerified && (
          <Card variant="dialogue" className="bg-yellow-50 border-yellow-400">
            <p className="text-sm text-yellow-800 font-body text-center">
              🔒 Please verify your humanity with World ID above before deploying
            </p>
          </Card>
        )} */}

        {/* Info Box */}
        <Card variant="dialogue">
          <p className="text-sm text-green-700 font-body text-center">
            ⚡ Deployment is instant and gasless. Once deployed, you can configure and activate your agent from the Agents dashboard.
          </p>
        </Card>
      </div>
    </PageLayout>
  );
}

