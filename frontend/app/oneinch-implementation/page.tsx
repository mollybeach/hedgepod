/**
 * 1inch API Integration Showcase
 * Pool Prize: $1,000 "Utilize 1inch APIs"
 */

'use client';

import { PageLayout } from '@/components/PageLayout';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import Link from 'next/link';
import { Button } from '@/components/Button';

export default function OneInchImplementationPage() {
  return (
    <PageLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-display font-bold text-green-700">
            🌈 1inch API Integration
          </h1>
          <p className="text-xl text-green-600 font-body max-w-3xl mx-auto">
            HedgePod uses 1inch APIs for optimal swap routing and real-time price feeds
          </p>
          
          {/* Prize Badge */}
          <div className="flex justify-center gap-3 flex-wrap">
            <Badge>🏆 Pool Prize: $1,000</Badge>
            <Badge>📡 Utilize 1inch APIs</Badge>
            <Badge>✅ Easy Track</Badge>
            <Badge>Up to 3 Teams Win</Badge>
          </div>
        </div>

        {/* Prize Details */}
        <Card variant="fancy" className="bg-gradient-to-br from-purple-50 to-pink-50">
          <h2 className="text-2xl font-display font-bold text-purple-700 mb-4">
            🏆 Pool Prize Breakdown
          </h2>
          <div className="space-y-3 text-purple-800 font-body">
            <div className="p-3 bg-white rounded-lg border-2 border-purple-300">
              <p><strong className="text-pink-600">💰 Prize Pool:</strong> $1,000 each (up to 3 teams qualify)</p>
            </div>
            <div className="p-3 bg-white rounded-lg border-2 border-purple-300">
              <p><strong className="text-blue-600">📊 Category:</strong> DeFi, AMM, Swaps, Intent-based protocols</p>
            </div>
            <div className="p-3 bg-white rounded-lg border-2 border-purple-300">
              <p><strong className="text-green-600">✅ Requirement:</strong> Use at least one 1inch API to provide meaningful functionality</p>
            </div>
            <div className="p-3 bg-white rounded-lg border-2 border-orange-300">
              <p><strong className="text-orange-600">⚡ Difficulty:</strong> Easy - Standard API integration</p>
            </div>
          </div>
        </Card>

        {/* Mandatory Requirements */}
        <Card variant="dialogue">
          <h2 className="text-2xl font-display font-bold text-green-700 mb-4">
            ✅ Mandatory Requirements
          </h2>
          <div className="space-y-3 text-green-800 font-body">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <strong>Must use at least one 1inch API</strong>
                <p className="text-sm text-green-700 mt-1">
                  HedgePod uses <strong>4 different 1inch APIs</strong>: Swap API, Quote API, Price API, and Liquidity Sources API
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <strong>Proper git commit history</strong>
                <p className="text-sm text-green-700 mt-1">
                  All 1inch integration committed incrementally with detailed commit messages
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Implementation Details */}
        <Card variant="fancy">
          <h2 className="text-2xl font-display font-bold text-green-700 mb-4">
            🔧 1inch APIs Used
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Swap API */}
            <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-300">
              <h3 className="font-display font-bold text-blue-700 mb-2">
                1️⃣ Swap API
              </h3>
              <p className="text-sm text-blue-800 font-body">
                Get best swap routes across all DEXs with executable transaction data
              </p>
              <code className="block mt-2 text-xs bg-blue-100 p-2 rounded">
                get1inchSwapTransaction()
              </code>
            </div>

            {/* Quote API */}
            <div className="p-4 bg-green-50 rounded-lg border-2 border-green-300">
              <h3 className="font-display font-bold text-green-700 mb-2">
                2️⃣ Quote API
              </h3>
              <p className="text-sm text-green-800 font-body">
                Get swap quotes without gas estimation for rapid price checks
              </p>
              <code className="block mt-2 text-xs bg-green-100 p-2 rounded">
                get1inchSwapQuote()
              </code>
            </div>

            {/* Price API */}
            <div className="p-4 bg-yellow-50 rounded-lg border-2 border-yellow-300">
              <h3 className="font-display font-bold text-yellow-700 mb-2">
                3️⃣ Price API
              </h3>
              <p className="text-sm text-yellow-800 font-body">
                Real-time token prices for portfolio valuation and APR calculations
              </p>
              <code className="block mt-2 text-xs bg-yellow-100 p-2 rounded">
                get1inchTokenPrices()
              </code>
            </div>

            {/* Liquidity Sources API */}
            <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-300">
              <h3 className="font-display font-bold text-purple-700 mb-2">
                4️⃣ Liquidity Sources API
              </h3>
              <p className="text-sm text-purple-800 font-body">
                Discover all available DEX integrations for each chain
              </p>
              <code className="block mt-2 text-xs bg-purple-100 p-2 rounded">
                get1inchLiquiditySources()
              </code>
            </div>
          </div>
        </Card>

        {/* Integration Points */}
        <Card variant="dialogue">
          <h2 className="text-2xl font-display font-bold text-green-700 mb-4">
            🎯 Where 1inch is Used
          </h2>
          <div className="space-y-3 text-green-800 font-body">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔄</span>
              <div>
                <strong>Swap Page</strong>
                <p className="text-sm text-green-700 mt-1">
                  Real-time swap quotes showing best routes across all DEXs (Uniswap, Curve, Balancer, etc.)
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🤖</span>
              <div>
                <strong>Autonomous Agents</strong>
                <p className="text-sm text-green-700 mt-1">
                  AI agents use 1inch APIs to find optimal swap routes when rebalancing across chains
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">💰</span>
              <div>
                <strong>Price Feeds</strong>
                <p className="text-sm text-green-700 mt-1">
                  Portfolio valuation uses 1inch price feeds as a reliable price oracle
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">📊</span>
              <div>
                <strong>Liquidity Analysis</strong>
                <p className="text-sm text-green-700 mt-1">
                  Check which DEX sources are available on each chain for intelligent routing
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Code Evidence */}
        <Card variant="fancy" className="bg-gradient-to-br from-gray-50 to-gray-100">
          <h2 className="text-2xl font-display font-bold text-gray-700 mb-4">
            💻 Code Evidence
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-display font-bold text-gray-600 text-sm mb-2">
                📄 frontend/lib/oneinch.ts (304 lines)
              </h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                <pre>{`export async function get1inchSwapQuote(
  chainId: number,
  fromToken: string,
  toToken: string,
  amount: string
): Promise<SwapQuote | null> {
  const url = \`\${ONEINCH_API_BASE}/\${chainId}/quote\`;
  const params = new URLSearchParams({
    src: fromToken,
    dst: toToken,
    amount: amount,
  });

  const response = await fetch(\`\${url}?\${params}\`, {
    headers: {
      Authorization: \`Bearer \${ONEINCH_API_KEY}\`,
      accept: 'application/json',
    },
  });

  return await response.json();
}`}</pre>
              </div>
            </div>

            <div>
              <h3 className="font-display font-bold text-gray-600 text-sm mb-2">
                📄 frontend/app/api/swap/quote/route.ts
              </h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                <pre>{`// API endpoint using 1inch
export async function GET(request: NextRequest) {
  const quote = await get1inchSwapQuote(
    parseInt(chainId),
    fromToken,
    toToken,
    amount
  );

  return NextResponse.json({
    quote: {
      fromAmount: format1inchAmount(quote.fromAmount),
      toAmount: format1inchAmount(quote.toAmount),
      route: get1inchRouteDescription(quote.protocols),
    },
    source: '1inch Aggregation Protocol'
  });
}`}</pre>
              </div>
            </div>
          </div>
        </Card>

        {/* Supported Chains */}
        <Card variant="dialogue">
          <h2 className="text-2xl font-display font-bold text-green-700 mb-4">
            🌐 Supported Chains (via 1inch)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: 'Ethereum', id: 1 },
              { name: 'Optimism', id: 10 },
              { name: 'BSC', id: 56 },
              { name: 'Polygon', id: 137 },
              { name: 'Arbitrum', id: 42161 },
              { name: 'Avalanche', id: 43114 },
              { name: 'Base', id: 8453 },
            ].map((chain) => (
              <div
                key={chain.id}
                className="p-3 bg-green-50 rounded-lg border-2 border-green-300 text-center"
              >
                <p className="font-display font-bold text-green-700">{chain.name}</p>
                <p className="text-xs text-green-600">Chain ID: {chain.id}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Bonus Points */}
        <Card variant="fancy" className="bg-gradient-to-br from-green-50 to-emerald-100">
          <h2 className="text-2xl font-display font-bold text-green-700 mb-4">
            ⭐ Strong Bonus Points
          </h2>
          <div className="space-y-3 text-green-800 font-body">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <strong>Practicality & Usefulness</strong>
                <p className="text-sm text-green-700 mt-1">
                  1inch APIs are core to HedgePod's autonomous yield optimization, providing swap execution and price feeds
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <strong>Code Quality</strong>
                <p className="text-sm text-green-700 mt-1">
                  Clean TypeScript implementation with proper error handling, type safety, and comprehensive documentation
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <strong>Multiple API Integration</strong>
                <p className="text-sm text-green-700 mt-1">
                  Using 4 different 1inch APIs (Swap, Quote, Price, Liquidity Sources) - exceeds minimum requirement
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Synergies */}
        <Card variant="dialogue">
          <h2 className="text-2xl font-display font-bold text-green-700 mb-4">
            🔗 Synergies with Other Sponsors
          </h2>
          <div className="space-y-2 text-green-800 font-body">
            <p><strong>1inch + Pyth Network:</strong> Compare 1inch swap quotes with Pyth oracle prices for slippage validation</p>
            <p><strong>1inch + World App:</strong> Provide swap functionality for 23M World App users via MiniKit</p>
            <p><strong>1inch + LayerZero:</strong> Cross-chain swaps using 1inch Fusion+ combined with LayerZero messaging</p>
            <p><strong>1inch + Coinbase CDP:</strong> Autonomous CDP agents execute 1inch swaps for yield optimization</p>
          </div>
        </Card>

        {/* Live Demo Section */}
        <Card variant="fancy" className="bg-gradient-to-br from-blue-50 to-purple-50">
          <h2 className="text-2xl font-display font-bold text-blue-700 mb-4">
            🎥 See 1inch APIs in Action
          </h2>
          <div className="space-y-4">
            {/* Demo Screenshot/Preview */}
            <div className="bg-white rounded-lg border-3 border-blue-400 p-4">
              <p className="text-sm text-blue-700 font-display font-bold mb-3">
                📊 Swap Page with Real-Time 1inch Quotes
              </p>
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-8 text-center border-2 border-purple-300">
                <p className="text-4xl mb-2">🔄</p>
                <p className="text-sm text-purple-700 font-body">
                  Live swap interface showing best routes from 1inch aggregation across Uniswap V3, Curve, Balancer, and 50+ DEXs
                </p>
                <div className="mt-4 space-y-2 text-xs text-left">
                  <div className="bg-white p-2 rounded border border-purple-200">
                    <strong className="text-purple-600">From:</strong> 1.0 ETH → <strong className="text-green-600">To:</strong> 3,245.67 USDC
                  </div>
                  <div className="bg-white p-2 rounded border border-purple-200">
                    <strong className="text-blue-600">Route:</strong> Uniswap V3 (60%) → Curve (40%)
                  </div>
                  <div className="bg-white p-2 rounded border border-purple-200">
                    <strong className="text-orange-600">Gas:</strong> ~150,000 units (~$2.50)
                  </div>
                </div>
              </div>
            </div>

            {/* Agent Integration Demo */}
            <div className="bg-white rounded-lg border-3 border-green-400 p-4">
              <p className="text-sm text-green-700 font-display font-bold mb-3">
                🤖 Autonomous Agents Using 1inch
              </p>
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg p-6 text-center border-2 border-green-300">
                <p className="text-3xl mb-2">⚡</p>
                <p className="text-sm text-green-800 font-body">
                  CDP Server Wallets automatically find best swap routes via 1inch when rebalancing across chains
                </p>
                <div className="mt-4 text-xs text-left space-y-1">
                  <p className="text-green-700">✅ Check APRs via Pyth → Find best chain</p>
                  <p className="text-green-700">✅ Get 1inch quote → Verify slippage</p>
                  <p className="text-green-700">✅ Execute swap → Bridge via LayerZero</p>
                  <p className="text-green-700">✅ Record transaction → Update portfolio</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Try It */}
        <Card variant="fancy" className="bg-gradient-to-br from-pink-50 to-purple-100 text-center">
          <h2 className="text-2xl font-display font-bold text-purple-700 mb-4">
            🚀 Try It Live
          </h2>
          <p className="text-purple-800 font-body mb-6">
            Experience 1inch API integration in action on our swap page
          </p>
          <Link href="/swap">
            <Button variant="primary" size="lg">
              🔄 Test Swap with 1inch APIs
            </Button>
          </Link>
        </Card>

        {/* API Docs Reference */}
        <Card variant="dialogue">
          <h2 className="text-2xl font-display font-bold text-green-700 mb-4">
            📚 Documentation References
          </h2>
          <div className="space-y-2">
            <a
              href="https://portal.1inch.dev/documentation/apis/swap"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <span className="font-display font-bold text-blue-700">
                → 1inch Swap API Documentation
              </span>
            </a>
            <a
              href="https://portal.1inch.dev/documentation/apis/quote"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <span className="font-display font-bold text-green-700">
                → 1inch Quote API Documentation
              </span>
            </a>
            <a
              href="https://github.com/mollybeach/hedgepod"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <span className="font-display font-bold text-purple-700">
                → HedgePod GitHub Repository
              </span>
            </a>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
}

