/**
 * Demo Video Page
 * ETHGlobal Buenos Aires 2025 Project Demo
 */

'use client';

import { PageLayout } from '@/components/PageLayout';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import Link from 'next/link';

export default function Demo() {
  // YouTube video ID from https://youtu.be/lSkDzICg0vg
  const videoId = 'lSkDzICg0vg';
  
  return (
    <PageLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 pt-8">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-green-700 drop-shadow-lg">
            🎥 HedgePod Demo Video
          </h1>
          <p className="text-xl text-pink-600 font-body max-w-3xl mx-auto font-bold">
            ETHGlobal Buenos Aires 2025 | Autonomous Cross-Chain DeFi
          </p>
        </div>

        {/* Video Player Card */}
        <Card variant="dialogue" className="max-w-5xl mx-auto">
          <div className="space-y-4">
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
              {/* 16:9 Aspect Ratio Container */}
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-xl border-3 border-brown-400"
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                title="HedgePod Demo Video - ETHGlobal Buenos Aires 2025"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            
            <div className="text-center space-y-2 pt-4">
              <p className="text-green-800 font-body text-sm">
                Watch our 3-minute walkthrough showcasing autonomous cross-chain yield optimization
              </p>
              <p className="text-green-600 font-body text-xs italic">
                ⏱️ Duration: 2-4 minutes | 📅 Recorded: November 2025
              </p>
              <a 
                href="https://youtu.be/lSkDzICg0vg" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-pink-600 underline font-bold text-sm inline-block"
              >
                🔗 Watch on YouTube
              </a>
            </div>
          </div>
        </Card>

        {/* Demo Highlights */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <Card variant="default">
            <h3 className="text-xl font-display font-bold text-green-700 mb-3">
              🎯 What You&apos;ll See
            </h3>
            <ul className="space-y-2 text-green-800 font-body text-sm">
              <li className="flex items-start gap-2">
                <span className="text-pink-600 font-bold">01.</span>
                <span>Landing page with Animal Crossing UI theme</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-600 font-bold">02.</span>
                <span>Portfolio dashboard tracking 8 chains in real-time</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-600 font-bold">03.</span>
                <span>Swap page with live Pyth + The Graph data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-600 font-bold">04.</span>
                <span>Agent deployment with World ID verification</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-600 font-bold">05.</span>
                <span>Live rebalancing execution across chains</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-600 font-bold">06.</span>
                <span>Code walkthrough: LayerZero OFT + Uniswap v4 hook</span>
              </li>
            </ul>
          </Card>

          <Card variant="default">
            <h3 className="text-xl font-display font-bold text-green-700 mb-3">
              🏆 Prize Integrations Shown
            </h3>
            <ul className="space-y-2 text-green-800 font-body text-sm">
              <li className="flex items-start gap-2">
                <span className="text-2xl">🌍</span>
                <div>
                  <span className="font-bold">World:</span> MiniKit SDK, World ID, SIWE auth
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-2xl">⛓️</span>
                <div>
                  <span className="font-bold">LayerZero:</span> Extended OFT V2, APR routing
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-2xl">🔵</span>
                <div>
                  <span className="font-bold">Coinbase CDP:</span> Server wallets, x402 auth
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-2xl">📡</span>
                <div>
                  <span className="font-bold">Pyth Network:</span> Real-time price feeds
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-2xl">📊</span>
                <div>
                  <span className="font-bold">The Graph:</span> Uniswap liquidity data
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-2xl">🦄</span>
                <div>
                  <span className="font-bold">Uniswap v4:</span> Dynamic fee hook
                </div>
              </li>
            </ul>
          </Card>
        </div>

        {/* Quick Links */}
        <Card variant="dialogue" className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-display font-bold text-green-700 mb-4 text-center">
            🚀 Try It Yourself
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/">
              <Button variant="primary" size="md" className="w-full">
                🏠 Home Page
              </Button>
            </Link>
            <Link href="/portfolio/deploy">
              <Button variant="primary" size="md" className="w-full">
                🤖 Deploy Agent
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button variant="secondary" size="md" className="w-full">
                📊 View Portfolio
              </Button>
            </Link>
          </div>
        </Card>

        {/* Technical Details */}
        <Card variant="default" className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-display font-bold text-green-700 mb-4">
            🛠️ Technical Highlights
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-green-800 font-body">
            <div>
              <h4 className="font-bold text-pink-600 mb-2">Smart Contracts</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Extended LayerZero V2 OFT with APR logic</li>
                <li>Uniswap v4 volatility fee hook (Pyth)</li>
                <li>HedgePodVault with x402 authorization</li>
                <li>Deployed on 8 chains with peer config</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-pink-600 mb-2">Frontend</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Next.js 14 with MiniKit SDK integration</li>
                <li>RainbowKit + wagmi for wallet connection</li>
                <li>Real-time data: Pyth + The Graph</li>
                <li>19 language support (next-intl)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-pink-600 mb-2">Backend Agent</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>CDP Server Wallets for autonomy</li>
                <li>Pyth Hermes API for yield monitoring</li>
                <li>1inch Fusion+ for optimal routing</li>
                <li>Supabase for performance tracking</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-pink-600 mb-2">Infrastructure</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Vercel deployment (hedgepod.app)</li>
                <li>Alchemy RPC for all chains</li>
                <li>Hardhat 3 for contract development</li>
                <li>GitHub Actions for CI/CD (future)</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Submission Info */}
        <Card variant="dialogue" className="max-w-5xl mx-auto">
          <div className="text-center space-y-3">
            <h3 className="text-2xl font-display font-bold text-green-700">
              📋 Submission Information
            </h3>
            <p className="text-green-800 font-body">
              <span className="font-bold">Hackathon:</span> ETHGlobal Buenos Aires 2025
            </p>
            <p className="text-green-800 font-body">
              <span className="font-bold">Category:</span> DeFi | Finalist + 3 Partner Prizes
            </p>
            <p className="text-green-800 font-body">
              <span className="font-bold">Live Demo:</span>{' '}
              <a 
                href="https://hedgepod.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-pink-600 underline font-bold"
              >
                https://hedgepod.app
              </a>
            </p>
            <p className="text-green-800 font-body">
              <span className="font-bold">GitHub:</span>{' '}
              <a 
                href="https://github.com/mollybeach/hedgepod" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-pink-600 underline font-bold"
              >
                github.com/mollybeach/hedgepod
              </a>
            </p>
          </div>
        </Card>

        {/* Video Info */}
        <Card variant="default" className="max-w-5xl mx-auto bg-green-50 border-green-400">
          <div className="text-center space-y-3">
            <h3 className="text-xl font-display font-bold text-green-600">
              ✅ Demo Video Live on YouTube
            </h3>
            <p className="text-green-800 font-body text-sm">
              Our full project walkthrough showcasing all integrations, live on-chain interactions, and code demonstrations.
            </p>
            <p className="text-green-700 font-body text-xs italic">
              🎬 Filmed for ETHGlobal Buenos Aires 2025 submission | 📺 <a href="https://youtu.be/lSkDzICg0vg" target="_blank" rel="noopener noreferrer" className="text-pink-600 underline font-bold">youtu.be/lSkDzICg0vg</a>
            </p>
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

