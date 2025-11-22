'use client';

import { useAccount, useBalance } from 'wagmi';
import { Avatar } from './Avatar';
import { Card } from './Card';
import { Button } from './Button';
import Link from 'next/link';
import Image from 'next/image';

export function Sidebar() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });

  return (
    <>
      {/* Sidebar with Trunk Background - Full Height */}
      <aside className="hidden lg:flex flex-col w-72 space-y-4 sticky top-0 min-h-screen py-4 relative" style={{ zIndex: 10 }}>
        {/* Tree Trunk Background - WIDER than sidebar to show edges */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-96 h-full pointer-events-none" style={{ zIndex: 0 }}>
          <Image
            src="/cherryblossom_tree_sidebarlogo_just_the_trunk.png"
            alt="Tree Trunk"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Cherry Blossom Flowers - Extends to RIGHT of sidebar, WIDER to show full flowers */}
        <div className="absolute left-full top-0 w-[500px] h-full pointer-events-none" style={{ zIndex: 0 }}>
          <Image
            src="/cherryblossom_tree_sidebarlogo_just_the_flowers.png"
            alt="Cherry Blossoms"
            fill
            className="object-contain object-left"
            priority
          />
        </div>

        {/* Profile Card */}
        <Card variant="dialogue" className="text-center space-y-3 relative" style={{ zIndex: 2 }}>
        <Avatar size="lg" />
        
        {isConnected && address ? (
          <>
            <div className="space-y-1">
              <p className="font-display font-bold text-green-700 text-lg">
                {address.slice(0, 6)}...{address.slice(-4)}
              </p>
              <p className="text-sm text-green-600 font-body">
                {balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : '0 ETH'}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Link href="/portfolio">
                <Button variant="secondary" size="sm" className="w-full text-xs">
                  📊 Portfolio
                </Button>
              </Link>
              <Link href="/agents">
                <Button variant="secondary" size="sm" className="w-full text-xs">
                  🤖 My Agents
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="space-y-2">
            <p className="font-display font-bold text-green-700">
              Welcome! 🦔
            </p>
            <p className="text-xs text-green-600 font-body">
              Connect your wallet to get started
            </p>
          </div>
        )}
      </Card>

      {/* Quick Stats Widget */}
      {isConnected && (
        <Card variant="default" className="space-y-3 relative" style={{ zIndex: 2 }}>
          <h3 className="font-display font-bold text-green-700 text-sm flex items-center gap-2">
            <span>📈</span> Your Stats
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-green-600">Total Value:</span>
              <span className="font-bold text-green-700">$0.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-600">Active Agents:</span>
              <span className="font-bold text-green-700">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-600">Total Yield:</span>
              <span className="font-bold text-pink-600">+0.00%</span>
            </div>
          </div>
        </Card>
      )}

      {/* Quick Actions Widget */}
      <Card variant="default" className="space-y-3 relative" style={{ zIndex: 2 }}>
        <h3 className="font-display font-bold text-green-700 text-sm flex items-center gap-2">
          <span>⚡</span> Quick Actions
        </h3>
        <div className="space-y-4">
          <Link href="/agents/deploy">
            <Button variant="primary" size="sm" className="w-full text-xs">
              🤖 Deploy Agent
            </Button>
          </Link>
          <Link href="/swap">
            <Button variant="secondary" size="sm" className="w-full text-xs">
              🦄 Swap Tokens
            </Button>
          </Link>
        </div>
      </Card>

      {/* Market Info Widget */}
      <Card variant="default" className="space-y-3 relative" style={{ zIndex: 2 }}>
        <h3 className="font-display font-bold text-green-700 text-sm flex items-center gap-2">
          <span>🌐</span> Top APRs
        </h3>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-green-600">Base</span>
            <span className="font-bold text-pink-600">12.5%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-green-600">Arbitrum</span>
            <span className="font-bold text-pink-600">11.2%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-green-600">Optimism</span>
            <span className="font-bold text-pink-600">10.8%</span>
          </div>
        </div>
        <div className="pt-2">
          <Link href="/swap">
            <Button variant="nav" size="sm" className="w-full text-xs">
              View All Chains →
            </Button>
          </Link>
        </div>
      </Card>

      {/* Help Widget */}
      <Card variant="dialogue" className="space-y-2 bg-gradient-to-br from-pink-50 to-purple-50 relative" style={{ zIndex: 2 }}>
        <div className="text-center space-y-3">
          <div className="text-3xl">💡</div>
          <p className="text-xs font-body text-green-700">
            <span className="font-bold">New to HedgePod?</span><br />
            Check out our guide!
          </p>
          <Link href="/about">
            <Button variant="primary" size="sm" className="w-full text-xs">
              Learn More
            </Button>
          </Link>
        </div>
      </Card>
    </aside>
    </>
  );
}

