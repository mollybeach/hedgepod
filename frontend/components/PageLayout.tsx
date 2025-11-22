/**
 * Animal Crossing-styled Page Layout Wrapper
 */

import { Footer } from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  showBackground?: boolean;
  showFooter?: boolean;
}

export function PageLayout({ children, showBackground = true, showFooter = true }: PageLayoutProps) {
  return (
    <main 
      className="relative flex min-h-screen flex-col items-center justify-center p-4 md:p-8"
      style={showBackground ? {
        backgroundImage: 'url(/hedgepod_cherryblossmbackground.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      } : undefined}
    >
      {/* Overlay for better text readability */}
      {showBackground && (
        <div className="absolute inset-0 bg-cream/30 backdrop-blur-[2px]" />
      )}
      
      <div className="relative z-10 max-w-5xl w-full">
        {children}
        {showFooter && <Footer />}
      </div>
    </main>
  );
}

