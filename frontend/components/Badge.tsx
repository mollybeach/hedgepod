/**
 * Animal Crossing-styled Badge Component
 */

interface BadgeProps {
  text: string;
  variant?: 'default' | 'pink' | 'green';
}

export function Badge({ text, variant = 'default' }: BadgeProps) {
  const variants = {
    default: "bg-green-100 border-2 border-green-500 text-green-800",
    pink: "bg-pink-100 border-2 border-pink-500 text-pink-800",
    green: "bg-green-100 border-2 border-green-500 text-green-800",
  };
  
  return (
    <span className={`${variants[variant]} px-4 py-2 rounded-full text-xs font-display font-bold shadow-ac-sm inline-block`}>
      {text}
    </span>
  );
}

interface BadgeGroupProps {
  badges: string[];
  variant?: 'default' | 'pink' | 'green';
}

export function BadgeGroup({ badges, variant = 'default' }: BadgeGroupProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {badges.map((badge) => (
        <Badge key={badge} text={badge} variant={variant} />
      ))}
    </div>
  );
}

