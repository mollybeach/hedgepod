/**
 * Animal Crossing-styled Navigation Component
 */

import { Button } from './Button';

export function Navigation() {
  return (
    <nav className="flex justify-end gap-3 mb-8">
      <Button variant="nav" size="sm">Home</Button>
      <Button variant="nav" size="sm">Portfolio</Button>
      <Button variant="nav" size="sm">Agents</Button>
      <Button variant="nav" size="sm">About</Button>
    </nav>
  );
}

