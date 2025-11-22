# HedgePod Deployment Scripts

Comprehensive deployment and management scripts for the HedgePod system.

## 📁 Directory Structure

```
scripts/
├── deploy/                # Deployment scripts
│   ├── deployer.ts       # ⭐ Main comprehensive deployment script
│   └── deploy-all.js     # Multi-network deployment orchestrator
│
├── verify/                # Verification scripts
│   └── verify.ts         # Contract verification script
│
│
├── abi/                   # ABI management
│   ├── saveAbi.mjs       # Save contract ABIs
│   └── cleanAbi.mjs      # Clean old ABIs
│
├── check/                 # Balance and status checks
│   └── checkBalance.mjs  # Check deployer balances
│
├── environment/           # Environment variable management
│   └── envUpdater.mjs    # Update .env with contract addresses
│
├── faucet/                # Test token management
│   └── mintUSDC.mjs      # Mint test USDC for testing
│
├── logs/                  # Logging utilities
│   ├── console_logger.mjs        # Colored console output
│   └── data/
│       └── data_logger.mjs       # Save deployment data
│
└── roles/                 # Access control
    └── assignRoles.mjs   # Assign roles to contracts
```

## 🚀 Quick Start

### Using the Makefile (Recommended)

```bash
# Install all dependencies
make install

# Compile contracts
make compile

# Run tests
make test

# Deploy to Base Sepolia
make deploy-base

# Deploy to all networks
make deploy-all

# Start frontend
make frontend-dev

# Start backend agent
make backend-dev
```

### Direct Script Execution

```bash
# Deploy to specific network
npx hardhat run scripts/deploy/deployer.ts --network baseSepolia

# Deploy to World Chain
npx hardhat run scripts/deploy/deployer.ts --network worldchain

# Verify contracts
npx hardhat run scripts/verify/verify.ts --network baseSepolia
```

## 📝 Main Deployment Script

The `scripts/deploy/deployer.ts` script provides comprehensive deployment with:

### Features
- ✅ Colored console output with detailed logging
- ✅ Automatic ABI saving to `deployments/abis/`
- ✅ Deployment data saved to `deployments/{network}.json`
- ✅ Timestamped deployment history
- ✅ Frontend contracts data export
- ✅ Backend contracts data export
- ✅ Explorer links for all contracts
- ✅ Verification commands generated
- ✅ Error handling and rollback support

### Deployed Contracts
1. **YieldOracle** - Multi-source oracle (Pyth + Chainlink)
2. **AutoYieldToken** - LayerZero OFT with yield routing
3. **HedgePodVault** - Main vault contract
4. **VolatilityFeeHook** - Uniswap v4 dynamic fee hook

### Configuration

Network configurations are now centralized in `config/networks.ts`:

```typescript
// Edit config/networks.ts to add or update networks
export const NETWORK_CONFIG: Record<string, NetworkConfig> = {
  baseSepolia: {
    name: "Base Sepolia",
    explorerUrl: "https://sepolia.basescan.org",
    pythOracle: "0xA2aa501b19aff244D90cc15a4Cf739D2725B5729",
    depositToken: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
    lzEndpoint: "0x6EDCE65403992e310A62460808c4b910D972f10f",
    chainlinkOracle: "0x0000000000000000000000000000000000000000",
  },
  // Add more networks...
};
```

See `config/README.md` for full documentation.

## 🔧 Utility Scripts

### ABI Management

```bash
# Clean old ABIs
make clean-abis

# ABIs are automatically saved during deployment to:
# - deployments/abis/YieldOracle.json
# - deployments/abis/AutoYieldToken.json
# - deployments/abis/HedgePodVault.json
# - deployments/abis/VolatilityFeeHook.json
```

### Balance Checking

```bash
# Check deployer balance
make check-balance
# Or directly:
npx hardhat run scripts/check/checkBalance.mjs --network baseSepolia
```

### Mint Test Tokens

```bash
# Mint test USDC
make mint-usdc
# Or directly:
npx hardhat run scripts/faucet/mintUSDC.mjs --network baseSepolia
```

## 📊 Deployment Data

After deployment, data is saved to multiple locations:

### 1. Main Deployment Files
```
deployments/
├── baseSepolia.json              # Latest deployment
├── worldchain.json                # Latest deployment
├── deployment-baseSepolia-{timestamp}.json  # History
└── abis/                          # Contract ABIs
    ├── YieldOracle.json
    ├── AutoYieldToken.json
    ├── HedgePodVault.json
    └── VolatilityFeeHook.json
```

### 2. Frontend Data
```
frontend/lib/data/
└── contracts_data.json    # Imported by frontend app
```

### 3. Backend Data
```
backend/src/data/
└── contracts_data.json    # Used by agent
```

## 🔍 Contract Verification

### Automatic Verification Commands

The deployment script generates verification commands for you:

```bash
# YieldOracle
npx hardhat verify --network baseSepolia <address> <pythOracle> <chainlinkOracle>

# AutoYieldToken
npx hardhat verify --network baseSepolia <address> <lzEndpoint> 100

# HedgePodVault
npx hardhat verify --network baseSepolia <address> <depositToken> <autoYieldToken> <pythOracle> <ethPriceId> <usdcPriceId>

# VolatilityFeeHook
npx hardhat verify --network baseSepolia <address> <pythOracle> <poolManager> <priceId>
```

### Using the Makefile

```bash
make verify-base
# Enter contract address when prompted
```

## 🌐 Supported Networks

| Network | Network ID | Config Key | Status |
|---------|-----------|------------|--------|
| Base Sepolia | baseSepolia | ✅ Configured | Testnet |
| World Chain | worldchain | ✅ Configured | Mainnet |
| Celo | celo | ✅ Configured | Mainnet |
| Polygon | polygon | ✅ Configured | Mainnet |
| Zircuit | zircuit | ⚠️ Needs config | Testnet |
| Arbitrum | arbitrum | ✅ Configured | Mainnet |
| Optimism | optimism | ✅ Configured | Mainnet |
| Avalanche | avalanche | ⚠️ Needs oracle | Mainnet |

### Adding a New Network

1. Update `hardhat.config.ts`:
```typescript
networks: {
  newNetwork: {
    url: process.env.NEW_NETWORK_RPC,
    accounts: [process.env.PRIVATE_KEY],
  }
}
```

2. Update `scripts/deploy-new.ts`:
```typescript
const NETWORK_CONFIG = {
  newNetwork: {
    name: "New Network",
    explorerUrl: "https://explorer.newnetwork.com",
    pythOracle: "0x...",
    chainlinkOracle: "0x...",
    lzEndpoint: "0x...",
    depositToken: "0x...",
  }
};
```

3. Deploy:
```bash
npx hardhat run scripts/deploy-new.ts --network newNetwork
```

## 🐛 Debugging

### Common Issues

#### 1. Insufficient Balance
```bash
# Check balance first
make check-balance

# Get testnet ETH from faucets
```

#### 2. Contract Verification Failed
```bash
# Wait a few minutes after deployment
# Then run verification manually with correct parameters
```

#### 3. Oracle Address Not Set
```bash
# Update NETWORK_CONFIG in deploy-new.ts
# Get addresses from:
# - Pyth: https://pyth.network/developers/price-feed-ids
# - Chainlink: https://docs.chain.link/data-feeds/price-feeds/addresses
```

### Verbose Logging

All deployment steps are logged with:
- 🚀 Deployment actions
- ✅ Success messages
- 🔗 Explorer links
- 💾 File save locations
- 📊 Summary tables

## 📚 Additional Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [LayerZero Docs](https://layerzero.network/developers)
- [Pyth Network](https://pyth.network/developers)
- [Uniswap v4 Hooks](https://docs.uniswap.org/contracts/v4/overview)

## 🤝 Contributing

When adding new deployment features:

1. Update `deploy-new.ts` with new contract deployments
2. Add configuration to `NETWORK_CONFIG`
3. Update this README
4. Add Makefile commands if needed
5. Test on testnet first

## 📄 License

MIT License - see LICENSE for details

