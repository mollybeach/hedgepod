/**
 * Type definitions for HedgePod Agent
 */

export interface ChainInfo {
  chainId: number;
  name: string;
  rpcUrl: string;
  contracts: ContractAddresses;
}

export interface ContractAddresses {
  vault: string;
  token: string;
  oracle: string;
  hook?: string;
}

export interface APRData {
  chainId: number;
  chainName: string;
  apr: number;
  totalLiquidity: number;
  timestamp: number;
  source: string;
}

export interface RebalanceOpportunity {
  fromChain: number;
  toChain: number;
  fromAPR: number;
  toAPR: number;
  aprDelta: number;
  estimatedAmount: bigint;
  estimatedGas: bigint;
}

export interface PriceData {
  id: string;
  price: number;
  conf: number;
  expo: number;
  publishTime: number;
}

export interface SwapQuote {
  fromToken: string;
  toToken: string;
  fromChain: number;
  toChain: number;
  amount: string;
  estimatedOutput: string;
  slippage: number;
  gas: string;
  route: string[];
}

export interface AgentWallet {
  address: string;
  balance: bigint;
  authorized: boolean;
  spendingLimit: bigint;
  expiresAt: number;
}

export interface MonitoringMetrics {
  totalAPRChecks: number;
  totalRebalances: number;
  successfulRebalances: number;
  failedRebalances: number;
  totalGasSaved: bigint;
  averageAPRImprovement: number;
  uptime: number;
  lastRebalance: number;
}

