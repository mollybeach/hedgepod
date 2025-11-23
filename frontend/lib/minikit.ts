/**
 * MiniKit Utilities for World App
 * Helper functions for sending transactions and signing messages
 */

import { MiniKit, SendTransactionInput } from '@worldcoin/minikit-js';

/**
 * Send a transaction via MiniKit (when in World App)
 * Falls back to wagmi for browser users
 */
export async function sendTransactionViaMiniKit(
  params: {
    to: string;
    value: string; // Wei string
    data?: string;
    chainId?: number;
  }
) {
  if (!MiniKit.isInstalled()) {
    throw new Error('MiniKit not installed - use wagmi for browser transactions');
  }

  const transactionInput: SendTransactionInput = {
    transaction: [
      {
        address: params.to,
        abi: [], // Empty ABI for simple value transfers
        functionName: '', // Empty for value transfers
        args: [],
      },
    ],
  };

  const { finalPayload } = await MiniKit.commandsAsync.sendTransaction(transactionInput);

  if (finalPayload.status === 'error') {
    throw new Error(`Transaction failed: ${finalPayload.error_code || 'Unknown error'}`);
  }

  return finalPayload;
}

/**
 * Send a contract interaction via MiniKit
 */
export async function sendContractTransactionViaMiniKit(
  params: {
    address: string;
    abi: any[];
    functionName: string;
    args: any[];
    value?: string;
  }
) {
  if (!MiniKit.isInstalled()) {
    throw new Error('MiniKit not installed - use wagmi for browser transactions');
  }

  const transactionInput: SendTransactionInput = {
    transaction: [
      {
        address: params.address,
        abi: params.abi,
        functionName: params.functionName,
        args: params.args,
      },
    ],
  };

  const { finalPayload } = await MiniKit.commandsAsync.sendTransaction(transactionInput);

  if (finalPayload.status === 'error') {
    throw new Error(`Transaction failed: ${finalPayload.error_code || 'Unknown error'}`);
  }

  return finalPayload;
}

/**
 * Check if app is running in World App
 */
export function isWorldApp(): boolean {
  return MiniKit.isInstalled();
}

/**
 * Get current user's wallet address from MiniKit
 * Note: MiniKit doesn't expose walletAddress directly. Use localStorage after authentication.
 */
export function getMiniKitWalletAddress(): string | undefined {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('minikit_wallet_address') || undefined;
  }
  return undefined;
}

/**
 * Get current user info from MiniKit
 */
export async function getMiniKitUser(address: string) {
  if (!MiniKit.isInstalled()) {
    return null;
  }

  try {
    return await MiniKit.getUserByAddress(address);
  } catch (error) {
    console.error('Failed to get MiniKit user:', error);
    return null;
  }
}

