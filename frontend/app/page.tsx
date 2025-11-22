/**
 * HedgePod Agent - Main Landing Page
 * CTA-focused page to get users started quickly
 */

'use client';

import { Button } from '@/components/Button';
import { Card, HeroCard } from '@/components/Card';
import { Avatar } from '@/components/Avatar';
import { PageLayout } from '@/components/PageLayout';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <PageLayout>
      <div className="space-y-8 mt-8">

        {/* Hero Section */}
        <HeroCard>
          <Avatar size="lg" />
          
          <h1 className="text-4xl md:text-5xl font-display font-bold text-green-700 text-center">
            Your AI-Powered Hedge Fund
          </h1>
          
          <p className="text-center text-green-800 font-body text-lg leading-relaxed max-w-2xl">
            Deposit once. AI agents automatically rebalance across 8+ chains for optimal yield. 
            <span className="font-bold text-pink-600"> Completely gasless.</span>
          </p>
          
          {!isConnected ? (
            <div className="flex flex-col items-center gap-3">
              <div className="connect-button-hero">
                <ConnectButton.Custom>
                  {({ openConnectModal }) => (
                    <Button variant="primary" size="lg" onClick={openConnectModal}>
                      🚀 Connect Wallet to Start
                    </Button>
                  )}
                </ConnectButton.Custom>
              </div>
              <p className="text-xs text-green-600 font-body italic">
                Connect your wallet in 10 seconds ⚡
              </p>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/portfolio/deploy">
                <Button variant="primary" size="lg">
                  🤖 Deploy Your First Agent
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="secondary" size="lg">
                  📊 View Portfolio
                </Button>
              </Link>
            </div>
          )}
        </HeroCard>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card variant="dialogue" className="text-center">
            <div className="text-4xl mb-2">🌐</div>
            <div className="text-3xl font-display font-bold text-pink-600">8+</div>
            <div className="text-sm text-green-700 font-body">Supported Chains</div>
          </Card>
          <Card variant="dialogue" className="text-center">
            <div className="text-4xl mb-2">⚡</div>
            <div className="text-3xl font-display font-bold text-pink-600">$0</div>
            <div className="text-sm text-green-700 font-body">Gas Fees</div>
          </Card>
          <Card variant="dialogue" className="text-center">
            <div className="text-4xl mb-2">🤖</div>
            <div className="text-3xl font-display font-bold text-pink-600">24/7</div>
            <div className="text-sm text-green-700 font-body">Auto-Rebalancing</div>
          </Card>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card variant="default" className="hover:shadow-ac-lg transition-all">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="text-5xl">🤖</div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-green-700">Deploy an Agent</h3>
                  <p className="text-sm text-green-600 font-body mb-2">Let AI optimize your yields automatically</p>
                </div>
              </div>
              <Link href="/agents/deploy">
                <Button variant="primary" size="md" className="w-full">
                  Start Now →
                </Button>
              </Link>
            </div>
          </Card>

          <Card variant="default" className="hover:shadow-ac-lg transition-all">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="text-5xl">🦄</div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-green-700">Swap Tokens</h3>
                  <p className="text-sm text-green-600 font-body mb-2">Trade with dynamic fees on Uniswap v4</p>
                </div>
              </div>
              <Link href="/swap">
                <Button variant="secondary" size="md" className="w-full">
                  Trade Now →
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* How It Works - Simple */}
        <Card variant="dialogue" className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-display font-bold text-green-700 text-center mb-6">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-4xl">1️⃣</div>
              <p className="text-sm font-body text-green-800">
                <span className="font-bold">Connect Wallet</span><br />
                One-click setup
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl">2️⃣</div>
              <p className="text-sm font-body text-green-800">
                <span className="font-bold">Deploy Agent</span><br />
                AI starts monitoring
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl">3️⃣</div>
              <p className="text-sm font-body text-green-800">
                <span className="font-bold">Earn Yield</span><br />
                Sit back & relax
              </p>
            </div>
          </div>
        </Card>

        {/* Learn More CTA */}
        <div className="text-center space-y-3 mb-2">
          <p className="text-sm text-green-700 font-body mb-2">
            Want to learn more about how HedgePod works?
          </p>
          <Link href="/about">
            <Button variant="nav" size="md">
              Read About Us →
            </Button>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
