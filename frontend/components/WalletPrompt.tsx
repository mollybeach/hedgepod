'use client';

import { Card } from './Card';
import { Button } from './Button';
import { ConnectButton } from '@rainbow-me/rainbowkit';

interface WalletPromptProps {
  title?: string;
  message?: string;
}

export function WalletPrompt({ 
  title = "Connect Your Wallet",
  message = "Please connect your wallet to access this feature"
}: WalletPromptProps) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card variant="dialogue" className="max-w-lg text-center space-y-6">
        <div className="text-6xl">🦔</div>
        
        <div className="space-y-2">
          <h2 className="text-3xl font-display font-bold text-green-700">
            {title}
          </h2>
          <p className="text-green-800 font-body">
            {message}
          </p>
        </div>

        <div className="connect-button-wrapper">
          <ConnectButton.Custom>
            {({ openConnectModal }) => (
              <Button variant="primary" size="lg" onClick={openConnectModal}>
                🔗 Connect Wallet
              </Button>
            )}
          </ConnectButton.Custom>
        </div>

        <div className="pt-4 border-t border-green-200 space-y-2">
          <p className="text-xs text-green-600 font-body">
            💡 <span className="font-bold">Why connect?</span>
          </p>
          <ul className="text-xs text-green-700 font-body space-y-1">
            <li>✅ View your portfolio</li>
            <li>✅ Deploy autonomous agents</li>
            <li>✅ Trade on Uniswap v4</li>
            <li>✅ Earn yields automatically</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}

