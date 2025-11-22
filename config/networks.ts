/**
 * HedgePod Network Configuration
 * 
 * Centralized network configuration for all deployment scripts
 */

export interface NetworkConfig {
  name: string;
  explorerUrl: string;
  pythOracle: string;
  chainlinkOracle: string;
  lzEndpoint: string;
  depositToken: string;
}

export const NETWORK_CONFIG: Record<string, NetworkConfig> = {
  // ==================== LOCAL DEVELOPMENT ====================
  hardhat: {
    name: "Hardhat Local",
    explorerUrl: "",
    pythOracle: "0x0000000000000000000000000000000000000000", // Mock address
    chainlinkOracle: "0x0000000000000000000000000000000000000000", // Mock address
    lzEndpoint: "0x0000000000000000000000000000000000000000", // Mock address
    depositToken: "0x0000000000000000000000000000000000000000", // Will deploy mock USDC
  },

  localhost: {
    name: "Localhost",
    explorerUrl: "",
    pythOracle: "0x0000000000000000000000000000000000000000", // Mock address
    chainlinkOracle: "0x0000000000000000000000000000000000000000", // Mock address
    lzEndpoint: "0x0000000000000000000000000000000000000000", // Mock address
    depositToken: "0x0000000000000000000000000000000000000000", // Will deploy mock USDC
  },

  // ==================== TESTNETS ====================
  baseSepolia: {
    name: "Base Sepolia",
    explorerUrl: "https://sepolia.basescan.org",
    pythOracle: "0xA2aa501b19aff244D90cc15a4Cf739D2725B5729",
    chainlinkOracle: "0x0000000000000000000000000000000000000000",
    lzEndpoint: "0x6EDCE65403992e310A62460808c4b910D972f10f", // LayerZero V2 Endpoint
    depositToken: "0x036CbD53842c5426634e7929541eC2318f3dCF7e", // USDC on Base Sepolia
  },

  // ==================== MAINNETS ====================
  worldchain: {
    name: "World Chain",
    explorerUrl: "https://worldchain-mainnet.explorer.alchemy.com",
    pythOracle: "0x0000000000000000000000000000000000000000", // TODO: Get actual address
    chainlinkOracle: "0x0000000000000000000000000000000000000000",
    lzEndpoint: "0x1a44076050125825900e736c501f859c50fE728c", // LayerZero V2 Endpoint
    depositToken: "0x0000000000000000000000000000000000000000", // TODO: Get USDC address
  },

  base: {
    name: "Base",
    explorerUrl: "https://basescan.org",
    pythOracle: "0x8250f4aF4B972684F7b336503E2D6dFeDeB1487a",
    chainlinkOracle: "0x0000000000000000000000000000000000000000",
    lzEndpoint: "0x1a44076050125825900e736c501f859c50fE728c", // LayerZero V2 Endpoint
    depositToken: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC on Base
  },

  celo: {
    name: "Celo",
    explorerUrl: "https://celoscan.io",
    pythOracle: "0xff1a0f4744e8582DF1aE09D5611b887B6a12925C",
    chainlinkOracle: "0x0000000000000000000000000000000000000000",
    lzEndpoint: "0x1a44076050125825900e736c501f859c50fE728c", // LayerZero V2 Endpoint
    depositToken: "0xcebA9300f2b948710d2653dD7B07f33A8B32118C", // USDC on Celo
  },

  polygon: {
    name: "Polygon",
    explorerUrl: "https://polygonscan.com",
    pythOracle: "0xff1a0f4744e8582DF1aE09D5611b887B6a12925C",
    chainlinkOracle: "0x0000000000000000000000000000000000000000",
    lzEndpoint: "0x1a44076050125825900e736c501f859c50fE728c", // LayerZero V2 Endpoint
    depositToken: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359", // USDC on Polygon (Native USDC)
  },

  zircuit: {
    name: "Zircuit",
    explorerUrl: "https://explorer.zircuit.com",
    pythOracle: "0x0000000000000000000000000000000000000000", // TODO: Check if Pyth is deployed
    chainlinkOracle: "0x0000000000000000000000000000000000000000",
    lzEndpoint: "0x0000000000000000000000000000000000000000", // TODO: Get LayerZero endpoint
    depositToken: "0x0000000000000000000000000000000000000000", // TODO: Get USDC address
  },

  arbitrum: {
    name: "Arbitrum",
    explorerUrl: "https://arbiscan.io",
    pythOracle: "0xff1a0f4744e8582DF1aE09D5611b887B6a12925C",
    chainlinkOracle: "0x0000000000000000000000000000000000000000",
    lzEndpoint: "0x1a44076050125825900e736c501f859c50fE728c", // LayerZero V2 Endpoint
    depositToken: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831", // USDC on Arbitrum (Native USDC)
  },

  optimism: {
    name: "Optimism",
    explorerUrl: "https://optimistic.etherscan.io",
    pythOracle: "0xff1a0f4744e8582DF1aE09D5611b887B6a12925C",
    chainlinkOracle: "0x0000000000000000000000000000000000000000",
    lzEndpoint: "0x1a44076050125825900e736c501f859c50fE728c", // LayerZero V2 Endpoint
    depositToken: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85", // USDC on Optimism (Native USDC)
  },

  avalanche: {
    name: "Avalanche",
    explorerUrl: "https://snowtrace.io",
    pythOracle: "0x4305FB66699C3B2702D4d05CF36551390A4c69C6", // Pyth on Avalanche
    chainlinkOracle: "0x0000000000000000000000000000000000000000",
    lzEndpoint: "0x1a44076050125825900e736c501f859c50fE728c", // LayerZero V2 Endpoint
    depositToken: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E", // USDC on Avalanche
  },
};

/**
 * Get network configuration
 * @param networkName - The network name from hardhat config
 * @returns Network configuration or throws error if not found
 */
export function getNetworkConfig(networkName: string): NetworkConfig {
  const config = NETWORK_CONFIG[networkName];
  if (!config) {
    const availableNetworks = Object.keys(NETWORK_CONFIG).join(", ");
    throw new Error(
      `❌ Network "${networkName}" not configured.\n` +
      `Available networks: ${availableNetworks}`
    );
  }
  return config;
}

/**
 * Get all configured network names
 */
export function getConfiguredNetworks(): string[] {
  return Object.keys(NETWORK_CONFIG);
}

/**
 * Check if a network is configured
 */
export function isNetworkConfigured(networkName: string): boolean {
  return networkName in NETWORK_CONFIG;
}

