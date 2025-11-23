/**
 * Contract Addresses and ABIs
 * Centralized contract configuration for frontend
 */

// Contract Addresses by Chain
export const CONTRACT_ADDRESSES: Record<number, {
  HedgePodVault: string;
  AutoYieldToken: string;
  YieldOracle: string;
  VolatilityFeeHook: string;
  DepositToken: string; // USDC
}> = {
  // Base Sepolia (testnet)
  84532: {
    HedgePodVault: '0xb698F5aae95B3cE4494F4913cFde376ffD1feAb1',
    AutoYieldToken: '0x67670Da92de8F8B08Ef88542266ACD575E82A595',
    YieldOracle: '0x86d67D2a059c51338d5406f7Db469F89a9DB93ae',
    VolatilityFeeHook: '0x0000000000000000000000000000000000000000',
    DepositToken: '0x036CbD53842c5426634e7929541eC2318f3dCF7e', // USDC on Base Sepolia
  },
  // World Chain Mainnet
  480: {
    HedgePodVault: '0x9e33d5946BA0e97f0ED0dee2BfC6E4BC66781BFE',
    AutoYieldToken: '0xb698F5aae95B3cE4494F4913cFde376ffD1feAb1',
    YieldOracle: '0x3f89E2EeFe97B7A1a85061C7D4E63eBB1d688102',
    VolatilityFeeHook: '0x6647c133AA387beF680716C1CdaBBC39Ef040934',
    DepositToken: '0x0000000000000000000000000000000000000000', // Update with actual USDC address
  },
  // Hardhat Local
  31337: {
    HedgePodVault: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    AutoYieldToken: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    YieldOracle: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    VolatilityFeeHook: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
    DepositToken: '0x0000000000000000000000000000000000000000', // Mock USDC
  },
};

// Simplified ABIs for frontend use
export const HEDGEPOD_VAULT_ABI = [
  {
    "inputs": [{"internalType": "uint256", "name": "amount", "type": "uint256"}],
    "name": "deposit",
    "outputs": [{"internalType": "uint256", "name": "shares", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "shares", "type": "uint256"}],
    "name": "withdraw",
    "outputs": [{"internalType": "uint256", "name": "amount", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
    "name": "userShares",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalDeposits",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "user", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "shares", "type": "uint256"}
    ],
    "name": "Deposit",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "user", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "shares", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "Withdraw",
    "type": "event"
  }
] as const;

export const ERC20_ABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "spender", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "approve",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "owner", "type": "address"},
      {"internalType": "address", "name": "spender", "type": "address"}
    ],
    "name": "allowance",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// Chain Explorer URLs
export const EXPLORER_URLS: Record<number, string> = {
  84532: 'https://sepolia.basescan.org',
  480: 'https://worldchain-mainnet.explorer.alchemy.com',
  31337: '', // No explorer for local
};

/**
 * Get contract address for current chain
 */
export function getContractAddress(chainId: number, contractName: keyof typeof CONTRACT_ADDRESSES[number]) {
  return CONTRACT_ADDRESSES[chainId]?.[contractName] || '';
}

/**
 * Get explorer URL for transaction
 */
export function getExplorerUrl(chainId: number, txHash: string) {
  const baseUrl = EXPLORER_URLS[chainId];
  return baseUrl ? `${baseUrl}/tx/${txHash}` : '';
}

