/**
 * Wagmi Configuration for HedgePod Multi-Chain Support
 * Supports: World Chain, Base, Celo, Zircuit, Polygon, Arbitrum, Optimism, Avalanche
 */

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  worldchain,
  base,
  celo,
  polygon,
  arbitrum,
  optimism,
  avalanche,
} from 'wagmi/chains';

// Custom chain: Zircuit (not in wagmi by default)
export const zircuit = {
  id: 48899,
  name: 'Zircuit Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['https://zircuit1-testnet.p2pify.com'] },
    public: { http: ['https://zircuit1-testnet.p2pify.com'] },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://explorer.testnet.zircuit.com' },
  },
  testnet: true,
} as const;

export const config = getDefaultConfig({
  appName: 'HedgePod Agent',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains: [
    worldchain,
    base,
    celo,
    zircuit as any,
    polygon,
    arbitrum,
    optimism,
    avalanche,
  ],
  ssr: true, // Enable for Next.js App Router
});

