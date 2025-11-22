/**
 * Footer Component with Social Links
 * Animal Crossing-themed footer for HedgePod
 */

'use client';

export function Footer() {
  const socialLinks = [
    { name: 'Live Demo', url: 'https://hedgepod.app', icon: '🚀', color: 'bg-green-500 hover:bg-green-400' },
    { name: 'Discord', url: 'https://discord.com/invite/5C7yYrsR', icon: '💬', color: 'bg-pink-400 hover:bg-pink-300' },
    { name: 'Telegram', url: 'https://t.me/hedgepod', icon: '📱', color: 'bg-pink-400 hover:bg-pink-300' },
    { name: 'Twitter', url: 'https://x.com/hedgepod', icon: '🐦', color: 'bg-pink-400 hover:bg-pink-300' },
    { name: 'Instagram', url: 'https://www.instagram.com/hedgepod_app/', icon: '📸', color: 'bg-pink-400 hover:bg-pink-300' },
    { name: 'GitHub', url: 'https://github.com/mollybeach/hedgepod', icon: '💻', color: 'bg-pink-400 hover:bg-pink-300' },
  ];

  return (
    <footer 
      className="py-8 border-t-3 border-brown-500 relative overflow-hidden mt-auto"
      style={{
        backgroundImage: 'url(/greenleaves_header.png)',
        backgroundRepeat: 'repeat-x',
        backgroundSize: 'auto 100%',
        backgroundPosition: 'center',
        width: '100vw',
        marginLeft: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-cream/40 backdrop-blur-[1px]" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 space-y-6">
        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link.color} text-white font-display font-bold py-2 px-4 rounded-full border-3 border-brown-500 shadow-ac-sm hover:shadow-ac transition-all transform hover:-translate-y-0.5 text-sm flex items-center gap-2`}
            >
              <span>{link.icon}</span>
              <span className="hidden sm:inline">{link.name}</span>
            </a>
          ))}
        </div>

        {/* Tagline */}
        <div className="text-center space-y-2">
          <p className="text-2xl font-display font-bold text-pink-600">
            Eight chains. One app. Zero friction.
          </p>
          <p className="text-sm text-green-700 font-body">
            For 23M World App users who don&apos;t know what an RPC is—and never should.
          </p>
        </div>

        {/* Copyright & License */}
        <div className="text-center text-xs text-green-600 font-body space-y-1">
          <p>Built with ❤️ at ETHGlobal Buenos Aires 2025</p>
          <p>© 2025 HedgePod • MIT License • 🦔 Making DeFi accessible for everyone!</p>
        </div>
      </div>
    </footer>
  );
}

