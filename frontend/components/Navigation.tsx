/**
 * Animal Crossing-styled Navigation Component
 */

'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navigation() {
  const t = useTranslations('common');

  return (
    <nav className="flex justify-between items-center mb-8">
      {/* Logo */}
      <Link href="/">
        <div className="flex items-center gap-2 cursor-pointer">
          <img src="/hedgepod-logo.png" alt="HedgePod" className="w-12 h-12 rounded-full" />
          <span className="font-display font-bold text-2xl text-green-600 hidden md:block">
            HedgePod
          </span>
        </div>
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-3">
        <Link href="/">
          <button className="bg-pink-400 hover:bg-pink-300 text-white font-display font-bold py-2 px-4 md:px-6 rounded-full border-3 border-brown-500 shadow-ac-sm hover:shadow-ac transition-all transform hover:-translate-y-0.5 text-sm md:text-base">
            {t('home')}
          </button>
        </Link>
        <Link href="/portfolio">
          <button className="bg-pink-400 hover:bg-pink-300 text-white font-display font-bold py-2 px-4 md:px-6 rounded-full border-3 border-brown-500 shadow-ac-sm hover:shadow-ac transition-all transform hover:-translate-y-0.5 text-sm md:text-base">
            {t('portfolio')}
          </button>
        </Link>
        <Link href="/agents">
          <button className="bg-pink-400 hover:bg-pink-300 text-white font-display font-bold py-2 px-4 md:px-6 rounded-full border-3 border-brown-500 shadow-ac-sm hover:shadow-ac transition-all transform hover:-translate-y-0.5 text-sm md:text-base">
            {t('agents')}
          </button>
        </Link>
        <Link href="/about">
          <button className="bg-pink-400 hover:bg-pink-300 text-white font-display font-bold py-2 px-4 md:px-6 rounded-full border-3 border-brown-500 shadow-ac-sm hover:shadow-ac transition-all transform hover:-translate-y-0.5 text-sm md:text-base">
            {t('about')}
          </button>
        </Link>

        {/* Language Switcher */}
        <LanguageSwitcher />

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
                          {t('connect')}
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
                                <img
                                  alt={chain.name ?? 'Chain icon'}
                                  src={chain.iconUrl}
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

