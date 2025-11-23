/**
 * World Prize Showcase Page
 * Evidence and implementation details for World $20K prize
 */

'use client';

import { PageLayout } from '@/components/PageLayout';
import { Card, FeatureCard } from '@/components/Card';
import { Button } from '@/components/Button';
import Link from 'next/link';
import Image from 'next/image';

export default function WorldImplementation() {
  return (
    <PageLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 pt-8">
          <div className="flex justify-center mb-4">
            <Image
              src="/worldchain_logo.png"
              alt="World"
              width={120}
              height={120}
              className="rounded-2xl"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-green-700 drop-shadow-lg">
            World: Best Mini App Prize
          </h1>
          <p className="text-xl text-pink-600 font-body max-w-3xl mx-auto font-bold">
            $20,000 Partner Prize | Build for 23M World App Users
          </p>
        </div>

        {/* Mandatory Requirements */}
        <Card variant="dialogue" className="bg-gradient-to-r from-red-50 to-orange-50">
          <h2 className="text-2xl font-display font-bold text-red-700 mb-4">
            ⚠️ Mandatory Requirements (Must Have All)
          </h2>
          <div className="space-y-3 text-red-900 font-body">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <strong>Build a Mini App with MiniKit:</strong> Must use the MiniKit SDK (not just IDKit). This is the core requirement.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <strong>Integrate MiniKit SDK Commands:</strong> Must use at least one MiniKit command (wallet, payments, signing, etc.). Mandatory to qualify.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <strong>Deploy to World Chain:</strong> If using on-chain activity, contracts must be deployed to World Chain mainnet or testnet.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <strong>No Gambling/Chance-Based:</strong> App cannot be gambling or prize-based on randomness. Must be skill or utility-based.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <strong>Proof Validation:</strong> Any verification (World ID, transactions) must occur in web backend or smart contract, not client-side.
              </div>
            </div>
          </div>
        </Card>

        {/* Strong Bonus / Nice to Have */}
        <Card variant="dialogue" className="bg-gradient-to-r from-green-50 to-emerald-50">
          <h2 className="text-2xl font-display font-bold text-green-700 mb-4">
            ⭐ Strong Bonus Points (Competitive Advantages)
          </h2>
          <div className="space-y-3 text-green-900 font-body">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🚀</span>
              <div>
                <strong>Viral/Shareable Mechanics:</strong> Features that encourage sharing and organic growth among 23M World App users.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎨</span>
              <div>
                <strong>Consumer-Grade UX:</strong> Clean, polished UI with no crypto jargon. Built for non-crypto natives.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔧</span>
              <div>
                <strong>Practical Utility:</strong> Solves a real-world problem. Not just a demo or toy example.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🆔</span>
              <div>
                <strong>World ID Integration:</strong> Uses World ID for identity verification, proof of personhood, or Sybil resistance.
              </div>
            </div>
          </div>
        </Card>

        {/* What We Built */}
        <Card variant="default">
          <h2 className="text-2xl font-display font-bold text-green-700 mb-4">
            ✅ What We Built
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <FeatureCard
              icon="📱"
              title="MiniKit SDK Integration"
              description="Full MiniKit provider wrapping the entire app, enabling native-like World App experience with wallet auth and transactions."
            />
            <FeatureCard
              icon="🔐"
              title="World ID Verification"
              description="Sybil-resistant agent deployment using World ID (IDKit) to ensure fair access and prevent bot manipulation."
            />
            <FeatureCard
              icon="💳"
              title="SIWE Authentication"
              description="Sign-In with Ethereum flow via MiniKit for secure wallet authentication with backend verification."
            />
            <FeatureCard
              icon="⛓️"
              title="World Chain Deployment"
              description="Smart contracts deployed on World Chain mainnet and testnet with full cross-chain support."
            />
            <FeatureCard
              icon="🎨"
              title="Consumer-Grade UX"
              description="Animal Crossing-themed UI with no crypto jargon. Built for 23M non-crypto natives."
            />
            <FeatureCard
              icon="⚡"
              title="Gasless Transactions"
              description="All transactions sponsored via Privy. Users never pay gas fees, maximizing accessibility."
            />
          </div>
        </Card>

        {/* Code Evidence */}
        <Card variant="dialogue">
          <h2 className="text-2xl font-display font-bold text-green-700 mb-4">
            📝 Code Evidence
          </h2>
          <div className="space-y-4 text-green-800 font-body">
            <div className="p-4 bg-cream-50 border-2 border-brown-400 rounded-lg">
              <div className="font-bold mb-2">📁 frontend/app/layout.tsx</div>
              <p className="text-sm mb-2">
                Wraps entire app with <code className="px-2 py-1 bg-brown-200 rounded">MiniKitProvider</code> from{' '}
                <code className="px-2 py-1 bg-brown-200 rounded">@worldcoin/minikit-js</code>
              </p>
              <code className="text-xs text-green-700">
                {'<MiniKitProvider><body>...</body></MiniKitProvider>'}
              </code>
            </div>

            <div className="p-4 bg-cream-50 border-2 border-brown-400 rounded-lg">
              <div className="font-bold mb-2">📁 frontend/components/MiniKitWalletAuth.tsx</div>
              <p className="text-sm mb-2">
                Detects World App environment, initiates SIWE flow, handles wallet connection and disconnect
              </p>
              <code className="text-xs text-green-700">
                MiniKit.commandsAsync.walletAuth() + localStorage persistence
              </code>
            </div>

            <div className="p-4 bg-cream-50 border-2 border-brown-400 rounded-lg">
              <div className="font-bold mb-2">📁 frontend/components/WorldIDVerify.tsx</div>
              <p className="text-sm mb-2">
                World ID verification component using IDKit for sybil resistance on agent deployment
              </p>
              <code className="text-xs text-green-700">
                {'<IDKitWidget app_id={...} verification_level={VerificationLevel.Orb} />'}
              </code>
            </div>

            <div className="p-4 bg-cream-50 border-2 border-brown-400 rounded-lg">
              <div className="font-bold mb-2">📁 frontend/app/api/complete-siwe/route.ts</div>
              <p className="text-sm mb-2">
                Backend API route for verifying SIWE messages from MiniKit with nonce validation
              </p>
              <code className="text-xs text-green-700">
                verifySiweMessage() from @worldcoin/minikit-js
              </code>
            </div>

            <div className="p-4 bg-cream-50 border-2 border-brown-400 rounded-lg">
              <div className="font-bold mb-2">📁 frontend/lib/minikit.ts</div>
              <p className="text-sm mb-2">
                Utility functions for MiniKit transactions: sendTransactionViaMiniKit, sendContractTransactionViaMiniKit
              </p>
              <code className="text-xs text-green-700">
                MiniKit.commandsAsync.sendTransaction()
              </code>
            </div>

            <div className="p-4 bg-cream-50 border-2 border-brown-400 rounded-lg">
              <div className="font-bold mb-2">📁 contracts/ (World Chain Deployment)</div>
              <p className="text-sm mb-2">
                HedgePodVault: <code className="px-1 py-0.5 bg-brown-200 rounded text-xs">0x90A0...</code><br />
                AutoYieldToken: <code className="px-1 py-0.5 bg-brown-200 rounded text-xs">0x18f6...</code>
              </p>
              <p className="text-xs text-green-600 mt-2">
                ✅ Deployed on World Chain mainnet (chainId: 480) and sepolia testnet (chainId: 4801)
              </p>
            </div>
          </div>
        </Card>

        {/* Live Demo Links */}
        <Card variant="default">
          <h2 className="text-2xl font-display font-bold text-green-700 mb-4">
            🔴 Live Demo
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-pink-50 border-2 border-pink-400 rounded-lg">
              <div className="font-bold text-pink-600 mb-2">🌐 Production App</div>
              <p className="text-sm text-green-800 font-body mb-3">
                Open in World App to see MiniKit integration, World ID verification, and SIWE authentication
              </p>
              <a 
                href="https://hedgepod.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-pink-600 underline font-bold"
              >
                https://hedgepod.app
              </a>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/portfolio/deploy">
                <Button variant="primary" size="md" className="w-full">
                  🔒 Try World ID Verification
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="secondary" size="md" className="w-full">
                  📊 See Portfolio (Connect via MiniKit)
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* Target Audience */}
        <Card variant="dialogue">
          <h2 className="text-2xl font-display font-bold text-green-700 mb-4">
            🎯 Target: 23M World App Users
          </h2>
          <div className="space-y-3 text-green-800 font-body">
            <p className="text-lg">
              <span className="font-bold text-pink-600">Our Mission:</span> Make sophisticated DeFi accessible to World App&apos;s 23 million users—most of whom don&apos;t know what an RPC is and never should.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div className="p-4 bg-green-50 rounded-lg border-2 border-green-300 text-center">
                <div className="text-3xl mb-2">🚫</div>
                <div className="font-bold">No MetaMask</div>
                <div className="text-sm">MiniKit wallet built-in</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border-2 border-green-300 text-center">
                <div className="text-3xl mb-2">💸</div>
                <div className="font-bold">No Gas Fees</div>
                <div className="text-sm">Privy sponsorship</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border-2 border-green-300 text-center">
                <div className="text-3xl mb-2">🎮</div>
                <div className="font-bold">No Crypto Jargon</div>
                <div className="text-sm">Consumer-grade UI</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Why We Should Win */}
        <Card variant="default">
          <h2 className="text-2xl font-display font-bold text-green-700 mb-4">
            🏆 Why We Should Win
          </h2>
          <div className="space-y-4 text-green-800 font-body text-lg">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <span className="font-bold">Complete MiniKit Integration:</span> Not just inherited—we use MiniKitProvider, wallet auth, SIWE verification, and transaction commands.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <span className="font-bold">World ID for Sybil Resistance:</span> Every agent deployment requires World ID verification via IDKit Orb level.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <span className="font-bold">Solves Real Problem:</span> Chain fragmentation and complex DeFi UX. One deposit, AI handles everything.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <span className="font-bold">Consumer-Quality UX:</span> Animal Crossing theme, clear CTAs, no 0x addresses visible (ENS everywhere).
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <span className="font-bold">Production-Ready:</span> Deployed contracts, live website, real data (Pyth + The Graph), functional agents.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <span className="font-bold">Viral Potential:</span> &quot;Create your own hedge fund&quot; is shareable. Portfolio tracking = engagement loop.
              </div>
            </div>
          </div>
        </Card>

        {/* Back Button */}
        <div className="text-center">
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

