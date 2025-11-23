/**
 * Wagmi Configuration for HedgePod Multi-Chain Support
 * Supports: Ethereum, World Chain (+ Sepolia), Base, Celo, Zircuit Testnet, Polygon, Arbitrum, Optimism, Avalanche
 */

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  mainnet,
  base,
  celo,
  polygon,
  arbitrum,
  optimism,
  avalanche,
} from 'wagmi/chains';
import type { Chain } from 'wagmi/chains';

// Custom chain: World Chain (with custom logo)
export const worldchain = {
  id: 480,
  name: 'World Chain',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { 
      http: [
        process.env.NEXT_PUBLIC_WORLD_CHAIN_RPC 
          ? `${process.env.NEXT_PUBLIC_WORLD_CHAIN_RPC}`
          : 'https://worldchain-mainnet.g.alchemy.com/public'
      ] 
    },
    public: { http: ['https://worldchain-mainnet.g.alchemy.com/public'] },
  },
  blockExplorers: {
    default: { name: 'World Chain Explorer', url: 'https://worldchain-mainnet.explorer.alchemy.com' },
  },
  iconUrl: '/worldchain_logo.png',
  iconBackground: '#ffffff',
} as any as Chain;

// Custom chain: World Chain Sepolia Testnet (with custom logo)
export const worldchainSepolia = {
  id: 4801,
  name: 'World Chain Sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { 
      http: [
        process.env.NEXT_PUBLIC_WORLD_CHAIN_SEPOLIA_RPC 
          ? `${process.env.NEXT_PUBLIC_WORLD_CHAIN_SEPOLIA_RPC}`
          : 'https://worldchain-sepolia.g.alchemy.com/public'
      ] 
    },
    public: { http: ['https://worldchain-sepolia.g.alchemy.com/public'] },
  },
  blockExplorers: {
    default: { name: 'World Chain Sepolia Explorer', url: 'https://worldchain-sepolia.explorer.alchemy.com' },
  },
  iconUrl: '/worldchain_logo.png',
  iconBackground: '#ffffff',
  testnet: true,
} as any as Chain;

// Custom chain: Zircuit Testnet (with custom logo from https://docs.zircuit.com)
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
  iconUrl: '/zircuit_logo.svg',
  iconBackground: '#ffffff',
  testnet: true,
} as any as Chain;

export const config = getDefaultConfig({
  appName: 'HedgePod Agent',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains: [
    mainnet, // Ethereum Mainnet
    worldchain, // Custom World Chain (mainnet) with logo
    worldchainSepolia, // Custom World Chain Sepolia (testnet) with logo
    base,
    celo,
    zircuit, // Custom Zircuit Testnet with logo
    polygon,
    arbitrum,
    optimism,
    avalanche,
  ],
  ssr: true, // Enable for Next.js App Router
});

