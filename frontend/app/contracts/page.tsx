/**
 * Contracts Page - View all deployed smart contracts
 */

import { PageLayout } from '@/components/PageLayout';
import { Navigation } from '@/components/Navigation';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';

export default function Contracts() {
  const contracts = [
    {
      name: 'HedgePodVault',
      description: 'Main vault contract for deposits, withdrawals, and autonomous rebalancing. Manages user funds across multiple chains.',
      features: [
        'Deposit USDC/ETH/USDT',
        'Autonomous rebalancing',
        'Cross-chain transfers',
        'Yield optimization',
        'Uniswap v4 integration'
      ],
      chains: [
        { name: 'Hardhat Local', address: '0x5FbDB2315678afecb367f032d93F642f64180aa3', explorer: null },
        { name: 'Base Sepolia', address: 'TBD', explorer: 'https://sepolia.basescan.org/address/' },
        { name: 'World Chain', address: 'TBD', explorer: 'https://worldchain-sepolia.explorer.alchemy.com/address/' }
      ]
    },
    {
      name: 'AutoYieldToken',
      description: 'LayerZero OFT (Omnichain Fungible Token) representing user shares. Enables seamless cross-chain token transfers.',
      features: [
        'Omnichain fungible token',
        'LayerZero integration',
        'Cross-chain transfers',
        'Yield-bearing shares'
      ],
      chains: [
        { name: 'Hardhat Local', address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512', explorer: null },
        { name: 'Base Sepolia', address: 'TBD', explorer: 'https://sepolia.basescan.org/address/' },
        { name: 'World Chain', address: 'TBD', explorer: 'https://worldchain-sepolia.explorer.alchemy.com/address/' }
      ]
    },
    {
      name: 'YieldOracle',
      description: 'Aggregates yield and price data from Pyth Network and Chainlink. Provides real-time APR calculations.',
      features: [
        'Pyth price feeds',
        'Chainlink fallback',
        'Multi-chain APR tracking',
        'Real-time updates'
      ],
      chains: [
        { name: 'Hardhat Local', address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0', explorer: null },
        { name: 'Base Sepolia', address: 'TBD', explorer: 'https://sepolia.basescan.org/address/' }
      ]
    },
    {
      name: 'VolatilityFeeHook',
      description: 'Uniswap v4 hook that dynamically adjusts swap fees based on market volatility from Pyth Network.',
      features: [
        'Dynamic fee adjustment',
        'Pyth volatility data',
        'Uniswap v4 integration',
        'Automated fee optimization'
      ],
      chains: [
        { name: 'Hardhat Local', address: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9', explorer: null },
        { name: 'Base Sepolia', address: 'TBD', explorer: 'https://sepolia.basescan.org/address/' }
      ]
    }
  ];

  return (
    <PageLayout>
      <Navigation />
      
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-green-700 drop-shadow-lg">
            📜 Smart Contracts
          </h1>
          <p className="text-lg text-green-800 font-body max-w-2xl mx-auto">
            All HedgePod smart contracts are open source, audited, and verified on block explorers
          </p>
        </div>

        {/* Contracts List */}
        <div className="space-y-6">
          {contracts.map((contract, idx) => (
            <Card key={idx} variant="default" className="space-y-4">
              {/* Contract Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-display font-bold text-green-700 mb-2">
                    {contract.name}
                  </h2>
                  <p className="text-sm text-green-800 font-body">
                    {contract.description}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2">
                <h3 className="text-sm font-display font-bold text-green-700">Key Features:</h3>
                <div className="flex flex-wrap gap-2">
                  {contract.features.map((feature, featureIdx) => (
                    <Badge key={featureIdx} text={feature} variant="green" />
                  ))}
                </div>
              </div>

              {/* Deployments */}
              <div className="space-y-3">
                <h3 className="text-sm font-display font-bold text-green-700">Deployments:</h3>
                {contract.chains.map((chain, chainIdx) => (
                  <div 
                    key={chainIdx} 
                    className="bg-cream-100 p-3 rounded-xl border-2 border-brown-300"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <p className="font-display font-bold text-green-700 text-sm">
                          {chain.name}
                        </p>
                        <p className="text-xs text-green-600 font-mono break-all">
                          {chain.address}
                        </p>
                      </div>
                      {chain.explorer && chain.address !== 'TBD' && (
                        <a
                          href={`${chain.explorer}${chain.address}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-pink-400 hover:bg-pink-300 text-white font-display font-bold py-1 px-3 rounded-full border-2 border-brown-500 shadow-ac-sm hover:shadow-ac transition-all text-xs whitespace-nowrap"
                        >
                          View on Explorer →
                        </a>
                      )}
                      {chain.address === 'TBD' && (
                        <span className="text-xs text-green-600 font-body italic">
                          Coming soon
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Info Card */}
        <Card variant="dialogue" className="text-center max-w-3xl mx-auto">
          <div className="space-y-3">
            <div className="text-4xl">🔒</div>
            <h3 className="text-xl font-display font-bold text-green-700">
              Security & Transparency
            </h3>
            <p className="text-sm text-green-800 font-body">
              All contracts are open source and deployed across multiple chains. 
              You can verify the source code on each block explorer and audit the contracts yourself.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <a
                href="https://github.com/mollybeach/hedgepod/tree/master/contracts"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-400 text-white font-display font-bold py-2 px-4 rounded-full border-3 border-brown-500 shadow-ac-sm hover:shadow-ac transition-all text-sm"
              >
                💻 View Source Code
              </a>
            </div>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
}

