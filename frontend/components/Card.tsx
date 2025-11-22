/**
 * Animal Crossing-styled Card Components
 */

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'dialogue' | 'feature';
  className?: string;
}

export function Card({ children, variant = 'default', className = '' }: CardProps) {
  const variants = {
    default: "bg-cream border-3 border-brown-400 rounded-2xl shadow-ac-sm hover:shadow-ac p-6",
    dialogue: "bg-cream border-4 border-brown-500 rounded-3xl shadow-ac p-8",
    feature: "bg-cream border-3 border-brown-400 rounded-2xl shadow-ac-sm hover:shadow-ac p-6 transition-all transform hover:-translate-y-1",
  };
  
  return (
    <div className={`${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card variant="feature">
      <div className="text-5xl mb-3">{icon}</div>
      <h3 className="text-lg font-display font-bold text-green-700 mb-2">{title}</h3>
      <p className="text-green-800 font-body text-sm">{description}</p>
    </Card>
  );
}

interface HeroCardProps {
  children: React.ReactNode;
}

export function HeroCard({ children }: HeroCardProps) {
  return (
    <Card variant="dialogue" className="max-w-2xl mx-auto">
      <div className="flex flex-col items-center space-y-6">
        {children}
      </div>
    </Card>
  );
}

