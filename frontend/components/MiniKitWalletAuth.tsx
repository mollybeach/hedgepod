/**
 * MiniKit Wallet Authentication Component
 * Handles wallet connection via MiniKit SIWE for World App users
 */

'use client';

import { useEffect, useState } from 'react';
import { MiniKit, MiniAppWalletAuthSuccessPayload } from '@worldcoin/minikit-js';
import { Button } from './Button';

interface MiniKitWalletAuthProps {
  onSuccess?: (address: string) => void;
  onError?: (error: string) => void;
}

export function MiniKitWalletAuth({ onSuccess, onError }: MiniKitWalletAuthProps) {
  const [isWorldApp, setIsWorldApp] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    // Check if running in World App
    setIsWorldApp(MiniKit.isInstalled());
    
    // Get existing wallet address if already connected
    if (MiniKit.walletAddress) {
      setWalletAddress(MiniKit.walletAddress);
    }
  }, []);

  const signInWithWallet = async () => {
    if (!MiniKit.isInstalled()) {
      onError?.('Not running in World App');
      return;
    }

    try {
      setIsConnecting(true);

      // 1. Get nonce from backend
      const res = await fetch('/api/nonce');
      if (!res.ok) throw new Error('Failed to get nonce');
      
      const { nonce } = await res.json();

      // 2. Trigger MiniKit wallet auth
      const { commandPayload, finalPayload } = await MiniKit.commandsAsync.walletAuth({
        nonce: nonce,
        requestId: '0',
        expirationTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        notBefore: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
        statement: 'Sign in to HedgePod Agent to deploy autonomous yield-farming agents across 8+ chains.',
      });

      if (finalPayload.status === 'error') {
        throw new Error('User rejected wallet auth');
      }

      // 3. Verify signature on backend
      const verifyRes = await fetch('/api/complete-siwe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payload: finalPayload,
          nonce,
        }),
      });

      if (!verifyRes.ok) throw new Error('Signature verification failed');

      const verifyData = await verifyRes.json();

      if (verifyData.isValid) {
        const address = (finalPayload as MiniAppWalletAuthSuccessPayload).address;
        setWalletAddress(address);
        onSuccess?.(address);
      } else {
        throw new Error('Invalid signature');
      }

    } catch (error: any) {
      console.error('❌ MiniKit wallet auth error:', error);
      onError?.(error.message || 'Authentication failed');
    } finally {
      setIsConnecting(false);
    }
  };

  if (!isWorldApp) {
    return null; // Don't show MiniKit button outside World App
  }

  if (walletAddress) {
    return (
      <div className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full border-2 border-brown-500 shadow-ac-sm">
        <span className="text-sm font-display font-bold">
          {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
        </span>
      </div>
    );
  }

  return (
    <Button
      variant="primary"
      size="md"
      onClick={signInWithWallet}
      disabled={isConnecting}
    >
      {isConnecting ? '⏳ Connecting...' : '🌍 Connect with World App'}
    </Button>
  );
}

