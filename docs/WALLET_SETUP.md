# 🦔 HedgePod Wallet Integration Setup

## Overview

HedgePod uses **RainbowKit + wagmi + viem** for wallet connectivity. This is the most modern and optimal solution for 2025, providing:

- ✅ Beautiful UI with Animal Crossing theme customization
- ✅ Support for 100+ wallets (MetaMask, WalletConnect, Coinbase Wallet, etc.)
- ✅ Multi-chain support (8 chains configured)
- ✅ ENS name resolution
- ✅ Mobile wallet support via WalletConnect
- ✅ TypeScript native with full type safety

---

## 🚀 Installation

### Step 1: Install Dependencies

Run this command from the `frontend/` directory:

```bash
cd frontend
npm install @rainbow-me/rainbowkit wagmi viem@2.x @tanstack/react-query
```

### Step 2: Get WalletConnect Project ID

1. Go to https://cloud.walletconnect.com/
2. Sign up / Log in
3. Create a new project
4. Copy your Project ID

### Step 3: Create Environment File

Create a `.env.local` file in the `frontend/` directory:

```bash
# frontend/.env.local
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

**Important**: Replace `your_project_id_here` with your actual WalletConnect Project ID.

### Step 4: Start Development Server

```bash
npm run dev
```

---

## 📁 Files Created

### 1. **`lib/wagmi.ts`**
Wagmi configuration with all 8 HedgePod chains:
- World Chain
- Base
- Celo
- Zircuit (custom chain)
- Polygon
- Arbitrum
- Optimism
- Avalanche

### 2. **`components/Providers.tsx`**
Web3 providers wrapper with:
- WagmiProvider
- QueryClientProvider (React Query)
- RainbowKitProvider (custom pink theme)

### 3. **`components/Navigation.tsx` (Updated)**
Enhanced navigation with:
- Logo on the left
- Navigation links in center
- Connect Wallet button on the right
- Custom Animal Crossing styling
- Responsive design for mobile

### 4. **`app/layout.tsx` (Updated)**
Root layout now wraps children with `<Providers>` for wallet context.

---

## 🎨 Custom Styling

The Connect Wallet button uses HedgePod's Animal Crossing theme:

- **Primary Color**: Green (`#299f29`) - Matches pea pod
- **Accent Color**: Pink (`#e2547f`) - For interactions
- **Border**: Brown (`border-brown-500`) - Pixel art style
- **Font**: Nunito (display font)
- **Shadows**: Custom AC drop shadows

### Button States:

1. **Disconnected**: Green button with "Connect Wallet"
2. **Connected**: Shows chain selector + address/ENS
3. **Wrong Network**: Red button with "Wrong network"

---

## 🔌 Supported Wallets

RainbowKit automatically supports:

### Desktop Wallets
- MetaMask
- Coinbase Wallet
- Rainbow Wallet
- Trust Wallet
- Ledger
- And 50+ more...

### Mobile Wallets (via WalletConnect)
- MetaMask Mobile
- Coinbase Wallet Mobile
- Rainbow Mobile
- Trust Wallet Mobile
- WalletConnect compatible wallets

---

## 🌐 Supported Chains

All 8 HedgePod chains are configured:

| Chain | Chain ID | Network |
|-------|----------|---------|
| World Chain | 480 | Mainnet |
| Base | 8453 | Mainnet |
| Celo | 42220 | Mainnet |
| Zircuit | 48899 | Testnet |
| Polygon | 137 | Mainnet |
| Arbitrum | 42161 | Mainnet |
| Optimism | 10 | Mainnet |
| Avalanche | 43114 | Mainnet |

Users can switch between chains directly from the wallet button.

---

## 💻 Usage in Components

### Basic Hook Usage

```tsx
'use client';

import { useAccount, useBalance, useDisconnect } from 'wagmi';

export function MyComponent() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const { disconnect } = useDisconnect();

  if (!isConnected) {
    return <div>Please connect your wallet</div>;
  }

  return (
    <div>
      <p>Connected: {address}</p>
      <p>Balance: {balance?.formatted} {balance?.symbol}</p>
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  );
}
```

### Reading Contract Data

```tsx
'use client';

import { useReadContract } from 'wagmi';
import VAULT_ABI from '@/lib/data/contracts_data.json';

export function VaultBalance() {
  const { data: balance } = useReadContract({
    address: '0xVaultAddress...',
    abi: VAULT_ABI,
    functionName: 'balanceOf',
    args: [userAddress],
  });

  return <div>Vault Balance: {balance?.toString()}</div>;
}
```

### Writing to Contracts

```tsx
'use client';

import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import VAULT_ABI from '@/lib/data/contracts_data.json';

export function DepositButton() {
  const { data: hash, writeContract } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

  const handleDeposit = () => {
    writeContract({
      address: '0xVaultAddress...',
      abi: VAULT_ABI,
      functionName: 'deposit',
      args: [parseEther('1.0')],
    });
  };

  return (
    <button onClick={handleDeposit} disabled={isLoading}>
      {isLoading ? 'Depositing...' : isSuccess ? 'Success!' : 'Deposit'}
    </button>
  );
}
```

---

## 🎨 Customizing the Theme

Edit `components/Providers.tsx` to customize RainbowKit theme:

```tsx
<RainbowKitProvider
  theme={darkTheme({
    accentColor: '#e2547f', // Change accent color
    accentColorForeground: 'white',
    borderRadius: 'large', // 'small' | 'medium' | 'large'
    fontStack: 'system', // 'system' | 'rounded'
  })}
  // ...
>
```

Or use light theme:

```tsx
import { lightTheme } from '@rainbow-me/rainbowkit';

<RainbowKitProvider
  theme={lightTheme({
    accentColor: '#299f29', // HedgePod green
  })}
  // ...
>
```

---

## 🔧 Adding Custom Chains

To add a new chain, edit `lib/wagmi.ts`:

```typescript
export const myCustomChain = {
  id: 12345,
  name: 'My Custom Chain',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['https://rpc.mycustomchain.com'] },
    public: { http: ['https://rpc.mycustomchain.com'] },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://explorer.mycustomchain.com' },
  },
  testnet: false,
} as const;

// Add to chains array in getDefaultConfig:
chains: [
  worldchain,
  base,
  // ... other chains
  myCustomChain as any,
],
```

---

## 🐛 Troubleshooting

### Issue: "Module not found: Can't resolve '@rainbow-me/rainbowkit'"
**Solution**: Run `npm install` from the `frontend/` directory.

### Issue: "NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is undefined"
**Solution**: Create `.env.local` file with your WalletConnect Project ID.

### Issue: "Chain switching not working"
**Solution**: Make sure the chain is configured in `lib/wagmi.ts` and your wallet supports it.

### Issue: "Hydration error" in Next.js
**Solution**: Make sure components using wallet hooks are marked with `'use client'` directive.

### Issue: "ConnectButton not styled correctly"
**Solution**: Import RainbowKit CSS in `components/Providers.tsx`:
```tsx
import '@rainbow-me/rainbowkit/styles.css';
```

---

## 📚 Documentation Links

- **RainbowKit Docs**: https://www.rainbowkit.com/docs/introduction
- **wagmi Docs**: https://wagmi.sh/
- **viem Docs**: https://viem.sh/
- **WalletConnect Cloud**: https://cloud.walletconnect.com/

---

## ✅ Testing Checklist

- [ ] Install dependencies successfully
- [ ] Create `.env.local` with WalletConnect Project ID
- [ ] Start dev server without errors
- [ ] Connect wallet (MetaMask, Coinbase Wallet, etc.)
- [ ] Switch between chains
- [ ] ENS name displays correctly (if applicable)
- [ ] Disconnect wallet
- [ ] Wallet button renders on mobile
- [ ] WalletConnect QR code works on mobile

---

## 🚀 Next Steps

### 1. Add Wallet-Gated Features
Show different UI based on connection status:

```tsx
const { isConnected } = useAccount();

return isConnected ? <DepositForm /> : <ConnectPrompt />;
```

### 2. Integrate with HedgePod Vault
Use `useWriteContract` to call vault functions like `deposit()`, `withdraw()`, etc.

### 3. Display User Portfolio
Fetch user's balance from contracts using `useReadContract`.

### 4. Add Transaction History
Use `useWaitForTransactionReceipt` to track transaction status and show history.

---

## 🦔 That's It!

Your HedgePod frontend now has beautiful, production-ready wallet connectivity!

**Happy building!** 🚀

