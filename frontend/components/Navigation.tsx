/**
 * Animal Crossing-styled Navigation Component
 */

import Link from 'next/link';

export function Navigation() {
  return (
    <nav className="flex justify-end gap-3 mb-8">
      <Link href="/">
        <button className="bg-pink-400 hover:bg-pink-300 text-white font-display font-bold py-2 px-6 rounded-full border-3 border-brown-500 shadow-ac-sm hover:shadow-ac transition-all transform hover:-translate-y-0.5">
          Home
        </button>
      </Link>
      <Link href="/portfolio">
        <button className="bg-pink-400 hover:bg-pink-300 text-white font-display font-bold py-2 px-6 rounded-full border-3 border-brown-500 shadow-ac-sm hover:shadow-ac transition-all transform hover:-translate-y-0.5">
          Portfolio
        </button>
      </Link>
      <Link href="/agents">
        <button className="bg-pink-400 hover:bg-pink-300 text-white font-display font-bold py-2 px-6 rounded-full border-3 border-brown-500 shadow-ac-sm hover:shadow-ac transition-all transform hover:-translate-y-0.5">
          Agents
        </button>
      </Link>
      <Link href="/about">
        <button className="bg-pink-400 hover:bg-pink-300 text-white font-display font-bold py-2 px-6 rounded-full border-3 border-brown-500 shadow-ac-sm hover:shadow-ac transition-all transform hover:-translate-y-0.5">
          About
        </button>
      </Link>
    </nav>
  );
}

