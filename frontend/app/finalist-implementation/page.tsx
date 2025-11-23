import Image from 'next/image';
import { PageLayout } from '@/components/PageLayout';

export default function FinalistImplementation() {
  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto space-y-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-green-600 to-green-400 text-white px-8 py-3 rounded-full font-display font-bold text-2xl shadow-lg mb-4">
            🏆 TOP 10 FINALIST SUBMISSION PRIZE
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-green-700 mb-4">
            HedgePod Agent
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 font-medium mb-6">
            The First Truly Autonomous Cross-Chain Yield Optimizer
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold border-2 border-green-500">
              🌍 World Mini App
            </span>
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-bold border-2 border-blue-500">
              ⛓️ LayerZero OFT
            </span>
            <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-bold border-2 border-purple-500">
              🔵 Coinbase CDP
            </span>
            <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-bold border-2 border-orange-500">
              📡 Pyth Network
            </span>
            <span className="bg-pink-100 text-pink-700 px-4 py-2 rounded-full font-bold border-2 border-pink-500">
              🦄 Uniswap v4
            </span>
          </div>
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/mollybeach/hedgepod"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg"
            >
              💻 GitHub
            </a>
            <a
              href="https://www.youtube.com/watch?v=lSkDzICg0vg"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg"
            >
              🎥 Demo Video
            </a>
            <a
              href="https://hedgepod.app"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg"
            >
              🚀 Live App
            </a>
          </div>
        </div>

        {/* What We Built */}
        <div className="bg-white rounded-xl p-8 shadow-lg border-4 border-green-500 mb-8">
          <h2 className="text-3xl font-display font-bold text-green-700 mb-4">
            🦔 What is HedgePod?
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            HedgePod is an <strong>autonomous yield optimization platform</strong> that maximizes DeFi returns across 8+ chains 
            without requiring constant user interaction. Deploy an agent once, and it monitors yields 24/7, automatically 
            rebalancing your funds to the highest APR opportunities.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300">
              <div className="text-3xl mb-2">🤖</div>
              <h3 className="font-bold text-green-700 mb-2">Autonomous Agents</h3>
              <p className="text-sm text-gray-600">
                Set-it-and-forget-it agents that work 24/7, no wallet popups, no manual intervention needed.
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-300">
              <div className="text-3xl mb-2">🌐</div>
              <h3 className="font-bold text-blue-700 mb-2">8-Chain Coverage</h3>
              <p className="text-sm text-gray-600">
                World, Base, Polygon, Arbitrum, Optimism, Avalanche, Celo, Zircuit - all in one interface.
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-300">
              <div className="text-3xl mb-2">📈</div>
              <h3 className="font-bold text-purple-700 mb-2">Real-Time Optimization</h3>
              <p className="text-sm text-gray-600">
                Pyth price feeds + The Graph data = instant yield detection and automatic rebalancing.
              </p>
            </div>
          </div>
        </div>

        {/* Why We Should Be Finalists */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-8 shadow-lg border-4 border-yellow-500 mb-8">
          <h2 className="text-3xl font-display font-bold text-orange-700 mb-6 text-center">
            🏆 Why HedgePod Should Be a Top 10 Finalist
          </h2>
          
          <div className="space-y-6">
            {/* Technical Innovation */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-bold text-green-700 mb-3 flex items-center gap-2">
                <span>🔬</span> Technical Innovation
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>First LayerZero OFT with APR-aware routing</strong> - Extended <code className="bg-gray-100 px-2 py-1 rounded">_debit()</code> to validate yield improvements before cross-chain transfers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Custom Uniswap v4 Hook</strong> - <code className="bg-gray-100 px-2 py-1 rounded">VolatilityFeeHook</code> dynamically adjusts swap fees based on Pyth volatility data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>True agent autonomy</strong> - CDP Server Wallets + x402 authorization = 24/7 operation without user approval</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Verifiable randomness</strong> - Pyth Entropy for fair agent selection and MEV protection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Multi-data aggregation</strong> - Pyth + The Graph + Chainlink for comprehensive market intelligence</span>
                </li>
              </ul>
            </div>

            {/* Real-World Impact */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-bold text-blue-700 mb-3 flex items-center gap-2">
                <span>🌍</span> Real-World Impact
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>Built for 23 million World App users</strong> - Consumer-grade UX, no crypto jargon, gasless transactions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>Solves a real problem</strong> - 96% of DeFi users don&apos;t actively rebalance; HedgePod automates it</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>Production-ready</strong> - Deployed on 8 chains, functional agents, real transaction history</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>Sybil-resistant</strong> - World ID verification ensures fair agent deployment</span>
                </li>
              </ul>
            </div>

            {/* Integration Depth */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-bold text-purple-700 mb-3 flex items-center gap-2">
                <span>🔗</span> Integration Depth
              </h3>
              <p className="text-gray-700 mb-3">
                <strong>We didn&apos;t just add logos - we built production-grade integrations:</strong>
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded border-l-4 border-green-500">
                  <strong className="text-green-700">🌍 World:</strong> MiniKit SDK, World ID, Pay commands, gasless transactions
                </div>
                <div className="bg-gray-50 p-3 rounded border-l-4 border-blue-500">
                  <strong className="text-blue-700">⛓️ LayerZero:</strong> Extended OFT standard with custom yield logic, 8-chain deployment
                </div>
                <div className="bg-gray-50 p-3 rounded border-l-4 border-purple-500">
                  <strong className="text-purple-700">🔵 CDP:</strong> Server Wallets, x402 authorization, Trade API, Data APIs
                </div>
                <div className="bg-gray-50 p-3 rounded border-l-4 border-orange-500">
                  <strong className="text-orange-700">📡 Pyth:</strong> Hermes API, volatility calculations, Entropy randomness
                </div>
                <div className="bg-gray-50 p-3 rounded border-l-4 border-pink-500">
                  <strong className="text-pink-700">🦄 Uniswap v4:</strong> Custom volatility fee hook, multi-chain pools
                </div>
                <div className="bg-gray-50 p-3 rounded border-l-4 border-indigo-500">
                  <strong className="text-indigo-700">🌈 1inch:</strong> Fusion mode, optimal routing, protocol aggregation
                </div>
              </div>
            </div>

            {/* Code Quality */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-bold text-gray-700 mb-3 flex items-center gap-2">
                <span>💎</span> Code Quality
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-gray-600 font-bold">✓</span>
                  <span><strong>5 smart contracts</strong> - All verified on-chain with comprehensive test coverage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-600 font-bold">✓</span>
                  <span><strong>Full-stack TypeScript</strong> - Frontend, backend, and deployment scripts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-600 font-bold">✓</span>
                  <span><strong>Clean architecture</strong> - Modular design, separation of concerns, extensive documentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-600 font-bold">✓</span>
                  <span><strong>Production monitoring</strong> - Supabase tracking, webhook notifications, real-time analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-600 font-bold">✓</span>
                  <span><strong>Open source contribution</strong> - <a href="https://github.com/pyth-network/pyth-examples/pull/82" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">PR to Pyth examples</a></span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Partner Integration Deep Dive */}
        <div className="bg-white rounded-xl p-8 shadow-lg border-4 border-gray-300 mb-8">
          <h2 className="text-3xl font-display font-bold text-gray-800 mb-6 text-center">
            🎯 Partner Integration Details
          </h2>

          {/* World */}
          <div className="mb-8 bg-green-50 p-6 rounded-lg border-2 border-green-300">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">🌍</span>
              <h3 className="text-2xl font-bold text-green-700">World: Best Mini App Implementation</h3>
            </div>
            <p className="text-gray-700 mb-3">
              HedgePod is built <em>specifically</em> as a World Mini App, targeting the 23 million World App users 
              with consumer-grade UX and gasless transactions.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-3">
              <div>
                <strong className="text-green-700">🔐 World ID:</strong>
                <p className="text-sm text-gray-600">Sybil-resistant agent deployment with verified human identity</p>
              </div>
              <div>
                <strong className="text-green-700">📱 MiniKit SDK:</strong>
                <p className="text-sm text-gray-600">Connect, transaction, and payment commands for seamless UX</p>
              </div>
              <div>
                <strong className="text-green-700">⛽ Gasless Transactions:</strong>
                <p className="text-sm text-gray-600">No gas fees via Privy sponsorship on World Chain</p>
              </div>
              <div>
                <strong className="text-green-700">🌐 World Chain Native:</strong>
                <p className="text-sm text-gray-600">Primary deployment on World Chain mainnet</p>
              </div>
            </div>
            <a href="/world-best-mini-app-implementation" className="text-green-700 hover:underline font-bold">
              → Full World Implementation Details
            </a>
          </div>

          {/* LayerZero */}
          <div className="mb-8 bg-blue-50 p-6 rounded-lg border-2 border-blue-300">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">⛓️</span>
              <h3 className="text-2xl font-bold text-blue-700">LayerZero: Best Omnichain Implementation</h3>
            </div>
            <p className="text-gray-700 mb-3">
              Extended LayerZero&apos;s OFT standard with custom APR-aware routing logic. This is the backbone of 
              cross-chain autonomy - not a superficial integration.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-3">
              <div>
                <strong className="text-blue-700">🔗 AutoYieldToken (OFT):</strong>
                <p className="text-sm text-gray-600">Custom <code className="bg-white px-1 rounded">_debit()</code> override validates APR before transfers</p>
              </div>
              <div>
                <strong className="text-blue-700">🌐 8-Chain Deployment:</strong>
                <p className="text-sm text-gray-600">56 peer connections across World, Base, Polygon, Arbitrum, etc.</p>
              </div>
              <div>
                <strong className="text-blue-700">🎯 Yield-Aware Routing:</strong>
                <p className="text-sm text-gray-600">Only allows cross-chain if target APR &gt; current APR + 1%</p>
              </div>
              <div>
                <strong className="text-blue-700">📊 LayerScan Verified:</strong>
                <p className="text-sm text-gray-600">All cross-chain transactions visible and debuggable</p>
              </div>
            </div>
            <a href="/layerzero-best-omnichain-implementation" className="text-blue-700 hover:underline font-bold">
              → Full LayerZero Implementation Details
            </a>
          </div>

          {/* Coinbase CDP */}
          <div className="mb-8 bg-purple-50 p-6 rounded-lg border-2 border-purple-300">
            <div className="flex items-center gap-3 mb-4">
              <Image src="/coinbase-logo.svg" alt="Coinbase" width={48} height={48} />
              <h3 className="text-2xl font-bold text-purple-700">Coinbase CDP: Agent Autonomy</h3>
            </div>
            <p className="text-gray-700 mb-3">
              CDP Server Wallets + x402 authorization enable TRUE autonomous operation. This is what makes 
              &quot;set-it-and-forget-it&quot; possible - no wallet popups ever.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-3">
              <div>
                <strong className="text-purple-700">🤖 Server Wallets:</strong>
                <p className="text-sm text-gray-600">Agents run 24/7 without user intervention</p>
              </div>
              <div>
                <strong className="text-purple-700">🔐 x402 Authorization:</strong>
                <p className="text-sm text-gray-600">One-time permission grant for recurring operations</p>
              </div>
              <div>
                <strong className="text-purple-700">💱 Trade API:</strong>
                <p className="text-sm text-gray-600">Automated swap execution across DEXs</p>
              </div>
              <div>
                <strong className="text-purple-700">📊 Data APIs:</strong>
                <p className="text-sm text-gray-600">Real-time balance and performance tracking</p>
              </div>
            </div>
            <a href="/cdp-implementation" className="text-purple-700 hover:underline font-bold">
              → Full CDP Implementation Details
            </a>
          </div>

          {/* Pyth Network */}
          <div className="mb-8 bg-orange-50 p-6 rounded-lg border-2 border-orange-300">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">📡</span>
              <h3 className="text-2xl font-bold text-orange-700">Pyth Network: Price Feeds & Entropy</h3>
            </div>
            <p className="text-gray-700 mb-3">
              Dual Pyth integration: Hermes API for real-time price/volatility data, and Entropy for verifiable randomness.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-3">
              <div>
                <strong className="text-orange-700">💰 Price Feeds (Hermes):</strong>
                <p className="text-sm text-gray-600">Real-time USDC/ETH/BTC prices for APR calculations</p>
              </div>
              <div>
                <strong className="text-orange-700">📊 Volatility Calculations:</strong>
                <p className="text-sm text-gray-600">Powers VolatilityFeeHook for dynamic Uniswap fees</p>
              </div>
              <div>
                <strong className="text-orange-700">🎲 Entropy (Randomness):</strong>
                <p className="text-sm text-gray-600">Fair agent lottery selection and MEV protection</p>
              </div>
              <div>
                <strong className="text-orange-700">✅ Examples PR:</strong>
                <p className="text-sm text-gray-600"><a href="https://github.com/pyth-network/pyth-examples/pull/82" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Contributed example code</a></p>
              </div>
            </div>
            <div className="flex gap-4">
              <a href="/pyth-implementation" className="text-orange-700 hover:underline font-bold">
                → Price Feeds Implementation
              </a>
              <a href="/entropy-implementation" className="text-orange-700 hover:underline font-bold">
                → Entropy Implementation
              </a>
            </div>
          </div>

          {/* Additional Technologies */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-pink-50 p-4 rounded-lg border-2 border-pink-300">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🦄</span>
                <h4 className="text-lg font-bold text-pink-700">Uniswap v4 Hooks</h4>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Custom <code className="bg-white px-1 rounded">VolatilityFeeHook</code> adjusts fees based on Pyth volatility
              </p>
              <a href="/uniswap-implementation" className="text-pink-700 hover:underline text-sm font-bold">
                → Details
              </a>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg border-2 border-indigo-300">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🌈</span>
                <h4 className="text-lg font-bold text-indigo-700">1inch Aggregation</h4>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Fusion mode for optimal swap routing across 10+ DEX protocols
              </p>
              <a href="/oneinch-implementation" className="text-indigo-700 hover:underline text-sm font-bold">
                → Details
              </a>
            </div>
            <div className="bg-cyan-50 p-4 rounded-lg border-2 border-cyan-300">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">📊</span>
                <h4 className="text-lg font-bold text-cyan-700">The Graph</h4>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Uniswap v3 subgraphs for historical liquidity and volume data
              </p>
              <a href="/thegraph-implementation" className="text-cyan-700 hover:underline text-sm font-bold">
                → Details
              </a>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-300">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🔗</span>
                <h4 className="text-lg font-bold text-gray-700">ENS + Privy</h4>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Human-readable names (ENS) + gasless transactions (Privy)
              </p>
            </div>
          </div>
        </div>

        {/* Smart Contracts */}
        <div className="bg-white rounded-xl p-8 shadow-lg border-4 border-blue-300 mb-8">
          <h2 className="text-3xl font-display font-bold text-blue-700 mb-4">
            📜 Smart Contract Architecture
          </h2>
          <p className="text-gray-700 mb-6">
            5 production-ready smart contracts deployed across 8 chains. All verified on block explorers.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
              <h3 className="font-bold text-blue-700 mb-2">HedgePodVault</h3>
              <p className="text-sm text-gray-600 mb-2">Main vault for deposits, withdrawals, and autonomous rebalancing</p>
              <a 
                href="https://github.com/mollybeach/hedgepod/blob/master/contracts/HedgePodVault.sol" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm font-bold"
              >
                → View Code
              </a>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
              <h3 className="font-bold text-green-700 mb-2">AutoYieldToken</h3>
              <p className="text-sm text-gray-600 mb-2">LayerZero OFT with APR-aware routing logic</p>
              <a 
                href="https://github.com/mollybeach/hedgepod/blob/master/contracts/AutoYieldToken.sol" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-600 hover:underline text-sm font-bold"
              >
                → View Code
              </a>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-200">
              <h3 className="font-bold text-orange-700 mb-2">YieldOracle</h3>
              <p className="text-sm text-gray-600 mb-2">Aggregates Pyth + Chainlink data for APR calculations</p>
              <a 
                href="https://github.com/mollybeach/hedgepod/blob/master/contracts/YieldOracle.sol" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-orange-600 hover:underline text-sm font-bold"
              >
                → View Code
              </a>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200">
              <h3 className="font-bold text-purple-700 mb-2">VolatilityFeeHook</h3>
              <p className="text-sm text-gray-600 mb-2">Uniswap v4 hook for dynamic fee adjustment</p>
              <a 
                href="https://github.com/mollybeach/hedgepod/blob/master/contracts/VolatilityFeeHook.sol" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-600 hover:underline text-sm font-bold"
              >
                → View Code
              </a>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg border-2 border-pink-200">
              <h3 className="font-bold text-pink-700 mb-2">RandomAgentSelector</h3>
              <p className="text-sm text-gray-600 mb-2">Pyth Entropy for verifiable randomness</p>
              <a 
                href="https://github.com/mollybeach/hedgepod/blob/master/contracts/RandomAgentSelector.sol" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-pink-600 hover:underline text-sm font-bold"
              >
                → View Code
              </a>
            </div>
          </div>
          <div className="mt-4 text-center">
            <a href="/contracts" className="text-blue-700 hover:underline font-bold text-lg">
              → View All Deployments (8 Chains Each)
            </a>
          </div>
        </div>

        {/* Demo Video */}
        <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-8 shadow-lg border-4 border-red-300 mb-8">
          <h2 className="text-3xl font-display font-bold text-red-700 mb-4 text-center">
            🎥 Watch the Demo
          </h2>
          <div className="aspect-video max-w-4xl mx-auto mb-4">
            <iframe
              className="w-full h-full rounded-lg shadow-lg"
              src="https://www.youtube.com/embed/lSkDzICg0vg?rel=0&modestbranding=1"
              title="HedgePod Demo Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="text-center text-gray-700">
            See HedgePod in action: agent deployment, cross-chain rebalancing, and autonomous yield optimization.
          </p>
        </div>

        {/* The Bottom Line */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl p-8 shadow-2xl border-4 border-yellow-400">
          <h2 className="text-4xl font-display font-bold mb-6 text-center">
            🦔 The Bottom Line
          </h2>
          <div className="text-lg space-y-4 max-w-3xl mx-auto">
            <p>
              <strong>HedgePod isn&apos;t just another DeFi dashboard.</strong> It&apos;s the first truly autonomous yield optimizer 
              that works across 8+ chains without requiring constant user babysitting.
            </p>
            <p>
              We&apos;ve integrated <strong>10+ partner technologies</strong> at a deep, production-grade level - not superficial 
              &quot;we used their API&quot; integrations, but custom smart contract extensions, novel use cases, and real innovation.
            </p>
            <p>
              We&apos;ve built for <strong>real users</strong> (23M World App users), solved a <strong>real problem</strong> (96% 
              of DeFi users don&apos;t actively rebalance), and delivered <strong>production quality</strong> (deployed, functional, 
              verified smart contracts).
            </p>
            <p className="text-center text-2xl font-bold mt-6">
              🏆 HedgePod deserves to be a Top 10 Finalist. 🏆
            </p>
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <a
              href="https://github.com/mollybeach/hedgepod"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-gray-800 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg"
            >
              💻 Explore the Code
            </a>
            <a
              href="https://hedgepod.app"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-400 text-gray-800 hover:bg-yellow-300 px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg"
            >
              🚀 Try the App
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

