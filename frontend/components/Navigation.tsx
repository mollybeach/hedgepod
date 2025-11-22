/**
 * Animal Crossing-styled Navigation Component
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// import { useTranslations } from 'next-intl'; // DISABLED - see _i18n_disabled/
import { ConnectButton } from '@rainbow-me/rainbowkit';
// import { LanguageSwitcher } from '../_i18n_disabled/LanguageSwitcher'; // DISABLED - moved to _i18n_disabled/

export function Navigation() {
  // const t = useTranslations('common'); // DISABLED TEMPORARILY
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);

  return (
    <nav 
      className="flex justify-between items-center mb-8 py-4 px-4 md:px-24 shadow-ac-lg border-b-3 border-brown-500 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/greenleaves_header.png)',
        backgroundRepeat: 'repeat-x',
        backgroundSize: 'auto 100%',
        backgroundPosition: 'center',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
      }}
    >
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-cream/40 backdrop-blur-[1px]" />
      
      {/* Content wrapper with z-index to be above overlay */}
      <div className="relative z-10 flex items-center gap-2">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/hedgepod-logo.png" alt="HedgePod" width={48} height={48} className="w-12 h-12 rounded-full" />
            <span className="font-display font-bold text-2xl text-green-600 hidden md:block">
              HedgePod
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="relative z-10 flex items-center gap-3">
        <Link href="/portfolio">
          <button className="bg-pink-400 hover:bg-pink-300 text-white font-display font-bold py-2 px-4 md:px-6 rounded-full border-3 border-brown-500 shadow-ac-sm hover:shadow-ac transition-all transform hover:-translate-y-0.5 text-sm md:text-base">
            📊 Portfolio
          </button>
        </Link>
        <Link href="/swap">
          <button className="bg-purple-400 hover:bg-purple-300 text-white font-display font-bold py-2 px-4 md:px-6 rounded-full border-3 border-brown-500 shadow-ac-sm hover:shadow-ac transition-all transform hover:-translate-y-0.5 text-sm md:text-base flex items-center gap-1">
            <span>🦄</span>
            <span className="hidden sm:inline">Swap</span>
          </button>
        </Link>
        
        {/* More Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
            className="bg-brown-400 hover:bg-brown-300 text-white font-display font-bold py-2 px-4 md:px-6 rounded-full border-3 border-brown-500 shadow-ac-sm hover:shadow-ac transition-all transform hover:-translate-y-0.5 text-sm md:text-base flex items-center gap-2"
          >
            <span>More</span>
            <span className="transform transition-transform" style={{ transform: isMoreDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
          </button>
          
          {isMoreDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-cream rounded-2xl border-3 border-brown-500 shadow-ac-lg overflow-hidden z-50">
              <Link href="/agents" onClick={() => setIsMoreDropdownOpen(false)}>
                <div className="px-4 py-3 hover:bg-green-100 transition-colors cursor-pointer border-b-2 border-brown-200">
                  <p className="font-display font-bold text-green-700 text-sm">🤖 Agents</p>
                </div>
              </Link>
              <Link href="/contracts" onClick={() => setIsMoreDropdownOpen(false)}>
                <div className="px-4 py-3 hover:bg-green-100 transition-colors cursor-pointer border-b-2 border-brown-200">
                  <p className="font-display font-bold text-green-700 text-sm">📜 Contracts</p>
                </div>
              </Link>
              <Link href="/about" onClick={() => setIsMoreDropdownOpen(false)}>
                <div className="px-4 py-3 hover:bg-green-100 transition-colors cursor-pointer border-b-2 border-brown-200">
                  <p className="font-display font-bold text-green-700 text-sm">📖 About</p>
                </div>
              </Link>
              <a href="https://github.com/mollybeach/hedgepod" target="_blank" rel="noopener noreferrer" onClick={() => setIsMoreDropdownOpen(false)}>
                <div className="px-4 py-3 hover:bg-green-100 transition-colors cursor-pointer border-b-2 border-brown-200">
                  <p className="font-display font-bold text-green-700 text-sm">💻 GitHub</p>
                </div>
              </a>
              <a href="https://discord.gg/hedgepod" target="_blank" rel="noopener noreferrer" onClick={() => setIsMoreDropdownOpen(false)}>
                <div className="px-4 py-3 hover:bg-green-100 transition-colors cursor-pointer border-b-2 border-brown-200">
                  <p className="font-display font-bold text-green-700 text-sm">💬 Discord</p>
                </div>
              </a>
              <a href="https://twitter.com/hedgepod" target="_blank" rel="noopener noreferrer" onClick={() => setIsMoreDropdownOpen(false)}>
                <div className="px-4 py-3 hover:bg-green-100 transition-colors cursor-pointer">
                  <p className="font-display font-bold text-green-700 text-sm">🐦 Twitter</p>
                </div>
              </a>
            </div>
          )}
        </div>

        {/* Language Switcher - DISABLED TEMPORARILY */}
        {/* <LanguageSwitcher /> */}

        {/* Connect Wallet Button with Custom Styling */}
        <div className="connect-wallet-wrapper">
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
                          className="bg-green-500 hover:bg-green-400 text-white font-display font-bold py-2 px-4 md:px-6 rounded-full border-3 border-brown-500 shadow-ac-sm hover:shadow-ac transition-all transform hover:-translate-y-0.5 text-sm md:text-base"
                        >
                          Connect Wallet
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
                      <div className="flex gap-2">
                        <button
                          onClick={openChainModal}
                          className="bg-brown-400 hover:bg-brown-300 text-white font-display font-bold py-2 px-3 md:px-4 rounded-full border-3 border-brown-500 shadow-ac-sm hover:shadow-ac transition-all text-sm md:text-base flex items-center gap-2"
                        >
                          {chain.hasIcon && (
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
                        </button>

                        <button
                          onClick={openAccountModal}
                          className="bg-green-500 hover:bg-green-400 text-white font-display font-bold py-2 px-3 md:px-6 rounded-full border-3 border-brown-500 shadow-ac-sm hover:shadow-ac transition-all text-sm md:text-base"
                        >
                          {account.displayName}
                          {account.displayBalance
                            ? ` (${account.displayBalance})`
                            : ''}
                        </button>
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </div>
      </div>
    </nav>
  );
}

