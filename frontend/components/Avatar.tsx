/**
 * Animal Crossing-styled Avatar Component
 */

import Image from 'next/image';

interface AvatarProps {
  src?: string;
  emoji?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Avatar({ 
  src = '/hedgepod-logo.png', 
  emoji, 
  alt = 'HedgePod',
  size = 'md', 
  className = '' 
}: AvatarProps) {
  const sizes = {
    sm: { container: 'w-16 h-16', text: 'text-3xl' },
    md: { container: 'w-24 h-24', text: 'text-5xl' },
    lg: { container: 'w-32 h-32', text: 'text-6xl' },
    xl: { container: 'w-48 h-48', text: 'text-8xl' },
  };
  
  const sizeConfig = sizes[size];
  
  return (
    <div className={`${sizeConfig.container} bg-green-200 rounded-full border-4 border-brown-500 flex items-center justify-center shadow-ac overflow-hidden ${className}`}>
      {emoji ? (
        <span className={sizeConfig.text}>{emoji}</span>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={200}
          height={200}
          className="object-contain w-full h-full rounded-full"
          priority
        />
      )}
    </div>
  );
}

