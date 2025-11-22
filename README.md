# 🦔🫛 HedgePod Agent

> **Build your own AI-powered hedge fund**

> **Autonomous cross-chain DeFi that makes 23M World App users their own hedge fund.**

**TL;DR**: Deposit once. AI agents automatically rebalance across 8+ chains for optimal yield. Gasless. Chain-abstracted. Human-readable. Built for non-crypto users.

[![Live Demo](https://img.shields.io/badge/demo-live-green)](https://hedgepod.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Discord](https://img.shields.io/badge/Discord-Join-7289da)](https://discord.com/invite/5C7yYrsR)
[![Twitter](https://img.shields.io/badge/Twitter-Follow-1DA1F2)](https://x.com/hedgepod)
[![Telegram](https://img.shields.io/badge/Telegram-Join-26A5E4)](https://t.me/hedgepod)

## 🌐 Links

- 🚀 **Live Demo**: [hedgepod.app](https://hedgepod.app)
- 💬 **Discord**: [Join our community](https://discord.com/invite/5C7yYrsR)
- 📱 **Telegram**: [t.me/hedgepod](https://t.me/hedgepod)
- 🐦 **Twitter/X**: [@hedgepod](https://x.com/hedgepod)
- 📸 **Instagram**: [@hedgepod_app](https://www.instagram.com/hedgepod_app/)
- 💻 **GitHub**: [mollybeach/hedgepod](https://github.com/mollybeach/hedgepod)

## 📚 Table of Contents

- [What Is HedgePod?](#-what-is-hedgepod-agent)
- [Architecture](#️-architecture)
- [Quick Start](#-quick-start)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup) ⚡ **Start here!**
  - [Deploy Contracts](#deploy-contracts)
  - [Run Frontend](#run-frontend)
- [Tech Stack](#-tech-stack)
- [Documentation](#-documentation)
- [Contact](#-contact)

---

## 🎯 What Is HedgePod Agent?

HedgePod Agent is a World mini app that solves crypto's biggest UX problem: **chain fragmentation**.

Users deposit USDC/ETH/USDT once, and autonomous AI agents:

- Monitor yields across 8+ chains in real-time
- Move funds via LayerZero for optimal positioning
- Execute swaps through 1inch when profitable
- Use dynamic Uniswap v4 hooks that adjust to volatility
- All gasless, all transparent, all automated

**For the 23M World App users who don't know what an RPC is—and never should.**

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ WORLD MINI APP (Next.js + MiniKit SDK)                      │
│  • Privy gas sponsorship (gasless UX)                       │
│  • ENS resolution (jane.eth not 0x...)                      │
│  • Octav widget (portfolio dashboard)                       │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ├──> Deposit USDC/ETH/USDT (any chain)
                      │
┌─────────────────────▼───────────────────────────────────────┐
│ HedgePod VAULT (Smart Contracts)                            │
│  • Deployed on: World Chain, Base, Celo, Zircuit, Polygon  │
│  • Issues AutoYield Tokens (LayerZero OFT)                  │
│  • Grants x402 authorization to agent wallet                │
│  • Integrated with Uniswap v4 pools (custom hook)           │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ├──> Agent monitors & rebalances 24/7
                      │
┌─────────────────────▼───────────────────────────────────────┐
│ YIELD AGENT (CDP Server Wallet)                             │
│  • Autonomous wallet with x402 authorization                │
│  • Monitors: Pyth APRs, 1inch liquidity                     │
│  • Rebalances via: LayerZero OFT, 1inch Fusion+, Uniswap v4 │
│  • Redundancy: Chainlink CCIP for critical ops              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔗 Key Integrations

### Cross-Chain Infrastructure
- **LayerZero** - Omnichain token transfers and messaging

### DeFi & Oracles
- **Uniswap v4** - Dynamic fee hooks based on volatility

### UX & Identity
- **World (MiniKit)** - 23M user distribution

### Development
- **Coinbase CDP** - Server wallets for agent autonomy
- **Hardhat 3** - Testing framework

---

## 🚀 Quick Start

### Prerequisites

```bash
node >= 18.0.0
npm >= 9.0.0
```

### Installation

```bash
# Clone the repository
git clone https://github.com/mollybeach/hedgepod.git
cd hedgepod

# Install dependencies
npm install
```

### Environment Setup

**REQUIRED** - Create your `.env` file:

```bash
# Copy the example file
cp .env.example .env
```

Then edit `.env` with your actual values. **Minimum required** for deployment:

```bash
# 1. Your deployer wallet private key (from MetaMask)
DEPLOYER_PRIVATE_KEY=your_private_key_here

# 2. Alchemy RPC for Base Sepolia (get free at https://www.alchemy.com/)
BASE_SEPOLIA_RPC=https://base-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY

# 3. WalletConnect for frontend (get free at https://cloud.walletconnect.com/)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id_here
```

**Optional but recommended** for full functionality:

```bash
# Block explorer verification
BASESCAN_API_KEY=your_basescan_api_key_here

# Additional networks
POLYGON_AMOY_RPC=https://rpc-amoy.polygon.technology
CELO_ALFAJORES_RPC=https://alfajores-forno.celo-testnet.org
```

#### 🔑 Getting API Keys

| Service | URL | Purpose | Cost |
|---------|-----|---------|------|
| **Alchemy** | https://www.alchemy.com/ | RPC endpoints for all chains | Free tier |
| **WalletConnect** | https://cloud.walletconnect.com/ | Frontend wallet connection | Free |
| **BaseScan** | https://basescan.org/apis | Contract verification | Free |
| **MetaMask** | Your wallet → Account Details → Export Private Key | Deployer wallet | Free |

#### 🪙 Getting Testnet Funds

You'll need testnet ETH before deploying:

| Network | Faucet | Amount Needed |
|---------|--------|---------------|
| **Base Sepolia** | https://www.alchemy.com/faucets/base-sepolia | ~0.05 ETH |
| **Polygon Amoy** | https://faucet.polygon.technology/ | ~0.1 MATIC |
| **Celo Alfajores** | https://faucet.celo.org/alfajores | ~0.5 CELO |
| **Multi-chain** | https://faucet.quicknode.com/ | Various |

#### ⚠️ Security Notes

- **Never commit** your `.env` file (already in `.gitignore`)
- **Use a separate deployer wallet**, not your main wallet
- **Only fund** what you need for deployment
- See **`docs/ENV_TEMPLATE.md`** for complete documentation

### Run Tests

```bash
# Compile contracts
npx hardhat compile

# Run test suite
npx hardhat test

# Check coverage
npx hardhat coverage
```

### Deploy Contracts

**Before deploying**, make sure:
1. ✅ You've created your `.env` file (see Environment Setup above)
2. ✅ You have testnet funds in your deployer wallet
3. ✅ You've compiled contracts: `npx hardhat compile`

```bash
# Deploy to Base Sepolia (recommended first deployment)
npx hardhat run scripts/deploy/deployer.ts --network baseSepolia

# Or use Makefile shortcuts
make deploy-base-sepolia

# Deploy to all testnets
make deploy-all
```

**After deployment**, verify your contracts:

```bash
# Verify on BaseScan
make verify-base-sepolia
```

📚 **Detailed deployment guide**: `docs/DEPLOYMENT_QUICKSTART.md`

### Run Frontend

**Before starting the frontend**, create `frontend/.env.local`:

```bash
# frontend/.env.local
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id_here
```

Then start the development server:

```bash
# Install frontend dependencies (first time only)
cd frontend
npm install

# Start development server
npm run dev
# Open http://localhost:3000
```

Your frontend will automatically connect to deployed contracts using data from:
- `frontend/lib/data/contracts_data.json` (auto-generated on deployment)

🎨 **Frontend features**:
- 🦔 Animal Crossing-themed UI
- 💰 RainbowKit wallet connection (100+ wallets)
- 🌐 Multi-chain support (World, Base, Celo, Polygon, etc.)
- ⚡ Responsive design for mobile and desktop

### Run Agent

```bash
# Start yield monitoring agent
cd backend
npm run agent:start
```


## 📍 Deployment Addresses

### **Local Development (Hardhat)**

| Contract | Address |
|----------|---------|
| **YieldOracle** | `0x5FbDB2315678afecb367f032d93F642f64180aa3` |
| **AutoYieldToken** | `0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512` |
| **HedgePodVault** | `0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9` |
| **VolatilityFeeHook** | `0x0165878A594ca255338adfa4d48449f69242Eb8F` |

### **Testnet Deployments**

**Status**: 🚧 Ready for deployment to Base Sepolia, Polygon Amoy, Celo Alfajores

To deploy to testnets:
```bash
# Deploy to Base Sepolia (recommended first)
make deploy-base-sepolia

# Deploy to all testnets
make deploy-all
```

See **[deployments/](./deployments/)** for full deployment history, ABIs, and verification commands.

📚 **Deployment guide**: [docs/DEPLOYMENT_QUICKSTART.md](./docs/DEPLOYMENT_QUICKSTART.md)

---

## 🧪 Tech Stack

**Smart Contracts**: Solidity 0.8.24, Hardhat 3, OpenZeppelin, LayerZero OFT, Uniswap v4

**Frontend**: Next.js 14, TypeScript, TailwindCSS, World MiniKit, Privy SDK, wagmi, RainbowKit

**Backend**: Node.js, TypeScript, Coinbase CDP SDK, Pyth Hermes API, 1inch API

**Infrastructure**: Alchemy, Vercel, Railway

**Integrations**: Hardhat 3, ENS, Pyth, 1inch, Uniswap v4, Privy, EIL, Chainlink, Zircuit, Octav

---

## 📚 Documentation

Comprehensive guides and documentation:

| Document | Description |
|----------|-------------|
| **[Environment Setup](docs/ENV_TEMPLATE.md)** | Complete guide for all environment variables |
| **[Deployment Quickstart](docs/DEPLOYMENT_QUICKSTART.md)** | Step-by-step deployment instructions |
| **[Full Deployment Guide](docs/DEPLOYMENT.md)** | Advanced deployment documentation |
| **[Submission Guide](docs/SUBMISSION.md)** | ETHGlobal submission checklist |
| **[Scripts Documentation](scripts/README.md)** | All deployment and utility scripts |
| **[Config Documentation](config/README.md)** | Network and price feed configurations |

### Key Directories

```
hedgepod/
├── contracts/          # Solidity smart contracts
│   ├── HedgePodVault.sol
│   ├── AutoYieldToken.sol
│   ├── YieldOracle.sol
│   └── VolatilityFeeHook.sol
├── frontend/           # Next.js frontend application
│   ├── app/           # Pages and routes
│   ├── components/    # Reusable UI components
│   └── lib/           # Utilities and contract data
├── backend/           # Agent backend (Node.js)
├── scripts/           # Deployment and utility scripts
│   ├── deploy/        # Deployment scripts
│   └── verify/        # Contract verification
├── config/            # Network and price configurations
├── deployments/       # Deployed contract addresses & ABIs
└── docs/             # Documentation
```

---

## 📞 Contact & Community

- 🚀 **Live Demo**: [hedgepod.app](https://hedgepod.app)
- 💻 **GitHub**: [mollybeach/hedgepod](https://github.com/mollybeach/hedgepod)
- 💬 **Discord**: [Join our community](https://discord.com/invite/5C7yYrsR)
- 📱 **Telegram**: [t.me/hedgepod](https://t.me/hedgepod)
- 🐦 **Twitter/X**: [@hedgepod](https://x.com/hedgepod)
- 📸 **Instagram**: [@hedgepod_app](https://www.instagram.com/hedgepod_app/)

---

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details

---

## 🙏 Acknowledgments

Built for **ETHGlobal Buenos Aires 2025** with:
- LayerZero for omnichain infrastructure
- World for 23M user distribution
- Coinbase CDP for autonomous agents
- And many other amazing sponsors!

**🦔 Making DeFi accessible for everyone!**
