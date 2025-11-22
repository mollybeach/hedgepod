/**
 * Animal Crossing-styled Button Component
 */

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'nav';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  onClick,
  className = ''
}: ButtonProps) {
  const baseStyles = "font-display font-bold rounded-full transition-all transform hover:-translate-y-0.5";
  
  const variants = {
    primary: "bg-pink-500 hover:bg-pink-400 text-white shadow-ac-sm hover:shadow-ac border-3 border-brown-500",
    secondary: "bg-green-500 hover:bg-green-400 text-white shadow-ac-sm hover:shadow-ac border-3 border-brown-600",
    nav: "bg-pink-400 hover:bg-pink-300 text-white shadow-ac-sm hover:shadow-ac border-3 border-brown-500",
  };
  
  const sizes = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-6 text-base",
    lg: "py-4 px-8 text-xl",
  };
  
  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}

