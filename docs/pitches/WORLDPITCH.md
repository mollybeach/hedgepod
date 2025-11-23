# HedgePod Agent - World Booth Pitch

**Prize**: $20K World Best Mini App
**Format**: 30-second intro + 2-minute demo + Q&A

---

## DEMO NAVIGATION MAP

**Quick Reference - What to Show When:**

1. **Homepage** → 30-second intro (show sidebar stats, World Chain)
2. **Portfolio → Deploy Agent** → World ID verification (show QR code widget)
3. **Portfolio Page** → Agent cards (show multi-chain operation)
4. **Agent → History** → Rebalance timeline (show autonomous operation)
5. **Contracts** → World Chain section (show mainnet deployment)
6. **More → World Prize Page** → Evidence (show deep integration)

---

## 30-Second Quick Pitch

**SHOW**: Homepage (hedgepod.app) with sidebar visible

"Hey! I'm Molly, building HedgePod Agent - a World mini app that turns your 23M users into hedge fund managers.

**POINT TO**: Sidebar stats ($14,450 Total Value, 4 Active Agents, 8.2% Yield)

The Problem: Your average World App user has no idea what "bridging" or "chain selection" means. They just want their money to grow.

Our Solution: Deposit once. AI agents automatically hunt for the best yields across 8+ chains and rebalance for you. Completely gasless. Completely chain-abstracted. Just 'deposit USDC, watch number go up.'

**SHOW**: Network switcher dropdown (click network button)
**POINT TO**: World Chain logo front and center

Why World? Full MiniKit SDK integration (not just IDKit!), World ID for sybil-resistance, 19-language support, and designed specifically for the 23M users who'll never touch MetaMask.

Live Now: hedgepod.app - Deployed on World Chain mainnet & testnet!"

---

## Why This Matters for World (Show While Explaining)

**1. Onboarding 23M Non-Crypto Users to DeFi**

**SHOW**: Homepage hero section
**POINT TO**: "Create your own AI hedge fund" tagline - no crypto jargon

- Most World users have never used DeFi because it's too complex
- HedgePod abstracts away chains, gas, bridges—just "set it and forget it"
- First DeFi experience feels like a savings account, not a blockchain maze

**2. World ID = Built-In Sybil Resistance**

**SHOW**: Portfolio → Deploy Agent page
**POINT TO**: World ID verification section with QR code

- Every agent deployment requires World ID verification
- Prevents bot farms from gaming yield strategies
- Proof-of-personhood = fair access to optimal yields

**3. True Chain Abstraction**

**SHOW**: Portfolio page with agent card
**POINT TO**: Chain badges (Base, Polygon, Arbitrum)

- Users deposit on World Chain (home chain)
- Agent automatically moves funds to Base, Polygon, Arbitrum, etc. for best APR
- Returns profits back to World Chain
- Users never know they left World Chain

**4. Built for 23M Users**

**SHOW**: Language switcher in header (if implemented) OR mention it
**SHOW**: Sidebar with ENS name (jane.eth not 0x...)

- 19 languages (all World-supported locales)
- Gasless UX (Privy gas sponsorship)
- Human-readable addresses (ENS integration)
- Mobile-first design (World mini app optimized)

---

## World-Specific Integrations (With Visual Proof)

**World ID (Orb-level verification)**

**SHOW**: Portfolio → Deploy Agent page
**POINT TO**: "Verify Your Humanity" section with World ID widget
**SHOW**: IDKit QR code modal (if you have World ID to demo)

- Integrated into agent deployment flow
- Zero-knowledge proof verification
- No PII stored, just humanity verified

**World Chain (Mainnet + Sepolia)**

**SHOW**: Contracts page (click "Contracts" in navigation)
**POINT TO**: World Chain section with contract addresses
**HIGHLIGHT**: "0x9e33d5946BA0e97f0ED0dee2BfC6E4BC66781BFE (mainnet)"

- Primary deposit/withdrawal chain
- All 4 HedgePod contracts deployed to World Chain
- Custom network config in wagmi

**Multi-Language (19 locales)**

**MENTION**: "We support all 19 World App languages"
**SHOW**: More → World Best Mini App Implementation page
**SCROLL TO**: Language support section

- All World-supported languages
- Full translations: UI, docs, localization files
- See: `docs/LOCALISATIONS.md`

**World Mini App Ready**

**SHOW**: Homepage on mobile (resize browser) OR show on your phone
**POINT TO**: Cherry blossom sidebar, Animal Crossing theme

- Optimized for World App browser
- Mobile-responsive Animal Crossing-themed UI
- Social preview images (1200x630 for World App cards)

---

## Live Demo Flow (2-Minute Version)

**Step 1: Homepage (15 seconds)**

**SHOW**: hedgepod.app homepage
**SAY**: "This is HedgePod - notice the Animal Crossing theme, sidebar with real stats, no crypto jargon anywhere"
**POINT TO**: Sidebar stats, World Chain in network selector

**Step 2: Deploy Agent (30 seconds)**

**CLICK**: "Portfolio" → "Deploy Agent"
**SHOW**: World ID verification section
**SAY**: "Every user must verify they're human with World ID - sybil resistance built-in"
**SCROLL**: Show agent configuration (name, chains, threshold)
**POINT TO**: "All gasless - users never pay fees"

**Step 3: Portfolio (30 seconds)**

**SHOW**: Portfolio page with agents
**POINT TO**: First agent card showing multiple chains
**SAY**: "This agent is managing funds across Base, Polygon, and Arbitrum - but user started on World Chain"
**HIGHLIGHT**: APR, TVL, rebalance count

**Step 4: Agent History (30 seconds)**

**CLICK**: "View History" on an agent
**SHOW**: Rebalance timeline
**POINT TO**: Latest rebalance with transaction hash
**SAY**: "Every rebalance is transparent - click the hash and see it on LayerScan"
**CLICK**: "Run Rebalance Now" to show real-time functionality

**Step 5: World Chain Evidence (15 seconds)**

**CLICK**: "Contracts" in navigation
**SCROLL TO**: World Chain section
**SAY**: "Deployed on both World Chain mainnet and testnet - all contracts verified"
**SHOW**: Explorer links

**GitHub**: [github.com/mollybeach/hedgepod](https://github.com/mollybeach/hedgepod)

---

## ❓ **Questions for World Team**

### **Technical Questions:**

1. **World ID Integration Best Practices**:
   - Currently using IDKit widget with Orb-level verification
   - Should we also verify on-chain in smart contracts for additional security?
   - Best practices for storing/checking verification status long-term?
   - Any plans for recurring verification (e.g., agents that run for months/years)?

2. **World Mini App Submission**:
   - Ready to submit to World App store
   - What's the review timeline for hackathon projects?
   - Any specific requirements beyond the standard metadata?
   - Do you prioritize DeFi apps or specific categories for featuring?

3. **World Chain Performance**:
   - Deployed to both World Chain mainnet and Sepolia testnet
   - Any World Chain-specific gas optimizations we should know about?
   - Oracle support: Does World Chain have recommended oracle providers beyond Pyth?
   - Best practices for handling World Chain in multi-chain apps?

4. **MiniKit SDK Advanced Features**:
   - Currently using wallet auth, SIWE, and transaction commands
   - Planning to add payment commands for on-ramp integration
   - Any upcoming MiniKit features that would benefit DeFi use cases?
   - Best practices for error handling when MiniKit is not installed?

5. **Partnership Opportunities**:
   - Competing for the $20K World Best Mini App Prize at ETHGlobal
   - Would love to feature HedgePod in World App for the 23M users
   - Open to collaboration on educational content about DeFi for your user base
   - Feedback from your team would be invaluable for improving consumer UX!

---

## 🎁 **What We're Building For World Users**

### **Phase 1 (✅ COMPLETE - ETHGlobal Submission)**:
- ✅ Full MiniKit SDK integration (MiniKitProvider, wallet auth, SIWE, transactions)
- ✅ World ID verification (Orb-level, backend-verified)
- ✅ World Chain deployment (mainnet + testnet, all contracts)
- ✅ 19-language support (all World locales)
- ✅ Autonomous rebalancing agents (24/7 operation)
- ✅ Cross-chain via LayerZero OFT (8 chains)
- ✅ Uniswap v4 + 1inch + Pyth + The Graph integration
- ✅ Gasless transactions (Privy sponsorship)
- ✅ Consumer-grade UX (Animal Crossing theme, ENS everywhere)

### **Phase 2 (Post-Hackathon)**:
- 🔄 World App store submission
- 🔄 World Chain mainnet deployment
- 🔄 Referral system (World ID-gated)
- 🔄 Social features (share yields with World friends)
- 🔄 On-ramp integration (buy USDC with fiat)

### **Phase 3 (Vision)**:
- 🎯 "Set-and-forget" savings for 23M World users
- 🎯 First DeFi experience that doesn't feel like DeFi
- 🎯 Prove that chain abstraction + AI agents = mainstream adoption
- 🎯 Become the #1 World mini app for passive income

---

## Why World Users Will Love This (Show Comparison)

**Traditional DeFi:**

**SHOW**: Keep browser on Portfolio page, but explain this verbally

- "Connect wallet to Base"
- "Bridge USDC from Ethereum"
- "Approve token spending"
- "Pay gas fees"
- "Monitor APRs manually"
- "Migrate funds when rates change"

**HedgePod on World:**

**SHOW**: Portfolio → Deploy Agent flow
**POINT TO**: World ID section, agent configuration, gasless notice

- "Verify you're human" ✅ (World ID)
- "Deposit USDC" ✅ (One time)
- "Watch your money grow" ✅ (Sidebar stats)
- (Everything else happens automatically)

**GESTURE**: Between sidebar stats and agent cards to show automation

---

## Key Screens to Show (Quick Reference)

**Screen 1: Homepage**
- **What to show**: Hero section, sidebar with stats
- **What to point out**: "Create your own AI hedge fund", no crypto jargon, Animal Crossing theme
- **Key message**: Consumer-grade UX

**Screen 2: Deploy Agent Page**
- **What to show**: World ID verification widget, agent configuration
- **What to point out**: "Verify Your Humanity" section, gasless notice
- **Key message**: World ID built-in, zero friction

**Screen 3: Portfolio Page**
- **What to show**: Agent cards with chain badges, APR stats
- **What to point out**: Multiple chains (Base, Polygon, Arbitrum), all from World Chain deposit
- **Key message**: True chain abstraction

**Screen 4: Agent History**
- **What to show**: Rebalance timeline with transaction hashes
- **What to point out**: "Run Rebalance Now" button, LayerScan links
- **Key message**: Transparency and autonomous operation

**Screen 5: Contracts Page**
- **What to show**: World Chain section with addresses
- **What to point out**: Mainnet deployment, explorer links
- **Key message**: Production-ready, not just testnet

**Screen 6: Network Switcher**
- **What to show**: Network dropdown modal
- **What to point out**: World Chain logo at top, custom configuration
- **Key message**: World Chain is home base

**Screen 7: More → World Best Mini App Implementation**
- **What to show**: Prize evidence page
- **What to point out**: MiniKit integration details, 19 languages, code evidence
- **Key message**: Deep integration, not superficial

---

## What Makes It Special (Visual Elements)

**WHILE NAVIGATING**, point out these visual elements:

- Animal Crossing-themed UI (friendly, not intimidating)
- Cherry blossom sidebar (World App aesthetic)
- HedgePod mascot (cute, memorable)
- ENS names (jane.eth not 0x...)
- Gasless badges (every transaction shows $0 fee)
- World Chain front and center in network selector
- No 0x addresses visible to end users
- Simple language ("Current Yield: 8.2%" not "APR Delta")

---

## Contact

**Molly Beach**
- Email: mollybeach@hedgepod.app
- Twitter: @hedgepod
- GitHub: github.com/mollybeach
- Website: hedgepod.app

Looking forward to your feedback and hopefully winning the World Best Mini App Prize!

---

Thanks for building World Chain and making DeFi accessible to 23M people! Let's make yield farming as easy as a savings account.

