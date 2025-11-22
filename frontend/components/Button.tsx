/**
 * Animal Crossing-styled Button Component
 */

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'nav';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  onClick,
  disabled = false,
  className = ''
}: ButtonProps) {
  const baseStyles = "font-display font-bold rounded-full transition-all transform";
  const interactiveStyles = disabled 
    ? "opacity-50 cursor-not-allowed" 
    : "hover:-translate-y-0.5";
  
  const variants = {
    primary: "bg-pink-500 hover:bg-pink-400 text-white shadow-ac-sm hover:shadow-ac border-3 border-brown-500",
    secondary: "bg-green-500 hover:bg-green-400 text-white shadow-ac-sm hover:shadow-ac border-3 border-brown-600",
    nav: "bg-pink-400 hover:bg-pink-300 text-white shadow-ac-sm hover:shadow-ac border-3 border-brown-500",
  };
  
  const sizes = {
    xs: "py-1 px-2 text-xs",
    sm: "py-1.5 px-3 text-xs sm:py-2 sm:px-4 sm:text-sm",
    md: "py-2 px-4 text-sm sm:py-3 sm:px-6 sm:text-base",
    lg: "py-3 px-6 text-base sm:py-4 sm:px-8 sm:text-xl",
  };
  
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${interactiveStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}

