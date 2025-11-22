'use client';

// NOTE: To use World ID verification, install the package:
// npm install @worldcoin/idkit

// @ts-ignore - Package needs to be installed
import { IDKitWidget, ISuccessResult, VerificationLevel } from '@worldcoin/idkit';
import { Button } from './Button';
import { useState } from 'react';

interface WorldIDVerifyProps {
  onSuccess: (proof: ISuccessResult) => void;
  onError?: (error: Error) => void;
  actionId?: string;
  signal?: string;
}

export function WorldIDVerify({ onSuccess, onError, actionId = 'hedgepod-deposit', signal }: WorldIDVerifyProps) {
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = async (proof: ISuccessResult) => {
    console.log('World ID Proof:', proof);
    setIsVerified(true);
    onSuccess(proof);
  };

  const handleError = (error: Error) => {
    console.error('World ID Error:', error);
    if (onError) {
      onError(error);
    }
  };

  return (
    <div className="space-y-3">
      <div className="p-4 bg-green-50 border-2 border-green-300 rounded-lg">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🔒</span>
          <div className="flex-1">
            <h4 className="font-display font-bold text-green-700 mb-1">
              Sybil Resistant
            </h4>
            <p className="text-sm text-green-800 font-body">
              World ID verification ensures fair access and prevents bot manipulation.
            </p>
          </div>
        </div>
      </div>

      <IDKitWidget
        app_id={process.env.NEXT_PUBLIC_WORLD_APP_ID || 'app_staging_a1b2c3d4e5f6'}
        action={actionId}
        signal={signal}
        onSuccess={handleVerify}
        onError={handleError}
        verification_level={VerificationLevel.Orb}
      >
        {({ open }: { open: () => void }) => (
          <Button 
            variant="primary" 
            size="lg" 
            onClick={open}
            className="w-full"
            disabled={isVerified}
          >
            {isVerified ? '✅ Verified with World ID' : '🔒 Verify with World ID'}
          </Button>
        )}
      </IDKitWidget>

      {isVerified && (
        <p className="text-sm text-center text-green-600 font-body">
          ✅ Your humanity has been verified!
        </p>
      )}

      <p className="text-xs text-center text-green-600 font-body italic">
        World ID uses zero-knowledge proofs to verify you&apos;re human without revealing your identity
      </p>
    </div>
  );
}

