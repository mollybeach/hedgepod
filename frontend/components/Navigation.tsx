/**
 * Animal Crossing-styled Navigation Component
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// import { useTranslations } from 'next-intl'; // DISABLED - see _i18n_disabled/
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useBalance } from 'wagmi';
import { MiniKit } from '@worldcoin/minikit-js';
import { MiniKitWalletAuth } from './MiniKitWalletAuth';
import { DiscordIcon, TelegramIcon, TwitterIcon, InstagramIcon, GitHubIcon } from './SocialIcons';
// import { LanguageSwitcher } from '../_i18n_disabled/LanguageSwitcher'; // DISABLED - moved to _i18n_disabled/

export function Navigation() {
  // const t = useTranslations('common'); // DISABLED TEMPORARILY
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [isWorldApp, setIsWorldApp] = useState(false);

  useEffect(() => {
    // Detect if running in World App
    setIsWorldApp(MiniKit.isInstalled());
  }, []);
  
  // Format balance with more decimals for display
  const formatBalance = (balance: string | undefined) => {
    if (!balance) return '';
    // Extract number and symbol from displayBalance (e.g., "0.05 ETH")
    const parts = balance.split(' ');
    if (parts.length !== 2) return balance;
    
    const [amount, symbol] = parts;
    const num = parseFloat(amount);
    
    // Show up to 8 decimals for small amounts, 4 for larger
    if (num < 0.0001) {
      return `${num.toFixed(8)} ${symbol}`;
    } else if (num < 1) {
      return `${num.toFixed(6)} ${symbol}`;
    } else {
      return `${num.toFixed(4)} ${symbol}`;
    }
  };

  return (
    <nav 
      className="w-full py-4 px-8 md:px-16 lg:px-24 shadow-ac-lg border-b-3 border-brown-500 relative overflow-visible z-50"
      style={{
        backgroundImage: 'url(/greenleaves_header.png)',
        backgroundRepeat: 'repeat-x',
        backgroundSize: 'auto 100%',
        backgroundPosition: 'center',
      }}
    >
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-cream/40 backdrop-blur-[1px]" />
      
      {/* Content wrapper - no max-width, full flex */}
      <div className="relative z-10 flex justify-between items-center w-full">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/hedgepod-logo.png" alt="HedgePod" width={48} height={48} className="w-12 h-12 rounded-full border-3 border-brown-500" />
            <span className="font-display font-bold text-2xl text-green-800 hidden md:block">
              HedgePod
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-3">
        <Link href="/portfolio">
          <button className="bg-pink-400 hover:bg-pink-300 text-white font-display font-bold py-2 px-4 md:px-6 rounded-full border-3 border-brown-500 shadow-ac-sm hover:shadow-ac transition-all transform hover:-translate-y-0.5 text-sm md:text-base flex items-center gap-1">
            <span>📊</span>
            <span className="hidden md:inline">Portfolio</span>
          </button>
        </Link>
        <Link href="/swap">
          <button className="bg-purple-400 hover:bg-purple-300 text-white font-display font-bold py-2 px-4 md:px-6 rounded-full border-3 border-brown-500 shadow-ac-sm hover:shadow-ac transition-all transform hover:-translate-y-0.5 text-sm md:text-base flex items-center gap-1">
            <span>🦄</span>
            <span className="hidden md:inline">Swap</span>
          </button>
        </Link>
        <Link href="/contracts">
          <button className="bg-green-500 hover:bg-green-400 text-white font-display font-bold py-2 px-4 md:px-6 rounded-full border-3 border-brown-500 shadow-ac-sm hover:shadow-ac transition-all transform hover:-translate-y-0.5 text-sm md:text-base flex items-center gap-1">
            <span>📜</span>
            <span className="hidden md:inline">Contracts</span>
          </button>
        </Link>
        
        {/* More Dropdown */}
        <div className="relative z-[9999]">
          <button 
            onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
            className="bg-pink-500 hover:bg-pink-400 text-white font-display font-bold py-2 px-4 md:px-6 rounded-full border-3 border-brown-500 shadow-ac-sm hover:shadow-ac transition-all transform hover:-translate-y-0.5 text-sm md:text-base flex items-center gap-2"
          >
            <span className="hidden md:inline">More</span>
            <span className="transform transition-transform" style={{ transform: isMoreDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
          </button>
          
          {isMoreDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-cream rounded-2xl border-3 border-brown-500 shadow-ac-lg overflow-hidden z-[100]">
              <Link href="/about" onClick={() => setIsMoreDropdownOpen(false)}>
                <div className="px-4 py-3 hover:bg-green-100 transition-colors cursor-pointer border-b-2 border-brown-200">
                  <p className="font-display font-bold text-green-700 text-sm">📖 About</p>
                </div>
              </Link>
              <Link href="/demo" onClick={() => setIsMoreDropdownOpen(false)}>
                <div className="px-4 py-3 hover:bg-green-100 transition-colors cursor-pointer border-b-2 border-brown-200">
                  <p className="font-display font-bold text-green-700 text-sm">🎥 Demo Video</p>
                </div>
              </Link>
              
              {/* Divider */}
              <div className="px-4 py-2 bg-pink-50 border-b-2 border-brown-200">
                <p className="font-display font-bold text-pink-600 text-xs uppercase tracking-wide">Partner Prizes</p>
              </div>
              
              <Link href="/world-implementation" onClick={() => setIsMoreDropdownOpen(false)}>
                <div className="px-4 py-3 hover:bg-green-100 transition-colors cursor-pointer border-b-2 border-brown-200">
                  <p className="font-display font-bold text-green-700 text-sm">🌍 World</p>
                </div>
              </Link>
              <Link href="/layerzero-implementation" onClick={() => setIsMoreDropdownOpen(false)}>
                <div className="px-4 py-3 hover:bg-green-100 transition-colors cursor-pointer border-b-2 border-brown-200">
                  <p className="font-display font-bold text-green-700 text-sm">⛓️ LayerZero</p>
                </div>
              </Link>
              <Link href="/cdp-implementation" onClick={() => setIsMoreDropdownOpen(false)}>
                <div className="px-4 py-3 hover:bg-green-100 transition-colors cursor-pointer border-b-2 border-brown-200">
                  <p className="font-display font-bold text-green-700 text-sm">🔵 Coinbase CDP</p>
                </div>
              </Link>
              
              {/* Divider */}
              <div className="px-4 py-2 bg-pink-50 border-b-2 border-brown-200">
                <p className="font-display font-bold text-pink-600 text-xs uppercase tracking-wide">Pool Prizes</p>
              </div>
              
              <Link href="/world-minikit-implementation" onClick={() => setIsMoreDropdownOpen(false)}>
                <div className="px-4 py-3 hover:bg-green-100 transition-colors cursor-pointer border-b-2 border-brown-200">
                  <p className="font-display font-bold text-green-700 text-sm">🌍 World MiniKit</p>
                </div>
              </Link>
              <Link href="/uniswap-implementation" onClick={() => setIsMoreDropdownOpen(false)}>
                <div className="px-4 py-3 hover:bg-green-100 transition-colors cursor-pointer border-b-2 border-brown-200">
                  <p className="font-display font-bold text-green-700 text-sm">🦄 Uniswap v4 Hooks</p>
                </div>
              </Link>
              <Link href="/pyth-implementation" onClick={() => setIsMoreDropdownOpen(false)}>
                <div className="px-4 py-3 hover:bg-green-100 transition-colors cursor-pointer border-b-2 border-brown-200">
                  <p className="font-display font-bold text-green-700 text-sm">📡 Pyth Price Feeds</p>
                </div>
              </Link>
              <Link href="/entropy-implementation" onClick={() => setIsMoreDropdownOpen(false)}>
                <div className="px-4 py-3 hover:bg-green-100 transition-colors cursor-pointer border-b-2 border-brown-200">
                  <p className="font-display font-bold text-green-700 text-sm">🎲 Pyth Entropy</p>
                </div>
              </Link>
              <Link href="/thegraph-implementation" onClick={() => setIsMoreDropdownOpen(false)}>
                <div className="px-4 py-3 hover:bg-green-100 transition-colors cursor-pointer border-b-2 border-brown-200">
                  <p className="font-display font-bold text-green-700 text-sm">📊 The Graph</p>
                </div>
              </Link>
              
              {/* Divider */}
              <div className="px-4 py-2 bg-pink-50 border-b-2 border-brown-200">
                <p className="font-display font-bold text-pink-600 text-xs uppercase tracking-wide">Community</p>
              </div>
              
              <a href="https://github.com/mollybeach/hedgepod" target="_blank" rel="noopener noreferrer" onClick={() => setIsMoreDropdownOpen(false)}>
                <div className="px-4 py-3 hover:bg-green-100 transition-colors cursor-pointer border-b-2 border-brown-200 flex items-center gap-2">
                  <GitHubIcon className="w-4 h-4 text-green-700" />
                  <p className="font-display font-bold text-green-700 text-sm">GitHub</p>
                </div>
              </a>
              <a href="https://discord.gg/hedgepod" target="_blank" rel="noopener noreferrer" onClick={() => setIsMoreDropdownOpen(false)}>
                <div className="px-4 py-3 hover:bg-green-100 transition-colors cursor-pointer border-b-2 border-brown-200 flex items-center gap-2">
                  <DiscordIcon className="w-4 h-4 text-green-700" />
                  <p className="font-display font-bold text-green-700 text-sm">Discord</p>
                </div>
              </a>
              <a href="https://t.me/hedgepod" target="_blank" rel="noopener noreferrer" onClick={() => setIsMoreDropdownOpen(false)}>
                <div className="px-4 py-3 hover:bg-green-100 transition-colors cursor-pointer border-b-2 border-brown-200 flex items-center gap-2">
                  <TelegramIcon className="w-4 h-4 text-green-700" />
                  <p className="font-display font-bold text-green-700 text-sm">Telegram</p>
                </div>
              </a>
              <a href="https://twitter.com/hedgepod" target="_blank" rel="noopener noreferrer" onClick={() => setIsMoreDropdownOpen(false)}>
                <div className="px-4 py-3 hover:bg-green-100 transition-colors cursor-pointer border-b-2 border-brown-200 flex items-center gap-2">
                  <TwitterIcon className="w-4 h-4 text-green-700" />
                  <p className="font-display font-bold text-green-700 text-sm">Twitter</p>
                </div>
              </a>
              <a href="https://www.instagram.com/hedgepod_app/" target="_blank" rel="noopener noreferrer" onClick={() => setIsMoreDropdownOpen(false)}>
                <div className="px-4 py-3 hover:bg-green-100 transition-colors cursor-pointer flex items-center gap-2">
                  <InstagramIcon className="w-4 h-4 text-green-700" />
                  <p className="font-display font-bold text-green-700 text-sm">Instagram</p>
                </div>
              </a>
            </div>
          )}
        </div>

        {/* Language Switcher - DISABLED TEMPORARILY */}
        {/* <LanguageSwitcher /> */}

        {/* Connect Wallet Button with Custom Styling - Far Right */}
        <div className="connect-wallet-wrapper ml-auto">
          {/* Use MiniKit for World App users, RainbowKit for browser users */}
          {isWorldApp ? (
            <MiniKitWalletAuth
              onSuccess={(address) => console.log('✅ MiniKit connected:', address)}
              onError={(error) => console.error('❌ MiniKit error:', error)}
            />
          ) : (
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              const ready = mounted && authenticationStatus !== 'loading';
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus || authenticationStatus === 'authenticated');

              return (
                <div
                  {...(!ready && {
                    'aria-hidden': true,
                    style: {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <button
                          onClick={openConnectModal}
                          className="bg-green-500 hover:bg-green-400 text-white font-display font-bold py-2 px-2 md:px-6 rounded-full border-3 border-brown-500 shadow-ac-sm hover:shadow-ac transition-all transform hover:-translate-y-0.5 text-sm md:text-base"
                        >
                          {/* Mobile: Just wallet icon */}
                          <span className="md:hidden text-xl">👛</span>
                          {/* Desktop: Full text */}
                          <span className="hidden md:inline">Connect Wallet</span>
                        </button>
                      );
                    }

                    if (chain.unsupported) {
                      return (
                        <button
                          onClick={openChainModal}
                          className="bg-red-500 hover:bg-red-400 text-white font-display font-bold py-2 px-4 md:px-6 rounded-full border-3 border-brown-500 shadow-ac-sm hover:shadow-ac transition-all text-sm md:text-base"
                        >
                          Wrong network
                        </button>
                      );
                    }

                    return (
                      <div className="flex gap-2 items-center">
                        <button
                          onClick={openChainModal}
                          className="bg-brown-400 hover:bg-brown-300 text-white font-display font-bold py-2 px-3 md:px-4 rounded-full border-3 border-brown-500 shadow-ac-sm hover:shadow-ac transition-all transform hover:-translate-y-0.5 text-sm md:text-base flex items-center gap-2"
                        >
                          {/* Custom World Chain logo or default chain icon */}
                          {chain.name === 'World Chain' ? (
                            <Image
                              alt="World Chain"
                              src="/worldchain_white.png"
                              width={16}
                              height={16}
                              className="w-4 h-4"
                            />
                          ) : chain.hasIcon && (
                            <div
                              className="w-4 h-4 rounded-full overflow-hidden"
                              style={{
                                background: chain.iconBackground,
                              }}
                            >
                              {chain.iconUrl && (
                                <Image
                                  alt={chain.name ?? 'Chain icon'}
                                  src={chain.iconUrl}
                                  width={16}
                                  height={16}
                                  className="w-4 h-4"
                                />
                              )}
                            </div>
                          )}
                          <span className="hidden md:inline">{chain.name}</span>
                          <span className="md:hidden">{chain.name === 'World Chain' ? <Image src="/worldchain_white.png" alt="World Chain" width={16} height={16} className="w-4 h-4" /> : chain.name}</span>
                        </button>

                        <button
                          onClick={openAccountModal}
                          className="bg-green-500 hover:bg-green-400 text-white font-display font-bold py-2 px-2 md:px-6 rounded-full border-3 border-brown-500 shadow-ac-sm hover:shadow-ac transition-all text-sm md:text-base flex items-center justify-center gap-0.5"
                        >
                          {/* Mobile: Just wallet icon */}
                          <span className="md:hidden text-xl">👛</span>
                          
                          {/* Desktop: Full address and balance */}
                          <div className="hidden md:flex md:flex-col md:items-center md:gap-0.5">
                            <span className="text-sm">{account.displayName}</span>
                            {account.displayBalance && (
                              <span className="text-[10px] opacity-90 font-mono leading-tight">
                                {formatBalance(account.displayBalance)}
                              </span>
                            )}
                          </div>
                        </button>
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
          )}
        </div>
      </div>
      </div>
    </nav>
  );
}

