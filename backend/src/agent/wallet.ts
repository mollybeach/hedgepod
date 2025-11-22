/**
 * CDP Server Wallet Integration
 * Manages the autonomous agent wallet with x402 authorization
 */

import { Coinbase, Wallet } from "@coinbase/coinbase-sdk";
import { ethers } from "ethers";
import config from "../config";
import logger from "../utils/logger";
import type { AgentWallet } from "../types";

export class WalletManager {
  private coinbase: Coinbase;
  private agentWallet: Wallet | null = null;
  private providers: Map<number, ethers.JsonRpcProvider> = new Map();

  constructor() {
    // Initialize Coinbase SDK
    this.coinbase = new Coinbase({
      apiKeyName: config.cdp.apiKeyName,
      privateKey: config.cdp.privateKey,
    });

    // Initialize providers for each chain
    this.initializeProviders();
  }

  private initializeProviders() {
    // Initialize providers for all supported chains
    Object.entries(config.rpc).forEach(([chain, rpcUrl]) => {
      if (rpcUrl) {
        const chainId = config.chainIds[chain as keyof typeof config.chainIds];
        this.providers.set(chainId, new ethers.JsonRpcProvider(rpcUrl));
        logger.debug(`Initialized provider for ${chain} (${chainId})`);
      }
    });
  }

  /**
   * Create or load agent wallet
   */
  async initializeWallet(networkId: string = "base-sepolia"): Promise<string> {
    try {
      logger.info("Initializing agent wallet...");

      // Try to load existing wallet or create new one
      // In production, wallet seed would be stored securely
      this.agentWallet = await Wallet.create({ networkId });

      const address = await this.agentWallet.getDefaultAddress();
      logger.info(`Agent wallet initialized: ${address}`);

      return address.toString();
    } catch (error) {
      logger.error("Failed to initialize wallet:", error);
      throw error;
    }
  }

  /**
   * Request x402 authorization from vault
   */
  async requestAuthorization(
    vaultAddress: string,
    chainId: number,
    spendingLimit: bigint,
    duration: number
  ): Promise<string> {
    try {
      logger.info(`Requesting x402 authorization from vault ${vaultAddress}...`);

      if (!this.agentWallet) {
        throw new Error("Agent wallet not initialized");
      }

      const provider = this.providers.get(chainId);
      if (!provider) {
        throw new Error(`Provider not found for chain ${chainId}`);
      }

      // Get agent address
      const agentAddress = await this.agentWallet.getDefaultAddress();

      // In real implementation, this would use CDP's x402 authorization
      // For now, we'll simulate the authorization request
      logger.info("Requesting authorization with parameters:", {
        agent: agentAddress.toString(),
        spendingLimit: spendingLimit.toString(),
        duration,
      });

      // Return mock authorization ID
      return `auth_${Date.now()}`;
    } catch (error) {
      logger.error("Failed to request authorization:", error);
      throw error;
    }
  }

  /**
   * Execute contract call with x402 authorization
   */
  async executeAuthorizedCall(
    contractAddress: string,
    chainId: number,
    method: string,
    args: any[],
    authorizationSignature: string
  ): Promise<string> {
    try {
      if (!this.agentWallet) {
        throw new Error("Agent wallet not initialized");
      }

      logger.info(`Executing authorized call: ${method} on ${contractAddress}`);

      // In real implementation, would use CDP's contract invocation
      // with x402 authorization signature
      const tx = await this.agentWallet.invokeContract({
        contractAddress,
        method,
        args,
      });

      logger.info(`Transaction sent: ${tx}`);
      return tx;
    } catch (error) {
      logger.error("Failed to execute authorized call:", error);
      throw error;
    }
  }

  /**
   * Get wallet balance on specific chain
   */
  async getBalance(chainId: number): Promise<bigint> {
    try {
      if (!this.agentWallet) {
        throw new Error("Agent wallet not initialized");
      }

      const provider = this.providers.get(chainId);
      if (!provider) {
        throw new Error(`Provider not found for chain ${chainId}`);
      }

      const address = await this.agentWallet.getDefaultAddress();
      const balance = await provider.getBalance(address.toString());

      return balance;
    } catch (error) {
      logger.error(`Failed to get balance for chain ${chainId}:`, error);
      throw error;
    }
  }

  /**
   * Get wallet info
   */
  async getWalletInfo(): Promise<AgentWallet> {
    if (!this.agentWallet) {
      throw new Error("Agent wallet not initialized");
    }

    const address = await this.agentWallet.getDefaultAddress();
    const balance = await this.getBalance(config.chainIds.base);

    return {
      address: address.toString(),
      balance,
      authorized: true,
      spendingLimit: ethers.parseUnits("10000", 6), // 10k USDC
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    };
  }

  /**
   * Get provider for chain
   */
  getProvider(chainId: number): ethers.JsonRpcProvider {
    const provider = this.providers.get(chainId);
    if (!provider) {
      throw new Error(`Provider not found for chain ${chainId}`);
    }
    return provider;
  }

  /**
   * Get agent wallet address
   */
  async getAddress(): Promise<string> {
    if (!this.agentWallet) {
      throw new Error("Agent wallet not initialized");
    }
    const address = await this.agentWallet.getDefaultAddress();
    return address.toString();
  }

  /**
   * Export wallet for backup (use with caution)
   */
  async exportWallet(): Promise<any> {
    if (!this.agentWallet) {
      throw new Error("Agent wallet not initialized");
    }

    // In production, implement secure export mechanism
    logger.warn("Exporting wallet - ensure secure storage!");
    return this.agentWallet.export();
  }
}

// Singleton instance
export const walletManager = new WalletManager();
export default walletManager;

