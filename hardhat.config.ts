import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY || "0x0000000000000000000000000000000000000000000000000000000000000000";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
    },
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    worldchain: {
      url: process.env.WORLD_CHAIN_RPC || "https://worldchain-mainnet.g.alchemy.com/v2/demo",
      accounts: [DEPLOYER_PRIVATE_KEY],
      chainId: 480,
    },
    worldchainSepolia: {
      url: process.env.WORLD_CHAIN_SEPOLIA_RPC || "https://worldchain-sepolia.g.alchemy.com/v2/demo",
      accounts: [DEPLOYER_PRIVATE_KEY],
      chainId: 4801,
    },
    base: {
      url: process.env.BASE_RPC || "https://base-mainnet.g.alchemy.com/v2/demo",
      accounts: [DEPLOYER_PRIVATE_KEY],
      chainId: 8453,
    },
    baseSepolia: {
      url: process.env.BASE_SEPOLIA_RPC || "https://base-sepolia.g.alchemy.com/v2/demo",
      accounts: [DEPLOYER_PRIVATE_KEY],
      chainId: 84532,
    },
    celo: {
      url: process.env.CELO_RPC || "https://celo-mainnet.g.alchemy.com/v2/demo",
      accounts: [DEPLOYER_PRIVATE_KEY],
      chainId: 42220,
    },
    celoAlfajores: {
      url: process.env.CELO_ALFAJORES_RPC || "https://alfajores-forno.celo-testnet.org",
      accounts: [DEPLOYER_PRIVATE_KEY],
      chainId: 44787,
    },
    zircuit: {
      url: process.env.ZIRCUIT_RPC || "https://zircuit1-testnet.p2pify.com",
      accounts: [DEPLOYER_PRIVATE_KEY],
      chainId: 48899,
    },
    polygon: {
      url: process.env.POLYGON_RPC || "https://polygon-mainnet.g.alchemy.com/v2/demo",
      accounts: [DEPLOYER_PRIVATE_KEY],
      chainId: 137,
    },
    polygonAmoy: {
      url: process.env.POLYGON_AMOY_RPC || "https://rpc-amoy.polygon.technology",
      accounts: [DEPLOYER_PRIVATE_KEY],
      chainId: 80002,
    },
    arbitrum: {
      url: process.env.ARBITRUM_RPC || "https://arb-mainnet.g.alchemy.com/v2/demo",
      accounts: [DEPLOYER_PRIVATE_KEY],
      chainId: 42161,
    },
    optimism: {
      url: process.env.OPTIMISM_RPC || "https://opt-mainnet.g.alchemy.com/v2/demo",
      accounts: [DEPLOYER_PRIVATE_KEY],
      chainId: 10,
    },
    avalanche: {
      url: process.env.AVALANCHE_RPC || "https://api.avax.network/ext/bc/C/rpc",
      accounts: [DEPLOYER_PRIVATE_KEY],
      chainId: 43114,
    },
  },
  etherscan: {
    apiKey: {
      worldchain: process.env.WORLDCHAIN_API_KEY || "",
      worldchainSepolia: process.env.WORLDCHAIN_API_KEY || "",
      base: process.env.BASESCAN_API_KEY || "",
      celo: process.env.CELOSCAN_API_KEY || "",
      polygon: process.env.POLYGONSCAN_API_KEY || "",
      arbitrum: process.env.ARBISCAN_API_KEY || "",
      optimism: process.env.OPTIMISTIC_ETHERSCAN_API_KEY || "",
      avalanche: process.env.SNOWTRACE_API_KEY || "",
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS === "true",
    currency: "USD",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
};

export default config;

