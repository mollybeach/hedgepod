'use client';

import { PageLayout, Card, Button } from '@/components';
import Link from 'next/link';

export default function WorldMiniKitPoolPrizePage() {
  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto space-y-8 pt-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-green-700">
            🌍 World MiniKit Integration
          </h1>
          <p className="text-xl md:text-2xl text-green-600 font-body max-w-3xl mx-auto">
            Native-like DeFi experience for 23M World App users with MiniKit SDK
          </p>
          
          {/* Prize Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-100 border-3 border-blue-400 rounded-full">
            <span className="text-3xl">🏆</span>
            <div className="text-left">
              <p className="font-display font-bold text-blue-700">World MiniKit Pool Prize</p>
              <p className="text-sm text-blue-600">$3K Split • Meaningful MiniKit Integration Required</p>
            </div>
          </div>
        </div>

        {/* Prize Requirements */}
        <Card variant="dialogue" className="bg-gradient-to-r from-blue-50 to-cyan-50">
          <div className="space-y-3">
            <h2 className="text-2xl font-display font-bold text-green-700">
              🎯 Pool Prize Requirements
            </h2>
            <div className="grid gap-3">
              <div className="p-3 bg-white rounded-lg border-2 border-blue-300">
                <p className="font-body"><strong className="text-blue-700">Requirement:</strong> Meaningful MiniKit SDK integration (not just IDKit)</p>
              </div>
              <div className="p-3 bg-white rounded-lg border-2 border-blue-300">
                <p className="font-body"><strong className="text-blue-700">Must Use:</strong> MiniKit Commands (Wallet Auth, Pay, Verify, Sign Typed Data)</p>
              </div>
              <div className="p-3 bg-white rounded-lg border-2 border-blue-300">
                <p className="font-body"><strong className="text-blue-700">Bonus:</strong> Notifications, Username Display, Mobile-First Design</p>
              </div>
            </div>
          </div>
        </Card>

        {/* What We Built with MiniKit */}
        <div className="space-y-4">
          <h2 className="text-3xl font-display font-bold text-green-700">
            ✅ MiniKit SDK Features We Use
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <Card variant="feature" className="bg-blue-50">
              <div className="text-center space-y-2">
                <div className="text-4xl">🔐</div>
                <h3 className="font-display font-bold text-green-700">Wallet Authentication (SIWE)</h3>
                <p className="text-sm text-green-800 font-body">
                  Native Sign-in with Ethereum using MiniKit&apos;s walletAuth command for secure, gasless login
                </p>
              </div>
            </Card>

            <Card variant="feature" className="bg-cyan-50">
              <div className="text-center space-y-2">
                <div className="text-4xl">💸</div>
                <h3 className="font-display font-bold text-green-700">MiniKit Pay Command</h3>
                <p className="text-sm text-green-800 font-body">
                  Native USDC payments for agent deposits and liquidity adds using sendTransaction
                </p>
              </div>
            </Card>

            <Card variant="feature" className="bg-green-50">
              <div className="text-center space-y-2">
                <div className="text-4xl">✅</div>
                <h3 className="font-display font-bold text-green-700">World ID Verify Command</h3>
                <p className="text-sm text-green-800 font-body">
                  Sybil-resistant agent deployment with World ID Orb verification via IDKit
                </p>
              </div>
            </Card>

            <Card variant="feature" className="bg-purple-50">
              <div className="text-center space-y-2">
                <div className="text-4xl">📝</div>
                <h3 className="font-display font-bold text-green-700">Sign Typed Data</h3>
                <p className="text-sm text-green-800 font-body">
                  EIP-712 typed message signing for secure off-chain authorizations
                </p>
              </div>
            </Card>

            <Card variant="feature" className="bg-pink-50">
              <div className="text-center space-y-2">
                <div className="text-4xl">👤</div>
                <h3 className="font-display font-bold text-green-700">Username Display</h3>
                <p className="text-sm text-green-800 font-body">
                  Always shows World App usernames, never wallet addresses (per guidelines)
                </p>
              </div>
            </Card>

            <Card variant="feature" className="bg-orange-50">
              <div className="text-center space-y-2">
                <div className="text-4xl">🔔</div>
                <h3 className="font-display font-bold text-green-700">Push Notifications</h3>
                <p className="text-sm text-green-800 font-body">
                  Notify users of agent rebalances, yield earned, and portfolio updates
                </p>
              </div>
            </Card>

            <Card variant="feature" className="bg-cream-50">
              <div className="text-center space-y-2">
                <div className="text-4xl">📱</div>
                <h3 className="font-display font-bold text-green-700">Mobile-First Design</h3>
                <p className="text-sm text-green-800 font-body">
                  Bottom tab navigation, 24px padding, no scroll bounce, optimized for World App
                </p>
              </div>
            </Card>

            <Card variant="feature" className="bg-yellow-50">
              <div className="text-center space-y-2">
                <div className="text-4xl">⚡</div>
                <h3 className="font-display font-bold text-green-700">Instant Load Times</h3>
                <p className="text-sm text-green-800 font-body">
                  &lt;2s initial load, &lt;1s subsequent actions, optimized for mobile networks
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Code Evidence */}
        <div className="space-y-4">
          <h2 className="text-3xl font-display font-bold text-green-700">
            📝 Code Evidence: MiniKit Integration
          </h2>
          
          <div className="grid gap-3">
            <Card variant="dialogue" className="bg-blue-50">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-blue-700">
                    1. MiniKitProvider Wrapper
                  </h3>
                  <span className="text-xs bg-blue-200 text-blue-700 px-2 py-1 rounded-full font-bold">
                    React
                  </span>
                </div>
                <code className="block bg-white p-3 rounded border-2 border-blue-300 text-sm overflow-x-auto">
                  frontend/app/layout.tsx (line 65)
                </code>
                <p className="text-sm text-blue-800 font-body">
                  Wraps entire app with <code>MiniKitProvider</code> from <code>@worldcoin/minikit-js</code>
                </p>
              </div>
            </Card>

            <Card variant="dialogue" className="bg-cyan-50">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-cyan-700">
                    2. Wallet Auth (SIWE) Flow
                  </h3>
                  <span className="text-xs bg-cyan-200 text-cyan-700 px-2 py-1 rounded-full font-bold">
                    React
                  </span>
                </div>
                <code className="block bg-white p-3 rounded border-2 border-cyan-300 text-sm overflow-x-auto">
                  frontend/components/MiniKitWalletAuth.tsx (lines 1-120)
                </code>
                <p className="text-sm text-cyan-800 font-body">
                  • Detects World App via <code>MiniKit.isInstalled()</code><br/>
                  • Initiates SIWE with <code>MiniKit.commandsAsync.walletAuth()</code><br/>
                  • Stores nonce in HTTP-only cookie<br/>
                  • Verifies signature with <code>verifySiweMessage()</code><br/>
                  • Displays username, not wallet address
                </p>
              </div>
            </Card>

            <Card variant="dialogue" className="bg-green-50">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-green-700">
                    3. Transaction Sending (Pay Command)
                  </h3>
                  <span className="text-xs bg-green-200 text-green-700 px-2 py-1 rounded-full font-bold">
                    TypeScript
                  </span>
                </div>
                <code className="block bg-white p-3 rounded border-2 border-green-300 text-sm overflow-x-auto">
                  frontend/lib/minikit.ts::sendTransactionViaMiniKit() (line 45)
                </code>
                <p className="text-sm text-green-800 font-body">
                  Uses <code>MiniKit.commandsAsync.sendTransaction()</code> for native World App payments
                </p>
              </div>
            </Card>

            <Card variant="dialogue" className="bg-purple-50">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-purple-700">
                    4. World ID Verification
                  </h3>
                  <span className="text-xs bg-purple-200 text-purple-700 px-2 py-1 rounded-full font-bold">
                    React
                  </span>
                </div>
                <code className="block bg-white p-3 rounded border-2 border-purple-300 text-sm overflow-x-auto">
                  frontend/components/WorldIDVerify.tsx (lines 1-80)
                </code>
                <p className="text-sm text-purple-800 font-body">
                  IDKit integration for Orb verification before agent deployment
                </p>
              </div>
            </Card>

            <Card variant="dialogue" className="bg-pink-50">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-pink-700">
                    5. Nonce Generation & SIWE Verification
                  </h3>
                  <span className="text-xs bg-pink-200 text-pink-700 px-2 py-1 rounded-full font-bold">
                    API
                  </span>
                </div>
                <code className="block bg-white p-3 rounded border-2 border-pink-300 text-sm overflow-x-auto">
                  frontend/app/api/nonce/route.ts<br/>
                  frontend/app/api/complete-siwe/route.ts
                </code>
                <p className="text-sm text-pink-800 font-body">
                  Backend endpoints for secure SIWE flow with replay protection
                </p>
              </div>
            </Card>

            <Card variant="dialogue" className="bg-orange-50">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-orange-700">
                    6. Mobile-First Layout
                  </h3>
                  <span className="text-xs bg-orange-200 text-orange-700 px-2 py-1 rounded-full font-bold">
                    CSS
                  </span>
                </div>
                <code className="block bg-white p-3 rounded border-2 border-orange-300 text-sm overflow-x-auto">
                  frontend/app/globals.css (scroll bounce prevention)<br/>
                  frontend/components/Sidebar.tsx (bottom navigation)
                </code>
                <p className="text-sm text-orange-800 font-body">
                  Follows World App design guidelines: 24px padding, no scroll bounce, mobile-optimized
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* MiniKit vs IDKit Usage */}
        <div className="space-y-4">
          <h2 className="text-3xl font-display font-bold text-green-700">
            🔄 MiniKit vs IDKit: When We Use Each
          </h2>
          
          <Card variant="dialogue" className="bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">📦</span>
                  <h4 className="font-display font-bold text-blue-700 text-lg">MiniKit SDK</h4>
                </div>
                <div className="space-y-2 text-sm text-blue-800 font-body">
                  <p><strong>✅ Wallet Authentication</strong> - SIWE login</p>
                  <p><strong>✅ Transaction Sending</strong> - Native USDC payments</p>
                  <p><strong>✅ Sign Typed Data</strong> - EIP-712 messages</p>
                  <p><strong>✅ Username Display</strong> - User-friendly addresses</p>
                  <p><strong>✅ World App Detection</strong> - <code>isInstalled()</code></p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">🆔</span>
                  <h4 className="font-display font-bold text-purple-700 text-lg">IDKit</h4>
                </div>
                <div className="space-y-2 text-sm text-purple-800 font-body">
                  <p><strong>✅ World ID Verification</strong> - Orb/Device proofs</p>
                  <p><strong>✅ Sybil Resistance</strong> - One person, one vote</p>
                  <p><strong>✅ Zero-Knowledge Proofs</strong> - Privacy-preserving</p>
                  <p><strong>✅ Agent Gating</strong> - Verify before deploy</p>
                  <p><strong>✅ Action Tracking</strong> - Nullifier hashes</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Design Compliance */}
        <div className="space-y-4">
          <h2 className="text-3xl font-display font-bold text-green-700">
            🎨 World App Design Guidelines Compliance
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: '📱', title: 'Mobile-First UI', desc: 'Bottom tab navigation, no footers/sidebars, optimized for mobile' },
              { icon: '🚫', title: 'No Scroll Bounce', desc: 'iOS overscroll-behavior: none prevents bounce on edges' },
              { icon: '📏', title: '24px Padding', desc: 'Consistent spacing following World App design system' },
              { icon: '👤', title: 'Username Display', desc: 'Always show usernames, never wallet addresses' },
              { icon: '⚡', title: 'Fast Load Times', desc: '<2s initial load, <1s subsequent actions' },
              { icon: '🎨', title: 'Custom Branding', desc: 'Maintains distinct HedgePod identity while integrating with World' },
              { icon: '🔔', title: 'Notification Ready', desc: 'Backend API for push notifications with username substitution' },
              { icon: '🌍', title: 'Localization', desc: '19 languages supported including Spanish, Japanese, Korean, Portuguese' }
            ].map((item, i) => (
              <Card key={i} variant="feature" className="bg-gradient-to-br from-blue-50 to-cyan-50">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h4 className="font-display font-bold text-blue-700 mb-1">{item.title}</h4>
                    <p className="text-sm text-blue-800 font-body">{item.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Real Implementation Examples */}
        <div className="space-y-4">
          <h2 className="text-3xl font-display font-bold text-green-700">
            💡 Real Implementation Examples
          </h2>
          
          <div className="grid gap-4">
            <Card variant="dialogue" className="bg-gradient-to-r from-green-50 to-blue-50">
              <div className="space-y-3">
                <h4 className="font-display font-bold text-green-700 text-lg">1. Agent Deployment Flow (MiniKit + IDKit)</h4>
                <div className="space-y-2 text-sm text-green-800 font-body">
                  <p><strong>Step 1:</strong> User clicks &quot;Deploy Agent&quot; → Checks if World App user</p>
                  <p><strong>Step 2:</strong> If World App → Shows <code>WorldIDVerify</code> component (IDKit)</p>
                  <p><strong>Step 3:</strong> User scans QR/verifies in World App → Orb proof returned</p>
                  <p><strong>Step 4:</strong> Frontend sends proof to backend for verification</p>
                  <p><strong>Step 5:</strong> User selects chains & amount → MiniKit <code>sendTransaction()</code></p>
                  <p><strong>Step 6:</strong> USDC deposit executed natively in World App</p>
                  <p><strong>Step 7:</strong> Agent deployed → Push notification sent via World API</p>
                </div>
              </div>
            </Card>

            <Card variant="dialogue" className="bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="space-y-3">
                <h4 className="font-display font-bold text-purple-700 text-lg">2. Liquidity Add Flow (MiniKit Pay)</h4>
                <div className="space-y-2 text-sm text-purple-800 font-body">
                  <p><strong>Step 1:</strong> User views pool → Clicks &quot;Add Liquidity&quot;</p>
                  <p><strong>Step 2:</strong> Enters USDC amount → Auto-calculates Token1</p>
                  <p><strong>Step 3:</strong> If World App → Uses <code>MiniKit.commandsAsync.sendTransaction()</code></p>
                  <p><strong>Step 4:</strong> Transaction shows in native World App interface</p>
                  <p><strong>Step 5:</strong> User approves → USDC + ETH added to pool</p>
                  <p><strong>Step 6:</strong> Success modal shows explorer link</p>
                  <p><strong>Step 7:</strong> Notification: &quot;💰 You earned 0.1% fees on 3 trades today&quot;</p>
                </div>
              </div>
            </Card>

            <Card variant="dialogue" className="bg-gradient-to-r from-orange-50 to-yellow-50">
              <div className="space-y-3">
                <h4 className="font-display font-bold text-orange-700 text-lg">3. Username Display (No Addresses)</h4>
                <div className="space-y-2 text-sm text-orange-800 font-body">
                  <p><strong>Header:</strong> Shows &quot;Welcome, mistico&quot; not &quot;0x1234...&quot;</p>
                  <p><strong>Sidebar:</strong> &quot;mistico&quot; with colorful avatar, not wallet badge</p>
                  <p><strong>Portfolio:</strong> &quot;mistico&apos;s Portfolio&quot; as page title</p>
                  <p><strong>Agent List:</strong> &quot;mistico-agent-1&quot; as agent names</p>
                  <p><strong>Notifications:</strong> &quot;🧑‍🍳 We&apos;re cooking something for you mistico&quot;</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Why We Should Win */}
        <div className="space-y-4">
          <h2 className="text-3xl font-display font-bold text-green-700">
            🏆 Why We Should Win the Pool Prize
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                icon: '🔬',
                title: 'Deep MiniKit Integration',
                desc: 'Not just wallet connect—we use walletAuth, sendTransaction, sign typed data, and World ID Verify'
              },
              {
                icon: '📱',
                title: 'Mobile-First Architecture',
                desc: 'Bottom nav, 24px padding, no scroll bounce, <2s loads—built for World App from day one'
              },
              {
                icon: '👤',
                title: 'Username-First UX',
                desc: 'Never show wallet addresses. Always usernames. Makes crypto approachable for 23M users.'
              },
              {
                icon: '🔔',
                title: 'Notification System',
                desc: 'Backend API ready for push notifications with username substitution and emoji support'
              },
              {
                icon: '🌍',
                title: '19 Language Support',
                desc: 'Full localization for major World App markets (Spanish, Japanese, Korean, Portuguese, etc.)'
              },
              {
                icon: '⚡',
                title: 'Production Quality',
                desc: 'Not a hackathon demo—deployed on 5 chains, beautiful UI, 8,000+ lines of code'
              },
              {
                icon: '🎯',
                title: 'Real Use Case',
                desc: 'Makes 23M World App users their own hedge fund. Autonomous DeFi for everyone.'
              },
              {
                icon: '🔐',
                title: 'Security Best Practices',
                desc: 'SIWE with nonces, replay protection, secure backend verification, follows all guidelines'
              }
            ].map((item, i) => (
              <Card key={i} variant="feature" className="bg-gradient-to-br from-blue-50 to-cyan-50">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h4 className="font-display font-bold text-blue-700 mb-1">{item.title}</h4>
                    <p className="text-sm text-blue-800 font-body">{item.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Live Demo */}
        <Card variant="dialogue" className="bg-gradient-to-r from-blue-100 to-cyan-100 border-3 border-blue-400">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-display font-bold text-blue-700">
              🚀 Experience It in World App
            </h3>
            <p className="text-blue-800 font-body">
              Open https://hedgepod.app in World App to see native MiniKit integration
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <a href="https://hedgepod.app" target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="lg">
                  🌍 Open in World App
                </Button>
              </a>
              <Link href="/portfolio/deploy">
                <Button variant="secondary" size="lg">
                  🤖 Deploy Agent
                </Button>
              </Link>
              <a href="https://github.com/mollybeach/hedgepod" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="lg">
                  💻 View Code
                </Button>
              </a>
            </div>
          </div>
        </Card>

        {/* Documentation Reference */}
        <Card variant="dialogue" className="bg-gradient-to-r from-green-50 to-blue-50">
          <div className="space-y-3">
            <h3 className="text-2xl font-display font-bold text-green-700">
              📚 Documentation Followed
            </h3>
            <div className="grid gap-2 text-sm font-body">
              <a href="https://docs.world.org/mini-apps" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                ✅ Mini Apps Documentation
              </a>
              <a href="https://docs.world.org/world-id/reference/idkit" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                ✅ IDKit Reference (World ID Verification)
              </a>
              <a href="https://docs.world.org/mini-apps/app-guidelines" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                ✅ App Guidelines (Mobile-First, Username Display)
              </a>
              <a href="https://docs.world.org/mini-apps/design-guidelines" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                ✅ Design Guidelines (24px padding, scroll bounce)
              </a>
              <a href="https://docs.world.org/mini-apps/notification-guidelines" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                ✅ Notification Guidelines (Username substitution)
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

