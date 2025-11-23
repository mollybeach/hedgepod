'use client';

import { PageLayout, Card, Button } from '@/components';
import Link from 'next/link';
import Image from 'next/image';

export default function WorldPoolPrizePage() {
  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto space-y-8 pt-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-4">
            <Image
              src="/worldchain_logo.png"
              alt="World"
              width={100}
              height={100}
              className="rounded-2xl"
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-green-700">
            🌍 World Ecosystem Pool Prize
          </h1>
          <p className="text-xl md:text-2xl text-green-600 font-body max-w-3xl mx-auto">
             Safety Net Prize • Split Evenly Among All Qualifying Projects
          </p>
          
          {/* Prize Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-100 border-3 border-green-400 rounded-full">
            <span className="text-3xl">🎁</span>
            <div className="text-left">
              <p className="font-display font-bold text-green-700">World Pool Prize</p>
              <p className="text-sm text-green-600"> Split • Extremely Low Bar • Safety Net</p>
            </div>
          </div>
        </div>

        {/* Prize Info */}
        <Card variant="dialogue" className="bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="space-y-4">
            <h2 className="text-2xl font-display font-bold text-green-700">
              🎯 Core Goal: Participate in World Ecosystem
            </h2>
            <p className="text-lg font-body text-green-900">
              Build within the World ecosystem (World ID, Mini App, or World Chain) even if you don&apos;t win main prizes. 
              This is a <strong className="text-pink-600">safety net prize</strong> that guarantees payout for any World ecosystem participation.
            </p>
            <div className="p-4 bg-white rounded-lg border-2 border-green-400">
              <p className="font-body text-green-900">
                <strong className="text-green-700">💰 Prize Split:</strong>  divided evenly between all qualifying projects. 
                Prize split evenly between all qualifying projects. <strong>Essentially free money!</strong>
              </p>
            </div>
          </div>
        </Card>

        {/* Mandatory Requirements */}
        <Card variant="dialogue" className="bg-gradient-to-r from-blue-50 to-cyan-50">
          <h2 className="text-2xl font-display font-bold text-blue-700 mb-4">
            ✅ Mandatory Requirements (Extremely Easy)
          </h2>
          <div className="space-y-3 text-blue-900 font-body">
            <div className="flex items-start gap-3 p-3 bg-white rounded-lg border-2 border-blue-300">
              <span className="text-2xl">1️⃣</span>
              <div>
                <strong>Make Good-Faith Effort to Integrate:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li><strong>World ID</strong> (identity verification), OR</li>
                  <li><strong>Mini App</strong> (build with MiniKit), OR</li>
                  <li><strong>World Chain</strong> (deploy contracts)</li>
                </ul>
                <p className="mt-2 text-sm italic">✨ Just <strong>one</strong> of these qualifies you! Any integration attempt counts.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white rounded-lg border-2 border-blue-300">
              <span className="text-2xl">2️⃣</span>
              <div>
                <strong>Must Not Be Gambling/Chance-Based:</strong> App cannot be gambling or prize-based on randomness.
              </div>
            </div>
          </div>
        </Card>

        {/* What HedgePod Does to Qualify */}
        <div className="space-y-4">
          <h2 className="text-3xl font-display font-bold text-green-700">
            ✅ How HedgePod Qualifies (All Three!)
          </h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            <Card variant="feature" className="bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="text-center space-y-3">
                <div className="text-5xl">🆔</div>
                <h3 className="font-display font-bold text-green-700 text-lg">World ID</h3>
                <p className="text-sm text-green-800 font-body">
                  ✅ Integrated IDKit for World ID verification on agent deployment
                </p>
                <p className="text-xs text-green-700 italic">
                  Sybil-resistant, proof of personhood
                </p>
              </div>
            </Card>

            <Card variant="feature" className="bg-gradient-to-br from-purple-50 to-purple-100">
              <div className="text-center space-y-3">
                <div className="text-5xl">📱</div>
                <h3 className="font-display font-bold text-green-700 text-lg">Mini App</h3>
                <p className="text-sm text-green-800 font-body">
                  ✅ Built full MiniKit SDK integration with wallet auth and transactions
                </p>
                <p className="text-xs text-green-700 italic">
                  MiniKitProvider wraps entire app
                </p>
              </div>
            </Card>

            <Card variant="feature" className="bg-gradient-to-br from-green-50 to-green-100">
              <div className="text-center space-y-3">
                <div className="text-5xl">⛓️</div>
                <h3 className="font-display font-bold text-green-700 text-lg">World Chain</h3>
                <p className="text-sm text-green-800 font-body">
                  ✅ Deployed all smart contracts to World Chain mainnet
                </p>
                <p className="text-xs text-green-700 italic">
                  HedgePodVault, AutoYieldToken, YieldOracle, VolatilityFeeHook
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Deployment Evidence */}
        <Card variant="dialogue" className="bg-gradient-to-r from-purple-50 to-pink-50">
          <h2 className="text-2xl font-display font-bold text-purple-700 mb-4">
            📜 World Chain Deployment Evidence
          </h2>
          <div className="space-y-3">
            <div className="p-3 bg-white rounded-lg border-2 border-purple-300">
              <p className="font-display font-bold text-purple-700 mb-1">HedgePodVault</p>
              <p className="text-xs font-mono text-purple-600 break-all">0x9e33d5946BA0e97f0ED0dee2BfC6E4BC66781BFE</p>
              <a 
                href="https://worldchain-mainnet.explorer.alchemy.com/address/0x9e33d5946BA0e97f0ED0dee2BfC6E4BC66781BFE" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline"
              >
                View on World Chain Explorer →
              </a>
            </div>
            <div className="p-3 bg-white rounded-lg border-2 border-purple-300">
              <p className="font-display font-bold text-purple-700 mb-1">AutoYieldToken (LayerZero OFT)</p>
              <p className="text-xs font-mono text-purple-600 break-all">0xb698F5aae95B3cE4494F4913cFde376ffD1feAb1</p>
              <a 
                href="https://worldchain-mainnet.explorer.alchemy.com/address/0xb698F5aae95B3cE4494F4913cFde376ffD1feAb1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline"
              >
                View on World Chain Explorer →
              </a>
            </div>
            <div className="p-3 bg-white rounded-lg border-2 border-purple-300">
              <p className="font-display font-bold text-purple-700 mb-1">YieldOracle (Pyth Integration)</p>
              <p className="text-xs font-mono text-purple-600 break-all">0x3f89E2EeFe97B7A1a85061C7D4E63eBB1d688102</p>
              <a 
                href="https://worldchain-mainnet.explorer.alchemy.com/address/0x3f89E2EeFe97B7A1a85061C7D4E63eBB1d688102" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline"
              >
                View on World Chain Explorer →
              </a>
            </div>
            <div className="p-3 bg-white rounded-lg border-2 border-purple-300">
              <p className="font-display font-bold text-purple-700 mb-1">VolatilityFeeHook (Uniswap v4)</p>
              <p className="text-xs font-mono text-purple-600 break-all">0x6647c133AA387beF680716C1CdaBBC39Ef040934</p>
              <a 
                href="https://worldchain-mainnet.explorer.alchemy.com/address/0x6647c133AA387beF680716C1CdaBBC39Ef040934" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline"
              >
                View on World Chain Explorer →
              </a>
            </div>
          </div>
        </Card>

        {/* Code Evidence Links */}
        <Card variant="dialogue" className="bg-gradient-to-r from-yellow-50 to-orange-50">
          <h2 className="text-2xl font-display font-bold text-orange-700 mb-4">
            💻 Code Evidence
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-white rounded-lg border-2 border-orange-300">
              <p className="font-display font-bold text-orange-700 mb-2">World ID Integration</p>
              <code className="text-xs font-mono text-orange-600">frontend/components/WorldIDVerify.tsx</code>
              <p className="text-sm text-orange-800 mt-2">IDKit integration for Sybil-resistant agent deployment</p>
            </div>
            <div className="p-3 bg-white rounded-lg border-2 border-orange-300">
              <p className="font-display font-bold text-orange-700 mb-2">MiniKit SDK</p>
              <code className="text-xs font-mono text-orange-600">frontend/lib/minikit.ts</code>
              <p className="text-sm text-orange-800 mt-2">MiniKit wallet auth, transactions, and sign typed data</p>
            </div>
            <div className="p-3 bg-white rounded-lg border-2 border-orange-300">
              <p className="font-display font-bold text-orange-700 mb-2">World Chain Contracts</p>
              <code className="text-xs font-mono text-orange-600">contracts/*.sol</code>
              <p className="text-sm text-orange-800 mt-2">All 4 core contracts deployed to World Chain mainnet</p>
            </div>
            <div className="p-3 bg-white rounded-lg border-2 border-orange-300">
              <p className="font-display font-bold text-orange-700 mb-2">Network Config</p>
              <code className="text-xs font-mono text-orange-600">config/networks.ts</code>
              <p className="text-sm text-orange-800 mt-2">World Chain endpoint and configuration</p>
            </div>
          </div>
        </Card>

        {/* Why We Qualify */}
        <Card variant="dialogue" className="bg-gradient-to-r from-green-50 to-emerald-50">
          <h2 className="text-2xl font-display font-bold text-green-700 mb-4">
            🏆 Why HedgePod Qualifies for World Pool Prize
          </h2>
          <div className="space-y-3 font-body text-green-900">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <strong>World ID Integration:</strong> We use IDKit for World ID verification on agent deployment, ensuring Sybil resistance and fair access.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <strong>Mini App Built:</strong> Full MiniKit SDK integration with MiniKitProvider, wallet auth (SIWE), transaction sending, and sign typed data.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <strong>World Chain Deployment:</strong> All 4 core smart contracts deployed to World Chain mainnet with verified addresses on block explorer.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <strong>Good-Faith Effort:</strong> We didn&apos;t just add a token integration—we built a full autonomous DeFi platform on World Chain with MiniKit and World ID.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <strong>Not Gambling:</strong> HedgePod is a utility platform for autonomous yield optimization, not chance-based gambling.
              </div>
            </div>
          </div>
        </Card>

        {/* Synergy with Other Sponsors */}
        <Card variant="dialogue" className="bg-gradient-to-r from-blue-50 to-purple-50">
          <h2 className="text-2xl font-display font-bold text-blue-700 mb-4">
            🔗 Synergy: World + Other Sponsors
          </h2>
          <div className="space-y-2 font-body text-blue-900">
            <p><strong>World Chain + LayerZero:</strong> Cross-chain identity verification and token transfers</p>
            <p><strong>World Chain + Pyth Network:</strong> Real-time price feeds for portfolio tracking on World Chain</p>
            <p><strong>World Chain + Uniswap v4:</strong> Consumer liquidity provision UI on World Chain</p>
            <p><strong>World Chain + Coinbase CDP:</strong> Autonomous agents with World ID verification</p>
            <p><strong>World Chain + 1inch:</strong> Optimal swap routing for World Chain users</p>
          </div>
        </Card>

        {/* CTA */}
        <div className="text-center space-y-4 pt-4">
          <p className="text-lg font-body text-green-800">
            <strong>Deployment to World Chain + World ID integration = Guaranteed pool prize payout!</strong>
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/world-best-mini-app-implementation" passHref>
              <Button variant="secondary" size="lg">
                View Main Prize →
              </Button>
            </Link>
            <Link href="/" passHref>
              <Button variant="primary" size="lg">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
