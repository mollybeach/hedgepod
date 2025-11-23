# 🦔 HedgePod Environment Variables Template

Copy the content below to create your `.env` file in the root of the `hedgepod/` directory.

---

## 📋 Instructions

1. Create a file named `.env` in the root directory (`hedgepod/.env`)
2. Copy all the content below into that file
3. Replace placeholder values with your actual keys
4. **NEVER commit the `.env` file to git!** (It's already in `.gitignore`)

---

## 📄 `.env` File Content

```bash
# =====================================================
# 🦔 HedgePod Environment Variables
# =====================================================
# Copy this file to .env and fill in your actual values
# NEVER commit the .env file to git!
# =====================================================

# =====================================================
# DEPLOYER WALLET (REQUIRED FOR DEPLOYMENT)
# =====================================================
# Your deployer wallet private key
# Get from MetaMask: Account Details -> Export Private Key
# ⚠️ KEEP THIS SECRET! Never share or commit to git!
DEPLOYER_PRIVATE_KEY=your_private_key_here_without_0x_prefix

# Alternative name (for compatibility)
PRIVATE_KEY=your_private_key_here_without_0x_prefix

# =====================================================
# RPC ENDPOINTS - TESTNETS (Recommended for testing)
# =====================================================
# Get free API keys from: https://www.alchemy.com/
# Or use public RPCs (may be slower/rate-limited)

# Base Sepolia (Recommended first deployment)
BASE_SEPOLIA_RPC=https://base-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY

# Celo Alfajores (World Chain integration)
CELO_ALFAJORES_RPC=https://alfajores-forno.celo-testnet.org

# Polygon Amoy (Mumbai replacement)
POLYGON_AMOY_RPC=https://rpc-amoy.polygon.technology

# Zircuit Testnet
ZIRCUIT_RPC=https://zircuit1-testnet.p2pify.com

# =====================================================
# RPC ENDPOINTS - MAINNETS (Use after testnet success)
# =====================================================

# World Chain (480)
WORLD_CHAIN_RPC=https://worldchain-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY

# Base (8453)
BASE_RPC=https://base-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY

# Celo (42220)
CELO_RPC=https://celo-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY

# Polygon (137)
POLYGON_RPC=https://polygon-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY

# Arbitrum One (42161)
ARBITRUM_RPC=https://arb-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY

# Optimism (10)
OPTIMISM_RPC=https://opt-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY

# Avalanche C-Chain (43114)
AVALANCHE_RPC=https://api.avax.network/ext/bc/C/rpc

# =====================================================
# BLOCK EXPLORER API KEYS (For contract verification)
# =====================================================
# Get API keys from respective block explorer sites

# BaseScan: https://basescan.org/apis
BASESCAN_API_KEY=your_basescan_api_key_here

# PolygonScan: https://polygonscan.com/apis
POLYGONSCAN_API_KEY=your_polygonscan_api_key_here

# Arbiscan: https://arbiscan.io/apis
ARBISCAN_API_KEY=your_arbiscan_api_key_here

# Optimistic Etherscan: https://optimistic.etherscan.io/apis
OPTIMISTIC_ETHERSCAN_API_KEY=your_optimism_api_key_here

# Snowtrace (Avalanche): https://snowtrace.io/apis
SNOWTRACE_API_KEY=your_snowtrace_api_key_here

# CeloScan: https://celoscan.io/apis
CELOSCAN_API_KEY=your_celoscan_api_key_here

# World Chain Explorer
WORLDCHAIN_API_KEY=your_worldchain_api_key_here

# =====================================================
# FRONTEND - WALLET CONNECTION
# =====================================================
# WalletConnect Project ID (for RainbowKit)
# Get from: https://cloud.walletconnect.com/
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id_here

# =====================================================
# SPONSOR API KEYS (Optional but recommended)
# =====================================================

# Pyth Network
# Get from: https://pyth.network/
PYTH_HERMES_URL=https://hermes.pyth.network

# 1inch API (REQUIRED for $1K Prize - Utilize 1inch APIs)
# Get from: https://portal.1inch.dev/
# Used for: Swap quotes, routing, price feeds
NEXT_PUBLIC_ONEINCH_API_KEY=your_1inch_api_key_here

# Coinbase CDP
# Get from: https://portal.cdp.coinbase.com/
CDP_API_KEY=your_cdp_api_key_here
CDP_API_SECRET=your_cdp_api_secret_here

# World App / MiniKit
# Get from: https://developer.worldcoin.org/
WORLD_APP_ID=your_world_app_id_here
NEXT_PUBLIC_WORLD_APP_ID=your_world_app_id_here

# Privy (for gas sponsorship)
# Get from: https://dashboard.privy.io/
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id_here
PRIVY_APP_SECRET=your_privy_app_secret_here

# =====================================================
# GAS REPORTING & ANALYTICS (Optional)
# =====================================================

# Enable gas reporting in tests
REPORT_GAS=false

# CoinMarketCap API (for gas price in USD)
# Get from: https://coinmarketcap.com/api/
COINMARKETCAP_API_KEY=your_coinmarketcap_api_key_here

# =====================================================
# DEPLOYMENT CONFIGURATION (Optional)
# =====================================================

# Default gas price (in gwei)
GAS_PRICE=20

# Gas limit multiplier (1.2 = 20% buffer)
GAS_MULTIPLIER=1.2

# Deployment confirmation blocks
CONFIRMATIONS=2

# =====================================================
# SUPABASE (Database - REQUIRED for agent tracking)
# =====================================================
# Get from: https://supabase.com/ → Your Project → Settings → API
# Frontend variables (public)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Backend variables (private - service key)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key-here

# =====================================================
# ADDITIONAL SERVICES (Optional)
# =====================================================

# The Graph
GRAPH_API_KEY=your_graph_api_key_here

# Pinata (IPFS)
PINATA_API_KEY=your_pinata_api_key_here
PINATA_SECRET_KEY=your_pinata_secret_key_here

# Alchemy Notify (webhooks)
ALCHEMY_NOTIFY_TOKEN=your_alchemy_notify_token_here

# =====================================================
# DEVELOPMENT & TESTING (Optional)
# =====================================================

# Node environment
NODE_ENV=development

# Enable debug logging
DEBUG=false

# Skip contract size check
SKIP_SIZE_CHECK=false

# Enable optimizer
OPTIMIZER_ENABLED=true

# Optimizer runs
OPTIMIZER_RUNS=200
```

---

## 🚀 Quick Start (Minimum Required)

For basic deployment, you only need these 3 variables:

```bash
# 1. Your deployer wallet private key
DEPLOYER_PRIVATE_KEY=your_private_key_here

# 2. Base Sepolia RPC (get free from Alchemy)
BASE_SEPOLIA_RPC=https://base-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY

# 3. WalletConnect for frontend (get free from WalletConnect)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

---

## 📚 How to Get API Keys

### **1. Alchemy (RPC Provider)** - Free tier available
1. Go to https://www.alchemy.com/
2. Sign up for free account
3. Create a new app for each network
4. Copy the API key from your dashboard
5. Add to `.env`: `BASE_SEPOLIA_RPC=https://base-sepolia.g.alchemy.com/v2/YOUR_KEY`

### **2. WalletConnect (Frontend Wallet Connection)** - Free
1. Go to https://cloud.walletconnect.com/
2. Sign up and create a project
3. Copy your Project ID
4. Add to `.env`: `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id`

### **3. BaseScan (Contract Verification)** - Free
1. Go to https://basescan.org/
2. Sign up and go to API Keys section
3. Create a new API key
4. Add to `.env`: `BASESCAN_API_KEY=your_key`

### **4. MetaMask Private Key (Deployer Wallet)**
1. Open MetaMask
2. Click on your account
3. Go to "Account Details"
4. Click "Export Private Key"
5. Enter password and copy key
6. Add to `.env`: `DEPLOYER_PRIVATE_KEY=your_key`
   
⚠️ **IMPORTANT**: Use a separate wallet for deployment, not your main wallet!

---

## 🪙 Get Testnet Funds

Before deploying, you need testnet ETH:

| Network | Faucet URL | Amount |
|---------|-----------|---------|
| **Base Sepolia** | https://www.alchemy.com/faucets/base-sepolia | 0.05 ETH |
| **Celo Alfajores** | https://faucet.celo.org/alfajores | 0.5 CELO |
| **Polygon Amoy** | https://faucet.polygon.technology/ | 0.1 MATIC |
| **Multi-chain** | https://faucet.quicknode.com/ | Various |

---

## 🔐 Security Best Practices

- ✅ **Never commit `.env` file** to git (already in `.gitignore`)
- ✅ **Use a dedicated deployer wallet** (not your main wallet)
- ✅ **Fund only what you need** for deployment (~0.1 ETH for testnets)
- ✅ **Keep private keys encrypted** when not in use
- ✅ **Rotate API keys** periodically
- ✅ **Don't share** your `.env` file with anyone

---

## 📝 Frontend `.env.local`

Your frontend also needs a separate `.env.local` file in the `frontend/` directory:

```bash
# frontend/.env.local
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id_here
```

---

## ✅ Verify Your Setup

After creating your `.env` file, test it:

```bash
# Check if environment variables are loaded
cd hedgepod
npx hardhat console --network baseSepolia

# In the console:
> console.log(network.name)
'baseSepolia'
```

---

## 🆘 Troubleshooting

### **Error: "DEPLOYER_PRIVATE_KEY not set"**
- Check that `.env` file exists in root directory
- Verify the variable name is exactly `DEPLOYER_PRIVATE_KEY`
- No spaces around the `=` sign

### **Error: "Invalid RPC URL"**
- Check that your Alchemy API key is correct
- Make sure URL format is: `https://base-sepolia.g.alchemy.com/v2/YOUR_KEY`
- Try the URL in your browser to verify it works

### **Error: "Insufficient funds"**
- Get testnet ETH from faucets listed above
- Check your deployer wallet balance on block explorer

---

## 📞 Need Help?

- **Deployment Guide**: `docs/DEPLOYMENT_QUICKSTART.md`
- **Submission Guide**: `docs/SUBMISSION.md`
- **Alchemy Docs**: https://docs.alchemy.com/
- **Hardhat Docs**: https://hardhat.org/

---

**🦔 You're ready to deploy!**

