/**
 * Animal Crossing-styled Page Layout Wrapper
 */

import { Footer } from './Footer';
import { Sidebar } from './Sidebar';

interface PageLayoutProps {
  children: React.ReactNode;
  showBackground?: boolean;
  showFooter?: boolean;
  showSidebar?: boolean;
}

export function PageLayout({ 
  children, 
  showBackground = true, 
  showFooter = true,
  showSidebar = true 
}: PageLayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <main 
        className="relative flex-1 flex flex-col"
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
        
        <div className="relative w-full max-w-7xl mx-auto px-4 md:px-8 flex-1" style={{ zIndex: 1 }}>
          <div className="flex gap-6 overflow-hidden">
            {/* Sidebar */}
            {showSidebar && <Sidebar />}
            
            {/* Main Content - Above flowers but below sidebar */}
            <div className="flex-1 min-w-0 relative" style={{ zIndex: 15 }}>
              {children}
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer at the bottom */}
      {showFooter && <Footer />}
    </div>
  );
}

