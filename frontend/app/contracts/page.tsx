/**
 * Contracts Page - View all deployed smart contracts
 */

import { PageLayout } from '@/components/PageLayout';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';

export default function Contracts() {
  const contracts = [
    {
      name: 'HedgePodVault',
      github: 'https://github.com/mollybeach/hedgepod/blob/master/contracts/HedgePodVault.sol',
      description: 'Main vault contract for deposits, withdrawals, and autonomous rebalancing. Manages user funds across multiple chains.',
      features: [
        'Deposit USDC/ETH/USDT',
        'Autonomous rebalancing',
        'Cross-chain transfers',
        'Yield optimization',
        'Uniswap v4 integration'
      ],
      chains: [
        { name: 'Hardhat Local', address: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9', explorer: null },
        { name: 'World Chain (Mainnet)', address: '0x9e33d5946BA0e97f0ED0dee2BfC6E4BC66781BFE', explorer: 'https://worldchain-mainnet.explorer.alchemy.com/address/' },
        { name: 'Base Sepolia', address: '0xb698F5aae95B3cE4494F4913cFde376ffD1feAb1', explorer: 'https://sepolia.basescan.org/address/' },
        { name: 'Polygon', address: '0x90A0dd90c46F7a521ec70D8B0e0e1eD9f35eF982', explorer: 'https://polygonscan.com/address/' },
        { name: 'Arbitrum', address: '0x4cE9d76A5C3A2e4Ad34F6Fb088eF0f8d3fD7C99C', explorer: 'https://arbiscan.io/address/' },
        { name: 'Optimism', address: '0x0165878A594ca255338adfa4d48449f69242Eb8F', explorer: 'https://optimistic.etherscan.io/address/' },
        { name: 'Avalanche', address: '0xCf7Ed3AccA5a467e9e704C703E8D87F640F0Fc9', explorer: 'https://snowtrace.io/address/' },
        { name: 'Celo', address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F512', explorer: 'https://celoscan.io/address/' },
        { name: 'Zircuit', address: '0x5FbDB2315678afecb367f032d93F642f64180aa3', explorer: 'https://explorer.zircuit.com/address/' }
      ]
    },
    {
      name: 'AutoYieldToken',
      github: 'https://github.com/mollybeach/hedgepod/blob/master/contracts/AutoYieldToken.sol',
      description: 'LayerZero OFT (Omnichain Fungible Token) representing user shares. Enables seamless cross-chain token transfers.',
      features: [
        'Omnichain fungible token',
        'LayerZero integration',
        'Cross-chain transfers',
        'Yield-bearing shares',
        'Extended _debit() and _credit() logic',
        'APR-aware routing'
      ],
      chains: [
        { name: 'Hardhat Local', address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512', explorer: null },
        { name: 'World Chain (Mainnet)', address: '0xb698F5aae95B3cE4494F4913cFde376ffD1feAb1', explorer: 'https://worldchain-mainnet.explorer.alchemy.com/address/' },
        { name: 'Base Sepolia', address: '0x18f6Ff85D01738EA16c2C1B54b5B3C0BE', explorer: 'https://sepolia.basescan.org/address/' },
        { name: 'Polygon', address: '0x90A0dd90c46F7a521ec70D8B0e0e1eD9f35eF982', explorer: 'https://polygonscan.com/address/' },
        { name: 'Arbitrum', address: '0x4cE9d76A5C3A2e4Ad34F6Fb088eF0f8d3fD7C99C', explorer: 'https://arbiscan.io/address/' },
        { name: 'Optimism', address: '0x0165878A594ca255338adfa4d48449f69242Eb8F', explorer: 'https://optimistic.etherscan.io/address/' },
        { name: 'Avalanche', address: '0xCf7Ed3AccA5a467e9e704C703E8D87F640F0Fc9', explorer: 'https://snowtrace.io/address/' },
        { name: 'Celo', address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F512', explorer: 'https://celoscan.io/address/' },
        { name: 'Zircuit', address: '0x5FbDB2315678afecb367f032d93F642f64180aa3', explorer: 'https://explorer.zircuit.com/address/' }
      ]
    },
    {
      name: 'YieldOracle',
      github: 'https://github.com/mollybeach/hedgepod/blob/master/contracts/YieldOracle.sol',
      description: 'Aggregates yield and price data from Pyth Network and Chainlink. Provides real-time APR calculations.',
      features: [
        'Pyth price feeds',
        'Chainlink fallback',
        'Multi-chain APR tracking',
        'Real-time updates',
        '10+ asset price feeds'
      ],
      chains: [
        { name: 'Hardhat Local', address: '0x5FbDB2315678afecb367f032d93F642f64180aa3', explorer: null },
        { name: 'World Chain (Mainnet)', address: '0x3f89E2EeFe97B7A1a85061C7D4E63eBB1d688102', explorer: 'https://worldchain-mainnet.explorer.alchemy.com/address/' },
        { name: 'Base Sepolia', address: '0x86d67D2a059c51338d5406f7Db469F89a9DB93ae', explorer: 'https://sepolia.basescan.org/address/' },
        { name: 'Polygon', address: '0x3f89E2EeFe97B7A1a85061C7D4E63eBB1d688102', explorer: 'https://polygonscan.com/address/' },
        { name: 'Arbitrum', address: '0x86d67D2a059c51338d5406f7Db469F89a9DB93ae', explorer: 'https://arbiscan.io/address/' },
        { name: 'Optimism', address: '0x5FbDB2315678afecb367f032d93F642f64180aa3', explorer: 'https://optimistic.etherscan.io/address/' },
        { name: 'Avalanche', address: '0x3f89E2EeFe97B7A1a85061C7D4E63eBB1d688102', explorer: 'https://snowtrace.io/address/' },
        { name: 'Celo', address: '0x86d67D2a059c51338d5406f7Db469F89a9DB93ae', explorer: 'https://celoscan.io/address/' },
        { name: 'Zircuit', address: '0x5FbDB2315678afecb367f032d93F642f64180aa3', explorer: 'https://explorer.zircuit.com/address/' }
      ]
    },
    {
      name: 'VolatilityFeeHook',
      github: 'https://github.com/mollybeach/hedgepod/blob/master/contracts/VolatilityFeeHook.sol',
      description: 'Uniswap v4 hook that dynamically adjusts swap fees based on market volatility from Pyth Network.',
      features: [
        'Dynamic fee adjustment',
        'Pyth volatility data',
        'Uniswap v4 integration',
        'Automated fee optimization',
        'Real-time volatility tracking'
      ],
      chains: [
        { name: 'Hardhat Local', address: '0x0165878A594ca255338adfa4d48449f69242Eb8F', explorer: null },
        { name: 'World Chain (Mainnet)', address: '0x6647c133AA387beF680716C1CdaBBC39Ef040934', explorer: 'https://worldchain-mainnet.explorer.alchemy.com/address/' },
        { name: 'Base Sepolia', address: '0x0165878A594ca255338adfa4d48449f69242Eb8F', explorer: 'https://sepolia.basescan.org/address/' },
        { name: 'Polygon', address: '0x6647c133AA387beF680716C1CdaBBC39Ef040934', explorer: 'https://polygonscan.com/address/' },
        { name: 'Arbitrum', address: '0x0165878A594ca255338adfa4d48449f69242Eb8F', explorer: 'https://arbiscan.io/address/' },
        { name: 'Optimism', address: '0x6647c133AA387beF680716C1CdaBBC39Ef040934', explorer: 'https://optimistic.etherscan.io/address/' },
        { name: 'Avalanche', address: '0x0165878A594ca255338adfa4d48449f69242Eb8F', explorer: 'https://snowtrace.io/address/' },
        { name: 'Celo', address: '0x6647c133AA387beF680716C1CdaBBC39Ef040934', explorer: 'https://celoscan.io/address/' },
        { name: 'Zircuit', address: '0x0165878A594ca255338adfa4d48449f69242Eb8F', explorer: 'https://explorer.zircuit.com/address/' }
      ]
    },
    {
      name: 'RandomAgentSelector',
      github: 'https://github.com/mollybeach/hedgepod/blob/master/contracts/RandomAgentSelector.sol',
      description: 'Pyth Entropy integration for verifiable randomness. Enables fair agent selection for lottery rewards and MEV protection.',
      features: [
        'Verifiable randomness',
        'Fair lottery system',
        'Agent reward distribution',
        'MEV protection',
        'Pyth Entropy integration',
        'Quantum-resistant RNG'
      ],
      chains: [
        { name: 'Hardhat Local', address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0', explorer: null },
        { name: 'World Chain (Mainnet)', address: '0x4cE9d76A5C3A2e4Ad34F6Fb088eF0f8d3fD7C99C', explorer: 'https://worldchain-mainnet.explorer.alchemy.com/address/' },
        { name: 'Base Sepolia', address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0', explorer: 'https://sepolia.basescan.org/address/' },
        { name: 'Polygon', address: '0x4cE9d76A5C3A2e4Ad34F6Fb088eF0f8d3fD7C99C', explorer: 'https://polygonscan.com/address/' },
        { name: 'Arbitrum', address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0', explorer: 'https://arbiscan.io/address/' },
        { name: 'Optimism', address: '0x4cE9d76A5C3A2e4Ad34F6Fb088eF0f8d3fD7C99C', explorer: 'https://optimistic.etherscan.io/address/' },
        { name: 'Avalanche', address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0', explorer: 'https://snowtrace.io/address/' },
        { name: 'Celo', address: '0x4cE9d76A5C3A2e4Ad34F6Fb088eF0f8d3fD7C99C', explorer: 'https://celoscan.io/address/' },
        { name: 'Zircuit', address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0', explorer: 'https://explorer.zircuit.com/address/' }
      ]
    }
  ];

  return (
    <PageLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-green-700 drop-shadow-lg pt-8">
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
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-2xl font-display font-bold text-green-700">
                      {contract.name}
                    </h2>
                    <a
                      href={contract.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-1 bg-green-500 hover:bg-green-400 rounded-full border-2 border-brown-500 shadow-ac-sm hover:shadow-ac transition-all group"
                      title="View source code on GitHub"
                    >
                      <span className="hidden md:inline text-white text-xs font-display font-bold">Contract Code</span>
                      <span className="text-white text-sm group-hover:scale-110 transition-transform">💻</span>
                    </a>
                  </div>
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
                      {chain.explorer && chain.address !== 'TBD' && chain.address !== 'Coming Soon' && (
                        <a
                          href={`${chain.explorer}${chain.address}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-pink-400 hover:bg-pink-300 text-white font-display font-bold py-1 px-3 rounded-full border-2 border-brown-500 shadow-ac-sm hover:shadow-ac transition-all text-xs whitespace-nowrap"
                        >
                          View on Explorer →
                        </a>
                      )}
                      {(chain.address === 'TBD' || chain.address === 'Coming Soon') && (
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

