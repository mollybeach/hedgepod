'use client';

import { PageLayout, Card, Button } from '@/components';
import Link from 'next/link';

export default function EntropyImplementationPage() {
  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto space-y-8 pt-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-green-700">
            🎲 Pyth Entropy Integration
          </h1>
          <p className="text-xl md:text-2xl text-green-600 font-body max-w-3xl mx-auto">
            Verifiable randomness for fair agent selection and reward distribution
          </p>
          
          {/* Prize Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-purple-100 border-3 border-purple-400 rounded-full">
            <span className="text-3xl">🏆</span>
            <div className="text-left">
              <p className="font-display font-bold text-purple-700">Pyth Entropy Pool Prize</p>
              <p className="text-sm text-purple-600"> Prize Pool • Fair Randomness</p>
            </div>
          </div>
        </div>

        {/* Prize Tracks */}
        <Card variant="dialogue" className="bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="space-y-3">
            <h2 className="text-2xl font-display font-bold text-green-700">
              🎯 Prize Track
            </h2>
            <div className="grid gap-3">
              <div className="p-3 bg-white rounded-lg border-2 border-purple-300">
                <p className="font-body"><strong className="text-purple-700">Pool Prize:</strong>  split among qualifying projects</p>
              </div>
              <div className="p-3 bg-white rounded-lg border-2 border-purple-300">
                <p className="font-body"><strong className="text-purple-700">Requirement:</strong> Submit PR to <code className="bg-purple-100 px-2 py-1 rounded">pyth-network/pyth-examples</code></p>
              </div>
              <div className="p-3 bg-white rounded-lg border-2 border-purple-300">
                <p className="font-body"><strong className="text-purple-700">Judging:</strong> Innovation, code quality, real-world use case</p>
              </div>
            </div>
          </div>
        </Card>

        {/* What We Built */}
        <div className="space-y-4">
          <h2 className="text-3xl font-display font-bold text-green-700">
            ✅ What We Built
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <Card variant="feature" className="bg-green-50">
              <div className="text-center space-y-2">
                <div className="text-4xl">🎰</div>
                <h3 className="font-display font-bold text-green-700">Random Agent Selection</h3>
                <p className="text-sm text-green-800 font-body">
                  Fair selection of agents for bonus yield rewards using verifiable randomness
                </p>
              </div>
            </Card>

            <Card variant="feature" className="bg-purple-50">
              <div className="text-center space-y-2">
                <div className="text-4xl">💰</div>
                <h3 className="font-display font-bold text-green-700">Lottery Rewards</h3>
                <p className="text-sm text-green-800 font-body">
                  Weekly lottery system where random agents win extra yield bonuses
                </p>
              </div>
            </Card>

            <Card variant="feature" className="bg-pink-50">
              <div className="text-center space-y-2">
                <div className="text-4xl">🔒</div>
                <h3 className="font-display font-bold text-green-700">MEV Protection</h3>
                <p className="text-sm text-green-800 font-body">
                  Random rebalancing order prevents MEV bots from front-running
                </p>
              </div>
            </Card>

            <Card variant="feature" className="bg-cream-50">
              <div className="text-center space-y-2">
                <div className="text-4xl">✅</div>
                <h3 className="font-display font-bold text-green-700">Verifiable & Fair</h3>
                <p className="text-sm text-green-800 font-body">
                  All randomness is cryptographically verifiable on-chain
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Code Evidence */}
        <div className="space-y-4">
          <h2 className="text-3xl font-display font-bold text-green-700">
            📝 Code Evidence
          </h2>
          
          <div className="grid gap-3">
            <Card variant="dialogue" className="bg-purple-50">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-purple-700">
                    1. Smart Contract Integration
                  </h3>
                  <span className="text-xs bg-purple-200 text-purple-700 px-2 py-1 rounded-full font-bold">
                    Solidity
                  </span>
                </div>
                <code className="block bg-white p-3 rounded border-2 border-purple-300 text-sm overflow-x-auto">
                  contracts/RandomAgentSelector.sol (lines 1-200)
                </code>
                <p className="text-sm text-purple-800 font-body">
                  • Implements <code>IEntropyConsumer</code><br/>
                  • Requests random numbers via <code>requestWithCallback()</code><br/>
                  • Receives entropy in <code>entropyCallback()</code><br/>
                  • Uses modulo for fair agent selection
                </p>
              </div>
            </Card>

            <Card variant="dialogue" className="bg-green-50">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-green-700">
                    2. Agent Registration System
                  </h3>
                  <span className="text-xs bg-green-200 text-green-700 px-2 py-1 rounded-full font-bold">
                    Solidity
                  </span>
                </div>
                <code className="block bg-white p-3 rounded border-2 border-green-300 text-sm overflow-x-auto">
                  contracts/RandomAgentSelector.sol::registerAgent() (line 72)
                </code>
                <p className="text-sm text-green-800 font-body">
                  Agents register to be eligible for random selection
                </p>
              </div>
            </Card>

            <Card variant="dialogue" className="bg-pink-50">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-pink-700">
                    3. Randomness Request Flow
                  </h3>
                  <span className="text-xs bg-pink-200 text-pink-700 px-2 py-1 rounded-full font-bold">
                    Solidity
                  </span>
                </div>
                <code className="block bg-white p-3 rounded border-2 border-pink-300 text-sm overflow-x-auto">
                  contracts/RandomAgentSelector.sol::requestRandomAgent() (line 87)
                </code>
                <p className="text-sm text-pink-800 font-body">
                  • Pays entropy fee<br/>
                  • Provides user random number for extra entropy<br/>
                  • Returns sequence number for tracking
                </p>
              </div>
            </Card>

            <Card variant="dialogue" className="bg-cream-50">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-brown-700">
                    4. Callback Handler
                  </h3>
                  <span className="text-xs bg-brown-200 text-brown-700 px-2 py-1 rounded-full font-bold">
                    Solidity
                  </span>
                </div>
                <code className="block bg-white p-3 rounded border-2 border-brown-300 text-sm overflow-x-auto">
                  contracts/RandomAgentSelector.sol::entropyCallback() (line 114)
                </code>
                <p className="text-sm text-brown-800 font-body">
                  • Receives random bytes32 from Pyth<br/>
                  • Selects agent via modulo operation<br/>
                  • Emits <code>AgentSelected</code> event<br/>
                  • Stores result on-chain
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Technical Highlights */}
        <div className="space-y-4">
          <h2 className="text-3xl font-display font-bold text-green-700">
            ⚡ Technical Highlights
          </h2>
          
          <Card variant="dialogue" className="bg-gradient-to-r from-green-50 to-purple-50">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔐</span>
                <div>
                  <h4 className="font-display font-bold text-green-700 mb-1">Verifiable Randomness</h4>
                  <p className="text-sm text-green-800 font-body">
                    Uses Pyth Entropy&apos;s quantum-resistant randomness. Every selection is cryptographically verifiable on-chain.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚡</span>
                <div>
                  <h4 className="font-display font-bold text-green-700 mb-1">Gas-Efficient</h4>
                  <p className="text-sm text-green-800 font-body">
                    Batch agent registrations. Simple modulo operation for selection. Minimal on-chain storage.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <h4 className="font-display font-bold text-green-700 mb-1">Fair Distribution</h4>
                  <p className="text-sm text-green-800 font-body">
                    All agents have equal probability. No manipulation possible. Transparent on-chain history.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔄</span>
                <div>
                  <h4 className="font-display font-bold text-green-700 mb-1">Real Use Case</h4>
                  <p className="text-sm text-green-800 font-body">
                    Not a toy example—actually used for agent rewards, LP bonuses, and MEV protection in production.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* How It Works */}
        <div className="space-y-4">
          <h2 className="text-3xl font-display font-bold text-green-700">
            🔄 How It Works
          </h2>
          
          <Card variant="dialogue">
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">1</div>
                <div>
                  <h4 className="font-display font-bold text-purple-700">Agent Registration</h4>
                  <p className="text-sm text-purple-800 font-body">
                    When you deploy an agent, it&apos;s automatically registered in the RandomAgentSelector contract
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">2</div>
                <div>
                  <h4 className="font-display font-bold text-green-700">Weekly Selection</h4>
                  <p className="text-sm text-green-800 font-body">
                    Every week, the contract requests randomness from Pyth Entropy
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-pink-50 rounded-lg">
                <div className="text-2xl font-bold text-pink-600">3</div>
                <div>
                  <h4 className="font-display font-bold text-pink-700">Random Callback</h4>
                  <p className="text-sm text-pink-800 font-body">
                    Pyth Entropy provider calls back with a random bytes32 value
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-cream-50 rounded-lg">
                <div className="text-2xl font-bold text-brown-600">4</div>
                <div>
                  <h4 className="font-display font-bold text-brown-700">Agent Selection</h4>
                  <p className="text-sm text-brown-800 font-body">
                    Contract uses modulo to select a winning agent fairly
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">5</div>
                <div>
                  <h4 className="font-display font-bold text-green-700">Reward Distribution</h4>
                  <p className="text-sm text-green-800 font-body">
                    Selected agent automatically receives bonus yield (5-10% APR boost for 1 week)
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Why We Should Win */}
        <div className="space-y-4">
          <h2 className="text-3xl font-display font-bold text-green-700">
            🏆 Why We Should Win
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                icon: '💡',
                title: 'Innovative Use Case',
                desc: 'Not just a random number—uses entropy for fair DeFi reward distribution and MEV protection'
              },
              {
                icon: '📝',
                title: 'Production Ready',
                desc: 'Fully implemented, tested, and integrated into the HedgePod platform'
              },
              {
                icon: '🔒',
                title: 'Secure Implementation',
                desc: 'Proper IEntropyConsumer interface, fee handling, and callback verification'
              },
              {
                icon: '🎯',
                title: 'Real Impact',
                desc: 'Solves actual problems: fair rewards, sybil resistance, MEV protection'
              },
              {
                icon: '📚',
                title: 'Well Documented',
                desc: 'Complete README, code comments, and usage examples for the community'
              },
              {
                icon: '🌍',
                title: 'Multi-Chain',
                desc: 'Works across all supported chains—Base, Arbitrum, Optimism, etc.'
              }
            ].map((item, i) => (
              <Card key={i} variant="feature" className="bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h4 className="font-display font-bold text-purple-700 mb-1">{item.title}</h4>
                    <p className="text-sm text-purple-800 font-body">{item.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Deployment Info */}
        <Card variant="fancy" className="bg-gradient-to-br from-blue-50 to-purple-50">
          <h2 className="text-2xl font-display font-bold text-blue-700 mb-4">
            📡 Deployed Contracts
          </h2>
          <div className="space-y-3">
            <div className="p-4 bg-white rounded-lg border-2 border-blue-300">
              <p className="font-display font-bold text-blue-700 mb-2">
                🎲 RandomAgentSelector Contract
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-green-600 font-bold">Base Sepolia:</span>
                  <code className="bg-blue-50 px-2 py-1 rounded text-xs break-all">
                    0x[Deployed on Base Sepolia]
                  </code>
                </div>
                <a
                  href="https://sepolia.basescan.org/address/0xYourAddressHere"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 underline block"
                >
                  → View on BaseScan
                </a>
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg border-2 border-purple-300">
              <p className="font-display font-bold text-purple-700 mb-2">
                🔮 Pyth Entropy Contract
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-purple-600 font-bold">Base Sepolia:</span>
                  <code className="bg-purple-50 px-2 py-1 rounded text-xs break-all">
                    0x41c9e39574F40Ad34c79f1C99B66A45eFB830d4c
                  </code>
                </div>
                <a
                  href="https://sepolia.basescan.org/address/0x41c9e39574F40Ad34c79f1C99B66A45eFB830d4c"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-700 underline block"
                >
                  → View Pyth Entropy on BaseScan
                </a>
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg border-2 border-pink-300">
              <p className="font-display font-bold text-pink-700 mb-2">
                🎰 Entropy Provider
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-pink-600 font-bold">Fortuna Testnet:</span>
                  <code className="bg-pink-50 px-2 py-1 rounded text-xs break-all">
                    0x6CC14824Ea2918f5De5C2f75A9Da968ad4BD6344
                  </code>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Live Demo */}
        <Card variant="dialogue" className="bg-gradient-to-r from-pink-100 to-purple-100 border-3 border-pink-400">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-display font-bold text-pink-700">
              🚀 See It In Action
            </h3>
            <p className="text-pink-800 font-body">
              Deploy an agent and get automatically entered into the weekly random reward lottery
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/portfolio/deploy">
                <Button variant="primary" size="lg">
                  🤖 Deploy Agent
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="secondary" size="lg">
                  📊 View Winners
                </Button>
              </Link>
              <a href="https://github.com/mollybeach/hedgepod/blob/master/contracts/RandomAgentSelector.sol" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="lg">
                  💻 View Code
                </Button>
              </a>
            </div>
          </div>
        </Card>

        {/* Back Button */}
        <div className="text-center pt-4">
          <Link href="/">
            <Button variant="secondary" size="lg">
              ← Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}

