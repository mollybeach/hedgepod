# 🌸 Cherry Blossom Sidebar Design

## Visual Layering System

The HedgePod sidebar features a beautiful cherry blossom tree with a sophisticated layering system:

### Z-Index Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│  Layer 5 (z-15): Main Content                               │
│    ├─ Navigation                                            │
│    ├─ Page Content (Portfolio, Agents, Swap)               │
│    └─ Footer                                                │
├─────────────────────────────────────────────────────────────┤
│  Layer 4 (z-10): Sidebar Content                            │
│    ├─ Profile Card                                          │
│    ├─ Stats Widget                                          │
│    ├─ Quick Actions                                         │
│    ├─ Top APRs Widget                                       │
│    └─ Help Widget                                           │
├─────────────────────────────────────────────────────────────┤
│  Layer 3 (z-10, internal -1): Tree Trunk Background         │
│    └─ Visible behind sidebar cards                          │
├─────────────────────────────────────────────────────────────┤
│  Layer 2 (z-5): Cherry Blossom Flowers                      │
│    ├─ Extends 400px from left edge                          │
│    ├─ Behind main content                                   │
│    └─ In front of main background                           │
├─────────────────────────────────────────────────────────────┤
│  Layer 1 (z-1): Main Background                             │
│    └─ Cherry blossom background image                       │
└─────────────────────────────────────────────────────────────┘
```

## Image Assets

### 1. Full Reference Image
**File**: `/public/cherryblossom_tree_sidebarlogo_both_trunk_and_flower.png`
- **Usage**: Reference only (not used in production)
- **Purpose**: Shows complete composition

### 2. Tree Trunk
**File**: `/public/cherryblossom_tree_sidebarlogo_just_the_trunk.png`
- **Usage**: Background of sidebar cards
- **Position**: Absolute within sidebar container
- **Z-Index**: -1 (relative to sidebar content)
- **Effect**: Cards appear to float in front of trunk

### 3. Cherry Blossom Flowers
**File**: `/public/cherryblossom_tree_sidebarlogo_just_the_flowers.png`
- **Usage**: Fixed overlay extending from sidebar
- **Position**: Fixed at left: 0, top: 0
- **Width**: 400px (extends beyond sidebar)
- **Z-Index**: 5 (between background and main content)
- **Effect**: Flowers branch out from sidebar, behind main content

## Technical Implementation

### Component Structure

```tsx
<>
  {/* Flowers Layer (z-5) */}
  <div className="fixed left-0 top-0 w-[400px]" style={{ zIndex: 5 }}>
    <Image src="/cherryblossom_tree_sidebarlogo_just_the_flowers.png" />
  </div>

  {/* Sidebar Container (z-10) */}
  <aside style={{ zIndex: 10 }}>
    {/* Trunk Background (z: -1 relative) */}
    <div className="absolute" style={{ zIndex: -1 }}>
      <Image src="/cherryblossom_tree_sidebarlogo_just_the_trunk.png" />
    </div>

    {/* Cards (z: 1 relative) */}
    <Card style={{ zIndex: 1 }}>...</Card>
    <Card style={{ zIndex: 1 }}>...</Card>
  </aside>
</>
```

### Main Content (PageLayout)
```tsx
{/* Main Content Area (z-15) */}
<div style={{ zIndex: 15 }}>
  {children}
</div>
```

## Visual Effect

1. **User sees trunk** behind sidebar cards (depth effect)
2. **Flowers extend naturally** from the trunk
3. **Flowers are behind** main page content (no obstruction)
4. **Sidebar content** is always readable and on top
5. **Beautiful layered look** inspired by Animal Crossing aesthetics

## Responsive Behavior

- **Desktop (lg+)**: All layers visible
- **Mobile (<lg)**: Cherry blossom tree hidden (sidebar hidden)
- **Pointer Events**: Disabled on decorative layers (trunk, flowers)

## Design Notes

- `pointer-events-none` ensures decorative layers don't interfere with clicks
- `fixed` positioning on flowers allows them to extend naturally
- `sticky` positioning on sidebar keeps cards visible while scrolling
- All images use `priority` for optimal loading
- Object positioning ensures alignment between trunk and flowers

