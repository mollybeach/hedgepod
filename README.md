# HedgePod Agent

> **Autonomous cross-chain DeFi that makes 23M World App users their own hedge fund.**

**TL;DR**: Deposit once. AI agents automatically rebalance across 8+ chains for optimal yield. Gasless. Chain-abstracted. Human-readable. Built for non-crypto users.

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
cd hedgepod-agent

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys
```

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

```bash
# Deploy to all chains
npm run deploy:all

# Deploy to specific chain
npx hardhat run scripts/deploy.ts --network worldchain
```

### Run Frontend

```bash
# Development server
cd app
npm run dev
# Open http://localhost:3000
```

### Run Agent

```bash
# Start yield monitoring agent
cd backend
npm run agent:start
```


## 🧪 Tech Stack

**Smart Contracts**: Solidity 0.8.24, Hardhat 3, OpenZeppelin, LayerZero OFT, Uniswap v4

**Frontend**: Next.js 14, TypeScript, TailwindCSS, World MiniKit, Privy SDK, wagmi

**Backend**: Node.js, TypeScript, Coinbase CDP SDK, Pyth Hermes API, 1inch API

**Infrastructure**: Alchemy, Vercel, Railway

---


## 📞 Contact

- **GitHub**: [github.com/yourusername/hedgepod-agent](https://github.com/mollybeach/hedgepod)

---

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details
