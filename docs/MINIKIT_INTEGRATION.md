# 🌍 MiniKit Integration for World App

## ✅ CRITICAL: Main Prize Eligibility

**MiniKit integration is REQUIRED for $20K main prize eligibility.**

- ✅ **MiniKit** → Eligible for **main prizes** ($20K)
- ⚠️ **IDKit (World ID)** → Only eligible for **pool prizes**

---

## 📦 What We Integrated

### **1. MiniKit SDK Installation**
```bash
npm install @worldcoin/minikit-js
```

### **2. MiniKitProvider Wrapper**
Wrapped the entire app with `MiniKitProvider` in `app/layout.tsx`:

```tsx
<MiniKitProvider>
  <body>
    <Providers>{children}</Providers>
  </body>
</MiniKitProvider>
```

### **3. Wallet Authentication (SIWE)**
- ✅ **API Route: `/api/nonce`** - Generates secure nonce for SIWE
- ✅ **API Route: `/api/complete-siwe`** - Verifies SIWE signature
- ✅ **Component: `MiniKitWalletAuth`** - Handles wallet connection flow

### **4. Conditional Rendering**
- 🌍 **World App users** → MiniKit wallet auth
- 🌐 **Browser users** → RainbowKit wallet (fallback)

Detection logic:
```tsx
const isWorldApp = MiniKit.isInstalled();
```

### **5. Transaction Sending**
Created utility functions in `lib/minikit.ts`:
- `sendTransactionViaMiniKit()` - Send value transfers
- `sendContractTransactionViaMiniKit()` - Interact with smart contracts
- `isWorldApp()` - Detect environment
- `getMiniKitWalletAddress()` - Get user's wallet address
- `getMiniKitUser()` - Fetch user profile data

---

## 🎯 Key Features

### **Wallet Authentication**
- Uses **Sign-In with Ethereum (SIWE)** standard
- **Zero-knowledge proof** for privacy
- Returns user's **wallet address, username, profile picture**
- Secure **nonce-based verification**

### **Transaction Sending**
- Native World Chain transaction support
- Contract interaction via ABI
- Automatic signature prompts
- Transaction status tracking

### **User Experience**
- Seamless for World App users
- Browser fallback for development/testing
- No code duplication - conditional rendering
- Consistent UI across both modes

---

## 🔄 User Flow

### **1. World App User (MiniKit)**
```
User opens hedgepod.app in World App
  ↓
Detects MiniKit.isInstalled() === true
  ↓
Shows "🌍 Connect with World App" button
  ↓
User clicks → MiniKit wallet auth triggered
  ↓
Backend generates nonce (/api/nonce)
  ↓
User signs SIWE message in World App
  ↓
Backend verifies signature (/api/complete-siwe)
  ↓
User authenticated with wallet address
  ↓
Can now deploy agents, send transactions
```

### **2. Browser User (RainbowKit Fallback)**
```
User opens hedgepod.app in browser
  ↓
Detects MiniKit.isInstalled() === false
  ↓
Shows RainbowKit "Connect Wallet" button
  ↓
User selects wallet (MetaMask, Coinbase, etc.)
  ↓
User authenticated with wallet address
  ↓
Can now deploy agents, send transactions
```

---

## 📁 File Structure

```
frontend/
├── app/
│   ├── layout.tsx                    # ✅ Wrapped with MiniKitProvider
│   └── api/
│       ├── nonce/
│       │   └── route.ts             # ✅ Generate SIWE nonce
│       └── complete-siwe/
│           └── route.ts             # ✅ Verify SIWE signature
├── components/
│   ├── MiniKitWalletAuth.tsx        # ✅ MiniKit wallet connection
│   └── Navigation.tsx               # ✅ Conditional rendering
└── lib/
    └── minikit.ts                   # ✅ MiniKit utilities
```

---

## 🎨 Components

### **MiniKitWalletAuth.tsx**
Handles wallet authentication for World App users:
- Generates SIWE nonce
- Triggers `MiniKit.commandsAsync.walletAuth()`
- Verifies signature on backend
- Displays connected wallet address

### **Navigation.tsx**
Conditional wallet button rendering:
- World App → MiniKitWalletAuth
- Browser → RainbowKit ConnectButton

### **lib/minikit.ts**
Utility functions for:
- Sending transactions
- Contract interactions
- Environment detection
- User data fetching

---

## 🔒 Security

### **SIWE (Sign-In with Ethereum)**
- Industry standard authentication (EIP-4361)
- Prevents replay attacks with nonces
- Time-limited signatures (7 days)
- Backend verification required

### **Nonce Storage**
- Stored in secure HTTP-only cookies
- 5-minute expiration
- Cleared after verification
- SameSite=strict policy

### **Signature Verification**
- Uses `verifySiweMessage()` from MiniKit SDK
- Validates signature against nonce
- Checks message structure
- Returns user's wallet address

---

## 🚀 Testing

### **Test in World App**
1. Deploy to Vercel (https://hedgepod.app)
2. Open in World App on mobile
3. Click "🌍 Connect with World App"
4. Sign the SIWE message
5. Verify wallet address displays

### **Test in Browser**
1. Open https://hedgepod.app in browser
2. Should show RainbowKit "Connect Wallet"
3. Connect with MetaMask/Coinbase Wallet
4. Verify wallet address displays

---

## 📊 What World Team Will See

### **1. MiniKitProvider Integration** ✅
```tsx
// app/layout.tsx
import { MiniKitProvider } from '@worldcoin/minikit-js';

<MiniKitProvider>
  <body>{children}</body>
</MiniKitProvider>
```

### **2. Wallet Authentication** ✅
```tsx
// components/MiniKitWalletAuth.tsx
const { finalPayload } = await MiniKit.commandsAsync.walletAuth({
  nonce: nonce,
  statement: 'Sign in to HedgePod Agent...',
  expirationTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
});
```

### **3. SIWE Verification** ✅
```tsx
// app/api/complete-siwe/route.ts
const validMessage = await verifySiweMessage(payload, nonce);
if (validMessage.isValid) {
  return NextResponse.json({ status: 'success', isValid: true });
}
```

### **4. Transaction Sending** ✅
```tsx
// lib/minikit.ts
const { finalPayload } = await MiniKit.commandsAsync.sendTransaction([{
  address: contractAddress,
  abi: contractABI,
  functionName: 'deposit',
  args: [amount],
}]);
```

### **5. Environment Detection** ✅
```tsx
// components/Navigation.tsx
const isWorldApp = MiniKit.isInstalled();
{isWorldApp ? <MiniKitWalletAuth /> : <RainbowKitConnect />}
```

---

## 🎁 Why This Matters

### **For Users**
- ✅ **Native World App experience** (no external wallet popup)
- ✅ **One-click authentication** (already have World App)
- ✅ **Gasless transactions** (via MiniKit)
- ✅ **Privacy-preserving** (SIWE + World ID)

### **For HedgePod**
- ✅ **Main prize eligibility** ($20K)
- ✅ **23M potential users** (World App user base)
- ✅ **Better UX than browser DApps** (native-like)
- ✅ **World Chain native** (primary deployment target)

### **For World Ecosystem**
- ✅ **Showcase for DeFi mini apps**
- ✅ **Real-world MiniKit usage**
- ✅ **Demonstrates autonomous agents in World App**
- ✅ **Proves chain abstraction works**

---

## 🏆 Prize Eligibility

### **Main Prize ($20K)**
✅ **MiniKit Integration** (REQUIRED)
- MiniKitProvider wrapper
- Wallet authentication via SIWE
- Transaction sending via MiniKit
- Environment detection

### **Pool Prize**
✅ **World ID (IDKit)** (BONUS)
- Sybil-resistant agent deployment
- Proof-of-personhood verification
- Zero-knowledge proofs

**Both integrations are live and functional!**

---

## 📞 Contact

**Molly Beach**
- 📧 mollybeach@hedgepod.app
- 🐦 [@hedgepod](https://x.com/hedgepod)
- 💻 [github.com/mollybeach/hedgepod](https://github.com/mollybeach/hedgepod)
- 🌐 [hedgepod.app](https://hedgepod.app)

---

## ✅ Checklist for World Team

- [ ] Verify MiniKitProvider in `app/layout.tsx`
- [ ] Test wallet authentication in World App
- [ ] Verify SIWE signature verification
- [ ] Test transaction sending on World Chain
- [ ] Confirm environment detection works
- [ ] Review API routes (/api/nonce, /api/complete-siwe)
- [ ] Test browser fallback (RainbowKit)
- [ ] Verify World ID integration (bonus pool prize)

---

**Ready for World Prize evaluation! 🦔🌍**

