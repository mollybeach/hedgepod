/**
 * About Page - Animal Crossing Theme
 * Learn about HedgePod Agent project
 */

import Image from 'next/image';
import { PageLayout } from '@/components/PageLayout';
import { Navigation } from '@/components/Navigation';
import { Card, FeatureCard } from '@/components/Card';
import { Button } from '@/components/Button';
import { Avatar } from '@/components/Avatar';
import { BadgeGroup } from '@/components/Badge';
import { UniswapPoolStats } from '@/components/UniswapPoolStats';

export default function About() {
  const techStack = [
    'LayerZero', 'Pyth Network', '1inch', 'Uniswap v4',
    'Chainlink', 'World', 'Privy', 'Coinbase CDP',
    'ENS', 'Octav', 'Hardhat 3', 'Next.js 14'
  ];

  const chains = [
    'World Chain', 'Base', 'Celo', 'Polygon',
    'Arbitrum', 'Optimism', 'Avalanche', 'Zircuit'
  ];

  return (
    <PageLayout>
      <Navigation />
      
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            <div className="relative rounded-2xl overflow-hidden shadow-ac border-4 border-brown-500">
              <Image
                src="/hedge_pod_world_mini_app_image.png"
                alt="HedgePod World Mini App"
                width={345}
                height={240}
                priority
                className="object-cover"
              />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-green-700 drop-shadow-lg">
            About HedgePod
          </h1>
          <p className="text-lg text-green-800 font-body max-w-2xl mx-auto">
            Autonomous cross-chain DeFi that makes 23M World App users their own hedge fund
          </p>
        </div>

        {/* Mission Statement */}
        <Card variant="dialogue" className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-display font-bold text-green-700 mb-4 text-center">
            Our Mission
          </h2>
          <p className="text-green-800 font-body text-lg leading-relaxed text-center">
            To democratize sophisticated DeFi yield strategies by making them accessible, 
            automated, and effortless for everyone. No technical knowledge required—just 
            deposit once and let AI agents optimize your yields across multiple chains.
          </p>
        </Card>

        {/* What Makes Us Different */}
        <div className="space-y-6">
          <h2 className="text-3xl font-display font-bold text-green-700 text-center">
            What Makes Us Different
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon="🤖"
              title="Truly Autonomous"
              description="AI agents work 24/7 with x402 authorization. No constant approvals needed—set it and forget it."
            />
            <FeatureCard
              icon="⚡"
              title="Completely Gasless"
              description="All transactions sponsored via Privy. You never pay gas fees, maximizing your net yields."
            />
            <FeatureCard
              icon="🌐"
              title="Chain Abstracted"
              description="One deposit works across 8+ chains. Agents automatically move funds to the best opportunities."
            />
            <FeatureCard
              icon="🔒"
              title="Sybil Resistant"
              description="World ID verification ensures fair access and prevents bot manipulation."
            />
            <FeatureCard
              icon="👤"
              title="Human Readable"
              description="ENS names everywhere. See 'jane.eth' not '0x1234...'. Built for real people."
            />
            <FeatureCard
              icon="📊"
              title="Real-Time Data"
              description="Pyth Network price feeds and 1inch liquidity ensure accurate, up-to-date market data."
            />
          </div>
        </div>

        {/* How It Works */}
        <div className="space-y-6">
          <h2 className="text-3xl font-display font-bold text-green-700 text-center">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <Card variant="dialogue">
              <div className="text-center space-y-3">
                <div className="text-5xl">1️⃣</div>
                <h3 className="text-lg font-display font-bold text-green-700">Deposit</h3>
                <p className="text-sm text-green-800 font-body">
                  Deposit USDC, ETH, or USDT once from any supported chain
                </p>
              </div>
            </Card>

            <Card variant="dialogue">
              <div className="text-center space-y-3">
                <div className="text-5xl">2️⃣</div>
                <h3 className="text-lg font-display font-bold text-green-700">Monitor</h3>
                <p className="text-sm text-green-800 font-body">
                  Agents track yields across 8+ chains using Pyth and 1inch APIs
                </p>
              </div>
            </Card>

            <Card variant="dialogue">
              <div className="text-center space-y-3">
                <div className="text-5xl">3️⃣</div>
                <h3 className="text-lg font-display font-bold text-green-700">Rebalance</h3>
                <p className="text-sm text-green-800 font-body">
                  AI automatically moves funds to chains with better APRs via LayerZero
                </p>
              </div>
            </Card>

            <Card variant="dialogue">
              <div className="text-center space-y-3">
                <div className="text-5xl">4️⃣</div>
                <h3 className="text-lg font-display font-bold text-green-700">Earn</h3>
                <p className="text-sm text-green-800 font-body">
                  Sit back and watch your yields compound automatically
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Supported Chains */}
        <div className="space-y-4">
          <h2 className="text-3xl font-display font-bold text-green-700 text-center">
            Supported Chains
          </h2>
          <BadgeGroup badges={chains} variant="green" />
        </div>

        {/* Tech Stack */}
        <div className="space-y-4">
          <h2 className="text-3xl font-display font-bold text-green-700 text-center">
            Tech Stack
          </h2>
          <BadgeGroup badges={techStack} variant="pink" />
        </div>

        {/* Uniswap v4 Integration */}
        <div className="space-y-6">
          <UniswapPoolStats />
        </div>

        {/* Built At ETHGlobal */}
        <Card variant="dialogue" className="max-w-3xl mx-auto">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-display font-bold text-green-700">
              Built at ETHGlobal Buenos Aires 2025
            </h2>
            <p className="text-green-800 font-body leading-relaxed">
              HedgePod Agent was created during ETHGlobal Buenos Aires 2025 with the goal 
              of making DeFi accessible to the 23 million World App users who deserve 
              sophisticated financial tools without the complexity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a href="https://github.com/mollybeach/hedgepod" target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="lg">
                  View on GitHub
                </Button>
              </a>
              <a href="https://github.com/mollybeach/hedgepod#-documentation" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="lg">
                  Read Documentation
                </Button>
              </a>
            </div>
          </div>
        </Card>

        {/* Contact */}
        <Card variant="dialogue" className="max-w-3xl mx-auto">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-display font-bold text-green-700">
              Get in Touch
            </h2>
            <p className="text-green-800 font-body">
              Questions? Feedback? Want to collaborate?
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href="https://hedgepod.app" target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="md">
                  🚀 Live Demo
                </Button>
              </a>
              <a href="https://discord.com/invite/5C7yYrsR" target="_blank" rel="noopener noreferrer">
                <Button variant="nav" size="md">
                  💬 Discord
                </Button>
              </a>
              <a href="https://t.me/hedgepod" target="_blank" rel="noopener noreferrer">
                <Button variant="nav" size="md">
                  📱 Telegram
                </Button>
              </a>
              <a href="https://x.com/hedgepod" target="_blank" rel="noopener noreferrer">
                <Button variant="nav" size="md">
                  🐦 Twitter
                </Button>
              </a>
              <a href="https://www.instagram.com/hedgepod_app/" target="_blank" rel="noopener noreferrer">
                <Button variant="nav" size="md">
                  📸 Instagram
                </Button>
              </a>
              <a href="https://github.com/mollybeach/hedgepod" target="_blank" rel="noopener noreferrer">
                <Button variant="nav" size="md">
                  💻 GitHub
                </Button>
              </a>
            </div>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
}

