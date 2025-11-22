/**
 * Animal Crossing-styled Avatar Component
 */

interface AvatarProps {
  emoji?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Avatar({ emoji = '🦔', size = 'md', className = '' }: AvatarProps) {
  const sizes = {
    sm: 'w-16 h-16 text-3xl',
    md: 'w-24 h-24 text-5xl',
    lg: 'w-32 h-32 text-6xl',
    xl: 'w-48 h-48 text-8xl',
  };
  
  return (
    <div className={`${sizes[size]} bg-green-200 rounded-full border-4 border-brown-500 flex items-center justify-center shadow-ac ${className}`}>
      <span>{emoji}</span>
    </div>
  );
}

